/**
 * Simple user state - NO LOGIN, NO ROLES, NO SWITCHER
 * Single unified platform for all learners
 */

export interface User {
  firstName: string;
  lastName: string;
  xpPoints: number;
  level: string;
  currentStreak: number;
}

export function getCurrentUser(): User {
  return {
    firstName: 'Learner',
    lastName: '',
    xpPoints: 250,
    level: 'BEGINNER',
    currentStreak: 3,
  };
}
