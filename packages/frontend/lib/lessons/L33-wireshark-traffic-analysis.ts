export const lesson = {
  id: 'L33',
  title: 'Network Traffic Analysis with Wireshark',
  slug: 'wireshark-traffic-analysis',
  type: 'PRACTICAL',
  duration: 55,
  xpReward: 40,
  difficulty: 'intermediate',
  module: { title: 'Network Security', slug: 'network-security' },
  course: { title: 'Network Security Fundamentals', slug: 'network-security-fundamentals' },
  keyTerms: [
    'Wireshark', 'Packet Capture', 'pcap', 'Display Filter',
    'Capture Filter', 'Protocol Dissector', 'Follow Stream',
    'TCP Handshake', 'Packet Analysis', 'tshark'
  ],
  content: [
    { type: 'heading', content: 'Network Traffic Analysis with Wireshark' },
    { type: 'paragraph', content: 'Wireshark is the world\'s most popular network protocol analyzer. It captures every packet on a network interface and lets you inspect them in detail. For security professionals, Wireshark is like a microscope for network traffic — it reveals exactly what\'s happening on the wire, byte by byte.' },


    { type: 'callout', variant: 'info', content: 'Analogy: Imagine you could open every envelope going through a post office, read the letter inside, see who sent it, who it\'s for, and which route it took. That\'s what Wireshark does for network packets. It\'s one of the most powerful tools for both defenders (investigating incidents) and attackers (sniffing credentials).' },

    { type: 'heading', level: 2, content: 'Packet Capture Basics' },
    { type: 'paragraph', content: 'Before analyzing traffic, you need to capture it. There are two approaches:' },
    { type: 'list', items: [
      'Live capture — Monitor traffic in real-time on a network interface',
      'Offline analysis — Open a previously saved capture file (.pcap or .pcapng)',
      'Wireshark (GUI) — Full graphical interface for interactive analysis',
      'tshark (CLI) — Command-line version for scripting and remote servers',
      'tcpdump (CLI) — Lightweight capture tool, saves files Wireshark can open'
    ]},

    { type: 'heading', level: 3, content: 'Capturing with tcpdump' },
    { type: 'command', command: 'sudo tcpdump -i eth0 -w capture.pcap -c 1000', output: `tcpdump: listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
1000 packets captured
1000 packets received by filter
0 packets dropped by kernel`, explanation: 'Captures 1000 packets on eth0 and saves to capture.pcap. The -w flag writes raw packets (open in Wireshark later). Use -c to limit packet count, or Ctrl+C to stop manually.' },

    { type: 'command', command: 'sudo tcpdump -i eth0 -nn port 80 or port 443', output: `10:52:01.123456 IP 10.0.2.15.49876 > 93.184.216.34.80: Flags [S], seq 1234567890
10:52:01.145678 IP 93.184.216.34.80 > 10.0.2.15.49876: Flags [S.], seq 987654321, ack 1234567891
10:52:01.145890 IP 10.0.2.15.49876 > 93.184.216.34.80: Flags [.], ack 1
10:52:01.146012 IP 10.0.2.15.49876 > 93.184.216.34.80: Flags [P.], seq 1:475, ack 1
10:52:01.167234 IP 93.184.216.34.80 > 10.0.2.15.49876: Flags [.], ack 475
10:52:01.167456 IP 93.184.216.34.80 > 10.0.2.15.49876: Flags [P.], seq 1:1257, ack 475`, explanation: 'Live capture of HTTP/HTTPS traffic. You can see the TCP 3-way handshake: SYN [S], SYN-ACK [S.], ACK [.]. Then data exchange [P.] (push flag = data). -nn prevents DNS/port name lookups for speed.' },


    { type: 'heading', level: 2, content: 'Wireshark Display Filters' },
    { type: 'paragraph', content: 'Display filters are Wireshark\'s most powerful feature. They let you find the specific packets you need among millions of captured packets. Learn these and you\'ll solve problems 10x faster.' },

    { type: 'heading', level: 3, content: 'Essential Display Filters' },
    { type: 'command', command: 'tshark -r capture.pcap -Y "ip.addr == 10.0.2.15"', output: `  1 0.000000 10.0.2.15 → 93.184.216.34 TCP 74 49876 → 80 [SYN]
  2 0.022234 93.184.216.34 → 10.0.2.15 TCP 74 80 → 49876 [SYN, ACK]
  3 0.022456 10.0.2.15 → 93.184.216.34 TCP 66 49876 → 80 [ACK]
  4 0.023012 10.0.2.15 → 93.184.216.34 HTTP 541 GET / HTTP/1.1
  5 0.045234 93.184.216.34 → 10.0.2.15 HTTP 1323 HTTP/1.1 200 OK`, explanation: 'Filter: Show only packets involving IP 10.0.2.15. tshark is the CLI version of Wireshark — same filters, no GUI needed.' },

    { type: 'paragraph', content: 'Common display filter patterns:' },
    { type: 'list', items: [
      'ip.addr == 10.0.2.15 — Any packet with this IP (source OR destination)',
      'ip.src == 10.0.2.15 — Only packets FROM this IP',
      'ip.dst == 10.0.2.15 — Only packets TO this IP',
      'tcp.port == 80 — Any TCP packet on port 80',
      'tcp.dstport == 443 — TCP packets destined for port 443',
      'http — All HTTP traffic (layer 7 protocol filter)',
      'dns — All DNS queries and responses',
      'tcp.flags.syn == 1 — Only SYN packets (connection attempts)',
      'tcp.flags.rst == 1 — Only RST packets (rejected connections)',
      'frame.len > 1000 — Packets larger than 1000 bytes',
      '!(arp or dns) — Everything EXCEPT ARP and DNS (reduces noise)',
      'http.request.method == "POST" — Only HTTP POST requests (contain form data)'
    ]},

    { type: 'heading', level: 2, content: 'Security Analysis Scenarios' },

    { type: 'heading', level: 3, content: 'Scenario 1: Detecting Credential Theft (HTTP)' },
    { type: 'paragraph', content: 'On unencrypted HTTP, login credentials are visible in plain text. This is why HTTPS is mandatory.' },

    { type: 'command', command: 'tshark -r capture.pcap -Y "http.request.method == POST" -T fields -e ip.src -e http.host -e http.request.uri -e http.file_data', output: `10.0.2.15\tlogin.insecure-site.com\t/auth/login\tusername=admin&password=P@ssw0rd123!`, explanation: 'CRITICAL FINDING: A user submitted login credentials over plain HTTP. The username "admin" and password "P@ssw0rd123!" are completely visible. On a shared network (coffee shop WiFi), any attacker running Wireshark would capture these.' },

    { type: 'callout', variant: 'security', content: 'This is exactly why HTTPS exists. With TLS encryption, the same login would show only encrypted gibberish. If you find plain HTTP login forms during a security audit, it\'s a critical vulnerability. Any network-level attacker can steal credentials.' },


    { type: 'heading', level: 3, content: 'Scenario 2: Identifying a Port Scan' },
    { type: 'command', command: 'tshark -r capture.pcap -Y "tcp.flags.syn == 1 && tcp.flags.ack == 0" -T fields -e ip.src -e ip.dst -e tcp.dstport | sort | uniq -c | sort -rn | head -10', output: `   445 203.0.113.50    10.0.1.100    22
   445 203.0.113.50    10.0.1.100    23
   445 203.0.113.50    10.0.1.100    25
   445 203.0.113.50    10.0.1.100    80
   445 203.0.113.50    10.0.1.100    110
   445 203.0.113.50    10.0.1.100    143
   445 203.0.113.50    10.0.1.100    443
   445 203.0.113.50    10.0.1.100    445
   445 203.0.113.50    10.0.1.100    993
   445 203.0.113.50    10.0.1.100    3389`, explanation: 'Clear port scan pattern: One source IP (203.0.113.50) sending SYN packets to many different ports on the same target. This is nmap-style reconnaissance — the attacker is mapping which services are running.' },

    { type: 'heading', level: 3, content: 'Scenario 3: Detecting DNS Exfiltration' },
    { type: 'command', command: 'tshark -r capture.pcap -Y "dns.qry.name contains \\"data\\"" -T fields -e ip.src -e dns.qry.name | head -5', output: `10.0.2.15\tZW5jb2RlZF9zZWNyZXRfZGF0YQ==.data.evil-c2.com
10.0.2.15\tY3JlZGVudGlhbHNfZXhmaWw=.data.evil-c2.com
10.0.2.15\tZGF0YWJhc2VfZHVtcF9wYXJ0MQ==.data.evil-c2.com
10.0.2.15\tZGF0YWJhc2VfZHVtcF9wYXJ0Mg==.data.evil-c2.com
10.0.2.15\tZGF0YWJhc2VfZHVtcF9wYXJ0Mw==.data.evil-c2.com`, explanation: 'DNS tunneling detected! Encoded data (base64) in DNS subdomain queries going to evil-c2.com. The attacker is exfiltrating stolen data through DNS queries — this bypasses most firewalls since DNS (port 53) is almost always allowed outbound.' },

    { type: 'command', command: 'echo "ZW5jb2RlZF9zZWNyZXRfZGF0YQ==" | base64 -d', output: `encoded_secret_data`, explanation: 'Decoding the base64 subdomain reveals the exfiltrated data. Real-world attackers use this technique to steal credentials and documents through DNS — it\'s very hard to detect without monitoring DNS query patterns.' },

    { type: 'heading', level: 3, content: 'Scenario 4: Following a TCP Stream' },
    { type: 'paragraph', content: 'Wireshark can reassemble an entire TCP conversation (both sides) into readable text. This is invaluable for seeing exactly what happened during a connection.' },

    { type: 'command', command: 'tshark -r capture.pcap -Y "tcp.stream == 5" -z "follow,tcp,ascii,5"', output: `===================================================================
Follow: tcp,ascii
Filter: tcp.stream eq 5
Node 0: 10.0.2.15:49876
Node 1: 10.0.1.100:22
Contents:
SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.4
SSH-2.0-PuTTY_Release_0.78
===================================================================`, explanation: 'Following TCP stream #5 reveals an SSH connection. We can see the server banner (OpenSSH 8.9 on Ubuntu) and client (PuTTY 0.78). With unencrypted protocols (HTTP, FTP, Telnet), you\'d see the entire conversation in plain text.' },


    { type: 'heading', level: 2, content: 'Advanced Analysis Techniques' },

    { type: 'heading', level: 3, content: 'Statistics: Protocol Hierarchy' },
    { type: 'command', command: 'tshark -r capture.pcap -z io,phs', output: `===================================================================
Protocol Hierarchy Statistics
Filter:

eth                              frames:45231 bytes:32451234
  ip                             frames:44892 bytes:32123456
    tcp                          frames:38421 bytes:28945678
      http                       frames:3421  bytes:4567890
      tls                        frames:28934 bytes:21456789
      ssh                        frames:2341  bytes:1234567
    udp                          frames:6471  bytes:3177778
      dns                        frames:5234  bytes:2345678
      dhcp                       frames:12    bytes:4320
    icmp                         frames:339   bytes:45678
  arp                            frames:339   bytes:20340
===================================================================`, explanation: 'Protocol hierarchy shows traffic distribution. Most traffic is TLS-encrypted (good!). The high DNS count (5234 queries) might be worth investigating — is it normal, or is someone tunneling data through DNS?' },

    { type: 'heading', level: 3, content: 'Finding Suspicious Conversations' },
    { type: 'command', command: 'tshark -r capture.pcap -z conv,tcp -q | sort -k 10 -rn | head -5', output: `TCP Conversations
                                               |       <-      | |       ->      | |     Total     |
                                               | Frames  Bytes | | Frames  Bytes | | Frames  Bytes |
10.0.2.15:49876      <-> 185.234.72.1:4444       1234   89012    2345   5678901    3579   5767913
10.0.2.15:52341      <-> 93.184.216.34:443        456   34567     567   456789     1023   491356
10.0.2.15:48123      <-> 142.250.80.46:443        234   23456     345   234567      579   258023`, explanation: 'TOP FINDING: Massive data transfer (5.7 MB) between internal host 10.0.2.15 and external IP 185.234.72.1 on port 4444. Port 4444 is commonly used for reverse shells (Metasploit default). This needs immediate investigation!' },

    { type: 'callout', variant: 'security', content: 'When investigating a potential breach: (1) Identify the internal host communicating with suspicious external IPs. (2) Check the port — common C2 ports include 4444, 5555, 8080, 8888. (3) Look at data volume — large outbound transfers suggest exfiltration. (4) Follow the stream to see the actual data exchanged.' },

    { type: 'heading', level: 2, content: 'Capture Filters vs Display Filters' },
    { type: 'paragraph', content: 'Important distinction — they use different syntax!' },
    { type: 'list', items: [
      'Capture filters (BPF syntax) — Applied BEFORE packets are saved. Reduces file size.',
      '  Example: "host 10.0.2.15 and port 80" (only capture HTTP to/from this host)',
      '  Use when you know what you\'re looking for ahead of time',
      'Display filters (Wireshark syntax) — Applied AFTER capture. All packets are saved.',
      '  Example: "http.request.method == POST && ip.src == 10.0.2.15"',
      '  Use for investigation when you need to explore the full capture',
      'Best practice: Capture everything, filter during analysis. You can\'t analyze what you didn\'t capture!'
    ]},

    { type: 'heading', level: 2, content: 'Wireshark for Incident Response' },
    { type: 'paragraph', content: 'A practical workflow for analyzing a security incident:' },
    { type: 'list', items: [
      '1. Get the timeline — When did the suspicious activity start?',
      '2. Identify the players — Which internal/external IPs are involved?',
      '3. Check DNS — What domains were resolved? (reveals C2 infrastructure)',
      '4. Follow streams — What data was exchanged?',
      '5. Check for exfiltration — Large outbound data transfers to unknown IPs',
      '6. Look for lateral movement — Internal-to-internal connections on admin ports',
      '7. Export artifacts — Files transferred, credentials captured, malware downloads',
      '8. Document findings — Timestamps, IPs, protocols, evidence for the report'
    ]},

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'paragraph', content: 'Wireshark and packet analysis are essential skills for any security professional:' },
    { type: 'list', items: [
      'Packet captures provide irrefutable evidence of what happened on the network',
      'Unencrypted protocols (HTTP, FTP, Telnet) expose everything to packet analysis',
      'Learn display filters deeply — they\'re your primary investigation tool',
      'DNS analysis reveals C2 communication and data exfiltration',
      'Protocol hierarchy statistics quickly identify anomalies',
      'Conversation statistics show who\'s talking to whom and how much data flows',
      'Save full captures during incidents — you may discover more context later',
      'tshark for automation and remote servers, Wireshark GUI for deep analysis',
      'Ethical note: Only capture traffic you\'re authorized to monitor'
    ]},
  ],
  navigation: {
    prev: { title: 'Intrusion Detection & Prevention Systems', slug: 'ids-ips-systems' },
    next: { title: 'Network Attacks in Practice', slug: 'network-attacks-practice' },
  },
};
