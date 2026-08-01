'use client';

import { useState } from 'react';
import Link from 'next/link';

const labs = [
  {
    id: 'lab-linux-intrusion',
    title: 'Linux Intrusion Investigation',
    slug: 'linux-intrusion-investigation',
    description: 'Investigate a compromised Linux system. Find the attacker, analyze logs, and document evidence.',
    difficulty: 'BEGINNER',
    duration: 60,
    category: 'Linux Security',
    status: 'available',
    tools: ['Terminal', 'Bash', 'grep', 'find'],
    objectives: 4,
    xpReward: 75,
    completions: 342,
  },
  {
    id: 'lab-network-scanning',
    title: 'Network Scanning Basics',
    slug: 'network-scanning-basics',
    description: 'Discover hosts and services on an authorized network using standard tools.',
    difficulty: 'BEGINNER',
    duration: 45,
    category: 'Network Security',
    status: 'available',
    tools: ['nmap', 'netcat', 'ping'],
    objectives: 4,
    xpReward: 60,
    completions: 289,
  },
  {
    id: 'lab-file-permissions',
    title: 'Linux File Permissions & Ownership',
    slug: 'linux-file-permissions',
    description: 'Learn to audit and fix file permissions. Understand SUID and security implications.',
    difficulty: 'BEGINNER',
    duration: 30,
    category: 'Linux Security',
    status: 'available',
    tools: ['chmod', 'chown', 'find', 'stat'],
    objectives: 4,
    xpReward: 50,
    completions: 456,
  },

  {
    id: 'lab-web-recon',
    title: 'Web Application Reconnaissance',
    slug: 'web-application-reconnaissance',
    description: 'Explore a deliberately vulnerable web app. Discover endpoints and find security issues.',
    difficulty: 'INTERMEDIATE',
    duration: 60,
    category: 'Web Security',
    status: 'available',
    tools: ['curl', 'Terminal', 'Browser'],
    objectives: 4,
    xpReward: 80,
    completions: 198,
  },
  {
    id: 'lab-log-analysis',
    title: 'Log Analysis for Intrusion Detection',
    slug: 'log-analysis-intrusion-detection',
    description: 'Analyze system logs to identify brute-force attacks, compromised accounts, and privilege escalation.',
    difficulty: 'INTERMEDIATE',
    duration: 45,
    category: 'SOC / Blue Team',
    status: 'available',
    tools: ['grep', 'awk', 'sort', 'uniq'],
    objectives: 4,
    xpReward: 70,
    completions: 167,
  },
  {
    id: 'lab-password-security',
    title: 'Password Security & Hashing',
    slug: 'password-security-hashing',
    description: 'Understand password hashing, salting, and why weak passwords are dangerous.',
    difficulty: 'INTERMEDIATE',
    duration: 40,
    category: 'Cryptography',
    status: 'available',
    tools: ['sha256sum', 'md5sum', 'openssl'],
    objectives: 4,
    xpReward: 65,
    completions: 213,
  },
  {
    id: 'lab-firewall-config',
    title: 'Firewall Configuration',
    slug: 'firewall-configuration',
    description: 'Configure iptables rules to secure a Linux server in an isolated lab.',
    difficulty: 'ADVANCED',
    duration: 60,
    category: 'Network Security',
    status: 'locked',
    tools: ['iptables', 'Terminal'],
    objectives: 5,
    xpReward: 100,
    completions: 89,
  },
  {
    id: 'lab-incident-response',
    title: 'Incident Response Simulation',
    slug: 'incident-response-simulation',
    description: 'Respond to a simulated security incident: contain, investigate, eradicate, recover.',
    difficulty: 'ADVANCED',
    duration: 90,
    category: 'SOC / Blue Team',
    status: 'locked',
    tools: ['Terminal', 'SIEM', 'grep'],
    objectives: 6,
    xpReward: 120,
    completions: 45,
  },
];


const categories = ['All', 'Linux Security', 'Network Security', 'Web Security', 'SOC / Blue Team', 'Cryptography'];

export default function LabsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDifficulty, setActiveDifficulty] = useState('All');

  const filtered = labs.filter(lab => {
    if (activeCategory !== 'All' && lab.category !== activeCategory) return false;
    if (activeDifficulty !== 'All' && lab.difficulty !== activeDifficulty) return false;
    return true;
  });

  const availableCount = labs.filter(l => l.status === 'available').length;
  const lockedCount = labs.filter(l => l.status === 'locked').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">🧪 Cyber Lab</h1>
          <p className="text-dark-400 mt-1">Hands-on practical exercises in isolated, secure environments</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-green-400">{availableCount} available</span>
          <span className="text-dark-500">{lockedCount} locked</span>
        </div>
      </div>

      {/* How Labs Work */}
      <div className="card bg-gradient-to-r from-cyber-400/5 to-blue-500/5 border-cyber-400/20">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🔬</span>
          <div>
            <h3 className="font-semibold text-white mb-1">How Labs Work</h3>
            <p className="text-sm text-dark-300">
              Click <strong>Start Lab</strong> to provision an isolated Docker container.
              Follow the instructions, execute commands in the terminal,
              and complete objectives to earn XP. Labs auto-expire after the time limit.
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-dark-400">
              <span className="flex items-center gap-1">🔒 Isolated network</span>
              <span className="flex items-center gap-1">⏱️ Auto-expiration</span>
              <span className="flex items-center gap-1">🎯 Objective validation</span>
              <span className="flex items-center gap-1">💡 Hints available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-cyber-400/10 text-cyber-400 border border-cyber-400/30'
                  : 'bg-dark-800 text-dark-400 border border-dark-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {['All', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map(diff => (
            <button
              key={diff}
              onClick={() => setActiveDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeDifficulty === diff
                  ? 'bg-cyber-400/10 text-cyber-400 border border-cyber-400/30'
                  : 'bg-dark-800 text-dark-400 border border-dark-700 hover:text-white'
              }`}
            >
              {diff === 'All' ? 'All Levels' : diff}
            </button>
          ))}
        </div>
      </div>

      {/* Lab Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((lab) => (
          <div key={lab.id} className={`card ${lab.status === 'locked' ? 'opacity-60' : 'hover:border-cyber-400/30 transition-all'}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white">{lab.title}</h3>
                  {lab.status === 'locked' && <span className="text-dark-500">🔒</span>}
                </div>
                <span className="text-xs text-dark-500">{lab.category}</span>
              </div>
              <span className={`badge-${lab.difficulty.toLowerCase()}`}>{lab.difficulty}</span>
            </div>

            <p className="text-sm text-dark-400 mb-4">{lab.description}</p>

            {/* Tools */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {lab.tools.map(tool => (
                <span key={tool} className="px-2 py-0.5 bg-dark-700 rounded text-xs text-dark-300 font-mono">{tool}</span>
              ))}
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between pt-3 border-t border-dark-700/50">
              <div className="flex items-center gap-4 text-xs text-dark-500">
                <span>🕐 {lab.duration} min</span>
                <span>🎯 {lab.objectives} objectives</span>
                <span>⚡ {lab.xpReward} XP</span>
              </div>
              {lab.status === 'available' ? (
                <Link href={`/labs/${lab.slug}`}>
                  <button className="btn-primary text-xs px-4 py-2">Start Lab</button>
                </Link>
              ) : (
                <span className="text-xs text-dark-500">Complete prerequisites</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Safety Notice */}
      <div className="card bg-green-500/5 border-green-500/20">
        <p className="text-sm text-green-400/80 flex items-center gap-2">
          <span>✓</span>
          All labs run in completely isolated Docker containers. No lab activity can affect production systems or the internet.
        </p>
      </div>
    </div>
  );
}
