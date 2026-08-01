'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function IntroLinuxTerminalLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">Introduction to Linux & Terminal</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-intermediate">PRACTICAL</span>
          <span className="text-xs text-dark-500">Module 3 · Lesson 13</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Introduction to Linux & The Terminal</h1>
        <p className="text-dark-400 leading-relaxed">
          This is where your hands-on journey begins. The terminal (command line) is your primary tool
          as a security professional. It's faster, more powerful, and lets you do things no GUI can do.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 30 minutes</span><span>⚡ +20 XP</span><span>💻 Practical</span><span>🧪 Has Lab</span>
        </div>
      </div>

      <div className="space-y-10">

        {/* Section 1: What is Linux? */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">1</span>
            What is Linux? (30-Second Version)
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            Linux is a <strong className="text-white">free, open-source operating system</strong> created in 1991 by Linus Torvalds.
            Unlike Windows (Microsoft owns it) or macOS (Apple owns it), Linux is owned by nobody and
            maintained by thousands of developers worldwide.
          </p>

          <div className="card-glass p-5 mb-4">
            <p className="text-sm text-white font-medium mb-3">Linux is EVERYWHERE (you use it daily without knowing):</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { where: 'Your Android phone', pct: '72% of mobiles' },
                { where: 'Netflix, YouTube, Facebook', pct: '90%+ of web servers' },
                { where: 'AWS, Azure, Google Cloud', pct: '90% of cloud' },
                { where: 'Wi-Fi routers at home', pct: 'Most run embedded Linux' },
                { where: 'Tesla cars', pct: 'Linux-based system' },
                { where: 'International Space Station', pct: 'Runs on Linux' },
              ].map((item) => (
                <div key={item.where} className="p-2 bg-white/[0.02] rounded-lg border border-white/[0.04]">
                  <p className="text-xs text-white font-medium">{item.where}</p>
                  <p className="text-[10px] text-dark-500">{item.pct}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: The Terminal */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">2</span>
            The Terminal — Your New Best Friend
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            The terminal (also called "command line", "shell", or "console") is a text interface where you type
            commands instead of clicking buttons. It looks intimidating at first, but it's actually
            <strong className="text-white"> simpler and more powerful</strong> than a GUI.
          </p>

          <div className="callout-info">
            <p className="text-sm font-medium mb-2">Why terminal &gt; GUI for security work:</p>
            <ul className="text-xs opacity-90 space-y-1 ml-3 list-disc">
              <li><strong>Speed:</strong> `find / -name "*.log" -mtime -1` finds all logs modified today. Try that in a GUI file explorer!</li>
              <li><strong>Automation:</strong> Write one script that checks 1000 servers. GUI = clicking 1000 times.</li>
              <li><strong>Remote access:</strong> SSH into a server halfway around the world. No desktop/GUI needed.</li>
              <li><strong>Precision:</strong> Exact control over every setting. No hidden options buried in menus.</li>
              <li><strong>Forensics:</strong> Most evidence is found through terminal commands, not clicking around.</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Your First Commands */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">3</span>
            Your First 10 Linux Commands
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            These 10 commands will get you through 80% of basic Linux work. Type them exactly as shown:
          </p>

          <div className="space-y-4">
            {[
              { cmd: 'whoami', output: 'student', explanation: 'Shows the current logged-in username. First thing to check on any system — "who am I and what privileges do I have?"', security: 'After gaining access to a system, attackers run whoami to check their privilege level.' },
              { cmd: 'pwd', output: '/home/student', explanation: 'Print Working Directory — shows your current location in the file system. Like asking "where am I?"', security: 'Critical for knowing context. /root means you have admin access. /home/user means limited.' },
              { cmd: 'ls', output: 'Desktop  Documents  Downloads  Music  Pictures', explanation: 'Lists files and directories in your current location. Like opening a folder in a file explorer.', security: 'ls -la shows hidden files (starting with .) and permissions — essential for security analysis.' },
              { cmd: 'ls -la', output: 'total 32\ndrwxr-xr-x 8 student student 4096 Jan 15 10:00 .\ndrwxr-xr-x 3 root    root    4096 Jan 13 06:00 ..\n-rw-r--r-- 1 student student  220 Jan 13 06:00 .bashrc\n-rw------- 1 student student  156 Jan 15 10:00 .bash_history\ndrwxr-xr-x 2 student student 4096 Jan 15 09:00 Desktop', explanation: '-l = long format (details), -a = all (including hidden). Shows permissions, owner, size, and date.', security: 'Hidden files (.bashrc, .bash_history) often contain sensitive info. Attackers hide malware in dot-files.' },
              { cmd: 'cd /etc', output: '(no output — you moved)', explanation: 'Change Directory — moves you to a new location. /etc contains system configuration files.', security: '/etc is a goldmine for attackers: passwords (/etc/shadow), user list (/etc/passwd), SSH config, cron jobs.' },
              { cmd: 'cat /etc/hostname', output: 'cybersec-lab', explanation: 'Displays the entire contents of a file. "cat" = concatenate (originally for joining files).', security: 'cat is how you read config files, logs, and credentials. cat /etc/passwd shows all users on the system.' },
              { cmd: 'echo "Hello World"', output: 'Hello World', explanation: 'Prints text to the screen. Used for output, writing to files, and scripting.', security: 'echo can write to files: echo "malicious" > /tmp/backdoor.sh — watch for this in logs.' },
              { cmd: 'date', output: 'Sat Jan 15 10:15:32 UTC 2025', explanation: 'Shows current date and time. Important for correlating events in logs.', security: 'Attackers sometimes change system time to confuse log analysis. Always verify time on compromised systems.' },
              { cmd: 'id', output: 'uid=1000(student) gid=1000(student) groups=1000(student)', explanation: 'Shows your user ID, group ID, and group memberships. More detail than whoami.', security: 'uid=0 means ROOT (full admin). Groups determine what extra access you have. "sudo" or "wheel" group = can become root.' },
              { cmd: 'history', output: '1  whoami\n2  pwd\n3  ls\n4  ls -la\n5  cd /etc\n6  cat /etc/hostname', explanation: 'Shows all previously typed commands. Stored in ~/.bash_history file.', security: 'CRITICAL in forensics! Check .bash_history of suspicious users to see what commands they ran.' },
            ].map((item, idx) => (
              <div key={idx} className="command-block">
                <div className="command-header">
                  <span className="text-[11px] text-dark-500 font-mono">Command {idx + 1}</span>
                  <span className="text-[10px] text-dark-600">{item.security.substring(0, 50)}...</span>
                </div>
                <div className="command-body">
                  <div><span className="command-prompt">student@lab:~$ </span><span className="text-white">{item.cmd}</span></div>
                  <div className="command-output">{item.output}</div>
                </div>
                <div className="command-explanation">
                  <p className="font-sans"><strong>What it does:</strong> {item.explanation}</p>
                  <p className="font-sans mt-1 text-amber-300/80"><strong>🔒 Security relevance:</strong> {item.security}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Terminal Tips */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">4</span>
            Essential Terminal Shortcuts (Save Hours)
          </h2>

          <div className="card-glass overflow-hidden p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                  <th className="px-4 py-2.5 text-left text-dark-400">Shortcut</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">What it does</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Why you'll use it</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">Tab</td><td className="px-4 py-2 text-dark-300">Auto-complete filenames/commands</td><td className="px-4 py-2 text-dark-500">Type "cd /et" + Tab → completes to "/etc"</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">↑ / ↓ arrows</td><td className="px-4 py-2 text-dark-300">Scroll through previous commands</td><td className="px-4 py-2 text-dark-500">Re-run commands without retyping</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">Ctrl + C</td><td className="px-4 py-2 text-dark-300">Cancel/stop current command</td><td className="px-4 py-2 text-dark-500">If a command hangs or runs forever</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">Ctrl + L</td><td className="px-4 py-2 text-dark-300">Clear the screen</td><td className="px-4 py-2 text-dark-500">Clean view without losing history</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">Ctrl + R</td><td className="px-4 py-2 text-dark-300">Search command history</td><td className="px-4 py-2 text-dark-500">Find that long command you typed earlier</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">Ctrl + A / E</td><td className="px-4 py-2 text-dark-300">Jump to start/end of line</td><td className="px-4 py-2 text-dark-500">Edit long commands quickly</td></tr>
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
              <h3 className="font-semibold text-white mt-0.5">Linux Command Line Basics Lab</h3>
              <p className="text-xs text-dark-400 mt-1">Practice all 10 commands in an isolated Linux environment</p>
            </div>
            <Link href="/labs/linux-intrusion-investigation" className="btn-primary text-xs px-4 py-2">Open Lab</Link>
          </div>
        </section>

        {/* Summary */}
        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• Linux runs 90% of servers, all security tools, and is required for cybersecurity careers</li>
            <li>• The terminal is faster and more powerful than any GUI for security work</li>
            <li>• 10 essential commands: whoami, pwd, ls, ls -la, cd, cat, echo, date, id, history</li>
            <li>• Every command has a security use case — attackers and defenders use the same tools</li>
            <li>• Tab completion and Ctrl+R will save you thousands of keystrokes</li>
            <li>• Practice in the lab — muscle memory is key</li>
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
          <Link href="/lessons/system-logs-matter" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: System Logs</Link>
          <Link href="/lessons/navigating-linux-filesystem" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: Navigating the File System →</Link>
        </div>
      </div>
    </div>
  );
}
