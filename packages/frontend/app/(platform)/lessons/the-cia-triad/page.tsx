'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CIATriadLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses" className="hover:text-white">Courses</Link>
        <span className="text-dark-700">/</span>
        <Link href="/courses/intro-to-cybersecurity" className="hover:text-white">Introduction to Cybersecurity</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">The CIA Triad</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-beginner">BEGINNER</span>
          <span className="text-xs text-dark-500">Module 1 · Lesson 2 of 20</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">The CIA Triad: The Foundation of All Security</h1>
        <p className="text-dark-400 leading-relaxed">
          Every security decision, every tool, every policy — all of cybersecurity is built on three simple principles.
          Master these and you'll understand WHY every security control exists.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 25 minutes</span>
          <span>⚡ +15 XP</span>
          <span>📖 Theory</span>
        </div>
      </div>

      <div className="space-y-10">

        {/* What is the CIA Triad? */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">1</span>
            What is the CIA Triad?
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            The CIA Triad is the <strong className="text-white">most important model in information security</strong>. 
            It has nothing to do with the spy agency! CIA stands for:
          </p>

          {/* Visual Triangle */}
          <div className="card-glass p-8 text-center mb-4">
            <div className="relative w-64 h-56 mx-auto">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 mx-auto mb-2">
                  <span className="text-2xl">🔒</span>
                </div>
                <p className="text-sm font-bold text-blue-400">Confidentiality</p>
                <p className="text-[10px] text-dark-500">Only authorized access</p>
              </div>
              <div className="absolute bottom-0 left-0 text-center">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 mx-auto mb-2">
                  <span className="text-2xl">✅</span>
                </div>
                <p className="text-sm font-bold text-emerald-400">Integrity</p>
                <p className="text-[10px] text-dark-500">Data is trustworthy</p>
              </div>
              <div className="absolute bottom-0 right-0 text-center">
                <div className="w-16 h-16 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20 mx-auto mb-2">
                  <span className="text-2xl">⚡</span>
                </div>
                <p className="text-sm font-bold text-amber-400">Availability</p>
                <p className="text-[10px] text-dark-500">Always accessible</p>
              </div>
            </div>
          </div>

          <div className="callout-info">
            <p className="text-xs">
              <strong>Why it matters:</strong> Every security tool, every policy, every decision is designed to protect
              one or more of these three principles. If you understand CIA, you understand the "why" behind all of security.
            </p>
          </div>
        </section>

        {/* CONFIDENTIALITY */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-blue-500/10 rounded-lg flex items-center justify-center text-xs text-blue-400 border border-blue-500/20">2</span>
            Confidentiality — "Keep Secrets Secret"
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            <strong className="text-white">Confidentiality</strong> means ensuring that information is only accessible to people
            who are authorized to see it. If you can't see it, you can't steal it.
          </p>

          <div className="callout-info">
            <p className="text-sm font-medium mb-2">🏠 Real-life analogy:</p>
            <p className="text-xs opacity-90">
              Your diary has a lock. Only you have the key. That's confidentiality.
              If someone reads your diary without your permission, confidentiality has been <strong>violated</strong>.
            </p>
          </div>

          <h3 className="text-sm font-semibold text-white mt-6 mb-3">Real-World Examples:</h3>
          <div className="space-y-3">
            <div className="card-glass p-4">
              <p className="text-sm text-white font-medium mb-1">✅ Good Confidentiality:</p>
              <ul className="text-xs text-dark-400 space-y-1 ml-4 list-disc">
                <li>When you use WhatsApp, your messages are <strong>end-to-end encrypted</strong> — even WhatsApp can't read them</li>
                <li>Your bank website uses <strong>HTTPS</strong> — data between you and the bank is scrambled so no one in the middle can read it</li>
                <li>Hospital records are locked behind <strong>passwords + roles</strong> — only your doctor can see your medical history</li>
              </ul>
            </div>
            <div className="card-glass p-4 border-l-4 border-l-red-500">
              <p className="text-sm text-white font-medium mb-1">❌ Confidentiality Breach:</p>
              <ul className="text-xs text-dark-400 space-y-1 ml-4 list-disc">
                <li>Someone finds a Post-it note with your password on your desk</li>
                <li>A hacker intercepts your Wi-Fi traffic at a coffee shop (unencrypted connection)</li>
                <li>An employee emails confidential salary data to the wrong person</li>
                <li>A database with 50 million passwords is dumped on the internet (data breach)</li>
              </ul>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-white mt-6 mb-3">How We Protect Confidentiality:</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { tool: 'Encryption', desc: 'Scrambles data so only the right person can read it (AES, RSA, TLS)' },
              { tool: 'Access Control', desc: 'Only authorized users can access specific data (passwords, biometrics)' },
              { tool: 'Data Classification', desc: 'Labeling data by sensitivity: Public, Internal, Confidential, Top Secret' },
              { tool: 'Network Segmentation', desc: 'Separating sensitive systems from general access' },
            ].map(item => (
              <div key={item.tool} className="card-glass p-3">
                <p className="text-xs font-semibold text-cyber-400">{item.tool}</p>
                <p className="text-[11px] text-dark-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INTEGRITY */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">3</span>
            Integrity — "Trust That Nothing Was Changed"
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            <strong className="text-white">Integrity</strong> means ensuring that data hasn't been altered, corrupted, or
            tampered with — either accidentally or by an attacker. You need to trust that what you're seeing is accurate.
          </p>

          <div className="callout-info">
            <p className="text-sm font-medium mb-2">🏠 Real-life analogy:</p>
            <p className="text-xs opacity-90">
              Imagine ordering a package online. Integrity means the package arrives exactly as it was sent — 
              nobody opened it, nobody replaced the contents, nobody damaged it.
              A tamper-evident seal on a medicine bottle is an integrity control.
            </p>
          </div>

          <h3 className="text-sm font-semibold text-white mt-6 mb-3">Real-World Examples:</h3>
          <div className="space-y-3">
            <div className="card-glass p-4">
              <p className="text-sm text-white font-medium mb-1">✅ Good Integrity:</p>
              <ul className="text-xs text-dark-400 space-y-1 ml-4 list-disc">
                <li>When you download Ubuntu Linux, you verify the <strong>SHA-256 checksum</strong> to confirm the file wasn't modified</li>
                <li>Your bank statement shows the exact transactions you made — no mysterious additions</li>
                <li>A digital signature on an email proves it was really sent by the person claiming to send it</li>
              </ul>
            </div>
            <div className="card-glass p-4 border-l-4 border-l-red-500">
              <p className="text-sm text-white font-medium mb-1">❌ Integrity Breach:</p>
              <ul className="text-xs text-dark-400 space-y-1 ml-4 list-disc">
                <li>An attacker modifies a downloaded installer to include a virus (supply chain attack)</li>
                <li>Someone changes your grade in the school database from 60% to 95%</li>
                <li>A "man-in-the-middle" attacker changes a bank transfer from ₹1,000 to ₹100,000</li>
                <li>A hacker modifies DNS records so "google.com" points to a fake phishing site</li>
              </ul>
            </div>
          </div>

          {/* Practical Example */}
          <div className="command-block mt-4">
            <div className="command-header">
              <span className="text-[11px] text-dark-500 font-mono">Practical Example: Verifying File Integrity</span>
            </div>
            <div className="command-body">
              <p className="text-dark-500 text-xs mb-2"># Download a file and verify its integrity using SHA-256</p>
              <div><span className="command-prompt">$ </span><span className="text-white">sha256sum ubuntu-22.04.iso</span></div>
              <div className="command-output">a4acfda10b18da50e2ec50ccfb7f8d5d3e...(64 chars)  ubuntu-22.04.iso</div>
              <p className="text-dark-500 text-xs mt-3"># Compare with the official hash from ubuntu.com</p>
              <p className="text-dark-500 text-xs"># If they match → file is intact (integrity preserved)</p>
              <p className="text-dark-500 text-xs"># If they don't match → file was modified (integrity violated!)</p>
            </div>
            <div className="command-explanation">
              <p><strong>Why:</strong> If the hash matches, it means not a single byte was changed. Even changing one character in the file would produce a completely different hash.</p>
            </div>
          </div>
        </section>

        {/* AVAILABILITY */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-amber-500/10 rounded-lg flex items-center justify-center text-xs text-amber-400 border border-amber-500/20">4</span>
            Availability — "It Works When You Need It"
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            <strong className="text-white">Availability</strong> means ensuring that systems and data are accessible
            to authorized users when they need them. The most secure system in the world is useless if nobody can access it.
          </p>

          <div className="callout-info">
            <p className="text-sm font-medium mb-2">🏠 Real-life analogy:</p>
            <p className="text-xs opacity-90">
              Imagine an ATM machine. It should work 24/7 so you can withdraw money anytime.
              If someone destroys the ATM or floods it with fake requests to jam it — that's an availability attack.
              Your money is still safe (confidentiality intact), but you can't ACCESS it.
            </p>
          </div>

          <h3 className="text-sm font-semibold text-white mt-6 mb-3">Real-World Examples:</h3>
          <div className="space-y-3">
            <div className="card-glass p-4 border-l-4 border-l-red-500">
              <p className="text-sm text-white font-medium mb-1">❌ Availability Attacks (DDoS):</p>
              <ul className="text-xs text-dark-400 space-y-1 ml-4 list-disc">
                <li><strong>GitHub (2018):</strong> Hit with 1.35 Tbps DDoS attack — largest ever recorded at the time. Site went down for 10 minutes.</li>
                <li><strong>Dyn DNS (2016):</strong> IoT botnet took down DNS infrastructure. Twitter, Reddit, Netflix all went offline for hours.</li>
                <li><strong>Ransomware:</strong> Encrypts all your files so you can't use them. Your data exists, but you can't access it.</li>
                <li><strong>Hospital systems:</strong> If a hospital's system goes down, doctors can't access patient allergies before surgery.</li>
              </ul>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-white mt-6 mb-3">How We Protect Availability:</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { tool: 'Redundancy', desc: 'Multiple copies of systems — if one dies, another takes over instantly' },
              { tool: 'Backups', desc: 'Regular copies of data so you can restore if something is destroyed' },
              { tool: 'Load Balancing', desc: 'Distributing traffic across multiple servers so no single one is overwhelmed' },
              { tool: 'DDoS Protection', desc: 'Services like Cloudflare that absorb and filter malicious traffic floods' },
            ].map(item => (
              <div key={item.tool} className="card-glass p-3">
                <p className="text-xs font-semibold text-amber-400">{item.tool}</p>
                <p className="text-[11px] text-dark-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: The Tradeoffs */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-purple-500/10 rounded-lg flex items-center justify-center text-xs text-purple-400 border border-purple-500/20">5</span>
            The Balancing Act — You Can't Have All Three at 100%
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            Here's what most beginners don't realize: <strong className="text-white">increasing one principle often reduces another</strong>.
            Good security means finding the right balance for your situation.
          </p>

          <div className="space-y-3">
            <div className="card-glass p-4">
              <p className="text-sm text-white font-medium">🏥 Hospital: Availability is MOST important</p>
              <p className="text-xs text-dark-400 mt-1">Doctors need patient data instantly. If the system requires 5 passwords to log in (high confidentiality), a patient could die waiting. So hospitals balance: strong-enough security, but fast access.</p>
            </div>
            <div className="card-glass p-4">
              <p className="text-sm text-white font-medium">🏦 Bank: Confidentiality is MOST important</p>
              <p className="text-xs text-dark-400 mt-1">Your financial data must be secret. Banks use heavy encryption and multi-factor auth even if it slows things down. They accept slightly lower availability for much higher confidentiality.</p>
            </div>
            <div className="card-glass p-4">
              <p className="text-sm text-white font-medium">📰 News Website: Integrity is MOST important</p>
              <p className="text-xs text-dark-400 mt-1">A news site must show accurate information. If hackers change a headline to say "World War 3 started" — it could cause panic. Content integrity is critical.</p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">✓</span>
            Summary
          </h2>
          <div className="card-glass p-5">
            <ul className="space-y-2 text-sm text-dark-300">
              <li className="flex items-start gap-2"><span className="text-blue-400">C</span> <strong>Confidentiality</strong> = Only authorized people can see the data (protected by: encryption, access control)</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">I</span> <strong>Integrity</strong> = Data hasn't been modified without authorization (protected by: hashing, digital signatures)</li>
              <li className="flex items-start gap-2"><span className="text-amber-400">A</span> <strong>Availability</strong> = Systems are accessible when needed (protected by: redundancy, backups, DDoS protection)</li>
              <li className="flex items-start gap-2"><span className="text-purple-400">⚖</span> Good security = balancing all three based on what you're protecting</li>
            </ul>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (
            <span className="text-emerald-400 text-sm flex items-center gap-2">✅ Completed! +15 XP</span>
          ) : <div/>}
          <button onClick={() => setCompleted(true)} disabled={completed} className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <Link href="/lessons/introduction-to-cybersecurity" className="flex items-center gap-2 text-dark-500 hover:text-white transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Previous: What is Cybersecurity?
          </Link>
          <Link href="/lessons/threats-vulnerabilities-risks" className="flex items-center gap-2 text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">
            Next: Threats, Vulnerabilities & Risks
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
