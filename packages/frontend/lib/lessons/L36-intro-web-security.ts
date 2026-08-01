export const lesson = {
  id: 'L36',
  title: 'Introduction to Web Security & OWASP Top 10',
  slug: 'intro-web-security',
  type: 'THEORY',
  duration: 40,
  xpReward: 25,
  difficulty: 'intermediate',
  module: { title: 'Web Application Security', slug: 'web-security' },
  course: { title: 'Web Security Fundamentals', slug: 'web-security-fundamentals' },
  keyTerms: [
    'OWASP', 'Top 10', 'Web Application', 'Vulnerability',
    'Input Validation', 'Authentication', 'Authorization',
    'Injection', 'XSS', 'CSRF', 'Security Headers'
  ],
  content: [
    { type: 'heading', content: 'Introduction to Web Security & OWASP Top 10' },
    { type: 'paragraph', content: 'Web applications are the #1 target for attackers. They\'re exposed to the internet, handle sensitive data, and are often rushed to production without proper security testing. This module teaches you the most critical web vulnerabilities and how to find, exploit, and fix them.' },

    { type: 'callout', variant: 'info', content: 'Analogy: If your network is a fortress with walls and guards, your web application is the front door that\'s open to the public. Anyone can walk up and try to break in. Web security is about making sure that open door can\'t be exploited — even though millions of strangers interact with it daily.' },

    { type: 'heading', level: 2, content: 'Why Web Security is Critical' },
    { type: 'list', items: [
      '43% of all data breaches involve web applications (Verizon DBIR 2023)',
      'Web apps process payments, store personal data, and control critical systems',
      'A single vulnerability can expose millions of user records',
      'Attacks are automated — bots scan thousands of sites per hour for known vulnerabilities',
      'The attack surface grows with every new feature, API endpoint, and integration'
    ]},

    { type: 'heading', level: 2, content: 'How Web Applications Work (Security Perspective)' },
    { type: 'paragraph', content: 'Understanding the request-response flow reveals where vulnerabilities exist:' },
    { type: 'list', items: [
      '1. User\'s browser sends an HTTP request (GET, POST, PUT, DELETE)',
      '2. Request passes through: CDN → Load Balancer → Web Server → Application → Database',
      '3. Each step is a potential attack point:',
      '   - Browser: XSS can execute malicious JavaScript',
      '   - HTTP Request: Parameters can contain injection payloads',
      '   - Web Server: Misconfigurations expose sensitive information',
      '   - Application: Logic flaws bypass authentication/authorization',
      '   - Database: SQL injection can read/modify/delete all data',
      '4. Response flows back and can leak information via headers, error messages, or timing'
    ]},

    { type: 'heading', level: 2, content: 'The OWASP Top 10 (2021)' },
    { type: 'paragraph', content: 'OWASP (Open Web Application Security Project) maintains the definitive list of the most critical web security risks. This list is updated every few years based on real-world vulnerability data from hundreds of organizations.' },

    { type: 'heading', level: 3, content: 'A01: Broken Access Control' },
    { type: 'paragraph', content: 'Users can act outside their intended permissions. Accessing other users\' data, modifying records they shouldn\'t, or performing admin actions without authorization.' },
    { type: 'list', items: [
      'Example: Changing /user/profile?id=123 to id=124 shows another user\'s data (IDOR)',
      'Example: Regular user accesses /admin/users because authorization isn\'t checked',
      'Moved from #5 to #1 — now the most common critical vulnerability'
    ]},

    { type: 'heading', level: 3, content: 'A02: Cryptographic Failures' },
    { type: 'paragraph', content: 'Sensitive data exposed due to weak or missing encryption. Previously called "Sensitive Data Exposure."' },
    { type: 'list', items: [
      'Storing passwords in plain text or with weak hashing (MD5, SHA-1)',
      'Transmitting data over HTTP instead of HTTPS',
      'Using deprecated algorithms (DES, RC4)',
      'Exposing API keys or secrets in client-side code'
    ]},

    { type: 'heading', level: 3, content: 'A03: Injection' },
    { type: 'paragraph', content: 'Untrusted data is sent to an interpreter as part of a command or query. The interpreter can\'t distinguish between data and code.' },
    { type: 'list', items: [
      'SQL Injection — SELECT * FROM users WHERE name=\'' + "' OR '1'='1" + '\'',
      'Command Injection — ping; rm -rf / (executed by the OS)',
      'LDAP Injection, NoSQL Injection, XPath Injection',
      'Still #3 despite decades of awareness — because developers still concatenate strings'
    ]},

    { type: 'heading', level: 3, content: 'A04: Insecure Design' },
    { type: 'paragraph', content: 'NEW in 2021. Security flaws that exist because the application was designed without security considerations. No amount of perfect coding fixes a broken design.' },
    { type: 'list', items: [
      'Password reset that asks "What\'s your pet\'s name?" (publicly findable on social media)',
      'No rate limiting on login — allows unlimited brute-force attempts',
      'Trusting client-side calculations for pricing or discounts'
    ]},

    { type: 'heading', level: 3, content: 'A05: Security Misconfiguration' },
    { type: 'paragraph', content: 'Default settings, incomplete configurations, open cloud storage, unnecessary features enabled, verbose error messages.' },
    { type: 'list', items: [
      'Default admin credentials (admin/admin) left unchanged',
      'Debug mode enabled in production (reveals stack traces)',
      'Directory listing enabled on web server',
      'Unnecessary HTTP methods (PUT, DELETE) enabled',
      'Missing security headers (CSP, X-Frame-Options)'
    ]},

    { type: 'heading', level: 3, content: 'A06: Vulnerable and Outdated Components' },
    { type: 'paragraph', content: 'Using libraries, frameworks, or dependencies with known vulnerabilities.' },
    { type: 'list', items: [
      'Log4Shell (Log4j CVE-2021-44228) — affected millions of Java applications',
      'Using jQuery 1.x with known XSS vulnerabilities',
      'npm packages with known security issues (npm audit finds these)',
      'Defense: Automated dependency scanning (Dependabot, Snyk, npm audit)'
    ]},

    { type: 'heading', level: 3, content: 'A07: Identification and Authentication Failures' },
    { type: 'paragraph', content: 'Weaknesses in authentication mechanisms that allow attackers to assume other users\' identities.' },
    { type: 'list', items: [
      'No brute-force protection on login forms',
      'Weak password requirements (allowing "password123")',
      'Session tokens in URLs (shared via Referer headers)',
      'Missing or improper session invalidation on logout'
    ]},

    { type: 'heading', level: 3, content: 'A08: Software and Data Integrity Failures' },
    { type: 'paragraph', content: 'NEW in 2021. Trusting software updates, CI/CD pipelines, or data without verifying integrity.' },
    { type: 'list', items: [
      'SolarWinds attack (2020) — malware injected into a trusted software update',
      'Compromised npm packages (event-stream incident)',
      'Deserializing untrusted data without validation'
    ]},

    { type: 'heading', level: 3, content: 'A09: Security Logging and Monitoring Failures' },
    { type: 'paragraph', content: 'Without logging, you can\'t detect breaches. Without monitoring, no one sees the logs.' },
    { type: 'list', items: [
      'Login failures not logged — brute force goes undetected',
      'No alerting on suspicious activity — breaches discovered months later',
      'Average time to detect a breach: 204 days (IBM 2023)'
    ]},

    { type: 'heading', level: 3, content: 'A10: Server-Side Request Forgery (SSRF)' },
    { type: 'paragraph', content: 'NEW in 2021. The application fetches a remote resource based on user input without validation. Attacker makes the server request internal resources.' },
    { type: 'list', items: [
      'Attacker provides URL: http://169.254.169.254/latest/meta-data/ (AWS metadata)',
      'Server fetches it from inside the network — bypassing firewalls',
      'Can access internal services, read credentials, pivot to other systems'
    ]},

    { type: 'heading', level: 2, content: 'Security Testing Tools Overview' },
    { type: 'command', command: 'nikto -h http://target.com', output: `- Nikto v2.5.0
+ Target IP:          192.168.1.50
+ Target Hostname:    target.com
+ Target Port:        80
+ Start Time:         2024-06-15 11:00:00
---------------------------------------------------------------------------
+ Server: Apache/2.4.52 (Ubuntu)
+ /: The X-Content-Type-Options header is not set.
+ /: Cookie PHPSESSID created without the httponly flag.
+ /admin/: Directory indexing found.
+ /admin/config.php.bak: Backup file found. May contain sensitive information.
+ /phpinfo.php: PHP info file found. Reveals system configuration.
+ /.git/HEAD: Git repository found. Source code may be downloadable.
+ 7 items found.`, explanation: 'Nikto is a web vulnerability scanner. It found several issues: missing security headers, exposed admin directory, a backup file with potential credentials, phpinfo leaking server details, and an exposed git repository (source code leak!).' },

    { type: 'heading', level: 2, content: 'Essential Security Headers' },
    { type: 'command', command: 'curl -I https://secure-site.com', output: `HTTP/2 200
content-type: text/html; charset=UTF-8
strict-transport-security: max-age=31536000; includeSubDomains; preload
x-content-type-options: nosniff
x-frame-options: DENY
content-security-policy: default-src 'self'; script-src 'self'
x-xss-protection: 0
referrer-policy: strict-origin-when-cross-origin
permissions-policy: camera=(), microphone=(), geolocation=()`, explanation: 'A well-secured site sets these headers: HSTS (force HTTPS), nosniff (prevent MIME sniffing), X-Frame-Options (prevent clickjacking), CSP (prevent XSS), Referrer-Policy (limit information leakage).' },

    { type: 'heading', level: 2, content: 'Summary & What\'s Next' },
    { type: 'paragraph', content: 'In the coming lessons, we\'ll deep-dive into each major vulnerability:' },
    { type: 'list', items: [
      'Lesson 37: SQL Injection — The most dangerous injection attack',
      'Lesson 38: XSS — Executing code in users\' browsers',
      'Lesson 39: Authentication vulnerabilities — Breaking login systems',
      'Lesson 40: CSRF — Forcing users to take actions they didn\'t intend',
      'Lesson 41: SSRF — Making servers fetch internal resources',
      'Lesson 42: Broken Access Control — Accessing unauthorized data',
      'Lesson 43: Misconfigurations — Low-hanging fruit that attackers love',
      'Remember: Most web attacks exploit TRUST — the app trusts user input it shouldn\'t'
    ]},
  ],
  navigation: {
    prev: { title: 'Network Attacks: DDoS, DNS Poisoning & Defense', slug: 'network-attacks-ddos' },
    next: { title: 'SQL Injection: Discovery, Exploitation & Prevention', slug: 'sql-injection' },
  },
};
