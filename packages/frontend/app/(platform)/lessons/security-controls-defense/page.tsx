'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SecurityControlsLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">Security Controls & Defense in Depth</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-beginner">BEGINNER</span>
          <span className="text-xs text-dark-500">Module 1 · Lesson 5</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Security Controls & Defense in Depth</h1>
        <p className="text-dark-400 leading-relaxed">
          Now you know what threats exist. This lesson teaches you the DEFENSES — the tools, policies, and strategies
          used to protect systems. The key principle: never rely on just one defense.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 25 minutes</span><span>⚡ +15 XP</span><span>📖 Theory</span>
        </div>
      </div>

      <div className="space-y-10">

        {/* Section 1: What is a Security Control? */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">1</span>
            What is a Security Control?
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            A <strong className="text-white">security control</strong> is any measure that reduces risk. It can be a technology
            (like a firewall), a process (like a backup schedule), or a rule (like a password policy).
          </p>
          <div className="callout-info">
            <p className="text-sm font-medium mb-2">🏠 Simple analogy:</p>
            <p className="text-xs opacity-90">
              Your house has many security controls: a lock (preventive), a doorbell camera (detective),
              insurance (corrective), a fence (deterrent), and a security guard (compensating).
              No single one is enough — together they make your house very secure.
            </p>
          </div>
        </section>

        {/* Section 2: Three Types of Controls */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">2</span>
            Three Types of Security Controls
          </h2>

          <div className="grid gap-4">
            <div className="card-glass p-5 border-l-4 border-l-blue-500">
              <h3 className="text-base font-bold text-blue-400 mb-2">🛑 Preventive Controls</h3>
              <p className="text-sm text-dark-300 mb-3"><strong className="text-white">Purpose:</strong> STOP attacks from happening in the first place.</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  { control: 'Firewall', what: 'Blocks unauthorized network traffic before it reaches your systems' },
                  { control: 'Encryption', what: 'Makes data unreadable even if stolen (AES-256, TLS)' },
                  { control: 'MFA', what: 'Requires phone + password to login — password alone isn\'t enough' },
                  { control: 'Access Control', what: 'Only authorized users get access to specific resources' },
                  { control: 'Antivirus/EDR', what: 'Blocks known malware before it can execute' },
                  { control: 'Security Training', what: 'Teaches employees to recognize phishing before clicking' },
                  { control: 'Patch Management', what: 'Updates software to fix vulnerabilities before attackers exploit them' },
                  { control: 'Network Segmentation', what: 'Separates critical systems so breach of one doesn\'t affect all' },
                ].map((item) => (
                  <div key={item.control} className="p-2 bg-white/[0.02] rounded-lg">
                    <p className="text-xs font-semibold text-white">{item.control}</p>
                    <p className="text-[10px] text-dark-500 mt-0.5">{item.what}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-glass p-5 border-l-4 border-l-amber-500">
              <h3 className="text-base font-bold text-amber-400 mb-2">🔍 Detective Controls</h3>
              <p className="text-sm text-dark-300 mb-3"><strong className="text-white">Purpose:</strong> DETECT attacks that are happening or already happened.</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  { control: 'SIEM', what: 'Collects all logs in one place and alerts on suspicious patterns' },
                  { control: 'IDS (Intrusion Detection)', what: 'Monitors network traffic for known attack signatures' },
                  { control: 'Log Monitoring', what: 'Watches authentication logs for failed logins, unusual access' },
                  { control: 'File Integrity Monitoring', what: 'Alerts if critical system files are modified unexpectedly' },
                  { control: 'Vulnerability Scanning', what: 'Regularly scans systems for known weaknesses' },
                  { control: 'Penetration Testing', what: 'Ethical hackers try to break in — reveals what attackers could exploit' },
                ].map((item) => (
                  <div key={item.control} className="p-2 bg-white/[0.02] rounded-lg">
                    <p className="text-xs font-semibold text-white">{item.control}</p>
                    <p className="text-[10px] text-dark-500 mt-0.5">{item.what}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-glass p-5 border-l-4 border-l-emerald-500">
              <h3 className="text-base font-bold text-emerald-400 mb-2">🔧 Corrective Controls</h3>
              <p className="text-sm text-dark-300 mb-3"><strong className="text-white">Purpose:</strong> FIX things after an attack or minimize damage.</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  { control: 'Backups', what: 'Restore data after ransomware or corruption (3-2-1 rule)' },
                  { control: 'Incident Response Plan', what: 'Step-by-step procedure for handling breaches quickly' },
                  { control: 'Disaster Recovery', what: 'Full plan to restore operations after major outage/attack' },
                  { control: 'Patch Deployment', what: 'Fix the vulnerability that was exploited to prevent repeat' },
                ].map((item) => (
                  <div key={item.control} className="p-2 bg-white/[0.02] rounded-lg">
                    <p className="text-xs font-semibold text-white">{item.control}</p>
                    <p className="text-[10px] text-dark-500 mt-0.5">{item.what}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Defense in Depth */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">3</span>
            Defense in Depth — The Castle Approach
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            <strong className="text-white">Defense in Depth</strong> means using MULTIPLE layers of security.
            If one layer fails, the next one stops the attacker. Like a medieval castle with a moat, walls, guards, and a locked vault.
          </p>

          <div className="card-glass p-6 mb-4">
            <p className="text-xs text-dark-500 mb-3 text-center">A real company's defense layers (from outside → inside):</p>
            <div className="space-y-2">
              {[
                { layer: 'Layer 1: Perimeter', controls: 'Firewall, DDoS protection, WAF', color: 'border-red-500/30 bg-red-500/5' },
                { layer: 'Layer 2: Network', controls: 'IDS/IPS, network segmentation, VPN', color: 'border-orange-500/30 bg-orange-500/5' },
                { layer: 'Layer 3: Host', controls: 'Antivirus, host firewall, OS hardening, patching', color: 'border-amber-500/30 bg-amber-500/5' },
                { layer: 'Layer 4: Application', controls: 'Input validation, auth, session management, secure coding', color: 'border-emerald-500/30 bg-emerald-500/5' },
                { layer: 'Layer 5: Data', controls: 'Encryption at rest, encryption in transit, DLP, access control', color: 'border-blue-500/30 bg-blue-500/5' },
                { layer: 'Layer 6: User', controls: 'Security training, MFA, least privilege, clean desk policy', color: 'border-purple-500/30 bg-purple-500/5' },
              ].map((l) => (
                <div key={l.layer} className={`p-3 rounded-xl border ${l.color}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">{l.layer}</span>
                    <span className="text-[10px] text-dark-400">{l.controls}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="callout-warning">
            <p className="text-xs"><strong>Why single-layer security fails:</strong> If your ONLY defense is a firewall, and an employee clicks a phishing link (bypasses the firewall), the attacker is inside with zero resistance. Defense in depth means even after bypassing one layer, they hit another.</p>
          </div>
        </section>

        {/* Section 4: Real Example */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">4</span>
            Real-World Example: How Defense in Depth Stops an Attack
          </h2>

          <div className="card-glass p-5">
            <p className="text-sm text-white font-medium mb-4">Scenario: Attacker tries to steal customer database</p>
            <div className="space-y-3">
              {[
                { step: 'Attacker sends phishing email to employee', defense: 'Email filter blocks 95% of phishing', result: '✅ Most blocked. But one gets through.' },
                { step: 'Employee clicks link, malware tries to download', defense: 'Antivirus/EDR detects known malware', result: '✅ Blocked. But attacker uses unknown variant.' },
                { step: 'New malware variant runs on employee PC', defense: 'Employee has standard user (not admin) privileges', result: '✅ Malware can\'t install system-wide. Limited damage.' },
                { step: 'Attacker tries to move to database server', defense: 'Network segmentation — employee PC can\'t reach DB directly', result: '✅ Movement blocked.' },
                { step: 'Attacker tries to use stolen credentials', defense: 'MFA required for database access', result: '✅ Password alone not enough. Attack STOPPED.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                  <span className="w-6 h-6 bg-dark-700 rounded-lg flex items-center justify-center text-[10px] text-dark-400 flex-shrink-0">{i+1}</span>
                  <div className="flex-1">
                    <p className="text-xs text-red-400">{item.step}</p>
                    <p className="text-xs text-emerald-400 mt-1">Defense: {item.defense}</p>
                    <p className="text-xs text-dark-400 mt-1">{item.result}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
              <p className="text-xs text-emerald-400"><strong>Result:</strong> The attacker bypassed 3 layers but was stopped at layer 4 (network segmentation) and layer 5 (MFA). Without defense in depth, they would have succeeded at step 1.</p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• Security controls = measures that reduce risk (technology, process, or policy)</li>
            <li>• Three types: Preventive (stop), Detective (find), Corrective (fix)</li>
            <li>• Defense in Depth = multiple layers — if one fails, the next catches the attack</li>
            <li>• No single control is enough — always use multiple complementary controls</li>
            <li>• People + Process + Technology together = real security</li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (<span className="text-emerald-400 text-sm">✅ Completed! +15 XP</span>) : <div/>}
          <button onClick={() => setCompleted(true)} disabled={completed} className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <Link href="/lessons/types-of-cyber-attacks" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: Types of Cyber Attacks</Link>
          <Link href="/lessons/authentication-passwords" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: Authentication & Passwords →</Link>
        </div>
      </div>
    </div>
  );
}
