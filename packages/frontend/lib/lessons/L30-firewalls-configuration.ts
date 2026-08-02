export const lesson = {
  id: 'L30',
  title: 'Firewalls: Concepts, Types & Configuration',
  slug: 'firewalls-configuration',
  type: 'PRACTICAL',
  duration: 50,
  xpReward: 35,
  difficulty: 'intermediate',
  module: { title: 'Network Security', slug: 'network-security' },
  course: { title: 'Network Security Fundamentals', slug: 'network-security-fundamentals' },
  keyTerms: [
    'Firewall', 'iptables', 'nftables', 'UFW', 'Stateful Inspection',
    'Packet Filtering', 'Application Layer Gateway', 'NAT',
    'Chain', 'Rule', 'Policy', 'Zone-Based Firewall'
  ],
  content: [
    { type: 'heading', content: 'Firewalls: Concepts, Types & Configuration' },
    { type: 'paragraph', content: 'A firewall is the security guard at the network gate. It examines every packet of data trying to enter or leave your network and decides whether to allow it through, block it, or log it for investigation. Firewalls are your single most important network security control.' },

    { type: 'callout', variant: 'info', content: 'Analogy: A firewall is like airport security. Every passenger (packet) is checked against a list of rules. Some are on the "allowed" list (established connections). Some trigger alarms (known attack signatures). Some are turned away (unauthorized ports). The firewall never sleeps — it checks every single packet 24/7.' },

    { type: 'heading', level: 2, content: 'Types of Firewalls' },

    { type: 'heading', level: 3, content: '1. Packet Filtering Firewall (Stateless)' },
    { type: 'paragraph', content: 'The simplest type. It examines each packet individually based on source/destination IP, port, and protocol. It has no memory of previous packets — like a guard who checks each person\'s badge without remembering who already came through.' },
    { type: 'list', items: [
      'Fast and low overhead — simple rule matching',
      'No connection tracking — can\'t tell if a packet is part of a valid session',
      'Vulnerable to fragmentation attacks and IP spoofing',
      'Used in basic routers and ACLs (Access Control Lists)'
    ]},

    { type: 'heading', level: 3, content: '2. Stateful Inspection Firewall' },
    { type: 'paragraph', content: 'The modern standard. It tracks the state of network connections (TCP handshakes, UDP flows). It knows that a reply packet belongs to a previously allowed outbound request.' },
    { type: 'list', items: [
      'Maintains a state table of active connections',
      'Automatically allows reply traffic for established connections',
      'Can detect and block invalid packet sequences (SYN floods)',
      'Examples: iptables/nftables (Linux), Windows Firewall, pfSense'
    ]},

    { type: 'heading', level: 3, content: '3. Application Layer Firewall (Layer 7)' },
    { type: 'paragraph', content: 'Inspects the actual content of packets — not just headers. It can block specific HTTP requests, filter malicious SQL injection attempts, or restrict which applications are used.' },
    { type: 'list', items: [
      'Deep Packet Inspection (DPI) — reads application data',
      'Can block specific URLs, file types, or application behaviors',
      'Web Application Firewalls (WAF) are a subset of this type',
      'Higher performance cost — must parse every packet\'s payload',
      'Examples: ModSecurity, AWS WAF, Cloudflare WAF'
    ]},

    { type: 'heading', level: 3, content: '4. Next-Generation Firewall (NGFW)' },
    { type: 'paragraph', content: 'Combines traditional firewall, IPS, application awareness, and threat intelligence in one device:' },
    { type: 'list', items: [
      'Application identification regardless of port (Facebook on port 443)',
      'Integrated Intrusion Prevention System (IPS)',
      'SSL/TLS inspection (decrypt, inspect, re-encrypt)',
      'Threat intelligence feeds for known malicious IPs/domains',
      'User identity awareness (rules based on user, not just IP)',
      'Examples: Palo Alto, Fortinet FortiGate, Cisco Firepower'
    ]},

    { type: 'heading', level: 2, content: 'Linux Firewalls: iptables' },
    { type: 'paragraph', content: 'iptables is the traditional Linux firewall. It processes packets through chains of rules. Understanding iptables is essential — most servers and security appliances run Linux.' },

    { type: 'heading', level: 3, content: 'The Three Default Chains' },
    { type: 'list', items: [
      'INPUT — Rules for traffic coming INTO this machine',
      'OUTPUT — Rules for traffic leaving FROM this machine',
      'FORWARD — Rules for traffic passing THROUGH this machine (routing)'
    ]},

    { type: 'command', command: 'sudo iptables -L -n -v', output: `Chain INPUT (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination
 1234  98K ACCEPT     all  --  lo     *       0.0.0.0/0            0.0.0.0/0
  567  45K ACCEPT     all  --  *      *       0.0.0.0/0            0.0.0.0/0            state RELATED,ESTABLISHED
   89  5K  ACCEPT     tcp  --  *      *       0.0.0.0/0            0.0.0.0/0            tcp dpt:22
   45  3K  ACCEPT     tcp  --  *      *       0.0.0.0/0            0.0.0.0/0            tcp dpt:80
   23  2K  ACCEPT     tcp  --  *      *       0.0.0.0/0            0.0.0.0/0            tcp dpt:443
    0     0 DROP       all  --  *      *       0.0.0.0/0            0.0.0.0/0

Chain FORWARD (policy DROP 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination

Chain OUTPUT (policy ACCEPT 8765 packets, 1234K bytes)
 pkts bytes target     prot opt in     out     source               destination`, explanation: 'This shows a typical server firewall: Allow loopback (lo), allow established connections, allow SSH (22), HTTP (80), HTTPS (443), DROP everything else. The FORWARD chain is empty (this isn\'t a router).' },

    { type: 'heading', level: 3, content: 'Building Firewall Rules' },
    { type: 'paragraph', content: 'iptables rules follow this format: iptables -A [CHAIN] [conditions] -j [ACTION]' },

    { type: 'command', command: 'sudo iptables -A INPUT -p tcp --dport 22 -s 10.0.0.0/8 -j ACCEPT', output: '', explanation: 'Allow SSH (port 22) ONLY from internal network (10.0.0.0/8). This means remote SSH is only accessible from within the corporate network.' },

    { type: 'command', command: 'sudo iptables -A INPUT -p tcp --dport 22 -j DROP', output: '', explanation: 'DROP all other SSH attempts. Combined with the rule above, SSH is restricted to internal networks only. Order matters — iptables processes rules top to bottom!' },

    { type: 'command', command: 'sudo iptables -A INPUT -p icmp --icmp-type echo-request -m limit --limit 1/second -j ACCEPT', output: '', explanation: 'Allow ping but limit to 1 per second. This prevents ICMP flood attacks while still allowing legitimate connectivity testing.' },

    { type: 'command', command: 'sudo iptables -A INPUT -p tcp --dport 80 -m connlimit --connlimit-above 50 -j REJECT', output: '', explanation: 'Reject HTTP connections if a single IP has more than 50 simultaneous connections. This provides basic DDoS protection against connection floods.' },

    { type: 'callout', variant: 'warning', content: 'Critical rule: Always allow established/related connections BEFORE your DROP rules! Otherwise, outgoing connections (like downloading updates) won\'t receive replies. Rule order: (1) Allow loopback, (2) Allow ESTABLISHED,RELATED, (3) Allow specific services, (4) DROP/REJECT everything else.' },

    { type: 'heading', level: 2, content: 'UFW: Uncomplicated Firewall' },
    { type: 'paragraph', content: 'UFW is a user-friendly frontend for iptables. It\'s the recommended firewall for Ubuntu/Debian systems and is much easier to configure for beginners.' },

    { type: 'command', command: 'sudo ufw status verbose', output: `Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), disabled (routed)
New profiles: skip

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW IN    10.0.0.0/8
80/tcp                     ALLOW IN    Anywhere
443/tcp                    ALLOW IN    Anywhere
3306/tcp                   ALLOW IN    10.0.5.0/24`, explanation: 'Clean, readable output. Default deny incoming (secure), allow outgoing. SSH limited to internal, HTTP/HTTPS open to all, MySQL only from the app server subnet.' },

    { type: 'command', command: 'sudo ufw allow from 10.0.0.0/8 to any port 22 proto tcp', output: `Rule added`, explanation: 'Allows SSH from internal network only. Much simpler syntax than raw iptables!' },

    { type: 'command', command: 'sudo ufw deny from 192.168.1.100', output: `Rule added`, explanation: 'Blocks ALL traffic from a specific IP. Useful for quickly blocking a known attacker while you investigate.' },

    { type: 'command', command: 'sudo ufw enable', output: `Firewall is active and enabled on system startup`, explanation: 'Activates the firewall. WARNING: Make sure SSH is allowed first, or you\'ll lock yourself out of a remote server!' },

    { type: 'heading', level: 2, content: 'Firewall Best Practices' },
    { type: 'list', items: [
      'Default DENY — Block everything, then allow only what\'s needed',
      'Principle of Least Privilege — Open only necessary ports to only necessary sources',
      'Log denied traffic — You can\'t investigate what you can\'t see',
      'Test rules before applying — A wrong rule can lock you out',
      'Document every rule — Include WHY each rule exists',
      'Review rules quarterly — Remove rules for decommissioned services',
      'Place rules in correct order — First match wins in iptables',
      'Use connection tracking — Allow ESTABLISHED,RELATED for return traffic',
      'Rate limit exposed services — Prevents brute-force and DDoS',
      'Separate rules for management access — Restrict admin interfaces heavily'
    ]},

    { type: 'heading', level: 2, content: 'Practical Scenario: Securing a Web Server' },
    { type: 'paragraph', content: 'Let\'s build a complete firewall for a production web server that also runs SSH for administration:' },

    { type: 'command', command: `sudo iptables -F
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP
sudo iptables -P OUTPUT ACCEPT
sudo iptables -A INPUT -i lo -j ACCEPT
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 22 -s 10.0.0.0/8 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables -A INPUT -p icmp --icmp-type echo-request -m limit --limit 1/s -j ACCEPT
sudo iptables -A INPUT -j LOG --log-prefix "FIREWALL_DENIED: "
sudo iptables -A INPUT -j DROP`, output: '', explanation: 'Complete server firewall: Flush old rules, set default DENY, allow loopback, allow replies to our connections, allow SSH from internal only, allow web traffic, allow limited ping, log all denied packets, then drop them. This is a solid production configuration.' },

    { type: 'callout', variant: 'security', content: 'The LOG rule before the final DROP is critical for security monitoring. Every blocked connection attempt is logged to /var/log/syslog with the prefix "FIREWALL_DENIED:". Your SIEM can alert on patterns like repeated blocked SSH attempts from the same IP (brute force attack).' },

    { type: 'heading', level: 2, content: 'Verifying Your Firewall' },
    { type: 'paragraph', content: 'After configuring a firewall, always verify it works as expected from outside:' },

    { type: 'command', command: 'nmap -sT 203.0.113.50 -p 22,80,443,3306,8080', output: `Starting Nmap 7.93
Nmap scan report for 203.0.113.50
PORT     STATE    SERVICE
22/tcp   filtered ssh
80/tcp   open     http
443/tcp  open     https
3306/tcp filtered mysql
8080/tcp filtered http-proxy

Nmap done: 1 IP address (1 host up) scanned in 3.42 seconds`, explanation: 'Scanning from an external IP confirms: HTTP/HTTPS are open (as intended), SSH and MySQL are "filtered" (firewall drops packets silently — the attacker can\'t tell if the service exists or not). This is exactly what we want.' },

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'paragraph', content: 'Firewalls are your first line of defense, but they\'re not a silver bullet:' },
    { type: 'list', items: [
      'A firewall can\'t protect against attacks through allowed ports (SQLi through port 443)',
      'Firewalls must be combined with IDS/IPS, WAF, and monitoring',
      'Default DENY is non-negotiable — only open what you explicitly need',
      'Stateful inspection is the minimum — use NGFW where budget allows',
      'Log everything — firewall logs are goldmine for incident investigation',
      'Test your firewall regularly with port scans from outside',
      'Keep firewall rules simple and documented — complexity breeds mistakes',
      'A misconfigured firewall is worse than no firewall (false sense of security)'
    ]},
  ],
  navigation: {
    prev: { title: 'Introduction to Network Security', slug: 'intro-network-security' },
    next: { title: 'VPN Technologies & Secure Tunneling', slug: 'vpn-secure-tunneling' },
  },
};
