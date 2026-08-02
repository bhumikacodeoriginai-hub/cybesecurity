export const lesson = {
  id: 'L45',
  title: 'Asymmetric Encryption: RSA & Key Exchange',
  slug: 'asymmetric-encryption',
  type: 'PRACTICAL',
  duration: 50,
  xpReward: 35,
  difficulty: 'intermediate',
  module: { title: 'Cryptography', slug: 'cryptography' },
  course: { title: 'Applied Cryptography', slug: 'applied-cryptography' },
  keyTerms: [
    'Asymmetric Encryption', 'RSA', 'Public Key', 'Private Key',
    'Diffie-Hellman', 'Elliptic Curve', 'Key Pair', 'Key Exchange',
    'Digital Envelope', 'Hybrid Encryption'
  ],
  content: [
    { type: 'heading', content: 'Asymmetric Encryption: RSA & Key Exchange' },
    { type: 'paragraph', content: 'Asymmetric encryption uses TWO mathematically linked keys: a public key (shared openly) and a private key (kept secret). Data encrypted with the public key can ONLY be decrypted with the private key, and vice versa. This elegantly solves the key distribution problem of symmetric encryption.' },

    { type: 'callout', variant: 'info', content: 'Analogy: Imagine a special mailbox with two keys. The PUBLIC key opens the mail slot — anyone can drop a letter in (encrypt). The PRIVATE key opens the door to retrieve letters — only the owner can read them (decrypt). You can give copies of the slot key to everyone in the world; only you have the door key.' },

    { type: 'heading', level: 2, content: 'Public Key vs Private Key' },
    { type: 'list', items: [
      'Public Key — Shared freely with everyone. Used to ENCRYPT messages TO you.',
      'Private Key — Kept absolutely secret. Used to DECRYPT messages sent to you.',
      'Mathematically linked: What one encrypts, only the other can decrypt',
      'Cannot derive the private key from the public key (computationally infeasible)',
      'Based on "trapdoor" math problems: easy one direction, nearly impossible to reverse'
    ]},

    { type: 'heading', level: 2, content: 'RSA: The Classic Algorithm' },
    { type: 'paragraph', content: 'RSA (Rivest-Shamir-Adleman, 1977) is based on the difficulty of factoring the product of two large prime numbers. A 2048-bit RSA key means the modulus is a number with ~617 digits.' },

    { type: 'command', command: 'openssl genrsa -out private_key.pem 2048', output: `Generating RSA private key, 2048 bit long modulus (2 primes)
.....................+++++
.......+++++
e is 65537 (0x010001)`, explanation: 'Generates a 2048-bit RSA key pair. The private key file contains BOTH the private and public key components. "e is 65537" is the public exponent (a standard value).' },

    { type: 'command', command: 'openssl rsa -in private_key.pem -pubout -out public_key.pem', output: `writing RSA key`, explanation: 'Extracts the public key from the private key file. This public_key.pem can be shared with anyone — they\'ll use it to encrypt messages to you.' },

    { type: 'command', command: 'cat public_key.pem', output: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2mX3dA7r8HEk89lw3I0e
pVxKJ7FzA8y9VLXH2eG9PjWJBF0h3NTxkcwMIJD5FsDT0Z/vBVW7g5dBuN/AAAA
BBBBBBBBBBBBccccccccccccDDDDDDDDDDDDDDDDeeeeeeeeeeeeeefffffffffffff
... (256 bytes total for 2048-bit key)
-----END PUBLIC KEY-----`, explanation: 'The public key in PEM format. This is safe to publish on your website, send in email, or post on a key server. Anyone can use it to encrypt messages only you can read.' },

    { type: 'heading', level: 3, content: 'Encrypting and Decrypting with RSA' },
    { type: 'command', command: 'echo "Attack at dawn" | openssl rsautl -encrypt -pubin -inkey public_key.pem | base64', output: `K3J2cGxCNWpZdVhqQ0V3MWRjL0ZXZG9CeDRZejJv
Y0d4SE1USXBHVloyNnR2VHRDdGFKZ0E0VXMzUWtZ
...`, explanation: 'Encrypts "Attack at dawn" with the recipient\'s public key. The output is random-looking ciphertext. Only the holder of the corresponding private key can decrypt this.' },

    { type: 'command', command: 'cat encrypted.bin | openssl rsautl -decrypt -inkey private_key.pem', output: `Attack at dawn`, explanation: 'Decrypts using the private key. Only works with the matching private key — anyone else just sees gibberish.' },

    { type: 'callout', variant: 'warning', content: 'RSA limitation: You can only encrypt data smaller than the key size minus padding (e.g., max ~245 bytes for a 2048-bit key). For larger data, use hybrid encryption: encrypt data with AES (symmetric), then encrypt the AES key with RSA (asymmetric). This is how TLS works.' },

    { type: 'heading', level: 2, content: 'Diffie-Hellman Key Exchange' },
    { type: 'paragraph', content: 'Diffie-Hellman (1976) allows two parties to agree on a shared secret over a public channel, even if an eavesdropper sees all the messages. Neither party needs to have met before.' },

    { type: 'paragraph', content: 'How it works (simplified):' },
    { type: 'list', items: [
      '1. Alice and Bob publicly agree on a large prime number p and generator g',
      '2. Alice picks a secret number "a", computes A = g^a mod p, sends A to Bob',
      '3. Bob picks a secret number "b", computes B = g^b mod p, sends B to Alice',
      '4. Alice computes: shared_secret = B^a mod p',
      '5. Bob computes: shared_secret = A^b mod p',
      '6. Both get the SAME value! (due to math: (g^b)^a = (g^a)^b mod p)',
      '7. Eavesdropper saw A and B but cannot compute the shared secret (discrete log problem)'
    ]},

    { type: 'command', command: 'openssl dhparam -out dhparams.pem 2048', output: `Generating DH parameters, 2048 bit long safe prime, generator 2
This is going to take a long time
.......+.......................++*++*++*`, explanation: 'Generates Diffie-Hellman parameters (the shared public prime and generator). This is a one-time setup; the parameters can be reused.' },

    { type: 'heading', level: 2, content: 'Elliptic Curve Cryptography (ECC)' },
    { type: 'paragraph', content: 'ECC provides the same security as RSA with MUCH smaller keys. A 256-bit ECC key ≈ 3072-bit RSA key in security strength.' },
    { type: 'list', items: [
      'Faster key generation and operations than RSA',
      '256-bit ECC key = 3072-bit RSA key (equivalent security)',
      'Smaller keys mean less bandwidth and storage (important for IoT, mobile)',
      'Used in: TLS 1.3, SSH, Bitcoin, Signal Protocol, WireGuard',
      'Common curves: P-256 (NIST), Curve25519 (Daniel Bernstein), secp256k1 (Bitcoin)',
      'ECDH (Elliptic Curve Diffie-Hellman) replaces traditional DH in most modern protocols'
    ]},

    { type: 'command', command: 'openssl ecparam -genkey -name prime256v1 -out ec_private.pem', output: '', explanation: 'Generates an ECC key pair using the P-256 (prime256v1) curve. This 256-bit key is as secure as a 3072-bit RSA key but much smaller and faster.' },

    { type: 'command', command: 'openssl ec -in ec_private.pem -pubout -out ec_public.pem && wc -c ec_public.pem', output: `read EC key
writing EC key
178 ec_public.pem`, explanation: 'The ECC public key is only 178 bytes! Compare to RSA-2048 which is ~450 bytes. Smaller keys = less bandwidth for TLS handshakes = faster connections.' },

    { type: 'heading', level: 2, content: 'Hybrid Encryption (How TLS Actually Works)' },
    { type: 'paragraph', content: 'In practice, asymmetric and symmetric encryption are combined. Asymmetric is used to securely exchange a symmetric key, then symmetric handles the bulk encryption.' },
    { type: 'list', items: [
      '1. Client generates a random AES-256 session key',
      '2. Client encrypts the session key with the server\'s RSA/ECC public key',
      '3. Encrypted session key sent to server (only server can decrypt with private key)',
      '4. Server decrypts to obtain the AES session key',
      '5. Both parties now share the symmetric key — all further communication uses AES-GCM',
      'Why? RSA is 1000x slower than AES. Use RSA only for the key exchange, AES for data.'
    ]},

    { type: 'heading', level: 2, content: 'SSH Key Authentication' },
    { type: 'paragraph', content: 'SSH keys are a practical, everyday use of asymmetric cryptography:' },

    { type: 'command', command: 'ssh-keygen -t ed25519 -C "analyst@company.com"', output: `Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/analyst/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Your identification has been saved in /home/analyst/.ssh/id_ed25519
Your public key has been saved in /home/analyst/.ssh/id_ed25519.pub
The key fingerprint is:
SHA256:+Ryg8PbHZN+J2mK4nQb3BhGYxEDFvNkh5ZqW3xPcbUQ analyst@company.com`, explanation: 'Generates an Ed25519 SSH key pair. Ed25519 is faster and more secure than RSA for SSH. The private key stays on your machine; the public key goes on servers you want to access.' },

    { type: 'command', command: 'cat ~/.ssh/id_ed25519.pub', output: `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIHqKxkPF0FAKE_KEY_FOR_DEMO_9G8h analyst@company.com`, explanation: 'Your public key — add this to ~/.ssh/authorized_keys on remote servers. When you connect, SSH proves you have the private key without ever sending it over the network (challenge-response protocol).' },

    { type: 'callout', variant: 'security', content: 'Key sizes for 2024+: RSA minimum 2048-bit (prefer 4096). ECC minimum 256-bit (P-256 or Curve25519). Avoid RSA-1024 (factorable with resources). For SSH, prefer Ed25519 over RSA — it\'s faster, smaller, and has no known implementation pitfalls.' },

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'list', items: [
      'Asymmetric crypto solves key distribution — share public keys openly, keep private keys secret',
      'RSA security depends on the difficulty of factoring large numbers',
      'ECC provides equivalent security with much smaller keys — preferred for modern systems',
      'Diffie-Hellman enables key agreement over insecure channels',
      'Hybrid encryption (asymmetric + symmetric) is how the real world works (TLS, PGP)',
      'Protect private keys at all costs — file permissions, passphrases, HSMs',
      'Quantum computers threaten RSA and ECC — post-quantum algorithms are being standardized',
      'Never generate keys with weak randomness — use OS-provided cryptographic RNG'
    ]},
  ],
  navigation: {
    prev: { title: 'Symmetric Encryption: AES & Block Ciphers', slug: 'symmetric-encryption' },
    next: { title: 'Hashing: SHA, MD5, bcrypt & Integrity', slug: 'hashing-integrity' },
  },
};
