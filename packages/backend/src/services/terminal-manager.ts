import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { JwtPayload } from '../types';
import labOrchestrator, { LabError } from './lab-orchestrator';

/**
 * Terminal Manager - WebSocket-based terminal proxy
 * 
 * Manages real-time communication between the browser-based terminal (xterm.js)
 * and the lab container's shell.
 * 
 * Architecture:
 *   Client (xterm.js) ←→ Socket.IO ←→ Terminal Manager ←→ Docker Exec
 * 
 * Protocol:
 *   Client → Server:
 *     - terminal:input  (keystroke data)
 *     - terminal:resize (cols, rows)
 *   
 *   Server → Client:
 *     - terminal:output (command output)
 *     - terminal:error  (error messages)
 *     - terminal:status (connection status)
 *     - lab:status      (lab lifecycle events)
 */

interface TerminalSession {
  userId: string;
  instanceId: string;
  socket: Socket;
  commandBuffer: string;
  currentDir: string;
  history: string[];
  historyIndex: number;
}

// Active terminal sessions
const sessions = new Map<string, TerminalSession>();

export class TerminalManager {
  private io: SocketIOServer;

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: config.cors.origin,
        methods: ['GET', 'POST'],
        credentials: true,
      },
      path: '/ws',
      transports: ['websocket', 'polling'],
    });

    this.setupMiddleware();
    this.setupHandlers();

    console.log('[TerminalManager] WebSocket server initialized');
  }

  /**
   * Authentication middleware for WebSocket connections
   */
  private setupMiddleware(): void {
    this.io.use((socket, next) => {
      const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(' ')[1];

      if (!token) {
        return next(new Error('Authentication required'));
      }

      try {
        const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
        (socket as any).user = decoded;
        next();
      } catch (error) {
        next(new Error('Invalid token'));
      }
    });
  }

  /**
   * Set up WebSocket event handlers
   */
  private setupHandlers(): void {
    this.io.on('connection', (socket: Socket) => {
      const user = (socket as any).user as JwtPayload;
      console.log(`[TerminalManager] Client connected: ${user.userId} (${socket.id})`);

      // Handle lab connection
      socket.on('lab:connect', async (data: { instanceId: string }) => {
        await this.handleLabConnect(socket, user, data.instanceId);
      });

      // Handle terminal input
      socket.on('terminal:input', async (data: { input: string }) => {
        await this.handleTerminalInput(socket, data.input);
      });

      // Handle terminal resize
      socket.on('terminal:resize', (data: { cols: number; rows: number }) => {
        this.handleTerminalResize(socket, data.cols, data.rows);
      });

      // Handle disconnect
      socket.on('disconnect', () => {
        this.handleDisconnect(socket);
      });

      // Handle lab actions via WebSocket
      socket.on('lab:stop', async () => {
        await this.handleLabStop(socket, user);
      });

      socket.on('lab:reset', async () => {
        await this.handleLabReset(socket, user);
      });

      socket.on('lab:validate', async () => {
        await this.handleLabValidate(socket, user);
      });
    });
  }

  /**
   * Connect to a lab instance terminal
   */
  private async handleLabConnect(socket: Socket, user: JwtPayload, instanceId: string): Promise<void> {
    try {
      // Verify lab access
      const labStatus = await labOrchestrator.getLabStatus(instanceId, user.userId);

      if (!labStatus) {
        socket.emit('terminal:error', { message: 'Lab instance not found.' });
        return;
      }

      if (labStatus.status !== 'running') {
        socket.emit('terminal:error', { message: `Lab is ${labStatus.status}. Cannot connect terminal.` });
        return;
      }

      // Create terminal session
      const session: TerminalSession = {
        userId: user.userId,
        instanceId,
        socket,
        commandBuffer: '',
        currentDir: '/home/student',
        history: [],
        historyIndex: -1,
      };

      sessions.set(socket.id, session);

      // Join room for this lab instance
      socket.join(`lab:${instanceId}`);

      // Send connection success
      socket.emit('terminal:status', { connected: true, instanceId });

      // Send welcome banner
      const banner = this.generateBanner(labStatus.containerConfig.hostname || 'lab');
      socket.emit('terminal:output', { data: banner });

      // Send initial prompt
      socket.emit('terminal:output', { data: `\r\n\x1b[32mstudent@${labStatus.containerConfig.hostname || 'lab'}\x1b[0m:\x1b[34m~\x1b[0m$ ` });

      console.log(`[TerminalManager] Terminal session started: ${instanceId} for user ${user.userId}`);
    } catch (error) {
      socket.emit('terminal:error', { message: 'Failed to connect to lab terminal.' });
    }
  }

  /**
   * Handle terminal input (keystrokes)
   */
  private async handleTerminalInput(socket: Socket, input: string): Promise<void> {
    const session = sessions.get(socket.id);
    if (!session) {
      socket.emit('terminal:error', { message: 'No active terminal session.' });
      return;
    }

    // Process character by character
    for (const char of input) {
      if (char === '\r' || char === '\n') {
        // Execute command
        const command = session.commandBuffer.trim();
        socket.emit('terminal:output', { data: '\r\n' });

        if (command) {
          session.history.push(command);
          session.historyIndex = session.history.length;

          // Execute the command
          try {
            const output = await labOrchestrator.executeCommand(session.instanceId, command);
            if (output) {
              // Format output with proper line endings
              const formattedOutput = output.split('\n').join('\r\n');
              socket.emit('terminal:output', { data: formattedOutput + '\r\n' });
            }
          } catch (error) {
            if (error instanceof LabError) {
              socket.emit('terminal:output', { data: `\x1b[31mError: ${error.message}\x1b[0m\r\n` });
            }
          }
        }

        // Send new prompt
        const hostname = 'lab';
        const dir = session.currentDir === '/home/student' ? '~' : session.currentDir;
        socket.emit('terminal:output', { data: `\x1b[32mstudent@${hostname}\x1b[0m:\x1b[34m${dir}\x1b[0m$ ` });
        session.commandBuffer = '';

        // Handle cd command for prompt update
        if (command.startsWith('cd ')) {
          const target = command.substring(3).trim();
          if (target === '~' || target === '') {
            session.currentDir = '/home/student';
          } else if (target === '..') {
            const parts = session.currentDir.split('/');
            parts.pop();
            session.currentDir = parts.join('/') || '/';
          } else if (target.startsWith('/')) {
            session.currentDir = target;
          } else {
            session.currentDir = `${session.currentDir}/${target}`;
          }
        }
      } else if (char === '\x7f' || char === '\b') {
        // Backspace
        if (session.commandBuffer.length > 0) {
          session.commandBuffer = session.commandBuffer.slice(0, -1);
          socket.emit('terminal:output', { data: '\b \b' });
        }
      } else if (char === '\x03') {
        // Ctrl+C
        socket.emit('terminal:output', { data: '^C\r\n' });
        session.commandBuffer = '';
        const dir = session.currentDir === '/home/student' ? '~' : session.currentDir;
        socket.emit('terminal:output', { data: `\x1b[32mstudent@lab\x1b[0m:\x1b[34m${dir}\x1b[0m$ ` });
      } else if (char === '\x1b') {
        // Escape sequences (arrow keys, etc.) - skip for now
        continue;
      } else {
        // Regular character
        session.commandBuffer += char;
        socket.emit('terminal:output', { data: char });
      }
    }
  }

  /**
   * Handle terminal resize
   */
  private handleTerminalResize(socket: Socket, cols: number, rows: number): void {
    const session = sessions.get(socket.id);
    if (!session) return;

    // In production: resize the Docker exec TTY
    console.log(`[TerminalManager] Resize: ${cols}x${rows} for session ${socket.id}`);
  }

  /**
   * Handle client disconnect
   */
  private handleDisconnect(socket: Socket): void {
    const session = sessions.get(socket.id);
    if (session) {
      console.log(`[TerminalManager] Session ended: ${session.instanceId}`);
      sessions.delete(socket.id);
    }
  }

  /**
   * Handle lab stop via WebSocket
   */
  private async handleLabStop(socket: Socket, user: JwtPayload): Promise<void> {
    const session = sessions.get(socket.id);
    if (!session) return;

    try {
      await labOrchestrator.stopLab(session.instanceId, user.userId);
      socket.emit('lab:status', { status: 'stopped', instanceId: session.instanceId });
      socket.emit('terminal:output', { data: '\r\n\x1b[33m[Lab Stopped] Your lab environment has been stopped.\x1b[0m\r\n' });
      sessions.delete(socket.id);
    } catch (error) {
      socket.emit('terminal:error', { message: 'Failed to stop lab.' });
    }
  }

  /**
   * Handle lab reset via WebSocket
   */
  private async handleLabReset(socket: Socket, user: JwtPayload): Promise<void> {
    const session = sessions.get(socket.id);
    if (!session) return;

    try {
      socket.emit('terminal:output', { data: '\r\n\x1b[33m[Resetting Lab] Please wait...\x1b[0m\r\n' });
      await labOrchestrator.resetLab(session.instanceId, user.userId);
      socket.emit('lab:status', { status: 'running', instanceId: session.instanceId });

      // Re-send banner
      socket.emit('terminal:output', { data: '\x1b[2J\x1b[H' }); // Clear screen
      socket.emit('terminal:output', { data: this.generateBanner('lab') });
      socket.emit('terminal:output', { data: '\r\n\x1b[32mstudent@lab\x1b[0m:\x1b[34m~\x1b[0m$ ' });

      session.commandBuffer = '';
      session.currentDir = '/home/student';
      session.history = [];
    } catch (error) {
      socket.emit('terminal:error', { message: 'Failed to reset lab.' });
    }
  }

  /**
   * Handle lab validation via WebSocket
   */
  private async handleLabValidate(socket: Socket, user: JwtPayload): Promise<void> {
    const session = sessions.get(socket.id);
    if (!session) return;

    try {
      const result = await labOrchestrator.validateLab(session.instanceId, user.userId);
      socket.emit('lab:validation', result);

      if (result.passed) {
        socket.emit('terminal:output', {
          data: '\r\n\x1b[32m✓ All objectives completed! Lab passed.\x1b[0m\r\n',
        });
      } else {
        socket.emit('terminal:output', {
          data: `\r\n\x1b[33m◐ ${result.completedObjectives}/${result.totalObjectives} objectives completed.\x1b[0m\r\n`,
        });
      }
    } catch (error) {
      socket.emit('terminal:error', { message: 'Validation failed.' });
    }
  }

  /**
   * Generate welcome banner
   */
  private generateBanner(hostname: string): string {
    return [
      '\x1b[36m╔══════════════════════════════════════════════════╗\x1b[0m',
      '\x1b[36m║\x1b[0m   \x1b[1m\x1b[32mCyberSec Academy\x1b[0m - Practical Lab Environment  \x1b[36m║\x1b[0m',
      '\x1b[36m╠══════════════════════════════════════════════════╣\x1b[0m',
      `\x1b[36m║\x1b[0m  Hostname: ${hostname.padEnd(37)}\x1b[36m║\x1b[0m`,
      '\x1b[36m║\x1b[0m  User:     student                               \x1b[36m║\x1b[0m',
      '\x1b[36m║\x1b[0m  Network:  Isolated (no internet access)          \x1b[36m║\x1b[0m',
      '\x1b[36m║\x1b[0m                                                    \x1b[36m║\x1b[0m',
      '\x1b[36m║\x1b[0m  \x1b[33mType "help" for available commands\x1b[0m               \x1b[36m║\x1b[0m',
      '\x1b[36m║\x1b[0m  \x1b[33mThis is an isolated lab environment\x1b[0m              \x1b[36m║\x1b[0m',
      '\x1b[36m╚══════════════════════════════════════════════════╝\x1b[0m',
      '',
    ].join('\r\n');
  }

  /**
   * Broadcast to all sessions for a lab instance
   */
  broadcastToLab(instanceId: string, event: string, data: any): void {
    this.io.to(`lab:${instanceId}`).emit(event, data);
  }

  /**
   * Get active session count
   */
  getActiveSessionCount(): number {
    return sessions.size;
  }
}

export default TerminalManager;
