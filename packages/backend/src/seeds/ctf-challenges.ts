import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seed 25+ CTF challenges across all categories and difficulty levels
 */
export async function seedCTFChallenges() {
  console.log('  Seeding CTF challenges...');

  // Delete existing challenges
  await prisma.challengeAttempt.deleteMany();
  await prisma.challenge.deleteMany();

  const challenges = [
    // ===== WEB (6 challenges) =====
    {
      title: 'Hello Security',
      slug: 'hello-security',
      description: 'A warm-up challenge. Find the hidden flag in the HTML source code of our practice web page. Sometimes developers leave sensitive information in comments.',
      category: 'WEB',
      difficulty: 'BEGINNER',
      points: 50,
      flag: 'flag{welcome_to_cybersec}',
      hints: ['View the page source (Ctrl+U)', 'Look for HTML comments (<!-- -->)', 'Check near the footer section'],
      maxAttempts: 10,
    },
    {
      title: 'Cookie Monster',
      slug: 'cookie-monster',
      description: 'The web application stores user role information in a cookie. Can you elevate your privileges to admin by manipulating the cookie value?',
      category: 'WEB',
      difficulty: 'BEGINNER',
      points: 75,
      flag: 'flag{cookie_tampering_101}',
      hints: ['Inspect cookies in browser DevTools', 'The role cookie might be base64 encoded', 'Try changing "user" to "admin"'],
      maxAttempts: 10,
    },
    {
      title: 'Broken Authentication',
      slug: 'broken-authentication',
      description: 'The login form on our practice application has a vulnerability. The backend uses string concatenation to build SQL queries. Can you bypass authentication?',
      category: 'WEB',
      difficulty: 'INTERMEDIATE',
      points: 150,
      flag: 'flag{auth_bypass_success}',
      hints: ['Think about SQL injection', 'What happens if you close the SQL string early?', "Try: ' OR 1=1 --"],
      maxAttempts: 15,
    },

    {
      title: 'Hidden API',
      slug: 'hidden-api',
      description: 'The web application has an undocumented API endpoint that exposes sensitive data. Can you find it by examining JavaScript files and network requests?',
      category: 'WEB',
      difficulty: 'INTERMEDIATE',
      points: 125,
      flag: 'flag{api_endpoint_discovered}',
      hints: ['Check JavaScript source files for API calls', 'Look at robots.txt and sitemap.xml', 'Try /api/v1/admin/users'],
      maxAttempts: 12,
    },
    {
      title: 'XSS Playground',
      slug: 'xss-playground',
      description: 'The search functionality on our practice app does not sanitize user input. Craft a payload that triggers a JavaScript alert showing the flag. The flag is stored in a hidden DOM element.',
      category: 'WEB',
      difficulty: 'ADVANCED',
      points: 200,
      flag: 'flag{xss_reflected_payload}',
      hints: ['Try injecting <script> tags in the search field', 'The input might filter some tags—try event handlers', 'Try: <img src=x onerror="alert(document.getElementById(\'flag\').innerText)">'],
      maxAttempts: 20,
    },
    {
      title: 'JWT Forgery',
      slug: 'jwt-forgery',
      description: 'The application uses JWT tokens for authentication but has a critical misconfiguration. Can you forge a valid admin token?',
      category: 'WEB',
      difficulty: 'ADVANCED',
      points: 250,
      flag: 'flag{jwt_none_algorithm_attack}',
      hints: ['Decode the JWT token at jwt.io', 'What happens if you change the algorithm to "none"?', 'Remove the signature and change role to admin'],
      maxAttempts: 15,
    },

    // ===== LINUX (5 challenges) =====
    {
      title: 'Find the User',
      slug: 'find-the-user',
      description: 'A suspicious user has been created on this Linux system. Find their username. The flag format is flag{username}.',
      category: 'LINUX',
      difficulty: 'BEGINNER',
      points: 75,
      flag: 'flag{h4cker_user}',
      hints: ['Check /etc/passwd', 'Look for users with unusual shells', 'Filter users with /bin/bash shell'],
      maxAttempts: 10,
    },
    {
      title: 'Hidden in Plain Sight',
      slug: 'hidden-plain-sight',
      description: 'A file has been hidden somewhere on the Linux system. It contains the flag. Remember: in Linux, files starting with a dot are hidden.',
      category: 'LINUX',
      difficulty: 'BEGINNER',
      points: 75,
      flag: 'flag{hidden_files_found}',
      hints: ['Hidden files start with a dot', 'Try: find / -name ".*flag*"', 'Check in /home directories'],
      maxAttempts: 10,
    },
    {
      title: 'Permission Denied',
      slug: 'permission-denied',
      description: 'The flag is in a file owned by root. You cannot read it directly, but there is a SUID binary on the system that can help you. Find and exploit it.',
      category: 'LINUX',
      difficulty: 'INTERMEDIATE',
      points: 150,
      flag: 'flag{suid_privilege_escalation}',
      hints: ['Find SUID binaries: find / -perm -4000', 'Look for unusual SUID programs', 'A SUID "cat" or "less" would let you read any file'],
      maxAttempts: 12,
    },
    {
      title: 'Cron Job Exploit',
      slug: 'cron-job-exploit',
      description: 'A cron job runs a script every minute as root. The script has a vulnerability that allows you to inject commands. Find it and get the flag from /root/flag.txt.',
      category: 'LINUX',
      difficulty: 'ADVANCED',
      points: 200,
      flag: 'flag{cron_command_injection}',
      hints: ['Check /etc/crontab and /var/spool/cron/', 'Look at the script being executed', 'Can you write to a file the script sources?'],
      maxAttempts: 15,
    },
    {
      title: 'Log Forensics',
      slug: 'log-forensics',
      description: 'Analyze the system logs to find evidence of an attack. The attacker left the flag in their command history. Find the flag that was exfiltrated.',
      category: 'LINUX',
      difficulty: 'INTERMEDIATE',
      points: 125,
      flag: 'flag{log_analysis_complete}',
      hints: ['Check /var/log/auth.log for suspicious activity', 'Look at bash_history files', 'The attacker user home directory has evidence'],
      maxAttempts: 10,
    },

    // ===== NETWORK (4 challenges) =====
    {
      title: 'Packet Detective',
      slug: 'packet-detective',
      description: 'Analyze the provided PCAP file and find the suspicious DNS query. The flag is the queried domain in format flag{domain}.',
      category: 'NETWORK',
      difficulty: 'INTERMEDIATE',
      points: 100,
      flag: 'flag{evil-c2-server.bad}',
      hints: ['Filter by DNS protocol in Wireshark', 'Look for unusual domain names', 'C2 domains often have random-looking subdomains'],
      maxAttempts: 10,
    },
    {
      title: 'Port Scan Analysis',
      slug: 'port-scan-analysis',
      description: 'A network scan was performed on the target. Identify the service running on port 8443. The flag format is flag{service_name}.',
      category: 'NETWORK',
      difficulty: 'BEGINNER',
      points: 75,
      flag: 'flag{https_alt}',
      hints: ['Use nmap with service detection: nmap -sV', 'Port 8443 is commonly used for what?', 'Its an alternative HTTPS port'],
      maxAttempts: 10,
    },
    {
      title: 'Man in the Middle',
      slug: 'man-in-the-middle',
      description: 'In the provided packet capture, an attacker performed ARP spoofing. Identify the attackers MAC address. Flag format: flag{xx:xx:xx:xx:xx:xx}.',
      category: 'NETWORK',
      difficulty: 'ADVANCED',
      points: 200,
      flag: 'flag{aa:bb:cc:dd:ee:ff}',
      hints: ['Filter ARP packets in the capture', 'Look for duplicate IP-to-MAC mappings', 'The attacker sends gratuitous ARP replies'],
      maxAttempts: 12,
    },
    {
      title: 'Firewall Bypass',
      slug: 'firewall-bypass',
      description: 'The target server has a firewall blocking most ports. However, one common protocol is allowed through. Use it to reach the hidden service and retrieve the flag.',
      category: 'NETWORK',
      difficulty: 'ADVANCED',
      points: 175,
      flag: 'flag{dns_tunnel_detected}',
      hints: ['DNS (port 53) is almost always allowed', 'Can you tunnel data over DNS?', 'Tools like dnscat2 exploit this'],
      maxAttempts: 12,
    },

    // ===== CRYPTO (4 challenges) =====
    {
      title: 'Base64 Decode',
      slug: 'base64-decode',
      description: 'The flag has been encoded. Can you decode it?\n\nEncoded: ZmxhZ3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259',
      category: 'CRYPTO',
      difficulty: 'BEGINNER',
      points: 50,
      flag: 'flag{base64_is_not_encryption}',
      hints: ['This is a common encoding scheme, not encryption', 'Try echo "..." | base64 -d', 'Use an online base64 decoder'],
      maxAttempts: 10,
    },
    {
      title: 'Caesar Shift',
      slug: 'caesar-shift',
      description: 'The following message was encrypted with a Caesar cipher:\n\nsynt{pnrfne_pvcure_oebxra}\n\nFind the original flag.',
      category: 'CRYPTO',
      difficulty: 'BEGINNER',
      points: 75,
      flag: 'flag{caesar_cipher_broken}',
      hints: ['Caesar cipher shifts each letter by a fixed amount', 'Try ROT13 (shift of 13)', 'f shifted by 13 becomes s'],
      maxAttempts: 10,
    },
    {
      title: 'Hash Cracker',
      slug: 'hash-cracker',
      description: 'The password hash below was found in a database breach. Crack it to find the flag.\n\nMD5: 5f4dcc3b5aa765d61d8327deb882cf99\n\nThe flag format is flag{password}.',
      category: 'CRYPTO',
      difficulty: 'INTERMEDIATE',
      points: 125,
      flag: 'flag{password}',
      hints: ['This is an MD5 hash', 'Try common password lists or online rainbow tables', 'This is one of the most common passwords ever'],
      maxAttempts: 10,
    },
    {
      title: 'RSA Weak Key',
      slug: 'rsa-weak-key',
      description: 'An RSA public key was generated with a small prime. The modulus n=143, e=7, and the ciphertext c=42. Decrypt to find the flag number. Flag format: flag{plaintext_number}.',
      category: 'CRYPTO',
      difficulty: 'ADVANCED',
      points: 200,
      flag: 'flag{7}',
      hints: ['Factor the small modulus: 143 = 11 * 13', 'Calculate phi(n) = (p-1)(q-1) = 10*12 = 120', 'Find d where e*d mod phi(n) = 1, then compute c^d mod n'],
      maxAttempts: 15,
    },

    // ===== FORENSICS (3 challenges) =====
    {
      title: 'Metadata Secrets',
      slug: 'metadata-secrets',
      description: 'A document was found on the suspects computer. The flag is hidden in the file metadata (EXIF data). Extract it to find the secret.',
      category: 'FORENSICS',
      difficulty: 'BEGINNER',
      points: 75,
      flag: 'flag{metadata_reveals_all}',
      hints: ['Use exiftool or similar to read metadata', 'Check the "Comment" or "Author" fields', 'strings command can also reveal hidden text'],
      maxAttempts: 10,
    },
    {
      title: 'Deleted Evidence',
      slug: 'deleted-evidence',
      description: 'A file was deleted from the disk image. Use forensic tools to recover it and find the flag inside.',
      category: 'FORENSICS',
      difficulty: 'INTERMEDIATE',
      points: 150,
      flag: 'flag{deleted_but_not_gone}',
      hints: ['Deleted files may still exist on disk until overwritten', 'Use tools like foremost or scalpel', 'Check unallocated space'],
      maxAttempts: 12,
    },
    {
      title: 'Memory Dump',
      slug: 'memory-dump',
      description: 'A RAM dump was taken from a compromised machine. Find the attackers command that was executed. The flag is the full command.',
      category: 'FORENSICS',
      difficulty: 'ADVANCED',
      points: 225,
      flag: 'flag{volatility_analysis_win}',
      hints: ['Use Volatility framework for memory analysis', 'Try the "cmdline" or "consoles" plugin', 'Look for suspicious processes first with "pslist"'],
      maxAttempts: 15,
    },

    // ===== CLOUD (2 challenges) =====
    {
      title: 'S3 Bucket Misconfiguration',
      slug: 's3-bucket-misconfiguration',
      description: 'A company left their S3 bucket publicly accessible. The bucket name is "cybersec-academy-challenge-bucket". Find the flag file inside.',
      category: 'CLOUD',
      difficulty: 'INTERMEDIATE',
      points: 125,
      flag: 'flag{public_bucket_exposed}',
      hints: ['S3 buckets can be accessed via URL if public', 'Try: aws s3 ls s3://bucket-name --no-sign-request', 'Public buckets are a top cloud misconfiguration'],
      maxAttempts: 10,
    },
    {
      title: 'IAM Privilege Escalation',
      slug: 'iam-privilege-escalation',
      description: 'You have limited AWS credentials. Find a way to escalate your privileges using IAM policy misconfigurations. The flag is in a secret accessible only to admins.',
      category: 'CLOUD',
      difficulty: 'ADVANCED',
      points: 250,
      flag: 'flag{iam_privesc_to_admin}',
      hints: ['Check what permissions you have: aws iam list-policies', 'Can you attach policies to your own user?', 'iam:AttachUserPolicy is a dangerous permission'],
      maxAttempts: 15,
    },

    // ===== DEFENSIVE (2 challenges) =====
    {
      title: 'Detect the Intrusion',
      slug: 'detect-the-intrusion',
      description: 'Review the provided SIEM alert logs. Identify the IP address that performed the brute-force attack. Flag format: flag{ip_address}.',
      category: 'DEFENSIVE',
      difficulty: 'BEGINNER',
      points: 75,
      flag: 'flag{10.0.0.55}',
      hints: ['Look for multiple failed login attempts from same IP', 'Filter by "authentication_failure" events', 'The attacker tried over 50 passwords'],
      maxAttempts: 10,
    },
    {
      title: 'Malware Indicator',
      slug: 'malware-indicator',
      description: 'A suspicious process was found on a compromised host. It beacons to a C2 server every 60 seconds. Find the C2 domain from the network logs. Flag: flag{domain}.',
      category: 'DEFENSIVE',
      difficulty: 'INTERMEDIATE',
      points: 150,
      flag: 'flag{evil-update-server.xyz}',
      hints: ['Look for periodic DNS queries (every 60s)', 'Filter outbound connections from the infected host', 'C2 domains often mimic legitimate services'],
      maxAttempts: 12,
    },
  ];

  // Hash all flags and insert
  for (const challenge of challenges) {
    const flagHash = await bcrypt.hash(challenge.flag, 10);
    await prisma.challenge.create({
      data: {
        title: challenge.title,
        slug: challenge.slug,
        description: challenge.description,
        category: challenge.category as any,
        difficulty: challenge.difficulty as any,
        points: challenge.points,
        flagHash,
        hints: challenge.hints,
        maxAttempts: challenge.maxAttempts,
        isActive: true,
        solveCount: Math.floor(Math.random() * 100),
      },
    });
  }

  console.log(`  ✓ ${challenges.length} CTF challenges created`);
}
