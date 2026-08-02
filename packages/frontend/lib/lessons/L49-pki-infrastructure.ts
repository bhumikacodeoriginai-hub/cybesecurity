export const lesson = {
  id: 'L49',
  title: 'Public Key Infrastructure (PKI)',
  slug: 'pki-infrastructure',
  type: 'THEORY',
  duration: 40,
  xpReward: 30,
  difficulty: 'intermediate',
  module: { title: 'Cryptography', slug: 'cryptography' },
  course: { title: 'Applied Cryptography', slug: 'applied-cryptography' },
  keyTerms: [
    'PKI', 'Certificate Authority', 'Root CA', 'Intermediate CA',
    'CRL', 'OCSP', 'Certificate Transparency', "Let's Encrypt",
    'Key Escrow', 'Registration Authority', 'Trust Store'
  ],
  content: [
    { type: 'heading', content: 'Public Key Infrastructure (PKI)' },
    { type: 'paragraph', content: 'PKI is the framework of policies, hardware, software, and procedures that manages digital certificates and public keys. It answers the fundamental question: "How do I know this public key truly belongs to who they claim to be?" Without PKI, anyone could publish a fake public key claiming to be your bank.' },


    { type: 'callout', variant: 'info', content: 'Analogy: PKI is like the passport system. Your government (Certificate Authority) verifies your identity and issues a passport (certificate). Foreign countries trust your passport because they trust your government. If your passport is stolen/revoked, border control (browsers) checks a blacklist (CRL/OCSP) and denies entry.' },

    { type: 'heading', level: 2, content: 'PKI Components' },
    { type: 'list', items: [
      'Certificate Authority (CA) — Issues and signs certificates (the "trusted government")',
      'Registration Authority (RA) — Verifies identity before CA issues the cert',
      'Certificate Database — Stores issued certificates and their status',
      'Certificate Revocation List (CRL) — Published list of revoked certificates',
      'OCSP Responder — Real-time certificate status checking',
      'Trust Store — Pre-installed root CA certificates in your OS/browser',
      'End Entity — The user, server, or device that holds a certificate'
    ]},

    { type: 'heading', level: 2, content: 'The Trust Model' },
    { type: 'paragraph', content: 'Your browser trusts ~150 root CAs pre-installed in its trust store. These roots sign intermediate CAs, which sign end-entity certificates. This hierarchy is called the chain of trust:' },

    { type: 'command', command: 'openssl s_client -connect github.com:443 -showcerts 2>/dev/null | grep "s:\\|i:"', output: `s:C = US, ST = California, L = San Francisco, O = GitHub, Inc., CN = github.com
i:C = US, O = DigiCert Inc, CN = DigiCert TLS Hybrid ECC SHA384 2020 CA1
s:C = US, O = DigiCert Inc, CN = DigiCert TLS Hybrid ECC SHA384 2020 CA1
i:C = US, O = DigiCert Inc, CN = DigiCert Global Root CA`, explanation: 'GitHub\'s certificate chain: (1) github.com cert issued by DigiCert intermediate, (2) DigiCert intermediate issued by DigiCert Root. Your browser has DigiCert Root in its trust store → chain validates → padlock appears.' },

    { type: 'heading', level: 2, content: 'Certificate Lifecycle' },
    { type: 'list', items: [
      '1. Key Generation — Server generates a key pair',
      '2. CSR (Certificate Signing Request) — Server creates a request containing its public key + identity',
      '3. Validation — CA verifies the requester controls the domain (DV) or organization (OV/EV)',
      '4. Issuance — CA signs the certificate and returns it',
      '5. Installation — Certificate installed on the server',
      '6. Monitoring — Track expiration, watch CT logs for unauthorized certs',
      '7. Renewal — Before expiration, repeat the process (Let\'s Encrypt automates this)',
      '8. Revocation — If key is compromised, CA adds cert to CRL and OCSP'
    ]},

    { type: 'command', command: 'openssl req -new -key private.pem -out request.csr -subj "/CN=www.mysite.com/O=My Company/C=US"', output: '', explanation: 'Generates a Certificate Signing Request. This is sent to the CA. It contains: your public key, domain name, and organization details. The CA verifies these before signing.' },

    { type: 'heading', level: 2, content: 'Certificate Revocation' },
    { type: 'paragraph', content: 'When a private key is compromised, the certificate must be revoked immediately. Two mechanisms:' },

    { type: 'heading', level: 3, content: 'CRL (Certificate Revocation List)' },
    { type: 'command', command: 'openssl crl -in crl.pem -text -noout | head -10', output: `Certificate Revocation List (CRL):
    Version 2 (0x1)
    Signature Algorithm: sha256WithRSAEncryption
    Issuer: CN = DigiCert SHA2 Extended Validation Server CA
    Last Update: Jun 15 12:00:00 2024 GMT
    Next Update: Jun 22 12:00:00 2024 GMT
Revoked Certificates:
    Serial Number: 0A:01:2B:3C:4D:5E:6F
        Revocation Date: Jun 10 09:30:00 2024 GMT`, explanation: 'A CRL is a published list of revoked certificate serial numbers. Problem: CRLs can be large and clients must download the full list. Alternative: OCSP for real-time checks.' },

    { type: 'heading', level: 2, content: 'Certificate Transparency (CT)' },
    { type: 'paragraph', content: 'CT logs are public, append-only ledgers of ALL issued certificates. Any certificate issued for your domain appears in CT logs — you can monitor them to detect unauthorized certificate issuance.' },
    { type: 'list', items: [
      'All CAs must submit certificates to CT logs (required since 2018)',
      'Anyone can search CT logs for certificates issued to their domain',
      'Detects: Rogue CAs, compromised CAs, unauthorized cert issuance',
      'Tools: crt.sh, Certspotter, Facebook CT monitoring',
      'If an attacker gets a cert for your domain, CT logs reveal it quickly'
    ]},

    { type: 'command', command: 'curl -s "https://crt.sh/?q=example.com&output=json" | python3 -m json.tool | head -20', output: `[
  {
    "id": 12345678,
    "logged_at": "2024-06-01T10:00:00.000",
    "issuer_name": "C=US, O=Let's Encrypt, CN=R3",
    "common_name": "example.com",
    "name_value": "example.com\\n*.example.com",
    "not_before": "2024-06-01T09:00:00",
    "not_after": "2024-08-30T09:00:00"
  }
]`, explanation: 'Searching CT logs for certificates issued to example.com. If you see a certificate you didn\'t request (wrong CA, wrong date), someone may have compromised your domain validation or a CA has been breached.' },

    { type: 'heading', level: 2, content: 'Let\'s Encrypt: Free PKI for Everyone' },
    { type: 'paragraph', content: 'Let\'s Encrypt revolutionized PKI by providing free, automated certificates. It uses the ACME protocol to verify domain control and issue certificates in seconds.' },
    { type: 'list', items: [
      'Free Domain Validation (DV) certificates for anyone',
      'Automated renewal via certbot or other ACME clients',
      'Certificates valid for 90 days (encourages automation, limits damage from compromise)',
      'Secured over 300 million websites since 2015',
      'Removed the cost barrier that kept many sites on HTTP'
    ]},

    { type: 'command', command: 'certbot certonly --nginx -d www.mysite.com -d mysite.com', output: `Saving debug log to /var/log/letsencrypt/letsencrypt.log
Requesting a certificate for www.mysite.com and mysite.com
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/www.mysite.com/fullchain.pem
Key is saved at: /etc/letsencrypt/live/www.mysite.com/privkey.pem
This certificate expires on 2024-09-13.`, explanation: 'Certbot automatically verifies domain ownership and obtains a signed certificate from Let\'s Encrypt. Set up a cron job for automatic renewal before the 90-day expiration.' },

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'list', items: [
      'PKI is the trust backbone of the internet — it makes HTTPS, email signing, and code signing work',
      'Certificate chain must validate to a trusted root — one broken link = untrusted',
      'Monitor CT logs for unauthorized certificates issued for your domains',
      'Revocation (CRL/OCSP) is essential but imperfect — browsers may soft-fail',
      'Let\'s Encrypt made HTTPS free and automated — use it for all sites',
      'Protect CA private keys with HSMs — CA compromise = trust collapse',
      'CAA DNS records restrict which CAs can issue certs for your domain',
      'Always plan for certificate rotation — expired certs cause outages'
    ]},
  ],
  navigation: {
    prev: { title: 'TLS/SSL: Securing Communications', slug: 'tls-ssl-security' },
    next: { title: 'Cryptographic Attacks & Best Practices', slug: 'crypto-attacks-practices' },
  },
};
