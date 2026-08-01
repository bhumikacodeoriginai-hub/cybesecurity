'use client';

import { useState, useCallback } from 'react';
import Terminal from '@/components/lab/Terminal';
import LabObjectives from '@/components/lab/LabObjectives';
import LabInstructions from '@/components/lab/LabInstructions';
import LabTimer from '@/components/lab/LabTimer';

// Demo lab data
const labData = {
  id: 'lab-001',
  title: 'Linux Intrusion Investigation',
  slug: 'linux-intrusion-investigation',
  difficulty: 'BEGINNER',
  durationMinutes: 60,
  description: 'Investigate a Linux system for signs of unauthorized access. Find the suspicious user and analyze the logs.',
  objectives: [
    { id: 'obj-1', title: 'Identify the suspicious user account', description: 'Check /etc/passwd for unusual users', completed: false },
    { id: 'obj-2', title: 'Find the attacker IP address', description: 'Analyze authentication logs', completed: false },
    { id: 'obj-3', title: 'Count the failed login attempts', description: 'Use grep to filter failed logins', completed: false },
    { id: 'obj-4', title: 'Find the hidden file', description: 'Check the suspicious user home directory', completed: false },
  ],
  instructions: [
    { id: 's1', title: 'Read the lab objectives', content: 'Start by reading the readme file in your lab-files directory to understand what happened.', type: 'text' as const },
    { id: 's2', title: 'Check system users', content: 'Look for suspicious user accounts', type: 'command' as const, command: 'cat /etc/passwd' },
    { id: 's3', title: 'Note the suspicious user', content: 'Look for usernames that seem unusual or malicious. Normal system users have nologin shells.', type: 'note' as const },
    { id: 's4', title: 'Check authentication logs', content: 'View the authentication logs for suspicious activity', type: 'command' as const, command: 'cat /var/log/auth.log' },
    { id: 's5', title: 'Filter failed logins', content: 'Use grep to isolate failed login attempts', type: 'command' as const, command: 'grep "Failed" /var/log/auth.log' },
    { id: 's6', title: 'Identify the attacker', content: 'From the logs, identify the IP address that made the failed login attempts and then successfully logged in.', type: 'text' as const },
    { id: 's7', title: 'Search for hidden files', content: 'Check the suspicious user home directory for hidden files', type: 'command' as const, command: 'find /home -name ".*" -type f' },
    { id: 's8', title: 'Important', content: 'All activities in this lab are on an isolated environment. No real systems are affected.', type: 'warning' as const },
  ],
  hints: [
    'Check /etc/passwd for users with unusual names',
    'Look at the auth.log for both Failed and Accepted entries',
    'The attacker IP is the same for failed and successful logins',
    'Hidden files in Linux start with a dot (.)',
  ],
  networkDiagram: true,
  tools: ['Terminal', 'Bash', 'grep', 'find', 'cat'],
};

type ActivePanel = 'instructions' | 'terminal' | 'objectives';

export default function LabWorkspacePage() {
  const [labStarted, setLabStarted] = useState(false);
  const [labStatus, setLabStatus] = useState<'idle' | 'starting' | 'running' | 'stopped'>('idle');
  const [instanceId, setInstanceId] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [objectives, setObjectives] = useState(labData.objectives);
  const [validating, setValidating] = useState(false);
  const [activePanel, setActivePanel] = useState<ActivePanel>('instructions');
  
  // Calculate expiration (60 minutes from now)
  const expiresAt = new Date(Date.now() + labData.durationMinutes * 60 * 1000);

  const handleStartLab = async () => {
    setLabStatus('starting');
    // Simulate lab provisioning
    await new Promise(resolve => setTimeout(resolve, 1500));
    setInstanceId('inst-demo-001');
    setLabStarted(true);
    setLabStatus('running');
  };

  const handleStopLab = () => {
    setLabStarted(false);
    setLabStatus('stopped');
    setInstanceId(null);
  };

  const handleResetLab = async () => {
    setLabStatus('starting');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLabStatus('running');
    setObjectives(labData.objectives.map(o => ({ ...o, completed: false })));
  };

  const handleValidate = useCallback(async () => {
    setValidating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Simulate partial completion
    setObjectives(prev => prev.map((obj, idx) => ({
      ...obj,
      completed: idx < 2, // First 2 objectives "pass" for demo
    })));
    setValidating(false);
  }, []);

  const handleConnectionChange = (status: boolean) => {
    setConnected(status);
  };

  // Pre-start screen
  if (!labStarted) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Lab Header */}
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge-beginner">{labData.difficulty}</span>
            <span className="text-xs text-dark-400">{labData.durationMinutes} min</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">{labData.title}</h1>
          <p className="text-dark-300">{labData.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {labData.tools.map(tool => (
              <span key={tool} className="px-2 py-1 bg-dark-700 border border-dark-600 rounded text-xs font-mono text-dark-300">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Objectives Preview */}
        <div className="card">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span>🎯</span> Objectives
          </h3>
          <div className="space-y-2">
            {labData.objectives.map((obj, idx) => (
              <div key={obj.id} className="flex items-center gap-3 text-sm">
                <span className="w-5 h-5 bg-dark-700 rounded-full flex items-center justify-center text-xs text-dark-400">
                  {idx + 1}
                </span>
                <span className="text-dark-300">{obj.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Network Info */}
        <div className="card">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span>🔌</span> Lab Environment
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-dark-500 text-xs">Your Machine</p>
              <p className="text-dark-200 font-mono">192.168.1.10</p>
            </div>
            <div>
              <p className="text-dark-500 text-xs">Target Server</p>
              <p className="text-dark-200 font-mono">192.168.1.100</p>
            </div>
            <div>
              <p className="text-dark-500 text-xs">Network</p>
              <p className="text-dark-200">Isolated (no internet)</p>
            </div>
            <div>
              <p className="text-dark-500 text-xs">Time Limit</p>
              <p className="text-dark-200">{labData.durationMinutes} minutes</p>
            </div>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="card bg-green-500/5 border-green-500/20">
          <p className="text-sm text-green-400/90 flex items-start gap-2">
            <span className="mt-0.5">✓</span>
            <span>This lab runs in a completely isolated environment. All activities are confined to the lab container and cannot affect any external systems.</span>
          </p>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartLab}
          disabled={labStatus === 'starting'}
          className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {labStatus === 'starting' ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Provisioning Lab Environment...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Lab
            </>
          )}
        </button>
      </div>
    );
  }

  // Active Lab Workspace - Full screen with panels
  return (
    <div className="fixed inset-0 bg-dark-900 flex flex-col z-50">
      {/* Top Bar */}
      <div className="h-12 bg-dark-900 border-b border-dark-700/50 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white">{labData.title}</span>
          </div>
          <span className="badge-beginner text-xs">{labData.difficulty}</span>
        </div>

        <div className="flex items-center gap-4">
          <LabTimer expiresAt={expiresAt} onExpired={handleStopLab} />
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetLab}
              className="px-3 py-1.5 text-xs text-dark-300 hover:text-white bg-dark-800 hover:bg-dark-700 rounded border border-dark-700 transition-colors"
              title="Reset Lab"
            >
              ↺ Reset
            </button>
            <button
              onClick={handleStopLab}
              className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded border border-red-500/20 transition-colors"
              title="Stop Lab"
            >
              ■ Stop
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="lg:hidden flex border-b border-dark-700/50">
        {(['instructions', 'terminal', 'objectives'] as ActivePanel[]).map((panel) => (
          <button
            key={panel}
            onClick={() => setActivePanel(panel)}
            className={`flex-1 px-4 py-2 text-xs font-medium capitalize transition-colors ${
              activePanel === panel
                ? 'text-cyber-400 border-b-2 border-cyber-400 bg-cyber-400/5'
                : 'text-dark-400 hover:text-white'
            }`}
          >
            {panel === 'instructions' && '📋 '}
            {panel === 'terminal' && '💻 '}
            {panel === 'objectives' && '🎯 '}
            {panel}
          </button>
        ))}
      </div>

      {/* Main Content - Three Panel Layout (Desktop) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Instructions */}
        <div className={`w-80 border-r border-dark-700/50 bg-dark-900 flex-shrink-0 overflow-hidden ${
          activePanel !== 'instructions' ? 'hidden lg:flex lg:flex-col' : 'flex flex-col'
        }`}>
          <LabInstructions
            title="Instructions"
            description={labData.description}
            steps={labData.instructions}
            hints={labData.hints}
            networkDiagram={labData.networkDiagram}
          />
        </div>

        {/* Center Panel - Terminal */}
        <div className={`flex-1 flex flex-col min-w-0 ${
          activePanel !== 'terminal' ? 'hidden lg:flex' : 'flex'
        }`}>
          <Terminal
            instanceId={instanceId || ''}
            onConnectionChange={handleConnectionChange}
            className="flex-1 rounded-none border-0"
          />
        </div>

        {/* Right Panel - Objectives */}
        <div className={`w-72 border-l border-dark-700/50 bg-dark-900 flex-shrink-0 overflow-hidden ${
          activePanel !== 'objectives' ? 'hidden lg:flex lg:flex-col' : 'flex flex-col'
        }`}>
          <LabObjectives
            objectives={objectives}
            onValidate={handleValidate}
            validating={validating}
          />
        </div>
      </div>
    </div>
  );
}
