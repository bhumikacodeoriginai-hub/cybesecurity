export const lesson = {
  id: 'L48',
  title: 'TLS/SSL: Securing Communications',
  slug: 'tls-ssl-security',
  type: 'PRACTICAL',
  duration: 50,
  xpReward: 35,
  difficulty: 'intermediate',
  module: { title: 'Cryptography', slug: 'cryptography' },
  course: { title: 'Applied Cryptography', slug: 'applied-cryptography' },
  keyTerms: [
    'TLS', 'SSL', 'Handshake', 'Cipher Suite', 'HTTPS',
    'Perfect Forward Secrecy', 'Certificate Pinning', 'HSTS',
    'TLS 1.3', 'Session Resumption', 'SNI'
  ],
  content: [
    { type: 'heading', content: 'TLS/SSL: Securing Communications' },
    { type: 'paragraph', content: 'TLS (Transport Layer Security) is the protocol that makes HTTPS possible. It encrypts the communication channel between your browser and a web server, preventing eavesdropping, tampering, and impersonation. Every time you see the padlock icon, TLS is at work.' },


    { type: 'callout', variant: 'info', content: 'Analogy: TLS is like establishing a private, soundproof room in the middle of a crowded market. Before you talk, you verify the other person\'s ID (certificate), agree on a secret code language (cipher suite), and exchange codebooks (key exchange). Only then do you share secrets — even though everyone around you can see you\'re talking, they can\'t understand a word.' },

    { type: 'heading', level: 2, content: 'The TLS 1.3 Handshake' },
    { type: 'paragraph', content: 'TLS 1.3 (2018) is the latest version — faster and more secure than its predecessors. It completes in just 1 round trip (1-RTT) compared to TLS 1.2\'s 2 round trips.' },
    { type: 'list', items: [
      '1. Client Hello — Client sends supported cipher suites + key share (ECDHE public value)',
      '2. Server Hello — Server picks cipher suite, sends its key share + certificate + signature',
      '3. Both compute shared secret from key exchange — encrypted communication begins immediately',
      'TLS 1.3 removed: RSA key exchange, CBC ciphers, SHA-1, compression, renegotiation',
      'Only secure algorithms remain: ECDHE for key exchange, AES-GCM or ChaCha20 for encryption'
    ]},

    { type: 'command', command: 'openssl s_client -connect example.com:443 -tls1_3 2>/dev/null | head -15', output: `CONNECTED(00000003)
---
Certificate chain
 0 s:CN = www.example.org
   i:C = US, O = DigiCert Inc, CN = DigiCert TLS RSA SHA256 2020 CA1
 1 s:C = US, O = DigiCert Inc, CN = DigiCert TLS RSA SHA256 2020 CA1
   i:C = US, O = DigiCert Inc, CN = DigiCert Global Root G2
---
Server certificate
-----BEGIN CERTIFICATE-----
MIIHQDCCBiigAwIBAgIQD9...`, explanation: 'Connects to example.com using TLS 1.3 and shows the certificate chain. Two certificates: the server\'s cert signed by DigiCert intermediate CA, which is signed by DigiCert Root CA.' },

    { type: 'heading', level: 2, content: 'Cipher Suites' },
    { type: 'paragraph', content: 'A cipher suite defines the specific algorithms used for key exchange, encryption, and authentication:' },

    { type: 'command', command: 'openssl s_client -connect example.com:443 2>/dev/null | grep "Cipher\\|Protocol"', output: `    Protocol  : TLSv1.3
    Cipher    : TLS_AES_256_GCM_SHA384`, explanation: 'TLS_AES_256_GCM_SHA384 means: AES-256 for encryption, GCM mode (authenticated), SHA-384 for the handshake hash. In TLS 1.3, ECDHE key exchange is always used (not part of the cipher suite name).' },

    { type: 'heading', level: 2, content: 'Perfect Forward Secrecy (PFS)' },
    { type: 'paragraph', content: 'PFS ensures that if the server\'s private key is compromised in the future, past recorded traffic CANNOT be decrypted. Each connection uses a unique ephemeral key.' },
    { type: 'list', items: [
      'Without PFS (RSA key exchange): Compromise private key → decrypt ALL past traffic',
      'With PFS (ECDHE): Each session uses a temporary key pair, discarded after use',
      'Even with the server\'s private key, past sessions remain encrypted',
      'TLS 1.3 REQUIRES PFS — no non-PFS cipher suites allowed',
      'Critical for: Banking, healthcare, government — protect against future key compromise'
    ]},

    { type: 'heading', level: 2, content: 'Testing TLS Configuration' },
    { type: 'command', command: 'nmap --script ssl-enum-ciphers -p 443 target.com', output: `PORT    STATE SERVICE
443/tcp open  https
| ssl-enum-ciphers:
|   TLSv1.3:
|     ciphers:
|       TLS_AES_256_GCM_SHA384 (ecdh_x25519) - A
|       TLS_CHACHA20_POLY1305_SHA256 (ecdh_x25519) - A
|       TLS_AES_128_GCM_SHA256 (ecdh_x25519) - A
|     cipher preference: server
|   TLSv1.2:
|     ciphers:
|       TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (ecdh_x25519) - A
|       TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256 (ecdh_x25519) - A
|     cipher preference: server
|_  least strength: A`, explanation: 'Excellent configuration: Only TLS 1.3 and 1.2, only strong cipher suites with ECDHE (PFS), grade "A". No TLS 1.0/1.1, no RC4, no CBC-mode ciphers.' },

    { type: 'callout', variant: 'security', content: 'TLS version guidance (2024): TLS 1.3 = excellent (enable). TLS 1.2 = acceptable (keep for compatibility). TLS 1.1 = deprecated (disable). TLS 1.0 = insecure (disable). SSL 3.0/2.0 = broken (must be disabled). Major browsers have dropped TLS 1.0/1.1 support.' },

    { type: 'heading', level: 2, content: 'Common TLS Attacks and Mitigations' },
    { type: 'list', items: [
      'Downgrade attack — Attacker forces use of weaker TLS version/cipher (defense: TLS_FALLBACK_SCSV)',
      'BEAST (2011) — Exploits CBC mode in TLS 1.0 (defense: use TLS 1.2+)',
      'POODLE (2014) — Exploits SSL 3.0 padding (defense: disable SSL 3.0)',
      'Heartbleed (2014) — OpenSSL bug leaked server memory (defense: patch immediately)',
      'ROBOT (2017) — RSA key exchange vulnerability (defense: disable RSA key exchange)',
      'Certificate impersonation — Attacker obtains cert for your domain (defense: CAA records, CT logs)'
    ]},

    { type: 'heading', level: 2, content: 'HSTS: HTTP Strict Transport Security' },
    { type: 'command', command: 'curl -I https://example.com | grep -i strict', output: `strict-transport-security: max-age=31536000; includeSubDomains; preload`, explanation: 'HSTS tells the browser: "Always use HTTPS for this domain. Never try HTTP." This prevents SSL stripping attacks where a MitM downgrades HTTPS to HTTP. max-age=31536000 means remember for 1 year.' },

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'list', items: [
      'TLS 1.3 is the standard — faster handshake, only secure algorithms',
      'Always verify certificates: wrong cert = MitM attack or misconfiguration',
      'PFS is essential: protects past communications from future key compromise',
      'Enable HSTS to prevent SSL stripping attacks',
      'Disable TLS 1.0/1.1 — they have known vulnerabilities',
      'Use tools (ssllabs.com, nmap ssl-enum-ciphers) to audit your TLS configuration',
      'Certificate transparency logs help detect unauthorized certificate issuance',
      'Keep TLS libraries updated — Heartbleed showed a single bug can expose millions'
    ]},
  ],
  navigation: {
    prev: { title: 'Digital Signatures & Certificates', slug: 'digital-signatures' },
    next: { title: 'Public Key Infrastructure (PKI)', slug: 'pki-infrastructure' },
  },
};
