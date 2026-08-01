import { UserRole, UserLevel } from '@prisma/client';

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  level: UserLevel;
}

export interface AuthenticatedRequest extends Express.Request {
  user?: JwtPayload;
}

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProgressOverview {
  totalXp: number;
  level: UserLevel;
  currentStreak: number;
  longestStreak: number;
  coursesCompleted: number;
  coursesInProgress: number;
  labsCompleted: number;
  challengesSolved: number;
  quizzesPassed: number;
  badgesEarned: number;
  skillBreakdown: SkillProgress[];
}

export interface SkillProgress {
  name: string;
  progress: number; // 0-100
  lessonsCompleted: number;
  totalLessons: number;
}
