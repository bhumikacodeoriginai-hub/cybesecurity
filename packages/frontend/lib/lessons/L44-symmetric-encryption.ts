export const lesson = {
  id: 'L44',
  title: 'Symmetric Encryption: AES & Block Ciphers',
  slug: 'symmetric-encryption',
  type: 'PRACTICAL',
  duration: 50,
  xpReward: 35,
  difficulty: 'intermediate',
  module: { title: 'Cryptography', slug: 'cryptography' },
  course: { title: 'Applied Cryptography', slug: 'applied-cryptography' },
  keyTerms: [
    'Symmetric Encryption', 'AES', 'Block Cipher', 'Stream Cipher',
    'Key', 'IV', 'CBC', 'GCM', 'ECB', 'Padding', 'Key Length'
  ],
  content: [
    { type: 'heading', content: 'Symmetric Encryption: AES & Block Ciphers' },
    { type: 'paragraph', content: 'Symmetric encryption uses the SAME key to both encrypt and decrypt data. It\'s the workhorse of modern cryptography — fast enough to encrypt gigabytes of data in real-time. AES (Advanced Encryption Standard) is the global standard used by governments, banks, and every HTTPS connection.' },

    { type: 'callout', variant: 'info', content: 'Analogy: Symmetric encryption is like a physical padlock where both the sender and receiver have identical copies of the same key. Anyone with the key can lock (encrypt) or unlock (decrypt) the box. The challenge: How do you safely share the key with someone far away without an eavesdropper intercepting it?' },

    { type: 'heading', level: 2, content: 'How Symmetric Encryption Works' },
    { type: 'list', items: [
      'Plaintext (readable data) + Key → Encryption Algorithm → Ciphertext (unreadable)',
      'Ciphertext + Same Key → Decryption Algorithm → Original Plaintext',
      'Without the key, ciphertext appears as random noise',
      'Key must be kept SECRET — if the key is compromised, all encrypted data is exposed',
      'Both parties must possess the same key (the "key distribution problem")'
    ]},

    { type: 'heading', level: 2, content: 'AES: The Gold Standard' },
    { type: 'paragraph', content: 'AES (Rijndael algorithm) was selected by NIST in 2001 after a 5-year international competition. It replaced DES and has no known practical attacks after 25 years of intense study by the world\'s best cryptographers.' },
    { type: 'list', items: [
      'Key sizes: 128-bit, 192-bit, or 256-bit (all considered secure)',
      'Block size: 128 bits (16 bytes) — encrypts data in 16-byte chunks',
      'AES-128: 10 rounds of transformation',
      'AES-192: 12 rounds',
      'AES-256: 14 rounds (used for classified information by NSA)',
      'Speed: Can encrypt 1+ GB/sec on modern CPUs with hardware AES-NI instructions'
    ]},

    { type: 'command', command: 'openssl enc -aes-256-cbc -salt -in secret.txt -out secret.enc -pass pass:MyStrongPassword123!', output: '', explanation: 'Encrypts secret.txt using AES-256 in CBC mode with a password-derived key. The -salt flag adds randomness to prevent dictionary attacks against the password. Output is the encrypted file secret.enc.' },

    { type: 'command', command: 'openssl enc -d -aes-256-cbc -in secret.enc -out decrypted.txt -pass pass:MyStrongPassword123!', output: '', explanation: 'Decrypts the file with the same password. The -d flag means decrypt. If the password is wrong, OpenSSL returns "bad decrypt" — the key doesn\'t match.' },

    { type: 'command', command: 'xxd secret.enc | head -5', output: `00000000: 5361 6c74 6564 5f5f e3a2 b1c0 d4f5 6789  Salted__......g.
00000010: 2a3b 4c5d 6e7f 8091 a2b3 c4d5 e6f7 0819  *;L]n...........
00000020: 1a2b 3c4d 5e6f 7081 9293 a4b5 c6d7 e8f9  .+<M^op.........
00000030: 0a1b 2c3d 4e5f 6071 8293 a4b5 c6d7 e8f9  ..,=N_\`q........
00000040: 3847 5665 7483 9201 a1b0 cfde edfc 0b1a  8GVet...........`, explanation: 'The encrypted file starts with "Salted__" (OpenSSL\'s marker) followed by random-looking bytes. This is what the data looks like without the key — completely unintelligible.' },

    { type: 'heading', level: 2, content: 'Block Cipher Modes of Operation' },
    { type: 'paragraph', content: 'AES encrypts exactly 16 bytes at a time. But real data is larger than 16 bytes. "Modes of operation" define how to handle multiple blocks. The mode you choose dramatically impacts security.' },

    { type: 'heading', level: 3, content: 'ECB Mode (Electronic Codebook) — NEVER USE' },
    { type: 'paragraph', content: 'Each 16-byte block is encrypted independently with the same key. Identical plaintext blocks produce identical ciphertext blocks — this leaks patterns.' },
    { type: 'list', items: [
      'Same input block → Same output block (deterministic)',
      'Patterns in plaintext are visible in ciphertext',
      'The famous "ECB penguin": encrypting an image in ECB mode still shows the penguin outline',
      'NEVER use ECB for anything — it\'s insecure by design'
    ]},

    { type: 'heading', level: 3, content: 'CBC Mode (Cipher Block Chaining) — Good' },
    { type: 'paragraph', content: 'Each block is XORed with the previous ciphertext block before encryption. An Initialization Vector (IV) randomizes the first block.' },
    { type: 'list', items: [
      'Identical plaintext blocks → Different ciphertext (because of chaining)',
      'Requires a random IV for each encryption (IV is not secret, stored with ciphertext)',
      'Widely used but vulnerable to padding oracle attacks if error messages leak info',
      'Sequential processing — cannot be parallelized (slower than GCM)'
    ]},

    { type: 'heading', level: 3, content: 'GCM Mode (Galois/Counter Mode) — Recommended' },
    { type: 'paragraph', content: 'The modern standard. Provides BOTH encryption AND authentication (AEAD — Authenticated Encryption with Associated Data).' },
    { type: 'list', items: [
      'Encrypts data AND generates an authentication tag',
      'If anyone modifies the ciphertext, authentication fails (integrity protection)',
      'Parallelizable — very fast on modern hardware',
      'Used in TLS 1.3 (AES-256-GCM is the default cipher)',
      'Requires a unique nonce (number used once) per encryption — NEVER reuse nonces!'
    ]},

    { type: 'command', command: 'python3 -c "\nimport os\nfrom cryptography.hazmat.primitives.ciphers.aead import AESGCM\n\n# Generate a random 256-bit key\nkey = AESGCM.generate_key(bit_length=256)\nprint(f\'Key (hex): {key.hex()[:32]}...\')\n\n# Encrypt with AES-256-GCM\naesgcm = AESGCM(key)\nnonce = os.urandom(12)  # 96-bit nonce, must be unique per message\nplaintext = b\'Top Secret: Launch codes are 1234\'\nassociated_data = b\'metadata-not-encrypted-but-authenticated\'\n\nciphertext = aesgcm.encrypt(nonce, plaintext, associated_data)\nprint(f\'Ciphertext ({len(ciphertext)} bytes): {ciphertext.hex()[:40]}...\')\nprint(f\'Includes 16-byte auth tag for integrity verification\')\n\n# Decrypt\ndecrypted = aesgcm.decrypt(nonce, ciphertext, associated_data)\nprint(f\'Decrypted: {decrypted.decode()}\')\n"', output: `Key (hex): a7b3c9d2e1f04567890abcdef1234567...
Ciphertext (50 bytes): 3f8a2b7c9d0e1f4a5b6c7d8e9f0a1b2c3d4e5f6a7b...
Includes 16-byte auth tag for integrity verification
Decrypted: Top Secret: Launch codes are 1234`, explanation: 'AES-256-GCM in Python: Generates a random key, encrypts with a unique nonce, and includes associated data that\'s authenticated but not encrypted (e.g., headers, metadata). The ciphertext includes a 16-byte authentication tag.' },

    { type: 'callout', variant: 'security', content: 'Critical rule: Never reuse a nonce with the same key in GCM mode. Nonce reuse completely breaks the authentication guarantee and can leak the encryption key. Use a counter or random 96-bit value, and rotate keys before nonce space exhaustion.' },

    { type: 'heading', level: 2, content: 'Stream Ciphers' },
    { type: 'paragraph', content: 'Unlike block ciphers (fixed 16-byte blocks), stream ciphers encrypt one byte at a time. They generate a pseudorandom stream of bytes (keystream) that\'s XORed with the plaintext.' },
    { type: 'list', items: [
      'ChaCha20 — Modern stream cipher by Daniel Bernstein, used in WireGuard and TLS',
      'RC4 — Legacy stream cipher, BROKEN (biases in keystream), banned from TLS',
      'ChaCha20-Poly1305 — ChaCha20 encryption + Poly1305 authentication (AEAD)',
      'Used where AES hardware acceleration isn\'t available (mobile, IoT)',
      'Same speed as AES-GCM in software, faster on devices without AES-NI'
    ]},

    { type: 'heading', level: 2, content: 'The Key Distribution Problem' },
    { type: 'paragraph', content: 'Symmetric encryption\'s weakness: both parties need the same key. How do you share a secret key over an insecure channel without it being intercepted?' },
    { type: 'list', items: [
      'Physical exchange — Meet in person and exchange keys (impractical at scale)',
      'Diffie-Hellman key exchange — Agree on a shared secret over an insecure channel',
      'Asymmetric encryption — Encrypt the symmetric key with the recipient\'s public key',
      'Key Derivation Functions — Derive encryption keys from passwords (PBKDF2, Argon2)',
      'In practice: TLS uses asymmetric crypto to exchange a symmetric session key'
    ]},

    { type: 'heading', level: 2, content: 'Practical Exercise: File Encryption' },
    { type: 'command', command: 'openssl rand -hex 32', output: `a7b3c9d2e1f04567890abcdef123456789abcdef0123456789abcdef01234567`, explanation: 'Generate a random 256-bit (32-byte) key in hexadecimal. This is a proper cryptographic key — use for AES-256 encryption.' },

    { type: 'command', command: 'openssl enc -aes-256-gcm -iv $(openssl rand -hex 12) -K a7b3c9d2e1f04567890abcdef123456789abcdef0123456789abcdef01234567 -in confidential.pdf -out confidential.pdf.enc', output: '', explanation: 'Encrypts a PDF using AES-256-GCM with a random 96-bit IV and the hex key. The output is unreadable without the key.' },

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'list', items: [
      'Symmetric encryption is fast — used for bulk data encryption (files, disk, network traffic)',
      'AES-256-GCM is the recommended default for most applications',
      'NEVER use ECB mode — it leaks patterns. Always use GCM or CBC with HMAC.',
      'Keys must be truly random (use /dev/urandom or crypto libraries, not rand())',
      'Nonce/IV must be unique per encryption — never reuse with the same key',
      'Key management is the hardest part — store keys in HSMs or secret managers',
      'The key distribution problem is solved by combining with asymmetric crypto (next lesson)',
      'Deprecated algorithms to avoid: DES, 3DES, RC4, Blowfish'
    ]},
  ],
  navigation: {
    prev: { title: 'Security Misconfigurations & Vulnerable Components', slug: 'security-misconfigurations' },
    next: { title: 'Asymmetric Encryption: RSA & Key Exchange', slug: 'asymmetric-encryption' },
  },
};
