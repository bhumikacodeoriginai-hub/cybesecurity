export const lesson = {
  id: 'L51',
  title: 'Reconnaissance & Information Gathering',
  slug: 'recon-information-gathering',
  type: 'PRACTICAL',
  duration: 55,
  xpReward: 40,
  difficulty: 'advanced',
  module: { title: 'Ethical Hacking', slug: 'ethical-hacking' },
  course: { title: 'Penetration Testing', slug: 'penetration-testing' },
  keyTerms: [
    'Reconnaissance', 'OSINT', 'Passive Recon', 'Active Recon',
    'Footprinting', 'Google Dorking', 'Shodan', 'WHOIS',
    'Subdomain Enumeration', 'Social Engineering'
  ],
  content: [
    { type: 'heading', content: 'Reconnaissance & Information Gathering' },
    { type: 'paragraph', content: 'Reconnaissance is the first and most critical phase of any penetration test or attack. Before attacking a target, you need to understand it: What technologies do they use? What\'s their network structure? Who are their employees? The more you know, the more targeted and effective your attacks will be.' },


    { type: 'callout', variant: 'info', content: 'Analogy: Reconnaissance is like a burglar casing a house before breaking in. They note when the owners leave for work, which windows are unlocked, what security cameras exist, and whether there\'s a dog. The more they learn without being noticed (passive recon), the higher their chance of success. In cybersecurity, recon gives you a complete picture of the attack surface.' },

    { type: 'heading', level: 2, content: 'Passive vs Active Reconnaissance' },
    { type: 'list', items: [
      'Passive Recon — Gathering information WITHOUT directly interacting with the target',
      '  → No packets sent to target servers, no logs generated',
      '  → OSINT, Google dorking, WHOIS, public records, social media',
      '  → Undetectable by the target',
      'Active Recon — Directly probing the target\'s systems',
      '  → Port scanning, banner grabbing, DNS zone transfers',
      '  → Generates logs and may trigger security alerts',
      '  → Must have authorization before performing'
    ]},

    { type: 'heading', level: 2, content: 'Passive Reconnaissance Techniques' },

    { type: 'heading', level: 3, content: '1. WHOIS Lookup' },
    { type: 'command', command: 'whois example.com | grep -E "Registrant|Admin|Tech|Name Server"', output: `Registrant Organization: Example Inc.
Registrant State/Province: California
Registrant Country: US
Admin Email: admin@example.com
Tech Email: tech-team@example.com
Name Server: ns1.cloudflare.com
Name Server: ns2.cloudflare.com`, explanation: 'WHOIS reveals: Who registered the domain, their location, contact emails (phishing targets!), and DNS provider (Cloudflare = likely WAF/CDN protected). Many domains use privacy services to hide this info.' },

    { type: 'heading', level: 3, content: '2. DNS Enumeration' },
    { type: 'command', command: 'dig example.com ANY +short', output: `93.184.216.34
2606:2800:220:1:248:1893:25c8:1946
ns1.example.com.
ns2.example.com.
10 mail.example.com.`, explanation: 'Query all DNS records to discover: IP addresses (hosting), mail servers (email security testing), nameservers (potential zone transfer).' },

    { type: 'command', command: 'subfinder -d example.com -silent | head -15', output: `www.example.com
mail.example.com
dev.example.com
staging.example.com
api.example.com
admin.example.com
vpn.example.com
jenkins.example.com
jira.example.com
git.example.com
test.example.com
beta.example.com`, explanation: 'Subdomain enumeration reveals the FULL attack surface. dev, staging, and test environments often have weaker security. jenkins, jira, and git may expose sensitive internal tools. Each subdomain is a potential entry point.' },

    { type: 'heading', level: 3, content: '3. Google Dorking' },
    { type: 'paragraph', content: 'Using advanced Google search operators to find sensitive information indexed by search engines:' },
    { type: 'list', items: [
      'site:example.com filetype:pdf — Find all PDFs (may contain sensitive docs)',
      'site:example.com intitle:"index of" — Find exposed directory listings',
      'site:example.com inurl:admin — Find admin panels',
      'site:example.com ext:sql | ext:bak — Find database dumps and backups',
      '"example.com" password OR secret OR credentials — Find leaked credentials',
      'site:github.com "example.com" password — Find secrets accidentally committed to GitHub'
    ]},

    { type: 'callout', variant: 'security', content: 'Google Dorking regularly finds: exposed .env files with API keys, database backups, admin panels with default credentials, internal documents uploaded publicly, and employee email addresses for phishing campaigns. Check your own domain regularly!' },

    { type: 'heading', level: 3, content: '4. Shodan: The Search Engine for Devices' },
    { type: 'command', command: 'shodan search "example.com" --fields ip_str,port,org,product', output: `93.184.216.34  80   Example Inc  nginx/1.24.0
93.184.216.34  443  Example Inc  nginx/1.24.0
93.184.216.35  22   Example Inc  OpenSSH_8.9
93.184.216.36  3306 Example Inc  MySQL 8.0.35
93.184.216.37  6379 Example Inc  Redis 7.0.11`, explanation: 'Shodan indexes internet-facing devices and their banners. It found: web servers (nginx version), SSH server, MySQL database (SHOULD NOT be internet-facing!), and Redis (also should not be public!). Two critical misconfigurations found without sending a single packet to the target.' },

    { type: 'heading', level: 2, content: 'Active Reconnaissance' },

    { type: 'heading', level: 3, content: '5. Banner Grabbing' },
    { type: 'command', command: 'nc -v target.com 80 <<< "HEAD / HTTP/1.1\\nHost: target.com\\n\\n"', output: `HTTP/1.1 200 OK
Server: Apache/2.4.52 (Ubuntu)
X-Powered-By: PHP/8.1.2
X-Generator: WordPress 6.4.2`, explanation: 'Banner grabbing reveals exact software versions: Apache 2.4.52, PHP 8.1.2, WordPress 6.4.2. Attackers search CVE databases for known vulnerabilities in these specific versions.' },

    { type: 'heading', level: 3, content: '6. Technology Fingerprinting' },
    { type: 'command', command: 'whatweb target.com', output: `http://target.com [200 OK]
  Apache[2.4.52], Bootstrap[5.3.0], Country[US], 
  HTML5, HTTPServer[Ubuntu Linux][Apache/2.4.52],
  JQuery[3.6.0], PHP[8.1.2], Script, Title[Target Corp],
  WordPress[6.4.2], WordPress-Theme[flavor]`, explanation: 'WhatWeb identifies technologies: web server, CMS, JavaScript libraries, programming language, and theme. Each component is a potential attack vector with version-specific vulnerabilities.' },

    { type: 'heading', level: 2, content: 'OSINT Framework & Tools' },
    { type: 'list', items: [
      'theHarvester — Gathers emails, names, subdomains, IPs from public sources',
      'Maltego — Visual link analysis between entities (people, companies, infrastructure)',
      'Recon-ng — Modular reconnaissance framework',
      'Amass — In-depth DNS enumeration and network mapping',
      'SpiderFoot — Automated OSINT collection across 200+ data sources',
      'Wayback Machine — View historical versions of websites (find old vulnerabilities)',
      'LinkedIn — Employee enumeration (names, roles, technologies they know)',
      'Pastebin/GitHub — Search for accidentally leaked credentials or code'
    ]},

    { type: 'command', command: 'theHarvester -d example.com -b google,bing,linkedin -l 200', output: `*******************************************************************
*  _   _                                            _             *
* | |_| |__   ___    /\\  /\\__ _ _ ____   _____  ___| |_ ___ _ __  *
*******************************************************************

[*] Emails found: 12
admin@example.com
john.smith@example.com
sarah.jones@example.com
hr@example.com
...

[*] Hosts found: 8
www.example.com: 93.184.216.34
mail.example.com: 93.184.216.35
dev.example.com: 93.184.216.36
...`, explanation: 'theHarvester found 12 email addresses and 8 subdomains from public sources. Emails become phishing targets. Subdomains become scanning targets. All without touching the target\'s servers.' },

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'list', items: [
      'Reconnaissance provides the intelligence that makes attacks targeted and effective',
      'Passive recon is undetectable — you can\'t stop someone from googling your company',
      'Reduce your attack surface: Remove unnecessary subdomains, services, and exposed information',
      'Monitor for leaked credentials on GitHub, Pastebin, and dark web',
      'Use privacy services for domain registration (WHOIS privacy)',
      'Remove server version headers in production',
      'Regularly search for your own organization with Google dorks and Shodan',
      'Defense: You can\'t hide everything, but you CAN minimize what\'s exposed and monitor for reconnaissance'
    ]},
  ],
  navigation: {
    prev: { title: 'Cryptographic Attacks & Best Practices', slug: 'crypto-attacks-practices' },
    next: { title: 'Network Scanning with Nmap', slug: 'nmap-scanning' },
  },
};
