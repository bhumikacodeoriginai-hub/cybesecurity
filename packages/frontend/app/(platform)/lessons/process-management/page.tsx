'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProcessManagementLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">Process Management & Monitoring</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-intermediate">PRACTICAL</span>
          <span className="text-xs text-dark-500">Module 3 · Lesson 19</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Process Management & Monitoring</h1>
        <p className="text-dark-400 leading-relaxed">
          In incident response, your first job is to find what's running that shouldn't be.
          Cryptominers, reverse shells, data exfiltrators — they're all processes.
          This lesson teaches you to find them, analyze them, and stop them.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 30 minutes</span><span>⚡ +25 XP</span><span>💻 Practical</span><span>🧪 Has Lab</span>
        </div>
      </div>

      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">1</span>
            Advanced Process Analysis
          </h2>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">ps aux — Full process listing with analysis</span></div>
            <div className="command-body">
              <div><span className="command-prompt">$ </span><span className="text-white">ps aux --sort=-%cpu | head -10</span></div>
              <div className="command-output">
{`USER       PID %CPU %MEM    VSZ   RSS TTY  STAT START   TIME COMMAND
root      5523 98.2  4.1  89320 43264 ?    R    10:00  45:23 ./xmrig --pool stratum+tcp://evil.com:3333
www-data  1205  2.3  1.2  54312 12480 ?    S    09:00   2:12 /usr/sbin/apache2 -k start
mysql      201  0.5  2.1 124680 43264 ?    Ssl  09:00   0:15 /usr/sbin/mysqld
root         1  0.0  0.1  16980  4832 ?    Ss   09:00   0:01 /sbin/init
root        42  0.0  0.1   7236  3156 ?    Ss   09:00   0:00 /usr/sbin/sshd -D`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans text-red-300"><strong>🚨 RED FLAG:</strong> PID 5523 is using <strong>98.2% CPU</strong>! It's "xmrig" — a cryptocurrency miner connecting to evil.com. Running as root means the system is fully compromised.</p>
              <p className="mt-1 font-sans"><strong>Response:</strong></p>
              <ol className="list-decimal ml-4 mt-1 space-y-0.5">
                <li><code>sudo kill -9 5523</code> — stop the miner immediately</li>
                <li><code>ls -la /proc/5523/exe</code> — find the actual binary location</li>
                <li>Check how it got there: cron? startup script? exploit?</li>
                <li>Block evil.com at firewall level</li>
              </ol>
            </div>
          </div>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Finding hidden processes — what /proc reveals</span></div>
            <div className="command-body text-xs space-y-2">
              <p className="text-dark-500"># Get full path of any running process</p>
              <div><span className="command-prompt">$ </span><span className="text-white">ls -la /proc/5523/exe</span></div>
              <div className="command-output">lrwxrwxrwx 1 root root 0 Jan 15 10:00 /proc/5523/exe -> /tmp/.cache/xmrig</div>
              <p className="text-dark-500 mt-2"># See what files a process has open</p>
              <div><span className="command-prompt">$ </span><span className="text-white">ls -la /proc/5523/fd/ | head -5</span></div>
              <div className="command-output">lr-x------ 1 root root 64 Jan 15 /proc/5523/fd/0 -> /dev/null
l-wx------ 1 root root 64 Jan 15 /proc/5523/fd/1 -> /tmp/.cache/miner.log
lrwx------ 1 root root 64 Jan 15 /proc/5523/fd/3 -> socket:[45623]</div>
              <p className="text-dark-500 mt-2"># See network connections of a specific process</p>
              <div><span className="command-prompt">$ </span><span className="text-white">ss -tnp | grep 5523</span></div>
              <div className="command-output">ESTAB  0  0  192.168.1.50:42311  185.143.223.15:3333  users:(("xmrig",pid=5523,fd=3))</div>
              <p className="text-dark-500 mt-2"># See command line arguments used to start process</p>
              <div><span className="command-prompt">$ </span><span className="text-white">cat /proc/5523/cmdline | tr '\0' ' '</span></div>
              <div className="command-output">./xmrig --pool stratum+tcp://evil.com:3333 --user attacker_wallet --threads 4</div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>/proc/[PID]/ is a goldmine for forensics:</strong></p>
              <ul className="mt-1 space-y-0.5">
                <li>• <code>/proc/PID/exe</code> → actual binary location (even if file was deleted!)</li>
                <li>• <code>/proc/PID/fd/</code> → open files and network sockets</li>
                <li>• <code>/proc/PID/cmdline</code> → exact command used to start it</li>
                <li>• <code>/proc/PID/environ</code> → environment variables (may contain secrets)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">2</span>
            Network Connection Analysis
          </h2>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">ss / netstat — Find suspicious network connections</span></div>
            <div className="command-body">
              <div><span className="command-prompt">$ </span><span className="text-white">ss -tnpa | grep ESTAB</span></div>
              <div className="command-output">
{`ESTAB  0  0  192.168.1.50:22     10.0.0.1:54321     users:(("sshd",pid=892))
ESTAB  0  0  192.168.1.50:80     10.0.0.5:43210     users:(("apache2",pid=1205))
ESTAB  0  0  192.168.1.50:42311  185.143.223.15:3333 users:(("xmrig",pid=5523))
ESTAB  0  0  192.168.1.50:55444  203.0.113.42:4444   users:(("bash",pid=6001))`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>Analysis:</strong></p>
              <ul className="mt-1 space-y-1">
                <li>• Line 1: Normal SSH connection from admin (10.0.0.1) ✅</li>
                <li>• Line 2: Normal web traffic to Apache ✅</li>
                <li>• Line 3: <span className="text-red-400">🚨 Cryptominer connecting to mining pool on port 3333!</span></li>
                <li>• Line 4: <span className="text-red-400">🚨 REVERSE SHELL! bash process connected to external IP on port 4444! This is an active attacker session!</span></li>
              </ul>
              <p className="mt-2 text-amber-300/80"><strong>Port 4444 is the default Metasploit reverse shell port.</strong> If you see bash/sh connected to an external IP — the system is actively being controlled by an attacker.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-red-500/10 rounded-lg flex items-center justify-center text-xs text-red-400 border border-red-500/20">3</span>
            Persistence Mechanisms — How Malware Survives Reboots
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            Killing a malicious process isn't enough. If it has <strong className="text-white">persistence</strong>, it will restart automatically. Check ALL of these:
          </p>

          <div className="space-y-3">
            {[
              { method: 'Cron Jobs', check: 'crontab -l; ls /etc/cron.*; cat /var/spool/cron/*', risk: 'Malware adds scheduled task to restart itself every minute' },
              { method: 'systemd Service', check: 'systemctl list-units --type=service --state=running', risk: 'Attacker creates a .service file that starts their tool on boot' },
              { method: '.bashrc / .profile', check: 'cat ~/.bashrc; cat /etc/profile', risk: 'Command injected into shell config — runs every time user logs in' },
              { method: '/etc/rc.local', check: 'cat /etc/rc.local', risk: 'Script that runs at boot time (legacy but still works)' },
              { method: 'init.d scripts', check: 'ls /etc/init.d/', risk: 'Startup scripts — attacker adds their own with innocent name' },
              { method: 'LD_PRELOAD', check: 'cat /etc/ld.so.preload; echo $LD_PRELOAD', risk: 'Forces a malicious library to load with EVERY program (rootkit technique)' },
            ].map((item) => (
              <div key={item.method} className="card-glass p-3 flex items-start gap-3">
                <span className="text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">⚠️</span>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-white">{item.method}</p>
                  <p className="text-[10px] text-dark-500 mt-0.5">{item.risk}</p>
                  <code className="text-[10px] text-cyber-400/60 font-mono mt-1 block">{item.check}</code>
                </div>
              </div>
            ))}
          </div>

          <div className="callout-warning mt-4">
            <p className="text-xs"><strong>Incident response rule:</strong> After killing a malicious process, you MUST check all persistence mechanisms. If you miss even one, the malware comes back after reboot and you start over.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">4</span>
            Complete Incident Response Workflow
          </h2>

          <div className="space-y-2">
            {[
              { step: 1, action: 'Identify suspicious process', cmd: 'ps aux --sort=-%cpu | head; ss -tnpa | grep ESTAB' },
              { step: 2, action: 'Gather evidence before killing', cmd: 'ls -la /proc/PID/exe; cat /proc/PID/cmdline; ss -tnp | grep PID' },
              { step: 3, action: 'Kill the process', cmd: 'sudo kill -9 PID' },
              { step: 4, action: 'Block the C2 IP', cmd: 'sudo iptables -A OUTPUT -d ATTACKER_IP -j DROP' },
              { step: 5, action: 'Remove persistence', cmd: 'Check cron, systemd, bashrc, rc.local, init.d' },
              { step: 6, action: 'Remove the malware file', cmd: 'rm /path/to/malware (after preserving a copy for analysis)' },
              { step: 7, action: 'Verify process is gone', cmd: 'ps aux | grep malware_name; ss -tnpa | grep ATTACKER_IP' },
              { step: 8, action: 'Monitor for recurrence', cmd: 'Watch logs and connections for next 24-48 hours' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                <div className="w-6 h-6 bg-cyber-400/10 rounded-lg flex items-center justify-center text-[10px] text-cyber-400 font-bold border border-cyber-400/20 flex-shrink-0">{item.step}</div>
                <div className="flex-1">
                  <p className="text-xs text-white font-medium">{item.action}</p>
                  <code className="text-[10px] text-dark-500 font-mono">{item.cmd}</code>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• <code>ps aux --sort=-%cpu</code> → instantly find resource-hogging malware</li>
            <li>• <code>/proc/PID/</code> → forensic goldmine: binary path, cmdline, open files, network sockets</li>
            <li>• <code>ss -tnpa | grep ESTAB</code> → find active network connections (reverse shells use port 4444)</li>
            <li>• After killing: check ALL persistence (cron, systemd, bashrc, rc.local, init.d, LD_PRELOAD)</li>
            <li>• Gather evidence BEFORE killing — you can't analyze what no longer exists</li>
            <li>• Block C2 IP at firewall level to prevent reconnection</li>
          </ul>
        </section>

        <section className="card border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-2xl border border-emerald-500/20">🧪</div>
            <div className="flex-1">
              <p className="text-xs text-emerald-400 font-medium uppercase">Practice Lab</p>
              <h3 className="font-semibold text-white mt-0.5">Linux Intrusion Investigation</h3>
              <p className="text-xs text-dark-400 mt-1">Find the cryptominer, trace the reverse shell, remove persistence</p>
            </div>
            <Link href="/labs/linux-intrusion-investigation" className="btn-primary text-xs px-4 py-2">Open Lab</Link>
          </div>
        </section>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (<span className="text-emerald-400 text-sm">✅ Completed! +25 XP</span>) : <div/>}
          <button onClick={() => setCompleted(true)} disabled={completed} className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <Link href="/lessons/pipes-redirection-shell" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: Pipes & Redirection</Link>
          <Link href="/lessons/ip-addresses-subnets" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: IP Addresses & Subnets →</Link>
        </div>
      </div>
    </div>
  );
}
