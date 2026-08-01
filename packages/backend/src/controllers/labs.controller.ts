import { Request, Response } from 'express';
import prisma from '../models/prisma';
import labOrchestrator, { LabError } from '../services/lab-orchestrator';
import { getPagination, formatPaginationResponse } from '../utils/helpers';

/**
 * Get all available labs with filtering
 */
export const getLabs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit, offset } = getPagination(req);
    const { difficulty, category } = req.query;

    const where: any = { isPublished: true };
    if (difficulty) where.difficulty = difficulty;

    const [labs, total] = await Promise.all([
      prisma.lab.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          difficulty: true,
          durationMinutes: true,
          toolsRequired: true,
          xpReward: true,
          objectives: true,
          lesson: {
            select: {
              id: true,
              title: true,
              module: {
                select: {
                  course: { select: { title: true, slug: true } },
                },
              },
            },
          },
        },
      }),
      prisma.lab.count({ where }),
    ]);

    // If user is authenticated, include their progress
    let labProgress: Record<string, string> = {};
    if (req.user) {
      const progress = await prisma.userProgress.findMany({
        where: {
          userId: req.user.userId,
          entityType: 'LAB',
          entityId: { in: labs.map(l => l.id) },
        },
      });
      labProgress = Object.fromEntries(progress.map(p => [p.entityId, p.status]));
    }

    const labsWithProgress = labs.map(lab => ({
      ...lab,
      userStatus: labProgress[lab.id] || 'NOT_STARTED',
      objectiveCount: Array.isArray(lab.objectives) ? (lab.objectives as any[]).length : 0,
    }));

    res.json({
      success: true,
      data: labsWithProgress,
      pagination: formatPaginationResponse(page, limit, total),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch labs.' });
  }
};

/**
 * Get a single lab detail
 */
export const getLab = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const lab = await prisma.lab.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            module: {
              select: {
                course: { select: { id: true, title: true, slug: true } },
              },
            },
          },
        },
      },
    });

    if (!lab) {
      res.status(404).json({ success: false, error: 'Lab not found.' });
      return;
    }

    // Get user's active instance if any
    let activeInstance = null;
    if (req.user) {
      activeInstance = await prisma.labInstance.findFirst({
        where: {
          labId: lab.id,
          userId: req.user.userId,
          status: { in: ['RUNNING', 'PROVISIONING'] },
        },
        orderBy: { startedAt: 'desc' },
      });
    }

    res.json({
      success: true,
      data: {
        ...lab,
        activeInstance: activeInstance ? {
          id: activeInstance.id,
          status: activeInstance.status,
          startedAt: activeInstance.startedAt,
          expiresAt: activeInstance.expiresAt,
        } : null,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch lab.' });
  }
};

/**
 * Start a lab instance
 */
export const startLab = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required.' });
      return;
    }

    const { id } = req.params;

    const instance = await labOrchestrator.startLab(id, req.user.userId);

    res.status(201).json({
      success: true,
      data: {
        instanceId: instance.instanceId,
        status: instance.status,
        containerId: instance.containerId,
        accessUrl: instance.accessUrl,
        startedAt: instance.startedAt,
        expiresAt: instance.expiresAt,
      },
      message: 'Lab environment is ready. Connect your terminal.',
    });
  } catch (error) {
    if (error instanceof LabError) {
      const statusMap: Record<string, number> = {
        MAX_CONCURRENT_REACHED: 429,
        LAB_NOT_FOUND: 404,
        LAB_NOT_AVAILABLE: 403,
      };
      res.status(statusMap[error.code] || 400).json({
        success: false,
        error: error.message,
        code: error.code,
      });
      return;
    }
    res.status(500).json({ success: false, error: 'Failed to start lab.' });
  }
};

/**
 * Stop a lab instance
 */
export const stopLab = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required.' });
      return;
    }

    const { id } = req.params;
    await labOrchestrator.stopLab(id, req.user.userId);

    res.json({
      success: true,
      message: 'Lab stopped successfully.',
    });
  } catch (error) {
    if (error instanceof LabError) {
      res.status(400).json({ success: false, error: error.message, code: error.code });
      return;
    }
    res.status(500).json({ success: false, error: 'Failed to stop lab.' });
  }
};

/**
 * Reset a lab instance
 */
export const resetLab = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required.' });
      return;
    }

    const { id } = req.params;
    const instance = await labOrchestrator.resetLab(id, req.user.userId);

    res.json({
      success: true,
      data: {
        instanceId: instance.instanceId,
        status: instance.status,
      },
      message: 'Lab reset successfully. Environment is fresh.',
    });
  } catch (error) {
    if (error instanceof LabError) {
      res.status(400).json({ success: false, error: error.message, code: error.code });
      return;
    }
    res.status(500).json({ success: false, error: 'Failed to reset lab.' });
  }
};

/**
 * Get lab instance status
 */
export const getLabStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required.' });
      return;
    }

    const { id } = req.params;
    const status = await labOrchestrator.getLabStatus(id, req.user.userId);

    if (!status) {
      res.status(404).json({ success: false, error: 'Lab instance not found.' });
      return;
    }

    res.json({
      success: true,
      data: {
        instanceId: status.instanceId,
        labId: status.labId,
        status: status.status,
        startedAt: status.startedAt,
        expiresAt: status.expiresAt,
        timeRemaining: Math.max(0, Math.floor((status.expiresAt.getTime() - Date.now()) / 1000)),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get lab status.' });
  }
};

/**
 * Validate lab objectives
 */
export const validateLab = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required.' });
      return;
    }

    const { id } = req.params;
    const result = await labOrchestrator.validateLab(id, req.user.userId);

    res.json({
      success: true,
      data: result,
      message: result.passed
        ? 'Congratulations! All objectives completed!'
        : `${result.completedObjectives}/${result.totalObjectives} objectives completed. Keep going!`,
    });
  } catch (error) {
    if (error instanceof LabError) {
      res.status(400).json({ success: false, error: error.message, code: error.code });
      return;
    }
    res.status(500).json({ success: false, error: 'Validation failed.' });
  }
};

/**
 * Get user's active lab instances
 */
export const getActiveLabs = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required.' });
      return;
    }

    const activeLabs = await labOrchestrator.getUserActiveLabs(req.user.userId);

    res.json({
      success: true,
      data: activeLabs.map(lab => ({
        instanceId: lab.instanceId,
        labId: lab.labId,
        status: lab.status,
        startedAt: lab.startedAt,
        expiresAt: lab.expiresAt,
        timeRemaining: Math.max(0, Math.floor((lab.expiresAt.getTime() - Date.now()) / 1000)),
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch active labs.' });
  }
};

/**
 * Get lab history for user
 */
export const getLabHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required.' });
      return;
    }

    const history = await prisma.labInstance.findMany({
      where: { userId: req.user.userId },
      orderBy: { startedAt: 'desc' },
      take: 20,
      include: {
        lab: {
          select: { title: true, slug: true, difficulty: true },
        },
      },
    });

    res.json({
      success: true,
      data: history.map(h => ({
        instanceId: h.id,
        labTitle: h.lab.title,
        labSlug: h.lab.slug,
        difficulty: h.lab.difficulty,
        status: h.status,
        startedAt: h.startedAt,
        stoppedAt: h.stoppedAt,
        duration: h.stoppedAt
          ? Math.round((h.stoppedAt.getTime() - h.startedAt.getTime()) / 60000)
          : null,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch lab history.' });
  }
};
