'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, switchRole, getActiveRole, User } from '@/lib/auth';

/**
 * Role Switcher Component
 * Allows switching between Admin, Instructor, and Student views
 * No login required - just click to switch perspective
 */
export default function RoleSwitcher() {
  const [activeRole, setActiveRole] = useState('STUDENT');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setActiveRole(getActiveRole());
    setUser(getCurrentUser());
  }, []);

  const handleSwitch = (role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT') => {
    const newUser = switchRole(role);
    setActiveRole(role);
    setUser(newUser);
    // Reload to update all components
    window.location.reload();
  };

  const roles = [
    { key: 'ADMIN', label: 'Admin', icon: '👑', color: 'text-red-400 bg-red-400/10 border-red-400/30' },
    { key: 'INSTRUCTOR', label: 'Instructor', icon: '🎓', color: 'text-purple-400 bg-purple-400/10 border-purple-400/30' },
    { key: 'STUDENT', label: 'Student', icon: '📚', color: 'text-cyber-400 bg-cyber-400/10 border-cyber-400/30' },
  ];

  return (
    <div className="flex items-center gap-1.5">
      {roles.map((role) => (
        <button
          key={role.key}
          onClick={() => handleSwitch(role.key as any)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
            activeRole === role.key
              ? role.color
              : 'text-dark-500 bg-dark-800/50 border-dark-700/50 hover:text-dark-300 hover:border-dark-600'
          }`}
        >
          <span>{role.icon}</span>
          <span>{role.label}</span>
        </button>
      ))}
    </div>
  );
}
