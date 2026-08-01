export const lesson = {
  id: 'L08',
  title: 'Introduction to Linux',
  slug: 'intro-linux',
  type: 'THEORY',
  duration: 25,
  xpReward: 15,
  difficulty: 'beginner',
  module: { title: 'Linux Fundamentals', slug: 'linux-fundamentals' },
  course: { title: 'CyberSec Academy', slug: 'cybersec-academy' },
  keyTerms: ['Linux', 'Kernel', 'Distribution', 'Open Source', 'Shell', 'Terminal', 'Root'],
  content: [
    { type: 'heading', content: 'Introduction to Linux' },
    { type: 'paragraph', content: 'Linux is the operating system that powers the majority of the internet. Over 96% of the top 1 million web servers, nearly all cloud infrastructure, every Android phone, and most cybersecurity tools run on Linux. If you want to work in cybersecurity, Linux is not optional — it is essential.' },
    { type: 'callout', variant: 'info', content: 'Analogy: If Windows is like driving an automatic car (easy, but you have limited control), Linux is like driving a manual (more control, more power, steeper learning curve). In cybersecurity, you need that granular control to investigate attacks, configure security tools, and understand what is happening under the hood.' },
    { type: 'heading', level: 2, content: 'Why Linux Dominates Cybersecurity' },
    { type: 'list', items: [
      'Open source — You can read every line of code. No hidden backdoors. Full transparency.',
      'Customizable — Strip it down to only what you need. Less code = fewer vulnerabilities.',
      'Powerful command line — Automate everything. Process millions of log lines in seconds.',
      'Security tools — Nmap, Wireshark, Metasploit, Burp Suite all run natively on Linux.',
      'Server dominance — 96%+ of web servers run Linux. You WILL encounter it in every engagement.',
      'Free — No licensing costs. Spin up as many VMs as you need for labs.'
    ]},
    { type: 'heading', level: 2, content: 'What is a Linux Distribution?' },
    { type: 'paragraph', content: 'Linux itself is just the kernel (the core that talks to hardware). A "distribution" (distro) packages the kernel with tools, a package manager, and a desktop environment:' },
    { type: 'list', items: [
      'Ubuntu/Debian — Beginner-friendly, most popular for servers and desktops',
      'Kali Linux — Pre-loaded with 600+ security tools. The pentester\\'s distro.',
      'CentOS/Rocky Linux — Enterprise servers, used in corporate environments',
      'Arch Linux — Minimalist, build everything from scratch (advanced users)',
      'Parrot OS — Security-focused alternative to Kali with better daily-driver support'
    ]},
    { type: 'heading', level: 2, content: 'The Linux Architecture' },
    { type: 'paragraph', content: 'Linux has a layered architecture:' },
    { type: 'list', items: [
      'Hardware — CPU, RAM, disk, network interfaces',
      'Kernel — Manages hardware, memory, processes, and system calls',
      'Shell — Command interpreter (bash, zsh) — your interface to the kernel',
      'Utilities — Commands like ls, grep, chmod that you use daily',
      'Applications — Firefox, Nmap, Apache — programs that run on top'
    ]},
    { type: 'heading', level: 2, content: 'The Terminal: Your Primary Tool' },
    { type: 'paragraph', content: 'In cybersecurity, you will spend most of your time in the terminal (command line). GUIs are convenient but limited. The terminal gives you:' },
    { type: 'list', items: [
      'Speed — Type a command, get instant results. No clicking through menus.',
      'Automation — Chain commands together, write scripts for repetitive tasks.',
      'Remote access — SSH into servers worldwide with just a terminal.',
      'Precision — Exact control over every setting and configuration.',
      'Scripting — Bash scripts automate entire security workflows.'
    ]},
    { type: 'command', command: 'echo "Hello from the Linux terminal!"', output: 'Hello from the Linux terminal!', explanation: 'The echo command prints text to the screen. This is your first Linux command — simple, but it confirms your terminal is working.' },
    { type: 'command', command: 'uname -a', output: 'Linux kali 6.1.0-kali9-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux', explanation: 'uname -a shows system information: kernel name (Linux), hostname (kali), kernel version (6.1.0), architecture (x86_64). This tells you exactly what system you are on.' },
    { type: 'command', command: 'whoami', output: 'analyst', explanation: 'whoami shows your current username. In security, knowing WHO you are logged in as is critical — are you root (full access) or a regular user (limited access)?' },
    { type: 'heading', level: 2, content: 'Root vs Regular User' },
    { type: 'paragraph', content: 'Linux has a special superuser account called "root" (UID 0) that has unrestricted access to everything. Regular users have limited permissions. This is a security feature:' },
    { type: 'list', items: [
      'root — Can do anything: delete system files, install software, change any setting',
      'Regular user — Can only modify their own files and run approved programs',
      'sudo — Temporarily elevates a regular user to root privileges for one command',
      'Security principle: Never run as root unless absolutely necessary (least privilege)'
    ]},
    { type: 'callout', variant: 'security', content: 'Running as root all the time is dangerous. If malware runs as root, it has total system control. If it runs as a regular user, damage is limited to that user\\'s files. This is why Linux servers are more secure — proper user separation limits blast radius.' },
    { type: 'heading', level: 2, content: 'Summary' },
    { type: 'list', items: [
      'Linux powers 96%+ of servers — you WILL encounter it in cybersecurity',
      'Distributions package the Linux kernel with tools (Kali for security, Ubuntu for general use)',
      'The terminal/command line is your primary interface — learn to love it',
      'root has full access, regular users are restricted — this is intentional security',
      'Next lesson: Navigating the file system with cd, ls, pwd, and find'
    ]},
  ],
  navigation: {
    prev: { title: 'Setting Up Your Security Lab', slug: 'setting-up-security-lab' },
    next: { title: 'Navigating the File System', slug: 'linux-filesystem' },
  },
};
