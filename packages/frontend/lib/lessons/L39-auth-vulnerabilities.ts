export const lesson = {
  id: 'L39',
  title: 'Authentication Vulnerabilities & Session Management',
  slug: 'auth-vulnerabilities',
  type: 'PRACTICAL',
  duration: 50,
  xpReward: 35,
  difficulty: 'advanced',
  module: { title: 'Web Application Security', slug: 'web-security' },
  course: { title: 'Web Security Fundamentals', slug: 'web-security-fundamentals' },
  keyTerms: [
    'Authentication', 'Session Management', 'Brute Force',
    'Credential Stuffing', 'Session Fixation', 'JWT',
    'MFA', 'OAuth', 'Password Hashing', 'bcrypt'
  ],
  content: [
    { type: 'heading', content: 'Authentication Vulnerabilities & Session Management' },
    { type: 'paragraph', content: 'Authentication is the process of proving who you are. Session management keeps you logged in after authentication. Both are primary targets for attackers — break authentication and you have the keys to the kingdom. Break session management and you can impersonate anyone.' },

    { type: 'callout', variant: 'info', content: 'Analogy: Authentication is showing your ID to enter a building. Session management is the visitor badge you get after showing ID — it proves you\'re allowed inside without showing your ID again at every door. Attackers either forge IDs (credential attacks) or steal/clone visitor badges (session attacks).' },

    { type: 'heading', level: 2, content: 'Brute Force Attacks' },
    { type: 'paragraph', content: 'Systematically trying every possible password until one works. Modern tools can test thousands of passwords per second against web applications.' },

    { type: 'command', command: 'hydra -l admin -P /usr/share/wordlists/rockyou.txt http-post-form://target.com/login:"username=^USER^&password=^PASS^:Invalid credentials"', output: `Hydra v9.4 starting
[DATA] attacking http-post-form://target.com:80/login
[80][http-post-form] host: target.com   login: admin   password: admin123
1 of 1 target successfully completed, 1 valid password found`, explanation: 'Hydra tries passwords from rockyou.txt (14 million common passwords) against the login form. It found "admin123" in seconds. The form response "Invalid credentials" tells Hydra which attempts failed.' },

    { type: 'heading', level: 3, content: 'Credential Stuffing' },
    { type: 'paragraph', content: 'Uses username/password pairs leaked from OTHER breaches. Because people reuse passwords across sites, leaked credentials from Site A often work on Site B.' },
    { type: 'list', items: [
      'Attacker buys 100 million leaked credentials from dark web',
      'Automated tools try each pair against target login forms',
      'Success rate: typically 0.5-2% (still = thousands of compromised accounts)',
      'Defense: Detect login patterns, require MFA, check passwords against breach databases'
    ]},

    { type: 'command', command: 'cat credential_check.py', output: `import requests

# Check if password has been seen in known breaches
# Uses Have I Been Pwned API (k-anonymity model - safe to use)
import hashlib

def is_password_breached(password):
    sha1 = hashlib.sha1(password.encode()).hexdigest().upper()
    prefix = sha1[:5]
    suffix = sha1[5:]
    
    # Only sends first 5 chars of hash - API can't determine your password
    response = requests.get(f'https://api.pwnedpasswords.com/range/{prefix}')
    
    for line in response.text.splitlines():
        hash_suffix, count = line.split(':')
        if hash_suffix == suffix:
            return int(count)  # Number of times seen in breaches
    return 0

# Example: "password123" has been seen 123,456 times in breaches!`, explanation: 'The Have I Been Pwned API lets you check if a password appears in known data breaches without exposing the password. Use this during registration to reject commonly breached passwords.' },

    { type: 'heading', level: 2, content: 'Password Storage Vulnerabilities' },
    { type: 'paragraph', content: 'How passwords are stored determines how devastating a database breach becomes:' },

    { type: 'command', command: 'cat password_storage_examples.txt', output: `# TERRIBLE: Plain text (instant compromise)
admin:admin123
john:Welcome2024!

# BAD: Simple hash (crackable in seconds with rainbow tables)
admin:0192023a7bbd73250516f069df18b500  (MD5)
john:7c6a180b36896a65c4c54c92dd72b83d  (MD5)

# POOR: Hash + salt but fast algorithm (GPU cracking: billions/sec)
admin:$1$salt$hashed_value  (MD5-crypt)

# GOOD: bcrypt with cost factor (slow by design: ~100ms per hash)
admin:$2b$12$LJ3m4o.nJSHCf8QHR6GpO.Yx8vN8nK.example_hash

# BEST: Argon2id (memory-hard, GPU-resistant)
admin:$argon2id$v=19$m=65536,t=3,p=4$salt$hash`, explanation: 'Each level shows progressively better password storage. Plain text = instant compromise. MD5 = crackable in seconds. bcrypt = months to crack strong passwords. Argon2id = state of the art, resistant to GPU/ASIC attacks.' },

    { type: 'callout', variant: 'security', content: 'Rule: ALWAYS use bcrypt (cost 12+) or Argon2id for password hashing. Never MD5 or SHA-256 alone. The "slow" hashing is intentional — it makes brute-force attacks impractical. A strong bcrypt hash takes ~100ms to verify, meaning an attacker can only try 10 passwords/second instead of billions.' },

    { type: 'heading', level: 2, content: 'Session Management Attacks' },

    { type: 'heading', level: 3, content: 'Session Hijacking' },
    { type: 'paragraph', content: 'Stealing a valid session token to impersonate an authenticated user:' },
    { type: 'list', items: [
      'XSS cookie theft — JavaScript reads document.cookie and sends it to attacker',
      'Network sniffing — Session token captured in HTTP traffic (no HTTPS)',
      'Session token in URL — Shared via Referer header or browser history',
      'Predictable tokens — If session IDs follow a pattern, attacker can guess valid ones'
    ]},

    { type: 'heading', level: 3, content: 'Session Fixation' },
    { type: 'paragraph', content: 'The attacker sets the session ID BEFORE the victim logs in:' },
    { type: 'list', items: [
      '1. Attacker gets a valid session ID from the site: session_id=ATTACKER_KNOWN_VALUE',
      '2. Attacker tricks victim into using this session: sends link with ?session_id=ATTACKER_KNOWN_VALUE',
      '3. Victim clicks link, logs in with attacker\'s session ID',
      '4. Session is now authenticated — and the attacker already knows the ID!',
      'Defense: ALWAYS regenerate session ID upon login (invalidate pre-auth sessions)'
    ]},

    { type: 'command', command: 'cat session_fixation_defense.js', output: `// SECURE: Regenerate session on login
app.post('/login', async (req, res) => {
  const user = await authenticate(req.body.username, req.body.password);
  if (user) {
    // Destroy the old session and create a new one
    req.session.regenerate((err) => {
      req.session.userId = user.id;
      req.session.role = user.role;
      res.redirect('/dashboard');
    });
  }
});`, explanation: 'session.regenerate() creates a completely new session ID after successful login. Even if an attacker set the pre-login session ID, it becomes invalid after authentication.' },

    { type: 'heading', level: 2, content: 'JWT (JSON Web Token) Vulnerabilities' },
    { type: 'paragraph', content: 'JWTs are widely used for stateless authentication but have unique attack vectors:' },

    { type: 'command', command: 'echo "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiam9obiIsInJvbGUiOiJ1c2VyIn0.signature" | cut -d. -f2 | base64 -d', output: `{"user":"john","role":"user"}`, explanation: 'JWT payloads are NOT encrypted — just base64 encoded. Anyone can read them. The signature prevents MODIFICATION but not READING. Never store sensitive data in JWT payloads.' },

    { type: 'paragraph', content: 'Common JWT attacks:' },
    { type: 'list', items: [
      'Algorithm None — Change header to {"alg":"none"} to skip signature verification',
      'Weak secret — Brute-force the HMAC secret with hashcat/john',
      'Key confusion — Switch RS256 (asymmetric) to HS256 (symmetric) using the public key as the secret',
      'Missing expiration — Tokens valid forever if "exp" claim is omitted',
      'Token not invalidated — Logging out doesn\'t invalidate the JWT (stateless problem)'
    ]},

    { type: 'command', command: 'hashcat -m 16500 jwt_token.txt /usr/share/wordlists/rockyou.txt', output: `eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4ifQ.signature:secret123

Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 16500 (JWT)
Speed.#1.........:  8234.5 kH/s
Recovered........: 1/1 (100.00%)`, explanation: 'The JWT signing secret was "secret123" — cracked in seconds. With the secret, the attacker can forge JWTs for any user/role. Use strong, random secrets (256+ bits) and rotate them regularly.' },

    { type: 'heading', level: 2, content: 'Multi-Factor Authentication (MFA)' },
    { type: 'paragraph', content: 'MFA adds additional verification beyond passwords. Even if a password is compromised, the attacker still needs the second factor:' },
    { type: 'list', items: [
      'Something you know — Password, PIN',
      'Something you have — Phone (TOTP/SMS), hardware key (YubiKey)',
      'Something you are — Fingerprint, face recognition',
      'SMS codes are better than nothing but vulnerable to SIM swapping',
      'TOTP apps (Google Authenticator, Authy) are much more secure',
      'Hardware keys (FIDO2/WebAuthn) are the strongest — phishing-resistant'
    ]},

    { type: 'heading', level: 2, content: 'Authentication Best Practices' },
    { type: 'list', items: [
      'Hash passwords with bcrypt (cost 12) or Argon2id — NEVER store plain text',
      'Implement account lockout after 5-10 failed attempts (with exponential backoff)',
      'Require MFA for all users, especially admins',
      'Regenerate session IDs on login and privilege change',
      'Set secure cookie flags: HttpOnly, Secure, SameSite=Strict',
      'Implement rate limiting on login endpoints (e.g., 10 attempts/minute)',
      'Use strong JWT secrets (256-bit random) with short expiration (15 min)',
      'Check passwords against breach databases during registration',
      'Never reveal whether a username exists in error messages ("Invalid credentials" not "User not found")',
      'Implement proper logout: Invalidate session server-side, clear cookies',
      'Log all authentication events for monitoring'
    ]},

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'list', items: [
      'Authentication is your first line of defense — if it breaks, everything else is compromised',
      'Brute force and credential stuffing are automated — rate limiting and MFA are essential',
      'Password storage: bcrypt or Argon2id only. Cost/time factors prevent GPU attacks.',
      'Session tokens must be: random (unpredictable), regenerated on login, invalidated on logout',
      'JWTs are powerful but have unique pitfalls — validate signatures, check expiration, use strong secrets',
      'MFA reduces account takeover by 99% — use TOTP or hardware keys over SMS',
      'Defense in depth: Strong passwords + MFA + rate limiting + session management + monitoring'
    ]},
  ],
  navigation: {
    prev: { title: 'Cross-Site Scripting (XSS)', slug: 'xss-attacks' },
    next: { title: 'Cross-Site Request Forgery (CSRF)', slug: 'csrf-attacks' },
  },
};
