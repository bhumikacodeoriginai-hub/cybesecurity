'use client';

import { useState } from 'react';

const challenges = [
  { id: '1', title: 'Hello Security', category: 'WEB', difficulty: 'BEGINNER', points: 50, solves: 234, description: 'Find the hidden flag in the page source of our practice web page.' },
  { id: '2', title: 'Base64 Decode', category: 'CRYPTO', difficulty: 'BEGINNER', points: 50, solves: 198, description: 'The flag has been encoded. Can you decode it?' },
  { id: '3', title: 'Find the User', category: 'LINUX', difficulty: 'BEGINNER', points: 75, solves: 145, description: 'A suspicious user has been created on this Linux system. Find their username.' },
  { id: '4', title: 'Packet Detective', category: 'NETWORK', difficulty: 'INTERMEDIATE', points: 100, solves: 89, description: 'Analyze the provided PCAP file and find the suspicious DNS query.' },
  { id: '5', title: 'Broken Authentication', category: 'WEB', difficulty: 'INTERMEDIATE', points: 150, solves: 67, description: 'The login form has a vulnerability. Bypass it to access the admin panel.' },
  { id: '6', title: 'Hidden in Plain Sight', category: 'LINUX', difficulty: 'INTERMEDIATE', points: 100, solves: 112, description: 'A file has been hidden on the Linux system. Find the flag within.' },
];

const categories = ['ALL', 'WEB', 'NETWORK', 'LINUX', 'CRYPTO', 'FORENSICS'];

const categoryColors: Record<string, string> = {
  WEB: 'text-orange-400 bg-orange-400/10',
  NETWORK: 'text-purple-400 bg-purple-400/10',
  LINUX: 'text-green-400 bg-green-400/10',
  CRYPTO: 'text-pink-400 bg-pink-400/10',
  FORENSICS: 'text-blue-400 bg-blue-400/10',
};

export default function CTFPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [flagInput, setFlagInput] = useState<Record<string, string>>({});

  const filtered = activeCategory === 'ALL' ? challenges : challenges.filter(c => c.category === activeCategory);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">🚩 CTF Challenges</h1>
          <p className="text-dark-400 mt-1">Capture The Flag — test your skills across multiple domains</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-cyber-400">0 pts</p>
          <p className="text-xs text-dark-400">Your Score</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-cyber-400/10 text-cyber-400 border border-cyber-400/30'
                : 'bg-dark-800 text-dark-400 border border-dark-700 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Challenges */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((challenge) => (
          <div key={challenge.id} className="card-hover">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white">{challenge.title}</h3>
                  <span className={`badge-${challenge.difficulty.toLowerCase()}`}>
                    {challenge.difficulty}
                  </span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[challenge.category]}`}>
                  {challenge.category}
                </span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-cyber-400">{challenge.points}</p>
                <p className="text-xs text-dark-500">points</p>
              </div>
            </div>

            <p className="text-sm text-dark-400 mb-4">{challenge.description}</p>

            {/* Flag submission */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="flag{...}"
                value={flagInput[challenge.id] || ''}
                onChange={(e) => setFlagInput({ ...flagInput, [challenge.id]: e.target.value })}
                className="input-field text-sm font-mono flex-1"
              />
              <button className="btn-primary text-sm px-4">Submit</button>
            </div>

            <div className="flex items-center gap-3 mt-3 text-xs text-dark-500">
              <span>{challenge.solves} solves</span>
              <span>10 attempts remaining</span>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="card bg-yellow-500/5 border-yellow-500/20">
        <p className="text-sm text-yellow-400/80 flex items-center gap-2">
          <span>⚠️</span>
          All challenges run in isolated sandbox environments. Practice only in authorized environments.
        </p>
      </div>
    </div>
  );
}
