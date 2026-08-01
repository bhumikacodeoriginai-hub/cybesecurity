'use client';

import { useState } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'ACHIEVEMENT' | 'COURSE_UPDATE' | 'LAB_STATUS' | 'ANNOUNCEMENT';
  isRead: boolean;
  link?: string;
  createdAt: string;
}

const demoNotifications: Notification[] = [
  { id: '1', title: '🏆 Badge Earned!', message: 'You earned the "First Steps" badge! +25 XP', type: 'ACHIEVEMENT', isRead: false, link: '/profile', createdAt: '2024-03-10T14:00:00Z' },
  { id: '2', title: '🧪 Lab Completed', message: 'Linux File Permissions lab completed. +50 XP', type: 'LAB_STATUS', isRead: false, link: '/labs', createdAt: '2024-03-09T10:00:00Z' },
  { id: '3', title: '📚 Course Enrolled', message: 'You enrolled in "Introduction to Cybersecurity"', type: 'COURSE_UPDATE', isRead: true, link: '/courses/intro-to-cybersecurity', createdAt: '2024-03-08T09:00:00Z' },
  { id: '4', title: '📢 New Challenge', message: 'A new CTF challenge "Advanced SQL" has been added!', type: 'ANNOUNCEMENT', isRead: true, link: '/ctf', createdAt: '2024-03-07T16:00:00Z' },
];

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(demoNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const typeIcons: Record<string, string> = {
    ACHIEVEMENT: '🏆',
    COURSE_UPDATE: '📚',
    LAB_STATUS: '🧪',
    ANNOUNCEMENT: '📢',
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-12 w-80 bg-dark-800 border border-dark-700 rounded-xl shadow-2xl z-50 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-dark-700">
              <h4 className="text-sm font-semibold text-white">Notifications</h4>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-cyber-400 hover:text-cyber-300"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((n) => (
                <a
                  key={n.id}
                  href={n.link || '#'}
                  className={`block px-4 py-3 border-b border-dark-700/50 hover:bg-dark-700/50 transition-colors ${
                    !n.isRead ? 'bg-cyber-400/5' : ''
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{typeIcons[n.type]}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${!n.isRead ? 'text-white font-medium' : 'text-dark-300'}`}>
                        {n.title}
                      </p>
                      <p className="text-xs text-dark-500 mt-0.5 truncate">{n.message}</p>
                    </div>
                    {!n.isRead && (
                      <span className="w-2 h-2 bg-cyber-400 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                </a>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-dark-700 text-center">
              <a href="/notifications" className="text-xs text-dark-400 hover:text-white">
                View all notifications
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
