import prisma from '../models/prisma';

/**
 * Badge Automation Engine
 * 
 * Automatically awards badges based on user achievements.
 * Triggered by various events (CTF solve, lab complete, lesson complete, etc.)
 * 
 * Badge criteria types:
 * - CTF_SOLVE: Awarded on challenge solve milestones
 * - LAB_COMPLETE: Awarded on lab completion milestones
 * - LESSON_COMPLETE: Awarded on lesson completion milestones
 * - STREAK: Awarded on learning streak milestones
 * - FIRST_BLOOD: Awarded on first solving a challenge
 * - CATEGORY_MASTER: Awarded for completing all challenges in a category
 * - XP_MILESTONE: Awarded on XP thresholds
 */

export type TriggerEvent =
  | 'CTF_SOLVE'
  | 'LAB_COMPLETE'
  | 'LESSON_COMPLETE'
  | 'STREAK_UPDATE'
  | 'COURSE_COMPLETE'
  | 'XP_UPDATE';

interface TriggerContext {
  challengeId?: string;
  category?: string;
  firstBlood?: boolean;
  labId?: string;
  lessonId?: string;
  courseId?: string;
  streak?: number;
  totalXp?: number;
}

interface BadgeCriteria {
  badgeName: string;
  check: (userId: string, context: TriggerContext) => Promise<boolean>;
}

class BadgeEngine {
  private criteria: Map<TriggerEvent, BadgeCriteria[]> = new Map();

  constructor() {
    this.registerAllCriteria();
  }

  /**
   * Check and award badges after a trigger event
   */
  async checkAndAwardBadges(
    userId: string,
    event: TriggerEvent,
    context: TriggerContext
  ): Promise<string[]> {
    const criteriaList = this.criteria.get(event) || [];
    const awardedBadges: string[] = [];

    for (const criteria of criteriaList) {
      try {
        // Check if user already has this badge
        const badge = await prisma.badge.findUnique({
          where: { name: criteria.badgeName },
        });

        if (!badge) continue;

        const alreadyHas = await prisma.userBadge.findUnique({
          where: {
            userId_badgeId: { userId, badgeId: badge.id },
          },
        });

        if (alreadyHas) continue;

        // Check criteria
        const qualified = await criteria.check(userId, context);

        if (qualified) {
          // Award badge
          await prisma.userBadge.create({
            data: { userId, badgeId: badge.id },
          });

          // Award badge XP
          await prisma.user.update({
            where: { id: userId },
            data: { xpPoints: { increment: badge.xpReward } },
          });

          // Create notification
          await prisma.notification.create({
            data: {
              userId,
              title: '🏆 Badge Earned!',
              message: `You earned the "${badge.name}" badge! +${badge.xpReward} XP`,
              type: 'ACHIEVEMENT',
              link: '/profile',
            },
          });

          awardedBadges.push(badge.name);
        }
      } catch (error) {
        console.error(`Badge check error for ${criteria.badgeName}:`, error);
      }
    }

    return awardedBadges;
  }

  /**
   * Register all badge criteria
   */
  private registerAllCriteria(): void {
    // === CTF SOLVE BADGES ===
    this.register('CTF_SOLVE', {
      badgeName: 'Security Researcher',
      check: async (userId) => {
        const count = await prisma.challengeAttempt.count({
          where: { userId, isCorrect: true },
        });
        return count >= 5;
      },
    });

    this.register('CTF_SOLVE', {
      badgeName: 'CTF Champion',
      check: async (userId) => {
        const count = await prisma.challengeAttempt.count({
          where: { userId, isCorrect: true },
        });
        return count >= 10;
      },
    });

    this.register('CTF_SOLVE', {
      badgeName: 'CTF Legend',
      check: async (userId) => {
        const count = await prisma.challengeAttempt.count({
          where: { userId, isCorrect: true },
        });
        return count >= 25;
      },
    });

    this.register('CTF_SOLVE', {
      badgeName: 'First Blood',
      check: async (userId, context) => {
        return context.firstBlood === true;
      },
    });

    this.register('CTF_SOLVE', {
      badgeName: 'Web Guardian',
      check: async (userId) => {
        const webSolves = await prisma.challengeAttempt.count({
          where: {
            userId,
            isCorrect: true,
            challenge: { category: 'WEB' },
          },
        });
        return webSolves >= 5;
      },
    });

    this.register('CTF_SOLVE', {
      badgeName: 'Network Ninja',
      check: async (userId) => {
        const netSolves = await prisma.challengeAttempt.count({
          where: {
            userId,
            isCorrect: true,
            challenge: { category: 'NETWORK' },
          },
        });
        return netSolves >= 5;
      },
    });

    this.register('CTF_SOLVE', {
      badgeName: 'Linux Warrior',
      check: async (userId) => {
        const linuxSolves = await prisma.challengeAttempt.count({
          where: {
            userId,
            isCorrect: true,
            challenge: { category: 'LINUX' },
          },
        });
        return linuxSolves >= 5;
      },
    });

    this.register('CTF_SOLVE', {
      badgeName: 'Crypto Breaker',
      check: async (userId) => {
        const cryptoSolves = await prisma.challengeAttempt.count({
          where: {
            userId,
            isCorrect: true,
            challenge: { category: 'CRYPTO' },
          },
        });
        return cryptoSolves >= 3;
      },
    });

    // === LAB BADGES ===
    this.register('LAB_COMPLETE', {
      badgeName: 'Lab Rat',
      check: async (userId) => {
        const count = await prisma.userProgress.count({
          where: { userId, entityType: 'LAB', status: 'COMPLETED' },
        });
        return count >= 1;
      },
    });

    this.register('LAB_COMPLETE', {
      badgeName: 'Lab Expert',
      check: async (userId) => {
        const count = await prisma.userProgress.count({
          where: { userId, entityType: 'LAB', status: 'COMPLETED' },
        });
        return count >= 10;
      },
    });

    // === LESSON BADGES ===
    this.register('LESSON_COMPLETE', {
      badgeName: 'First Steps',
      check: async (userId) => {
        const count = await prisma.userProgress.count({
          where: { userId, entityType: 'LESSON', status: 'COMPLETED' },
        });
        return count >= 1;
      },
    });

    this.register('LESSON_COMPLETE', {
      badgeName: 'Quick Learner',
      check: async (userId) => {
        const count = await prisma.userProgress.count({
          where: { userId, entityType: 'LESSON', status: 'COMPLETED' },
        });
        return count >= 10;
      },
    });

    this.register('LESSON_COMPLETE', {
      badgeName: 'Knowledge Seeker',
      check: async (userId) => {
        const count = await prisma.userProgress.count({
          where: { userId, entityType: 'LESSON', status: 'COMPLETED' },
        });
        return count >= 50;
      },
    });

    // === STREAK BADGES ===
    this.register('STREAK_UPDATE', {
      badgeName: 'Streak Master',
      check: async (userId) => {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { currentStreak: true },
        });
        return (user?.currentStreak || 0) >= 7;
      },
    });

    this.register('STREAK_UPDATE', {
      badgeName: 'Unstoppable',
      check: async (userId) => {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { currentStreak: true },
        });
        return (user?.currentStreak || 0) >= 30;
      },
    });

    // === XP BADGES ===
    this.register('XP_UPDATE', {
      badgeName: 'Rising Star',
      check: async (userId) => {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { xpPoints: true },
        });
        return (user?.xpPoints || 0) >= 1000;
      },
    });

    this.register('XP_UPDATE', {
      badgeName: 'Elite Hacker',
      check: async (userId) => {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { xpPoints: true },
        });
        return (user?.xpPoints || 0) >= 5000;
      },
    });
  }

  private register(event: TriggerEvent, criteria: BadgeCriteria): void {
    const existing = this.criteria.get(event) || [];
    existing.push(criteria);
    this.criteria.set(event, existing);
  }
}

export const badgeEngine = new BadgeEngine();
export default badgeEngine;
