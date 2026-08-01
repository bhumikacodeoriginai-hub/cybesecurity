import { LabDefinition } from './index';

export const filePermissionsLab: LabDefinition = {
  id: 'lab-file-permissions',
  slug: 'linux-file-permissions',
  title: 'Linux File Permissions & Ownership',
  description: 'Learn to read, set, and audit file permissions. Understand how misconfigured permissions create security vulnerabilities.',
  difficulty: 'BEGINNER',
  category: 'Linux Security',
  durationMinutes: 30,
  xpReward: 50,
  docker: {
    image: 'cybersec-lab-linux',
    tag: 'permissions-v1',
    hostname: 'perm-lab',
    cpuLimit: 0.5,
    memoryLimit: '256m',
    diskLimit: '512m',
    env: { LAB_TYPE: 'file-permissions', DIFFICULTY: 'beginner' },
    ports: {},
    setupScript: `
      mkdir -p /home/student/exercise
      echo "secret data" > /home/student/exercise/sensitive.txt
      chmod 777 /home/student/exercise/sensitive.txt
      echo "config password=admin123" > /tmp/app.conf
      chmod 644 /tmp/app.conf
    `,
    healthCheck: 'test -f /home/student/exercise/sensitive.txt',
  },
  objectives: [
    { id: 'obj-read-perms', title: 'Read current permissions of sensitive.txt', description: 'Use ls -la to view the file permissions', validationType: 'command_output', validationConfig: {} },
    { id: 'obj-fix-perms', title: 'Fix the overly permissive file', description: 'Set sensitive.txt to owner-only read/write (600)', validationType: 'command_output', validationConfig: { command: 'stat -c %a /home/student/exercise/sensitive.txt', expectedOutput: '600' } },
    { id: 'obj-find-world-readable', title: 'Find world-readable config files', description: 'Locate config files readable by all users', validationType: 'command_output', validationConfig: {} },
    { id: 'obj-understand-suid', title: 'Find SUID binaries', description: 'Search for files with the SUID bit set', validationType: 'command_output', validationConfig: {} },
  ],
  instructions: [
    { id: 's1', title: 'Check file permissions', content: 'View the permissions of the exercise file', type: 'command', command: 'ls -la /home/student/exercise/' },
    { id: 's2', title: 'Understand the problem', content: 'The file sensitive.txt has permissions 777 (rwxrwxrwx). This means ANYONE on the system can read, write, and execute it. This is a major security risk.', type: 'note' },
    { id: 's3', title: 'Fix the permissions', content: 'Set proper permissions (owner read/write only)', type: 'command', command: 'chmod 600 /home/student/exercise/sensitive.txt' },
    { id: 's4', title: 'Verify the fix', content: 'Confirm the permissions are correct', type: 'command', command: 'ls -la /home/student/exercise/sensitive.txt' },
    { id: 's5', title: 'Find SUID binaries', content: 'SUID binaries run with the owners permissions', type: 'command', command: 'find / -perm -4000 -type f 2>/dev/null' },
    { id: 's6', title: 'Security impact', content: 'Misconfigured permissions are one of the most common security issues in Linux. Always follow the principle of least privilege.', type: 'warning' },
  ],
  hints: [
    'Use "ls -la" to see detailed permissions',
    'chmod 600 sets read+write for owner only',
    'find / -perm -o+r searches for world-readable files',
    'SUID bit: find / -perm -4000 -type f',
  ],
  tools: ['Terminal', 'chmod', 'chown', 'find', 'ls', 'stat'],
  validationRules: [
    { objectiveId: 'obj-read-perms', type: 'command_output', config: { command: 'ls -la /home/student/exercise/sensitive.txt', expectedOutput: 'sensitive.txt' } },
    { objectiveId: 'obj-fix-perms', type: 'command_output', config: { command: 'stat -c %a /home/student/exercise/sensitive.txt', expectedOutput: '600' } },
    { objectiveId: 'obj-find-world-readable', type: 'command_output', config: { command: 'find /tmp -perm -o+r -type f', expectedOutput: 'app.conf' } },
    { objectiveId: 'obj-understand-suid', type: 'command_output', config: { command: 'find / -perm -4000 -type f 2>/dev/null', expectedOutput: '/usr/bin/' } },
  ],
};
