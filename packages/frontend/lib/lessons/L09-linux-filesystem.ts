export const lesson = {
  id: 'L09',
  title: 'Navigating the File System',
  slug: 'linux-filesystem',
  type: 'PRACTICAL',
  duration: 35,
  xpReward: 20,
  difficulty: 'beginner',
  module: { title: 'Linux Fundamentals', slug: 'linux-fundamentals' },
  course: { title: 'CyberSec Academy', slug: 'cybersec-academy' },
  keyTerms: ['File System', 'Directory', 'Path', 'pwd', 'cd', 'ls', 'find', 'Absolute Path', 'Relative Path'],
  content: [
    { type: 'heading', content: 'Navigating the Linux File System' },
    { type: 'paragraph', content: 'The Linux file system is a tree structure starting from / (root directory). Everything in Linux is a file — documents, programs, devices, even network connections. Navigating this tree efficiently is the first skill every security professional needs.' },
    { type: 'callout', variant: 'info', content: 'Unlike Windows (C:\\Users\\Documents), Linux uses forward slashes and starts from a single root: /home/analyst/Documents. There are no drive letters — everything lives under /.' },
    { type: 'heading', level: 2, content: 'Essential Directories' },
    { type: 'list', items: [
      '/ — Root of the entire file system (not the same as /root)',
      '/home — User home directories (/home/analyst, /home/john)',
      '/root — Home directory of the root superuser',
      '/etc — System configuration files (passwords, network config, services)',
      '/var/log — System logs (auth.log, syslog — critical for security investigations)',
      '/tmp — Temporary files (often used by attackers to store tools)',
      '/bin, /usr/bin — Essential commands (ls, cat, grep)',
      '/sbin, /usr/sbin — System administration commands (iptables, fdisk)',
      '/opt — Optional/third-party software',
      '/proc — Virtual filesystem showing running processes (forensics goldmine)'
    ]},
    { type: 'heading', level: 2, content: 'pwd — Where Am I?' },
    { type: 'command', command: 'pwd', output: '/home/analyst', explanation: 'pwd (Print Working Directory) shows your current location in the file system. You are in /home/analyst — your home directory.' },
    { type: 'heading', level: 2, content: 'ls — What is Here?' },
    { type: 'command', command: 'ls', output: 'Desktop  Documents  Downloads  lab-files  scripts  .bashrc  .ssh', explanation: 'ls lists files and directories in your current location. Note: files starting with a dot (.) are hidden by default.' },
    { type: 'command', command: 'ls -la', output: `total 32
drwxr-xr-x 8 analyst analyst 4096 Jun 15 10:00 .
drwxr-xr-x 3 root    root    4096 Jun 01 09:00 ..
-rw-r--r-- 1 analyst analyst  220 Jun 01 09:00 .bashrc
drwx------ 2 analyst analyst 4096 Jun 15 09:30 .ssh
drwxr-xr-x 2 analyst analyst 4096 Jun 10 14:00 Desktop
drwxr-xr-x 3 analyst analyst 4096 Jun 12 11:00 Documents
drwxr-xr-x 2 analyst analyst 4096 Jun 14 16:30 Downloads
drwxr-xr-x 4 analyst analyst 4096 Jun 15 10:00 lab-files
drwxr-xr-x 2 analyst analyst 4096 Jun 13 08:00 scripts`, explanation: '-l shows long format (permissions, owner, size, date). -a shows hidden files (starting with dot). This is the command you will use MOST in security — it reveals permissions, ownership, and timestamps.' },
    { type: 'heading', level: 2, content: 'cd — Moving Around' },
    { type: 'command', command: 'cd /var/log', output: '', explanation: 'Changes directory to /var/log (absolute path — starts from /). This is where system logs live.' },
    { type: 'command', command: 'cd ..', output: '', explanation: 'Go up one level (to parent directory). From /var/log, this takes you to /var.' },
    { type: 'command', command: 'cd ~', output: '', explanation: 'Go to your home directory (~ is a shortcut for /home/yourusername). Works from anywhere.' },
    { type: 'command', command: 'cd -', output: '/var/log', explanation: 'Go back to the previous directory. Useful for jumping between two locations.' },
    { type: 'heading', level: 2, content: 'find — Search for Files' },
    { type: 'paragraph', content: 'find is incredibly powerful for security work — locating suspicious files, finding misconfigurations, and investigating compromises:' },
    { type: 'command', command: 'find / -name "*.log" -type f 2>/dev/null | head -5', output: `/var/log/syslog
/var/log/auth.log
/var/log/kern.log
/var/log/dpkg.log
/var/log/apache2/access.log`, explanation: 'Finds all .log files on the entire system. -type f means files only. 2>/dev/null hides permission errors. Essential for finding logs during investigations.' },
    { type: 'command', command: 'find /home -name ".*" -type f', output: `/home/analyst/.bashrc
/home/analyst/.ssh/id_rsa
/home/analyst/.ssh/known_hosts
/home/suspicious_user/.hidden_backdoor`, explanation: 'Finds all hidden files (starting with .) in /home. Hidden files are where attackers often stash backdoors, SSH keys, or stolen data.' },
    { type: 'command', command: 'find /tmp -mtime -1 -type f', output: `/tmp/exploit.sh
/tmp/.X11-unix/session
/tmp/reverse_shell.py`, explanation: 'Finds files in /tmp modified in the last 1 day. /tmp is writable by everyone — attackers frequently drop tools here. Recent files in /tmp during an investigation are suspicious.' },
    { type: 'callout', variant: 'security', content: 'Security tip: During incident response, immediately check /tmp, /dev/shm, and user home directories for hidden files. Attackers love these locations because they are writable and often overlooked.' },
    { type: 'heading', level: 2, content: 'Summary' },
    { type: 'list', items: [
      'pwd shows where you are, ls shows what is there, cd moves you around',
      'ls -la is your best friend — shows permissions, ownership, hidden files, timestamps',
      'Absolute paths start with / (full path). Relative paths start from current directory.',
      'find searches the entire filesystem — essential for incident investigation',
      'Key directories: /etc (config), /var/log (logs), /tmp (suspicious activity), /proc (processes)',
      'Next lesson: Reading and processing file contents with cat, grep, and awk'
    ]},
  ],
  navigation: {
    prev: { title: 'Introduction to Linux', slug: 'intro-linux' },
    next: { title: 'File Operations & Text Processing', slug: 'linux-file-operations' },
  },
};
