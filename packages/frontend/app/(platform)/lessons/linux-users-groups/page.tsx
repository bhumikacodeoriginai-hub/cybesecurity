'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LinuxUsersGroupsLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">Users, Groups & sudo</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-intermediate">PRACTICAL</span>
          <span className="text-xs text-dark-500">Module 3 · Lesson 16</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Linux Users, Groups & sudo</h1>
        <p className="text-dark-400 leading-relaxed">
          Linux is a multi-user system. Understanding how users and groups work is essential
          for hardening servers, investigating breaches, and performing privilege escalation tests.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 30 minutes</span><span>⚡ +20 XP</span><span>💻 Practical</span><span>🧪 Has Lab</span>
        </div>
      </div>

      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">1</span>
            Key Files for User Management
          </h2>

          <div className="space-y-4">
            <div className="command-block">
              <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">/etc/passwd — All user accounts</span></div>
              <div className="command-body">
                <div><span className="command-prompt">$ </span><span className="text-white">cat /etc/passwd | head -5</span></div>
                <div className="command-output">
{`root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
student:x:1000:1000:Lab Student:/home/student:/bin/bash
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin`}
                </div>
              </div>
              <div className="command-explanation">
                <p className="font-sans"><strong>Format:</strong> username:<span className="text-dark-500">password_placeholder</span>:<span className="text-cyan-400">UID</span>:<span className="text-amber-400">GID</span>:description:<span className="text-emerald-400">home_dir</span>:<span className="text-purple-400">shell</span></p>
                <p className="mt-1 text-amber-300/80"><strong>🔒 Security checks:</strong></p>
                <ul className="mt-1 space-y-0.5">
                  <li>• UID 0 = root. If ANY other user has UID 0, it's a backdoor!</li>
                  <li>• /bin/bash or /bin/sh = can login interactively (investigate unknown ones)</li>
                  <li>• /usr/sbin/nologin = can't login (service accounts — this is correct)</li>
                </ul>
              </div>
            </div>

            <div className="command-block">
              <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">/etc/shadow — Password hashes (root only!)</span></div>
              <div className="command-body">
                <div><span className="command-prompt">$ </span><span className="text-white">sudo cat /etc/shadow | grep -v "!" | grep -v "*"</span></div>
                <div className="command-output">
{`root:$6$rAnD0mSaLt$AbCdEf123...longHash...:19371:0:99999:7:::
student:$6$AnoTherSalt$XyZ789...longHash...:19371:0:99999:7:::
h4cker_user:$6$WeAk$SimpleHash123...:19372:0:99999:7:::`}
                </div>
              </div>
              <div className="command-explanation">
                <p className="font-sans"><strong>Format:</strong> username:<span className="text-red-400">$algorithm$salt$hash</span>:last_change:min:max:warn:::</p>
                <p className="mt-1"><strong>$6$</strong> = SHA-512 (good). <strong>$5$</strong> = SHA-256 (ok). <strong>$1$</strong> = MD5 (⚠️ weak, crackable!).</p>
                <p className="mt-1 text-amber-300/80"><strong>🔒 If you can read /etc/shadow, you can try to crack passwords offline.</strong> That's why it's only readable by root (permissions 640).</p>
              </div>
            </div>

            <div className="command-block">
              <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">/etc/group — Group memberships</span></div>
              <div className="command-body">
                <div><span className="command-prompt">$ </span><span className="text-white">cat /etc/group | grep -E "sudo|admin|wheel|docker"</span></div>
                <div className="command-output">
{`sudo:x:27:student
docker:x:998:student,deploy`}
                </div>
              </div>
              <div className="command-explanation">
                <p className="font-sans text-amber-300/80"><strong>🔒 Critical groups to audit:</strong></p>
                <ul className="mt-1 space-y-0.5">
                  <li>• <strong>sudo/wheel</strong> = members can run any command as root</li>
                  <li>• <strong>docker</strong> = can spawn containers = effectively root access!</li>
                  <li>• <strong>adm</strong> = can read log files</li>
                  <li>• Check who's in these groups: unexpected members = possible privilege escalation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">2</span>
            Practical: User & Group Commands
          </h2>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Essential user management commands</span></div>
            <div className="command-body text-xs space-y-3">
              <div>
                <p className="text-dark-500"># Check what groups you belong to</p>
                <div><span className="command-prompt">$ </span><span className="text-white">groups</span></div>
                <div className="command-output">student sudo</div>
              </div>
              <div>
                <p className="text-dark-500"># See all groups a specific user belongs to</p>
                <div><span className="command-prompt">$ </span><span className="text-white">id student</span></div>
                <div className="command-output">uid=1000(student) gid=1000(student) groups=1000(student),27(sudo)</div>
              </div>
              <div>
                <p className="text-dark-500"># List all users who can login (have bash/sh shell)</p>
                <div><span className="command-prompt">$ </span><span className="text-white">grep -E "/bin/(bash|sh)" /etc/passwd</span></div>
                <div className="command-output">root:x:0:0:root:/root:/bin/bash
student:x:1000:1000::/home/student:/bin/bash</div>
              </div>
              <div>
                <p className="text-dark-500"># Check last login for all users</p>
                <div><span className="command-prompt">$ </span><span className="text-white">lastlog | grep -v "Never"</span></div>
                <div className="command-output">Username    Port     From             Latest
root        pts/0    203.0.113.42     Sat Jan 15 09:58:45
student     pts/1    10.0.0.1         Sat Jan 15 10:05:00</div>
              </div>
              <div>
                <p className="text-dark-500"># Who is currently logged in?</p>
                <div><span className="command-prompt">$ </span><span className="text-white">w</span></div>
                <div className="command-output"> 10:15  up 1 day, 1:15, 2 users, load average: 0.12
USER     TTY      FROM             LOGIN@   IDLE   WHAT
student  pts/1    10.0.0.1         10:05    0.00s  w
h4cker   pts/2    203.0.113.42     10:01    14:00  -bash</div>
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans text-red-300"><strong>🚨 Alert!</strong> The <code>w</code> output shows h4cker is logged in RIGHT NOW from 203.0.113.42 and has been idle for 14 minutes. This is an active intrusion! Response: <code>sudo pkill -u h4cker</code> to force disconnect, then <code>sudo usermod -L h4cker</code> to lock the account.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-red-500/10 rounded-lg flex items-center justify-center text-xs text-red-400 border border-red-500/20">3</span>
            Privilege Escalation — How Attackers Become Root
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            After gaining initial access as a regular user, attackers try to "escalate" to root.
            Here are the most common methods (you need to know these to DETECT them):
          </p>

          <div className="grid gap-3">
            {[
              { method: 'sudo misconfig', how: 'User has unrestricted sudo (ALL:ALL ALL). Attacker runs: sudo /bin/bash → instant root.', detect: 'Audit /etc/sudoers. Limit sudo to specific commands only.' },
              { method: 'SUID binary abuse', how: 'Find programs with SUID bit that shouldn\'t have it. E.g., SUID on find/vim/python = instant root shell.', detect: 'find / -perm -4000 -type f regularly. Compare against baseline.' },
              { method: 'Docker group', how: 'Docker group members can mount host filesystem: docker run -v /:/mnt alpine → read /etc/shadow', detect: 'Only add trusted users to docker group. Monitor docker commands in logs.' },
              { method: 'Writable scripts run by root', how: 'Cron job runs /opt/backup.sh as root. If attacker can write to backup.sh, they inject commands.', detect: 'Check ownership/permissions of all scripts in crontab. Should be owned by root, not writable by others.' },
              { method: 'Kernel exploit', how: 'Unpatched kernel has vulnerability. Attacker runs exploit → instant root. (e.g., DirtyPipe 2022)', detect: 'Keep kernel updated! Monitor for unusual processes spawning as root.' },
            ].map((item) => (
              <div key={item.method} className="card-glass p-4">
                <p className="text-xs font-bold text-red-400 mb-1">{item.method}</p>
                <p className="text-[11px] text-dark-400 mb-1"><strong>How:</strong> {item.how}</p>
                <p className="text-[11px] text-emerald-400/80"><strong>Detect/Prevent:</strong> {item.detect}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• <code>/etc/passwd</code> = user list, <code>/etc/shadow</code> = password hashes, <code>/etc/group</code> = group memberships</li>
            <li>• Check for UID 0 accounts (should only be root), unknown users with bash shells</li>
            <li>• Critical groups: sudo, wheel, docker, adm — audit membership regularly</li>
            <li>• <code>w</code> and <code>lastlog</code> show active and recent logins — detect intruders</li>
            <li>• Privilege escalation methods: sudo misconfig, SUID abuse, docker group, cron scripts, kernel exploits</li>
            <li>• Always lock suspicious accounts BEFORE deleting (preserve forensic evidence)</li>
          </ul>
        </section>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (<span className="text-emerald-400 text-sm">✅ Completed! +20 XP</span>) : <div/>}
          <button onClick={() => setCompleted(true)} disabled={completed} className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <Link href="/lessons/file-permissions-ownership" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: File Permissions</Link>
          <Link href="/lessons/finding-files-text" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: Finding Files & Searching Text →</Link>
        </div>
      </div>
    </div>
  );
}
