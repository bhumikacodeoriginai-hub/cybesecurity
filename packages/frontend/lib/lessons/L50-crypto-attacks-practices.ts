export const lesson = {
  id: 'L50',
  title: 'Cryptographic Attacks & Best Practices',
  slug: 'crypto-attacks-practices',
  type: 'THEORY',
  duration: 40,
  xpReward: 30,
  difficulty: 'advanced',
  module: { title: 'Cryptography', slug: 'cryptography' },
  course: { title: 'Applied Cryptography', slug: 'applied-cryptography' },
  keyTerms: [
    'Side-Channel Attack', 'Padding Oracle', 'Brute Force',
    'Birthday Attack', 'Quantum Computing', 'Key Management',
    'Post-Quantum Cryptography', 'Cryptographic Agility'
  ],
  content: [
    { type: 'heading', content: 'Cryptographic Attacks & Best Practices' },
    { type: 'paragraph', content: 'Cryptographic algorithms rarely fail because the math is wrong — they fail because of implementation errors, poor key management, outdated algorithms, or side-channel leaks. This lesson covers how cryptography breaks in practice and the best practices that prevent these failures.' },


    { type: 'callout', variant: 'info', content: 'Analogy: A safe with a 10-digit combination lock is mathematically secure (10 billion combinations). But if the safe makes a subtle click when you hit the right number, an attacker doesn\'t need to try all combinations — they just listen (side-channel attack). If you wrote the combination on a sticky note attached to the safe, the lock doesn\'t matter (key management failure).' },

    { type: 'heading', level: 2, content: 'Types of Cryptographic Attacks' },

    { type: 'heading', level: 3, content: '1. Brute Force Attacks' },
    { type: 'paragraph', content: 'Trying every possible key until finding the right one. Feasibility depends entirely on key length:' },
    { type: 'list', items: [
      '56-bit key (DES): 2^56 = 72 quadrillion combinations. Crackable in hours with specialized hardware.',
      '128-bit key (AES-128): 2^128 combinations. Would take trillions of years with all computers on Earth.',
      '256-bit key (AES-256): 2^256 combinations. Secure against even quantum computers.',
      'Rule: Use 128+ bit keys for symmetric, 2048+ bit for RSA, 256+ bit for ECC.'
    ]},

    { type: 'heading', level: 3, content: '2. Side-Channel Attacks' },
    { type: 'paragraph', content: 'Attacks that exploit physical information leakage rather than mathematical weaknesses:' },
    { type: 'list', items: [
      'Timing attacks — Measure how long operations take (password comparison that exits early on mismatch)',
      'Power analysis — Monitor CPU power consumption during encryption (reveals key bits)',
      'Electromagnetic emissions — Capture EM radiation from hardware processing crypto',
      'Cache attacks — Observe CPU cache access patterns (Spectre, Meltdown)',
      'Acoustic attacks — RSA key extracted from sound of laptop during decryption (!)',
      'Defense: Constant-time implementations, noise injection, hardware isolation'
    ]},

    { type: 'command', command: 'cat timing_attack_vulnerable.py', output: `# VULNERABLE: String comparison exits early on mismatch
def check_mac(received_mac, computed_mac):
    if len(received_mac) != len(computed_mac):
        return False
    for i in range(len(received_mac)):
        if received_mac[i] != computed_mac[i]:
            return False  # Exits at first wrong byte!
    return True
# Attacker measures response time:
# Wrong 1st byte: 0.1ms | Wrong 5th byte: 0.5ms (took longer = more bytes matched)`, explanation: 'The comparison leaks information through timing. An attacker guesses byte by byte — when a guess takes slightly longer, that byte was correct. Fix: Use constant-time comparison (hmac.compare_digest in Python).' },

    { type: 'heading', level: 3, content: '3. Padding Oracle Attack' },
    { type: 'paragraph', content: 'Exploits error messages from CBC-mode decryption to decrypt ciphertext without the key:' },
    { type: 'list', items: [
      'Application returns different errors for "bad padding" vs "invalid data"',
      'Attacker modifies ciphertext bytes and observes which error is returned',
      'By analyzing responses, attacker decrypts one byte at a time',
      'POODLE and Lucky13 are variants of this attack',
      'Defense: Use AEAD modes (GCM) instead of CBC, or always return generic errors'
    ]},

    { type: 'heading', level: 3, content: '4. Birthday Attack (Collision Finding)' },
    { type: 'paragraph', content: 'Finding two inputs with the same hash is easier than finding a specific hash. For a hash of n bits, a collision can be found in approximately 2^(n/2) attempts (birthday paradox).' },
    { type: 'list', items: [
      'MD5 (128-bit): Collision in ~2^64 attempts — DONE in 2004, takes seconds on a laptop',
      'SHA-1 (160-bit): Collision in ~2^80 — DONE in 2017 (Google\'s SHAttered)',
      'SHA-256 (256-bit): Collision in ~2^128 — infeasible with current technology',
      'Implication: Never use MD5 or SHA-1 for anything security-sensitive'
    ]},

    { type: 'heading', level: 2, content: 'The Quantum Threat' },
    { type: 'paragraph', content: 'Quantum computers running Shor\'s algorithm could break RSA and ECC by efficiently factoring large numbers. This threatens all current asymmetric cryptography.' },
    { type: 'list', items: [
      'RSA, ECC, Diffie-Hellman — ALL broken by sufficiently powerful quantum computers',
      'AES — Halved security (AES-256 becomes AES-128 strength). Still secure if using 256-bit.',
      'SHA-256 — Slightly weakened but still usable',
      'Timeline: Expert estimates range from 10-30 years for cryptographically-relevant quantum computers',
      '"Harvest now, decrypt later" — Adversaries may be recording encrypted data TODAY to decrypt later',
      'NIST post-quantum standards (2024): CRYSTALS-Kyber (key exchange), CRYSTALS-Dilithium (signatures)'
    ]},

    { type: 'callout', variant: 'security', content: 'Action now: If your data must remain confidential for 20+ years (government secrets, medical records), start planning migration to post-quantum algorithms. "Harvest now, decrypt later" means adversaries recording your TLS traffic today could decrypt it once quantum computers arrive.' },

    { type: 'heading', level: 2, content: 'Cryptographic Best Practices' },
    { type: 'list', items: [
      'Never roll your own crypto — Use vetted libraries (OpenSSL, libsodium, NaCl)',
      'Use the highest-level API available — Don\'t use raw AES; use a library\'s encrypt() function',
      'AES-256-GCM for symmetric encryption (authenticated, fast)',
      'Ed25519 or ECDSA P-256 for signatures',
      'X25519 or ECDH P-256 for key exchange',
      'Argon2id for password hashing, bcrypt as fallback',
      'Generate keys with cryptographic RNG only (/dev/urandom, crypto.getRandomValues)',
      'Rotate keys regularly — limit the blast radius of a compromise',
      'Use constant-time comparisons for MACs and tokens',
      'Implement cryptographic agility — ability to swap algorithms when one breaks'
    ]},

    { type: 'heading', level: 3, content: 'Key Management Rules' },
    { type: 'list', items: [
      'Never hardcode keys in source code — use environment variables or secret managers',
      'Store keys in HSMs (Hardware Security Modules) for high-value systems',
      'Separate key encryption keys (KEKs) from data encryption keys (DEKs)',
      'Implement key rotation without downtime',
      'Log all key access and usage for audit',
      'Destroy keys securely when no longer needed (crypto-shredding)',
      'Use split knowledge — no single person should have access to the complete master key'
    ]},

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'list', items: [
      'Crypto breaks through implementation flaws, not math — use battle-tested libraries',
      'Side-channel attacks exploit physics (timing, power, EM) — use constant-time code',
      'Padding oracles exploit error messages — use authenticated encryption (GCM)',
      'MD5 and SHA-1 have practical collisions — never use for security purposes',
      'Quantum computers will break RSA/ECC — plan for post-quantum migration',
      'Key management is harder than the algorithm choice — protect, rotate, audit keys',
      'Cryptographic agility: design systems that can swap algorithms without rewriting everything',
      'When in doubt: AES-256-GCM + X25519 + Ed25519 + Argon2id covers most needs'
    ]},
  ],
  navigation: {
    prev: { title: 'Public Key Infrastructure (PKI)', slug: 'pki-infrastructure' },
    next: { title: 'Reconnaissance & Information Gathering', slug: 'recon-information-gathering' },
  },
};
