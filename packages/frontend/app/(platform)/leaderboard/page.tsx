'use client';

import { useState } from 'react';

const leaderboardData = [
  { rank: 1, name: 'CyberNinja42', xp: 8450, score: 2350, solves: 18, level: 'ADVANCED', badges: 15, streak: 28, firstBloods: 3 },
  { rank: 2, name: 'H4ckTh3Pl4n3t', xp: 7890, score: 2100, solves: 16, level: 'ADVANCED', badges: 13, streak: 21, firstBloods: 2 },
  { rank: 3, name: 'SecuR3Mind', xp: 7200, score: 1950, solves: 15, level: 'ADVANCED', badges: 12, streak: 14, firstBloods: 1 },
  { rank: 4, name: 'BlueTeamLead', xp: 6800, score: 1800, solves: 14, level: 'INTERMEDIATE', badges: 11, streak: 19, firstBloods: 2 },
  { rank: 5, name: 'NetDefender', xp: 5950, score: 1650, solves: 13, level: 'INTERMEDIATE', badges: 9, streak: 7, firstBloods: 0 },
  { rank: 6, name: 'CryptoQueen', xp: 5400, score: 1500, solves: 12, level: 'INTERMEDIATE', badges: 8, streak: 12, firstBloods: 1 },
  { rank: 7, name: 'LinuxMaster', xp: 4800, score: 1350, solves: 11, level: 'INTERMEDIATE', badges: 7, streak: 5, firstBloods: 0 },
  { rank: 8, name: 'WebWarrior', xp: 3200, score: 1050, solves: 9, level: 'INTERMEDIATE', badges: 5, streak: 9, firstBloods: 1 },
  { rank: 9, name: 'SOCwatcher', xp: 2100, score: 750, solves: 7, level: 'BEGINNER', badges: 4, streak: 3, firstBloods: 0 },
  { rank: 10, name: 'ForensicFox', xp: 1800, score: 600, solves: 5, level: 'BEGINNER', badges: 3, streak: 2, firstBloods: 0 },
  { rank: 11, name: 'CloudGuard', xp: 1500, score: 450, solves: 4, level: 'BEGINNER', badges: 2, streak: 1, firstBloods: 0 },
  { rank: 12, name: 'Demo Student', xp: 250, score: 0, solves: 0, level: 'BEGINNER', badges: 1, streak: 3, firstBloods: 0, isCurrentUser: true },
];

type TimeFrame = 'all' | 'monthly' | 'weekly';
type SortBy = 'score' | 'xp' | 'solves' | 'streak';

function getRankDisplay(rank: number) {
  if (rank === 1) return { icon: '🥇', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
  if (rank === 2) return { icon: '🥈', bg: 'bg-gray-400/10', border: 'border-gray-400/30' };
  if (rank === 3) return { icon: '🥉', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
  return { icon: `#${rank}`, bg: '', border: '' };
}

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<TimeFrame>('all');
  const [sortBy, setSortBy] = useState<SortBy>('score');

  const sorted = [...leaderboardData].sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'xp') return b.xp - a.xp;
    if (sortBy === 'solves') return b.solves - a.solves;
    if (sortBy === 'streak') return b.streak - a.streak;
    return 0;
  }).map((entry, idx) => ({ ...entry, rank: idx + 1 }));

  const currentUser = sorted.find(u => u.isCurrentUser);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">🏆 Leaderboard</h1>
          <p className="text-dark-400 mt-1">Top cybersecurity learners ranked by CTF score</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-dark-500">Last updated:</span>
          <span className="text-dark-400">Just now</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Timeframe */}
        <div className="flex bg-dark-800 rounded-lg p-1 border border-dark-700">
          {([['all', 'All Time'], ['monthly', 'Monthly'], ['weekly', 'Weekly']] as [TimeFrame, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTimeframe(key)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                timeframe === key
                  ? 'bg-cyber-400/20 text-cyber-400'
                  : 'text-dark-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex bg-dark-800 rounded-lg p-1 border border-dark-700">
          {([['score', 'CTF Score'], ['xp', 'Total XP'], ['solves', 'Solves'], ['streak', 'Streak']] as [SortBy, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                sortBy === key
                  ? 'bg-cyber-400/20 text-cyber-400'
                  : 'text-dark-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4">
        {sorted.slice(0, 3).map((user) => {
          const { icon, bg, border } = getRankDisplay(user.rank);
          return (
            <div key={user.rank} className={`card text-center ${bg} border ${border || 'border-dark-700/50'} ${user.rank === 1 ? 'scale-105' : ''}`}>
              <div className="text-3xl mb-2">{icon}</div>
              <p className="font-semibold text-white text-sm">{user.name}</p>
              <p className="text-2xl font-bold text-cyber-400 mt-1">{user.score.toLocaleString()}</p>
              <p className="text-xs text-dark-400">CTF points</p>
              <div className="flex items-center justify-center gap-3 mt-2 text-xs text-dark-500">
                <span>{user.solves} solves</span>
                {user.firstBloods > 0 && <span className="text-red-400">🩸{user.firstBloods}</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Your Position */}
      {currentUser && (
        <div className="card bg-cyber-400/5 border-cyber-400/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-dark-400">#{currentUser.rank}</span>
              <div className="w-9 h-9 bg-cyber-400/20 rounded-full flex items-center justify-center">
                <span className="text-cyber-400 text-sm font-bold">DS</span>
              </div>
              <div>
                <p className="font-semibold text-white">{currentUser.name} <span className="text-xs text-cyber-400">(You)</span></p>
                <p className="text-xs text-dark-400">{currentUser.solves} challenges solved · 🔥 {currentUser.streak} day streak</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-cyber-400">{currentUser.score}</p>
              <p className="text-xs text-dark-500">CTF pts</p>
            </div>
          </div>
        </div>
      )}

      {/* Full Table */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700/50 bg-dark-800/50">
                <th className="text-left text-xs font-medium text-dark-400 uppercase px-4 py-3 w-16">Rank</th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase px-4 py-3">Player</th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase px-4 py-3">Level</th>
                <th className="text-right text-xs font-medium text-dark-400 uppercase px-4 py-3">CTF Score</th>
                <th className="text-right text-xs font-medium text-dark-400 uppercase px-4 py-3">Solves</th>
                <th className="text-right text-xs font-medium text-dark-400 uppercase px-4 py-3">🩸</th>
                <th className="text-right text-xs font-medium text-dark-400 uppercase px-4 py-3">Streak</th>
                <th className="text-right text-xs font-medium text-dark-400 uppercase px-4 py-3">Badges</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((user) => {
                const { icon } = getRankDisplay(user.rank);
                return (
                  <tr
                    key={user.rank}
                    className={`border-b border-dark-700/20 transition-colors ${
                      user.isCurrentUser
                        ? 'bg-cyber-400/5'
                        : 'hover:bg-dark-800/30'
                    }`}
                  >
                    <td className="px-4 py-3 text-sm font-medium">{icon}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-medium ${user.isCurrentUser ? 'text-cyber-400' : 'text-white'}`}>
                        {user.name}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge-${user.level.toLowerCase()}`}>{user.level}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-sm text-cyber-400 font-medium">
                      {user.score.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-dark-300">{user.solves}</td>
                    <td className="px-4 py-3 text-right text-sm text-red-400">{user.firstBloods || '-'}</td>
                    <td className="px-4 py-3 text-right text-sm text-orange-400">
                      {user.streak > 0 ? `🔥${user.streak}d` : '-'}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-dark-400">{user.badges}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
