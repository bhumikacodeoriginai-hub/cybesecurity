export const lesson = {
  id: 'L29',
  title: 'Introduction to Network Security',
  slug: 'intro-network-security',
  type: 'THEORY',
  duration: 35,
  xpReward: 25,
  difficulty: 'intermediate',
  module: { title: 'Network Security', slug: 'network-security' },
  course: { title: 'Network Security Fundamentals', slug: 'network-security-fundamentals' },
  keyTerms: [
    'Defense in Depth', 'Network Perimeter', 'DMZ', 'Zero Trust',
    'Segmentation', 'Least Privilege', 'Attack Surface',
    'Threat Landscape', 'Security Zones', 'Network Hardening'
  ],
  content: [
    { type: 'heading', content: 'Introduction to Network Security' },
    { type: 'paragraph', content: 'Network security is the practice of protecting computer networks from unauthorized access, misuse, and attacks. In a world where everything is connected — from laptops to refrigerators — the network is both the lifeline and the biggest attack surface of any organization.' },

    { type: 'callout', variant: 'info', content: 'Analogy: Think of a network like a medieval castle. The moat is your firewall. The drawbridge is your VPN. The guards at the gate are your IDS/IPS. The locked treasury vault is your encrypted database. Network security is designing all these defenses so that even if one fails, the others hold.' },

    { type: 'heading', level: 2, content: 'Why Network Security Matters' },
    { type: 'paragraph', content: 'Every organization — from small businesses to governments — relies on networks. A single breach can result in:' },
    { type: 'list', items: [
      'Data theft — Customer records, trade secrets, financial data stolen',
      'Ransomware — Entire network encrypted, operations halted for days/weeks',
      'Financial loss — Average cost of a data breach: $4.45 million (IBM 2023)',
      'Reputation damage — Customers lose trust, stock prices drop',
      'Legal consequences — GDPR fines up to 4% of global revenue',
      'Operational disruption — Hospitals can\'t treat patients, factories can\'t produce'
    ]},

    { type: 'heading', level: 2, content: 'The Network Security Threat Landscape' },
    { type: 'paragraph', content: 'Understanding what you\'re defending against is step one. The threat landscape includes:' },

    { type: 'heading', level: 3, content: 'External Threats' },
    { type: 'list', items: [
      'Hackers/Cybercriminals — Motivated by money (ransomware, data theft)',
      'Nation-State Actors — Government-sponsored espionage and sabotage (APTs)',
      'Hacktivists — Politically motivated (DDoS, defacement, data leaks)',
      'Script Kiddies — Unskilled attackers using pre-built tools',
      'Automated Bots — Constantly scanning the internet for vulnerable systems'
    ]},

    { type: 'heading', level: 3, content: 'Internal Threats' },
    { type: 'list', items: [
      'Disgruntled employees — Intentional sabotage or data theft',
      'Careless users — Clicking phishing links, using weak passwords',
      'Misconfigured systems — Open ports, default credentials, missing patches',
      'Shadow IT — Unauthorized devices/services on the network',
      'Compromised accounts — Legitimate credentials stolen and used by attackers'
    ]},

    { type: 'callout', variant: 'warning', content: 'Statistic: 60% of data breaches involve insider threats (intentional or accidental). Your network security strategy must address threats from INSIDE the network, not just at the perimeter.' },

    { type: 'heading', level: 2, content: 'Core Principles of Network Security' },

    { type: 'heading', level: 3, content: '1. Defense in Depth' },
    { type: 'paragraph', content: 'Never rely on a single security control. Layer multiple defenses so that if one fails, others still protect you. Like an onion — peel one layer and there\'s another underneath.' },
    { type: 'list', items: [
      'Layer 1: Perimeter firewall blocks unauthorized inbound traffic',
      'Layer 2: IDS/IPS detects and blocks attack patterns',
      'Layer 3: Network segmentation limits lateral movement',
      'Layer 4: Host-based firewalls on each server',
      'Layer 5: Application-level authentication and authorization',
      'Layer 6: Encryption protects data even if intercepted',
      'Layer 7: Monitoring and logging detects what slips through'
    ]},

    { type: 'heading', level: 3, content: '2. Least Privilege' },
    { type: 'paragraph', content: 'Every user, device, and application should have only the minimum access needed to do its job — nothing more. A marketing intern doesn\'t need access to the server room, and a web server doesn\'t need access to the payroll database.' },

    { type: 'command', command: 'iptables -A INPUT -s 10.0.5.0/24 -d 10.0.1.100 -p tcp --dport 3306 -j ACCEPT\niptables -A INPUT -d 10.0.1.100 -p tcp --dport 3306 -j DROP', output: '', explanation: 'This firewall rule allows ONLY the application server subnet (10.0.5.0/24) to access the database on port 3306. Everyone else is blocked. This is least privilege applied at the network level.' },

    { type: 'heading', level: 3, content: '3. Zero Trust Architecture' },
    { type: 'paragraph', content: 'The traditional model was "trust everything inside the network perimeter." Zero Trust says: "Never trust, always verify." Every access request is authenticated and authorized regardless of where it comes from — even inside the corporate network.' },
    { type: 'list', items: [
      'Verify explicitly — Authenticate every request based on all available data',
      'Use least privilege access — Just-in-time and just-enough-access',
      'Assume breach — Design as if attackers are already inside',
      'Micro-segmentation — Create security zones around individual workloads',
      'Continuous monitoring — Don\'t just check once at login; verify continuously'
    ]},

    { type: 'callout', variant: 'security', content: 'Zero Trust explained simply: Traditional security is like a nightclub with a bouncer at the door — once you\'re inside, you can go anywhere. Zero Trust is like a building where every room requires a separate key card, your access is logged, and your badge is re-verified continuously.' },

    { type: 'heading', level: 2, content: 'Network Security Architecture' },

    { type: 'heading', level: 3, content: 'Security Zones' },
    { type: 'paragraph', content: 'Networks are divided into zones with different trust levels. Traffic between zones is controlled by firewalls:' },
    { type: 'list', items: [
      'Internet (Untrusted) — The wild west. Assume everything here is hostile.',
      'DMZ (Demilitarized Zone) — Public-facing servers (web, email, DNS). Limited access to internal networks.',
      'Internal Network (Trusted) — Employee workstations, internal apps. Protected from the internet.',
      'Server Zone — Critical servers (databases, file servers). Accessible only from specific internal systems.',
      'Management Zone — Network administration tools. Highest restriction level.',
      'Guest Network — Visitors/IoT. Internet access only, zero internal access.'
    ]},

    { type: 'command', command: 'cat /etc/network/zones.conf', output: `# Network Security Zones
# Zone: INTERNET (untrusted)
#   Interface: eth0 (public IP)
#   Policy: DENY ALL inbound, ALLOW established outbound

# Zone: DMZ
#   Interface: eth1 (172.16.0.0/24)
#   Hosts: web-server (172.16.0.10), mail-server (172.16.0.20)
#   Policy: ALLOW 80/443 from INTERNET, ALLOW specific ports to INTERNAL

# Zone: INTERNAL
#   Interface: eth2 (10.0.0.0/16)
#   Subnets: 10.0.1.0/24 (servers), 10.0.2.0/24 (workstations)
#   Policy: ALLOW to INTERNET via proxy, DENY direct from INTERNET

# Zone: MANAGEMENT
#   Interface: eth3 (192.168.100.0/24)
#   Policy: ALLOW from admin workstations ONLY, DENY all others`, explanation: 'A typical zone configuration. Notice how the DMZ sits between the internet and internal network — it accepts public traffic but has limited access inward. If a DMZ server is compromised, the attacker still can\'t easily reach the internal network.' },

    { type: 'heading', level: 3, content: 'Network Segmentation' },
    { type: 'paragraph', content: 'Segmentation divides a flat network into smaller, isolated segments. This limits the blast radius of a breach — if an attacker compromises one segment, they can\'t freely move to others.' },

    { type: 'command', command: 'ip route show', output: `10.0.1.0/24 dev vlan10 proto kernel scope link src 10.0.1.1
10.0.2.0/24 dev vlan20 proto kernel scope link src 10.0.2.1
10.0.3.0/24 dev vlan30 proto kernel scope link src 10.0.3.1
172.16.0.0/24 dev vlan100 proto kernel scope link src 172.16.0.1
default via 203.0.113.1 dev eth0`, explanation: 'VLANs separate traffic at Layer 2. Even though all devices share the same physical switches, VLAN10 (servers), VLAN20 (workstations), and VLAN30 (IoT) are isolated from each other. Traffic between VLANs must pass through a firewall.' },

    { type: 'heading', level: 2, content: 'Common Network Attacks Overview' },
    { type: 'paragraph', content: 'Here\'s a preview of the attacks we\'ll cover in detail in upcoming lessons:' },
    { type: 'list', items: [
      'Man-in-the-Middle (MitM) — Intercepting traffic between two parties',
      'DDoS (Distributed Denial of Service) — Overwhelming a target with traffic',
      'ARP Spoofing — Redirecting local traffic through attacker\'s machine',
      'DNS Poisoning — Redirecting domain lookups to malicious servers',
      'Port Scanning — Mapping open services to find vulnerabilities',
      'Packet Sniffing — Capturing unencrypted traffic on the network',
      'VLAN Hopping — Breaking out of one VLAN to access another',
      'BGP Hijacking — Rerouting internet traffic at the ISP level'
    ]},

    { type: 'heading', level: 2, content: 'Network Security Controls' },
    { type: 'paragraph', content: 'The tools and technologies we\'ll master in this module:' },
    { type: 'list', items: [
      'Firewalls — Filter traffic based on rules (next lesson)',
      'IDS/IPS — Detect and prevent known attack patterns',
      'VPNs — Encrypt traffic over untrusted networks',
      'Network Access Control (NAC) — Verify device health before granting access',
      'Web Application Firewalls (WAF) — Protect web apps from attacks',
      'Proxy Servers — Filter outbound web traffic and cache content',
      'SIEM — Centralize logs for correlation and alerting',
      'Network segmentation — Limit lateral movement',
      'Encryption (TLS, IPsec) — Protect data in transit'
    ]},

    { type: 'heading', level: 2, content: 'Network Hardening Checklist' },
    { type: 'paragraph', content: 'Quick-reference checklist for securing a network:' },
    { type: 'list', items: [
      '☐ Change all default credentials on network devices',
      '☐ Disable unnecessary services and ports',
      '☐ Implement network segmentation with VLANs',
      '☐ Deploy firewalls at each security zone boundary',
      '☐ Enable logging on all network devices',
      '☐ Use encrypted protocols (SSH not Telnet, HTTPS not HTTP)',
      '☐ Implement 802.1X port-based authentication',
      '☐ Configure DHCP snooping and Dynamic ARP Inspection',
      '☐ Keep firmware/software updated on all devices',
      '☐ Conduct regular vulnerability scanning and penetration testing',
      '☐ Monitor for anomalous traffic patterns 24/7',
      '☐ Document your network topology and maintain it current'
    ]},

    { type: 'heading', level: 2, content: 'Summary & What\'s Next' },
    { type: 'paragraph', content: 'Network security is not a single product you buy — it\'s a strategy combining multiple layers of technology, processes, and people. In the coming lessons, we\'ll dive deep into each major control:' },
    { type: 'list', items: [
      'Lesson 30: Firewalls — Your first line of defense',
      'Lesson 31: VPNs — Secure remote access',
      'Lesson 32: IDS/IPS — Detecting intrusions in real-time',
      'Lesson 33: Wireshark — Analyzing network traffic',
      'Lesson 34: Network attacks in practice',
      'Lesson 35: Wireless security deep-dive',
      'Remember: Defense in depth, least privilege, and zero trust are your guiding principles'
    ]},
  ],
  navigation: {
    prev: { title: 'Wireless Networking Fundamentals & Security', slug: 'wireless-networking' },
    next: { title: 'Firewalls: Concepts, Types & Configuration', slug: 'firewalls-configuration' },
  },
};
