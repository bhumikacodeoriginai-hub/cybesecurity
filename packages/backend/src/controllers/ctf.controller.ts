import { Request, Response } from 'express';
import prisma from '../models/prisma';
import ctfScoringEngine from '../services/ctf-scoring';
import { getPagination, formatPaginationResponse } from '../utils/helpers';

/**
 * Get all challenges with filters
 */
export const getChallenges = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit, offset } = getPagination(req);
    const { category, difficulty, solved } = req.query;

    const where: any = { isActive: true };
    if (category) where.category = category;
    if (difficulty) where.difficulty = difficulty;

    const [challenges, total] = await Promise.all([
      prisma.challenge.findMany({
        where,
        orderBy: [{ difficulty: 'asc' }, { points: 'asc' }],
        skip: offset,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          category: true,
          difficulty: true,
          points: true,
          maxAttempts: true,
          solveCount: true,
          createdAt: true,
          hints: true,
        },
      }),
      prisma.challenge.count({ where }),
    ]);

    // Attach user-specific data if authenticated
    let userSolves: Set<string> = new Set();
    let userAttempts: Map<string, number> = new Map();

    if (req.user) {
      const solves = await prisma.challengeAttempt.findMany({
        where: { userId: req.user.userId, isCorrect: true },
        select: { challengeId: true },
      });
      userSolves = new Set(solves.map(s => s.challengeId));

      const attempts = await prisma.challengeAttempt.groupBy({
        by: ['challengeId'],
        where: { userId: req.user.userId },
        _count: { id: true },
      });
      userAttempts = new Map(attempts.map(a => [a.challengeId, a._count.id]));
    }

    const enriched = challenges.map(c => ({
      ...c,
      hintsCount: Array.isArray(c.hints) ? (c.hints as any[]).length : 0,
      hints: undefined, // Don't expose hint content in listing
      solved: userSolves.has(c.id),
      attempts: userAttempts.get(c.id) || 0,
      attemptsRemaining: c.maxAttempts - (userAttempts.get(c.id) || 0),
    }));

    // Filter by solved status if requested
    let result = enriched;
    if (solved === 'true') result = enriched.filter(c => c.solved);
    if (solved === 'false') result = enriched.filter(c => !c.solved);

    res.json({
      success: true,
      data: result,
      pagination: formatPaginationResponse(page, limit, total),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch challenges.' });
  }
};

/**
 * Get a single challenge detail
 */
export const getChallenge = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const challenge = await prisma.challenge.findFirst({
      where: { OR: [{ id }, { slug: id }], isActive: true },
    });

    if (!challenge) {
      res.status(404).json({ success: false, error: 'Challenge not found.' });
      return;
    }

    // Get hints count (don't expose content)
    const hints = challenge.hints as string[];

    // Get user-specific data
    let userData = null;
    if (req.user) {
      const attempts = await prisma.challengeAttempt.findMany({
        where: { challengeId: challenge.id, userId: req.user.userId },
        orderBy: { attemptedAt: 'desc' },
        select: { isCorrect: true, attemptedAt: true },
      });

      const solved = attempts.some(a => a.isCorrect);

      // Get unlocked hints
      const hintLogs = await prisma.auditLog.findMany({
        where: {
          userId: req.user.userId,
          action: 'CTF_HINT_USED',
          entityId: challenge.id,
        },
      });
      const unlockedHints = hintLogs.map(h => (h.metadata as any)?.hintIndex || 0);

      userData = {
        solved,
        attempts: attempts.length,
        attemptsRemaining: challenge.maxAttempts - attempts.length,
        lastAttempt: attempts[0]?.attemptedAt || null,
        unlockedHints: unlockedHints.map(idx => ({
          index: idx,
          content: hints[idx],
        })),
      };
    }

    res.json({
      success: true,
      data: {
        id: challenge.id,
        title: challenge.title,
        slug: challenge.slug,
        description: challenge.description,
        category: challenge.category,
        difficulty: challenge.difficulty,
        points: challenge.points,
        maxAttempts: challenge.maxAttempts,
        solveCount: challenge.solveCount,
        hintsCount: hints.length,
        createdAt: challenge.createdAt,
        userProgress: userData,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch challenge.' });
  }
};

/**
 * Submit a flag for a challenge
 */
export const submitFlag = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required.' });
      return;
    }

    const { id } = req.params;
    const { flag } = req.body;

    if (!flag || typeof flag !== 'string' || flag.trim().length === 0) {
      res.status(400).json({ success: false, error: 'Flag is required.' });
      return;
    }

    const result = await ctfScoringEngine.submitFlag(id, req.user.userId, flag.trim());

    const statusCode = result.correct ? 200 : 200; // Always 200 for valid attempts

    res.status(statusCode).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Flag submission failed.' });
  }
};

/**
 * Get a hint for a challenge
 */
export const getHint = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required.' });
      return;
    }

    const { id } = req.params;
    const { index } = req.body;

    if (typeof index !== 'number' || index < 0) {
      res.status(400).json({ success: false, error: 'Valid hint index required.' });
      return;
    }

    const result = await ctfScoringEngine.getHint(id, req.user.userId, index);

    if ('error' in result) {
      res.status(400).json({ success: false, error: result.error });
      return;
    }

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get hint.' });
  }
};

/**
 * Get CTF leaderboard
 */
export const getLeaderboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit, offset } = getPagination(req);
    const { timeframe, category } = req.query;

    const result = await ctfScoringEngine.getLeaderboard({
      limit,
      offset,
      timeframe: (timeframe as any) || 'all',
      category: category as string,
    });

    // Get current user's position if authenticated
    let userPosition = null;
    if (req.user) {
      const entry = result.entries.find(e => e.userId === req.user!.userId);
      if (entry) {
        userPosition = entry;
      } else {
        // User not in top results, get their actual rank
        const userScore = await ctfScoringEngine.getUserTotalScore(req.user.userId);
        const higherScorers = result.entries.filter(e => e.totalScore > userScore).length;
        userPosition = {
          rank: higherScorers + 1,
          userId: req.user.userId,
          totalScore: userScore,
          challengesSolved: 0,
        };
      }
    }

    res.json({
      success: true,
      data: {
        entries: result.entries,
        total: result.total,
        userPosition,
      },
      pagination: formatPaginationResponse(page, limit, result.total),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch leaderboard.' });
  }
};

/**
 * Get user's CTF statistics
 */
export const getUserCTFStats = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required.' });
      return;
    }

    const stats = await ctfScoringEngine.getUserStats(req.user.userId);

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch CTF stats.' });
  }
};

/**
 * Get challenge categories with counts
 */
export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.challenge.groupBy({
      by: ['category'],
      where: { isActive: true },
      _count: { id: true },
      _sum: { points: true },
    });

    res.json({
      success: true,
      data: categories.map(c => ({
        category: c.category,
        challengeCount: c._count.id,
        totalPoints: c._sum.points || 0,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch categories.' });
  }
};
