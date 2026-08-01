'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NavigatingLinuxFilesystemLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">Navigating the Linux Filesystem</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-intermediate">PRACTICAL</span>
          <span className="text-xs text-dark-500">Module 3 · Lesson 14</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Navigating the Linux Filesystem</h1>
        <p className="text-dark-400 leading-relaxed">
          Linux organizes ALL files in a single tree structure starting from / (root). 
          Knowing where important files live is essential — attackers target specific directories,
          and investigators need to know exactly where to look for evidence.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 30 minutes</span><span>⚡ +20 XP</span><span>💻 Practical</span><span>🧪 Has Lab</span>
        </div>
      </div>

      <div className="space-y-10">

        {/* Section 1: The Filesystem Tree */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">1</span>
            The Linux Directory Structure
          </h2>

          <div className="callout-info">
            <p className="text-sm font-medium mb-2">📚 Library Analogy:</p>
            <p className="text-xs opacity-90">
              Linux filesystem = a library building. <code>/</code> (root) is the front door. Each directory is a floor or section.
              <code>/etc</code> = admin office (configs), <code>/home</code> = reading rooms (user files), <code>/var/log</code> = security camera recordings (logs).
            </p>
          </div>

          <div className="card-glass p-5 mt-4 font-mono text-xs">
            <p className="text-dark-500 mb-2 font-sans text-[10px]">Linux Filesystem Hierarchy (most important directories):</p>
            <div className="space-y-1 text-dark-300">
              <p><span className="text-cyber-400">/</span> ← Root of everything (the starting point)</p>
              <p>├── <span className="text-blue-400">/bin</span> ← Essential commands (ls, cat, cp, mv, grep)</p>
              <p>├── <span className="text-purple-400">/etc</span> ← <span className="text-red-400">System configuration files</span> (passwords, network, services)</p>
              <p>├── <span className="text-emerald-400">/home</span> ← User home directories (/home/student, /home/john)</p>
              <p>├── <span className="text-red-400">/root</span> ← Root user's home (admin only!)</p>
              <p>├── <span className="text-amber-400">/var</span> ← Variable data (logs, databases, web files)</p>
              <p>│   └── <span className="text-amber-400">/var/log</span> ← <span className="text-red-400">ALL system logs</span> (auth.log, syslog, kern.log)</p>
              <p>├── <span className="text-dark-400">/tmp</span> ← Temporary files (<span className="text-red-400">attackers love hiding here</span>)</p>
              <p>├── <span className="text-dark-400">/usr</span> ← User programs and utilities</p>
              <p>│   └── <span className="text-dark-400">/usr/bin</span> ← Most installed programs live here</p>
              <p>├── <span className="text-dark-400">/opt</span> ← Optional third-party software</p>
              <p>├── <span className="text-dark-400">/dev</span> ← Device files (hard drives, USB, etc.)</p>
              <p>└── <span className="text-dark-400">/proc</span> ← Virtual filesystem (running process info)</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            {[
              { dir: '/etc', security: '🔴 HIGH', reason: 'Contains /etc/passwd (user list), /etc/shadow (password hashes), /etc/ssh/ (SSH config), /etc/crontab (scheduled tasks). First place attackers check.' },
              { dir: '/var/log', security: '🔴 HIGH', reason: 'Authentication logs, system logs, application logs. Investigators spend most time here. Attackers try to DELETE these.' },
              { dir: '/tmp', security: '🟡 MEDIUM', reason: 'World-writable (anyone can write here). Attackers drop malware, scripts, and tools in /tmp because all users have access.' },
              { dir: '/root', security: '🔴 HIGH', reason: 'Admin home directory. Contains root\'s .bash_history (all admin commands), SSH keys, and configs. If attacker reads this = game over.' },
            ].map((item) => (
              <div key={item.dir} className="card-glass p-3">
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-cyber-400 text-sm">{item.dir}</code>
                  <span className="text-[10px]">{item.security}</span>
                </div>
                <p className="text-[11px] text-dark-500">{item.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Navigation Commands */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">2</span>
            Navigation Commands (Practical)
          </h2>

          <div className="space-y-4">
            <div className="command-block">
              <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Move around the filesystem</span></div>
              <div className="command-body">
                <p className="text-dark-500 text-xs mb-2"># Go to /etc directory</p>
                <div><span className="command-prompt">student@lab:~$ </span><span className="text-white">cd /etc</span></div>
                <div><span className="command-prompt">student@lab:/etc$ </span><span className="text-white">pwd</span></div>
                <div className="command-output">/etc</div>
                <p className="text-dark-500 text-xs mt-2"># Go up one level</p>
                <div><span className="command-prompt">student@lab:/etc$ </span><span className="text-white">cd ..</span></div>
                <div><span className="command-prompt">student@lab:/$ </span><span className="text-white">pwd</span></div>
                <div className="command-output">/</div>
                <p className="text-dark-500 text-xs mt-2"># Go home instantly</p>
                <div><span className="command-prompt">student@lab:/$ </span><span className="text-white">cd ~</span></div>
                <div><span className="command-prompt">student@lab:~$ </span><span className="text-white">pwd</span></div>
                <div className="command-output">/home/student</div>
              </div>
              <div className="command-explanation">
                <p className="font-sans"><strong>Path shortcuts:</strong> <code>.</code> = current dir, <code>..</code> = parent dir, <code>~</code> = your home, <code>/</code> = absolute root, <code>-</code> = previous location</p>
              </div>
            </div>

            <div className="command-block">
              <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Find files — essential for investigations</span></div>
              <div className="command-body">
                <p className="text-dark-500 text-xs mb-2"># Find all .log files modified in last 24 hours</p>
                <div><span className="command-prompt">$ </span><span className="text-white">find /var/log -name "*.log" -mtime -1</span></div>
                <div className="command-output">/var/log/auth.log
/var/log/syslog
/var/log/kern.log</div>
                <p className="text-dark-500 text-xs mt-2"># Find files owned by a specific user</p>
                <div><span className="command-prompt">$ </span><span className="text-white">find /home -user h4cker_user -type f</span></div>
                <div className="command-output">/home/h4cker_user/.bashrc
/home/h4cker_user/.bash_history
/home/h4cker_user/.hidden_backdoor.sh</div>
                <p className="text-dark-500 text-xs mt-2"># Find executable files in /tmp (suspicious!)</p>
                <div><span className="command-prompt">$ </span><span className="text-white">find /tmp -type f -executable</span></div>
                <div className="command-output">/tmp/.x11-unix/miner
/tmp/reverse_shell.sh</div>
              </div>
              <div className="command-explanation">
                <p className="font-sans text-amber-300/80"><strong>🔒 Security use:</strong> The <code>find</code> command is your #1 forensics tool. Finding recently modified files, files owned by suspicious users, or executables in /tmp is standard incident response procedure.</p>
              </div>
            </div>

            <div className="command-block">
              <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Hidden files — what attackers try to hide</span></div>
              <div className="command-body">
                <p className="text-dark-500 text-xs mb-2"># Files starting with . are HIDDEN (not shown in normal ls)</p>
                <div><span className="command-prompt">$ </span><span className="text-white">ls /home/student</span></div>
                <div className="command-output">Desktop  Documents  Downloads</div>
                <p className="text-dark-500 text-xs mt-2"># Add -a flag to see hidden files</p>
                <div><span className="command-prompt">$ </span><span className="text-white">ls -la /home/student</span></div>
                <div className="command-output">drwxr-xr-x 6 student student 4096 Jan 15 .
drwxr-xr-x 4 root    root    4096 Jan 13 ..
<span className="text-amber-400">-rw------- 1 student student  456 Jan 15 .bash_history</span>
<span className="text-amber-400">-rw-r--r-- 1 student student  220 Jan 13 .bashrc</span>
drwxr-xr-x 2 student student 4096 Jan 15 Desktop
drwxr-xr-x 2 student student 4096 Jan 15 Documents</div>
              </div>
              <div className="command-explanation">
                <p className="font-sans"><strong>Hidden files (yellow):</strong> <code>.bash_history</code> = every command the user typed. <code>.bashrc</code> = shell config (attackers add malicious commands here that run on every login). ALWAYS check hidden files during investigations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Quick Reference */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">3</span>
            Quick Reference — Navigation Commands
          </h2>

          <div className="card-glass overflow-hidden p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                  <th className="px-4 py-2.5 text-left text-dark-400">Command</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">What it does</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Security Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">pwd</td><td className="px-4 py-2 text-dark-300">Show current directory</td><td className="px-4 py-2 text-dark-500">Know your context</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">ls -la</td><td className="px-4 py-2 text-dark-300">List all files with details</td><td className="px-4 py-2 text-dark-500">See permissions + hidden files</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">cd /path</td><td className="px-4 py-2 text-dark-300">Change directory</td><td className="px-4 py-2 text-dark-500">Navigate to investigate</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">find / -name "x"</td><td className="px-4 py-2 text-dark-300">Search for files by name</td><td className="px-4 py-2 text-dark-500">Find malware, hidden files</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">find / -mtime -1</td><td className="px-4 py-2 text-dark-300">Files modified in last day</td><td className="px-4 py-2 text-dark-500">What changed recently?</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">find / -user bob</td><td className="px-4 py-2 text-dark-300">Files owned by user "bob"</td><td className="px-4 py-2 text-dark-500">What did suspect touch?</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">which nmap</td><td className="px-4 py-2 text-dark-300">Find where a program is</td><td className="px-4 py-2 text-dark-500">Is a tool installed?</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">file suspicious.bin</td><td className="px-4 py-2 text-dark-300">Identify file type</td><td className="px-4 py-2 text-dark-500">Is it really a .jpg or a .exe?</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Lab Link */}
        <section className="card border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-2xl border border-emerald-500/20">🧪</div>
            <div className="flex-1">
              <p className="text-xs text-emerald-400 font-medium uppercase">Practice Lab</p>
              <h3 className="font-semibold text-white mt-0.5">Linux Filesystem Navigation Lab</h3>
              <p className="text-xs text-dark-400 mt-1">Navigate a compromised system, find hidden files, trace attacker activity</p>
            </div>
            <Link href="/labs/linux-intrusion-investigation" className="btn-primary text-xs px-4 py-2">Open Lab</Link>
          </div>
        </section>

        {/* Summary */}
        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• Everything in Linux starts from <code>/</code> (root). No drive letters like C:\ in Windows.</li>
            <li>• Critical directories: /etc (config), /var/log (logs), /tmp (temp), /home (users), /root (admin)</li>
            <li>• Hidden files start with a dot (.) — always use <code>ls -la</code> to see them</li>
            <li>• <code>find</code> is your best friend for forensics: search by name, date, owner, permissions</li>
            <li>• Attackers hide malware in /tmp, add persistence in .bashrc, and delete /var/log</li>
            <li>• Path shortcuts: <code>~</code> = home, <code>..</code> = up, <code>/</code> = root, <code>-</code> = previous</li>
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
          <Link href="/lessons/intro-linux-terminal" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: Intro to Linux</Link>
          <Link href="/lessons/file-permissions-ownership" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: File Permissions & Ownership →</Link>
        </div>
      </div>
    </div>
  );
}
