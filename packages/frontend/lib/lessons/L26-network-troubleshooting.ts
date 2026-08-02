export const lesson = {
  id: 'L26',
  title: 'Network Troubleshooting & Diagnostics',
  slug: 'network-troubleshooting',
  type: 'PRACTICAL',
  duration: 45,
  xpReward: 30,
  difficulty: 'intermediate',
  module: { title: 'Computer Networking', slug: 'computer-networking' },
  course: { title: 'Network Fundamentals', slug: 'network-fundamentals' },
  keyTerms: [
    'ping', 'traceroute', 'nslookup', 'dig', 'netstat', 'ss',
    'ifconfig', 'ip', 'MTU', 'Latency', 'Packet Loss', 'DNS Resolution'
  ],
  content: [
    { type: 'heading', content: 'Network Troubleshooting & Diagnostics' },
    { type: 'paragraph', content: 'When networks break, you need to diagnose the problem systematically. Network troubleshooting is like being a detective — you gather evidence layer by layer until you find the culprit. For security professionals, these same tools reveal attacks in progress.' },

    { type: 'callout', variant: 'info', content: 'Analogy: Imagine sending a letter. If it never arrives, you check: Is the mailbox working? (NIC) Is the address correct? (DNS) Is the road open? (routing) Is the recipient home? (port/service). Network troubleshooting follows the same bottom-up logic.' },

    { type: 'heading', level: 2, content: 'The Systematic Approach: Bottom-Up' },
    { type: 'paragraph', content: 'Always troubleshoot from the bottom of the OSI model upward. This prevents wasting time on application issues when the cable is unplugged:' },
    { type: 'list', items: [
      'Layer 1 (Physical) — Is the cable connected? Is the WiFi adapter active?',
      'Layer 2 (Data Link) — Is the NIC getting an IP via DHCP? ARP working?',
      'Layer 3 (Network) — Can you ping the gateway? Can you reach external IPs?',
      'Layer 4 (Transport) — Are ports open? Is the firewall blocking connections?',
      'Layer 7 (Application) — Is DNS resolving? Is the service responding?'
    ]},

    { type: 'heading', level: 2, content: 'Checking Your Network Interface' },
    { type: 'paragraph', content: 'First, verify your own network configuration is correct. The `ip` command (modern replacement for ifconfig) shows your interfaces and addresses.' },

    { type: 'command', command: 'ip addr show', output: `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP
    link/ether 08:00:27:a5:b3:c1 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.105/24 brd 192.168.1.255 scope global dynamic eth0
       valid_lft 86145sec preferred_lft 86145sec
3: wlan0: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN
    link/ether 00:1a:2b:3c:4d:5e brd ff:ff:ff:ff:ff:ff`, explanation: 'Shows all network interfaces. eth0 is UP with IP 192.168.1.105/24. wlan0 is DOWN (disabled). "state UP" means the link is active.' },

    { type: 'command', command: 'ip route show', output: `default via 192.168.1.1 dev eth0 proto dhcp metric 100
192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.105 metric 100`, explanation: 'Shows the routing table. The default gateway is 192.168.1.1 — all traffic not destined for the local network goes through this router.' },

    { type: 'callout', variant: 'security', content: 'Security check: If you see unexpected routes (especially a different default gateway), someone may have performed ARP spoofing or DHCP poisoning. An attacker can redirect your traffic through their machine by changing your gateway.' },

    { type: 'heading', level: 2, content: 'Testing Connectivity with ping' },
    { type: 'paragraph', content: 'The `ping` command sends ICMP Echo Request packets and waits for replies. It tests basic IP connectivity — like shouting "Can you hear me?" across a room.' },

    { type: 'command', command: 'ping -c 4 192.168.1.1', output: `PING 192.168.1.1 (192.168.1.1) 56(84) bytes of data.
64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=1.23 ms
64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.98 ms
64 bytes from 192.168.1.1: icmp_seq=3 ttl=64 time=1.05 ms
64 bytes from 192.168.1.1: icmp_seq=4 ttl=64 time=1.12 ms

--- 192.168.1.1 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3005ms
rtt min/avg/max/mdev = 0.980/1.095/1.230/0.090 ms`, explanation: 'Successfully pinged the gateway. 0% packet loss means connectivity is healthy. TTL=64 means the packet didn\'t cross any routers (still on local network).' },

    { type: 'command', command: 'ping -c 4 8.8.8.8', output: `PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=14.3 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=13.8 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=118 time=14.1 ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=118 time=13.9 ms

--- 8.8.8.8 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 13.800/14.025/14.300/0.186 ms`, explanation: 'Successfully reached Google DNS (internet). TTL=118 means the packet crossed ~10 routers (started at 128). Latency of ~14ms is normal for internet targets.' },

    { type: 'paragraph', content: 'Interpreting ping results:' },
    { type: 'list', items: [
      '0% packet loss — Healthy connection',
      '1-5% packet loss — Congestion or wireless interference',
      '10%+ packet loss — Serious network problem or attack',
      '100% loss to gateway but NIC is up — ARP issue or gateway down',
      'Can ping IPs but not hostnames — DNS is broken, not the network itself',
      'Increasing latency — Network congestion, possible DDoS upstream'
    ]},

    { type: 'heading', level: 2, content: 'Tracing the Route with traceroute' },
    { type: 'paragraph', content: 'When you can\'t reach a destination, traceroute shows you exactly where the connection fails — like GPS tracking for your packets.' },

    { type: 'command', command: 'traceroute -n 8.8.8.8', output: `traceroute to 8.8.8.8 (8.8.8.8), 30 hops max, 60 byte packets
 1  192.168.1.1     1.234 ms  1.123 ms  1.098 ms
 2  10.0.0.1        5.678 ms  5.432 ms  5.567 ms
 3  72.14.215.85   10.234 ms  9.987 ms 10.123 ms
 4  108.170.252.1  11.567 ms 11.234 ms 11.456 ms
 5  142.251.49.24  12.890 ms 12.567 ms 12.789 ms
 6  * * *
 7  8.8.8.8        14.123 ms 13.987 ms 14.056 ms`, explanation: 'Each hop is a router between you and the destination. Hop 6 shows "* * *" meaning that router doesn\'t respond to traceroute probes (common security policy). The -n flag prevents DNS lookups for speed.' },

    { type: 'callout', variant: 'warning', content: 'If traceroute shows your packets being routed through unexpected countries or networks, this could indicate BGP hijacking — an attacker rerouting internet traffic through their infrastructure to intercept it.' },

    { type: 'heading', level: 2, content: 'DNS Troubleshooting' },
    { type: 'paragraph', content: 'DNS is the phonebook of the internet. If DNS breaks, you can reach IP addresses but not websites. Two essential tools: nslookup (simple) and dig (detailed).' },

    { type: 'command', command: 'nslookup google.com', output: `Server:		192.168.1.1
Address:	192.168.1.1#53

Non-authoritative answer:
Name:	google.com
Address: 142.250.80.46
Name:	google.com
Address: 2607:f8b0:4004:800::200e`, explanation: 'Your DNS server (192.168.1.1) resolved google.com to 142.250.80.46. "Non-authoritative" means the answer came from cache, not directly from Google\'s nameservers.' },

    { type: 'command', command: 'dig example.com +short', output: `93.184.216.34`, explanation: 'dig with +short gives just the IP. Useful for quick checks.' },

    { type: 'command', command: 'dig example.com ANY', output: `; <<>> DiG 9.16.1 <<>> example.com ANY
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 45678
;; flags: qr rd ra; QUERY: 1, ANSWER: 6, AUTHORITY: 0, ADDITIONAL: 1

;; ANSWER SECTION:
example.com.    3600  IN  A       93.184.216.34
example.com.    3600  IN  AAAA    2606:2800:220:1:248:1893:25c8:1946
example.com.    3600  IN  MX      10 mail.example.com.
example.com.    3600  IN  NS      ns1.example.com.
example.com.    3600  IN  NS      ns2.example.com.
example.com.    86400 IN  SOA     ns1.example.com. admin.example.com. 2024010101 3600 900 604800 86400

;; Query time: 23 msec
;; SERVER: 192.168.1.1#53(192.168.1.1)
;; WHEN: Sat Jun 15 10:30:45 UTC 2024
;; MSG SIZE  rcvd: 312`, explanation: 'Shows ALL DNS records for example.com. A = IPv4 address, AAAA = IPv6, MX = mail server, NS = nameservers, SOA = zone authority. Useful for reconnaissance.' },

    { type: 'callout', variant: 'security', content: 'DNS poisoning attack: If "dig" returns an unexpected IP for a known site, someone may have poisoned the DNS cache. Verify by querying a known-good server directly: "dig @8.8.8.8 example.com" — this bypasses your local DNS.' },

    { type: 'heading', level: 2, content: 'Checking Port Connectivity' },
    { type: 'paragraph', content: 'Sometimes ping works (ICMP is allowed) but the service you need is blocked. You need to test specific TCP ports.' },

    { type: 'command', command: 'ss -tulnp', output: `Netid  State   Recv-Q  Send-Q   Local Address:Port   Peer Address:Port  Process
tcp    LISTEN  0       128      0.0.0.0:22            0.0.0.0:*          users:(("sshd",pid=847,fd=3))
tcp    LISTEN  0       511      0.0.0.0:80            0.0.0.0:*          users:(("nginx",pid=1234,fd=6))
tcp    LISTEN  0       128      0.0.0.0:443           0.0.0.0:*          users:(("nginx",pid=1234,fd=7))
tcp    LISTEN  0       80       127.0.0.1:3306        0.0.0.0:*          users:(("mysqld",pid=891,fd=22))
udp    UNCONN  0       0        0.0.0.0:68            0.0.0.0:*          users:(("dhclient",pid=456,fd=7))`, explanation: 'ss (socket statistics) shows listening ports. -t=TCP, -u=UDP, -l=listening, -n=numeric, -p=process name. MySQL on 127.0.0.1 means local-only access (secure). SSH/HTTP/HTTPS on 0.0.0.0 means accessible from any interface.' },

    { type: 'command', command: 'nc -zv 192.168.1.50 22', output: `Connection to 192.168.1.50 22 port [tcp/ssh] succeeded!`, explanation: 'Netcat tests if port 22 is open on the target. -z means just scan (don\'t send data), -v means verbose. Useful for testing firewall rules.' },

    { type: 'command', command: 'nc -zv 192.168.1.50 3389', output: `nc: connect to 192.168.1.50 port 3389 (tcp) failed: Connection refused`, explanation: 'Port 3389 (RDP) is closed or blocked on the target. "Connection refused" means the port is closed. A timeout means a firewall is silently dropping packets.' },

    { type: 'heading', level: 2, content: 'ARP Table and Layer 2 Diagnostics' },
    { type: 'paragraph', content: 'ARP maps IP addresses to MAC addresses on your local network. ARP issues cause local connectivity failures.' },

    { type: 'command', command: 'ip neigh show', output: `192.168.1.1 dev eth0 lladdr 00:11:22:33:44:55 REACHABLE
192.168.1.50 dev eth0 lladdr aa:bb:cc:dd:ee:ff STALE
192.168.1.102 dev eth0 lladdr 08:00:27:xx:yy:zz REACHABLE`, explanation: 'Shows the ARP table (IP to MAC mappings). REACHABLE means recently confirmed. STALE means cached but not verified recently. If two IPs have the same MAC, someone is ARP spoofing.' },

    { type: 'callout', variant: 'security', content: 'ARP spoofing detection: If you see the gateway IP (192.168.1.1) with a MAC address different from the real router, an attacker is intercepting your traffic. Compare with "arp -a" on a known-clean machine or check the router\'s physical MAC label.' },

    { type: 'heading', level: 2, content: 'Troubleshooting Workflow: Real Scenario' },
    { type: 'paragraph', content: 'Problem: A user reports "I can\'t reach company-internal.com". Here\'s the systematic approach:' },

    { type: 'command', command: 'ping -c 2 192.168.1.1', output: `2 packets transmitted, 2 received, 0% packet loss`, explanation: 'Step 1: Gateway reachable ✓ — Layer 1-3 local network is fine.' },

    { type: 'command', command: 'ping -c 2 8.8.8.8', output: `2 packets transmitted, 2 received, 0% packet loss`, explanation: 'Step 2: Internet reachable ✓ — External routing works.' },

    { type: 'command', command: 'nslookup company-internal.com', output: `Server:    192.168.1.1
** server can\'t find company-internal.com: NXDOMAIN`, explanation: 'Step 3: DNS FAILS ✗ — The domain doesn\'t resolve. Problem is at DNS layer.' },

    { type: 'command', command: 'nslookup company-internal.com 10.0.0.53', output: `Server:    10.0.0.53
Name:      company-internal.com
Address:   10.0.5.100`, explanation: 'Step 4: Internal DNS server resolves it ✓ — The user\'s machine is using the wrong DNS server. Fix: Update /etc/resolv.conf or DHCP settings.' },

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'paragraph', content: 'Network troubleshooting tools are dual-purpose — they diagnose problems AND reveal attacks:' },
    { type: 'list', items: [
      'ping — Detects packet loss from DDoS attacks or network saturation',
      'traceroute — Reveals BGP hijacking or unexpected traffic routing',
      'dig/nslookup — Exposes DNS poisoning and cache manipulation',
      'ss/netstat — Shows unauthorized listening services (backdoors)',
      'ARP table — Detects man-in-the-middle via ARP spoofing',
      'Always troubleshoot systematically: Physical → Data Link → Network → Transport → Application',
      'Document your baseline — you can\'t spot anomalies if you don\'t know what "normal" looks like'
    ]},
  ],
  navigation: {
    prev: { title: 'Subnetting & CIDR Notation', slug: 'subnetting-cidr' },
    next: { title: 'Network Services & Protocols', slug: 'network-services-protocols' },
  },
};
