import { LabDefinition } from './index';

export const networkScanningLab: LabDefinition = {
  id: 'lab-network-scanning',
  slug: 'network-scanning-basics',
  title: 'Network Scanning Basics',
  description: 'Learn to discover hosts and services on an authorized network using standard reconnaissance tools.',
  difficulty: 'BEGINNER',
  category: 'Network Security',
  durationMinutes: 45,
  xpReward: 60,
  docker: {
    image: 'cybersec-lab-network',
    tag: 'scanning-v1',
    hostname: 'scanner',
    cpuLimit: 0.5,
    memoryLimit: '512m',
    diskLimit: '1g',
    env: { LAB_TYPE: 'network-scanning', DIFFICULTY: 'beginner' },
    ports: {},
    setupScript: `
      # Network scanning lab setup
      apt-get install -y nmap netcat-openbsd
    `,
    healthCheck: 'which nmap',
  },
  objectives: [
    { id: 'obj-discover-hosts', title: 'Discover live hosts on the network', description: 'Use ping sweep or nmap host discovery', validationType: 'command_output', validationConfig: {} },
    { id: 'obj-scan-ports', title: 'Identify open ports on target', description: 'Run a port scan on 192.168.1.100', validationType: 'command_output', validationConfig: {} },
    { id: 'obj-identify-services', title: 'Identify running services', description: 'Determine what services are running on open ports', validationType: 'flag_submission', validationConfig: { flag: 'ssh,http,mysql' } },
    { id: 'obj-os-detection', title: 'Determine the operating system', description: 'Use service banners or OS detection', validationType: 'flag_submission', validationConfig: { flag: 'linux' } },
  ],
  instructions: [
    { id: 's1', title: 'Understand the scope', content: 'You are authorized to scan the 192.168.1.0/24 network. Your machine is 192.168.1.10.', type: 'text' },
    { id: 's2', title: 'Discover hosts', content: 'Find live hosts on the network', type: 'command', command: 'nmap -sn 192.168.1.0/24' },
    { id: 's3', title: 'Scan target ports', content: 'Scan the target for open ports', type: 'command', command: 'nmap 192.168.1.100' },
    { id: 's4', title: 'Service detection', content: 'Identify what services are running', type: 'command', command: 'nmap -sV 192.168.1.100' },
    { id: 's5', title: 'Authorization reminder', content: 'Always ensure you have written authorization before scanning any network. This lab is a safe, isolated environment.', type: 'warning' },
  ],
  hints: [
    'Use nmap -sn for ping sweep (host discovery)',
    'Standard port scan: nmap <target-ip>',
    'Service version detection: nmap -sV <target-ip>',
    'Common ports: 22=SSH, 80=HTTP, 3306=MySQL',
  ],
  tools: ['nmap', 'netcat', 'ping', 'Terminal'],
  networkDiagram: [
    { id: 'student', label: 'Scanner', ip: '192.168.1.10', type: 'student' },
    { id: 'target', label: 'Target Server', ip: '192.168.1.100', services: ['SSH:22', 'HTTP:80', 'MySQL:3306'], type: 'target' },
    { id: 'db', label: 'DB Server', ip: '192.168.1.200', services: ['MySQL:3306'], type: 'server' },
  ],
  validationRules: [
    { objectiveId: 'obj-discover-hosts', type: 'command_output', config: { command: 'nmap -sn 192.168.1.0/24', expectedOutput: 'Host is up' } },
    { objectiveId: 'obj-scan-ports', type: 'command_output', config: { command: 'nmap 192.168.1.100', expectedOutput: 'open' } },
    { objectiveId: 'obj-identify-services', type: 'flag_submission', config: { flag: 'ssh,http,mysql' } },
    { objectiveId: 'obj-os-detection', type: 'flag_submission', config: { flag: 'linux' } },
  ],
};
