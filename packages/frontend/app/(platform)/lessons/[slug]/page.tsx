'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * REAL PRACTICAL LESSON: Linux File Permissions & Ownership
 * Every command is real, every output is what you'd actually see,
 * every explanation tells you WHY.
 */

export default function LessonPage() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
        <span className="text-dark-700">/</span>
        <Link href="/courses/linux-fundamentals-security" className="hover:text-white transition-colors">Linux Fundamentals</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">File Permissions</span>
      </nav>

      {/* Lesson Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-intermediate">PRACTICAL</span>
          <span className="text-xs text-dark-500">Module 1 · Lesson 2</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Linux File Permissions & Ownership</h1>
        <p className="text-dark-400 leading-relaxed">
          File permissions are the <strong className="text-white">first line of defense</strong> in Linux security.
          They control who can read, write, or execute every file on the system.
          A single misconfigured permission can give an attacker full access to your server.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span className="flex items-center gap-1.5">🕐 35 minutes</span>
          <span className="flex items-center gap-1.5">⚡ +25 XP</span>
          <span className="flex items-center gap-1.5">🐧 Linux Security</span>
          <span className="flex items-center gap-1.5">🧪 Has practical lab</span>
        </div>
      </div>

      {/* === LESSON CONTENT === */}
      <div className="space-y-8">

        {/* Section 1: Why This Matters */}
        <section>
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">1</span>
            Why File Permissions Matter in Security
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            In 2023, <strong className="text-white">over 65% of Linux server breaches</strong> involved misconfigured file permissions.
            When an attacker gains limited access to your system, the first thing they check is:
            "What files can I read that I shouldn't be able to?"
          </p>
          <div className="callout-security">
            <p className="text-sm font-medium mb-1">🔒 Real-World Impact</p>
            <p className="text-xs opacity-80">
              The Equifax breach (2017) was partly caused by a web server configuration file being world-readable.
              The file contained database credentials. One wrong permission = 147 million records stolen.
            </p>
          </div>
        </section>

        {/* Section 2: Understanding Permission Notation */}
        <section>
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">2</span>
            Understanding Permission Notation
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            Every file in Linux has three sets of permissions for three categories of users:
          </p>

          {/* Visual diagram */}
          <div className="card-glass p-6 mb-4 font-mono text-sm">
            <p className="text-dark-500 text-xs mb-3 font-sans">Example: <code className="text-cyber-400">ls -la /etc/shadow</code> output:</p>
            <div className="text-center space-y-2">
              <p className="text-lg">
                <span className="text-purple-400">-</span>
                <span className="text-emerald-400">rw-</span>
                <span className="text-amber-400">r--</span>
                <span className="text-red-400">---</span>
                <span className="text-dark-400"> 1 root shadow 1234 Jan 15 /etc/shadow</span>
              </p>
              <div className="grid grid-cols-4 gap-2 text-[10px] max-w-md mx-auto mt-3">
                <div className="text-center">
                  <div className="text-purple-400 font-bold">-</div>
                  <div className="text-dark-500">File type<br/>(- = file, d = dir)</div>
                </div>
                <div className="text-center">
                  <div className="text-emerald-400 font-bold">rw-</div>
                  <div className="text-dark-500">Owner<br/>(read + write)</div>
                </div>
                <div className="text-center">
                  <div className="text-amber-400 font-bold">r--</div>
                  <div className="text-dark-500">Group<br/>(read only)</div>
                </div>
                <div className="text-center">
                  <div className="text-red-400 font-bold">---</div>
                  <div className="text-dark-500">Others<br/>(no access)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            <div className="card-glass p-4 text-center">
              <p className="text-2xl font-bold text-emerald-400 font-mono">r</p>
              <p className="text-sm text-white font-medium mt-1">Read</p>
              <p className="text-xs text-dark-500 mt-1">View file contents or list directory</p>
              <p className="text-xs text-dark-600 mt-1 font-mono">Value: 4</p>
            </div>
            <div className="card-glass p-4 text-center">
              <p className="text-2xl font-bold text-amber-400 font-mono">w</p>
              <p className="text-sm text-white font-medium mt-1">Write</p>
              <p className="text-xs text-dark-500 mt-1">Modify file or add/remove entries in dir</p>
              <p className="text-xs text-dark-600 mt-1 font-mono">Value: 2</p>
            </div>
            <div className="card-glass p-4 text-center">
              <p className="text-2xl font-bold text-red-400 font-mono">x</p>
              <p className="text-sm text-white font-medium mt-1">Execute</p>
              <p className="text-xs text-dark-500 mt-1">Run as program or enter directory</p>
              <p className="text-xs text-dark-600 mt-1 font-mono">Value: 1</p>
            </div>
          </div>
        </section>

        {/* Section 3: PRACTICAL - Viewing Permissions */}
        <section>
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">3</span>
            Practical: Viewing File Permissions
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            The <code className="text-cyber-400 bg-white/[0.03] px-1.5 py-0.5 rounded">ls -la</code> command shows detailed file information including permissions.
            Let's examine critical system files:
          </p>

          {/* Command 1 */}
          <div className="command-block">
            <div className="command-header">
              <span className="text-[11px] text-dark-500 font-mono">Command</span>
              <span className="text-[10px] text-dark-600">View permissions of /etc directory</span>
            </div>
            <div className="command-body">
              <div><span className="command-prompt">student@lab:~$ </span><span className="text-white">ls -la /etc/passwd /etc/shadow /etc/sudoers</span></div>
              <div className="command-output">
{`-rw-r--r-- 1 root root   2847 Jan 15 10:00 /etc/passwd
-rw-r----- 1 root shadow 1501 Jan 15 10:00 /etc/shadow
-r--r----- 1 root root   755  Jan 15 10:00 /etc/sudoers`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>Why this matters:</strong></p>
              <ul className="mt-1 space-y-1 list-none">
                <li>• <code>/etc/passwd</code> is world-readable (r--) because programs need to map UIDs to usernames</li>
                <li>• <code>/etc/shadow</code> contains password hashes — only root and shadow group can read it</li>
                <li>• <code>/etc/sudoers</code> controls who can use sudo — if an attacker can write to this, game over</li>
              </ul>
            </div>
          </div>

          {/* Command 2 */}
          <div className="command-block">
            <div className="command-header">
              <span className="text-[11px] text-dark-500 font-mono">Command</span>
              <span className="text-[10px] text-dark-600">Understand numeric permissions</span>
            </div>
            <div className="command-body">
              <div><span className="command-prompt">student@lab:~$ </span><span className="text-white">stat -c "%a %n" /etc/passwd /etc/shadow</span></div>
              <div className="command-output">
{`644 /etc/passwd
640 /etc/shadow`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>Numeric breakdown:</strong></p>
              <p className="mt-1"><code>644</code> = Owner: <span className="text-emerald-400">rw-</span>(4+2=6) | Group: <span className="text-amber-400">r--</span>(4) | Others: <span className="text-amber-400">r--</span>(4)</p>
              <p><code>640</code> = Owner: <span className="text-emerald-400">rw-</span>(4+2=6) | Group: <span className="text-amber-400">r--</span>(4) | Others: <span className="text-red-400">---</span>(0)</p>
            </div>
          </div>
        </section>

        {/* Section 4: PRACTICAL - Changing Permissions */}
        <section>
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">4</span>
            Practical: Fixing Dangerous Permissions
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            Let's say you find a configuration file with the password inside, and it's readable by everyone.
            This is a <strong className="text-red-400">critical security vulnerability</strong>. Here's how to fix it:
          </p>

          {/* Dangerous file scenario */}
          <div className="callout-danger">
            <p className="text-sm font-medium mb-1">⚠️ VULNERABILITY FOUND</p>
            <p className="text-xs opacity-80">
              File <code>/opt/app/config.yml</code> contains database credentials and has permissions <code>777</code> (rwxrwxrwx).
              This means ANY user on the system can read the database password!
            </p>
          </div>

          <div className="command-block">
            <div className="command-header">
              <span className="text-[11px] text-dark-500 font-mono">Step 1: Identify the problem</span>
            </div>
            <div className="command-body">
              <div><span className="command-prompt">student@lab:~$ </span><span className="text-white">ls -la /opt/app/config.yml</span></div>
              <div className="command-output">
                <span className="text-red-400">-rwxrwxrwx</span>{` 1 root root 234 Jan 15 /opt/app/config.yml`}
              </div>
              <div className="mt-2"><span className="command-prompt">student@lab:~$ </span><span className="text-white">cat /opt/app/config.yml</span></div>
              <div className="command-output">
{`database:
  host: db-server.internal
  user: admin
  password: S3cr3t_Pr0d_P@ss!
  port: 5432`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans text-red-300"><strong>🚨 Problem:</strong> Anyone on this server can read the database password because permissions are 777.</p>
            </div>
          </div>

          <div className="command-block">
            <div className="command-header">
              <span className="text-[11px] text-dark-500 font-mono">Step 2: Fix the permissions</span>
            </div>
            <div className="command-body">
              <div><span className="command-prompt">student@lab:~$ </span><span className="text-white">sudo chmod 600 /opt/app/config.yml</span></div>
              <div className="command-output"></div>
              <div className="mt-2"><span className="command-prompt">student@lab:~$ </span><span className="text-white">ls -la /opt/app/config.yml</span></div>
              <div className="command-output">
                <span className="text-emerald-400">-rw-------</span>{` 1 root root 234 Jan 15 /opt/app/config.yml`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans text-emerald-300"><strong>✓ Fixed!</strong> <code>chmod 600</code> means:</p>
              <ul className="mt-1 space-y-0.5">
                <li>• Owner (root): <span className="text-emerald-400">read + write</span></li>
                <li>• Group: <span className="text-red-400">no access</span></li>
                <li>• Others: <span className="text-red-400">no access</span></li>
              </ul>
              <p className="mt-2">Now only root can read this file. Even if an attacker gets shell access as another user, they cannot read the credentials.</p>
            </div>
          </div>

          <div className="command-block">
            <div className="command-header">
              <span className="text-[11px] text-dark-500 font-mono">Step 3: Verify the fix</span>
            </div>
            <div className="command-body">
              <div><span className="command-prompt">student@lab:~$ </span><span className="text-white">cat /opt/app/config.yml</span></div>
              <div className="command-output text-red-400">
{`cat: /opt/app/config.yml: Permission denied`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans text-emerald-300"><strong>✓ Confirmed!</strong> As a regular user, we can no longer read the file. The vulnerability is patched.</p>
            </div>
          </div>
        </section>

        {/* Section 5: SUID Bit - Advanced */}
        <section>
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-red-500/10 rounded-lg flex items-center justify-center text-xs text-red-400 border border-red-500/20">5</span>
            Advanced: The SUID Bit (Privilege Escalation Risk)
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            The SUID bit is one of the most dangerous permission settings in Linux. When set on a file,
            it means <strong className="text-white">the file executes with the owner's permissions, not the runner's.</strong>
            Attackers hunt for SUID binaries to escalate from regular user to root.
          </p>

          <div className="command-block">
            <div className="command-header">
              <span className="text-[11px] text-dark-500 font-mono">Find SUID binaries on the system</span>
            </div>
            <div className="command-body">
              <div><span className="command-prompt">student@lab:~$ </span><span className="text-white">find / -perm -4000 -type f 2&gt;/dev/null</span></div>
              <div className="command-output">
{`/usr/bin/passwd
/usr/bin/sudo
/usr/bin/su
/usr/bin/mount
/usr/bin/find`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>Security Analysis:</strong></p>
              <ul className="mt-1 space-y-1">
                <li>• <code>/usr/bin/passwd</code> — Normal. Users need root to change their own password hash in /etc/shadow</li>
                <li>• <code>/usr/bin/sudo</code> — Normal. Sudo needs root to execute commands as other users</li>
                <li>• <span className="text-red-400"><code>/usr/bin/find</code> — 🚨 DANGEROUS!</span> Find with SUID can execute commands as root: <code>find / -exec /bin/sh \;</code></li>
              </ul>
              <p className="mt-2 text-amber-300">An attacker finding SUID <code>find</code> can instantly get a root shell. This is a common CTF technique and real-world exploit.</p>
            </div>
          </div>

          <div className="callout-warning">
            <p className="text-sm font-medium mb-1">⚡ Key Takeaway</p>
            <p className="text-xs opacity-80">
              After every system change or application install, run <code>find / -perm -4000 -type f</code> to check for unexpected SUID binaries.
              This is a standard step in Linux hardening and security auditing.
            </p>
          </div>
        </section>

        {/* Section 6: Common Mistakes */}
        <section>
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-amber-500/10 rounded-lg flex items-center justify-center text-xs text-amber-400 border border-amber-500/20">6</span>
            Common Mistakes & How to Avoid Them
          </h2>

          <div className="grid gap-3">
            <div className="card-glass p-4 border-l-4 border-l-red-500">
              <p className="text-sm font-medium text-red-400">❌ Never use chmod 777</p>
              <p className="text-xs text-dark-400 mt-1">
                <code>chmod 777 file</code> gives everyone full access. Developers do this when "it doesn't work" — it's a massive security hole.
                Instead, find the SPECIFIC user/group that needs access.
              </p>
            </div>
            <div className="card-glass p-4 border-l-4 border-l-red-500">
              <p className="text-sm font-medium text-red-400">❌ Don't store secrets in world-readable files</p>
              <p className="text-xs text-dark-400 mt-1">
                API keys, passwords, and private keys should always be <code>600</code> or <code>640</code>.
                Use <code>find / -perm -o+r -name "*.key" -o -name "*.pem" -o -name "*.env"</code> to audit.
              </p>
            </div>
            <div className="card-glass p-4 border-l-4 border-l-emerald-500">
              <p className="text-sm font-medium text-emerald-400">✓ Use principle of least privilege</p>
              <p className="text-xs text-dark-400 mt-1">
                Give the minimum permissions needed. A web server only needs read access to HTML files, not write.
                A log file only needs append access, not read for other users.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Quick Reference */}
        <section>
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-blue-500/10 rounded-lg flex items-center justify-center text-xs text-blue-400 border border-blue-500/20">7</span>
            Quick Reference: Common Permission Settings
          </h2>

          <div className="card-glass overflow-hidden p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="text-left px-4 py-3 text-xs text-dark-400 font-medium">Permission</th>
                  <th className="text-left px-4 py-3 text-xs text-dark-400 font-medium">Notation</th>
                  <th className="text-left px-4 py-3 text-xs text-dark-400 font-medium">Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr><td className="px-4 py-2.5 font-mono text-cyber-400">600</td><td className="px-4 py-2.5 font-mono text-dark-300">-rw-------</td><td className="px-4 py-2.5 text-xs text-dark-400">Private keys, credentials, secrets</td></tr>
                <tr><td className="px-4 py-2.5 font-mono text-cyber-400">644</td><td className="px-4 py-2.5 font-mono text-dark-300">-rw-r--r--</td><td className="px-4 py-2.5 text-xs text-dark-400">Public config files, HTML pages</td></tr>
                <tr><td className="px-4 py-2.5 font-mono text-cyber-400">700</td><td className="px-4 py-2.5 font-mono text-dark-300">-rwx------</td><td className="px-4 py-2.5 text-xs text-dark-400">Private scripts, user home dirs</td></tr>
                <tr><td className="px-4 py-2.5 font-mono text-cyber-400">755</td><td className="px-4 py-2.5 font-mono text-dark-300">-rwxr-xr-x</td><td className="px-4 py-2.5 text-xs text-dark-400">System binaries, public scripts</td></tr>
                <tr><td className="px-4 py-2.5 font-mono text-red-400">777</td><td className="px-4 py-2.5 font-mono text-dark-300">-rwxrwxrwx</td><td className="px-4 py-2.5 text-xs text-red-400">⚠️ NEVER use in production</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Key Terms */}
        <section className="card-glass p-6">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">📝 Key Terms</h3>
          <div className="flex flex-wrap gap-2">
            {['chmod', 'chown', 'SUID', 'SGID', 'Sticky Bit', 'umask', 'Least Privilege', 'rwx', 'Octal Notation', 'File Owner', 'Group Owner'].map((term) => (
              <span key={term} className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg text-xs text-dark-300">
                {term}
              </span>
            ))}
          </div>
        </section>

        {/* Related Lab */}
        <section className="card border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-2xl border border-emerald-500/20">
              🧪
            </div>
            <div className="flex-1">
              <p className="text-xs text-emerald-400 font-medium uppercase">Practice Lab Available</p>
              <h3 className="font-semibold text-white mt-0.5">Linux File Permissions & Ownership Lab</h3>
              <p className="text-xs text-dark-400 mt-1">30 min · 4 objectives · Find and fix permission vulnerabilities in an isolated environment</p>
            </div>
            <Link href="/labs/linux-file-permissions" className="btn-primary text-xs px-4 py-2">
              Open Lab
            </Link>
          </div>
        </section>

        {/* Complete Button */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (
            <div className="flex items-center gap-2 text-emerald-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Lesson Completed! +25 XP</span>
            </div>
          ) : (
            <div />
          )}
          <button
            onClick={() => setCompleted(true)}
            disabled={completed}
            className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}
          >
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <Link href="/lessons/navigating-linux-filesystem" className="flex items-center gap-2 text-dark-500 hover:text-white transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Previous: Navigating the Filesystem
          </Link>
          <Link href="/lessons/linux-users-groups" className="flex items-center gap-2 text-cyber-400 hover:text-cyber-300 transition-colors text-sm">
            Next: Users & Groups
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
