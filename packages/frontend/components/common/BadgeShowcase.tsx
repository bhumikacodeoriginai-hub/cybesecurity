'use client';

import { useState } from 'react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
  earnedAt?: string;
  xpReward: number;
}

const allBadges: Badge[] = [
  { id: '1', name: 'First Steps', description: 'Complete your first lesson', icon: '🚀', color: '#10b981', earned: true, earnedAt: '2024-03-01', xpReward: 25 },
  { id: '2', name: 'Quick Learner', description: 'Complete 10 lessons', icon: '⚡', color: '#f59e0b', earned: false, xpReward: 25 },
  { id: '3', name: 'Lab Rat', description: 'Complete your first practical lab', icon: '🧪', color: '#8b5cf6', earned: true, earnedAt: '2024-03-05', xpReward: 25 },
  { id: '4', name: 'Streak Master', description: 'Maintain a 7-day learning streak', icon: '🔥', color: '#ef4444', earned: false, xpReward: 25 },
  { id: '5', name: 'Security Researcher', description: 'Solve 5 CTF challenges', icon: '🔬', color: '#3b82f6', earned: false, xpReward: 25 },
  { id: '6', name: 'CTF Champion', description: 'Solve 10 CTF challenges', icon: '🏆', color: '#f97316', earned: false, xpReward: 50 },
  { id: '7', name: 'First Blood', description: 'Be the first to solve a challenge', icon: '🩸', color: '#dc2626', earned: false, xpReward: 50 },
  { id: '8', name: 'Network Ninja', description: 'Solve 5 network challenges', icon: '🌐', color: '#06b6d4', earned: false, xpReward: 25 },
  { id: '9', name: 'Linux Warrior', description: 'Solve 5 Linux challenges', icon: '🐧', color: '#84cc16', earned: false, xpReward: 25 },
  { id: '10', name: 'Web Guardian', description: 'Solve 5 web challenges', icon: '🛡️', color: '#d946ef', earned: false, xpReward: 25 },
  { id: '11', name: 'Crypto Breaker', description: 'Solve 3 crypto challenges', icon: '🔐', color: '#ec4899', earned: false, xpReward: 25 },
  { id: '12', name: 'Knowledge Seeker', description: 'Complete 50 lessons', icon: '📚', color: '#14b8a6', earned: false, xpReward: 50 },
  { id: '13', name: 'Lab Expert', description: 'Complete 10 labs', icon: '🔬', color: '#6366f1', earned: false, xpReward: 50 },
  { id: '14', name: 'Rising Star', description: 'Earn 1000 XP', icon: '⭐', color: '#eab308', earned: false, xpReward: 25 },
  { id: '15', name: 'Unstoppable', description: '30-day learning streak', icon: '💪', color: '#f43f5e', earned: false, xpReward: 100 },
  { id: '16', name: 'CTF Legend', description: 'Solve 25 CTF challenges', icon: '👑', color: '#f59e0b', earned: false, xpReward: 100 },
  { id: '17', name: 'Elite Hacker', description: 'Earn 5000 XP', icon: '💀', color: '#1e293b', earned: false, xpReward: 100 },
];

interface BadgeShowcaseProps {
  className?: string;
  showAll?: boolean;
}

export default function BadgeShowcase({ className = '', showAll = true }: BadgeShowcaseProps) {
  const [filter, setFilter] = useState<'all' | 'earned' | 'locked'>('all');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const earned = allBadges.filter(b => b.earned);
  const locked = allBadges.filter(b => !b.earned);

  const displayed = filter === 'earned' ? earned : filter === 'locked' ? locked : allBadges;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header + Filters */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-white flex items-center gap-2">
            🏆 Badges
            <span className="text-xs text-dark-400 font-normal">{earned.length}/{allBadges.length} earned</span>
          </h3>
        </div>
        {showAll && (
          <div className="flex gap-1 bg-dark-800 p-0.5 rounded-lg border border-dark-700">
            {(['all', 'earned', 'locked'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 py-1 rounded text-xs capitalize transition-all ${
                  filter === f ? 'bg-cyber-400/20 text-cyber-400' : 'text-dark-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-dark-400">Badge progress</span>
          <span className="text-cyber-400">{Math.round((earned.length / allBadges.length) * 100)}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${(earned.length / allBadges.length) * 100}%` }} />
        </div>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {displayed.map((badge) => (
          <button
            key={badge.id}
            onClick={() => setSelectedBadge(badge)}
            className={`group relative flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
              badge.earned
                ? 'bg-dark-800/80 border-dark-600 hover:border-cyber-400/30 hover:bg-dark-800'
                : 'bg-dark-800/30 border-dark-700/30 opacity-40 hover:opacity-70'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                badge.earned ? '' : 'grayscale'
              }`}
              style={{ backgroundColor: badge.earned ? `${badge.color}20` : undefined }}
            >
              {badge.icon}
            </div>
            <span className="text-[10px] text-dark-400 text-center leading-tight line-clamp-2">
              {badge.name}
            </span>
            {!badge.earned && (
              <span className="absolute top-1 right-1 text-[8px] text-dark-600">🔒</span>
            )}
          </button>
        ))}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedBadge(null)}
        >
          <div
            className="card max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-4xl mb-4"
              style={{ backgroundColor: `${selectedBadge.color}20` }}
            >
              {selectedBadge.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{selectedBadge.name}</h3>
            <p className="text-sm text-dark-400 mb-3">{selectedBadge.description}</p>

            {selectedBadge.earned ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <p className="text-sm text-green-400">✓ Earned on {selectedBadge.earnedAt}</p>
                <p className="text-xs text-dark-400 mt-1">+{selectedBadge.xpReward} XP awarded</p>
              </div>
            ) : (
              <div className="bg-dark-800/50 border border-dark-700/50 rounded-lg p-3">
                <p className="text-sm text-dark-400">🔒 Not yet earned</p>
                <p className="text-xs text-dark-500 mt-1">+{selectedBadge.xpReward} XP on unlock</p>
              </div>
            )}

            <button
              onClick={() => setSelectedBadge(null)}
              className="mt-4 btn-ghost text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
