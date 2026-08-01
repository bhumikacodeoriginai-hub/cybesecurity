'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SystemLogsLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">System Logs & Why They Matter</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-beginner">PRACTICAL</span>
          <span className="text-xs text-dark-500">Module 2 · Lesson 12</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">System Logs & Why They Matter</h1>
        <p className="text-dark-400 leading-relaxed">
          Logs are the <strong className="text-white">security cameras of a computer</strong>. They record everything
          that happens — who logged in, what programs ran, what errors occurred, and what network
          connections were made. Without logs, you're blind to attacks.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 25 minutes</span><span>⚡ +20 XP</span><span>💻 Practical</span><span>🧪 Has Lab</span>
        </div>
      </div>

      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">1</span>
            Why Logs Are the Most Important Security Resource
          </h2>
          <div className="callout-security">
            <p className="text-xs"><strong>Security fact:</strong> The average time to detect a breach is <strong>197 days</strong> (IBM 2023). Companies with good logging and monitoring detect breaches in under 14 days. Logs are the ONLY way to know what happened after an attack.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            {[
              { use: 'Detect attacks in progress', example: '50 failed SSH logins from same IP in 1 minute = brute force attack happening NOW' },
              { use: 'Investigate after breach', example: 'Trace exactly what attacker did: when they entered, what they accessed, what they stole' },
              { use: 'Prove compliance', example: 'Auditors check logs to verify access controls work (PCI-DSS, HIPAA, SOC2)' },
              { use: 'Troubleshoot errors', example: 'Web server returning 500 errors → check error log for the exact PHP/Python crash' },
            ].map((item) => (
              <div key={item.use} className="card-glass p-3">
                <p className="text-xs font-semibold text-white mb-1">{item.use}</p>
                <p className="text-[11px] text-dark-500">{item.example}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">2</span>
            Critical Linux Log Files
          </h2>

          <div className="card-glass overflow-hidden p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                  <th className="px-4 py-2.5 text-left text-dark-400">Log File</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">What It Records</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Look For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">/var/log/auth.log</td><td className="px-4 py-2 text-dark-300">Logins, sudo, SSH access</td><td className="px-4 py-2 text-dark-500">Failed logins, new users, sudo abuse</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">/var/log/syslog</td><td className="px-4 py-2 text-dark-300">General system events</td><td className="px-4 py-2 text-dark-500">Service crashes, kernel errors</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">/var/log/kern.log</td><td className="px-4 py-2 text-dark-300">Kernel messages</td><td className="px-4 py-2 text-dark-500">Hardware errors, driver issues, USB events</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">/var/log/apache2/access.log</td><td className="px-4 py-2 text-dark-300">Web server requests</td><td className="px-4 py-2 text-dark-500">SQLi attempts, scanning, suspicious paths</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">/var/log/apache2/error.log</td><td className="px-4 py-2 text-dark-300">Web server errors</td><td className="px-4 py-2 text-dark-500">Failed exploits, misconfigurations</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">/var/log/cron.log</td><td className="px-4 py-2 text-dark-300">Scheduled task execution</td><td className="px-4 py-2 text-dark-500">Attacker persistence via cron jobs</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">~/.bash_history</td><td className="px-4 py-2 text-dark-300">User's command history</td><td className="px-4 py-2 text-dark-500">What commands attacker ran</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">3</span>
            Practical: Reading & Analyzing Logs
          </h2>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Check for failed SSH login attempts (brute force detection)</span></div>
            <div className="command-body">
              <div><span className="command-prompt">$ </span><span className="text-white">grep "Failed password" /var/log/auth.log | tail -10</span></div>
              <div className="command-output">
{`Jan 15 09:58:01 server sshd[4521]: Failed password for root from 203.0.113.42 port 55123 ssh2
Jan 15 09:58:03 server sshd[4521]: Failed password for root from 203.0.113.42 port 55123 ssh2
Jan 15 09:58:05 server sshd[4521]: Failed password for root from 203.0.113.42 port 55123 ssh2
Jan 15 09:58:08 server sshd[4521]: Failed password for admin from 203.0.113.42 port 55124 ssh2
Jan 15 09:58:10 server sshd[4521]: Failed password for admin from 203.0.113.42 port 55124 ssh2`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>Analysis:</strong> IP 203.0.113.42 tried to login as "root" and "admin" multiple times in seconds. This is a <strong>brute force attack</strong>. Response: block the IP with <code>iptables -A INPUT -s 203.0.113.42 -j DROP</code></p>
            </div>
          </div>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Count failed logins by IP (find the attacker)</span></div>
            <div className="command-body">
              <div><span className="command-prompt">$ </span><span className="text-white">grep "Failed password" /var/log/auth.log | awk '{'{'}print $(NF-3){'}'}' | sort | uniq -c | sort -rn | head -5</span></div>
              <div className="command-output">
{`    142 203.0.113.42
     23 198.51.100.15
      5 192.0.2.100
      2 10.0.0.55
      1 172.16.0.5`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>Result:</strong> IP 203.0.113.42 had <strong>142 failed login attempts</strong> — clearly an automated brute force. 198.51.100.15 had 23 — also suspicious. The others might be legitimate users mistyping passwords.</p>
              <p className="mt-1 text-amber-300/80"><strong>🔒 This is exactly what SOC analysts do all day.</strong> You'll master this in the SOC module.</p>
            </div>
          </div>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Check for successful logins (did attacker get in?)</span></div>
            <div className="command-body">
              <div><span className="command-prompt">$ </span><span className="text-white">grep "Accepted password" /var/log/auth.log</span></div>
              <div className="command-output">
{`Jan 15 09:58:45 server sshd[4525]: Accepted password for root from 203.0.113.42 port 55201 ssh2
Jan 15 10:01:30 server sshd[4540]: Accepted password for h4cker_user from 203.0.113.42 port 55302 ssh2`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans text-red-300"><strong>🚨 ALERT:</strong> The same IP (203.0.113.42) that was brute-forcing SUCCESSFULLY logged in as root! Then 3 minutes later logged in as h4cker_user — a user they likely created. This system is <strong>compromised</strong>. Incident response needed immediately.</p>
            </div>
          </div>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Use journalctl for systemd logs</span></div>
            <div className="command-body">
              <p className="text-dark-500 text-xs mb-2"># Show logs from the last hour</p>
              <div><span className="command-prompt">$ </span><span className="text-white">journalctl --since "1 hour ago"</span></div>
              <p className="text-dark-500 text-xs mt-2"># Show only SSH service logs</p>
              <div><span className="command-prompt">$ </span><span className="text-white">journalctl -u sshd --since today</span></div>
              <p className="text-dark-500 text-xs mt-2"># Show logs with priority error or higher</p>
              <div><span className="command-prompt">$ </span><span className="text-white">journalctl -p err --since "2025-01-15"</span></div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>journalctl</strong> is the modern way to read logs on systemd-based Linux (Ubuntu 16+, CentOS 7+). It's more powerful than reading raw files — you can filter by time, service, priority, and more.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-red-500/10 rounded-lg flex items-center justify-center text-xs text-red-400 border border-red-500/20">4</span>
            What Attackers Do to Logs (and How to Stop Them)
          </h2>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { attack: 'Delete logs', cmd: 'rm -rf /var/log/*', defense: 'Send logs to remote server (syslog/SIEM). Attacker can\'t delete what\'s on another machine.' },
              { attack: 'Modify timestamps', cmd: 'touch -t 202301010000 evil.sh', defense: 'Use log integrity monitoring (tripwire) and compare multiple log sources.' },
              { attack: 'Disable logging', cmd: 'systemctl stop rsyslog', defense: 'Alert on logging service stopping. Monitor from external system.' },
              { attack: 'Fill disk (stop new logs)', cmd: 'dd if=/dev/zero of=/tmp/fill bs=1M count=50000', defense: 'Separate /var/log on its own partition. Alert on disk >90% full.' },
            ].map((item) => (
              <div key={item.attack} className="card-glass p-4">
                <p className="text-xs font-semibold text-red-400 mb-1">Attack: {item.attack}</p>
                <code className="text-[10px] text-dark-500 font-mono">{item.cmd}</code>
                <p className="text-[11px] text-emerald-400/80 mt-2"><strong>Defense:</strong> {item.defense}</p>
              </div>
            ))}
          </div>

          <div className="callout-warning mt-4">
            <p className="text-xs"><strong>Critical rule:</strong> ALWAYS send copies of logs to a remote server that your main servers can't delete. This is called <strong>centralized logging</strong>. If an attacker compromises your server, they can destroy local logs — but the copies on the log server are safe.</p>
          </div>
        </section>

        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• Logs = security cameras for computers. Without them, you can't detect or investigate attacks.</li>
            <li>• Critical log: <code>/var/log/auth.log</code> — shows ALL login attempts (failed and successful)</li>
            <li>• <code>grep "Failed password"</code> → find brute force attacks</li>
            <li>• <code>grep "Accepted password"</code> → find successful logins (did attacker get in?)</li>
            <li>• <code>journalctl</code> = modern log viewer with filtering by time, service, priority</li>
            <li>• Attackers delete/modify logs → always send copies to a remote log server (SIEM)</li>
            <li>• Average breach detection: 197 days without monitoring, 14 days with good logging</li>
          </ul>
        </section>

        <section className="card border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-2xl border border-emerald-500/20">🧪</div>
            <div className="flex-1">
              <p className="text-xs text-emerald-400 font-medium uppercase">Practice Lab</p>
              <h3 className="font-semibold text-white mt-0.5">Log Analysis Investigation Lab</h3>
              <p className="text-xs text-dark-400 mt-1">Analyze real auth.log entries, identify the attacker, and trace their actions</p>
            </div>
            <Link href="/labs/linux-intrusion-investigation" className="btn-primary text-xs px-4 py-2">Open Lab</Link>
          </div>
        </section>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (<span className="text-emerald-400 text-sm">✅ Completed! +20 XP</span>) : <div/>}
          <button onClick={() => setCompleted(true)} disabled={completed} className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <Link href="/lessons/users-permissions-access" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: Users & Permissions</Link>
          <Link href="/lessons/intro-linux-terminal" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: Introduction to Linux & Terminal →</Link>
        </div>
      </div>
    </div>
  );
}
