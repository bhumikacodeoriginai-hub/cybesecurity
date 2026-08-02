export const lesson = {
  id: 'L47',
  title: 'Digital Signatures & Certificates',
  slug: 'digital-signatures',
  type: 'PRACTICAL',
  duration: 45,
  xpReward: 30,
  difficulty: 'intermediate',
  module: { title: 'Cryptography', slug: 'cryptography' },
  course: { title: 'Applied Cryptography', slug: 'applied-cryptography' },
  keyTerms: [
    'Digital Signature', 'X.509 Certificate', 'Certificate Authority',
    'Code Signing', 'Non-Repudiation', 'Verification',
    'Self-Signed', 'Root CA', 'Chain of Trust'
  ],
  content: [
    { type: 'heading', content: 'Digital Signatures & Certificates' },
    { type: 'paragraph', content: 'A digital signature proves three things: (1) WHO sent the message (authentication), (2) the message WASN\'T modified (integrity), and (3) the sender CAN\'T deny sending it (non-repudiation). It\'s the electronic equivalent of a handwritten signature — but far more secure because it\'s mathematically verifiable.' },


    { type: 'callout', variant: 'info', content: 'Analogy: A digital signature is like signing a document with a wax seal that includes your DNA. Anyone can verify the seal is authentic (public key), only you can create it (private key), and if someone changes even one word in the document after you sealed it, the seal visibly breaks (hash verification).' },

    { type: 'heading', level: 2, content: 'How Digital Signatures Work' },
    { type: 'list', items: [
      '1. Sender hashes the message (SHA-256) → produces a fixed-size digest',
      '2. Sender encrypts the hash with their PRIVATE key → this is the signature',
      '3. Sender sends the message + signature to the recipient',
      '4. Recipient decrypts the signature with sender\'s PUBLIC key → extracts the hash',
      '5. Recipient independently hashes the received message',
      '6. If both hashes match → signature is valid (message is authentic and unmodified)'
    ]},

    { type: 'heading', level: 2, content: 'Creating and Verifying Signatures' },
    { type: 'command', command: 'openssl dgst -sha256 -sign private_key.pem -out signature.bin document.pdf', output: '', explanation: 'Signs document.pdf using your private key. The signature is written to signature.bin. Only your private key can create this specific signature for this specific file.' },

    { type: 'command', command: 'openssl dgst -sha256 -verify public_key.pem -signature signature.bin document.pdf', output: `Verified OK`, explanation: '"Verified OK" means: (1) The signature was created by the holder of the corresponding private key, (2) The document hasn\'t been modified since signing. If ANYTHING in the PDF changed, this would say "Verification Failure."' },

    { type: 'command', command: 'echo "modified" >> document.pdf && openssl dgst -sha256 -verify public_key.pem -signature signature.bin document.pdf', output: `Verification Failure`, explanation: 'After modifying even one byte of the document, signature verification fails. The hash of the modified file doesn\'t match the hash in the signature. Tampering detected!' },

    { type: 'heading', level: 2, content: 'X.509 Certificates' },
    { type: 'paragraph', content: 'A certificate binds a public key to an identity (person, organization, or domain). It\'s signed by a Certificate Authority (CA) that vouches for the binding.' },

    { type: 'command', command: 'openssl x509 -in server.crt -text -noout | head -25', output: `Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number: 04:00:00:00:00:01:2f:4e:e1
        Signature Algorithm: sha256WithRSAEncryption
        Issuer: C=US, O=DigiCert Inc, CN=DigiCert Global Root G2
        Validity
            Not Before: Jun 15 12:00:00 2023 GMT
            Not After : Jun 15 12:00:00 2025 GMT
        Subject: C=US, ST=California, O=Example Inc, CN=www.example.com
        Subject Public Key Info:
            Public Key Algorithm: id-ecPublicKey
                ASN1 OID: prime256v1
                Public-Key: (256 bit)`, explanation: 'An X.509 certificate contains: Who issued it (DigiCert), who it\'s for (www.example.com), when it expires, the public key, and the CA\'s signature over all of it.' },

    { type: 'heading', level: 3, content: 'Certificate Chain of Trust' },
    { type: 'list', items: [
      'Root CA — Self-signed, pre-installed in your browser/OS. Ultimate trust anchor.',
      'Intermediate CA — Signed by Root CA. Issues end-entity certificates.',
      'End-Entity Certificate — Your server\'s cert, signed by Intermediate CA.',
      'Verification: Browser checks end-cert → intermediate → root (must reach a trusted root)',
      'If any link in the chain is invalid/expired/revoked, the certificate is rejected'
    ]},

    { type: 'heading', level: 2, content: 'Code Signing' },
    { type: 'paragraph', content: 'Software vendors sign their executables with a code signing certificate. Your OS verifies the signature before running the code — if modified (malware injection), the signature breaks.' },
    { type: 'list', items: [
      'Windows: Unsigned executables show "Unknown Publisher" warnings',
      'macOS: Gatekeeper blocks unsigned apps by default',
      'Linux: Package managers verify GPG signatures on all packages',
      'Supply chain attacks target code signing (SolarWinds compromised the build process)',
      'Stolen code signing certificates are extremely valuable to attackers'
    ]},

    { type: 'command', command: 'gpg --verify package-1.2.3.tar.gz.sig package-1.2.3.tar.gz', output: `gpg: Signature made Thu 15 Jun 2024 10:30:00 UTC
gpg:                using RSA key 4AEE18F83AFDEB23
gpg: Good signature from "Package Maintainer <dev@example.com>"`, explanation: 'Verifying a GPG signature on a downloaded package. "Good signature" confirms the file came from the maintainer and wasn\'t tampered with. Attackers who compromise download servers can\'t forge signatures without the private key.' },

    { type: 'heading', level: 2, content: 'Self-Signed vs CA-Signed Certificates' },
    { type: 'list', items: [
      'Self-signed: You sign your own certificate. Browsers show a scary warning.',
      '  Use for: Development, internal testing, private services',
      'CA-signed: A trusted CA verifies your identity and signs your certificate.',
      '  Use for: Any public-facing website or service',
      'Let\'s Encrypt: Free CA-signed certificates, automated renewal',
      'Self-signed certificates are NOT less secure encryption-wise — the issue is trust/identity'
    ]},

    { type: 'command', command: 'openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/CN=localhost"', output: `Generating a RSA private key
...+++++
writing new private key to 'key.pem'`, explanation: 'Generates a self-signed certificate for localhost (valid 365 days). Good for development. -nodes means no passphrase on the key. For production, use Let\'s Encrypt or a commercial CA.' },

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'list', items: [
      'Digital signatures provide authentication, integrity, and non-repudiation',
      'Certificates bind public keys to identities — verified by Certificate Authorities',
      'Always verify signatures on downloaded software (prevent supply chain attacks)',
      'Certificate expiration and revocation must be monitored continuously',
      'Let\'s Encrypt made HTTPS free — there\'s no excuse for unencrypted sites',
      'Code signing protects users from modified/malicious executables',
      'Never ignore certificate warnings — they often indicate active attacks',
      'Protect private keys: HSMs for CAs, strong passphrases for personal keys'
    ]},
  ],
  navigation: {
    prev: { title: 'Hashing: SHA, MD5, bcrypt & Integrity', slug: 'hashing-integrity' },
    next: { title: 'TLS/SSL: Securing Communications', slug: 'tls-ssl-security' },
  },
};
