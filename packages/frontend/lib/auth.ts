/**
 * Role-based view switcher - NO LOGIN REQUIRED
 * All pages are directly accessible
 * Click a role to switch the view perspective
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'SUPER_ADMIN' | 'INSTRUCTOR' | 'STUDENT';
  level: string;
  xpPoints: number;
  currentStreak: number;
  avatarUrl: string | null;
}

// Pre-defined role profiles
export const ROLES: Record<string, User> = {
  ADMIN: {
    id: 'user-admin-001',
    email: 'admin@cybersecacademy.com',
    firstName: 'System',
    lastName: 'Admin',
    role: 'SUPER_ADMIN',
    level: 'PROFESSIONAL',
    xpPoints: 9999,
    currentStreak: 45,
    avatarUrl: null,
  },
  INSTRUCTOR: {
    id: 'user-instructor-001',
    email: 'instructor@cybersecacademy.com',
    firstName: 'Alex',
    lastName: 'Morgan',
    role: 'INSTRUCTOR',
    level: 'ADVANCED',
    xpPoints: 5200,
    currentStreak: 12,
    avatarUrl: null,
  },
  STUDENT: {
    id: 'user-student-001',
    email: 'student@cybersecacademy.com',
    firstName: 'Demo',
    lastName: 'Student',
    role: 'STUDENT',
    level: 'BEGINNER',
    xpPoints: 250,
    currentStreak: 3,
    avatarUrl: null,
  },
};

/**
 * Get current active role (defaults to STUDENT)
 */
export function getCurrentUser(): User {
  if (typeof window === 'undefined') return ROLES.STUDENT;

  const savedRole = localStorage.getItem('activeRole');
  if (savedRole && ROLES[savedRole]) {
    return ROLES[savedRole];
  }
  return ROLES.STUDENT;
}

/**
 * Switch active role
 */
export function switchRole(role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT'): User {
  if (typeof window !== 'undefined') {
    localStorage.setItem('activeRole', role);
  }
  return ROLES[role];
}

/**
 * Get current role key
 */
export function getActiveRole(): string {
  if (typeof window === 'undefined') return 'STUDENT';
  return localStorage.getItem('activeRole') || 'STUDENT';
}

// Keep these for backward compatibility but they do nothing now
export function isAuthenticated(): boolean { return true; }
export function logout(): void {}
export function saveSession(user: User): void {}
export function authenticate(email: string, password: string) { return { success: true, user: ROLES.STUDENT }; }
export function registerUser(data: any) { return { success: true, user: ROLES.STUDENT }; }
