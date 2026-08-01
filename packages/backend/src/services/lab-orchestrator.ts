import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../models/prisma';
import { config } from '../config';

/**
 * Lab Orchestration Engine
 * 
 * Manages the complete lifecycle of lab environments:
 * - Provisioning isolated Docker containers
 * - Starting/stopping/resetting lab instances
 * - Auto-expiration of labs
 * - Resource limit enforcement
 * - Container cleanup
 * 
 * Architecture:
 *   Browser Terminal ←→ WebSocket Proxy ←→ Docker Exec ←→ Lab Container
 *   
 * Security Model:
 *   - Each lab runs in an isolated Docker container
 *   - No outbound internet access from lab containers
 *   - CPU/Memory/Disk limits enforced
 *   - Auto-expiration prevents resource exhaustion
 *   - Separate Docker network per lab instance
 */

export interface LabContainerConfig {
  image: string;
  hostname?: string;
  env?: Record<string, string>;
  cpuLimit?: number;       // CPU cores (0.5 = half a core)
  memoryLimit?: string;    // e.g., '512m', '1g'
  diskLimit?: string;      // e.g., '1g'
  networkMode?: string;    // 'isolated' | 'lab-network'
  ports?: Record<string, number>;  // containerPort -> hostPort
  volumes?: string[];
  startupCommand?: string;
  shell?: string;          // Default shell for terminal access
}

export interface LabInstanceInfo {
  instanceId: string;
  labId: string;
  userId: string;
  status: 'provisioning' | 'running' | 'paused' | 'stopped' | 'expired' | 'error';
  containerId?: string;
  accessUrl?: string;
  startedAt: Date;
  expiresAt: Date;
  containerConfig: LabContainerConfig;
}

export interface LabValidationResult {
  passed: boolean;
  objectiveResults: {
    objectiveId: string;
    title: string;
    passed: boolean;
    message?: string;
  }[];
  score: number;
  totalObjectives: number;
  completedObjectives: number;
}

// In-memory store for active lab instances (in production, use Redis)
const activeInstances = new Map<string, LabInstanceInfo>();

// Lab expiration timers
const expirationTimers = new Map<string, NodeJS.Timeout>();

class LabOrchestrator extends EventEmitter {
  private static instance: LabOrchestrator;

  private constructor() {
    super();
    this.startCleanupInterval();
  }

  static getInstance(): LabOrchestrator {
    if (!LabOrchestrator.instance) {
      LabOrchestrator.instance = new LabOrchestrator();
    }
    return LabOrchestrator.instance;
  }

  /**
   * Provision and start a new lab instance
   */
  async startLab(labId: string, userId: string): Promise<LabInstanceInfo> {
    // Check concurrent lab limit
    const userActiveLabs = await this.getUserActiveLabs(userId);
    if (userActiveLabs.length >= config.lab.maxConcurrentPerUser) {
      throw new LabError(
        `Maximum concurrent labs reached (${config.lab.maxConcurrentPerUser}). Stop an existing lab first.`,
        'MAX_CONCURRENT_REACHED'
      );
    }

    // Get lab configuration from database
    const lab = await prisma.lab.findUnique({
      where: { id: labId },
      include: { lesson: { select: { title: true } } },
    });

    if (!lab) {
      throw new LabError('Lab not found.', 'LAB_NOT_FOUND');
    }

    if (!lab.isPublished) {
      throw new LabError('This lab is not currently available.', 'LAB_NOT_AVAILABLE');
    }

    // Parse environment config
    const envConfig = lab.environmentConfig as any;
    const containerConfig: LabContainerConfig = {
      image: envConfig?.image || 'cybersec-lab-linux:latest',
      hostname: envConfig?.hostname || 'lab',
      env: envConfig?.env || {},
      cpuLimit: envConfig?.cpuLimit || 0.5,
      memoryLimit: envConfig?.memoryLimit || '512m',
      diskLimit: envConfig?.diskLimit || '1g',
      networkMode: 'isolated',
      shell: envConfig?.shell || '/bin/bash',
      startupCommand: envConfig?.startupCommand,
    };

    // Calculate expiration
    const durationMinutes = lab.durationMinutes || config.lab.maxDurationMinutes;
    const expiresAt = new Date(Date.now() + durationMinutes * 60 * 1000);

    // Create instance record
    const instanceId = uuidv4();
    const containerId = `lab-${instanceId.substring(0, 8)}`;

    const instance: LabInstanceInfo = {
      instanceId,
      labId,
      userId,
      status: 'provisioning',
      containerId,
      startedAt: new Date(),
      expiresAt,
      containerConfig,
    };

    // Store in memory
    activeInstances.set(instanceId, instance);

    // Create database record
    await prisma.labInstance.create({
      data: {
        id: instanceId,
        labId,
        userId,
        status: 'PROVISIONING',
        containerId,
        expiresAt,
      },
    });

    // Simulate container provisioning (in production: Docker API calls)
    await this.provisionContainer(instance);

    // Update status to running
    instance.status = 'running';
    instance.accessUrl = `/api/labs/${instanceId}/terminal`;
    activeInstances.set(instanceId, instance);

    await prisma.labInstance.update({
      where: { id: instanceId },
      data: {
        status: 'RUNNING',
        accessUrl: instance.accessUrl,
      },
    });

    // Set expiration timer
    this.setExpirationTimer(instanceId, durationMinutes);

    // Emit event
    this.emit('lab:started', { instanceId, labId, userId });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId,
        action: 'LAB_STARTED',
        entityType: 'LAB_INSTANCE',
        entityId: instanceId,
        metadata: { labId, containerId, expiresAt: expiresAt.toISOString() },
      },
    });

    return instance;
  }

  /**
   * Stop a running lab instance
   */
  async stopLab(instanceId: string, userId: string): Promise<void> {
    const instance = activeInstances.get(instanceId);

    if (!instance) {
      // Check database
      const dbInstance = await prisma.labInstance.findFirst({
        where: { id: instanceId, userId },
      });
      if (!dbInstance) {
        throw new LabError('Lab instance not found.', 'INSTANCE_NOT_FOUND');
      }
      if (dbInstance.status === 'STOPPED' || dbInstance.status === 'EXPIRED') {
        throw new LabError('Lab is already stopped.', 'ALREADY_STOPPED');
      }
    }

    if (instance && instance.userId !== userId) {
      throw new LabError('Unauthorized.', 'UNAUTHORIZED');
    }

    // Stop container (in production: Docker stop)
    await this.destroyContainer(instance?.containerId || instanceId);

    // Clear expiration timer
    const timer = expirationTimers.get(instanceId);
    if (timer) {
      clearTimeout(timer);
      expirationTimers.delete(instanceId);
    }

    // Update records
    activeInstances.delete(instanceId);

    await prisma.labInstance.update({
      where: { id: instanceId },
      data: {
        status: 'STOPPED',
        stoppedAt: new Date(),
      },
    });

    this.emit('lab:stopped', { instanceId, userId });

    await prisma.auditLog.create({
      data: {
        userId,
        action: 'LAB_STOPPED',
        entityType: 'LAB_INSTANCE',
        entityId: instanceId,
      },
    });
  }

  /**
   * Reset a lab (destroy and re-provision)
   */
  async resetLab(instanceId: string, userId: string): Promise<LabInstanceInfo> {
    const instance = activeInstances.get(instanceId);

    if (!instance) {
      throw new LabError('Lab instance not found or not active.', 'INSTANCE_NOT_FOUND');
    }

    if (instance.userId !== userId) {
      throw new LabError('Unauthorized.', 'UNAUTHORIZED');
    }

    // Destroy current container
    await this.destroyContainer(instance.containerId);

    // Re-provision with same config
    instance.status = 'provisioning';
    activeInstances.set(instanceId, instance);

    await this.provisionContainer(instance);

    instance.status = 'running';
    activeInstances.set(instanceId, instance);

    await prisma.labInstance.update({
      where: { id: instanceId },
      data: { status: 'RUNNING' },
    });

    this.emit('lab:reset', { instanceId, userId });

    await prisma.auditLog.create({
      data: {
        userId,
        action: 'LAB_RESET',
        entityType: 'LAB_INSTANCE',
        entityId: instanceId,
      },
    });

    return instance;
  }

  /**
   * Get status of a lab instance
   */
  async getLabStatus(instanceId: string, userId: string): Promise<LabInstanceInfo | null> {
    const instance = activeInstances.get(instanceId);

    if (instance && instance.userId === userId) {
      return instance;
    }

    // Check database
    const dbInstance = await prisma.labInstance.findFirst({
      where: { id: instanceId, userId },
    });

    if (dbInstance) {
      return {
        instanceId: dbInstance.id,
        labId: dbInstance.labId,
        userId: dbInstance.userId,
        status: dbInstance.status.toLowerCase() as any,
        containerId: dbInstance.containerId || undefined,
        accessUrl: dbInstance.accessUrl || undefined,
        startedAt: dbInstance.startedAt,
        expiresAt: dbInstance.expiresAt,
        containerConfig: {} as LabContainerConfig,
      };
    }

    return null;
  }

  /**
   * Get all active labs for a user
   */
  async getUserActiveLabs(userId: string): Promise<LabInstanceInfo[]> {
    const labs: LabInstanceInfo[] = [];
    for (const [, instance] of activeInstances) {
      if (instance.userId === userId && (instance.status === 'running' || instance.status === 'provisioning')) {
        labs.push(instance);
      }
    }
    return labs;
  }

  /**
   * Validate lab objectives
   */
  async validateLab(instanceId: string, userId: string): Promise<LabValidationResult> {
    const instance = activeInstances.get(instanceId);

    if (!instance || instance.userId !== userId) {
      throw new LabError('Lab instance not found or unauthorized.', 'INSTANCE_NOT_FOUND');
    }

    // Get lab objectives
    const lab = await prisma.lab.findUnique({
      where: { id: instance.labId },
    });

    if (!lab) {
      throw new LabError('Lab configuration not found.', 'LAB_NOT_FOUND');
    }

    const objectives = (lab.objectives as any[]) || [];

    // Run validation (in production: execute validation scripts inside container)
    const objectiveResults = await this.runValidation(instance, objectives);

    const completedObjectives = objectiveResults.filter(r => r.passed).length;
    const score = objectives.length > 0 
      ? Math.round((completedObjectives / objectives.length) * 100)
      : 0;

    const result: LabValidationResult = {
      passed: completedObjectives === objectives.length,
      objectiveResults,
      score,
      totalObjectives: objectives.length,
      completedObjectives,
    };

    // If all objectives passed, mark lab as completed
    if (result.passed) {
      await prisma.userProgress.upsert({
        where: {
          userId_entityType_entityId: {
            userId,
            entityType: 'LAB',
            entityId: instance.labId,
          },
        },
        update: {
          status: 'COMPLETED',
          score,
          completedAt: new Date(),
        },
        create: {
          userId,
          entityType: 'LAB',
          entityId: instance.labId,
          status: 'COMPLETED',
          score,
          completedAt: new Date(),
        },
      });

      // Award XP
      await prisma.user.update({
        where: { id: userId },
        data: { xpPoints: { increment: lab.xpReward } },
      });

      this.emit('lab:completed', { instanceId, labId: instance.labId, userId, score });
    }

    return result;
  }

  /**
   * Execute a command inside a lab container
   * Returns simulated output (in production: Docker exec)
   */
  async executeCommand(instanceId: string, command: string): Promise<string> {
    const instance = activeInstances.get(instanceId);

    if (!instance || instance.status !== 'running') {
      throw new LabError('Lab is not running.', 'LAB_NOT_RUNNING');
    }

    // In production, this would use Docker's exec API
    // For now, we simulate a sandboxed terminal environment
    return this.simulateCommand(command, instance);
  }

  // ============================================
  // PRIVATE METHODS
  // ============================================

  /**
   * Provision a Docker container (simulated for Phase 2 scaffold)
   * In production: 
   *   1. Pull/verify image
   *   2. Create isolated Docker network
   *   3. Create container with resource limits
   *   4. Start container
   *   5. Wait for health check
   */
  private async provisionContainer(instance: LabInstanceInfo): Promise<void> {
    // Simulate provisioning delay
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log(`[LabOrchestrator] Container provisioned: ${instance.containerId}`);
    console.log(`  Image: ${instance.containerConfig.image}`);
    console.log(`  Memory: ${instance.containerConfig.memoryLimit}`);
    console.log(`  CPU: ${instance.containerConfig.cpuLimit} cores`);
    console.log(`  Network: ${instance.containerConfig.networkMode}`);
  }

  /**
   * Destroy a Docker container
   */
  private async destroyContainer(containerId?: string): Promise<void> {
    if (!containerId) return;
    // In production: docker.stop() + docker.remove()
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log(`[LabOrchestrator] Container destroyed: ${containerId}`);
  }

  /**
   * Set auto-expiration timer for a lab
   */
  private setExpirationTimer(instanceId: string, durationMinutes: number): void {
    const timer = setTimeout(async () => {
      try {
        const instance = activeInstances.get(instanceId);
        if (instance) {
          await this.expireLab(instanceId, instance.userId);
        }
      } catch (error) {
        console.error(`[LabOrchestrator] Expiration error for ${instanceId}:`, error);
      }
    }, durationMinutes * 60 * 1000);

    expirationTimers.set(instanceId, timer);
  }

  /**
   * Expire a lab (auto-stop due to time limit)
   */
  private async expireLab(instanceId: string, userId: string): Promise<void> {
    const instance = activeInstances.get(instanceId);

    if (instance) {
      await this.destroyContainer(instance.containerId);
    }

    activeInstances.delete(instanceId);
    expirationTimers.delete(instanceId);

    await prisma.labInstance.update({
      where: { id: instanceId },
      data: {
        status: 'EXPIRED',
        stoppedAt: new Date(),
      },
    });

    this.emit('lab:expired', { instanceId, userId });

    console.log(`[LabOrchestrator] Lab expired: ${instanceId}`);
  }

  /**
   * Run validation scripts for lab objectives
   * In production: execute scripts inside the container
   */
  private async runValidation(
    instance: LabInstanceInfo,
    objectives: any[]
  ): Promise<{ objectiveId: string; title: string; passed: boolean; message?: string }[]> {
    // Simulated validation - in production this runs inside the container
    return objectives.map((obj, idx) => ({
      objectiveId: obj.id || `obj-${idx}`,
      title: obj.title || `Objective ${idx + 1}`,
      passed: false, // Default to not passed; real validation would check
      message: 'Validation pending - complete the objective and re-validate.',
    }));
  }

  /**
   * Simulate command execution (for demo/development)
   * In production this calls Docker exec API
   */
  private simulateCommand(command: string, instance: LabInstanceInfo): string {
    const cmd = command.trim();
    const hostname = instance.containerConfig.hostname || 'lab';

    // Simulated filesystem and commands for demo
    const responses: Record<string, string> = {
      'whoami': 'student',
      'hostname': hostname,
      'id': 'uid=1000(student) gid=1000(student) groups=1000(student)',
      'pwd': '/home/student',
      'date': new Date().toUTCString(),
      'uname -a': 'Linux lab 5.15.0-generic #1 SMP x86_64 GNU/Linux',
      'cat /etc/os-release': 'PRETTY_NAME="Ubuntu 22.04.3 LTS"\nNAME="Ubuntu"\nVERSION="22.04.3 LTS (Jammy Jellyfish)"',
      'ls': 'Desktop  Documents  Downloads  lab-files  .bashrc  .profile',
      'ls -la': 'total 28\ndrwxr-xr-x 6 student student 4096 Jan 15 10:00 .\ndrwxr-xr-x 3 root    root    4096 Jan 15 09:00 ..\n-rw-r--r-- 1 student student  220 Jan 15 09:00 .bashrc\n-rw-r--r-- 1 student student  807 Jan 15 09:00 .profile\ndrwxr-xr-x 2 student student 4096 Jan 15 10:00 Desktop\ndrwxr-xr-x 2 student student 4096 Jan 15 10:00 Documents\ndrwxr-xr-x 2 student student 4096 Jan 15 10:00 lab-files',
      'ls /etc': 'apt  bash.bashrc  cron.d  group  hostname  hosts  issue  motd\nnetwork  os-release  passwd  profile  resolv.conf  shadow  ssh  sudoers',
      'cat /etc/passwd': 'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nstudent:x:1000:1000:Lab Student:/home/student:/bin/bash\nsyslog:x:104:108::/home/syslog:/usr/sbin/nologin\nh4cker_user:x:1001:1001::/home/h4cker_user:/bin/bash',
      'cat /etc/hosts': '127.0.0.1\tlocalhost\n127.0.0.1\tlab\n192.168.1.100\ttarget-server\n192.168.1.200\tdb-server',
      'ip addr show': '1: lo: <LOOPBACK,UP> mtu 65536\n    inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,MULTICAST,UP> mtu 1500\n    inet 192.168.1.10/24 brd 192.168.1.255 scope global eth0',
      'ifconfig': 'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 192.168.1.10  netmask 255.255.255.0  broadcast 192.168.1.255',
      'netstat -tlnp': 'Proto Recv-Q Send-Q Local Address   Foreign Address  State   PID/Program\ntcp        0      0 0.0.0.0:22      0.0.0.0:*        LISTEN  1/sshd\ntcp        0      0 0.0.0.0:80      0.0.0.0:*        LISTEN  45/nginx\ntcp        0      0 0.0.0.0:3306    0.0.0.0:*        LISTEN  67/mysqld',
      'ps aux': 'USER       PID %CPU %MEM    VSZ   RSS TTY  STAT START   TIME COMMAND\nroot         1  0.0  0.1  2384  1508 ?    Ss   10:00   0:00 /sbin/init\nroot        12  0.0  0.1  7236  3156 ?    Ss   10:00   0:00 /usr/sbin/sshd\nroot        45  0.0  0.2  8544  4232 ?    Ss   10:00   0:00 nginx: master process\nstudent    100  0.0  0.1  4628  3456 pts/0 Ss   10:01   0:00 /bin/bash\nmysql       67  0.5  2.1 124680 43264 ?   Ssl  10:00   0:02 /usr/sbin/mysqld',
      'history': '1  ls\n2  whoami\n3  cat /etc/passwd\n4  ip addr show',
      'help': 'Available commands: ls, cd, cat, pwd, whoami, id, hostname, uname, date, ps, netstat, ip, ifconfig, history, clear, echo, grep, find, chmod, chown, sudo, man',
      'clear': '',
    };

    // Check for direct match
    if (responses[cmd] !== undefined) {
      return responses[cmd];
    }

    // Handle partial matches
    if (cmd.startsWith('echo ')) {
      return cmd.substring(5).replace(/"/g, '').replace(/'/g, '');
    }

    if (cmd.startsWith('cat ')) {
      const file = cmd.substring(4).trim();
      if (file === '/var/log/auth.log') {
        return 'Jan 15 10:01:23 lab sshd[2001]: Failed password for root from 192.168.1.50 port 4321 ssh2\nJan 15 10:01:25 lab sshd[2001]: Failed password for root from 192.168.1.50 port 4321 ssh2\nJan 15 10:01:27 lab sshd[2001]: Failed password for root from 192.168.1.50 port 4321 ssh2\nJan 15 10:02:00 lab sshd[2003]: Accepted password for h4cker_user from 192.168.1.50 port 4322 ssh2\nJan 15 10:03:12 lab sudo: h4cker_user : command not allowed ; TTY=pts/1 ; PWD=/home/h4cker_user ; USER=root ; COMMAND=/bin/bash';
      }
      if (file === '/home/student/lab-files/readme.txt') {
        return 'Welcome to the CyberSec Academy Lab!\n\nYour objectives:\n1. Find the suspicious user on this system\n2. Check the authentication logs for failed logins\n3. Identify the attacker IP address\n4. Document your findings\n\nGood luck!';
      }
      return `cat: ${file}: No such file or directory`;
    }

    if (cmd.startsWith('find ')) {
      if (cmd.includes('/home') || cmd.includes('-name')) {
        return '/home/student/.bashrc\n/home/student/.profile\n/home/student/lab-files/readme.txt\n/home/h4cker_user/.bash_history\n/home/h4cker_user/.hidden_flag.txt';
      }
    }

    if (cmd.startsWith('grep ')) {
      if (cmd.includes('Failed') && cmd.includes('auth.log')) {
        return 'Jan 15 10:01:23 lab sshd[2001]: Failed password for root from 192.168.1.50 port 4321 ssh2\nJan 15 10:01:25 lab sshd[2001]: Failed password for root from 192.168.1.50 port 4321 ssh2\nJan 15 10:01:27 lab sshd[2001]: Failed password for root from 192.168.1.50 port 4321 ssh2';
      }
      if (cmd.includes('h4cker')) {
        return 'h4cker_user:x:1001:1001::/home/h4cker_user:/bin/bash';
      }
    }

    if (cmd.startsWith('cd ')) {
      return ''; // cd doesn't produce output
    }

    if (cmd === 'sudo -l' || cmd === 'sudo su') {
      return '[sudo] password for student: \nstudent is not in the sudoers file. This incident will be reported.';
    }

    if (cmd.startsWith('man ')) {
      return `No manual entry for ${cmd.substring(4)} in this lab environment.\nTry: ${cmd.substring(4)} --help`;
    }

    if (cmd.startsWith('chmod ') || cmd.startsWith('chown ')) {
      return ''; // Success (no output)
    }

    if (cmd.startsWith('ping ')) {
      return `PING ${cmd.substring(5)} (192.168.1.1): 56 data bytes\n64 bytes from 192.168.1.1: icmp_seq=0 ttl=64 time=0.5 ms\n64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.4 ms\n--- ${cmd.substring(5)} ping statistics ---\n2 packets transmitted, 2 received, 0% packet loss`;
    }

    // Default: command not found
    return `bash: ${cmd.split(' ')[0]}: command not found`;
  }

  /**
   * Periodic cleanup of expired/orphaned containers
   */
  private startCleanupInterval(): void {
    setInterval(async () => {
      const now = new Date();
      for (const [instanceId, instance] of activeInstances) {
        if (instance.expiresAt <= now && instance.status === 'running') {
          try {
            await this.expireLab(instanceId, instance.userId);
          } catch (error) {
            console.error(`[LabOrchestrator] Cleanup error for ${instanceId}:`, error);
          }
        }
      }
    }, 60 * 1000); // Check every minute
  }

  /**
   * Get lab statistics
   */
  getStats(): { activeInstances: number; totalMemory: string } {
    return {
      activeInstances: activeInstances.size,
      totalMemory: `${activeInstances.size * 512}MB allocated`,
    };
  }
}

// Custom error class for lab operations
export class LabError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
    this.name = 'LabError';
  }
}

// Export singleton instance
export const labOrchestrator = LabOrchestrator.getInstance();
export default labOrchestrator;
