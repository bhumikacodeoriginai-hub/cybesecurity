'use client';

import { useState } from 'react';
import Link from 'next/link';

// Demo challenge detail data
const challengeData = {
  id: 'ch-broken-auth',
  title: 'Broken Authentication',
  slug: 'broken-authentication',
  description: 'The login form on our practice application has a vulnerability. The application uses a basic SQL query to validate credentials. Can you bypass the authentication and access the admin panel?\n\nThe target application is running inside this challenge environment. Analyze the login form and find a way to authenticate without valid credentials.',
  category: 'WEB',
  difficulty: 'INTERMEDIATE',
  points: 150,
  maxAttempts: 15,
  solveCount: 67,
  hintsCount: 3,
  createdAt: '2024-01-15',
  author: 'CyberSec Academy',
  tags: ['SQL Injection', 'Authentication', 'OWASP Top 10'],
  userProgress: {
    solved: false,
    attempts: 2,
    attemptsRemaining: 13,
    lastAttempt: '2024-03-10T14:30:00Z',
    unlockedHints: [] as { index: number; content: string }[],
  },
};

const categoryIcons: Record<string, string> = {
  WEB: '🌐',
  NETWORK: '🔌',
  LINUX: '🐧',
  WINDOWS: '🪟',
  CRYPTO: '🔐',
  FORENSICS: '🔍',
  OSINT: '🌍',
  CLOUD: '☁️',
  REVERSE_ENGINEERING: '⚙️',
  DEFENSIVE: '🛡️',
};

export default function ChallengeDetailPage() {
  const [flag, setFlag] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    correct: boolean;
    message: string;
    points?: number;
    firstBlood?: boolean;
    newBadges?: string[];
  } | null>(null);
  const [hints, setHints] = useState(challengeData.userProgress.unlockedHints);
  const [hintLoading, setHintLoading] = useState(false);

  const challenge = challengeData;
  const isSolved = challenge.userProgress.solved;

  const handleSubmitFlag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flag.trim() || submitting) return;

    setSubmitting(true);
    setResult(null);

    // Simulate API call
    await new Promise(r => setTimeout(r, 1000));

    // Demo: check against known flag
    const isCorrect = flag.trim() === 'flag{auth_bypass_success}';

    setResult({
      correct: isCorrect,
      message: isCorrect
        ? '🎉 Correct! +150 points!'
        : `Incorrect flag. ${challenge.userProgress.attemptsRemaining - 1} attempts remaining.`,
      points: isCorrect ? 150 : undefined,
      firstBlood: false,
      newBadges: isCorrect ? ['Security Researcher'] : undefined,
    });

    setSubmitting(false);
    if (!isCorrect) setFlag('');
  };

  const handleRevealHint = async (index: number) => {
    setHintLoading(true);
    await new Promise(r => setTimeout(r, 500));

    const hintTexts = [
      'Think about how the application validates input. Is it properly sanitized?',
      'SQL might be involved in the authentication check.',
      'Try classic SQL injection patterns like \' OR 1=1 --',
    ];

    setHints(prev => [...prev, { index, content: hintTexts[index] }]);
    setHintLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-dark-400">
        <Link href="/ctf" className="hover:text-white transition-colors">CTF Challenges</Link>
        <span>/</span>
        <span className="text-white">{challenge.title}</span>
      </nav>

      {/* Challenge Header */}
      <div className="card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{categoryIcons[challenge.category] || '🚩'}</span>
              <h1 className="text-2xl font-bold text-white">{challenge.title}</h1>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`badge-${challenge.difficulty.toLowerCase()}`}>{challenge.difficulty}</span>
              <span className="text-xs text-dark-400 px-2 py-0.5 bg-dark-700 rounded">{challenge.category}</span>
              {challenge.tags.map(tag => (
                <span key={tag} className="text-xs text-dark-500 px-2 py-0.5 bg-dark-800 rounded">{tag}</span>
              ))}
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-3xl font-bold text-cyber-400">{challenge.points}</p>
            <p className="text-xs text-dark-500">points</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-6 text-sm text-dark-400 pt-3 border-t border-dark-700/50">
          <span className="flex items-center gap-1">👥 {challenge.solveCount} solves</span>
          <span className="flex items-center gap-1">💡 {challenge.hintsCount} hints</span>
          <span className="flex items-center gap-1">🎯 {challenge.maxAttempts} max attempts</span>
          <span className="flex items-center gap-1">✍️ {challenge.author}</span>
        </div>
      </div>

      {/* Description */}
      <div className="card">
        <h3 className="font-semibold mb-3 text-white">Challenge Description</h3>
        <div className="text-dark-300 text-sm leading-relaxed whitespace-pre-line">
          {challenge.description}
        </div>
      </div>

      {/* Flag Submission */}
      <div className={`card ${isSolved ? 'border-green-500/30 bg-green-500/5' : ''}`}>
        {isSolved ? (
          <div className="flex items-center gap-3">
            <span className="text-3xl">✅</span>
            <div>
              <h3 className="font-semibold text-green-400">Challenge Solved!</h3>
              <p className="text-sm text-dark-400">You solved this challenge. +{challenge.points} points awarded.</p>
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-semibold mb-3 text-white flex items-center gap-2">
              🚩 Submit Flag
            </h3>
            <form onSubmit={handleSubmitFlag} className="space-y-3">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={flag}
                  onChange={(e) => setFlag(e.target.value)}
                  placeholder="flag{...}"
                  className="input-field font-mono flex-1"
                  disabled={submitting}
                />
                <button
                  type="submit"
                  disabled={!flag.trim() || submitting}
                  className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Checking...
                    </>
                  ) : 'Submit'}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-dark-500">
                <span>Attempts: {challenge.userProgress.attempts}/{challenge.maxAttempts}</span>
                <span>{challenge.userProgress.attemptsRemaining} remaining</span>
              </div>
            </form>

            {/* Result Message */}
            {result && (
              <div className={`mt-4 p-4 rounded-lg border ${
                result.correct
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-red-500/10 border-red-500/30'
              }`}>
                <p className={`text-sm font-medium ${result.correct ? 'text-green-400' : 'text-red-400'}`}>
                  {result.message}
                </p>
                {result.newBadges && result.newBadges.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-yellow-400 text-xs">🏆 New badge:</span>
                    {result.newBadges.map(b => (
                      <span key={b} className="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded border border-yellow-500/20">{b}</span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Hints Section */}
      <div className="card">
        <h3 className="font-semibold mb-3 text-white flex items-center gap-2">
          💡 Hints
          <span className="text-xs text-dark-500 font-normal">(each hint costs 10% of challenge points)</span>
        </h3>

        <div className="space-y-3">
          {Array.from({ length: challenge.hintsCount }, (_, i) => {
            const unlocked = hints.find(h => h.index === i);
            return (
              <div key={i}>
                {unlocked ? (
                  <div className="p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                    <p className="text-xs text-yellow-500/70 mb-1">Hint {i + 1} (-{Math.floor(challenge.points * 0.1)} pts)</p>
                    <p className="text-sm text-yellow-400/90">💡 {unlocked.content}</p>
                  </div>
                ) : (
                  <button
                    onClick={() => handleRevealHint(i)}
                    disabled={hintLoading || isSolved}
                    className="w-full p-3 bg-dark-800/50 border border-dark-700/50 rounded-lg text-left hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all disabled:opacity-50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-dark-400">🔒 Hint {i + 1}</span>
                      <span className="text-xs text-dark-500">-{Math.floor(challenge.points * 0.1)} pts to reveal</span>
                    </div>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Safety Notice */}
      <div className="card bg-green-500/5 border-green-500/20">
        <p className="text-sm text-green-400/80 flex items-start gap-2">
          <span className="mt-0.5">✓</span>
          <span>This challenge targets a deliberately vulnerable application in an isolated sandbox. Practice only in authorized environments.</span>
        </p>
      </div>
    </div>
  );
}
