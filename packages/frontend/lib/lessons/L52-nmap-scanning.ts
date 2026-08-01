export const lesson = {
  id: 'L52',
  title: 'Network Scanning with Nmap',
  slug: 'nmap-scanning',
  type: 'PRACTICAL',
  duration: 55,
  xpReward: 40,
  difficulty: 'advanced',
  module: { title: 'Ethical Hacking', slug: 'ethical-hacking' },
  course: { title: 'Penetration Testing', slug: 'penetration-testing' },
  keyTerms: [
    'Nmap', 'Port Scan', 'SYN Scan', 'Service Detection',
    'OS Fingerprinting', 'NSE Scripts', 'TCP Connect',
    'UDP Scan', 'Stealth Scan', 'Firewall Evasion'
  ],
  content: [
    { type: 'heading', content: 'Network Scanning with Nmap' },
    { type: 'paragraph', content: 'Nmap (Network Mapper) is the most important tool in any penetration tester\'s arsenal. It discovers hosts, open ports, running services, and operating systems on a network. Understanding Nmap deeply separates script kiddies from professional pentesters.' },


    { type: 'callout', variant: 'info', content: 'Analogy: Nmap is like walking down a street and checking which doors are open, what\'s behind each door, and what brand of lock they use. A SYN scan is peeking at the door (knocking but not entering). A full TCP connect is opening the door and having a conversation. Each tells you different things about what\'s inside.' },

    { type: 'heading', level: 2, content: 'Scan Types' },

    { type: 'heading', level: 3, content: 'SYN Scan (Stealth Scan) — Default' },
    { type: 'command', command: 'sudo nmap -sS 192.168.1.100', output: `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for 192.168.1.100
Host is up (0.0012s latency).
Not shown: 993 closed tcp ports (reset)
PORT     STATE    SERVICE
22/tcp   open     ssh
80/tcp   open     http
443/tcp  open     https
3306/tcp filtered mysql
5432/tcp open     postgresql
8080/tcp open     http-proxy
8443/tcp open     https-alt

Nmap done: 1 IP address (1 host up) scanned in 1.42 seconds`, explanation: 'SYN scan sends SYN packets and analyzes responses without completing the handshake. "open" = port accepted the SYN. "filtered" = no response (firewall dropped it). "closed" = RST received. Requires root/sudo for raw packets.' },

    { type: 'heading', level: 3, content: 'Service/Version Detection' },
    { type: 'command', command: 'nmap -sV -p 22,80,443,5432,8080 192.168.1.100', output: `PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 8.9p1 Ubuntu 3ubuntu0.6
80/tcp   open  http        nginx 1.24.0
443/tcp  open  ssl/http    nginx 1.24.0
5432/tcp open  postgresql  PostgreSQL 15.4
8080/tcp open  http        Node.js Express framework

Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel`, explanation: '-sV probes open ports to determine exact software and versions. Now we know: OpenSSH 8.9 (check CVEs), nginx 1.24 (check CVEs), PostgreSQL 15.4, and a Node.js Express app. Each version can be searched for known vulnerabilities.' },

    { type: 'heading', level: 3, content: 'OS Detection' },
    { type: 'command', command: 'sudo nmap -O 192.168.1.100', output: `OS details: Linux 5.15 - 6.1
Network Distance: 1 hop
TCP Sequence Prediction: Difficulty=261 (Good luck!)
IP ID Sequence Generation: All zeros`, explanation: '-O uses TCP/IP stack fingerprinting to guess the OS. The TCP stack implementation details (window size, TTL, options) differ between OS versions. Knowing the OS helps target exploits.' },

    { type: 'heading', level: 3, content: 'Aggressive Scan (All-in-One)' },
    { type: 'command', command: 'nmap -A -T4 192.168.1.100', output: `PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 8.9p1 Ubuntu 3ubuntu0.6
|_ssh-hostkey: 3072 SHA256:aBcDeFgHiJk... (RSA)
80/tcp   open  http        nginx 1.24.0
|_http-title: Welcome to Our App
|_http-server-header: nginx/1.24.0
| http-robots.txt: 3 disallowed entries
| /admin/ /api/internal/ /backup/
443/tcp  open  ssl/http    nginx 1.24.0
| ssl-cert: Subject: CN=app.target.com
| Not valid before: 2024-01-15
|_Not valid after:  2025-01-15

OS: Linux 5.15-6.1
Traceroute: 1 hop (1.2ms)`, explanation: '-A enables: OS detection + version detection + script scanning + traceroute. -T4 is aggressive timing (faster). Found robots.txt entries revealing /admin/, /api/internal/, and /backup/ directories — valuable reconnaissance!' },

    { type: 'heading', level: 2, content: 'NSE: Nmap Scripting Engine' },
    { type: 'paragraph', content: 'NSE scripts extend Nmap with vulnerability detection, brute force, and information gathering:' },

    { type: 'command', command: 'nmap --script vuln -p 80,443 192.168.1.100', output: `PORT   STATE SERVICE
80/tcp open  http
| http-slowloris-check:
|   VULNERABLE:
|   Slowloris DoS attack
|     State: LIKELY VULNERABLE
|     Description: Server appears to be vulnerable to the Slowloris DoS attack
443/tcp open  https
| ssl-heartbleed:
|   VULNERABLE:
|   The Heartbleed Bug (CVE-2014-0160)
|     State: VULNERABLE
|     Risk factor: High`, explanation: 'The "vuln" script category checks for known vulnerabilities. Found Slowloris DoS vulnerability and Heartbleed! In a real pentest, these would be reported as critical findings.' },

    { type: 'command', command: 'nmap --script http-enum -p 80 192.168.1.100', output: `PORT   STATE SERVICE
80/tcp open  http
| http-enum:
|   /admin/: Possible admin folder
|   /backup/: Backup folder
|   /phpmyadmin/: phpMyAdmin
|   /.git/HEAD: Git repository found
|   /wp-login.php: WordPress login
|   /server-status: Apache server-status (mod_status)
|_  /info.php: PHP info page`, explanation: 'http-enum discovers common web paths. Found: admin panel, backup directory, phpMyAdmin (DB admin tool), exposed .git repository (source code leak!), WordPress login (CMS attack surface), and PHP info page (server details).' },

    { type: 'heading', level: 2, content: 'Scanning Entire Networks' },
    { type: 'command', command: 'nmap -sn 192.168.1.0/24', output: `Starting Nmap 7.94
Nmap scan report for 192.168.1.1
Host is up (0.0010s latency).
Nmap scan report for 192.168.1.50
Host is up (0.0025s latency).
Nmap scan report for 192.168.1.100
Host is up (0.0015s latency).
Nmap scan report for 192.168.1.105
Host is up (0.0030s latency).
Nmap scan report for 192.168.1.200
Host is up (0.0020s latency).
Nmap done: 256 IP addresses (5 hosts up) scanned in 2.04 seconds`, explanation: '-sn = ping sweep (no port scan). Quickly discovers all live hosts on the /24 subnet. Found 5 active devices. Next step: port scan each one to discover services.' },

    { type: 'heading', level: 2, content: 'Evading Detection' },
    { type: 'list', items: [
      '-T0/-T1 — Very slow scan timing (avoids rate-based IDS alerts)',
      '-f — Fragment packets (bypass simple packet inspection)',
      '-D decoy1,decoy2,ME — Mix your scan with decoy source IPs',
      '--source-port 53 — Use port 53 (DNS) as source port (firewalls often allow DNS)',
      '-sN/-sF/-sX — NULL/FIN/Xmas scans bypass some stateless firewalls',
      '--data-length 25 — Add random data to make packets look different'
    ]},

    { type: 'callout', variant: 'security', content: 'Defensive perspective: To detect Nmap scans, monitor for: Multiple SYN packets to different ports from one IP, unusual TCP flag combinations (NULL, FIN, Xmas), and sequential port access patterns. IDS rules for Nmap detection are built into Snort and Suricata.' },

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'list', items: [
      'Nmap is essential for both attackers (reconnaissance) and defenders (asset inventory)',
      'SYN scan (-sS) is the default and stealthiest port scanning method',
      'Version detection (-sV) reveals exact software for CVE research',
      'NSE scripts can detect vulnerabilities without a full exploit',
      'Always get written authorization before scanning — unauthorized scanning is illegal',
      'Defenders: Regularly scan your own networks to find what attackers would find',
      'Minimize attack surface: Close unnecessary ports, update software, use firewalls',
      'IDS can detect aggressive scans — pentesters use evasion techniques'
    ]},
  ],
  navigation: {
    prev: { title: 'Reconnaissance & Information Gathering', slug: 'recon-information-gathering' },
    next: { title: 'Vulnerability Assessment & Scanning', slug: 'vulnerability-assessment' },
  },
};
