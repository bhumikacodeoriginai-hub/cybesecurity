export const lesson = {
  id: 'L35',
  title: 'Network Attacks: DDoS, DNS Poisoning & Defense',
  slug: 'network-attacks-ddos',
  type: 'PRACTICAL',
  duration: 50,
  xpReward: 35,
  difficulty: 'intermediate',
  module: { title: 'Network Security', slug: 'network-security' },
  course: { title: 'Network Security Fundamentals', slug: 'network-security-fundamentals' },
  keyTerms: [
    'DDoS', 'DoS', 'SYN Flood', 'Amplification Attack', 'Botnet',
    'DNS Poisoning', 'Cache Poisoning', 'DNS Spoofing',
    'Rate Limiting', 'Anycast', 'CDN', 'BGP Hijacking'
  ],
  content: [
    { type: 'heading', content: 'Network Attacks: DDoS, DNS Poisoning & Defense' },
    { type: 'paragraph', content: 'This lesson covers two of the most devastating network attacks: Distributed Denial of Service (DDoS) which overwhelms targets with traffic, and DNS Poisoning which silently redirects users to malicious destinations. Both can cripple organizations and both require layered defenses.' },

    { type: 'callout', variant: 'info', content: 'Analogy: DDoS is like 10,000 people calling a pizza shop simultaneously — the phone lines are jammed and real customers can\'t order. DNS poisoning is like changing the address in a phone book — when you look up "pizza shop" you get directed to a fake restaurant that steals your credit card.' },

    { type: 'heading', level: 2, content: 'Denial of Service (DoS) Attacks' },
    { type: 'paragraph', content: 'A DoS attack aims to make a service unavailable to legitimate users by overwhelming it with traffic or exploiting a vulnerability that crashes the service. DDoS uses many attacking machines (botnet) to amplify the attack.' },

    { type: 'heading', level: 3, content: 'Types of DDoS Attacks' },

    { type: 'paragraph', content: 'Volume-Based Attacks (Layer 3/4):' },
    { type: 'list', items: [
      'SYN Flood — Sends thousands of TCP SYN packets without completing the handshake',
      'UDP Flood — Overwhelms target with random UDP packets on random ports',
      'ICMP Flood (Ping of Death) — Massive volume of ICMP echo requests',
      'Amplification — Uses DNS/NTP/Memcached to multiply attack traffic 50-100x',
      'Goal: Saturate the target\'s bandwidth or exhaust connection state tables'
    ]},

    { type: 'paragraph', content: 'Application-Layer Attacks (Layer 7):' },
    { type: 'list', items: [
      'HTTP Flood — Thousands of seemingly legitimate HTTP requests',
      'Slowloris — Opens connections and sends partial headers, keeping them alive indefinitely',
      'Resource exhaustion — Requests expensive operations (complex search queries)',
      'Goal: Exhaust server resources (CPU, memory, database connections) with minimal bandwidth'
    ]},

    { type: 'heading', level: 2, content: 'SYN Flood: The Classic Attack' },
    { type: 'paragraph', content: 'TCP requires a 3-way handshake (SYN → SYN-ACK → ACK). A SYN flood sends millions of SYN packets with spoofed source IPs. The server allocates resources for each half-open connection and waits for the ACK that never comes.' },

    { type: 'command', command: 'hping3 -S --flood -V -p 80 192.168.1.100', output: `using eth0, addr: 192.168.1.200, MTU: 1500
HPING 192.168.1.100 (eth0 192.168.1.100): S set, 40 headers + 0 data bytes
hping in flood mode, no replies will be shown
^C
--- 192.168.1.100 hping statistic ---
2847563 packets transmitted, 0 packets received, 100% packet loss
round-trip min/avg/max = 0.0/0.0/0.0 ms`, explanation: 'LAB ONLY: hping3 sends 2.8 million SYN packets in seconds. The target server\'s connection table fills up, legitimate users get "connection timed out." -S = SYN flag, --flood = maximum speed, -p 80 = target port 80.' },

    { type: 'command', command: 'netstat -an | grep SYN_RECV | wc -l', output: `4096`, explanation: 'On the TARGET server during a SYN flood: 4096 half-open connections in SYN_RECV state. The backlog queue is full — new legitimate connections are dropped.' },

    { type: 'heading', level: 3, content: 'DNS Amplification Attack' },
    { type: 'paragraph', content: 'The attacker sends small DNS queries (60 bytes) to open DNS resolvers with the VICTIM\'s IP as the source. The resolvers send large responses (3000+ bytes) to the victim. Amplification factor: 50-70x.' },
    { type: 'list', items: [
      '1. Attacker spoofs source IP to match the victim\'s IP',
      '2. Sends DNS query for a large record (ANY query for a domain with many records)',
      '3. Open DNS resolver receives 60-byte query, sends 3000-byte response TO THE VICTIM',
      '4. Using 1000 open resolvers: 60KB of attack traffic → 3GB of amplified traffic hitting the victim',
      '5. Victim\'s bandwidth is completely saturated'
    ]},

    { type: 'command', command: 'dig ANY isc.org @open-resolver.example.com', output: `;; MSG SIZE  rcvd: 3456`, explanation: 'A single 60-byte query returns 3456 bytes — that\'s a 57x amplification factor. With thousands of open resolvers, this becomes devastating.' },

    { type: 'callout', variant: 'security', content: 'Why open DNS resolvers are dangerous: They answer queries from anyone, making them perfect amplification vectors. Responsible administrators configure resolvers to only answer queries from authorized clients (recursive queries disabled for external IPs).' },

    { type: 'heading', level: 2, content: 'Defending Against DDoS' },

    { type: 'heading', level: 3, content: 'Server-Level Defenses' },
    { type: 'command', command: 'sysctl -w net.ipv4.tcp_syncookies=1', output: `net.ipv4.tcp_syncookies = 1`, explanation: 'SYN cookies: Instead of allocating resources for half-open connections, the server encodes state in the SYN-ACK sequence number. Resources are only allocated after the full handshake completes. Defeats SYN floods.' },

    { type: 'command', command: 'sysctl -w net.ipv4.tcp_max_syn_backlog=65535', output: `net.ipv4.tcp_max_syn_backlog = 65535`, explanation: 'Increases the SYN backlog queue from default (128-1024) to 65535. More half-open connections can be queued before dropping new ones.' },

    { type: 'command', command: 'iptables -A INPUT -p tcp --syn -m limit --limit 100/s --limit-burst 200 -j ACCEPT\niptables -A INPUT -p tcp --syn -j DROP', output: '', explanation: 'Rate-limits incoming SYN packets to 100/second with a burst of 200. Excessive SYN packets are dropped. Simple but effective for small-scale floods.' },

    { type: 'heading', level: 3, content: 'Network-Level Defenses' },
    { type: 'list', items: [
      'CDN/Anycast — Services like Cloudflare, Akamai distribute traffic across global PoPs',
      'Scrubbing Centers — DDoS mitigation providers filter attack traffic before it reaches you',
      'BGP Blackholing — ISP drops ALL traffic to a targeted IP (last resort, causes total outage)',
      'Rate Limiting — Limit requests per IP at the load balancer/reverse proxy',
      'Geo-blocking — Block traffic from countries you don\'t serve (reduces attack surface)',
      'Over-provisioning — More bandwidth than attackers can fill (expensive but simple)'
    ]},

    { type: 'heading', level: 2, content: 'DNS Cache Poisoning' },
    { type: 'paragraph', content: 'DNS poisoning corrupts a DNS resolver\'s cache, making it return a wrong IP address for a domain. Users asking "Where is bank.com?" get directed to the attacker\'s phishing server instead of the real bank.' },

    { type: 'heading', level: 3, content: 'How DNS Poisoning Works' },
    { type: 'list', items: [
      '1. Attacker monitors when a DNS resolver queries an authoritative server',
      '2. Attacker races to send a fake response before the real one arrives',
      '3. The fake response must guess the correct Transaction ID (16-bit = 65536 possibilities)',
      '4. If the fake response arrives first with the correct ID, the resolver caches it',
      '5. ALL users of that resolver now get the poisoned (fake) IP for that domain',
      '6. Cached for the TTL duration (could be hours or days)'
    ]},

    { type: 'command', command: 'dig @poisoned-resolver bank.com +short', output: `185.234.72.99`, explanation: 'A poisoned resolver returns the attacker\'s IP (185.234.72.99) instead of the real bank server. The victim\'s browser connects to the attacker\'s phishing page that looks identical to the real bank login.' },

    { type: 'heading', level: 3, content: 'The Kaminsky Attack (2008)' },
    { type: 'paragraph', content: 'Dan Kaminsky discovered that attackers could poison ANY record in a zone, not just the one being queried. By querying random subdomains (xyz123.bank.com) and racing fake responses that include a new authoritative NS record, the attacker could hijack the entire domain.' },

    { type: 'callout', variant: 'security', content: 'The Kaminsky vulnerability was so severe that a coordinated, secret patch effort involved all major DNS software vendors simultaneously. The fix: randomize the source port of DNS queries (adding ~16 bits of entropy on top of the Transaction ID, making guessing effectively impossible).' },

    { type: 'heading', level: 2, content: 'Defending Against DNS Poisoning' },
    { type: 'list', items: [
      'DNSSEC — Cryptographically signs DNS records; resolvers can verify authenticity',
      'Source port randomization — Makes Transaction ID guessing 65,536x harder',
      'DNS over HTTPS (DoH) — Encrypts DNS queries, preventing interception',
      'DNS over TLS (DoT) — Same as DoH but on its own port (853)',
      'Limit recursive queries — Only allow recursion from authorized client IPs',
      'Short TTLs — Reduce the impact window of successful poisoning',
      'Monitor DNS responses — Alert on unexpected IP changes for critical domains',
      'Use trusted resolvers — 8.8.8.8 (Google), 1.1.1.1 (Cloudflare) are well-defended'
    ]},

    { type: 'command', command: 'dig +dnssec example.com', output: `;; flags: qr rd ra ad; QUERY: 1, ANSWER: 2
;; ANSWER SECTION:
example.com.    3600  IN  A     93.184.216.34
example.com.    3600  IN  RRSIG A 13 2 3600 20240715120000 20240615120000 12345 example.com. abcdef...`, explanation: 'DNSSEC in action: The "ad" flag (Authenticated Data) means the resolver verified the cryptographic signature. The RRSIG record contains the signature. If an attacker modifies the IP, the signature verification fails and the resolver rejects it.' },

    { type: 'heading', level: 2, content: 'BGP Hijacking' },
    { type: 'paragraph', content: 'The most sophisticated network-level attack. BGP (Border Gateway Protocol) is how internet routers share routing information. An attacker (or compromised ISP) can announce fake routes, redirecting large portions of internet traffic through their network.' },
    { type: 'list', items: [
      'BGP has no built-in authentication — routers trust announcements from peers',
      'A fake announcement can redirect traffic for an entire /24 subnet or larger',
      'Used for: traffic interception, cryptocurrency theft, government surveillance',
      'Notable incidents: YouTube hijack by Pakistan Telecom (2008), cryptocurrency theft via BGP (2018)',
      'Defense: RPKI (Resource Public Key Infrastructure) — signs route announcements',
      'Detection: BGP monitoring services alert on unexpected route changes'
    ]},

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'list', items: [
      'DDoS attacks target availability — the third pillar of the CIA triad',
      'Volumetric DDoS can exceed 1 Tbps — no single server can absorb this alone',
      'SYN cookies and rate limiting handle small attacks; CDN/scrubbing for large ones',
      'DNS poisoning targets integrity — users get wrong answers they believe are correct',
      'DNSSEC is the definitive defense against DNS poisoning but adoption is still partial',
      'BGP hijacking is rare but devastating — requires ISP-level cooperation to prevent',
      'Defense in depth: Rate limiting + CDN + anycast + DDoS mitigation service',
      'Incident response: Have a DDoS playbook ready BEFORE the attack hits',
      'The best defense for small organizations: Use Cloudflare or similar DDoS-absorbing CDN'
    ]},
  ],
  navigation: {
    prev: { title: 'Network Attacks: Man-in-the-Middle & ARP Spoofing', slug: 'network-attacks-mitm' },
    next: { title: 'Introduction to Web Security & OWASP Top 10', slug: 'intro-web-security' },
  },
};
