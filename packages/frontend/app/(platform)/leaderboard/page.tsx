'use client';

const leaderboardData = [
  { rank: 1, name: 'CyberNinja42', xp: 8450, level: 'ADVANCED', badges: 15, streak: 28 },
  { rank: 2, name: 'H4ckTh3Pl4n3t', xp: 7890, level: 'ADVANCED', badges: 13, streak: 21 },
  { rank: 3, name: 'SecuR3Mind', xp: 7200, level: 'ADVANCED', badges: 12, streak: 14 },
  { rank: 4, name: 'BlueTeamLead', xp: 6800, level: 'INTERMEDIATE', badges: 11, streak: 19 },
  { rank: 5, name: 'NetDefender', xp: 5950, level: 'INTERMEDIATE', badges: 9, streak: 7 },
  { rank: 6, name: 'CryptoQueen', xp: 5400, level: 'INTERMEDIATE', badges: 8, streak: 12 },
  { rank: 7, name: 'LinuxMaster', xp: 4800, level: 'INTERMEDIATE', badges: 7, streak: 5 },
  { rank: 8, name: 'WebWarrior', xp: 3200, level: 'INTERMEDIATE', badges: 5, streak: 9 },
  { rank: 9, name: 'SOCwatcher', xp: 2100, level: 'BEGINNER', badges: 4, streak: 3 },
  { rank: 10, name: 'Demo Student', xp: 250, level: 'BEGINNER', badges: 1, streak: 3, isCurrentUser: true },
];

function getRankBadge(rank: number) {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `#${rank}`;
}

export default function LeaderboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">🏆 Leaderboard</h1>
        <p className="text-dark-400 mt-1">Top learners ranked by experience points</p>
      </div>

      {/* Your Rank */}
      <div className="card bg-cyber-400/5 border-cyber-400/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-dark-400">#10</span>
            <div>
              <p className="font-semibold text-white">Demo Student (You)</p>
              <p className="text-sm text-dark-400">250 XP · 1 badge · 3 day streak</p>
            </div>
          </div>
          <span className="badge-beginner">BEGINNER</span>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700/50">
                <th className="text-left text-xs font-medium text-dark-400 uppercase px-6 py-3">Rank</th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase px-6 py-3">Learner</th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase px-6 py-3">Level</th>
                <th className="text-right text-xs font-medium text-dark-400 uppercase px-6 py-3">XP</th>
                <th className="text-right text-xs font-medium text-dark-400 uppercase px-6 py-3">Badges</th>
                <th className="text-right text-xs font-medium text-dark-400 uppercase px-6 py-3">Streak</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user) => (
                <tr
                  key={user.rank}
                  className={`border-b border-dark-700/30 ${user.isCurrentUser ? 'bg-cyber-400/5' : 'hover:bg-dark-800/50'}`}
                >
                  <td className="px-6 py-4 text-lg">{getRankBadge(user.rank)}</td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${user.isCurrentUser ? 'text-cyber-400' : 'text-white'}`}>
                      {user.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge-${user.level.toLowerCase()}`}>{user.level}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-sm text-yellow-400">{user.xp.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-sm text-dark-300">{user.badges}</td>
                  <td className="px-6 py-4 text-right text-sm text-orange-400">🔥 {user.streak}d</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
