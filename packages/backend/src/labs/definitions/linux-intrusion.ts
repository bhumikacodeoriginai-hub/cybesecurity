import { LabDefinition } from './index';

export const linuxIntrusionLab: LabDefinition = {
  id: 'lab-linux-intrusion',
  slug: 'linux-intrusion-investigation',
  title: 'Linux Intrusion Investigation',
  description: 'Investigate a Linux system that has been compromised. Find the attacker, analyze their activity, and document evidence.',
  difficulty: 'BEGINNER',
  category: 'Linux Security',
  durationMinutes: 60,
  xpReward: 75,
  docker: {
    image: 'cybersec-lab-linux',
    tag: 'intrusion-v1',
    hostname: 'compromised-host',
    cpuLimit: 0.5,
    memoryLimit: '512m',
    diskLimit: '1g',
    env: {
      LAB_TYPE: 'intrusion-investigation',
      DIFFICULTY: 'beginner',
    },
    ports: {},
    setupScript: `
      # Create suspicious user
      useradd -m -s /bin/bash h4cker_user
      echo "h4cker_user:password123" | chpasswd
      
      # Create hidden files
      echo "flag{intrusion_detected}" > /home/h4cker_user/.hidden_flag.txt
      
      # Create fake auth logs
      mkdir -p /var/log
      cat > /var/log/auth.log << 'EOF'
Jan 15 10:01:23 lab sshd[2001]: Failed password for root from 192.168.1.50 port 4321 ssh2
Jan 15 10:01:25 lab sshd[2001]: Failed password for root from 192.168.1.50 port 4321 ssh2
Jan 15 10:01:27 lab sshd[2001]: Failed password for root from 192.168.1.50 port 4321 ssh2
Jan 15 10:02:00 lab sshd[2003]: Accepted password for h4cker_user from 192.168.1.50 port 4322 ssh2
Jan 15 10:03:12 lab sudo: h4cker_user : command not allowed
EOF
      
      # Create lab readme
      mkdir -p /home/student/lab-files
      cat > /home/student/lab-files/readme.txt << 'EOF'
Welcome to the Intrusion Investigation Lab!

Your objectives:
1. Find the suspicious user on this system
2. Check the authentication logs for failed logins
3. Identify the attacker IP address  
4. Find the hidden evidence file

Good luck, investigator!
EOF
      chown -R student:student /home/student
    `,
    healthCheck: 'cat /etc/passwd | grep student',
  },

  objectives: [
    {
      id: 'obj-find-user',
      title: 'Identify the suspicious user account',
      description: 'Check /etc/passwd for unusual users with login shells',
      validationType: 'command_output',
      validationConfig: { command: 'grep h4cker /etc/passwd', expectedContains: 'h4cker_user' },
    },
    {
      id: 'obj-find-ip',
      title: 'Identify the attacker IP address',
      description: 'Analyze authentication logs to find the source IP',
      validationType: 'flag_submission',
      validationConfig: { flag: '192.168.1.50' },
    },
    {
      id: 'obj-count-failures',
      title: 'Count the failed login attempts',
      description: 'Determine how many failed SSH login attempts occurred',
      validationType: 'flag_submission',
      validationConfig: { flag: '3' },
    },
    {
      id: 'obj-find-hidden',
      title: 'Find the hidden evidence file',
      description: 'Locate the hidden file in the attacker user home directory',
      validationType: 'file_exists',
      validationConfig: { path: '/home/h4cker_user/.hidden_flag.txt' },
    },
  ],
  instructions: [
    { id: 's1', title: 'Read the scenario', content: 'A Linux server has been compromised. Your job is to investigate what happened, who did it, and find evidence.', type: 'text' },
    { id: 's2', title: 'Read the lab brief', content: 'Check your lab-files directory', type: 'command', command: 'cat /home/student/lab-files/readme.txt' },
    { id: 's3', title: 'Check system users', content: 'List all user accounts on the system', type: 'command', command: 'cat /etc/passwd' },
    { id: 's4', title: 'Identify suspicious accounts', content: 'Look for usernames that seem unusual. Normal system users typically have /usr/sbin/nologin as their shell. Users with /bin/bash can log in interactively.', type: 'note' },
    { id: 's5', title: 'Check authentication logs', content: 'View the SSH authentication logs', type: 'command', command: 'cat /var/log/auth.log' },
    { id: 's6', title: 'Filter failed attempts', content: 'Use grep to find only failed login attempts', type: 'command', command: 'grep "Failed" /var/log/auth.log' },
    { id: 's7', title: 'Find hidden files', content: 'Search for hidden files in user home directories', type: 'command', command: 'find /home -name ".*" -type f' },
    { id: 's8', title: 'Safety reminder', content: 'This is an isolated lab environment. All activities are confined here and do not affect real systems.', type: 'warning' },
  ],
  hints: [
    'Use "cat /etc/passwd" and look for users with /bin/bash shell that are not "root" or "student"',
    'In auth.log, the IP address appears after "from" in each entry',
    'Count the lines that contain "Failed password" - each line is one attempt',
    'Hidden files in Linux start with a dot (.) - use "find" or "ls -la" to see them',
  ],
  tools: ['Terminal', 'Bash', 'grep', 'find', 'cat'],
  networkDiagram: [
    { id: 'student', label: 'Your Machine', ip: '192.168.1.10', type: 'student' },
    { id: 'target', label: 'Compromised Host', ip: '192.168.1.100', services: ['SSH', 'HTTP'], type: 'target' },
    { id: 'attacker', label: 'Attacker (identified)', ip: '192.168.1.50', type: 'attacker' },
  ],
  validationRules: [
    { objectiveId: 'obj-find-user', type: 'command_output', config: { command: 'grep h4cker /etc/passwd', expectedOutput: 'h4cker_user' } },
    { objectiveId: 'obj-find-ip', type: 'flag_submission', config: { flag: '192.168.1.50' } },
    { objectiveId: 'obj-count-failures', type: 'flag_submission', config: { flag: '3' } },
    { objectiveId: 'obj-find-hidden', type: 'file_exists', config: { path: '/home/h4cker_user/.hidden_flag.txt' } },
  ],
};
