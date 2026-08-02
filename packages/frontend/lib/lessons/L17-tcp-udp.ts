export const lesson = {
  id: 'L17',
  title: 'TCP, UDP & the Transport Layer',
  slug: 'tcp-udp-transport',
  type: 'THEORY',
  duration: 30,
  xpReward: 20,
  difficulty: 'beginner',
  module: { title: 'Computer Networking', slug: 'computer-networking' },
  course: { title: 'CyberSec Academy', slug: 'cybersec-academy' },
  keyTerms: ['TCP', 'UDP', '3-Way Handshake', 'Port', 'SYN', 'ACK', 'Segment', 'Reliable Delivery'],
  content: [
    { type: 'heading', content: 'TCP, UDP & the Transport Layer' },
    { type: 'paragraph', content: 'The Transport Layer (Layer 4) is responsible for getting data to the correct application on the destination machine. It uses port numbers to distinguish between services and provides either reliable (TCP) or fast (UDP) delivery.' },
    { type: 'callout', variant: 'info', content: 'Analogy: IP addresses get the package to the right building (machine). Port numbers get it to the right apartment (application). TCP is registered mail with tracking and confirmation. UDP is dropping a flyer in the mailbox — fast, but no guarantee it arrives.' },
    { type: 'heading', level: 2, content: 'TCP: Transmission Control Protocol' },
    { type: 'paragraph', content: 'TCP provides reliable, ordered delivery. It ensures every byte arrives correctly by establishing a connection first (handshake), numbering every segment, and requiring acknowledgment.' },
    { type: 'heading', level: 3, content: 'The 3-Way Handshake' },
    { type: 'list', items: [
      '1. SYN — Client sends: "I want to connect" (SYN flag set, sequence number X)',
      '2. SYN-ACK — Server responds: "OK, I acknowledge your request" (SYN+ACK, sequence Y, ack X+1)',
      '3. ACK — Client confirms: "Great, connection established" (ACK flag, ack Y+1)',
      'After these 3 packets, data can flow in both directions'
    ]},
    { type: 'command', command: 'sudo tcpdump -i eth0 -c 3 "tcp[tcpflags] & (tcp-syn|tcp-ack) != 0" -nn', output: `10:30:01.001 IP 192.168.1.10.49876 > 93.184.216.34.443: Flags [S], seq 1234567890
10:30:01.023 IP 93.184.216.34.443 > 192.168.1.10.49876: Flags [S.], seq 987654321, ack 1234567891
10:30:01.023 IP 192.168.1.10.49876 > 93.184.216.34.443: Flags [.], ack 987654322`, explanation: 'The 3-way handshake captured: [S] = SYN, [S.] = SYN-ACK, [.] = ACK. After this, the HTTPS connection is established and encrypted data flows.' },
    { type: 'callout', variant: 'security', content: 'SYN Flood attack: An attacker sends thousands of SYN packets but never completes the handshake. The server allocates resources for each half-open connection until it runs out of memory. Defense: SYN cookies, rate limiting, or cloud DDoS protection.' },
    { type: 'heading', level: 2, content: 'UDP: User Datagram Protocol' },
    { type: 'paragraph', content: 'UDP is connectionless — no handshake, no acknowledgment, no guaranteed delivery. It is faster because there is less overhead, making it ideal for real-time applications.' },
    { type: 'list', items: [
      'No connection setup — Just send the packet',
      'No delivery guarantee — Packets may arrive out of order or not at all',
      'No congestion control — Sender blasts at full speed',
      'Lower overhead — Smaller header (8 bytes vs TCP 20+ bytes)',
      'Used for: DNS (port 53), video streaming, VoIP, gaming, VPN (WireGuard)'
    ]},
    { type: 'heading', level: 2, content: 'Ports: Addressing Applications' },
    { type: 'paragraph', content: 'A port number (0-65535) identifies which application should receive the data:' },
    { type: 'list', items: [
      '0-1023: Well-known ports (privileged, require root to bind)',
      '1024-49151: Registered ports (assigned to specific applications)',
      '49152-65535: Dynamic/ephemeral ports (assigned temporarily to client connections)'
    ]},
    { type: 'command', command: 'ss -tulnp', output: `Netid State  Local Address:Port  Process
tcp   LISTEN 0.0.0.0:22           sshd
tcp   LISTEN 0.0.0.0:80           nginx
tcp   LISTEN 0.0.0.0:443          nginx
tcp   LISTEN 127.0.0.1:3306       mysqld
udp   UNCONN 0.0.0.0:53           named`, explanation: 'ss shows listening ports. SSH on 22, web server on 80/443, MySQL on 3306 (localhost only = secure), DNS on UDP 53. Every open port is a potential attack surface.' },
    { type: 'heading', level: 2, content: 'TCP vs UDP Comparison' },
    { type: 'list', items: [
      'TCP: Reliable, ordered, connection-oriented. Used for HTTP, SSH, FTP, SMTP, databases.',
      'UDP: Fast, unreliable, connectionless. Used for DNS, streaming, gaming, VPN.',
      'Security scanning: TCP scan = connect to each port (reliable detection). UDP scan = send probe, hope for response (unreliable, slow).',
      'Firewalls: Must configure rules for BOTH TCP and UDP separately.'
    ]},
    { type: 'heading', level: 2, content: 'Summary' },
    { type: 'list', items: [
      'TCP provides reliable delivery via 3-way handshake, sequencing, and acknowledgment',
      'UDP provides fast delivery with no guarantees — used where speed matters more than reliability',
      'Ports identify applications: 22=SSH, 80=HTTP, 443=HTTPS, 53=DNS, 3306=MySQL',
      'Every listening port is part of your attack surface — close what you do not need',
      'SYN floods exploit the TCP handshake — a fundamental network attack',
      'Next lesson: DNS — how domain names become IP addresses'
    ]},
  ],
  navigation: {
    prev: { title: 'IP Addressing & Subnetting', slug: 'ip-addressing-subnetting' },
    next: { title: 'DNS: The Internet Phone Book', slug: 'dns-fundamentals' },
  },
};
