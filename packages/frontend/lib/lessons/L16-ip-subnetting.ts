export const lesson = {
  id: 'L16',
  title: 'IP Addressing & Subnetting',
  slug: 'ip-addressing-subnetting',
  type: 'PRACTICAL',
  duration: 45,
  xpReward: 25,
  difficulty: 'beginner',
  module: { title: 'Computer Networking', slug: 'computer-networking' },
  course: { title: 'CyberSec Academy', slug: 'cybersec-academy' },
  keyTerms: ['IPv4', 'IPv6', 'Subnet Mask', 'CIDR', 'Network Address', 'Broadcast', 'Private IP', 'NAT'],
  content: [
    { type: 'heading', content: 'IP Addressing & Subnetting' },
    { type: 'paragraph', content: 'Every device on a network needs a unique address — just like every house needs a unique street address for mail delivery. IP addresses identify machines on networks and subnetting divides large networks into smaller, manageable segments (critical for security isolation).' },
    { type: 'callout', variant: 'info', content: 'Analogy: An IP address is like a phone number. The subnet mask is like the area code — it tells you which part identifies the network (city) and which part identifies the specific device (person). Subnetting is like creating new area codes to organize and separate groups.' },
    { type: 'heading', level: 2, content: 'IPv4 Address Format' },
    { type: 'paragraph', content: 'An IPv4 address is 32 bits, written as four numbers (octets) separated by dots:' },
    { type: 'command', command: 'ip addr show eth0 | grep inet', output: `    inet 192.168.1.105/24 brd 192.168.1.255 scope global dynamic eth0`, explanation: 'Your IP is 192.168.1.105 with a /24 subnet mask. The /24 means the first 24 bits are the network portion (192.168.1) and the last 8 bits identify hosts (.105).' },
    { type: 'list', items: [
      '192.168.1.105 — Your device (host) address',
      '/24 — Subnet mask (255.255.255.0) — first 3 octets are the network',
      '192.168.1.0 — Network address (identifies the subnet itself)',
      '192.168.1.255 — Broadcast address (reaches ALL hosts on the subnet)',
      '192.168.1.1 - 192.168.1.254 — Usable host addresses (254 devices)'
    ]},
    { type: 'heading', level: 2, content: 'Private vs Public IP Addresses' },
    { type: 'paragraph', content: 'Some IP ranges are reserved for private (internal) networks and cannot be routed on the internet:' },
    { type: 'list', items: [
      '10.0.0.0/8 — Class A private (10.0.0.0 - 10.255.255.255) — large enterprises',
      '172.16.0.0/12 — Class B private (172.16.0.0 - 172.31.255.255) — medium networks',
      '192.168.0.0/16 — Class C private (192.168.0.0 - 192.168.255.255) — home/small office',
      '127.0.0.0/8 — Loopback (localhost — traffic stays on your machine)',
      '169.254.0.0/16 — Link-local (auto-assigned when DHCP fails)'
    ]},
    { type: 'callout', variant: 'security', content: 'Security relevance: If you see traffic to/from 10.x.x.x, 172.16-31.x.x, or 192.168.x.x from outside your network, something is wrong. Private IPs should NEVER appear on the public internet — this could indicate IP spoofing or misconfigured routing.' },
    { type: 'heading', level: 2, content: 'CIDR Notation & Subnet Math' },
    { type: 'paragraph', content: 'CIDR (Classless Inter-Domain Routing) notation uses /number to specify how many bits are the network portion:' },
    { type: 'list', items: [
      '/8 = 255.0.0.0 — 16,777,214 hosts (huge network)',
      '/16 = 255.255.0.0 — 65,534 hosts',
      '/24 = 255.255.255.0 — 254 hosts (most common for LANs)',
      '/25 = 255.255.255.128 — 126 hosts (splits a /24 in half)',
      '/30 = 255.255.255.252 — 2 hosts (point-to-point links between routers)',
      '/32 = 255.255.255.255 — 1 host (single specific IP, used in firewall rules)'
    ]},
    { type: 'command', command: 'ipcalc 192.168.1.0/24', output: `Address:   192.168.1.0          11000000.10101000.00000001. 00000000
Netmask:   255.255.255.0 = 24   11111111.11111111.11111111. 00000000
Network:   192.168.1.0/24
HostMin:   192.168.1.1
HostMax:   192.168.1.254
Broadcast: 192.168.1.255
Hosts/Net: 254`, explanation: 'ipcalc calculates subnet details. A /24 network gives you 254 usable host addresses. The binary breakdown shows exactly which bits are network (1s in netmask) and which are host (0s).' },
    { type: 'heading', level: 2, content: 'Subnetting for Security' },
    { type: 'paragraph', content: 'Subnetting is not just an organizational tool — it is a security control. By dividing networks into smaller subnets, you limit the blast radius of a compromise:' },
    { type: 'list', items: [
      '10.0.1.0/24 — Server VLAN (databases, app servers)',
      '10.0.2.0/24 — Workstation VLAN (employee laptops)',
      '10.0.3.0/24 — IoT VLAN (printers, cameras, smart devices)',
      '172.16.0.0/24 — DMZ (public-facing web servers)',
      '192.168.100.0/24 — Management VLAN (admin access only)',
      'Firewalls between subnets control what traffic can cross'
    ]},
    { type: 'command', command: 'ip route show', output: `default via 192.168.1.1 dev eth0
10.0.1.0/24 via 192.168.1.1 dev eth0
10.0.2.0/24 via 192.168.1.1 dev eth0
192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.105`, explanation: 'The routing table shows how your machine reaches different subnets. Traffic to 10.0.1.0/24 and 10.0.2.0/24 goes through the gateway (192.168.1.1). This gateway likely has firewall rules controlling access between subnets.' },
    { type: 'heading', level: 2, content: 'Summary' },
    { type: 'list', items: [
      'IPv4: 32-bit address in dotted decimal (192.168.1.105)',
      'Subnet mask defines network vs host portions (/24 = 255.255.255.0)',
      'Private IPs (10.x, 172.16-31.x, 192.168.x) are not routable on the internet',
      'CIDR notation: /24 = 254 hosts, /25 = 126 hosts, /32 = single host',
      'Subnetting is a security control — limits lateral movement after a compromise',
      'Next lesson: TCP and UDP — how data is reliably (or quickly) delivered'
    ]},
  ],
  navigation: {
    prev: { title: 'How Networks Work: OSI & TCP/IP', slug: 'osi-tcp-ip-model' },
    next: { title: 'TCP, UDP & the Transport Layer', slug: 'tcp-udp-transport' },
  },
};
