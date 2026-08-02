export const lesson = {
  id: 'L32',
  title: 'Intrusion Detection & Prevention Systems (IDS/IPS)',
  slug: 'ids-ips-systems',
  type: 'PRACTICAL',
  duration: 50,
  xpReward: 35,
  difficulty: 'intermediate',
  module: { title: 'Network Security', slug: 'network-security' },
  course: { title: 'Network Security Fundamentals', slug: 'network-security-fundamentals' },
  keyTerms: [
    'IDS', 'IPS', 'Snort', 'Suricata', 'Signature-Based',
    'Anomaly-Based', 'NIDS', 'HIDS', 'False Positive',
    'False Negative', 'Alert', 'Rule'
  ],
  content: [
    { type: 'heading', content: 'Intrusion Detection & Prevention Systems (IDS/IPS)' },
    { type: 'paragraph', content: 'Firewalls control what traffic is allowed through, but they can\'t inspect the content of allowed traffic for malicious patterns. That\'s where IDS/IPS comes in — they analyze network traffic (or host activity) looking for signs of attacks, exploits, and policy violations.' },


    { type: 'callout', variant: 'info', content: 'Analogy: If a firewall is the locked door to your house, an IDS is the security camera that watches everyone who comes through the door. An IPS is a security camera connected to an automatic lock — it can slam the door shut if it sees a threat. Both watch allowed traffic for suspicious behavior.' },

    { type: 'heading', level: 2, content: 'IDS vs IPS: What\'s the Difference?' },
    { type: 'list', items: [
      'IDS (Intrusion Detection System) — PASSIVE: Monitors and alerts only',
      '  → Sees an attack, generates an alert, but does NOT block the traffic',
      '  → Like a security camera: it records the crime but doesn\'t stop it',
      '  → Deployed out-of-band (receives a copy of traffic via mirror/span port)',
      'IPS (Intrusion Prevention System) — ACTIVE: Monitors AND blocks',
      '  → Sees an attack, generates an alert, AND drops/rejects the malicious packet',
      '  → Like a security guard: it spots the threat and physically stops it',
      '  → Deployed inline (all traffic passes through it — can become a bottleneck)'
    ]},

    { type: 'callout', variant: 'warning', content: 'Trade-off: IPS can block attacks in real-time, but false positives will block legitimate traffic. IDS never disrupts traffic but can\'t stop attacks — only alert. Many organizations use IDS first to tune rules (reduce false positives), then switch to IPS mode once confident.' },

    { type: 'heading', level: 2, content: 'Detection Methods' },

    { type: 'heading', level: 3, content: '1. Signature-Based Detection' },
    { type: 'paragraph', content: 'Compares traffic against a database of known attack patterns (signatures). Like antivirus — it recognizes attacks it\'s been told about.' },
    { type: 'list', items: [
      'Very accurate for known attacks — low false positive rate',
      'Cannot detect zero-day attacks or novel variations',
      'Requires constant signature updates (like antivirus definitions)',
      'Signatures written for specific exploits, malware, or protocols',
      'Example: "Alert if packet contains /etc/passwd in HTTP response"'
    ]},


    { type: 'heading', level: 3, content: '2. Anomaly-Based Detection' },
    { type: 'paragraph', content: 'Learns what "normal" traffic looks like, then alerts on anything that deviates from the baseline. Can detect unknown (zero-day) attacks but generates more false positives.' },
    { type: 'list', items: [
      'Builds a baseline of normal network behavior over time',
      'Alerts when traffic deviates significantly from baseline',
      'Can detect novel attacks that signatures would miss',
      'Higher false positive rate — legitimate changes trigger alerts',
      'Example: "Normal HTTP traffic is 100 requests/min; suddenly seeing 10,000/min — alert!"'
    ]},

    { type: 'heading', level: 3, content: '3. Protocol-Based Detection' },
    { type: 'paragraph', content: 'Understands how protocols should behave (RFC specifications) and flags violations. If HTTP traffic contains binary data in a text field, that\'s suspicious.' },

    { type: 'heading', level: 2, content: 'IDS/IPS Deployment Types' },

    { type: 'heading', level: 3, content: 'NIDS (Network-Based IDS)' },
    { type: 'paragraph', content: 'Monitors all traffic on a network segment. Deployed at strategic points like just inside the firewall, between VLANs, or at the DMZ boundary.' },
    { type: 'list', items: [
      'Sees all traffic on the wire (or receives a mirror/span copy)',
      'Single sensor can monitor an entire subnet',
      'Cannot inspect encrypted traffic (HTTPS) without TLS termination',
      'Examples: Snort, Suricata, Zeek (formerly Bro)'
    ]},

    { type: 'heading', level: 3, content: 'HIDS (Host-Based IDS)' },
    { type: 'paragraph', content: 'Runs on individual servers/workstations. Monitors system logs, file changes, process activity, and system calls.' },
    { type: 'list', items: [
      'Can inspect encrypted traffic (sees data after decryption)',
      'Monitors file integrity (detects unauthorized changes)',
      'Higher resource overhead on each monitored host',
      'Examples: OSSEC, Wazuh, Tripwire, AIDE'
    ]},

    { type: 'heading', level: 2, content: 'Snort: The Industry Standard IDS/IPS' },
    { type: 'paragraph', content: 'Snort is the most widely used open-source IDS/IPS. Understanding Snort rules is essential for any security professional.' },

    { type: 'command', command: 'snort -V', output: `   ,,_     -*> Snort! <*-
  o"  )~   Version 3.1.43.0
   ''''    By Martin Roesch & The Snort Team
           https://snort.org`, explanation: 'Checking the installed Snort version. Snort 3 is the current major version with significant performance improvements over Snort 2.' },


    { type: 'heading', level: 3, content: 'Snort Rule Anatomy' },
    { type: 'paragraph', content: 'Snort rules define what to look for and what to do when found. Every rule has a header and options:' },

    { type: 'command', command: 'cat /etc/snort/rules/local.rules', output: `# Detect SSH brute force attempts
alert tcp any any -> $HOME_NET 22 (msg:"POSSIBLE SSH BRUTE FORCE"; \\
  flow:to_server,established; threshold:type threshold, track by_src, \\
  count 5, seconds 60; sid:1000001; rev:1;)

# Detect SQL injection in HTTP
alert tcp any any -> $HOME_NET 80 (msg:"SQL INJECTION ATTEMPT"; \\
  flow:to_server,established; content:"UNION"; nocase; \\
  content:"SELECT"; nocase; sid:1000002; rev:1;)

# Detect reverse shell connection
alert tcp $HOME_NET any -> any 4444 (msg:"POSSIBLE REVERSE SHELL"; \\
  flow:to_server,established; content:"/bin/bash"; sid:1000003; rev:1;)

# Detect ICMP tunnel (large ICMP packets)
alert icmp any any -> $HOME_NET any (msg:"POSSIBLE ICMP TUNNEL"; \\
  dsize:>800; sid:1000004; rev:1;)`, explanation: 'Four custom Snort rules: (1) Alerts after 5 SSH connections from one IP in 60 seconds (brute force). (2) Detects SQL injection keywords in HTTP traffic. (3) Catches reverse shell connections to port 4444. (4) Flags unusually large ICMP packets (data exfiltration via ICMP tunnel).' },

    { type: 'paragraph', content: 'Breaking down a Snort rule:' },
    { type: 'list', items: [
      'Action: alert (log and generate alert), drop (IPS mode: block packet), log (just log)',
      'Protocol: tcp, udp, icmp, ip',
      'Source/Destination: IP addresses and ports (any = wildcard, $HOME_NET = your network)',
      'Direction: -> (one way) or <> (bidirectional)',
      'Options in parentheses:',
      '  msg — Human-readable alert description',
      '  content — Pattern to match in packet payload',
      '  flow — Connection state (established, to_server, etc.)',
      '  threshold — Rate limiting (prevent alert flood)',
      '  sid — Unique rule identifier',
      '  rev — Rule revision number'
    ]},

    { type: 'heading', level: 2, content: 'Running Snort in IDS Mode' },
    { type: 'command', command: 'sudo snort -A alert_fast -i eth0 -c /etc/snort/snort.lua -l /var/log/snort/', output: `--------------------------------------------------
o")~   Snort++ 3.1.43.0
--------------------------------------------------
Loading /etc/snort/snort.lua:
Loading rules...
4832 rules loaded
Commencing packet processing
++ [0] eth0`, explanation: 'Starts Snort in IDS mode on interface eth0. It loads 4832 rules and begins monitoring all traffic. Alerts are written to /var/log/snort/ in fast format.' },


    { type: 'command', command: 'cat /var/log/snort/alert_fast.txt | tail -10', output: `06/15-10:45:23.456789 [**] [1:1000001:1] POSSIBLE SSH BRUTE FORCE [**] [Priority: 2] {TCP} 203.0.113.50:45678 -> 10.0.1.100:22
06/15-10:45:45.123456 [**] [1:1000001:1] POSSIBLE SSH BRUTE FORCE [**] [Priority: 2] {TCP} 203.0.113.50:45679 -> 10.0.1.100:22
06/15-10:47:12.789012 [**] [1:1000002:1] SQL INJECTION ATTEMPT [**] [Priority: 1] {TCP} 198.51.100.25:52341 -> 10.0.1.50:80
06/15-10:48:33.345678 [**] [1:1000003:1] POSSIBLE REVERSE SHELL [**] [Priority: 1] {TCP} 10.0.2.15:49876 -> 185.234.72.1:4444`, explanation: 'Real alert output: SSH brute force from 203.0.113.50, SQL injection attempt on the web server, and most critically — an internal machine (10.0.2.15) establishing a reverse shell to an external IP. That last one is a confirmed compromise!' },

    { type: 'callout', variant: 'security', content: 'Alert triage priority: The reverse shell alert (internal → external on port 4444) is the HIGHEST priority. It means an internal machine is already compromised and communicating with an attacker. SSH brute force is medium (blocked by firewall hopefully). SQL injection is high (may lead to data breach).' },

    { type: 'heading', level: 2, content: 'Suricata: Modern Alternative' },
    { type: 'paragraph', content: 'Suricata is a newer IDS/IPS engine that\'s multi-threaded (faster on modern hardware) and compatible with Snort rules. Many organizations are migrating from Snort to Suricata.' },

    { type: 'command', command: 'sudo suricata -c /etc/suricata/suricata.yaml -i eth0', output: `15/6/2024 -- 10:50:00 - <Notice> - This is Suricata version 7.0.3
15/6/2024 -- 10:50:00 - <Notice> - all 4 packet processing threads running
15/6/2024 -- 10:50:01 - <Notice> - 28456 signatures loaded`, explanation: 'Suricata starts with 4 threads (multi-core) and loads 28,456 signatures. It processes packets in parallel — much faster than single-threaded Snort on modern servers.' },

    { type: 'heading', level: 2, content: 'Dealing with False Positives' },
    { type: 'paragraph', content: 'The biggest challenge in IDS/IPS is tuning — reducing false positives without missing real attacks:' },
    { type: 'list', items: [
      'False Positive — Alert fires but it\'s NOT an actual attack (wastes analyst time)',
      'False Negative — Real attack happens but NO alert fires (the worst outcome)',
      'True Positive — Alert fires for a real attack (ideal)',
      'True Negative — No alert, no attack (ideal)',
      'Tuning strategy: Start in IDS mode, analyze alerts for 2-4 weeks, suppress noisy false positives, then enable IPS blocking for high-confidence rules'
    ]},

    { type: 'command', command: 'cat /etc/snort/rules/suppress.rules', output: `# Suppress false positives from known-good traffic
suppress gen_id 1, sig_id 2100498, track by_src, ip 10.0.5.10
# Internal vulnerability scanner triggers many alerts
suppress gen_id 1, sig_id 0, track by_src, ip 10.0.100.50`, explanation: 'Suppress rules silence specific alerts from known-good sources. Here we suppress alerts from the internal vulnerability scanner (10.0.100.50) because it intentionally triggers IDS rules during authorized scans.' },

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'paragraph', content: 'IDS/IPS is your network\'s early warning system:' },
    { type: 'list', items: [
      'IDS = Detection only (passive). IPS = Detection + Prevention (active, inline)',
      'Signature-based catches known attacks; anomaly-based catches unknown ones',
      'Deploy NIDS at network boundaries and between security zones',
      'Deploy HIDS on critical servers for file integrity and log monitoring',
      'Snort and Suricata are free, powerful, and industry-standard',
      'Tuning is essential — untunned IDS generates thousands of useless alerts',
      'IDS/IPS feeds into your SIEM for correlation and investigation',
      'Always investigate high-priority alerts: reverse shells, data exfiltration',
      'Keep signatures updated — new attacks appear daily',
      'IDS/IPS doesn\'t replace firewalls — they complement each other'
    ]},
  ],
  navigation: {
    prev: { title: 'VPN Technologies & Secure Tunneling', slug: 'vpn-secure-tunneling' },
    next: { title: 'Network Traffic Analysis with Wireshark', slug: 'wireshark-traffic-analysis' },
  },
};
