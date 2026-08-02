export const lesson = {
  id: 'L20',
  title: 'Linux Process Management & Monitoring',
  slug: 'linux-process-management',
  type: 'PRACTICAL',
  duration: 40,
  xpReward: 30,
  difficulty: 'intermediate',
  module: { title: 'Linux Fundamentals', slug: 'linux-fundamentals' },
  course: { title: 'Operating System Security', slug: 'os-security' },
  keyTerms: [
    'Process', 'PID', 'Daemon', 'Signal', 'Zombie Process',
    'Background Process', 'Foreground Process', 'Nice Value',
    'Process Tree', 'System Monitor'
  ],
  content: [
    { type: 'heading', content: 'Linux Process Management & Monitoring' },
    { type: 'paragraph', content: 'Every program running on a Linux system is a process. Understanding how to view, control, and monitor processes is critical for security professionals — attackers often hide malicious activity inside processes, and defenders need to spot the anomalies.' },

    { type: 'callout', variant: 'info', content: 'Think of processes like employees in a building. Each has an ID badge (PID), a job title (process name), a manager (parent process), and uses company resources (CPU/memory). Security is knowing who belongs and who is an imposter.' },

    { type: 'heading', level: 2, content: 'What is a Process?' },
    { type: 'paragraph', content: 'A process is a running instance of a program. When you type a command like "ls" or open Firefox, the operating system creates a process. Each process gets a unique Process ID (PID) and exists independently in memory.' },
    { type: 'paragraph', content: 'Key properties of every process:' },
    { type: 'list', items: [
      'PID — Unique identifier assigned by the kernel (starts at 1 for init/systemd)',
      'PPID — Parent Process ID (the process that created this one)',
      'UID — User ID of the process owner (determines permissions)',
      'State — Running, Sleeping, Stopped, Zombie, or Dead',
      'Priority/Nice — How much CPU time it gets relative to others',
      'Memory — How much RAM the process is consuming'
    ]},

    { type: 'heading', level: 2, content: 'Viewing Processes with ps' },
    { type: 'paragraph', content: 'The `ps` command gives you a snapshot of currently running processes. Think of it like taking a photo of everyone in the building at one moment.' },

    { type: 'command', command: 'ps aux', output: `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 169388 13296 ?        Ss   Jun01   0:12 /sbin/init
root         2  0.0  0.0      0     0 ?        S    Jun01   0:00 [kthreadd]
root       387  0.0  0.1  45892  8456 ?        Ss   Jun01   0:03 /lib/systemd/systemd-journald
root       412  0.0  0.0  22572  5648 ?        Ss   Jun01   0:01 /lib/systemd/systemd-udevd
systemd+   623  0.0  0.1  19876  9832 ?        Ss   Jun01   0:05 /lib/systemd/systemd-resolved
root       847  0.0  0.1 288292  9120 ?        Ssl  Jun01   0:02 /usr/lib/accountsservice/accounts-daemon
syslog     851  0.0  0.0 224344  5376 ?        Ssl  Jun01   0:04 /usr/sbin/rsyslogd -n
root       853  0.0  0.2 1804564 16764 ?       Ssl  Jun01   0:15 /usr/bin/dockerd -H fd://
www-data  1247  0.2  1.5 452896 123456 ?       S    Jun01   2:34 /usr/sbin/apache2 -k start
analyst   2891  0.0  0.1  21468  8236 pts/0    Ss   10:15   0:00 -bash
analyst   3042  0.0  0.0  37368  3456 pts/0    R+   10:22   0:00 ps aux`, explanation: 'a = all users, u = user-oriented format, x = include processes without a terminal. This shows EVERY process on the system.' },

    { type: 'paragraph', content: 'Understanding the columns:' },
    { type: 'list', items: [
      'USER — Who owns the process (root processes have full system access)',
      '%CPU — Percentage of CPU being used (high = suspicious if unexpected)',
      '%MEM — Percentage of RAM being used',
      'VSZ — Virtual memory size (total memory allocated)',
      'RSS — Resident Set Size (actual physical memory used)',
      'STAT — Process state: S=sleeping, R=running, Z=zombie, T=stopped',
      'COMMAND — The actual command that started the process'
    ]},

    { type: 'callout', variant: 'security', content: 'Security tip: Regularly check for processes running as root that you don\'t recognize. Attackers often spawn root-level processes to maintain access. A process named "/tmp/.hidden" or with a random string name is a major red flag.' },

    { type: 'heading', level: 2, content: 'Real-Time Monitoring with top and htop' },
    { type: 'paragraph', content: 'While `ps` takes a snapshot, `top` gives you a live, continuously updating view — like a security camera feed instead of a photo.' },

    { type: 'command', command: 'top -bn1 | head -20', output: `top - 10:25:31 up 31 days,  4:12,  2 users,  load average: 0.52, 0.41, 0.38
Tasks: 247 total,   1 running, 245 sleeping,   0 stopped,   1 zombie
%Cpu(s):  3.2 us,  1.1 sy,  0.0 ni, 95.2 id,  0.3 wa,  0.0 hi,  0.2 si,  0.0 st
MiB Mem :   7963.4 total,   2156.8 free,   3421.2 used,   2385.4 buff/cache
MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   4102.1 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
  853 root      20   0 1804564  16764   9120 S   2.3   0.2   0:15.42 dockerd
 1247 www-data  20   0  452896 123456  12340 S   1.7   1.5   2:34.18 apache2
 4521 analyst   20   0  984532  89012  23456 S   0.7   1.1   0:42.33 firefox
 3891 mysql     20   0 1456780  345678  12345 S   0.3   4.3   1:23.45 mysqld
    1 root      20   0  169388  13296   8456 S   0.0   0.2   0:12.01 systemd
  387 root      20   0   45892   8456   7320 S   0.0   0.1   0:03.22 systemd-journal
  412 root      20   0   22572   5648   4892 S   0.0   0.1   0:01.54 systemd-udevd`, explanation: 'The -b flag runs top in batch mode (non-interactive), -n1 means one iteration. Load average shows system load over 1, 5, and 15 minutes.' },

    { type: 'paragraph', content: 'Critical things to monitor in top:' },
    { type: 'list', items: [
      'Load average — Values above the number of CPU cores mean the system is overloaded (possible DoS attack)',
      'Zombie processes — Should be 0. Multiple zombies suggest a program crashing repeatedly or malware',
      'CPU usage — A process suddenly using 100% CPU could be cryptomining malware',
      'Memory usage — Rapid memory growth might indicate a memory leak or buffer overflow exploit'
    ]},

    { type: 'heading', level: 2, content: 'Process Tree: Understanding Parent-Child Relationships' },
    { type: 'paragraph', content: 'Every process (except PID 1) has a parent. This creates a tree structure. Viewing this tree helps you trace where suspicious processes came from.' },

    { type: 'command', command: 'pstree -p analyst', output: `bash(2891)───pstree(3102)

bash(2891)───vim(3050)
           ├─ssh(3067)───bash(3068)
           └─python3(3089)───python3(3090)
                           ├─python3(3091)
                           └─python3(3092)`, explanation: 'Shows the process tree for user "analyst". The -p flag includes PIDs. This reveals which process spawned which.' },

    { type: 'callout', variant: 'security', content: 'Security insight: If you see a web server (apache2/nginx) spawning a bash shell, that\'s likely a web shell — an attacker exploited a vulnerability to get command execution. Normal web servers should never spawn shells.' },

    { type: 'heading', level: 2, content: 'Controlling Processes: Signals' },
    { type: 'paragraph', content: 'Signals are how you communicate with running processes. Think of them as instructions you send: "stop working," "pause," or "terminate immediately."' },
    { type: 'paragraph', content: 'Common signals:' },
    { type: 'list', items: [
      'SIGTERM (15) — Politely ask a process to stop (it can clean up first)',
      'SIGKILL (9) — Force-kill immediately (process cannot catch or ignore this)',
      'SIGSTOP (19) — Pause/freeze a process (useful for forensics)',
      'SIGCONT (18) — Resume a paused process',
      'SIGHUP (1) — Reload configuration (used by daemons like nginx, sshd)'
    ]},

    { type: 'command', command: 'kill -15 3089', output: '', explanation: 'Sends SIGTERM to PID 3089 — gracefully terminates the process. Use this first before SIGKILL.' },

    { type: 'command', command: 'kill -9 3089', output: '', explanation: 'Sends SIGKILL to PID 3089 — force kills immediately. Use when SIGTERM doesn\'t work (common with malware that traps signals).' },

    { type: 'command', command: 'killall python3', output: '', explanation: 'Kills ALL processes named "python3". Be careful — this is aggressive. Useful when malware spawns many instances.' },

    { type: 'heading', level: 2, content: 'Background and Foreground Processes' },
    { type: 'paragraph', content: 'You can run processes in the background (they don\'t block your terminal) or foreground (they take over your terminal until done).' },

    { type: 'command', command: 'nmap -sS 192.168.1.0/24 &', output: `[1] 4521
Starting Nmap scan...`, explanation: 'The & puts the process in the background. You get your terminal back immediately. [1] is the job number, 4521 is the PID.' },

    { type: 'command', command: 'jobs', output: `[1]+  Running    nmap -sS 192.168.1.0/24 &`, explanation: 'Lists all background jobs in the current terminal session.' },

    { type: 'command', command: 'fg %1', output: `nmap -sS 192.168.1.0/24
... (scan output continues in foreground)`, explanation: 'Brings job [1] back to the foreground. Press Ctrl+Z to pause it, then "bg" to resume in background.' },

    { type: 'heading', level: 2, content: 'Finding Suspicious Processes' },
    { type: 'paragraph', content: 'As a security analyst, you need to quickly identify processes that shouldn\'t be running. Here are key techniques:' },

    { type: 'command', command: 'ps aux | grep -E "(nc|ncat|netcat|socat)" | grep -v grep', output: `nobody    5678  0.0  0.0  11264  2340 ?  S  09:14  0:00 nc -lvp 4444`, explanation: 'Searches for netcat processes — commonly used by attackers for reverse shells. A listening netcat on an unusual port is a red flag.' },

    { type: 'command', command: 'ls -la /proc/5678/exe', output: `lrwxrwxrwx 1 nobody nobody 0 Jun 15 09:14 /proc/5678/exe -> /usr/bin/nc.openbsd`, explanation: 'The /proc filesystem reveals the actual executable for any PID. Attackers sometimes rename processes, but /proc/PID/exe shows the truth.' },

    { type: 'command', command: 'ls -la /proc/5678/fd/', output: `total 0
lrwx------ 1 nobody nobody 64 Jun 15 09:14 0 -> /dev/null
lrwx------ 1 nobody nobody 64 Jun 15 09:14 1 -> socket:[45678]
lrwx------ 1 nobody nobody 64 Jun 15 09:14 2 -> /dev/null
lrwx------ 1 nobody nobody 64 Jun 15 09:14 3 -> socket:[45679]`, explanation: 'Shows all file descriptors (open files, sockets, pipes) for PID 5678. Network sockets indicate the process is communicating over the network.' },

    { type: 'heading', level: 2, content: 'System Resource Monitoring' },
    { type: 'paragraph', content: 'Monitoring system resources helps you detect attacks in progress — DDoS causes CPU spikes, cryptominers consume GPU/CPU, and data exfiltration shows in network I/O.' },

    { type: 'command', command: 'vmstat 1 5', output: `procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 1  0      0 2156800 245680 2139720    0    0    12    45  234  456  3  1 95  1  0
 2  0      0 2154320 245680 2139724    0    0     0    32  289  512  5  2 92  1  0
 1  0      0 2155100 245684 2139728    0    0     4    28  256  478  4  1 94  1  0
 1  0      0 2155800 245684 2139732    0    0     0    16  223  434  3  1 96  0  0
 1  0      0 2156200 245688 2139736    0    0     8    24  245  456  3  1 95  1  0`, explanation: 'Shows system performance every 1 second for 5 iterations. "r" column shows runnable processes. High "r" values with high CPU might indicate a fork bomb or mining attack.' },

    { type: 'command', command: 'lsof -i :4444', output: `COMMAND  PID   USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
nc      5678 nobody    3u  IPv4  45679      0t0  TCP *:4444 (LISTEN)`, explanation: 'Lists all processes using port 4444. Essential for finding what\'s listening on suspicious ports.' },

    { type: 'heading', level: 2, content: 'Daemons and Services' },
    { type: 'paragraph', content: 'Daemons are background processes that start at boot and run continuously (like sshd, httpd, mysqld). They\'re named with a "d" suffix by convention. Understanding which daemons should be running is key to spotting unauthorized services.' },

    { type: 'command', command: 'systemctl list-units --type=service --state=running', output: `UNIT                        LOAD   ACTIVE SUB     DESCRIPTION
accounts-daemon.service     loaded active running Accounts Service
apache2.service             loaded active running The Apache HTTP Server
cron.service                loaded active running Regular background program processing
dbus.service                loaded active running D-Bus System Message Bus
docker.service              loaded active running Docker Application Container Engine
mysql.service               loaded active running MySQL Community Server
networking.service          loaded active running Raise network interfaces
rsyslog.service             loaded active running System Logging Service
ssh.service                 loaded active running OpenBSD Secure Shell server
systemd-journald.service    loaded active running Journal Service
systemd-resolved.service    loaded active running Network Name Resolution
systemd-udevd.service       loaded active running Rule-based Manager for Device Events`, explanation: 'Lists all currently running services. Know your baseline — any unexpected service could be an attacker\'s persistence mechanism.' },

    { type: 'callout', variant: 'warning', content: 'Red flags in running services: Services you didn\'t install, services with generic names like "system-update" or "helper-daemon", services running from /tmp or user home directories. These often indicate persistence mechanisms left by attackers.' },

    { type: 'heading', level: 2, content: 'Practical Exercise: Incident Response Scenario' },
    { type: 'paragraph', content: 'Scenario: You\'re alerted that a server is running slowly. CPU usage is at 95%. Follow these steps to investigate:' },
    { type: 'list', items: [
      'Step 1: Run "top" to identify the process consuming the most CPU',
      'Step 2: Note the PID and user — is it a legitimate user?',
      'Step 3: Check /proc/PID/exe to verify the actual binary',
      'Step 4: Check /proc/PID/cmdline for the full command line',
      'Step 5: Use "pstree -p PID" to see what spawned it',
      'Step 6: Check network connections with "lsof -i -p PID"',
      'Step 7: If malicious: "kill -SIGSTOP PID" to freeze for forensics, then "kill -9 PID" when done'
    ]},

    { type: 'command', command: 'cat /proc/5678/cmdline | tr "\\0" " "', output: `nc -lvp 4444 -e /bin/bash`, explanation: 'Reads the full command line of PID 5678. The null bytes are replaced with spaces for readability. This reveals nc is providing a remote shell — clear compromise.' },

    { type: 'callout', variant: 'security', content: 'Golden rule of process investigation: Never trust the process name alone. Always verify with /proc/PID/exe (actual binary) and /proc/PID/cmdline (full arguments). Sophisticated attackers rename their malware to look like system processes.' },

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'paragraph', content: 'Process management is not just system administration — it\'s a core security skill. Every compromise involves processes: backdoors run as processes, cryptominers consume CPU as processes, and data exfiltration happens through network-connected processes.' },
    { type: 'list', items: [
      'Know your system\'s normal baseline of processes',
      'Investigate any process you can\'t explain',
      'Check process origins using /proc filesystem',
      'Monitor for CPU/memory anomalies continuously',
      'Understand signals for incident response (SIGSTOP to freeze, SIGKILL to terminate)',
      'Regularly audit running services with systemctl'
    ]},
  ],
  navigation: {
    prev: { title: 'Linux File Permissions & Ownership', slug: 'linux-file-permissions' },
    next: { title: 'Network Troubleshooting & Diagnostics', slug: 'network-troubleshooting' },
  },
};
