import { Request, Response } from 'express';
import prisma from '../models/prisma';

/**
 * Get user's overall progress overview
 */
export const getProgressOverview = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required.' });
      return;
    }

    const userId = req.user.userId;

    // Get user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        xpPoints: true,
        level: true,
        currentStreak: true,
        longestStreak: true,
      },
    });

    // Get various counts
    const [
      enrollments,
      completedLessons,
      completedLabs,
      solvedChallenges,
      passedQuizzes,
      badges,
    ] = await Promise.all([
      prisma.enrollment.findMany({
        where: { userId },
        include: { course: { select: { title: true, slug: true } } },
      }),
      prisma.userProgress.count({
        where: { userId, entityType: 'LESSON', status: 'COMPLETED' },
      }),
      prisma.userProgress.count({
        where: { userId, entityType: 'LAB', status: 'COMPLETED' },
      }),
      prisma.challengeAttempt.count({
        where: { userId, isCorrect: true },
      }),
      prisma.quizAttempt.count({
        where: { userId, passed: true },
      }),
      prisma.userBadge.count({ where: { userId } }),
    ]);

    const coursesCompleted = enrollments.filter(e => e.status === 'COMPLETED').length;
    const coursesInProgress = enrollments.filter(e => e.status === 'IN_PROGRESS').length;

    res.json({
      success: true,
      data: {
        xpPoints: user?.xpPoints || 0,
        level: user?.level || 'BEGINNER',
        currentStreak: user?.currentStreak || 0,
        longestStreak: user?.longestStreak || 0,
        coursesCompleted,
        coursesInProgress,
        lessonsCompleted: completedLessons,
        labsCompleted: completedLabs,
        challengesSolved: solvedChallenges,
        quizzesPassed: passedQuizzes,
        badgesEarned: badges,
        enrollments: enrollments.map(e => ({
          courseId: e.courseId,
          courseTitle: e.course.title,
          courseSlug: e.course.slug,
          status: e.status,
          progress: e.progress,
          enrolledAt: e.enrolledAt,
        })),
      },
    });
  } catch (error) {
    console.error('Progress overview error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch progress overview.',
    });
  }
};

/**
 * Get user's skill breakdown by learning path
 */
export const getSkillBreakdown = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required.' });
      return;
    }

    const userId = req.user.userId;

    // Get all learning paths with courses and lesson counts
    const learningPaths = await prisma.learningPath.findMany({
      where: { isPublished: true },
      orderBy: { orderIndex: 'asc' },
      include: {
        courses: {
          include: {
            modules: {
              include: {
                lessons: { select: { id: true } },
              },
            },
          },
        },
      },
    });

    // Get all completed lessons for user
    const completedLessons = await prisma.userProgress.findMany({
      where: { userId, entityType: 'LESSON', status: 'COMPLETED' },
      select: { entityId: true },
    });

    const completedLessonIds = new Set(completedLessons.map(p => p.entityId));

    // Calculate progress for each learning path
    const skills = learningPaths.map(path => {
      const allLessonIds = path.courses.flatMap(c => 
        c.modules.flatMap(m => m.lessons.map(l => l.id))
      );
      const totalLessons = allLessonIds.length;
      const completed = allLessonIds.filter(id => completedLessonIds.has(id)).length;
      const progress = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

      return {
        id: path.id,
        name: path.title,
        icon: path.icon,
        color: path.color,
        progress,
        lessonsCompleted: completed,
        totalLessons,
        difficulty: path.difficulty,
      };
    });

    res.json({
      success: true,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch skill breakdown.',
    });
  }
};

/**
 * Get learning recommendations based on progress
 */
export const getRecommendations = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required.' });
      return;
    }

    const userId = req.user.userId;

    // Get courses in progress
    const inProgress = await prisma.enrollment.findMany({
      where: { userId, status: 'IN_PROGRESS' },
      include: {
        course: {
          select: { id: true, title: true, slug: true, difficulty: true },
        },
      },
      orderBy: { enrolledAt: 'desc' },
      take: 3,
    });

    // Get courses not yet enrolled (recommended next)
    const enrolledCourseIds = (await prisma.enrollment.findMany({
      where: { userId },
      select: { courseId: true },
    })).map(e => e.courseId);

    const recommended = await prisma.course.findMany({
      where: {
        isPublished: true,
        id: { notIn: enrolledCourseIds.length > 0 ? enrolledCourseIds : ['none'] },
      },
      orderBy: { orderIndex: 'asc' },
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        difficulty: true,
        durationHours: true,
        learningPath: { select: { title: true, icon: true } },
      },
    });

    res.json({
      success: true,
      data: {
        continuelearning: inProgress.map(e => ({
          ...e.course,
          progress: e.progress,
        })),
        recommended,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch recommendations.',
    });
  }
};

/**
 * Get user's badges
 */
export const getUserBadges = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required.' });
      return;
    }

    const userBadges = await prisma.userBadge.findMany({
      where: { userId: req.user.userId },
      include: { badge: true },
      orderBy: { earnedAt: 'desc' },
    });

    // Get all available badges
    const allBadges = await prisma.badge.findMany({
      orderBy: { name: 'asc' },
    });

    const earnedIds = new Set(userBadges.map(ub => ub.badgeId));

    res.json({
      success: true,
      data: {
        earned: userBadges,
        available: allBadges.filter(b => !earnedIds.has(b.id)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch badges.',
    });
  }
};
