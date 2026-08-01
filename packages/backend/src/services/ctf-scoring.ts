import bcrypt from 'bcryptjs';
import prisma from '../models/prisma';
import { badgeEngine } from './badge-engine';

/**
 * CTF Scoring Engine
 * 
 * Handles:
 * - Flag validation (bcrypt hash comparison)
 * - Dynamic scoring (points decrease as more people solve)
 * - Attempt tracking and rate limiting
 * - First blood bonus
 * - Streak multipliers
 * - Category score aggregation
 */

export interface FlagSubmissionResult {
  correct: boolean;
  message: string;
  pointsAwarded?: number;
  firstBlood?: boolean;
  attemptsRemaining?: number;
  totalScore?: number;
  newBadges?: string[];
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  displayName: string;
  totalScore: number;
  challengesSolved: number;
  lastSolveAt: Date | null;
  level: string;
  avatarUrl?: string | null;
}

export interface UserCTFStats {
  totalScore: number;
  rank: number;
  challengesSolved: number;
  totalAttempts: number;
  firstBloods: number;
  categoryBreakdown: { category: string; solved: number; total: number; score: number }[];
  recentSolves: { title: string; category: string; points: number; solvedAt: Date }[];
  streak: number;
}

// Dynamic scoring config
const DYNAMIC_SCORING = {
  initialPoints: 500,    // Starting points for a new challenge
  minPoints: 50,         // Minimum points a challenge can be worth
  decayRate: 15,         // Points lost per additional solver
  firstBloodBonus: 50,   // Extra points for first solve
};

class CTFScoringEngine {
  /**
   * Submit a flag for a challenge
   */
  async submitFlag(
    challengeId: string,
    userId: string,
    submission: string
  ): Promise<FlagSubmissionResult> {
    // Get challenge
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge) {
      return { correct: false, message: 'Challenge not found.' };
    }

    if (!challenge.isActive) {
      return { correct: false, message: 'This challenge is no longer active.' };
    }

    // Check if already solved
    const alreadySolved = await prisma.challengeAttempt.findFirst({
      where: { challengeId, userId, isCorrect: true },
    });

    if (alreadySolved) {
      return { correct: false, message: 'You have already solved this challenge.' };
    }

    // Check attempt limit
    const attemptCount = await prisma.challengeAttempt.count({
      where: { challengeId, userId },
    });

    if (attemptCount >= challenge.maxAttempts) {
      return {
        correct: false,
        message: 'Maximum attempts reached for this challenge.',
        attemptsRemaining: 0,
      };
    }

    // Validate flag
    const isCorrect = await this.validateFlag(submission, challenge.flagHash);

    // Record attempt
    await prisma.challengeAttempt.create({
      data: {
        challengeId,
        userId,
        submission: isCorrect ? '[REDACTED]' : submission.substring(0, 100),
        isCorrect,
      },
    });

    if (!isCorrect) {
      const remaining = challenge.maxAttempts - attemptCount - 1;
      return {
        correct: false,
        message: remaining > 0
          ? `Incorrect flag. ${remaining} attempts remaining.`
          : 'Incorrect flag. No attempts remaining.',
        attemptsRemaining: remaining,
      };
    }

    // === CORRECT FLAG ===

    // Calculate points (dynamic scoring)
    const points = await this.calculatePoints(challenge);

    // Check first blood
    const isFirstBlood = challenge.solveCount === 0;
    const totalPoints = points + (isFirstBlood ? DYNAMIC_SCORING.firstBloodBonus : 0);

    // Update challenge solve count
    await prisma.challenge.update({
      where: { id: challengeId },
      data: { solveCount: { increment: 1 } },
    });

    // Award XP to user
    await prisma.user.update({
      where: { id: userId },
      data: { xpPoints: { increment: totalPoints } },
    });

    // Update user progress
    await prisma.userProgress.upsert({
      where: {
        userId_entityType_entityId: {
          userId,
          entityType: 'CHALLENGE',
          entityId: challengeId,
        },
      },
      update: {
        status: 'COMPLETED',
        score: totalPoints,
        completedAt: new Date(),
      },
      create: {
        userId,
        entityType: 'CHALLENGE',
        entityId: challengeId,
        status: 'COMPLETED',
        score: totalPoints,
        completedAt: new Date(),
      },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        userId,
        title: isFirstBlood ? '🩸 First Blood!' : '🚩 Challenge Solved!',
        message: `You solved "${challenge.title}" for ${totalPoints} points!${isFirstBlood ? ' First blood bonus!' : ''}`,
        type: 'ACHIEVEMENT',
        link: `/ctf/${challenge.slug}`,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId,
        action: 'CTF_FLAG_CORRECT',
        entityType: 'CHALLENGE',
        entityId: challengeId,
        metadata: { points: totalPoints, firstBlood: isFirstBlood },
      },
    });

    // Check and award badges
    const newBadges = await badgeEngine.checkAndAwardBadges(userId, 'CTF_SOLVE', {
      challengeId,
      category: challenge.category,
      firstBlood: isFirstBlood,
    });

    // Get user's total score
    const totalScore = await this.getUserTotalScore(userId);

    return {
      correct: true,
      message: isFirstBlood
        ? `🩸 First Blood! Solved for ${totalPoints} points (includes +${DYNAMIC_SCORING.firstBloodBonus} first blood bonus)!`
        : `Correct! +${totalPoints} points!`,
      pointsAwarded: totalPoints,
      firstBlood: isFirstBlood,
      attemptsRemaining: challenge.maxAttempts - attemptCount - 1,
      totalScore,
      newBadges,
    };
  }

  /**
   * Validate a submitted flag against the stored hash
   */
  private async validateFlag(submission: string, flagHash: string): Promise<boolean> {
    const cleaned = submission.trim();
    return bcrypt.compare(cleaned, flagHash);
  }

  /**
   * Calculate dynamic points for a challenge
   * Points decrease as more people solve it
   */
  private async calculatePoints(challenge: any): Promise<number> {
    const basePoints = challenge.points;
    const solvers = challenge.solveCount;

    // Dynamic scoring formula
    const dynamicPoints = Math.max(
      DYNAMIC_SCORING.minPoints,
      basePoints - (solvers * DYNAMIC_SCORING.decayRate)
    );

    return dynamicPoints;
  }

  /**
   * Get user's total CTF score
   */
  async getUserTotalScore(userId: string): Promise<number> {
    const result = await prisma.userProgress.aggregate({
      where: {
        userId,
        entityType: 'CHALLENGE',
        status: 'COMPLETED',
      },
      _sum: { score: true },
    });

    return result._sum.score || 0;
  }

  /**
   * Get global leaderboard
   */
  async getLeaderboard(options: {
    limit?: number;
    offset?: number;
    timeframe?: 'all' | 'monthly' | 'weekly';
    category?: string;
  } = {}): Promise<{ entries: LeaderboardEntry[]; total: number }> {
    const { limit = 50, offset = 0, timeframe = 'all', category } = options;

    // Date filter
    let dateFilter: Date | undefined;
    if (timeframe === 'weekly') {
      dateFilter = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    } else if (timeframe === 'monthly') {
      dateFilter = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }

    // Build query for users with challenge solves
    const whereClause: any = {
      entityType: 'CHALLENGE',
      status: 'COMPLETED',
    };
    if (dateFilter) {
      whereClause.completedAt = { gte: dateFilter };
    }

    // Get aggregated scores per user
    const scores = await prisma.userProgress.groupBy({
      by: ['userId'],
      where: whereClause,
      _sum: { score: true },
      _count: { entityId: true },
      _max: { completedAt: true },
      orderBy: { _sum: { score: 'desc' } },
      skip: offset,
      take: limit,
    });

    const total = await prisma.userProgress.groupBy({
      by: ['userId'],
      where: whereClause,
    });

    // Get user details
    const userIds = scores.map(s => s.userId);
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        level: true,
        avatarUrl: true,
      },
    });

    const userMap = new Map(users.map(u => [u.id, u]));

    const entries: LeaderboardEntry[] = scores.map((score, idx) => {
      const user = userMap.get(score.userId);
      return {
        rank: offset + idx + 1,
        userId: score.userId,
        username: user ? `${user.firstName} ${user.lastName.charAt(0)}.` : 'Unknown',
        displayName: user ? `${user.firstName} ${user.lastName}` : 'Unknown User',
        totalScore: score._sum.score || 0,
        challengesSolved: score._count.entityId,
        lastSolveAt: score._max.completedAt,
        level: user?.level || 'BEGINNER',
        avatarUrl: user?.avatarUrl,
      };
    });

    return { entries, total: total.length };
  }

  /**
   * Get detailed CTF stats for a user
   */
  async getUserStats(userId: string): Promise<UserCTFStats> {
    // Total score and solves
    const scoreAgg = await prisma.userProgress.aggregate({
      where: { userId, entityType: 'CHALLENGE', status: 'COMPLETED' },
      _sum: { score: true },
      _count: { entityId: true },
    });

    // Total attempts
    const totalAttempts = await prisma.challengeAttempt.count({
      where: { userId },
    });

    // First bloods (check if user was first solver)
    const userSolves = await prisma.challengeAttempt.findMany({
      where: { userId, isCorrect: true },
      orderBy: { attemptedAt: 'asc' },
      include: { challenge: { select: { id: true, title: true, category: true } } },
    });

    let firstBloods = 0;
    for (const solve of userSolves) {
      const earlierSolves = await prisma.challengeAttempt.count({
        where: {
          challengeId: solve.challengeId,
          isCorrect: true,
          attemptedAt: { lt: solve.attemptedAt },
        },
      });
      if (earlierSolves === 0) firstBloods++;
    }

    // Category breakdown
    const allChallenges = await prisma.challenge.groupBy({
      by: ['category'],
      _count: { id: true },
    });

    const solvedByCategory = await prisma.challengeAttempt.findMany({
      where: { userId, isCorrect: true },
      include: { challenge: { select: { category: true } } },
    });

    const categoryScores = await prisma.userProgress.findMany({
      where: { userId, entityType: 'CHALLENGE', status: 'COMPLETED' },
      select: { entityId: true, score: true },
    });

    const solvedChallengeIds = new Set(solvedByCategory.map(s => s.challengeId));
    const scoreMap = new Map(categoryScores.map(s => [s.entityId, s.score || 0]));

    const categoryBreakdown = allChallenges.map(cat => {
      const solvedInCat = solvedByCategory.filter(s => s.challenge.category === cat.category);
      const catScore = solvedInCat.reduce((sum, s) => sum + (scoreMap.get(s.challengeId) || 0), 0);
      return {
        category: cat.category,
        solved: solvedInCat.length,
        total: cat._count.id,
        score: catScore,
      };
    });

    // Recent solves
    const recentSolves = await prisma.challengeAttempt.findMany({
      where: { userId, isCorrect: true },
      orderBy: { attemptedAt: 'desc' },
      take: 10,
      include: { challenge: { select: { title: true, category: true, points: true } } },
    });

    // Get rank
    const leaderboard = await this.getLeaderboard({ limit: 1000 });
    const userEntry = leaderboard.entries.find(e => e.userId === userId);
    const rank = userEntry?.rank || leaderboard.total + 1;

    return {
      totalScore: scoreAgg._sum.score || 0,
      rank,
      challengesSolved: scoreAgg._count.entityId,
      totalAttempts,
      firstBloods,
      categoryBreakdown,
      recentSolves: recentSolves.map(s => ({
        title: s.challenge.title,
        category: s.challenge.category,
        points: s.challenge.points,
        solvedAt: s.attemptedAt,
      })),
      streak: 0, // TODO: Calculate solve streak
    };
  }

  /**
   * Get hint for a challenge (costs points)
   */
  async getHint(
    challengeId: string,
    userId: string,
    hintIndex: number
  ): Promise<{ hint: string; cost: number } | { error: string }> {
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge) return { error: 'Challenge not found.' };

    const hints = challenge.hints as string[];
    if (hintIndex < 0 || hintIndex >= hints.length) {
      return { error: 'Invalid hint index.' };
    }

    // Each hint costs 10% of the challenge points
    const cost = Math.floor(challenge.points * 0.1);

    // Record hint usage (deduct from potential score)
    await prisma.auditLog.create({
      data: {
        userId,
        action: 'CTF_HINT_USED',
        entityType: 'CHALLENGE',
        entityId: challengeId,
        metadata: { hintIndex, cost },
      },
    });

    return { hint: hints[hintIndex], cost };
  }
}

export const ctfScoringEngine = new CTFScoringEngine();
export default ctfScoringEngine;
