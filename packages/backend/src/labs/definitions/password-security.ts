import { LabDefinition } from './index';

export const passwordSecurityLab: LabDefinition = {
  id: 'lab-password-security',
  slug: 'password-security-hashing',
  title: 'Password Security & Hashing',
  description: 'Understand how passwords are stored, why hashing matters, and how weak passwords are cracked.',
  difficulty: 'INTERMEDIATE',
  category: 'Cryptography',
  durationMinutes: 40,
  xpReward: 65,
  docker: {
    image: 'cybersec-lab-crypto',
    tag: 'passwords-v1',
    hostname: 'crypto-lab',
    cpuLimit: 1,
    memoryLimit: '512m',
    diskLimit: '1g',
    env: { LAB_TYPE: 'password-security' },
    ports: {},
    setupScript: '# Pre-populate hash files',
    healthCheck: 'which sha256sum',
  },

  objectives: [
    { id: 'obj-hash-password', title: 'Hash a password with SHA-256', description: 'Use sha256sum to hash a sample password', validationType: 'command_output', validationConfig: {} },
    { id: 'obj-identify-hash', title: 'Identify the hash algorithm', description: 'Determine what algorithm was used for a given hash', validationType: 'flag_submission', validationConfig: { flag: 'md5' } },
    { id: 'obj-crack-weak', title: 'Demonstrate weak password risk', description: 'Show why "password123" is insecure by finding its hash in a list', validationType: 'command_output', validationConfig: {} },
    { id: 'obj-understand-salt', title: 'Understand salting', description: 'Explain why two identical passwords produce different hashes when salted', validationType: 'flag_submission', validationConfig: { flag: 'salt' } },
  ],
  instructions: [
    { id: 's1', title: 'Hash a password', content: 'Generate a SHA-256 hash of the word "cybersecurity"', type: 'command', command: 'echo -n "cybersecurity" | sha256sum' },
    { id: 's2', title: 'Observe the output', content: 'The hash is always the same length (64 hex characters for SHA-256) regardless of input length. This is a one-way function.', type: 'note' },
    { id: 's3', title: 'Compare with MD5', content: 'Now generate an MD5 hash for comparison', type: 'command', command: 'echo -n "cybersecurity" | md5sum' },
    { id: 's4', title: 'Understanding weakness', content: 'MD5 produces 32 hex characters and is considered cryptographically broken. Never use MD5 for password storage.', type: 'warning' },
    { id: 's5', title: 'Check /etc/shadow format', content: 'See how Linux stores password hashes', type: 'command', command: 'sudo cat /etc/shadow 2>/dev/null || echo "Access denied (expected)"' },
  ],
  hints: [
    'SHA-256 produces 64 character hex output',
    'MD5 produces 32 character hex output',
    'A salt is random data added before hashing',
    'Linux shadow file format: $algorithm$salt$hash',
  ],
  tools: ['Terminal', 'sha256sum', 'md5sum', 'openssl'],
  validationRules: [
    { objectiveId: 'obj-hash-password', type: 'command_output', config: { command: 'echo -n "cybersecurity" | sha256sum', expectedOutput: '' } },
    { objectiveId: 'obj-identify-hash', type: 'flag_submission', config: { flag: 'md5' } },
    { objectiveId: 'obj-crack-weak', type: 'command_output', config: { command: 'echo -n "password123" | md5sum', expectedOutput: '' } },
    { objectiveId: 'obj-understand-salt', type: 'flag_submission', config: { flag: 'salt' } },
  ],
};
