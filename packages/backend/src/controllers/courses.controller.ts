import { Request, Response } from 'express';
import prisma from '../models/prisma';
import { getPagination, formatPaginationResponse } from '../utils/helpers';

/**
 * Get all learning paths
 */
export const getLearningPaths = async (req: Request, res: Response): Promise<void> => {
  try {
    const learningPaths = await prisma.learningPath.findMany({
      where: { isPublished: true },
      orderBy: { orderIndex: 'asc' },
      include: {
        _count: { select: { courses: true } },
      },
    });

    res.json({
      success: true,
      data: learningPaths,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch learning paths.',
    });
  }
};

/**
 * Get a single learning path with its courses
 */
export const getLearningPath = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const learningPath = await prisma.learningPath.findUnique({
      where: { id },
      include: {
        courses: {
          where: { isPublished: true },
          orderBy: { orderIndex: 'asc' },
          include: {
            _count: { select: { modules: true, enrollments: true } },
          },
        },
      },
    });

    if (!learningPath) {
      res.status(404).json({ success: false, error: 'Learning path not found.' });
      return;
    }

    res.json({
      success: true,
      data: learningPath,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch learning path.',
    });
  }
};

/**
 * Get all courses with pagination and filters
 */
export const getCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit, offset } = getPagination(req);
    const { difficulty, pathId, search } = req.query;

    const where: any = { isPublished: true };
    if (difficulty) where.difficulty = difficulty;
    if (pathId) where.learningPathId = pathId;
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        orderBy: { orderIndex: 'asc' },
        skip: offset,
        take: limit,
        include: {
          learningPath: { select: { title: true, icon: true, color: true } },
          _count: { select: { modules: true, enrollments: true } },
        },
      }),
      prisma.course.count({ where }),
    ]);

    res.json({
      success: true,
      data: courses,
      pagination: formatPaginationResponse(page, limit, total),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch courses.',
    });
  }
};

/**
 * Get a single course with modules and lessons
 */
export const getCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: {
        learningPath: { select: { id: true, title: true, icon: true, color: true } },
        instructor: { select: { id: true, firstName: true, lastName: true, avatarUrl: true } },
        modules: {
          orderBy: { orderIndex: 'asc' },
          include: {
            lessons: {
              orderBy: { orderIndex: 'asc' },
              select: {
                id: true,
                title: true,
                slug: true,
                lessonType: true,
                durationMinutes: true,
                xpReward: true,
                orderIndex: true,
              },
            },
          },
        },
        _count: { select: { enrollments: true } },
      },
    });

    if (!course) {
      res.status(404).json({ success: false, error: 'Course not found.' });
      return;
    }

    // If user is authenticated, include their progress
    let userProgress = null;
    if (req.user) {
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: req.user.userId,
            courseId: course.id,
          },
        },
      });

      if (enrollment) {
        const lessonProgress = await prisma.userProgress.findMany({
          where: {
            userId: req.user.userId,
            entityType: 'LESSON',
            entityId: {
              in: course.modules.flatMap(m => m.lessons.map(l => l.id)),
            },
          },
        });

        userProgress = {
          enrolled: true,
          status: enrollment.status,
          progress: enrollment.progress,
          completedLessons: lessonProgress.filter(p => p.status === 'COMPLETED').map(p => p.entityId),
        };
      }
    }

    res.json({
      success: true,
      data: {
        ...course,
        userProgress,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch course.',
    });
  }
};

/**
 * Enroll in a course
 */
export const enrollInCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required.' });
      return;
    }

    const { id } = req.params;

    // Check if course exists
    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) {
      res.status(404).json({ success: false, error: 'Course not found.' });
      return;
    }

    // Check existing enrollment
    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: req.user.userId,
          courseId: id,
        },
      },
    });

    if (existing) {
      res.status(409).json({ success: false, error: 'Already enrolled in this course.' });
      return;
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: req.user.userId,
        courseId: id,
        status: 'IN_PROGRESS',
      },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        userId: req.user.userId,
        title: 'Course Enrolled',
        message: `You have enrolled in "${course.title}". Start learning now!`,
        type: 'COURSE_UPDATE',
        link: `/courses/${course.slug}`,
      },
    });

    res.status(201).json({
      success: true,
      data: enrollment,
      message: `Successfully enrolled in "${course.title}".`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to enroll in course.',
    });
  }
};

/**
 * Get a single lesson
 */
export const getLesson = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const lesson = await prisma.lesson.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: {
        module: {
          include: {
            course: { select: { id: true, title: true, slug: true } },
            lessons: {
              orderBy: { orderIndex: 'asc' },
              select: { id: true, title: true, slug: true, orderIndex: true, lessonType: true },
            },
          },
        },
        lab: {
          select: { id: true, title: true, difficulty: true, durationMinutes: true },
        },
        quiz: {
          select: { id: true, title: true, timeLimitMinutes: true, passingScore: true },
        },
      },
    });

    if (!lesson) {
      res.status(404).json({ success: false, error: 'Lesson not found.' });
      return;
    }

    // Get user progress for this lesson
    let userProgress = null;
    if (req.user) {
      userProgress = await prisma.userProgress.findUnique({
        where: {
          userId_entityType_entityId: {
            userId: req.user.userId,
            entityType: 'LESSON',
            entityId: lesson.id,
          },
        },
      });
    }

    res.json({
      success: true,
      data: {
        ...lesson,
        userProgress,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lesson.',
    });
  }
};

/**
 * Mark lesson as complete
 */
export const completeLesson = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required.' });
      return;
    }

    const { id } = req.params;

    // Get the lesson
    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        module: {
          include: {
            course: true,
            lessons: { select: { id: true } },
          },
        },
      },
    });

    if (!lesson) {
      res.status(404).json({ success: false, error: 'Lesson not found.' });
      return;
    }

    // Update or create progress
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_entityType_entityId: {
          userId: req.user.userId,
          entityType: 'LESSON',
          entityId: id,
        },
      },
      update: {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
      create: {
        userId: req.user.userId,
        entityType: 'LESSON',
        entityId: id,
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    });

    // Award XP
    await prisma.user.update({
      where: { id: req.user.userId },
      data: {
        xpPoints: { increment: lesson.xpReward },
      },
    });

    // Update course enrollment progress
    const courseId = lesson.module.courseId;
    const allLessonsInCourse = await prisma.lesson.count({
      where: { module: { courseId } },
    });

    const completedLessons = await prisma.userProgress.count({
      where: {
        userId: req.user.userId,
        entityType: 'LESSON',
        status: 'COMPLETED',
        entityId: {
          in: (await prisma.lesson.findMany({
            where: { module: { courseId } },
            select: { id: true },
          })).map(l => l.id),
        },
      },
    });

    const courseProgress = Math.round((completedLessons / allLessonsInCourse) * 100);

    await prisma.enrollment.updateMany({
      where: {
        userId: req.user.userId,
        courseId,
      },
      data: {
        progress: courseProgress,
        status: courseProgress >= 100 ? 'COMPLETED' : 'IN_PROGRESS',
        ...(courseProgress >= 100 ? { completedAt: new Date() } : {}),
      },
    });

    res.json({
      success: true,
      data: {
        progress,
        xpAwarded: lesson.xpReward,
        courseProgress,
      },
      message: 'Lesson completed! Well done.',
    });
  } catch (error) {
    console.error('Complete lesson error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to mark lesson as complete.',
    });
  }
};
