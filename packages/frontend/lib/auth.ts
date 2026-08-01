/**
 * Hardcoded Authentication Utility
 * No database required - works entirely client-side
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  level: string;
  xpPoints: number;
  currentStreak: number;
  avatarUrl: string | null;
}

// Hardcoded demo users
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'admin@cybersecacademy.com': {
    password: 'Admin123!',
    user: {
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
  },
  'instructor@cybersecacademy.com': {
    password: 'Admin123!',
    user: {
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
  },
  'student@cybersecacademy.com': {
    password: 'Student123!',
    user: {
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
  },
};

/**
 * Authenticate with hardcoded credentials
 */
export function authenticate(email: string, password: string): { success: boolean; user?: User; error?: string } {
  const entry = DEMO_USERS[email.toLowerCase().trim()];

  if (!entry) {
    return { success: false, error: 'Invalid username or password.' };
  }

  if (entry.password !== password) {
    return { success: false, error: 'Invalid username or password.' };
  }

  return { success: true, user: entry.user };
}

/**
 * Register a new user (demo mode - just stores in localStorage)
 */
export function registerUser(data: { firstName: string; lastName: string; email: string; password: string }): { success: boolean; user?: User; error?: string } {
  // Check if email already exists
  if (DEMO_USERS[data.email.toLowerCase()]) {
    return { success: false, error: 'An account with this email already exists.' };
  }

  const newUser: User = {
    id: `user-${Date.now()}`,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: 'STUDENT',
    level: 'BEGINNER',
    xpPoints: 0,
    currentStreak: 0,
    avatarUrl: null,
  };

  return { success: true, user: newUser };
}

/**
 * Save user session to localStorage
 */
export function saveSession(user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', 'demo-token-' + user.id);
    localStorage.setItem('isLoggedIn', 'true');
  }
}

/**
 * Get current user from localStorage
 */
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (!isLoggedIn) return null;

  const userData = localStorage.getItem('user');
  if (!userData) return null;

  try {
    return JSON.parse(userData) as User;
  } catch {
    return null;
  }
}

/**
 * Check if user is logged in
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isLoggedIn') === 'true';
}

/**
 * Logout - clear session
 */
export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('isLoggedIn');
  }
}
