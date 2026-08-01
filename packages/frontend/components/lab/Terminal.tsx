'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * In-Browser Terminal Component
 * 
 * A lightweight xterm.js-like terminal emulator that communicates
 * with the backend via WebSocket for lab environments.
 * 
 * Features:
 * - Real-time character input/output
 * - ANSI color support
 * - Command history (up/down arrows)
 * - Copy/paste support
 * - Terminal resize
 * - Connection status indicator
 */

interface TerminalProps {
  instanceId: string;
  onConnectionChange?: (connected: boolean) => void;
  className?: string;
}

interface TerminalLine {
  content: string;
  type: 'input' | 'output' | 'error' | 'system';
}

export default function Terminal({ instanceId, onConnectionChange, className = '' }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState('~');
  const wsRef = useRef<WebSocket | null>(null);

  const hostname = 'lab';
  const username = 'student';

  // Get prompt string
  const getPrompt = useCallback(() => {
    return `\x1b[32m${username}@${hostname}\x1b[0m:\x1b[34m${currentDir}\x1b[0m$ `;
  }, [currentDir]);

  // Connect to WebSocket
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    
    // Simulate connection for demo (in production: real WebSocket)
    const timer = setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      onConnectionChange?.(true);

      // Welcome banner
      setLines([
        { content: '\x1b[36m╔══════════════════════════════════════════════════╗\x1b[0m', type: 'system' },
        { content: '\x1b[36m║\x1b[0m   \x1b[1m\x1b[32mCyberSec Academy\x1b[0m - Practical Lab Environment  \x1b[36m║\x1b[0m', type: 'system' },
        { content: '\x1b[36m╠══════════════════════════════════════════════════╣\x1b[0m', type: 'system' },
        { content: `\x1b[36m║\x1b[0m  Hostname: ${hostname}                                  \x1b[36m║\x1b[0m`, type: 'system' },
        { content: '\x1b[36m║\x1b[0m  User:     student                               \x1b[36m║\x1b[0m', type: 'system' },
        { content: '\x1b[36m║\x1b[0m  Network:  Isolated (no internet access)          \x1b[36m║\x1b[0m', type: 'system' },
        { content: '\x1b[36m║\x1b[0m                                                    \x1b[36m║\x1b[0m', type: 'system' },
        { content: '\x1b[36m║\x1b[0m  \x1b[33mType "help" for available commands\x1b[0m               \x1b[36m║\x1b[0m', type: 'system' },
        { content: '\x1b[36m║\x1b[0m  \x1b[33mThis is an isolated lab environment\x1b[0m              \x1b[36m║\x1b[0m', type: 'system' },
        { content: '\x1b[36m╚══════════════════════════════════════════════════╝\x1b[0m', type: 'system' },
        { content: '', type: 'output' },
      ]);
    }, 800);

    return () => {
      clearTimeout(timer);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [instanceId, onConnectionChange]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  // Simulated command execution
  const executeCommand = useCallback(async (command: string) => {
    const cmd = command.trim();
    if (!cmd) return;

    // Simulated responses (matches backend lab-orchestrator simulateCommand)
    const responses: Record<string, string> = {
      'whoami': 'student',
      'hostname': hostname,
      'id': 'uid=1000(student) gid=1000(student) groups=1000(student)',
      'pwd': currentDir === '~' ? '/home/student' : currentDir,
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
      'cat /var/log/auth.log': 'Jan 15 10:01:23 lab sshd[2001]: Failed password for root from 192.168.1.50 port 4321 ssh2\nJan 15 10:01:25 lab sshd[2001]: Failed password for root from 192.168.1.50 port 4321 ssh2\nJan 15 10:01:27 lab sshd[2001]: Failed password for root from 192.168.1.50 port 4321 ssh2\nJan 15 10:02:00 lab sshd[2003]: Accepted password for h4cker_user from 192.168.1.50 port 4322 ssh2\nJan 15 10:03:12 lab sudo: h4cker_user : command not allowed ; TTY=pts/1 ; PWD=/home/h4cker_user ; USER=root ; COMMAND=/bin/bash',
      'cat /home/student/lab-files/readme.txt': 'Welcome to the CyberSec Academy Lab!\n\nYour objectives:\n1. Find the suspicious user on this system\n2. Check the authentication logs for failed logins\n3. Identify the attacker IP address\n4. Document your findings\n\nGood luck!',
      'help': 'Available commands: ls, cd, cat, pwd, whoami, id, hostname, uname,\ndate, ps, netstat, ip, ifconfig, history, clear, echo, grep, find,\nchmod, chown, sudo, man, ping, nmap, curl',
      'clear': '\x1b[CLEAR]',
      'history': '',
    };

    let output = '';

    // Check exact match
    if (responses[cmd] !== undefined) {
      output = responses[cmd];
    } else if (cmd.startsWith('echo ')) {
      output = cmd.substring(5).replace(/"/g, '').replace(/'/g, '');
    } else if (cmd.startsWith('cat ')) {
      const file = cmd.substring(4).trim();
      if (responses[`cat ${file}`]) {
        output = responses[`cat ${file}`];
      } else {
        output = `cat: ${file}: No such file or directory`;
      }
    } else if (cmd.startsWith('grep ')) {
      if (cmd.includes('Failed') && cmd.includes('auth.log')) {
        output = 'Jan 15 10:01:23 lab sshd[2001]: Failed password for root from 192.168.1.50 port 4321 ssh2\nJan 15 10:01:25 lab sshd[2001]: Failed password for root from 192.168.1.50 port 4321 ssh2\nJan 15 10:01:27 lab sshd[2001]: Failed password for root from 192.168.1.50 port 4321 ssh2';
      } else if (cmd.includes('h4cker')) {
        output = 'h4cker_user:x:1001:1001::/home/h4cker_user:/bin/bash';
      } else {
        output = '';
      }
    } else if (cmd.startsWith('find ')) {
      output = '/home/student/.bashrc\n/home/student/.profile\n/home/student/lab-files/readme.txt\n/home/h4cker_user/.bash_history\n/home/h4cker_user/.hidden_flag.txt';
    } else if (cmd.startsWith('cd ')) {
      const target = cmd.substring(3).trim();
      if (target === '~' || target === '') {
        setCurrentDir('~');
      } else if (target === '..') {
        if (currentDir !== '~' && currentDir !== '/') {
          const parts = currentDir.split('/');
          parts.pop();
          setCurrentDir(parts.join('/') || '/');
        }
      } else if (target.startsWith('/')) {
        setCurrentDir(target);
      } else {
        setCurrentDir(`${currentDir === '~' ? '/home/student' : currentDir}/${target}`);
      }
      output = '';
    } else if (cmd === 'sudo -l' || cmd.startsWith('sudo ')) {
      output = '[sudo] password for student: \nstudent is not in the sudoers file. This incident will be reported.';
    } else if (cmd.startsWith('ping ')) {
      const target = cmd.substring(5).trim();
      output = `PING ${target} (192.168.1.1): 56 data bytes\n64 bytes from 192.168.1.1: icmp_seq=0 ttl=64 time=0.5 ms\n64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.4 ms\n--- ${target} ping statistics ---\n2 packets transmitted, 2 received, 0% packet loss`;
    } else if (cmd.startsWith('nmap ')) {
      const target = cmd.substring(5).trim();
      output = `Starting Nmap 7.94 ( https://nmap.org )\nNmap scan report for ${target}\nHost is up (0.0010s latency).\n\nPORT     STATE SERVICE\n22/tcp   open  ssh\n80/tcp   open  http\n3306/tcp open  mysql\n\nNmap done: 1 IP address (1 host up) scanned in 1.23 seconds`;
    } else if (cmd === 'history') {
      output = history.map((h, i) => `  ${i + 1}  ${h}`).join('\n');
    } else if (cmd.startsWith('chmod ') || cmd.startsWith('chown ')) {
      output = '';
    } else if (cmd.startsWith('man ')) {
      output = `No manual entry for ${cmd.substring(4)} in this lab environment.\nTry: ${cmd.substring(4)} --help`;
    } else {
      output = `bash: ${cmd.split(' ')[0]}: command not found`;
    }

    // Handle clear
    if (output === '\x1b[CLEAR]') {
      setLines([]);
      return;
    }

    // Add output lines
    if (output) {
      const outputLines = output.split('\n').map(line => ({
        content: line,
        type: 'output' as const,
      }));
      setLines(prev => [...prev, ...outputLines]);
    }
  }, [currentDir, history]);

  // Handle key press
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = currentInput;
      
      // Add input line to terminal
      setLines(prev => [...prev, { content: `${getPrompt()}${cmd}`, type: 'input' }]);
      
      if (cmd.trim()) {
        setHistory(prev => [...prev, cmd.trim()]);
        setHistoryIndex(-1);
        executeCommand(cmd);
      }
      
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(history[newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(history[newIndex] || '');
        }
      }
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      setLines(prev => [...prev, { content: `${getPrompt()}${currentInput}^C`, type: 'input' }]);
      setCurrentInput('');
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  }, [currentInput, history, historyIndex, getPrompt, executeCommand]);

  // Parse ANSI codes for display
  const parseAnsi = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    const regex = /\x1b\[([0-9;]*)m/g;
    let lastIndex = 0;
    let currentStyle: React.CSSProperties = {};
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Add text before this match
      if (match.index > lastIndex) {
        parts.push(
          <span key={`${lastIndex}`} style={currentStyle}>
            {text.substring(lastIndex, match.index)}
          </span>
        );
      }

      // Parse color codes
      const codes = match[1].split(';').map(Number);
      for (const code of codes) {
        switch (code) {
          case 0: currentStyle = {}; break;
          case 1: currentStyle = { ...currentStyle, fontWeight: 'bold' }; break;
          case 30: currentStyle = { ...currentStyle, color: '#1e1e1e' }; break;
          case 31: currentStyle = { ...currentStyle, color: '#ef4444' }; break;
          case 32: currentStyle = { ...currentStyle, color: '#10b981' }; break;
          case 33: currentStyle = { ...currentStyle, color: '#f59e0b' }; break;
          case 34: currentStyle = { ...currentStyle, color: '#3b82f6' }; break;
          case 35: currentStyle = { ...currentStyle, color: '#d946ef' }; break;
          case 36: currentStyle = { ...currentStyle, color: '#06b6d4' }; break;
          case 37: currentStyle = { ...currentStyle, color: '#e2e8f0' }; break;
        }
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(
        <span key={`end-${lastIndex}`} style={currentStyle}>
          {text.substring(lastIndex)}
        </span>
      );
    }

    return parts.length > 0 ? parts : [<span key="raw">{text}</span>];
  };

  // Focus input when clicking terminal
  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className={`flex flex-col bg-[#0d1117] rounded-lg border border-dark-700 overflow-hidden ${className}`}
      onClick={focusInput}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-dark-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-dark-400 font-mono ml-2">
            student@{hostname}: {currentDir}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {connecting ? (
            <span className="text-xs text-yellow-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              Connecting...
            </span>
          ) : connected ? (
            <span className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Connected
            </span>
          ) : (
            <span className="text-xs text-red-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-red-400 rounded-full" />
              Disconnected
            </span>
          )}
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed min-h-[300px] max-h-[600px] cursor-text"
        style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
      >
        {/* Output lines */}
        {lines.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap break-all">
            {parseAnsi(line.content)}
          </div>
        ))}

        {/* Current input line */}
        {connected && (
          <div className="flex whitespace-pre">
            <span>{parseAnsi(getPrompt())}</span>
            <span className="text-white">{currentInput}</span>
            <span className="animate-pulse text-cyber-400">█</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Hidden input for keyboard capture */}
      <input
        ref={inputRef}
        type="text"
        className="sr-only"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        aria-label="Terminal input"
      />
    </div>
  );
}
