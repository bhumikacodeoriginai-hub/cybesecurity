'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ThreatsVulnsRisksLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">Threats, Vulnerabilities & Risks</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-beginner">BEGINNER</span>
          <span className="text-xs text-dark-500">Module 1 · Lesson 3</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Threats, Vulnerabilities & Risks</h1>
        <p className="text-dark-400 leading-relaxed">
          These three words are used in every security conversation. Understanding how they connect 
          is the foundation of all security decision-making.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 30 minutes</span><span>⚡ +20 XP</span><span>📖 Theory + Examples</span>
        </div>
      </div>

      <div className="space-y-10">
        {/* Section 1: The Three Concepts */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">1</span>
            Understanding the Three Concepts
          </h2>

          <div className="grid gap-4 mb-4">
            <div className="card-glass p-5 border-l-4 border-l-red-500">
              <h3 className="text-base font-bold text-red-400 mb-2">🎯 Threat</h3>
              <p className="text-sm text-dark-300 mb-2"><strong className="text-white">Definition:</strong> Anything that COULD cause harm to your system or data.</p>
              <p className="text-sm text-dark-300 mb-3"><strong className="text-white">Simple analogy:</strong> A threat is like a burglar who EXISTS in your neighborhood. They haven't broken into your house yet, but they could.</p>
              <div className="bg-white/[0.02] rounded-lg p-3">
                <p className="text-xs text-dark-400 font-medium mb-1">Real examples of threats:</p>
                <ul className="text-xs text-dark-500 space-y-1 ml-3 list-disc">
                  <li>A hacker group targeting companies in your industry</li>
                  <li>A disgruntled employee who might steal data</li>
                  <li>A natural disaster that could destroy your servers</li>
                  <li>A phishing email campaign targeting your employees</li>
                  <li>A new malware spreading across the internet</li>
                </ul>
              </div>
            </div>

            <div className="card-glass p-5 border-l-4 border-l-amber-500">
              <h3 className="text-base font-bold text-amber-400 mb-2">🕳️ Vulnerability</h3>
              <p className="text-sm text-dark-300 mb-2"><strong className="text-white">Definition:</strong> A weakness in your system that a threat can exploit.</p>
              <p className="text-sm text-dark-300 mb-3"><strong className="text-white">Simple analogy:</strong> A vulnerability is like an unlocked window in your house. It's a weakness that the burglar (threat) can use to get in.</p>
              <div className="bg-white/[0.02] rounded-lg p-3">
                <p className="text-xs text-dark-400 font-medium mb-1">Real examples of vulnerabilities:</p>
                <ul className="text-xs text-dark-500 space-y-1 ml-3 list-disc">
                  <li>Software that hasn't been updated (unpatched)</li>
                  <li>A weak password like "password123"</li>
                  <li>A web form that doesn't validate input (SQL injection possible)</li>
                  <li>A server with port 22 open to the entire internet</li>
                  <li>An employee who clicks every email link without checking</li>
                  <li>A database with no encryption</li>
                </ul>
              </div>
            </div>

            <div className="card-glass p-5 border-l-4 border-l-purple-500">
              <h3 className="text-base font-bold text-purple-400 mb-2">⚖️ Risk</h3>
              <p className="text-sm text-dark-300 mb-2"><strong className="text-white">Definition:</strong> The CHANCE that a threat will exploit a vulnerability and cause damage.</p>
              <p className="text-sm text-dark-300 mb-3"><strong className="text-white">Simple analogy:</strong> Risk is the probability that the burglar (threat) will find your unlocked window (vulnerability) and steal your valuables (impact).</p>
              <div className="bg-white/[0.03] rounded-lg p-4 text-center">
                <p className="text-lg font-bold text-white font-mono">Risk = Threat × Vulnerability × Impact</p>
                <p className="text-xs text-dark-500 mt-2">If any factor is zero, risk is zero. If all are high, risk is critical.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The Relationship */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">2</span>
            How They Connect — 5 Real Scenarios
          </h2>

          <div className="space-y-4">
            {[
              {
                num: 1,
                scenario: 'Company uses "admin/admin" as database login',
                threat: 'Any hacker scanning for default credentials',
                vulnerability: 'Default password never changed',
                impact: 'Complete database access — all customer data stolen',
                risk: 'CRITICAL',
                riskColor: 'text-red-400',
                fix: 'Change to strong, unique password + enable MFA',
              },
              {
                num: 2,
                scenario: 'Employee receives phishing email with fake invoice',
                threat: 'Cybercriminal sending targeted phishing',
                vulnerability: 'No email security training, no email filtering',
                impact: 'Malware installed, network compromised',
                risk: 'HIGH',
                riskColor: 'text-orange-400',
                fix: 'Security awareness training + email filters + sandbox links',
              },
              {
                num: 3,
                scenario: 'Web server running Apache 2.2 (released 2005)',
                threat: 'Automated bots scanning for known vulnerabilities',
                vulnerability: '100+ known CVEs in outdated Apache version',
                impact: 'Remote code execution — attacker controls the server',
                risk: 'CRITICAL',
                riskColor: 'text-red-400',
                fix: 'Update to latest Apache version immediately',
              },
              {
                num: 4,
                scenario: 'Laptop with full-disk encryption in a locked office',
                threat: 'Physical theft of the device',
                vulnerability: 'LOW — data is encrypted, office is locked',
                impact: 'Minimal — even if stolen, data is unreadable',
                risk: 'LOW',
                riskColor: 'text-green-400',
                fix: 'Already well-protected. Continue current controls.',
              },
              {
                num: 5,
                scenario: 'Hospital Wi-Fi has no password on guest network',
                threat: 'Attacker on the same network intercepting traffic',
                vulnerability: 'No network encryption, no segmentation',
                impact: 'Patient data intercepted, HIPAA violation, massive fines',
                risk: 'HIGH',
                riskColor: 'text-orange-400',
                fix: 'WPA3 encryption + separate guest/medical networks',
              },
            ].map((item) => (
              <div key={item.num} className="card-glass p-4">
                <p className="text-sm font-bold text-white mb-3">Scenario {item.num}: {item.scenario}</p>
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div><span className="text-red-400 font-medium">Threat:</span> <span className="text-dark-400">{item.threat}</span></div>
                  <div><span className="text-amber-400 font-medium">Vulnerability:</span> <span className="text-dark-400">{item.vulnerability}</span></div>
                  <div><span className="text-purple-400 font-medium">Impact:</span> <span className="text-dark-400">{item.impact}</span></div>
                  <div><span className={`font-medium ${item.riskColor}`}>Risk Level:</span> <span className={item.riskColor}>{item.risk}</span></div>
                </div>
                <div className="mt-3 p-2 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                  <span className="text-emerald-400 text-xs font-medium">✓ Fix: </span>
                  <span className="text-xs text-dark-400">{item.fix}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Risk Assessment */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">3</span>
            How Security Professionals Assess Risk
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            In real jobs, you'll use a <strong className="text-white">risk matrix</strong> to prioritize what to fix first:
          </p>

          <div className="card-glass overflow-hidden p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.03]">
                  <th className="px-3 py-2.5 text-dark-400 font-medium text-left">Likelihood ↓ / Impact →</th>
                  <th className="px-3 py-2.5 text-dark-400 font-medium text-center">Low Impact</th>
                  <th className="px-3 py-2.5 text-dark-400 font-medium text-center">Medium Impact</th>
                  <th className="px-3 py-2.5 text-dark-400 font-medium text-center">High Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr>
                  <td className="px-3 py-2.5 text-dark-300 font-medium">High Likelihood</td>
                  <td className="px-3 py-2.5 text-center"><span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">MEDIUM</span></td>
                  <td className="px-3 py-2.5 text-center"><span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400">HIGH</span></td>
                  <td className="px-3 py-2.5 text-center"><span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400">CRITICAL</span></td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 text-dark-300 font-medium">Medium Likelihood</td>
                  <td className="px-3 py-2.5 text-center"><span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400">LOW</span></td>
                  <td className="px-3 py-2.5 text-center"><span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">MEDIUM</span></td>
                  <td className="px-3 py-2.5 text-center"><span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400">HIGH</span></td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 text-dark-300 font-medium">Low Likelihood</td>
                  <td className="px-3 py-2.5 text-center"><span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400">LOW</span></td>
                  <td className="px-3 py-2.5 text-center"><span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400">LOW</span></td>
                  <td className="px-3 py-2.5 text-center"><span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">MEDIUM</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="callout-security mt-4">
            <p className="text-xs"><strong>Rule of thumb:</strong> Fix CRITICAL and HIGH risks first. They have the highest chance of being exploited with the worst consequences. You can't fix everything, so prioritize.</p>
          </div>
        </section>

        {/* Section 4: CVE System */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">4</span>
            CVE — How Vulnerabilities Are Tracked Globally
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            Every discovered vulnerability gets a unique ID called a <strong className="text-white">CVE (Common Vulnerabilities and Exposures)</strong> number.
            This lets security professionals worldwide reference the same vulnerability.
          </p>

          <div className="command-block">
            <div className="command-header">
              <span className="text-[11px] text-dark-500 font-mono">Example: Famous CVEs</span>
            </div>
            <div className="command-body text-xs space-y-3">
              <div>
                <p className="text-cyber-400 font-semibold">CVE-2021-44228 (Log4Shell)</p>
                <p className="text-dark-400">Critical vulnerability in Apache Log4j. Affected millions of servers. Attacker could execute any command remotely just by sending a crafted string.</p>
                <p className="text-red-400 mt-1">CVSS Score: 10.0 / 10 (Maximum severity)</p>
              </div>
              <div>
                <p className="text-cyber-400 font-semibold">CVE-2017-0144 (EternalBlue)</p>
                <p className="text-dark-400">Windows SMB vulnerability. Used by WannaCry ransomware. Allowed code execution without authentication.</p>
                <p className="text-red-400 mt-1">CVSS Score: 9.8 / 10</p>
              </div>
              <div>
                <p className="text-cyber-400 font-semibold">CVE-2014-0160 (Heartbleed)</p>
                <p className="text-dark-400">OpenSSL vulnerability that leaked memory contents including private keys and passwords from 17% of all web servers.</p>
                <p className="text-orange-400 mt-1">CVSS Score: 7.5 / 10</p>
              </div>
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
              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> <strong>Threat</strong> = who/what can cause harm (hackers, malware, disasters)</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> <strong>Vulnerability</strong> = weakness that can be exploited (unpatched software, weak passwords)</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> <strong>Risk</strong> = probability that a threat exploits a vulnerability (Threat × Vuln × Impact)</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Use risk matrices to prioritize what to fix first</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> CVEs track known vulnerabilities globally (e.g., Log4Shell = CVE-2021-44228)</li>
            </ul>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (<span className="text-emerald-400 text-sm">✅ Completed! +20 XP</span>) : <div/>}
          <button onClick={() => setCompleted(true)} disabled={completed} className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <Link href="/lessons/the-cia-triad" className="flex items-center gap-2 text-dark-500 hover:text-white transition-colors text-sm">
            ← Previous: The CIA Triad
          </Link>
          <Link href="/lessons/types-of-cyber-attacks" className="flex items-center gap-2 text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">
            Next: Types of Cyber Attacks →
          </Link>
        </div>
      </div>
    </div>
  );
}
