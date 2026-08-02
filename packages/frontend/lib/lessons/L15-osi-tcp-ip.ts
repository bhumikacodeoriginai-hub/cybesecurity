export const lesson = {
  id: 'L15',
  title: 'How Networks Work: OSI & TCP/IP',
  slug: 'osi-tcp-ip-model',
  type: 'THEORY',
  duration: 35,
  xpReward: 20,
  difficulty: 'beginner',
  module: { title: 'Computer Networking', slug: 'computer-networking' },
  course: { title: 'CyberSec Academy', slug: 'cybersec-academy' },
  keyTerms: ['OSI Model', 'TCP/IP', 'Layer', 'Encapsulation', 'Protocol', 'Packet', 'Frame'],
  content: [
    { type: 'heading', content: 'How Networks Work: OSI & TCP/IP Models' },
    { type: 'paragraph', content: 'When you send a message across the internet, it passes through multiple layers of processing — each adding its own information. The OSI model (7 layers) and TCP/IP model (4 layers) describe how data travels from your screen to a server on the other side of the world.' },
    { type: 'callout', variant: 'info', content: 'Analogy: Sending data across a network is like sending a package via postal mail. You write the letter (Application layer), put it in an envelope with the address (Transport/Network), hand it to the post office (Data Link), and the truck carries it physically (Physical). Each layer has a specific job.' },
    { type: 'heading', level: 2, content: 'The OSI Model (7 Layers)' },
    { type: 'paragraph', content: 'The Open Systems Interconnection model is a conceptual framework. Remember it top-to-bottom: "All People Seem To Need Data Processing" or bottom-to-top: "Please Do Not Throw Sausage Pizza Away"' },
    { type: 'list', items: [
      'Layer 7: Application — What the user interacts with (HTTP, DNS, FTP, SMTP)',
      'Layer 6: Presentation — Data formatting, encryption, compression (SSL/TLS, JPEG, ASCII)',
      'Layer 5: Session — Manages connections/sessions between applications',
      'Layer 4: Transport — Reliable delivery, port numbers (TCP, UDP)',
      'Layer 3: Network — Routing, IP addresses (IP, ICMP, routers)',
      'Layer 2: Data Link — Local delivery, MAC addresses (Ethernet, Wi-Fi, switches)',
      'Layer 1: Physical — Raw bits on the wire (cables, radio waves, voltage)'
    ]},
    { type: 'heading', level: 2, content: 'The TCP/IP Model (4 Layers)' },
    { type: 'paragraph', content: 'The TCP/IP model is what the internet actually uses. It combines some OSI layers:' },
    { type: 'list', items: [
      'Application (OSI 5-7) — HTTP, DNS, SSH, FTP — protocols users interact with',
      'Transport (OSI 4) — TCP (reliable) or UDP (fast) — delivers data to the right application',
      'Internet (OSI 3) — IP addressing and routing — gets packets to the right machine',
      'Network Access (OSI 1-2) — Physical transmission — Ethernet frames, Wi-Fi signals'
    ]},
    { type: 'heading', level: 2, content: 'Encapsulation: How Data Travels Down' },
    { type: 'paragraph', content: 'As data moves down the layers, each layer wraps it with its own header (and sometimes trailer). This is called encapsulation:' },
    { type: 'list', items: [
      'Application layer: Creates the DATA (e.g., "GET /index.html HTTP/1.1")',
      'Transport layer: Adds TCP/UDP header (source port, destination port) → Segment',
      'Network layer: Adds IP header (source IP, destination IP) → Packet',
      'Data Link layer: Adds Ethernet header + trailer (MAC addresses) → Frame',
      'Physical layer: Converts to electrical signals/radio waves → Bits'
    ]},
    { type: 'command', command: 'sudo tcpdump -i eth0 -c 1 -XX', output: `10:30:01.123456 IP 192.168.1.10.45678 > 93.184.216.34.80: Flags [S]
0x0000:  0811 2233 4455 0800 27ab cdef 0800 4500  ..\"3DU..'.....E.
0x0010:  003c 1a2b 4000 4006 b1c8 c0a8 010a 5db8  .<.+@.@.......].
0x0020:  d822 b26e 0050 1234 5678 0000 0000 a002  .\".n.P.4Vx......
0x0030:  faf0 1234 0000 0204 05b4 0402 080a 0012  ...4............`, explanation: 'A raw packet captured by tcpdump. You can see the layers: Ethernet header (MAC addresses at 0x0000), IP header (starting at 0x000e with 4500), TCP header (starting at 0x0022 with port 80=HTTP). This is encapsulation in action.' },
    { type: 'heading', level: 2, content: 'Why Security Professionals Need This' },
    { type: 'list', items: [
      'Firewall rules operate at specific layers (Layer 3: IP filtering, Layer 4: port filtering, Layer 7: content filtering)',
      'Wireshark shows traffic layer by layer — you must understand what you see',
      'Attacks target specific layers: ARP spoofing (Layer 2), IP spoofing (Layer 3), SYN flood (Layer 4), SQL injection (Layer 7)',
      'Troubleshooting: If ping works (Layer 3) but HTTP fails (Layer 7), the problem is above Layer 3',
      'IDS/IPS inspect different layers depending on their type (NIDS vs WAF)'
    ]},
    { type: 'callout', variant: 'security', content: 'Key insight: When investigating an attack, identify WHICH LAYER it targets. This tells you where to look for evidence and which defenses apply. DDoS = Layer 3/4. SQL injection = Layer 7. ARP spoofing = Layer 2. Each requires different tools and responses.' },
    { type: 'heading', level: 2, content: 'Summary' },
    { type: 'list', items: [
      'OSI has 7 layers (conceptual model), TCP/IP has 4 (real-world implementation)',
      'Data gets wrapped (encapsulated) with headers as it moves down the stack',
      'Each layer has specific protocols: HTTP (App), TCP/UDP (Transport), IP (Network), Ethernet (Data Link)',
      'Security controls and attacks operate at specific layers',
      'Understanding layers helps you troubleshoot, detect attacks, and choose the right defense',
      'Next lesson: IP addressing and subnetting — how machines are identified on networks'
    ]},
  ],
  navigation: {
    prev: { title: 'Linux Process Management & Monitoring', slug: 'linux-process-management' },
    next: { title: 'IP Addressing & Subnetting', slug: 'ip-addressing-subnetting' },
  },
};
