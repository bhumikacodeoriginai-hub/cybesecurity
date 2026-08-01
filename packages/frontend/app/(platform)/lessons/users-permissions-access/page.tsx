'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UsersPermissionsLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">Users, Permissions & Access Control</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-beginner">PRACTICAL</span>
          <span className="text-xs text-dark-500">Module 2 · Lesson 11</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Users, Permissions & Access Control</h1>
        <p className="text-dark-400 leading-relaxed">
          Every security breach involves permissions — either the attacker had too many,
          or the victim had too few protections. This lesson explains how operating systems
          control WHO can access WHAT.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 30 minutes</span><span>⚡ +20 XP</span><span>💻 Practical</span><span>🧪 Has Lab</span>
        </div>
      </div>

      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">1</span>
            User Accounts — Identity in a Computer
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            Every person (and many programs) on a computer has a <strong className="text-white">user account</strong>.
            This is how the OS tracks who is doing what and decides what they're allowed to do.
          </p>

          <div className="callout-info">
            <p className="text-sm font-medium mb-2">🏢 Office Analogy:</p>
            <p className="text-xs opacity-90">
              User accounts are like employee ID badges. The CEO badge opens all doors (root).
              A regular employee badge only opens their floor (regular user). 
              A janitor badge opens utility rooms only (service account).
              The badge system = access control.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mt-4">
            <div className="card-glass p-4 border-t-4 border-t-red-500">
              <h4 className="text-xs font-bold text-red-400 mb-1">root (UID 0)</h4>
              <p className="text-[11px] text-dark-400">God mode. Can do ANYTHING: read all files, kill all processes, change all settings, install software, create/delete users.</p>
              <p className="text-[10px] text-dark-600 mt-1">⚠️ Attackers' ultimate goal</p>
            </div>
            <div className="card-glass p-4 border-t-4 border-t-blue-500">
              <h4 className="text-xs font-bold text-blue-400 mb-1">Regular Users (UID 1000+)</h4>
              <p className="text-[11px] text-dark-400">Limited access. Can only modify own files. Can't install system software. Can't read other users' private files.</p>
              <p className="text-[10px] text-dark-600 mt-1">Normal human accounts</p>
            </div>
            <div className="card-glass p-4 border-t-4 border-t-purple-500">
              <h4 className="text-xs font-bold text-purple-400 mb-1">Service Accounts (UID 1-999)</h4>
              <p className="text-[11px] text-dark-400">Run services (web server, database). Usually can't login. Limited to what that service needs.</p>
              <p className="text-[10px] text-dark-600 mt-1">www-data, mysql, sshd</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">2</span>
            Practical: Managing Users
          </h2>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">View all users on the system</span></div>
            <div className="command-body">
              <div><span className="command-prompt">$ </span><span className="text-white">cat /etc/passwd | grep -E "bash|sh$"</span></div>
              <div className="command-output">
{`root:x:0:0:root:/root:/bin/bash
student:x:1000:1000:Lab Student:/home/student:/bin/bash
john:x:1001:1001:John Smith:/home/john:/bin/bash
h4cker_user:x:1002:1002::/home/h4cker_user:/bin/bash`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>Format:</strong> username:x:UID:GID:description:home_directory:shell</p>
              <p className="mt-1"><strong>Users with /bin/bash can login interactively.</strong> Users with /usr/sbin/nologin cannot — they're service accounts.</p>
              <p className="mt-1 text-amber-300/80"><strong>🔒 Security:</strong> During an investigation, look for unfamiliar users with bash shells. h4cker_user above is suspicious! Also check for UID 0 users other than root — that's a backdoor.</p>
            </div>
          </div>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">User management commands</span></div>
            <div className="command-body text-xs space-y-2">
              <p className="text-dark-500"># Create a new user</p>
              <div><span className="command-prompt">$ </span><span className="text-white">sudo useradd -m -s /bin/bash newuser</span></div>
              <p className="text-dark-500 mt-2"># Set password for user</p>
              <div><span className="command-prompt">$ </span><span className="text-white">sudo passwd newuser</span></div>
              <div className="command-output">New password: ********
Retype: ********
passwd: password updated successfully</div>
              <p className="text-dark-500 mt-2"># Add user to sudo group (give admin privileges)</p>
              <div><span className="command-prompt">$ </span><span className="text-white">sudo usermod -aG sudo newuser</span></div>
              <p className="text-dark-500 mt-2"># Lock a compromised account (disable login)</p>
              <div><span className="command-prompt">$ </span><span className="text-white">sudo usermod -L h4cker_user</span></div>
              <p className="text-dark-500 mt-2"># Delete a user and their home directory</p>
              <div><span className="command-prompt">$ </span><span className="text-white">sudo userdel -r h4cker_user</span></div>
            </div>
            <div className="command-explanation">
              <p className="font-sans text-amber-300/80"><strong>🔒 Incident response:</strong> When you find a compromised account, LOCK it immediately (<code>usermod -L</code>) — don't delete it yet! You need to preserve evidence (their files, history, crontab) before removal.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">3</span>
            The Principle of Least Privilege
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            The most important rule in access control: <strong className="text-white">Give users ONLY the minimum access they need to do their job. Nothing more.</strong>
          </p>

          <div className="grid gap-3">
            <div className="card-glass p-4 border-l-4 border-l-red-500">
              <p className="text-sm text-white font-medium mb-1">❌ BAD: Everyone is admin</p>
              <p className="text-xs text-dark-400">Company gives all employees root/admin access "for convenience." One employee clicks phishing link → attacker instantly has full admin access to everything.</p>
            </div>
            <div className="card-glass p-4 border-l-4 border-l-emerald-500">
              <p className="text-sm text-white font-medium mb-1">✅ GOOD: Minimal privileges</p>
              <p className="text-xs text-dark-400">Employees get standard user accounts. Only IT admins have sudo. Web server runs as www-data (can only read web files). Even if compromised, attacker is trapped with limited access.</p>
            </div>
          </div>

          <div className="callout-security mt-4">
            <p className="text-xs"><strong>Real example:</strong> The Target breach (2013, 40 million credit cards stolen) started because an HVAC vendor had network access to the payment system. They only needed access to manage air conditioning — least privilege would have prevented the breach entirely.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">4</span>
            sudo — Temporary Elevated Access
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            <code className="text-cyber-400 bg-white/[0.03] px-1.5 py-0.5 rounded">sudo</code> = "Super User Do". 
            It lets authorized users run ONE command as root, without staying logged in as root permanently.
          </p>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">sudo vs running as root</span></div>
            <div className="command-body text-xs space-y-2">
              <p className="text-dark-500"># Without sudo — permission denied (correct behavior!)</p>
              <div><span className="command-prompt">student@lab:~$ </span><span className="text-white">cat /etc/shadow</span></div>
              <div className="command-output text-red-400">cat: /etc/shadow: Permission denied</div>
              <p className="text-dark-500 mt-2"># With sudo — runs as root for this one command</p>
              <div><span className="command-prompt">student@lab:~$ </span><span className="text-white">sudo cat /etc/shadow</span></div>
              <div className="command-output">[sudo] password for student: ********
root:$6$xyz...:19371:0:99999:7:::
student:$6$abc...:19371:0:99999:7:::</div>
              <p className="text-dark-500 mt-2"># Check who can use sudo</p>
              <div><span className="command-prompt">$ </span><span className="text-white">sudo -l</span></div>
              <div className="command-output">User student may run the following commands:
    (ALL : ALL) ALL</div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>Why sudo &gt; always being root:</strong> Every command as root is dangerous. One typo like <code>rm -rf /</code> destroys everything. sudo forces you to THINK before each privileged action. It also creates an audit log of who ran what.</p>
              <p className="mt-1 text-amber-300/80"><strong>🔒 Security:</strong> <code>sudo -l</code> shows what you can do. Attackers always run this to check if they can escalate privileges. If you see <code>(ALL : ALL) ALL</code>, that user can become root.</p>
            </div>
          </div>
        </section>

        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• Three user types: root (all-powerful), regular users (limited), service accounts (programs)</li>
            <li>• <code>/etc/passwd</code> lists all users — look for suspicious accounts with bash shells</li>
            <li>• Least Privilege = minimum access needed. The Target breach proves why.</li>
            <li>• Use <code>sudo</code> for individual commands, never stay logged in as root</li>
            <li>• Lock compromised accounts with <code>usermod -L</code> — don't delete until evidence is preserved</li>
            <li>• <code>sudo -l</code> shows privilege level — attackers check this first for escalation</li>
          </ul>
        </section>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (<span className="text-emerald-400 text-sm">✅ Completed! +20 XP</span>) : <div/>}
          <button onClick={() => setCompleted(true)} disabled={completed} className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <Link href="/lessons/file-systems-data-storage" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: File Systems</Link>
          <Link href="/lessons/system-logs-matter" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: System Logs & Why They Matter →</Link>
        </div>
      </div>
    </div>
  );
}
