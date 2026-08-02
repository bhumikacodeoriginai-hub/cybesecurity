export const lesson = {
  id: 'L46',
  title: 'Hashing: SHA, MD5, bcrypt & Integrity Verification',
  slug: 'hashing-integrity',
  type: 'PRACTICAL',
  duration: 45,
  xpReward: 30,
  difficulty: 'intermediate',
  module: { title: 'Cryptography', slug: 'cryptography' },
  course: { title: 'Applied Cryptography', slug: 'applied-cryptography' },
  keyTerms: [
    'Hash Function', 'SHA-256', 'MD5', 'bcrypt', 'Argon2',
    'Collision', 'Rainbow Table', 'Salt', 'HMAC',
    'Integrity', 'One-Way Function', 'Digest'
  ],
  content: [
    { type: 'heading', content: 'Hashing: SHA, MD5, bcrypt & Integrity Verification' },
    { type: 'paragraph', content: 'A hash function takes input of ANY size and produces a fixed-size output (the "digest" or "hash"). Unlike encryption, hashing is ONE-WAY — you cannot reverse a hash back to the original data. This makes hashing perfect for password storage, integrity verification, and digital signatures.' },


    { type: 'callout', variant: 'info', content: 'Analogy: A hash is like a fingerprint. Every person has a unique fingerprint (hash), but you can\'t reconstruct the person from their fingerprint (one-way). If the fingerprint matches, you know it\'s the same person (integrity). And two different people should never have the same fingerprint (collision resistance).' },

    { type: 'heading', level: 2, content: 'Properties of Cryptographic Hash Functions' },
    { type: 'list', items: [
      'Deterministic — Same input ALWAYS produces the same hash',
      'One-way (pre-image resistance) — Cannot derive input from the hash',
      'Avalanche effect — Tiny input change completely changes the hash',
      'Collision resistance — Infeasible to find two inputs with the same hash',
      'Fixed output size — SHA-256 always outputs 256 bits regardless of input size',
      'Fast to compute — Can hash gigabytes per second'
    ]},

    { type: 'heading', level: 2, content: 'Common Hash Algorithms' },

    { type: 'command', command: 'echo -n "Hello World" | md5sum', output: `b10a8db164e0754105b7a99be72e3fe5  -`, explanation: 'MD5 produces a 128-bit (32 hex chars) digest. MD5 is BROKEN for security (collisions found) but still used for checksums. Never use for passwords or signatures.' },

    { type: 'command', command: 'echo -n "Hello World" | sha256sum', output: `a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e  -`, explanation: 'SHA-256 produces a 256-bit (64 hex chars) digest. Part of the SHA-2 family, it\'s secure and widely used. This is the standard for most applications today.' },

    { type: 'command', command: 'echo -n "Hello World!" | sha256sum', output: `7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069  -`, explanation: 'Adding one exclamation mark completely changes the hash (avalanche effect). This proves integrity — ANY modification to the data produces a totally different hash.' },

    { type: 'command', command: 'echo -n "Hello World" | sha512sum', output: `2c74fd17edafd80e8447b0d46741ee243b7eb74dd2149a0ab1b9246fb30382f27e853d8585719e0e67cbda0daa8f51671064615d645ae27acb15bfb1447f459b  -`, explanation: 'SHA-512 produces a 512-bit digest. More bits = higher security margin, but SHA-256 is already sufficient for all practical purposes.' },


    { type: 'heading', level: 2, content: 'File Integrity Verification' },
    { type: 'paragraph', content: 'Hashes verify that files haven\'t been tampered with during download or storage:' },

    { type: 'command', command: 'sha256sum ubuntu-24.04-desktop-amd64.iso', output: `81fae9cc21e2b1e3a66f4f291d1fcabc18d98e37b37b85b5c5b6f2dfc2c3a4b5  ubuntu-24.04-desktop-amd64.iso`, explanation: 'Computing the hash of a downloaded ISO. Compare this with the hash published on the official website. If they match, the file is authentic and unmodified.' },

    { type: 'command', command: 'echo "81fae9cc21e2b1e3a66f4f291d1fcabc18d98e37b37b85b5c5b6f2dfc2c3a4b5  ubuntu-24.04-desktop-amd64.iso" | sha256sum -c', output: `ubuntu-24.04-desktop-amd64.iso: OK`, explanation: 'Verifies the file against a known hash. "OK" means the file is intact. "FAILED" would mean the file was corrupted or tampered with (malware injection, man-in-the-middle).' },

    { type: 'callout', variant: 'security', content: 'Supply chain attack: Attackers compromise a download server and replace the legitimate file with a malware-infected version. Without hash verification, you\'d install malware thinking it\'s the official software. Always verify hashes from an independent source (signed release notes, official Twitter, etc.).' },

    { type: 'heading', level: 2, content: 'Password Hashing: Why Speed is the Enemy' },
    { type: 'paragraph', content: 'For password storage, FAST hashes (SHA-256, MD5) are actually DANGEROUS. If an attacker steals the hash database, they can guess billions of passwords per second with GPUs. Password hashing algorithms are intentionally SLOW.' },

    { type: 'heading', level: 3, content: 'The Problem with Fast Hashes for Passwords' },
    { type: 'command', command: 'hashcat -m 0 -a 3 hashes.txt ?a?a?a?a?a?a --benchmark', output: `Speed.#1.........: 25846.3 MH/s (MD5)
Speed.#1.........:  8213.5 MH/s (SHA-256)`, explanation: 'A modern GPU can compute 25 BILLION MD5 hashes per second and 8 BILLION SHA-256 hashes per second. An 8-character password using all character types has ~6 trillion combinations — crackable in about 12 minutes with SHA-256!' },

    { type: 'heading', level: 3, content: 'bcrypt: Purpose-Built Password Hashing' },
    { type: 'paragraph', content: 'bcrypt is designed to be slow and memory-intensive. The "cost factor" controls how many rounds of computation are performed — doubling the work with each increment.' },

    { type: 'command', command: 'python3 bcrypt_demo.py', output: '$2b$12$LJ3m4o9nJSHCf8QHR6GpOeXy8vN8nKxFAKE_HASH_FOR_DEMO_12345', explanation: '$2b$12$ means bcrypt version 2b with cost factor 12 (2^12 = 4096 iterations). The salt is embedded in the hash. Each hash takes ~250ms — an attacker can only try 4 passwords/second instead of billions!' },

    { type: 'list', items: [
      'Cost factor 10: ~100ms per hash (minimum recommended)',
      'Cost factor 12: ~250ms per hash (good default for 2024)',
      'Cost factor 14: ~1 second per hash (high security)',
      'Increase cost factor every few years as hardware gets faster',
      'Includes salt automatically — no separate salt storage needed'
    ]},

    { type: 'heading', level: 3, content: 'Argon2id: The State of the Art' },
    { type: 'paragraph', content: 'Winner of the Password Hashing Competition (2015). Argon2id is both time-hard AND memory-hard — even ASICs and GPUs can\'t efficiently parallelize it.' },
    { type: 'list', items: [
      'Memory-hard: Requires significant RAM (e.g., 64MB), making GPU attacks expensive',
      'Configurable: time cost, memory cost, and parallelism',
      'Argon2id combines Argon2i (side-channel resistant) and Argon2d (GPU-resistant)',
      'Recommended by OWASP for new applications',
      'OWASP recommendation: 19MB memory, 2 iterations, 1 thread (minimum)'
    ]},


    { type: 'heading', level: 2, content: 'Salting: Defeating Rainbow Tables' },
    { type: 'paragraph', content: 'A salt is random data added to the password before hashing. It ensures that two users with the same password get different hashes, and pre-computed rainbow tables become useless.' },

    { type: 'command', command: 'python3 salt_demo.py', output: `Unsalted: ef92b778bafe771e89245b89ecbc08a44a4e166c...
^ Same hash for EVERY user with this password!

User 1: 3a7bd3e2360a3d29eea436fcfb7e44c735d117c9...
User 2: 8f14e45fceea167a5a36dedd4bea2543a5b8c92d...
^ Different hashes even though both use password123!`, explanation: 'Without salt, all users with "password123" have the identical hash — look it up in a rainbow table and crack them all instantly. With salt, each gets a unique hash even for the same password. Attackers must crack each individually.' },

    { type: 'heading', level: 2, content: 'HMAC: Keyed Hashing for Authentication' },
    { type: 'paragraph', content: 'HMAC (Hash-based Message Authentication Code) combines a hash with a secret key. It proves both integrity AND authenticity — the message hasn\'t been tampered with AND came from someone who knows the key.' },

    { type: 'command', command: 'echo -n "Transfer $1000 to account 12345" | openssl dgst -sha256 -hmac "shared_secret_key_123"', output: `SHA2-256(stdin)= a3f2b8c9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1`, explanation: 'HMAC-SHA256 with a shared secret key. The receiver computes the same HMAC with their copy of the key. If the HMACs match: (1) The message wasn\'t modified (integrity), (2) It came from someone with the key (authenticity).' },

    { type: 'list', items: [
      'Used in: API authentication (AWS Signature V4), JWT signing, webhook verification',
      'If someone modifies the message, the HMAC changes — tampering detected',
      'Without the key, an attacker cannot forge a valid HMAC',
      'HMAC(key, message) != Hash(key + message) — HMAC has specific construction to prevent length extension attacks'
    ]},

    { type: 'heading', level: 2, content: 'Common Attacks on Hashing' },
    { type: 'list', items: [
      'Rainbow tables — Pre-computed hash-to-password lookup tables (defeated by salting)',
      'Dictionary attacks — Hash common passwords and compare (defeated by slow hashing)',
      'Brute force — Try all combinations (defeated by long passwords + slow algorithms)',
      'Collision attacks — Find two inputs with same hash (MD5 and SHA-1 are vulnerable)',
      'Length extension — Append data to a hash without knowing the original input (use HMAC instead)',
      'Pass-the-hash — Use a stolen hash directly for authentication without cracking it (Windows NTLM)'
    ]},

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'list', items: [
      'Hashing is one-way: input → hash is easy; hash → input is infeasible',
      'For file integrity: Use SHA-256 (fast, collision-resistant)',
      'For passwords: Use bcrypt (cost 12+) or Argon2id — NEVER SHA-256 or MD5',
      'Always salt passwords with a unique random salt per user',
      'MD5 and SHA-1 are BROKEN for security — collisions have been found',
      'HMAC adds authentication to hashing — proves who created the hash',
      'Speed is the enemy for password hashing; the attacker controls the hardware',
      'Regularly increase bcrypt cost factor as CPUs get faster'
    ]},
  ],
  navigation: {
    prev: { title: 'Asymmetric Encryption: RSA & Key Exchange', slug: 'asymmetric-encryption' },
    next: { title: 'Digital Signatures & Certificates', slug: 'digital-signatures' },
  },
};
