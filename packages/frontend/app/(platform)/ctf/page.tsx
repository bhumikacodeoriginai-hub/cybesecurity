'use client';

import { useState } from 'react';
import Link from 'next/link';

const challenges = [
  // WEB
  { id: '1', title: 'Hello Security', slug: 'hello-security', category: 'WEB', difficulty: 'BEGINNER', points: 50, solves: 234, solved: false },
  { id: '2', title: 'Cookie Monster', slug: 'cookie-monster', category: 'WEB', difficulty: 'BEGINNER', points: 75, solves: 189, solved: false },
  { id: '3', title: 'Broken Authentication', slug: 'broken-authentication', category: 'WEB', difficulty: 'INTERMEDIATE', points: 150, solves: 67, solved: false },
  { id: '4', title: 'Hidden API', slug: 'hidden-api', category: 'WEB', difficulty: 'INTERMEDIATE', points: 125, solves: 98, solved: false },
  { id: '5', title: 'XSS Playground', slug: 'xss-playground', category: 'WEB', difficulty: 'ADVANCED', points: 200, solves: 34, solved: false },
  { id: '6', title: 'JWT Forgery', slug: 'jwt-forgery', category: 'WEB', difficulty: 'ADVANCED', points: 250, solves: 21, solved: false },
  // CRYPTO
  { id: '7', title: 'Base64 Decode', slug: 'base64-decode', category: 'CRYPTO', difficulty: 'BEGINNER', points: 50, solves: 312, solved: false },
  { id: '8', title: 'Caesar Shift', slug: 'caesar-shift', category: 'CRYPTO', difficulty: 'BEGINNER', points: 75, solves: 198, solved: false },
  { id: '9', title: 'Hash Cracker', slug: 'hash-cracker', category: 'CRYPTO', difficulty: 'INTERMEDIATE', points: 125, solves: 112, solved: false },
  { id: '10', title: 'RSA Weak Key', slug: 'rsa-weak-key', category: 'CRYPTO', difficulty: 'ADVANCED', points: 200, solves: 15, solved: false },
  // LINUX
  { id: '11', title: 'Find the User', slug: 'find-the-user', category: 'LINUX', difficulty: 'BEGINNER', points: 75, solves: 145, solved: false },
  { id: '12', title: 'Hidden in Plain Sight', slug: 'hidden-plain-sight', category: 'LINUX', difficulty: 'BEGINNER', points: 75, solves: 167, solved: false },
  { id: '13', title: 'Permission Denied', slug: 'permission-denied', category: 'LINUX', difficulty: 'INTERMEDIATE', points: 150, solves: 78, solved: false },
  { id: '14', title: 'Cron Job Exploit', slug: 'cron-job-exploit', category: 'LINUX', difficulty: 'ADVANCED', points: 200, solves: 29, solved: false },
  { id: '15', title: 'Log Forensics', slug: 'log-forensics', category: 'LINUX', difficulty: 'INTERMEDIATE', points: 125, solves: 89, solved: false },
  // NETWORK
  { id: '16', title: 'Port Scan Analysis', slug: 'port-scan-analysis', category: 'NETWORK', difficulty: 'BEGINNER', points: 75, solves: 201, solved: false },
  { id: '17', title: 'Packet Detective', slug: 'packet-detective', category: 'NETWORK', difficulty: 'INTERMEDIATE', points: 100, solves: 89, solved: false },
  { id: '18', title: 'Man in the Middle', slug: 'man-in-the-middle', category: 'NETWORK', difficulty: 'ADVANCED', points: 200, solves: 18, solved: false },
  { id: '19', title: 'Firewall Bypass', slug: 'firewall-bypass', category: 'NETWORK', difficulty: 'ADVANCED', points: 175, solves: 23, solved: false },
  // FORENSICS
  { id: '20', title: 'Metadata Secrets', slug: 'metadata-secrets', category: 'FORENSICS', difficulty: 'BEGINNER', points: 75, solves: 156, solved: false },
  { id: '21', title: 'Deleted Evidence', slug: 'deleted-evidence', category: 'FORENSICS', difficulty: 'INTERMEDIATE', points: 150, solves: 54, solved: false },
  { id: '22', title: 'Memory Dump', slug: 'memory-dump', category: 'FORENSICS', difficulty: 'ADVANCED', points: 225, solves: 11, solved: false },
  // CLOUD
  { id: '23', title: 'S3 Bucket Misconfiguration', slug: 's3-bucket-misconfiguration', category: 'CLOUD', difficulty: 'INTERMEDIATE', points: 125, solves: 76, solved: false },
  { id: '24', title: 'IAM Privilege Escalation', slug: 'iam-privilege-escalation', category: 'CLOUD', difficulty: 'ADVANCED', points: 250, solves: 9, solved: false },
  // DEFENSIVE
  { id: '25', title: 'Detect the Intrusion', slug: 'detect-the-intrusion', category: 'DEFENSIVE', difficulty: 'BEGINNER', points: 75, solves: 178, solved: false },
  { id: '26', title: 'Malware Indicator', slug: 'malware-indicator', category: 'DEFENSIVE', difficulty: 'INTERMEDIATE', points: 150, solves: 45, solved: false },
];


const categories = ['ALL', 'WEB', 'CRYPTO', 'LINUX', 'NETWORK', 'FORENSICS', 'CLOUD', 'DEFENSIVE'];
const difficulties = ['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

const categoryColors: Record<string, string> = {
  WEB: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  NETWORK: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  LINUX: 'text-green-400 bg-green-400/10 border-green-400/20',
  CRYPTO: 'text-pink-400 bg-pink-400/10 border-pink-400/20',
  FORENSICS: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  CLOUD: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  DEFENSIVE: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
};

const categoryIcons: Record<string, string> = {
  WEB: '🌐', CRYPTO: '🔐', LINUX: '🐧', NETWORK: '🔌',
  FORENSICS: '🔍', CLOUD: '☁️', DEFENSIVE: '🛡️',
};

export default function CTFPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeDifficulty, setActiveDifficulty] = useState('ALL');
  const [sortBy, setSortBy] = useState<'points' | 'solves' | 'difficulty'>('points');
  const [showSolved, setShowSolved] = useState(true);

  let filtered = challenges.filter(c => {
    if (activeCategory !== 'ALL' && c.category !== activeCategory) return false;
    if (activeDifficulty !== 'ALL' && c.difficulty !== activeDifficulty) return false;
    if (!showSolved && c.solved) return false;
    return true;
  });

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'points') return b.points - a.points;
    if (sortBy === 'solves') return a.solves - b.solves;
    const diffOrder = { BEGINNER: 1, INTERMEDIATE: 2, ADVANCED: 3, PROFESSIONAL: 4 };
    return (diffOrder[a.difficulty as keyof typeof diffOrder] || 0) - (diffOrder[b.difficulty as keyof typeof diffOrder] || 0);
  });

  const totalPoints = challenges.reduce((s, c) => s + c.points, 0);
  const solvedPoints = challenges.filter(c => c.solved).reduce((s, c) => s + c.points, 0);
  const solvedCount = challenges.filter(c => c.solved).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">🚩 CTF Challenges</h1>
          <p className="text-dark-400 mt-1">Capture The Flag — {challenges.length} challenges across {categories.length - 1} categories</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-2xl font-bold text-cyber-400">{solvedPoints}<span className="text-sm text-dark-500">/{totalPoints}</span></p>
            <p className="text-xs text-dark-400">{solvedCount} solved</p>
          </div>
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {categories.filter(c => c !== 'ALL').map(cat => {
          const catChallenges = challenges.filter(c => c.category === cat);
          const catSolved = catChallenges.filter(c => c.solved).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? 'ALL' : cat)}
              className={`card text-center p-3 transition-all cursor-pointer ${
                activeCategory === cat ? 'border-cyber-400/40 bg-cyber-400/5' : 'hover:border-dark-600'
              }`}
            >
              <span className="text-lg">{categoryIcons[cat]}</span>
              <p className="text-xs font-medium text-white mt-1">{cat}</p>
              <p className="text-[10px] text-dark-500">{catSolved}/{catChallenges.length}</p>
            </button>
          );
        })}
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex bg-dark-800 rounded-lg p-0.5 border border-dark-700">
          {difficulties.map(diff => (
            <button
              key={diff}
              onClick={() => setActiveDifficulty(diff)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                activeDifficulty === diff ? 'bg-cyber-400/20 text-cyber-400' : 'text-dark-400 hover:text-white'
              }`}
            >
              {diff === 'ALL' ? 'All Levels' : diff}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="bg-dark-800 border border-dark-700 rounded-lg px-3 py-1.5 text-xs text-dark-300"
        >
          <option value="points">Sort: Points (High→Low)</option>
          <option value="solves">Sort: Fewest Solves</option>
          <option value="difficulty">Sort: Difficulty</option>
        </select>

        <span className="text-xs text-dark-500">{filtered.length} challenges</span>
      </div>

      {/* Challenge Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((challenge) => (
          <Link key={challenge.id} href={`/ctf/${challenge.slug}`}>
            <div className={`card-hover h-full flex flex-col ${challenge.solved ? 'border-green-500/20 bg-green-500/5' : ''}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span>{categoryIcons[challenge.category]}</span>
                  <span className={`text-xs px-2 py-0.5 rounded border ${categoryColors[challenge.category]}`}>
                    {challenge.category}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-cyber-400">{challenge.points}</p>
                  <p className="text-[10px] text-dark-600">pts</p>
                </div>
              </div>

              <h3 className="font-semibold text-white text-sm mb-1 flex items-center gap-2">
                {challenge.title}
                {challenge.solved && <span className="text-green-400 text-xs">✓</span>}
              </h3>

              <div className="flex items-center gap-3 mt-auto pt-2 text-xs text-dark-500">
                <span className={`badge-${challenge.difficulty.toLowerCase()}`}>{challenge.difficulty}</span>
                <span>{challenge.solves} solves</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Safety Notice */}
      <div className="card bg-yellow-500/5 border-yellow-500/20">
        <p className="text-sm text-yellow-400/80 flex items-center gap-2">
          <span>⚠️</span>
          All challenges target isolated sandbox environments. Practice only in authorized environments.
        </p>
      </div>
    </div>
  );
}
