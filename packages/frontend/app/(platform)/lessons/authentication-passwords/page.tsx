'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AuthenticationPasswordsLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">Authentication & Passwords</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-beginner">BEGINNER</span>
          <span className="text-xs text-dark-500">Module 1 · Lesson 6</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Authentication & Password Security</h1>
        <p className="text-dark-400 leading-relaxed">
          Authentication is how systems verify "Are you really who you say you are?" 
          Weak authentication is the #1 entry point for attackers. This lesson teaches you 
          how passwords work, why they fail, and what to use instead.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 30 minutes</span><span>⚡ +20 XP</span><span>💻 Practical + Lab</span>
        </div>
      </div>

      <div className="space-y-10">

        {/* Section 1: What is Authentication? */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">1</span>
            Authentication vs Authorization
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            These two terms sound similar but are completely different:
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="card-glass p-5 border-l-4 border-l-blue-500">
              <h3 className="text-base font-bold text-blue-400 mb-2">🔑 Authentication</h3>
              <p className="text-sm text-dark-300 mb-2">"<strong className="text-white">WHO</strong> are you?"</p>
              <p className="text-xs text-dark-400 mb-3">Verifying your identity. Proving you are who you claim to be.</p>
              <p className="text-xs text-dark-500"><strong>Example:</strong> Showing your ID card at a building entrance. The guard verifies your face matches the photo.</p>
            </div>
            <div className="card-glass p-5 border-l-4 border-l-emerald-500">
              <h3 className="text-base font-bold text-emerald-400 mb-2">🚪 Authorization</h3>
              <p className="text-sm text-dark-300 mb-2">"<strong className="text-white">WHAT</strong> can you access?"</p>
              <p className="text-xs text-dark-400 mb-3">Determining what an authenticated user is allowed to do.</p>
              <p className="text-xs text-dark-500"><strong>Example:</strong> After the guard confirms who you are, they check if you're allowed into the server room (not everyone is).</p>
            </div>
          </div>

          <div className="callout-info">
            <p className="text-xs"><strong>Key point:</strong> Authentication happens FIRST (prove who you are), then authorization determines what you can do. A system that skips authentication lets anyone in. A system that skips authorization lets authenticated users access everything.</p>
          </div>
        </section>

        {/* Section 2: Authentication Factors */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">2</span>
            The Three Authentication Factors
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            There are three ways to prove your identity. Each is called a "factor":
          </p>

          <div className="grid gap-4">
            {[
              {
                factor: 'Something You KNOW',
                icon: '🧠',
                color: 'border-l-blue-500',
                examples: ['Password', 'PIN', 'Security questions', 'Passphrase'],
                weakness: 'Can be guessed, stolen via phishing, cracked with brute force, shared with others',
              },
              {
                factor: 'Something You HAVE',
                icon: '📱',
                color: 'border-l-amber-500',
                examples: ['Phone (SMS code)', 'Hardware token (YubiKey)', 'Smart card', 'Authenticator app (Google Authenticator)'],
                weakness: 'Can be physically stolen, SIM swapped (for SMS), lost',
              },
              {
                factor: 'Something You ARE',
                icon: '👆',
                color: 'border-l-emerald-500',
                examples: ['Fingerprint', 'Face recognition', 'Iris scan', 'Voice pattern', 'Typing pattern'],
                weakness: 'Can be copied (fingerprint mold), cannot be changed if compromised (you can\'t get new fingerprints)',
              },
            ].map((f) => (
              <div key={f.factor} className={`card-glass p-5 border-l-4 ${f.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{f.icon}</span>
                  <h3 className="text-sm font-bold text-white">{f.factor}</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-dark-400 font-medium mb-1">Examples:</p>
                    <ul className="text-xs text-dark-500 space-y-0.5 ml-3 list-disc">
                      {f.examples.map(e => <li key={e}>{e}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs text-red-400/80 font-medium mb-1">Weakness:</p>
                    <p className="text-xs text-dark-500">{f.weakness}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: MFA */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">3</span>
            Multi-Factor Authentication (MFA) — Why One Factor Isn't Enough
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            <strong className="text-white">MFA requires TWO or more different factors.</strong> Even if an attacker steals your password (factor 1), 
            they still can't get in without your phone (factor 2).
          </p>

          <div className="card-glass p-5 mb-4">
            <p className="text-sm font-medium text-white mb-3">Real impact of MFA:</p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                <p className="text-3xl font-bold text-red-400">80%</p>
                <p className="text-xs text-dark-400 mt-1">of breaches involve stolen/weak passwords</p>
              </div>
              <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                <p className="text-3xl font-bold text-emerald-400">99.9%</p>
                <p className="text-xs text-dark-400 mt-1">of account attacks blocked by MFA (Microsoft research)</p>
              </div>
            </div>
          </div>

          <div className="callout-security">
            <p className="text-xs"><strong>Rule:</strong> Enable MFA on EVERY account that supports it — email, banking, social media, cloud services. It's the single most effective security control for accounts.</p>
          </div>
        </section>

        {/* Section 4: Password Cracking Math */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">4</span>
            How Fast Can Passwords Be Cracked? (The Math)
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            A modern GPU can try <strong className="text-white">10 billion passwords per second</strong>. Here's how long different passwords last:
          </p>

          <div className="card-glass overflow-hidden p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                  <th className="px-4 py-2.5 text-left text-dark-400">Password</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Length</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Character Set</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Time to Crack</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr><td className="px-4 py-2 font-mono text-red-400">abc123</td><td className="px-4 py-2 text-dark-300">6 chars</td><td className="px-4 py-2 text-dark-400">lowercase+digits</td><td className="px-4 py-2 text-red-400 font-bold">Instant</td></tr>
                <tr><td className="px-4 py-2 font-mono text-red-400">Password1</td><td className="px-4 py-2 text-dark-300">9 chars</td><td className="px-4 py-2 text-dark-400">mixed case+digit</td><td className="px-4 py-2 text-red-400 font-bold">~2 minutes</td></tr>
                <tr><td className="px-4 py-2 font-mono text-amber-400">Tr0ub4dor&3</td><td className="px-4 py-2 text-dark-300">11 chars</td><td className="px-4 py-2 text-dark-400">all types</td><td className="px-4 py-2 text-amber-400 font-bold">~3 days</td></tr>
                <tr><td className="px-4 py-2 font-mono text-emerald-400">correct horse battery staple</td><td className="px-4 py-2 text-dark-300">28 chars</td><td className="px-4 py-2 text-dark-400">lowercase+spaces</td><td className="px-4 py-2 text-emerald-400 font-bold">~550 years</td></tr>
                <tr><td className="px-4 py-2 font-mono text-emerald-400">j#8kP!mN2$xL@9qR</td><td className="px-4 py-2 text-dark-300">16 chars</td><td className="px-4 py-2 text-dark-400">all types</td><td className="px-4 py-2 text-emerald-400 font-bold">~7.5 trillion years</td></tr>
              </tbody>
            </table>
          </div>

          <div className="callout-info mt-4">
            <p className="text-xs"><strong>Lesson:</strong> Length beats complexity. "correct horse battery staple" (28 chars, easy to remember) is stronger than "Tr0ub4dor&3" (11 chars, hard to remember). Use <strong>passphrases</strong> — 4+ random words strung together.</p>
          </div>
        </section>

        {/* Section 5: How Passwords Are Stored */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">5</span>
            How Websites Store Your Password (Hashing)
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            Good websites <strong className="text-white">never store your actual password</strong>. They store a <strong className="text-white">hash</strong> — a one-way mathematical fingerprint.
          </p>

          <div className="command-block">
            <div className="command-header">
              <span className="text-[11px] text-dark-500 font-mono">How password hashing works</span>
            </div>
            <div className="command-body text-xs space-y-2">
              <p className="text-dark-500"># You create account with password "MyP@ssw0rd"</p>
              <p className="text-dark-500"># Website hashes it before storing:</p>
              <div><span className="command-prompt">$ </span><span className="text-white">echo -n "MyP@ssw0rd" | sha256sum</span></div>
              <div className="command-output">7c6a180b36896a65c4c5f81e6e2cc936e2...(64 chars)</div>
              <p className="text-dark-500 mt-2"># Database stores: user="john", hash="7c6a180b36..."</p>
              <p className="text-dark-500"># When you login, website hashes your input and COMPARES hashes</p>
              <p className="text-dark-500"># Even if database is stolen, attacker gets hashes, NOT passwords</p>
            </div>
            <div className="command-explanation">
              <p><strong>Why this matters:</strong> In a data breach, if passwords are hashed properly (bcrypt, not MD5), attackers can't easily reverse them back to plaintext. This is why strong hashing algorithms + salting is critical.</p>
            </div>
          </div>
        </section>

        {/* Section 6: Password Manager */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">6</span>
            The Solution: Password Managers
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            Humans can't remember 100+ unique complex passwords. The solution is a <strong className="text-white">password manager</strong>:
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="card-glass p-4">
              <p className="text-emerald-400 text-xs font-semibold mb-2">✅ What it does:</p>
              <ul className="text-xs text-dark-400 space-y-1 list-disc ml-3">
                <li>Generates random 20+ character passwords</li>
                <li>Stores all passwords encrypted in a vault</li>
                <li>Auto-fills login forms</li>
                <li>You only remember ONE master password</li>
                <li>Alerts you if a password was in a breach</li>
              </ul>
            </div>
            <div className="card-glass p-4">
              <p className="text-blue-400 text-xs font-semibold mb-2">🔧 Popular options:</p>
              <ul className="text-xs text-dark-400 space-y-1 list-disc ml-3">
                <li><strong>Bitwarden</strong> — free, open source</li>
                <li><strong>1Password</strong> — paid, very polished</li>
                <li><strong>KeePassXC</strong> — local-only, no cloud</li>
                <li>Browser built-in (Chrome/Firefox) — decent but limited</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• Authentication = proving WHO you are; Authorization = what you can ACCESS</li>
            <li>• Three factors: Knowledge (password), Possession (phone), Biometric (fingerprint)</li>
            <li>• MFA blocks 99.9% of account attacks — enable it everywhere</li>
            <li>• Password length &gt; complexity: "correct horse battery staple" beats "P@ss1!"</li>
            <li>• Websites should store password HASHES, never plaintext</li>
            <li>• Use a password manager for unique passwords on every site</li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (<span className="text-emerald-400 text-sm">✅ Completed! +20 XP</span>) : <div/>}
          <button onClick={() => setCompleted(true)} disabled={completed} className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <Link href="/lessons/security-controls-defense" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: Security Controls</Link>
          <Link href="/lessons/how-computers-work" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: How Computers Work →</Link>
        </div>
      </div>
    </div>
  );
}
