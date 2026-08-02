export const lesson = {
  id: 'L28',
  title: 'Wireless Networking Fundamentals & Security',
  slug: 'wireless-networking',
  type: 'PRACTICAL',
  duration: 45,
  xpReward: 30,
  difficulty: 'intermediate',
  module: { title: 'Computer Networking', slug: 'computer-networking' },
  course: { title: 'Network Fundamentals', slug: 'network-fundamentals' },
  keyTerms: [
    'Wi-Fi', 'WPA2', 'WPA3', '802.11', 'SSID', 'Access Point',
    'Evil Twin', 'Deauthentication Attack', 'WEP', 'Handshake',
    'Frequency Band', 'Channel'
  ],
  content: [
    { type: 'heading', content: 'Wireless Networking Fundamentals & Security' },
    { type: 'paragraph', content: 'Wireless networks are everywhere — homes, offices, coffee shops, airports. While convenient, they broadcast data through the air where anyone nearby can potentially intercept it. Understanding wireless security is essential because Wi-Fi is often the weakest link in network defense.' },

    { type: 'callout', variant: 'info', content: 'Analogy: Wired networking is like having a private conversation in a room with walls. Wireless is like talking in a park — anyone walking by can overhear unless you speak in code (encryption). Wi-Fi security is about making that "code" unbreakable.' },

    { type: 'heading', level: 2, content: 'How Wi-Fi Works' },
    { type: 'paragraph', content: 'Wi-Fi uses radio waves to transmit data between your device and a wireless access point (AP). The access point connects to the wired network and acts as a bridge.' },
    { type: 'list', items: [
      'Your device has a wireless network interface card (NIC) with an antenna',
      'The access point broadcasts a beacon frame every ~100ms announcing its SSID (network name)',
      'Your device sends a probe request: "I want to join this network"',
      'Authentication and association happen (varies by security type)',
      'Once connected, all data flows through the AP to reach the internet'
    ]},

    { type: 'heading', level: 3, content: 'Wi-Fi Standards (802.11)' },
    { type: 'paragraph', content: 'Different Wi-Fi generations offer different speeds and frequencies:' },
    { type: 'list', items: [
      '802.11b (1999) — 11 Mbps on 2.4 GHz — ancient, insecure (WEP era)',
      '802.11g (2003) — 54 Mbps on 2.4 GHz — backward compatible with b',
      '802.11n / Wi-Fi 4 (2009) — 600 Mbps on 2.4/5 GHz — introduced MIMO',
      '802.11ac / Wi-Fi 5 (2013) — 6.9 Gbps on 5 GHz — current standard in many homes',
      '802.11ax / Wi-Fi 6 (2019) — 9.6 Gbps on 2.4/5/6 GHz — enhanced security with WPA3'
    ]},

    { type: 'heading', level: 2, content: 'Wireless Security Protocols: The Evolution' },
    { type: 'paragraph', content: 'Wi-Fi encryption has evolved dramatically due to attacks breaking each previous generation:' },

    { type: 'heading', level: 3, content: 'WEP (Wired Equivalent Privacy) — BROKEN' },
    { type: 'paragraph', content: 'WEP was the original Wi-Fi security standard from 1999. It can be cracked in under 5 minutes with freely available tools. NEVER use WEP.' },
    { type: 'list', items: [
      'Uses RC4 stream cipher with a 24-bit initialization vector (IV)',
      'The short IV means patterns repeat after ~5000 packets',
      'Tools like aircrack-ng can crack WEP by collecting enough IVs',
      'Was officially deprecated in 2004 but still found on old routers'
    ]},

    { type: 'heading', level: 3, content: 'WPA (Wi-Fi Protected Access) — DEPRECATED' },
    { type: 'paragraph', content: 'WPA was a temporary fix while WPA2 was developed. It improved on WEP but has known vulnerabilities in TKIP mode.' },

    { type: 'heading', level: 3, content: 'WPA2 (2004) — Current Standard' },
    { type: 'paragraph', content: 'WPA2 uses AES encryption and CCMP protocol. It\'s secure when configured properly, but vulnerable to specific attacks:' },
    { type: 'list', items: [
      'WPA2-Personal (PSK) — Uses a shared password (pre-shared key)',
      'WPA2-Enterprise — Uses RADIUS server for individual user authentication',
      'KRACK attack (2017) — Exploits the 4-way handshake to decrypt traffic',
      'Weak passwords can be brute-forced if the handshake is captured',
      'Still considered secure with strong passwords (12+ characters, mixed)'
    ]},

    { type: 'heading', level: 3, content: 'WPA3 (2018) — Latest & Most Secure' },
    { type: 'paragraph', content: 'WPA3 addresses all known WPA2 weaknesses:' },
    { type: 'list', items: [
      'SAE (Simultaneous Authentication of Equals) — Resists offline dictionary attacks',
      'Forward secrecy — Even if password is later compromised, past traffic stays encrypted',
      'Protected Management Frames (PMF) — Prevents deauthentication attacks',
      '192-bit security mode for enterprise (aligns with CNSA guidelines)',
      'Easy Connect — Simplifies IoT device setup securely'
    ]},

    { type: 'heading', level: 2, content: 'Wireless Reconnaissance' },
    { type: 'paragraph', content: 'Before attacking or defending, you need to see what\'s in the wireless environment. These commands scan for nearby networks.' },

    { type: 'command', command: 'sudo iwlist wlan0 scan | grep -E "(ESSID|Encryption|Quality|Channel)"', output: `          Channel:1
          Quality=70/100  Signal level=-40 dBm
          Encryption key:on
          ESSID:"HomeNetwork"
          Channel:6
          Quality=45/100  Signal level=-62 dBm
          Encryption key:on
          ESSID:"CoffeeShop_Free"
          Channel:11
          Quality=30/100  Signal level=-75 dBm
          Encryption key:off
          ESSID:"OpenNetwork"
          Channel:1
          Quality=55/100  Signal level=-55 dBm
          Encryption key:on
          ESSID:"CorpWiFi-5G"`, explanation: 'Scans for all nearby wireless networks. Shows SSID (name), channel, signal strength, and whether encryption is enabled. "OpenNetwork" has no encryption — all traffic is visible to anyone nearby!' },

    { type: 'command', command: 'sudo iw dev wlan0 info', output: `Interface wlan0
    ifindex 3
    wdev 0x1
    addr 00:1a:2b:3c:4d:5e
    type managed
    wiphy 0
    channel 6 (2437 MHz), width: 20 MHz, center1: 2437 MHz
    txpower 20.00 dBm`, explanation: 'Shows your wireless interface details: MAC address, mode (managed = normal client), current channel, and transmit power.' },

    { type: 'callout', variant: 'security', content: 'During a penetration test, wireless recon reveals: Networks with weak/no encryption, hidden SSIDs (still detectable), client devices probing for known networks (revealing travel history), and corporate networks with potentially exploitable configurations.' },

    { type: 'heading', level: 2, content: 'Common Wireless Attacks' },

    { type: 'heading', level: 3, content: '1. Evil Twin Attack' },
    { type: 'paragraph', content: 'The attacker creates a fake access point with the same SSID as a legitimate network. When victims connect to the fake AP, all their traffic passes through the attacker\'s machine.' },
    { type: 'list', items: [
      'Attacker sets up AP with identical SSID and stronger signal',
      'Victims\' devices auto-connect to the stronger signal',
      'All traffic (passwords, emails, browsing) visible to attacker',
      'Particularly effective in public places (airports, hotels)',
      'Defense: Use VPN on public Wi-Fi, verify certificate warnings'
    ]},

    { type: 'heading', level: 3, content: '2. Deauthentication Attack' },
    { type: 'paragraph', content: 'The attacker sends forged deauthentication frames to disconnect clients from their legitimate AP. This is used to:' },
    { type: 'list', items: [
      'Force clients to reconnect (capturing the WPA handshake for cracking)',
      'Push clients toward an evil twin AP',
      'Cause denial-of-service (continuous disconnections)',
      'WPA3 with PMF (Protected Management Frames) blocks this attack'
    ]},

    { type: 'heading', level: 3, content: '3. WPA2 Handshake Capture & Cracking' },
    { type: 'paragraph', content: 'When a device connects to a WPA2 network, a 4-way handshake occurs. If captured, it can be brute-forced offline:' },

    { type: 'command', command: 'aircrack-ng -w /usr/share/wordlists/rockyou.txt capture.cap', output: `Opening capture.cap
Reading packets, please wait...

                               Aircrack-ng 1.7

      [00:02:34] 847293/14344392 keys tested (5623.41 k/s)

      Time left: 39 minutes, 12 seconds                    5.91%

                        KEY FOUND! [ password123 ]

      Master Key     : AA BB CC DD EE FF 00 11 22 33 44 55 66 77 88 99
                       AA BB CC DD EE FF 00 11 22 33 44 55 66 77 88 99

      Transient Key  : 12 34 56 78 9A BC DE F0 12 34 56 78 9A BC DE F0
                       12 34 56 78 9A BC DE F0 12 34 56 78 9A BC DE F0

      EAPOL HMAC     : AB CD EF 01 23 45 67 89 AB CD EF 01 23 45 67 89`, explanation: 'This demonstrates why weak Wi-Fi passwords are dangerous. The password "password123" was found in the rockyou.txt wordlist in under 3 minutes. A strong, random password would take millions of years.' },

    { type: 'callout', variant: 'warning', content: 'Important: Only perform wireless attacks on networks you own or have explicit written permission to test. Unauthorized wireless interception is a federal crime under the Computer Fraud and Abuse Act (CFAA) and equivalent laws worldwide.' },

    { type: 'heading', level: 2, content: 'Securing Your Wireless Network' },
    { type: 'paragraph', content: 'Best practices for wireless security:' },
    { type: 'list', items: [
      'Use WPA3 if available, WPA2 with AES/CCMP minimum (never WEP/TKIP)',
      'Choose a strong password: 12+ characters, random, not in any dictionary',
      'Change the default router admin password (admin/admin is common)',
      'Disable WPS (Wi-Fi Protected Setup) — it has a known PIN brute-force vulnerability',
      'Use a separate guest network for visitors (isolated from your main network)',
      'Enable MAC filtering as an additional layer (not a primary defense)',
      'Reduce transmit power if possible (limits range of your signal)',
      'Regularly check connected devices for unauthorized clients',
      'For enterprise: Use WPA2/3-Enterprise with RADIUS and 802.1X',
      'Keep router firmware updated — vulnerabilities are discovered regularly'
    ]},

    { type: 'heading', level: 2, content: 'Monitoring Your Wireless Environment' },
    { type: 'command', command: 'sudo iw dev wlan0 station dump', output: `Station aa:bb:cc:11:22:33 (on wlan0)
    inactive time:  230 ms
    rx bytes:       1234567
    tx bytes:       7654321
    signal:         -45 dBm
    tx bitrate:     72.2 MBit/s
    connected time: 3420 seconds
Station dd:ee:ff:44:55:66 (on wlan0)
    inactive time:  45 ms
    rx bytes:       56789012
    tx bytes:       21098765
    signal:         -62 dBm
    tx bitrate:     54.0 MBit/s
    connected time: 12045 seconds`, explanation: 'If you\'re running an AP, this shows all connected clients with their MAC addresses, signal strength, data transferred, and connection time. Unknown MACs = unauthorized clients.' },

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'paragraph', content: 'Wireless networks are inherently less secure than wired because the medium (radio waves) can\'t be physically contained:' },
    { type: 'list', items: [
      'Always use the strongest encryption available (WPA3 > WPA2 > WPA > never WEP)',
      'Public Wi-Fi without VPN = broadcasting your data to everyone nearby',
      'Evil twin attacks are trivial to execute — always verify network authenticity',
      'Strong passwords are your primary defense against offline cracking attacks',
      'Enterprise environments should use 802.1X with certificates for authentication',
      'Wireless IDS (WIDS) can detect rogue APs and deauth attacks in enterprise settings',
      'The future is WPA3 — it fixes most WPA2 weaknesses by design'
    ]},
  ],
  navigation: {
    prev: { title: 'Network Services & Protocols', slug: 'network-services-protocols' },
    next: { title: 'Introduction to Network Security', slug: 'intro-network-security' },
  },
};
