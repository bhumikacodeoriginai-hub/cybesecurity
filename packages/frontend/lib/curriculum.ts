// Complete CyberSec Academy Curriculum
// 10 Modules, 72 Lessons, organized in proper learning order

export type Lesson = {
  id: string;
  title: string;
  slug: string;
  type: 'THEORY' | 'PRACTICAL' | 'LAB';
  duration: number; // minutes
  description: string;
};

export type Lab = {
  id: string;
  title: string;
  slug: string;
  duration: number;
  difficulty: string;
  tools: string[];
  objectives: string[];
  description: string;
};

export type Module = {
  id: string;
  number: number;
  title: string;
  slug: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  color: string;
  icon: string;
  lessons: Lesson[];
  lab?: Lab;
};

export const modules: Module[] = [

  // MODULE 1: Introduction to Cybersecurity (L01-L07)
  {
    id: 'mod-01',
    number: 1,
    title: 'Introduction to Cybersecurity',
    slug: 'intro-cybersecurity',
    description: 'Understand what cybersecurity is, why it matters, and the foundational concepts every security professional needs.',
    difficulty: 'BEGINNER',
    color: '#00d4ff',
    icon: '🛡️',
    lessons: [
      { id: 'L01', title: 'What is Cybersecurity?', slug: 'what-is-cybersecurity', type: 'THEORY', duration: 20, description: 'Overview of cybersecurity, its history, and why it matters in the modern world.' },
      { id: 'L02', title: 'The CIA Triad', slug: 'the-cia-triad', type: 'THEORY', duration: 25, description: 'Confidentiality, Integrity, Availability — the three pillars of information security.' },
      { id: 'L03', title: 'Threats, Vulnerabilities & Risks', slug: 'threats-vulnerabilities-risks', type: 'THEORY', duration: 30, description: 'Understanding the difference between threats, vulnerabilities, and risk.' },
      { id: 'L04', title: 'Types of Attackers & Motivations', slug: 'types-of-attackers', type: 'THEORY', duration: 25, description: 'Script kiddies, hacktivists, nation-states, insiders — who attacks and why.' },
      { id: 'L05', title: 'Security Controls & Frameworks', slug: 'security-controls-frameworks', type: 'THEORY', duration: 30, description: 'NIST, ISO 27001, CIS Controls — frameworks that guide security programs.' },
      { id: 'L06', title: 'Cybersecurity Careers & Certifications', slug: 'cybersecurity-careers', type: 'THEORY', duration: 20, description: 'SOC Analyst, Pentester, CISO — career paths and certifications to pursue.' },
      { id: 'L07', title: 'Setting Up Your Security Lab', slug: 'setting-up-security-lab', type: 'PRACTICAL', duration: 40, description: 'Install VirtualBox, Kali Linux, and set up an isolated practice environment.' },
    ],
    lab: {
      id: 'lab-01',
      title: 'Security Mindset Challenge',
      slug: 'security-mindset-challenge',
      duration: 30,
      difficulty: 'BEGINNER',
      tools: ['Terminal', 'cat', 'grep'],
      objectives: ['Identify the vulnerability in a given scenario', 'Classify threats by CIA impact', 'Map controls to risks', 'Write a 1-paragraph risk assessment'],
      description: 'Apply the CIA Triad and risk assessment concepts to analyze a simulated breach scenario.',
    },
  },

  // MODULE 2: Linux Fundamentals (L08-L14)
  {
    id: 'mod-02',
    number: 2,
    title: 'Linux Fundamentals',
    slug: 'linux-fundamentals',
    description: 'Master the Linux command line — the operating system that powers most servers, security tools, and infrastructure.',
    difficulty: 'BEGINNER',
    color: '#10b981',
    icon: '🐧',
    lessons: [
      { id: 'L08', title: 'Introduction to Linux', slug: 'intro-linux', type: 'THEORY', duration: 25, description: 'Linux distributions, the kernel, and why Linux dominates cybersecurity.' },
      { id: 'L09', title: 'Navigating the File System', slug: 'linux-filesystem', type: 'PRACTICAL', duration: 35, description: 'cd, ls, pwd, find — moving through the Linux directory structure.' },
      { id: 'L10', title: 'File Operations & Text Processing', slug: 'linux-file-operations', type: 'PRACTICAL', duration: 40, description: 'cat, grep, awk, sed, head, tail — reading and processing files.' },
      { id: 'L11', title: 'Users, Groups & Permissions', slug: 'linux-users-permissions', type: 'PRACTICAL', duration: 45, description: 'chmod, chown, useradd — managing access control on Linux systems.' },
      { id: 'L12', title: 'Linux File Permissions Deep Dive', slug: 'linux-file-permissions', type: 'PRACTICAL', duration: 40, description: 'SUID, SGID, sticky bit, umask — advanced permission concepts for security.' },
      { id: 'L13', title: 'Services, Daemons & Systemd', slug: 'linux-services-systemd', type: 'PRACTICAL', duration: 35, description: 'systemctl, journalctl — managing and monitoring Linux services.' },
      { id: 'L14', title: 'Linux Process Management & Monitoring', slug: 'linux-process-management', type: 'PRACTICAL', duration: 40, description: 'ps, top, kill, lsof — viewing and controlling running processes.' },
    ],
    lab: {
      id: 'lab-02',
      title: 'Linux Intrusion Investigation',
      slug: 'linux-intrusion-investigation',
      duration: 60,
      difficulty: 'BEGINNER',
      tools: ['Terminal', 'cat', 'grep', 'find', 'ps', 'ls'],
      objectives: ['Find the suspicious user account in /etc/passwd', 'Identify the attacker IP from auth.log', 'Count failed login attempts', 'Locate hidden files in suspicious user home directory'],
      description: 'Investigate a compromised Linux server. Find the attacker, analyze logs, and document evidence of intrusion.',
    },
  },

  // MODULE 3: Computer Networking (L15-L21)
  {
    id: 'mod-03',
    number: 3,
    title: 'Computer Networking',
    slug: 'computer-networking',
    description: 'Understand TCP/IP, DNS, routing, and protocols — the foundation for all network security.',
    difficulty: 'BEGINNER',
    color: '#8b5cf6',
    icon: '🌐',
    lessons: [
      { id: 'L15', title: 'How Networks Work: OSI & TCP/IP', slug: 'osi-tcp-ip-model', type: 'THEORY', duration: 35, description: 'The 7-layer OSI model and TCP/IP stack — how data flows across networks.' },
      { id: 'L16', title: 'IP Addressing & Subnetting', slug: 'ip-addressing-subnetting', type: 'PRACTICAL', duration: 45, description: 'IPv4, IPv6, CIDR notation, subnet calculations for network segmentation.' },
      { id: 'L17', title: 'TCP, UDP & the Transport Layer', slug: 'tcp-udp-transport', type: 'THEORY', duration: 30, description: '3-way handshake, ports, TCP vs UDP — how connections are established.' },
      { id: 'L18', title: 'DNS: The Internet\'s Phone Book', slug: 'dns-fundamentals', type: 'PRACTICAL', duration: 40, description: 'DNS resolution, record types, dig/nslookup — how names become IPs.' },
      { id: 'L19', title: 'Network Troubleshooting & Diagnostics', slug: 'network-troubleshooting', type: 'PRACTICAL', duration: 45, description: 'ping, traceroute, netstat, ss — diagnosing network problems systematically.' },
      { id: 'L20', title: 'Network Services & Protocols', slug: 'network-services-protocols', type: 'THEORY', duration: 40, description: 'HTTP, FTP, SMTP, DHCP, SNMP — services that run the internet and their security implications.' },
      { id: 'L21', title: 'Wireless Networking & Security', slug: 'wireless-networking', type: 'PRACTICAL', duration: 45, description: 'Wi-Fi standards, WPA2/WPA3, evil twin attacks, and wireless defense.' },
    ],
    lab: {
      id: 'lab-03',
      title: 'Network Scanning & Discovery',
      slug: 'network-scanning-discovery',
      duration: 45,
      difficulty: 'BEGINNER',
      tools: ['nmap', 'ping', 'traceroute', 'dig', 'netcat'],
      objectives: ['Discover live hosts on the network', 'Identify open ports on target', 'Perform DNS enumeration', 'Banner grab to identify services'],
      description: 'Use network tools to map an authorized test network — discover hosts, ports, and services.',
    },
  },

  // MODULE 4: Network Security (L22-L28)
  {
    id: 'mod-04',
    number: 4,
    title: 'Network Security',
    slug: 'network-security',
    description: 'Defend networks with firewalls, VPNs, IDS/IPS, and learn to detect and prevent network attacks.',
    difficulty: 'INTERMEDIATE',
    color: '#3b82f6',
    icon: '🔒',
    lessons: [
      { id: 'L22', title: 'Introduction to Network Security', slug: 'intro-network-security', type: 'THEORY', duration: 35, description: 'Defense in depth, zero trust, network segmentation, and security zones.' },
      { id: 'L23', title: 'Firewalls: Concepts & Configuration', slug: 'firewalls-configuration', type: 'PRACTICAL', duration: 50, description: 'iptables, UFW, stateful inspection — building and managing firewall rules.' },
      { id: 'L24', title: 'VPN Technologies & Secure Tunneling', slug: 'vpn-secure-tunneling', type: 'PRACTICAL', duration: 45, description: 'IPsec, OpenVPN, WireGuard — creating encrypted tunnels for secure communication.' },
      { id: 'L25', title: 'IDS/IPS: Intrusion Detection & Prevention', slug: 'ids-ips-systems', type: 'PRACTICAL', duration: 50, description: 'Snort, Suricata — detecting attacks in network traffic with signature and anomaly detection.' },
      { id: 'L26', title: 'Network Traffic Analysis with Wireshark', slug: 'wireshark-traffic-analysis', type: 'PRACTICAL', duration: 55, description: 'Packet capture, display filters, following streams — analyzing traffic for threats.' },
      { id: 'L27', title: 'Man-in-the-Middle & ARP Spoofing', slug: 'network-attacks-mitm', type: 'PRACTICAL', duration: 50, description: 'ARP poisoning, SSL stripping, DNS spoofing — and how to defend against them.' },
      { id: 'L28', title: 'DDoS, DNS Poisoning & Defense', slug: 'network-attacks-ddos', type: 'PRACTICAL', duration: 50, description: 'SYN floods, amplification attacks, BGP hijacking — understanding and mitigating DoS.' },
    ],
    lab: {
      id: 'lab-04',
      title: 'Firewall Configuration Lab',
      slug: 'firewall-configuration-lab',
      duration: 60,
      difficulty: 'INTERMEDIATE',
      tools: ['iptables', 'ufw', 'nmap', 'netcat', 'ss'],
      objectives: ['Configure iptables to allow only SSH and HTTP', 'Block a specific attacker IP', 'Set up rate limiting for SYN flood protection', 'Verify firewall rules with external port scan'],
      description: 'Secure a Linux server by building a complete iptables firewall from scratch, then verify with scanning.',
    },
  },

  // MODULE 5: Web Application Security (L29-L36)
  {
    id: 'mod-05',
    number: 5,
    title: 'Web Application Security',
    slug: 'web-security',
    description: 'Master the OWASP Top 10 — SQL injection, XSS, CSRF, SSRF, and how to find and fix web vulnerabilities.',
    difficulty: 'INTERMEDIATE',
    color: '#f59e0b',
    icon: '🕸️',
    lessons: [
      { id: 'L29', title: 'Web Security & OWASP Top 10', slug: 'intro-web-security', type: 'THEORY', duration: 40, description: 'How web apps work from a security perspective, and the 10 most critical risks.' },
      { id: 'L30', title: 'SQL Injection: Discovery & Exploitation', slug: 'sql-injection', type: 'PRACTICAL', duration: 55, description: 'Union-based, blind, error-based SQLi — and parameterized query prevention.' },
      { id: 'L31', title: 'Cross-Site Scripting (XSS)', slug: 'xss-attacks', type: 'PRACTICAL', duration: 55, description: 'Reflected, stored, DOM-based XSS — cookie theft, CSP, and output encoding.' },
      { id: 'L32', title: 'Authentication Vulnerabilities', slug: 'auth-vulnerabilities', type: 'PRACTICAL', duration: 50, description: 'Brute force, credential stuffing, JWT attacks, session management flaws.' },
      { id: 'L33', title: 'Cross-Site Request Forgery (CSRF)', slug: 'csrf-attacks', type: 'PRACTICAL', duration: 45, description: 'Forging requests, anti-CSRF tokens, SameSite cookies — attack and defense.' },
      { id: 'L34', title: 'SSRF & Command Injection', slug: 'ssrf-injection', type: 'PRACTICAL', duration: 50, description: 'Making servers fetch internal resources, OS command injection, and template injection.' },
      { id: 'L35', title: 'Broken Access Control & IDOR', slug: 'broken-access-control', type: 'PRACTICAL', duration: 45, description: 'Horizontal/vertical privilege escalation, IDOR, forced browsing — the #1 OWASP risk.' },
      { id: 'L36', title: 'Security Misconfigurations', slug: 'security-misconfigurations', type: 'PRACTICAL', duration: 45, description: 'Default credentials, debug mode, exposed files, vulnerable components — easy wins for attackers.' },
    ],
    lab: {
      id: 'lab-05',
      title: 'Web Application Penetration Test',
      slug: 'web-app-pentest',
      duration: 90,
      difficulty: 'INTERMEDIATE',
      tools: ['curl', 'Browser', 'sqlmap', 'Burp Suite basics'],
      objectives: ['Find and exploit a SQL injection vulnerability', 'Discover a stored XSS in the comment field', 'Access another user\'s data via IDOR', 'Identify at least 3 security misconfigurations'],
      description: 'Perform a full penetration test against a deliberately vulnerable web application (DVWA-style).',
    },
  },

  // MODULE 6: Cryptography (L37-L43)
  {
    id: 'mod-06',
    number: 6,
    title: 'Cryptography',
    slug: 'cryptography',
    description: 'Understand symmetric/asymmetric encryption, hashing, TLS, PKI — the math that protects the internet.',
    difficulty: 'INTERMEDIATE',
    color: '#ec4899',
    icon: '🔐',
    lessons: [
      { id: 'L37', title: 'Symmetric Encryption: AES & Block Ciphers', slug: 'symmetric-encryption', type: 'PRACTICAL', duration: 50, description: 'AES, modes of operation (ECB/CBC/GCM), key management fundamentals.' },
      { id: 'L38', title: 'Asymmetric Encryption: RSA & ECC', slug: 'asymmetric-encryption', type: 'PRACTICAL', duration: 50, description: 'Public/private keys, RSA, Diffie-Hellman, elliptic curve cryptography.' },
      { id: 'L39', title: 'Hashing: SHA, bcrypt & Integrity', slug: 'hashing-integrity', type: 'PRACTICAL', duration: 45, description: 'One-way functions, password hashing, file integrity, HMAC authentication.' },
      { id: 'L40', title: 'Digital Signatures & Certificates', slug: 'digital-signatures', type: 'PRACTICAL', duration: 45, description: 'Signing, verification, X.509 certificates, code signing, chain of trust.' },
      { id: 'L41', title: 'TLS/SSL: Securing Communications', slug: 'tls-ssl-security', type: 'PRACTICAL', duration: 50, description: 'TLS 1.3 handshake, cipher suites, PFS, HSTS — how HTTPS actually works.' },
      { id: 'L42', title: 'Public Key Infrastructure (PKI)', slug: 'pki-infrastructure', type: 'THEORY', duration: 40, description: 'Certificate authorities, CRL, OCSP, Let\'s Encrypt, certificate transparency.' },
      { id: 'L43', title: 'Cryptographic Attacks & Best Practices', slug: 'crypto-attacks-practices', type: 'THEORY', duration: 40, description: 'Side-channel, padding oracle, quantum threat, key management best practices.' },
    ],
    lab: {
      id: 'lab-06',
      title: 'Cryptography & Password Cracking Lab',
      slug: 'crypto-password-lab',
      duration: 45,
      difficulty: 'INTERMEDIATE',
      tools: ['openssl', 'hashcat', 'sha256sum', 'gpg'],
      objectives: ['Encrypt and decrypt a file with AES-256-GCM', 'Generate RSA key pair and sign a document', 'Crack MD5 password hashes using wordlist', 'Verify a TLS certificate chain'],
      description: 'Hands-on cryptography: encrypt files, crack weak passwords, verify signatures, and audit TLS configurations.',
    },
  },

  // MODULE 7: Ethical Hacking & Penetration Testing (L44-L51)
  {
    id: 'mod-07',
    number: 7,
    title: 'Ethical Hacking & Penetration Testing',
    slug: 'ethical-hacking',
    description: 'Learn the methodology of authorized security testing — recon, scanning, exploitation, post-exploitation, and reporting.',
    difficulty: 'ADVANCED',
    color: '#ef4444',
    icon: '💀',
    lessons: [
      { id: 'L44', title: 'Reconnaissance & OSINT', slug: 'recon-information-gathering', type: 'PRACTICAL', duration: 55, description: 'WHOIS, DNS enum, Google dorking, Shodan, theHarvester — mapping the attack surface.' },
      { id: 'L45', title: 'Network Scanning with Nmap', slug: 'nmap-scanning', type: 'PRACTICAL', duration: 55, description: 'SYN scan, version detection, OS fingerprinting, NSE scripts — the pentester\'s Swiss army knife.' },
      { id: 'L46', title: 'Vulnerability Assessment', slug: 'vulnerability-assessment', type: 'PRACTICAL', duration: 50, description: 'Nessus, OpenVAS, CVE/CVSS — finding and prioritizing vulnerabilities.' },
      { id: 'L47', title: 'Exploitation with Metasploit', slug: 'exploitation-metasploit', type: 'PRACTICAL', duration: 60, description: 'Modules, payloads, meterpreter — using the Metasploit Framework for authorized exploitation.' },
      { id: 'L48', title: 'Privilege Escalation (Linux)', slug: 'privilege-escalation-linux', type: 'PRACTICAL', duration: 55, description: 'SUID binaries, kernel exploits, cron jobs, misconfigured sudo — going from user to root.' },
      { id: 'L49', title: 'Privilege Escalation (Windows)', slug: 'privilege-escalation-windows', type: 'PRACTICAL', duration: 55, description: 'Token impersonation, unquoted paths, AlwaysInstallElevated — Windows privesc techniques.' },
      { id: 'L50', title: 'Post-Exploitation & Persistence', slug: 'post-exploitation', type: 'PRACTICAL', duration: 50, description: 'Lateral movement, persistence mechanisms, data exfiltration, covering tracks.' },
      { id: 'L51', title: 'Writing a Penetration Test Report', slug: 'pentest-reporting', type: 'THEORY', duration: 40, description: 'Executive summary, findings, risk ratings, remediation — professional reporting.' },
    ],
    lab: {
      id: 'lab-07',
      title: 'Full Penetration Test Simulation',
      slug: 'pentest-simulation',
      duration: 120,
      difficulty: 'ADVANCED',
      tools: ['nmap', 'metasploit', 'searchsploit', 'linpeas', 'netcat'],
      objectives: ['Enumerate the target network and discover services', 'Identify and exploit a vulnerability to gain initial access', 'Escalate privileges from user to root', 'Find the flag file in /root/flag.txt'],
      description: 'Complete a full penetration test against a multi-service target machine: recon → exploit → privesc → flag.',
    },
  },

  // MODULE 8: SOC & Incident Response (L52-L58)
  {
    id: 'mod-08',
    number: 8,
    title: 'SOC & Incident Response',
    slug: 'soc-incident-response',
    description: 'Defend as a Security Operations Center analyst — detect intrusions, triage alerts, respond to incidents.',
    difficulty: 'ADVANCED',
    color: '#6366f1',
    icon: '🎯',
    lessons: [
      { id: 'L52', title: 'Introduction to Security Operations', slug: 'intro-security-operations', type: 'THEORY', duration: 35, description: 'SOC roles (Tier 1-3), workflows, tools, and the detection-response lifecycle.' },
      { id: 'L53', title: 'SIEM: Log Collection & Correlation', slug: 'siem-log-correlation', type: 'PRACTICAL', duration: 50, description: 'Splunk/ELK basics, log sources, correlation rules, building detection queries.' },
      { id: 'L54', title: 'Alert Triage & Investigation', slug: 'alert-triage-investigation', type: 'PRACTICAL', duration: 45, description: 'True vs false positives, investigation methodology, escalation procedures.' },
      { id: 'L55', title: 'MITRE ATT&CK Framework', slug: 'mitre-attack-framework', type: 'THEORY', duration: 40, description: 'Tactics, techniques, procedures (TTPs) — mapping adversary behavior to detection.' },
      { id: 'L56', title: 'Incident Response Process', slug: 'incident-response-process', type: 'THEORY', duration: 45, description: 'Preparation, identification, containment, eradication, recovery, lessons learned.' },
      { id: 'L57', title: 'Digital Forensics Fundamentals', slug: 'digital-forensics', type: 'PRACTICAL', duration: 50, description: 'Evidence preservation, disk imaging, memory analysis, timeline reconstruction.' },
      { id: 'L58', title: 'Malware Analysis Basics', slug: 'malware-analysis-basics', type: 'PRACTICAL', duration: 55, description: 'Static vs dynamic analysis, sandboxing, indicators of compromise (IOCs).' },
    ],
    lab: {
      id: 'lab-08',
      title: 'Incident Response Simulation',
      slug: 'incident-response-lab',
      duration: 90,
      difficulty: 'ADVANCED',
      tools: ['grep', 'awk', 'Timeline analysis', 'Log files'],
      objectives: ['Identify the initial compromise vector from logs', 'Determine the scope of lateral movement', 'Find all compromised accounts', 'Write an incident report with timeline'],
      description: 'Respond to a simulated breach: analyze logs, trace attacker movement, contain the threat, and report findings.',
    },
  },

  // MODULE 9: Cloud Security (L59-L65)
  {
    id: 'mod-09',
    number: 9,
    title: 'Cloud & Infrastructure Security',
    slug: 'cloud-security',
    description: 'Secure cloud environments — AWS/Azure fundamentals, IAM, container security, and infrastructure as code.',
    difficulty: 'ADVANCED',
    color: '#f97316',
    icon: '☁️',
    lessons: [
      { id: 'L59', title: 'Cloud Computing Security Fundamentals', slug: 'cloud-security-fundamentals', type: 'THEORY', duration: 40, description: 'Shared responsibility model, cloud-native threats, multi-cloud security.' },
      { id: 'L60', title: 'AWS Security Essentials', slug: 'aws-security-essentials', type: 'PRACTICAL', duration: 50, description: 'VPC, Security Groups, S3 policies, CloudTrail, GuardDuty — securing AWS.' },
      { id: 'L61', title: 'Identity & Access Management (IAM)', slug: 'iam-cloud-security', type: 'PRACTICAL', duration: 45, description: 'Least privilege, role-based access, MFA, service accounts, policy analysis.' },
      { id: 'L62', title: 'Container Security (Docker)', slug: 'container-security-docker', type: 'PRACTICAL', duration: 50, description: 'Image scanning, runtime security, Docker secrets, minimal base images.' },
      { id: 'L63', title: 'Kubernetes Security', slug: 'kubernetes-security', type: 'PRACTICAL', duration: 55, description: 'RBAC, network policies, pod security, secrets management in K8s.' },
      { id: 'L64', title: 'Infrastructure as Code Security', slug: 'iac-security', type: 'PRACTICAL', duration: 45, description: 'Terraform/CloudFormation security scanning, drift detection, policy-as-code.' },
      { id: 'L65', title: 'Cloud Security Monitoring', slug: 'cloud-security-monitoring', type: 'PRACTICAL', duration: 45, description: 'CloudTrail, CloudWatch, Azure Sentinel — detecting threats in cloud environments.' },
    ],
    lab: {
      id: 'lab-09',
      title: 'Cloud Misconfiguration Hunt',
      slug: 'cloud-misconfig-lab',
      duration: 60,
      difficulty: 'ADVANCED',
      tools: ['aws-cli', 'terraform', 'docker', 'trivy'],
      objectives: ['Find the publicly accessible S3 bucket', 'Identify overly permissive IAM policies', 'Scan Docker images for vulnerabilities', 'Fix the Terraform misconfiguration'],
      description: 'Audit a simulated cloud environment for security misconfigurations — find and fix before attackers do.',
    },
  },

  // MODULE 10: DevSecOps & Secure Development (L66-L72)
  {
    id: 'mod-10',
    number: 10,
    title: 'DevSecOps & Secure Development',
    slug: 'devsecops',
    description: 'Integrate security into the development lifecycle — CI/CD security, SAST/DAST, threat modeling, and secure coding.',
    difficulty: 'ADVANCED',
    color: '#14b8a6',
    icon: '⚙️',
    lessons: [
      { id: 'L66', title: 'DevSecOps Culture & Principles', slug: 'devsecops-principles', type: 'THEORY', duration: 35, description: 'Shift-left security, automation, shared responsibility, security champions.' },
      { id: 'L67', title: 'Secure CI/CD Pipelines', slug: 'secure-cicd-pipelines', type: 'PRACTICAL', duration: 50, description: 'GitHub Actions security, secrets management, artifact signing, pipeline hardening.' },
      { id: 'L68', title: 'SAST & DAST: Automated Security Testing', slug: 'sast-dast-testing', type: 'PRACTICAL', duration: 45, description: 'Static analysis (Semgrep, SonarQube), dynamic testing (OWASP ZAP), integration strategies.' },
      { id: 'L69', title: 'Dependency & Supply Chain Security', slug: 'supply-chain-security', type: 'PRACTICAL', duration: 45, description: 'npm audit, Dependabot, SBOM, SolarWinds lessons, verifying package integrity.' },
      { id: 'L70', title: 'Threat Modeling', slug: 'threat-modeling', type: 'THEORY', duration: 40, description: 'STRIDE, DREAD, attack trees — identifying threats before writing code.' },
      { id: 'L71', title: 'Secure Coding Practices', slug: 'secure-coding-practices', type: 'PRACTICAL', duration: 50, description: 'Input validation, output encoding, parameterized queries, secure defaults.' },
      { id: 'L72', title: 'Security Compliance & Governance', slug: 'security-compliance', type: 'THEORY', duration: 40, description: 'GDPR, SOC 2, PCI-DSS, HIPAA — regulatory requirements and audit preparation.' },
    ],
    lab: {
      id: 'lab-10',
      title: 'Secure Pipeline & Code Review Lab',
      slug: 'secure-pipeline-lab',
      duration: 60,
      difficulty: 'ADVANCED',
      tools: ['git', 'semgrep', 'trivy', 'npm audit'],
      objectives: ['Run SAST scan and identify 3 code vulnerabilities', 'Fix a SQL injection in the source code', 'Scan dependencies and patch a critical CVE', 'Configure a security gate in the CI pipeline'],
      description: 'Build and secure a CI/CD pipeline: add automated security scanning, fix code vulnerabilities, and pass the security gate.',
    },
  },
];

// Helper functions
export function getModuleBySlug(slug: string): Module | undefined {
  return modules.find(m => m.slug === slug);
}

export function getLessonBySlug(slug: string): { lesson: Lesson; module: Module } | undefined {
  for (const mod of modules) {
    const lesson = mod.lessons.find(l => l.slug === slug);
    if (lesson) return { lesson, module: mod };
  }
  return undefined;
}

export function getLabBySlug(slug: string): { lab: Lab; module: Module } | undefined {
  for (const mod of modules) {
    if (mod.lab && mod.lab.slug === slug) return { lab: mod.lab, module: mod };
  }
  return undefined;
}

export const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
export const totalModules = modules.length;
export const totalLabs = modules.filter(m => m.lab).length;
