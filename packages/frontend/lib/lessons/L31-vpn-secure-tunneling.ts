export const lesson = {
  id: 'L31',
  title: 'VPN Technologies & Secure Tunneling',
  slug: 'vpn-secure-tunneling',
  type: 'PRACTICAL',
  duration: 45,
  xpReward: 30,
  difficulty: 'intermediate',
  module: { title: 'Network Security', slug: 'network-security' },
  course: { title: 'Network Security Fundamentals', slug: 'network-security-fundamentals' },
  keyTerms: [
    'VPN', 'Tunnel', 'IPsec', 'OpenVPN', 'WireGuard', 'SSL VPN',
    'Split Tunneling', 'Site-to-Site', 'Remote Access', 'Encryption',
    'Authentication', 'Key Exchange'
  ],
  content: [
    { type: 'heading', content: 'VPN Technologies & Secure Tunneling' },
    { type: 'paragraph', content: 'A Virtual Private Network (VPN) creates an encrypted tunnel through an untrusted network (like the internet), making it appear as if you\'re directly connected to a private network. VPNs are essential for secure remote work, connecting branch offices, and protecting privacy.' },

    { type: 'callout', variant: 'info', content: 'Analogy: Imagine sending a confidential letter through the regular mail. Anyone handling it could open and read it. A VPN is like placing your letter inside an armored, locked briefcase that only the recipient can open. The mail carriers (internet routers) still transport it, but they can\'t see the contents.' },

    { type: 'heading', level: 2, content: 'Why VPNs Matter for Security' },
    { type: 'list', items: [
      'Encrypts all traffic — Even on public Wi-Fi, attackers can\'t read your data',
      'Hides your real IP — The VPN server\'s IP is shown to destinations',
      'Secure remote access — Employees connect to corporate resources from anywhere',
      'Site-to-site connectivity — Branch offices share a private network over the internet',
      'Bypass network restrictions — Access resources blocked by geography or local firewalls',
      'Compliance — Many regulations require VPN for remote access to sensitive data'
    ]},

    { type: 'heading', level: 2, content: 'How VPN Tunneling Works' },
    { type: 'paragraph', content: 'A VPN tunnel works by encapsulating your original packet inside a new packet. The outer packet is addressed to the VPN server, and the inner packet (encrypted) contains your actual data and its real destination.' },
    { type: 'list', items: [
      '1. Your device sends a packet destined for internal-server.corp.com',
      '2. The VPN client encrypts the ENTIRE original packet (headers + data)',
      '3. A new outer IP header is added addressed to the VPN server\'s public IP',
      '4. The encrypted, encapsulated packet travels across the internet normally',
      '5. The VPN server receives it, strips the outer header, decrypts the inner packet',
      '6. The original packet is forwarded to internal-server.corp.com on the private network',
      '7. Reply traffic follows the reverse path back through the tunnel'
    ]},

    { type: 'heading', level: 2, content: 'VPN Types' },

    { type: 'heading', level: 3, content: '1. Remote Access VPN' },
    { type: 'paragraph', content: 'Individual users connect from their laptop/phone to the corporate network. This is what most people think of as "VPN."' },
    { type: 'list', items: [
      'Employee at a coffee shop connects to company resources securely',
      'Each user authenticates individually (username/password + MFA)',
      'Client software installed on user\'s device',
      'Examples: OpenVPN, WireGuard, Cisco AnyConnect, GlobalProtect'
    ]},

    { type: 'heading', level: 3, content: '2. Site-to-Site VPN' },
    { type: 'paragraph', content: 'Connects two entire networks (e.g., headquarters and a branch office). Always-on, no user interaction required.' },
    { type: 'list', items: [
      'Firewall/router at each site maintains the tunnel permanently',
      'All traffic between sites flows through the encrypted tunnel',
      'Users in either location can access resources as if on the same LAN',
      'Uses IPsec or WireGuard between the two endpoints',
      'Common in enterprises with multiple physical locations'
    ]},

    { type: 'heading', level: 3, content: '3. SSL/TLS VPN (Clientless)' },
    { type: 'paragraph', content: 'Accessed through a web browser — no client software needed. The VPN runs over HTTPS, which is rarely blocked by firewalls.' },
    { type: 'list', items: [
      'Access internal web applications through a web portal',
      'Works through any firewall that allows HTTPS (port 443)',
      'Limited to web-based resources (no full network access)',
      'Useful for contractors and BYOD devices',
      'Examples: Citrix Gateway, F5 BIG-IP APM'
    ]},

    { type: 'heading', level: 2, content: 'VPN Protocols Compared' },

    { type: 'heading', level: 3, content: 'IPsec (Internet Protocol Security)' },
    { type: 'paragraph', content: 'The industry standard for site-to-site VPNs. Operates at Layer 3 (network layer) and provides encryption, authentication, and integrity.' },
    { type: 'list', items: [
      'Two modes: Transport (encrypts payload only) and Tunnel (encrypts entire packet)',
      'Uses IKE (Internet Key Exchange) for secure key negotiation',
      'AH (Authentication Header) — integrity only, no encryption',
      'ESP (Encapsulating Security Payload) — encryption + integrity',
      'Very secure but complex to configure',
      'Can be blocked by some firewalls (uses UDP 500 and protocol 50/51)'
    ]},

    { type: 'heading', level: 3, content: 'OpenVPN' },
    { type: 'paragraph', content: 'Open-source, highly configurable VPN that uses SSL/TLS for key exchange. The most popular choice for remote access VPNs.' },
    { type: 'list', items: [
      'Runs on UDP (faster) or TCP (more reliable, harder to block)',
      'Uses OpenSSL library for encryption (AES-256-GCM typical)',
      'Certificate-based or username/password authentication',
      'Can run on port 443 to bypass most firewalls',
      'Cross-platform: Windows, macOS, Linux, iOS, Android',
      'Battle-tested since 2001, extensive security auditing'
    ]},

    { type: 'heading', level: 3, content: 'WireGuard (Modern Standard)' },
    { type: 'paragraph', content: 'The newest VPN protocol, designed for simplicity and speed. Only ~4,000 lines of code compared to OpenVPN\'s ~100,000 — less code means fewer bugs and easier auditing.' },
    { type: 'list', items: [
      'Extremely fast — built into the Linux kernel',
      'Simple configuration — just a few lines per peer',
      'Modern cryptography: ChaCha20, Curve25519, BLAKE2s',
      'UDP-based with built-in roaming (seamless IP changes)',
      'No complex state machines — cryptokey routing',
      'Supported natively in Linux 5.6+, available everywhere else'
    ]},

    { type: 'heading', level: 2, content: 'Configuring WireGuard (Hands-On)' },
    { type: 'paragraph', content: 'Let\'s set up a WireGuard VPN from scratch. It\'s remarkably simple compared to IPsec or OpenVPN.' },

    { type: 'command', command: 'wg genkey | tee server_private.key | wg pubkey > server_public.key', output: '', explanation: 'Generates a key pair for the VPN server. The private key stays secret on the server; the public key is shared with clients.' },

    { type: 'command', command: 'cat server_private.key', output: `yAnz5TF+lXXJte14tji3zlMNq+hd2rYUIgJBgB3fBmk=`, explanation: 'The server\'s private key (never share this!). It\'s a 256-bit Curve25519 key encoded in base64.' },

    { type: 'command', command: 'cat /etc/wireguard/wg0.conf', output: `[Interface]
# Server configuration
Address = 10.200.0.1/24
ListenPort = 51820
PrivateKey = yAnz5TF+lXXJte14tji3zlMNq+hd2rYUIgJBgB3fBmk=
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

[Peer]
# Client: analyst-laptop
PublicKey = xTIBA5rboUvnH4htodjb6e697QjLERt1NAB4mZqp8Dg=
AllowedIPs = 10.200.0.2/32`, explanation: 'The server config: Creates a tunnel interface wg0 with IP 10.200.0.1. PostUp/PostDown rules enable NAT so VPN clients can access the internet through the server. The [Peer] section defines an authorized client.' },

    { type: 'command', command: 'cat /etc/wireguard/client.conf', output: `[Interface]
# Client configuration
Address = 10.200.0.2/24
PrivateKey = gI6EdUSYvn8ugXOt8QQD6Yc+JyiZi6DPfSoKjc8GFk0=
DNS = 10.200.0.1

[Peer]
# VPN Server
PublicKey = HIgo9xNzJMWLKASShiTqIybxR0V1tB1YBUfM3WMONXk=
Endpoint = vpn.company.com:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25`, explanation: 'Client config: AllowedIPs = 0.0.0.0/0 means ALL traffic routes through the VPN (full tunnel). DNS is set to the VPN server to prevent DNS leaks. PersistentKeepalive keeps the connection alive through NAT.' },

    { type: 'command', command: 'sudo wg-quick up wg0', output: `[#] ip link add wg0 type wireguard
[#] wg setconf wg0 /dev/fd/63
[#] ip -4 address add 10.200.0.1/24 dev wg0
[#] ip link set mtu 1420 up dev wg0
[#] iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE`, explanation: 'Brings up the WireGuard tunnel. Creates the virtual interface, applies the config, assigns the IP, and sets up NAT.' },

    { type: 'command', command: 'sudo wg show', output: `interface: wg0
  public key: HIgo9xNzJMWLKASShiTqIybxR0V1tB1YBUfM3WMONXk=
  private key: (hidden)
  listening port: 51820

peer: xTIBA5rboUvnH4htodjb6e697QjLERt1NAB4mZqp8Dg=
  endpoint: 203.0.113.50:43721
  allowed ips: 10.200.0.2/32
  latest handshake: 34 seconds ago
  transfer: 12.45 MiB received, 34.67 MiB sent`, explanation: 'Shows the WireGuard tunnel status. The peer is connected (handshake 34 seconds ago) and data is flowing. This is how you verify the VPN is working.' },

    { type: 'heading', level: 2, content: 'Split Tunneling vs Full Tunneling' },
    { type: 'paragraph', content: 'An important security decision when configuring VPNs:' },
    { type: 'list', items: [
      'Full Tunnel — ALL traffic goes through the VPN (AllowedIPs = 0.0.0.0/0)',
      '  Pros: Maximum security, all traffic encrypted and monitored',
      '  Cons: Slower (everything routed through VPN server), more bandwidth on server',
      'Split Tunnel — Only corporate traffic goes through VPN; internet goes direct',
      '  Pros: Faster for general browsing, less server load',
      '  Cons: User is exposed on direct internet traffic, possible data leaks'
    ]},

    { type: 'callout', variant: 'security', content: 'Security recommendation: For corporate VPNs, use full tunneling. Split tunneling creates risk — if a user on public Wi-Fi has split tunnel, an attacker on that network can intercept the "direct" traffic while the user thinks they\'re protected. Full tunnel is safer but requires more VPN server capacity.' },

    { type: 'heading', level: 2, content: 'VPN Security Considerations' },
    { type: 'list', items: [
      'Always use strong encryption: AES-256 (OpenVPN/IPsec) or ChaCha20 (WireGuard)',
      'Require multi-factor authentication for VPN access',
      'Implement certificate-based authentication (not just passwords)',
      'Monitor VPN logs for unusual connection patterns (off-hours, foreign IPs)',
      'Kill switch — Disconnect internet if VPN drops (prevents data leaks)',
      'DNS leak prevention — Ensure DNS queries go through the tunnel',
      'Perfect Forward Secrecy — Compromise of long-term keys doesn\'t expose past traffic',
      'Regularly rotate pre-shared keys and certificates',
      'Network access control — VPN access doesn\'t mean full network access',
      'Log and audit all VPN connections for compliance'
    ]},

    { type: 'heading', level: 2, content: 'Detecting and Bypassing VPN Issues' },
    { type: 'command', command: 'curl -s https://ifconfig.me', output: `203.0.113.200`, explanation: 'Check your public IP. If VPN is active, this should show the VPN server\'s IP, not your real IP. If you see your real IP, the VPN isn\'t working correctly.' },

    { type: 'command', command: 'cat /etc/resolv.conf', output: `nameserver 10.200.0.1`, explanation: 'With VPN active, DNS should point to the VPN server (10.200.0.1). If it still shows your ISP\'s DNS, you have a DNS leak — your browsing history is exposed.' },

    { type: 'command', command: 'traceroute -n 10.0.5.100', output: `traceroute to 10.0.5.100 (10.0.5.100), 30 hops max
 1  10.200.0.1  2.345 ms  2.123 ms  2.234 ms
 2  10.0.0.1    3.456 ms  3.234 ms  3.345 ms
 3  10.0.5.100  4.567 ms  4.345 ms  4.456 ms`, explanation: 'Traceroute to an internal resource goes through the VPN gateway (10.200.0.1) first, confirming the tunnel is working for corporate traffic.' },

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'paragraph', content: 'VPNs are a critical security control, but they\'re not a complete solution:' },
    { type: 'list', items: [
      'VPN encrypts the tunnel — but if the endpoint is compromised, encryption doesn\'t help',
      'WireGuard is the modern choice: simpler, faster, and equally secure',
      'Always verify your VPN is working: check IP leaks and DNS leaks',
      'VPN + MFA is the minimum for remote access to corporate networks',
      'A VPN doesn\'t make an insecure website safe — it only protects the transit',
      'For enterprises: VPN is being replaced by Zero Trust Network Access (ZTNA)',
      'Commercial VPN services (NordVPN, ExpressVPN) protect privacy, not corporate access',
      'Consider VPN as one layer in your defense-in-depth strategy'
    ]},
  ],
  navigation: {
    prev: { title: 'Firewalls: Concepts, Types & Configuration', slug: 'firewalls-configuration' },
    next: { title: 'Intrusion Detection & Prevention Systems', slug: 'ids-ips-systems' },
  },
};
