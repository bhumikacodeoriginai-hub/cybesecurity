import { createServer } from 'http';
import app from './app';
import { config } from './config';
import { TerminalManager } from './services/terminal-manager';

const start = async () => {
  try {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  CyberSec Academy - API Server');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  Environment: ${config.nodeEnv}`);
    console.log(`  Port: ${config.port}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Create HTTP server (needed for WebSocket)
    const server = createServer(app);

    // Initialize WebSocket Terminal Manager
    const terminalManager = new TerminalManager(server);

    server.listen(config.port, () => {
      console.log(`\n  ✓ Server running at http://localhost:${config.port}`);
      console.log(`  ✓ API available at http://localhost:${config.port}/api`);
      console.log(`  ✓ WebSocket at ws://localhost:${config.port}/ws`);
      console.log(`  ✓ Health check at http://localhost:${config.port}/api/health\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();
