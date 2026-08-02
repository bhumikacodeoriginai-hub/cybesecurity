import { LabData } from './index';

export const lab03: LabData = {
  id: 'lab-03',
  title: 'Network Scanning & Discovery',
  slug: 'network-scanning-discovery',
  module: 'Computer Networking',
  moduleNumber: 3,
  difficulty: 'BEGINNER',
  duration: 45,
  description: 'Learn to discover hosts and services on a network using Nmap. Map the attack surface of a test network exactly like a real penetration tester would on their first day of an engagement.',
  scenario: 'You have been hired as a penetration tester for a company. They have authorized you to test their internal network 10.10.10.0/24. Your job is to discover all live hosts, find open ports, identify running services, and document potential vulnerabilities. You are starting from a Kali Linux machine at 10.10.10.5.',
  objectives: [
    'Discover all live hosts on the 10.10.10.0/24 network',
    'Perform a full port scan on the discovered targets',
    'Identify service versions running on open ports',
    'Detect the operating system of each target',
    'Find at least 2 potential vulnerabilities from the scan results',
  ],
  prerequisites: ['Complete Module 3: Computer Networking'],
  tools: ['nmap', 'ping', 'netcat'],
  steps: [
    {
      id: 1,
      title: 'Verify Your Position on the Network',
      instruction: 'First, confirm your own IP address and network interface.',
      command: 'ip addr show eth0 | grep inet',
      expectedOutput: '    inet 10.10.10.5/24 brd 10.10.10.255 scope global eth0',
      explanation: 'You are 10.10.10.5 on a /24 network (256 addresses: 10.10.10.0 - 10.10.10.255). The broadcast address is 10.10.10.255. Your target range is 10.10.10.1 - 10.10.10.254 (excluding yourself).',
    },
    {
      id: 2,
      title: 'Host Discovery - Ping Sweep',
      instruction: 'Discover which hosts are alive on the network using a ping sweep (ICMP echo requests).',
      command: 'nmap -sn 10.10.10.0/24',
      expectedOutput: `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for 10.10.10.1
Host is up (0.001s latency).
Nmap scan report for 10.10.10.5
Host is up (0.0001s latency).
Nmap scan report for 10.10.10.20
Host is up (0.003s latency).
Nmap scan report for 10.10.10.50
Host is up (0.002s latency).
Nmap scan report for 10.10.10.100
Host is up (0.004s latency).
Nmap done: 256 IP addresses (5 hosts up) scanned in 2.41 seconds`,
      explanation: '5 live hosts found: .1 (likely the router/gateway), .5 (that is us), .20, .50, and .100 (our targets). The -sn flag means "ping scan only, no port scan." This is always the first step — find what is alive before scanning ports.',
      tip: 'Some hosts block ICMP (ping). If you suspect hidden hosts, try: nmap -sn -PA (TCP ACK ping) or nmap -sn -PS (TCP SYN ping) which work even when ICMP is blocked.',
    },
    {
      id: 3,
      title: 'Full Port Scan on Target',
      instruction: 'Now scan all 65,535 TCP ports on the most interesting target (10.10.10.100) to find all open services.',
      command: 'nmap -sS -p- -T4 10.10.10.100',
      expectedOutput: `Starting Nmap 7.94
Nmap scan report for 10.10.10.100
Host is up (0.003s latency).
Not shown: 65527 closed tcp ports
PORT      STATE SERVICE
22/tcp    open  ssh
80/tcp    open  http
443/tcp   open  https
3306/tcp  open  mysql
5432/tcp  open  postgresql
8080/tcp  open  http-proxy
8443/tcp  open  https-alt
9090/tcp  open  zeus-admin

Nmap done: 1 IP address scanned in 23.45 seconds`,
      explanation: '8 open ports found! This is a heavily exposed server. SSH (22), two web servers (80, 443, 8080, 8443), TWO databases exposed (MySQL 3306, PostgreSQL 5432 — databases should NEVER be internet-facing!), and an admin panel on 9090. Each open port is a potential entry point for an attacker.',
    },
    {
      id: 4,
      title: 'Service Version Detection',
      instruction: 'Identify exactly what software and versions are running on each port. Version info reveals specific vulnerabilities.',
      command: 'nmap -sV -p 22,80,443,3306,5432,8080,8443,9090 10.10.10.100',
      expectedOutput: `PORT      STATE SERVICE     VERSION
22/tcp    open  ssh         OpenSSH 7.6p1 Ubuntu 4ubuntu0.3
80/tcp    open  http        Apache httpd 2.4.29 ((Ubuntu))
443/tcp   open  ssl/http    Apache httpd 2.4.29
3306/tcp  open  mysql       MySQL 5.7.33-0ubuntu0.18.04.1
5432/tcp  open  postgresql  PostgreSQL 12.4
8080/tcp  open  http        Apache Tomcat 9.0.31
8443/tcp  open  ssl/http    Apache Tomcat 9.0.31
9090/tcp  open  http        Cockpit web service

Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel`,
      explanation: 'Now we have exact versions! Critical findings: (1) OpenSSH 7.6p1 is outdated (current is 9.x). (2) Apache 2.4.29 is very old and has known CVEs including path traversal. (3) MySQL and PostgreSQL are exposed to the network (should be localhost only). (4) Tomcat 9.0.31 has known RCE vulnerabilities. (5) Cockpit admin panel is exposed.',
      tip: 'Always note exact version numbers. Search each one in CVE databases: "Apache 2.4.29 CVE" or use searchsploit locally. Version numbers are the key to finding exploitable vulnerabilities.',
    },
    {
      id: 5,
      title: 'OS Detection',
      instruction: 'Determine the operating system to further narrow down potential exploits.',
      command: 'sudo nmap -O 10.10.10.100',
      expectedOutput: `OS details: Linux 4.15 - 5.4 (Ubuntu 18.04 - 20.04)
Network Distance: 1 hop
TCP Sequence Prediction: Difficulty=261 (Good luck!)`,
      explanation: 'The target is running Ubuntu 18.04 or 20.04 with kernel 4.15-5.4. Ubuntu 18.04 reached end-of-life in April 2023 — it no longer receives security patches! This means ALL vulnerabilities discovered after that date are permanently unpatched on this system.',
    },
    {
      id: 6,
      title: 'Vulnerability Summary',
      instruction: 'Based on all scan results, compile the vulnerability findings.',
      command: 'cat /report/vulnerability-findings.txt',
      expectedOutput: `VULNERABILITY ASSESSMENT SUMMARY
================================================================
Target: 10.10.10.100 (Ubuntu 18.04, EOL)

CRITICAL:
[1] Apache 2.4.29 - CVE-2021-41773 (Path Traversal + RCE)
    Port: 80, 443
    Impact: Remote Code Execution without authentication
    CVSS: 9.8

[2] MySQL 5.7 exposed to network
    Port: 3306
    Impact: Database accessible from any host (should be localhost only)
    Risk: Brute-force credentials → full database access

HIGH:
[3] Apache Tomcat 9.0.31 - CVE-2020-1938 (GhostCat)
    Port: 8080, 8443
    Impact: Read arbitrary files, potentially RCE
    CVSS: 7.5

[4] Ubuntu 18.04 End-of-Life
    Impact: No security patches since April 2023
    All known vulnerabilities since then are exploitable

MEDIUM:
[5] PostgreSQL 12.4 exposed to network (Port 5432)
[6] Cockpit admin panel exposed (Port 9090)
[7] OpenSSH 7.6 - outdated, multiple CVEs

TOTAL: 2 Critical, 2 High, 3 Medium`,
      explanation: 'From a simple Nmap scan, we identified 7 vulnerabilities including 2 critical ones (Apache RCE and exposed database). In a real pentest, the next step would be exploitation — using these findings to gain access. For now, this demonstrates how much information a single tool (Nmap) reveals about a poorly secured server.',
    },
  ],
  summary: [
    'Ping sweep (-sn) discovered 5 hosts on the 10.10.10.0/24 network',
    'Full port scan (-p-) found 8 open TCP ports on the target server',
    'Version detection (-sV) revealed outdated Apache (2.4.29), Tomcat (9.0.31), and exposed databases',
    'OS detection (-O) identified Ubuntu 18.04 which is END OF LIFE (no more patches)',
    '7 vulnerabilities found: 2 Critical (RCE + exposed DB), 2 High, 3 Medium',
    'Key lesson: A single Nmap scan reveals massive attack surface. Defenders must minimize exposed ports and keep software updated.',
    'PREVENTION: Close unnecessary ports, update software, restrict databases to localhost, use a firewall',
  ],
};
