'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProcessesServicesLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">Processes, Services & Daemons</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-beginner">BEGINNER</span>
          <span className="text-xs text-dark-500">Module 2 · Lesson 9</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Processes, Services & Daemons</h1>
        <p className="text-dark-400 leading-relaxed">
          Every program running on a computer is a "process." Attackers hide as processes.
          Defenders monitor processes to find intruders. Understanding processes is essential
          for both attack detection and system administration.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 25 minutes</span><span>⚡ +15 XP</span><span>📖 Theory + Commands</span>
        </div>
      </div>

      <div className="space-y-10">

        {/* Section 1 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">1</span>
            What is a Process?
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            A <strong className="text-white">process</strong> is a running instance of a program. When you open
            Chrome, the OS creates a process. When you run a command in terminal, that's a process.
            Your computer is running <strong className="text-white">hundreds of processes right now</strong>.
          </p>

          <div className="callout-info">
            <p className="text-sm font-medium mb-2">🏭 Factory Analogy:</p>
            <p className="text-xs opacity-90">
              A <strong>program</strong> is like a recipe (instructions stored on disk).
              A <strong>process</strong> is like a chef actually cooking that recipe (the recipe being executed).
              You can have multiple chefs (processes) using the same recipe (program) simultaneously.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mt-4">
            <div className="card-glass p-4">
              <h4 className="text-xs font-bold text-cyber-400 mb-1">Process</h4>
              <p className="text-[11px] text-dark-400">A program currently running in memory. Has a PID (Process ID) — a unique number.</p>
              <p className="text-[10px] text-dark-600 mt-1">Example: Firefox (PID: 2341)</p>
            </div>
            <div className="card-glass p-4">
              <h4 className="text-xs font-bold text-amber-400 mb-1">Service</h4>
              <p className="text-[11px] text-dark-400">A process that runs in the background continuously, providing functionality to other programs.</p>
              <p className="text-[10px] text-dark-600 mt-1">Example: Apache web server (httpd)</p>
            </div>
            <div className="card-glass p-4">
              <h4 className="text-xs font-bold text-purple-400 mb-1">Daemon</h4>
              <p className="text-[11px] text-dark-400">Linux term for a background service. Named with 'd' at the end: sshd, httpd, mysqld, crond.</p>
              <p className="text-[10px] text-dark-600 mt-1">Example: sshd (SSH daemon)</p>
            </div>
          </div>
        </section>

        {/* Section 2: Viewing Processes */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">2</span>
            Viewing Running Processes (Practical)
          </h2>

          <div className="command-block">
            <div className="command-header">
              <span className="text-[11px] text-dark-500 font-mono">ps aux — Show ALL running processes</span>
            </div>
            <div className="command-body">
              <div><span className="command-prompt">student@lab:~$ </span><span className="text-white">ps aux</span></div>
              <div className="command-output">
{`USER       PID %CPU %MEM    VSZ   RSS TTY  STAT START   TIME COMMAND
root         1  0.0  0.1  16980  4832 ?    Ss   09:00   0:01 /sbin/init
root        42  0.0  0.1   7236  3156 ?    Ss   09:00   0:00 /usr/sbin/sshd -D
root       156  0.0  0.3  54312 12480 ?    Ss   09:00   0:02 /usr/sbin/apache2 -k start
mysql      201  0.5  2.1 124680 43264 ?    Ssl  09:00   0:15 /usr/sbin/mysqld
student    892  0.0  0.1   4628  3456 pts/0 Ss   10:01   0:00 -bash
student    910  0.0  0.0   3084   888 pts/0 R+   10:15   0:00 ps aux`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>Reading the output:</strong></p>
              <ul className="mt-1 space-y-1">
                <li>• <strong>USER</strong> = who started the process (root = admin, mysql = database user)</li>
                <li>• <strong>PID</strong> = Process ID (unique number to identify/kill this process)</li>
                <li>• <strong>%CPU/%MEM</strong> = resource usage (high = suspicious if unexpected)</li>
                <li>• <strong>COMMAND</strong> = the actual program running</li>
              </ul>
              <p className="mt-2 text-amber-300/80"><strong>🔒 Security:</strong> Unknown processes running as root are red flags. Cryptominers show very high CPU. Processes with random names (xk2f9) may be malware.</p>
            </div>
          </div>

          <div className="command-block">
            <div className="command-header">
              <span className="text-[11px] text-dark-500 font-mono">top — Live process monitor (like Task Manager)</span>
            </div>
            <div className="command-body">
              <div><span className="command-prompt">student@lab:~$ </span><span className="text-white">top</span></div>
              <div className="command-output">
{`top - 10:15:32 up 1 day, 1:15, 1 user, load average: 0.12, 0.08, 0.03
Tasks: 112 total, 1 running, 111 sleeping, 0 stopped, 0 zombie
%Cpu(s): 2.3 us, 0.8 sy, 0.0 ni, 96.5 id, 0.3 wa, 0.0 hi, 0.1 si
MiB Mem:   3932.4 total,   2156.3 free,    812.1 used,    964.0 buff/cache

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM  COMMAND
  201 mysql     20   0  124680  43264  15232 S   0.7   2.1  mysqld
  156 root      20   0   54312  12480   8192 S   0.3   0.3  apache2
    1 root      20   0   16980   4832   3456 S   0.0   0.1  init`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>What to look for:</strong></p>
              <ul className="mt-1 space-y-1">
                <li>• <strong>load average</strong> above 1.0 per CPU core = system stressed (possible DDoS or cryptominer)</li>
                <li>• <strong>zombie</strong> processes = something is broken (rarely dangerous but indicates issues)</li>
                <li>• Any process using &gt;80% CPU unexpectedly = investigate immediately</li>
              </ul>
              <p className="mt-1 text-dark-500">Press 'q' to exit top. Press 'k' to kill a process by PID.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Critical Services */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">3</span>
            Critical Services to Know (and Monitor)
          </h2>

          <div className="card-glass overflow-hidden p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                  <th className="px-4 py-2.5 text-left text-dark-400">Service</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">What it does</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Port</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Security Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">sshd</td><td className="px-4 py-2 text-dark-300">Allows remote login</td><td className="px-4 py-2 text-dark-400">22</td><td className="px-4 py-2 text-amber-400">Brute force target #1</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">apache2/nginx</td><td className="px-4 py-2 text-dark-300">Serves web pages</td><td className="px-4 py-2 text-dark-400">80/443</td><td className="px-4 py-2 text-amber-400">Web attacks (SQLi, XSS)</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">mysqld</td><td className="px-4 py-2 text-dark-300">Database server</td><td className="px-4 py-2 text-dark-400">3306</td><td className="px-4 py-2 text-red-400">Data theft if exposed</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">crond</td><td className="px-4 py-2 text-dark-300">Scheduled tasks</td><td className="px-4 py-2 text-dark-400">N/A</td><td className="px-4 py-2 text-red-400">Attackers add persistence here</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">systemd-journald</td><td className="px-4 py-2 text-dark-300">Collects all logs</td><td className="px-4 py-2 text-dark-400">N/A</td><td className="px-4 py-2 text-emerald-400">Defenders need this running</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">ufw/iptables</td><td className="px-4 py-2 text-dark-300">Firewall</td><td className="px-4 py-2 text-dark-400">N/A</td><td className="px-4 py-2 text-emerald-400">Must be enabled & configured</td></tr>
              </tbody>
            </table>
          </div>

          <div className="command-block mt-4">
            <div className="command-header">
              <span className="text-[11px] text-dark-500 font-mono">Check if a service is running</span>
            </div>
            <div className="command-body">
              <div><span className="command-prompt">student@lab:~$ </span><span className="text-white">systemctl status sshd</span></div>
              <div className="command-output">
{`● sshd.service - OpenBSD Secure Shell server
     Loaded: loaded (/lib/systemd/system/sshd.service; enabled)
     Active: active (running) since Sat 2025-01-15 09:00:12 UTC; 1h 15min ago
   Main PID: 42 (sshd)
      Tasks: 1 (limit: 4915)
     Memory: 4.2M
        CPU: 32ms`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>"active (running)"</strong> = service is currently operational. <strong>"enabled"</strong> = starts automatically on boot.</p>
              <p className="mt-1 text-amber-300/80"><strong>🔒 Security:</strong> Check which services auto-start. Disable unnecessary ones: <code>sudo systemctl disable telnet</code> — every running service is a potential attack surface.</p>
            </div>
          </div>
        </section>

        {/* Section 4: Killing Processes */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-red-500/10 rounded-lg flex items-center justify-center text-xs text-red-400 border border-red-500/20">4</span>
            Stopping Suspicious Processes
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            If you find a malicious process, you need to stop it immediately:
          </p>

          <div className="command-block">
            <div className="command-header">
              <span className="text-[11px] text-dark-500 font-mono">Finding and killing a suspicious process</span>
            </div>
            <div className="command-body text-xs space-y-2">
              <p className="text-dark-500"># Step 1: Find suspicious process</p>
              <div><span className="command-prompt">$ </span><span className="text-white">ps aux | grep cryptominer</span></div>
              <div className="command-output">root  5523  98.2  4.1  89320 43264 ?  R  10:00  45:23 ./cryptominer --pool evil.com</div>
              <p className="text-dark-500 mt-2"># Step 2: Kill it (15 = graceful, 9 = force)</p>
              <div><span className="command-prompt">$ </span><span className="text-white">sudo kill -9 5523</span></div>
              <div className="command-output">(no output = success)</div>
              <p className="text-dark-500 mt-2"># Step 3: Verify it's gone</p>
              <div><span className="command-prompt">$ </span><span className="text-white">ps aux | grep cryptominer</span></div>
              <div className="command-output">student 5601 0.0 0.0 3084 888 pts/0 S+ 10:46 0:00 grep cryptominer</div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>Important:</strong> Killing the process stops it NOW, but if there's a cron job or systemd service restarting it, it will come back. You must also find and remove the persistence mechanism.</p>
            </div>
          </div>

          <div className="callout-danger mt-4">
            <p className="text-xs"><strong>⚠️ Real incident scenario:</strong> In a ransomware attack, you'll see the encryption process consuming 100% CPU. Killing it IMMEDIATELY can save unencrypted files. Speed matters — practice identifying and killing processes quickly.</p>
          </div>
        </section>

        {/* Summary */}
        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• Process = running program, Service = background process, Daemon = Linux service (ends in 'd')</li>
            <li>• <code>ps aux</code> shows all processes, <code>top</code> shows live resource usage</li>
            <li>• Look for: unknown processes, high CPU usage, processes running as root unexpectedly</li>
            <li>• Critical services: sshd, apache/nginx, mysqld, crond — know what's normal on your systems</li>
            <li>• <code>kill -9 PID</code> force-stops a process, <code>systemctl stop servicename</code> stops a service</li>
            <li>• Every unnecessary running service = increased attack surface. Disable what you don't need.</li>
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
          <Link href="/lessons/operating-systems-explained" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: Operating Systems</Link>
          <Link href="/lessons/file-systems-data-storage" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: File Systems & Data Storage →</Link>
        </div>
      </div>
    </div>
  );
}
