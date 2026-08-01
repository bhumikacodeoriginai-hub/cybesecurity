'use client';

import { useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Terminal from '@/components/lab/Terminal';
import LabObjectives from '@/components/lab/LabObjectives';
import LabTimer from '@/components/lab/LabTimer';
import { getLabBySlug } from '@/lib/curriculum';

type ActivePanel = 'instructions' | 'terminal' | 'objectives';

export default function LabWorkspacePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const labData = getLabBySlug(slug);

  const [labStarted, setLabStarted] = useState(false);
  const [labStatus, setLabStatus] = useState<'idle' | 'starting' | 'running' | 'stopped'>('idle');
  const [instanceId, setInstanceId] = useState<string | null>(null);
  const [objectives, setObjectives] = useState<{ id: string; title: string; description: string; completed: boolean }[]>([]);
  const [validating, setValidating] = useState(false);
  const [activePanel, setActivePanel] = useState<ActivePanel>('instructions');

  if (!labData) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <div className="text-6xl mb-4">🧪</div>
        <h1 className="text-2xl font-bold text-dark-300">Lab not found</h1>
        <Link href="/labs" className="text-cyber-400 mt-4 inline-block hover:underline">← Back to Labs</Link>
      </div>
    );
  }

  const { lab, module: mod } = labData;
  const expiresAt = new Date(Date.now() + lab.duration * 60 * 1000);


  const handleStartLab = async () => {
    setLabStatus('starting');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setInstanceId('inst-' + lab.slug);
    setObjectives(lab.objectives.map((obj, i) => ({
      id: `obj-${i}`, title: obj, description: '', completed: false,
    })));
    setLabStarted(true);
    setLabStatus('running');
  };

  const handleStopLab = () => {
    setLabStarted(false);
    setLabStatus('stopped');
    setInstanceId(null);
  };

  const handleValidate = useCallback(async () => {
    setValidating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setObjectives(prev => prev.map((obj, idx) => ({
      ...obj, completed: idx < 2,
    })));
    setValidating(false);
  }, []);

  // Pre-start screen
  if (!labStarted) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <nav className="flex items-center gap-2 text-sm text-dark-400">
          <Link href="/labs" className="hover:text-white transition-colors">Labs</Link>
          <span className="text-dark-600">/</span>
          <span className="text-white">{lab.title}</span>
        </nav>

        <div className="card border-purple-500/20">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{mod.icon}</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-dark-500">Module {mod.number} Lab</p>
              <span className={`badge-${lab.difficulty.toLowerCase()}`}>{lab.difficulty}</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">{lab.title}</h1>
          <p className="text-dark-300">{lab.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {lab.tools.map(tool => (
              <span key={tool} className="px-2.5 py-1 bg-dark-700 border border-dark-600 rounded text-xs font-mono text-dark-300">{tool}</span>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-3 flex items-center gap-2"><span>🎯</span> Objectives</h3>
          <div className="space-y-2">
            {lab.objectives.map((obj, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm">
                <span className="w-6 h-6 bg-dark-700 rounded-full flex items-center justify-center text-xs text-dark-400 flex-shrink-0 mt-0.5">{idx + 1}</span>
                <span className="text-dark-300">{obj}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-3 flex items-center gap-2"><span>🔌</span> Environment</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-dark-500 text-xs">Duration</p><p className="text-dark-200">{lab.duration} minutes</p></div>
            <div><p className="text-dark-500 text-xs">Network</p><p className="text-dark-200">Isolated (no internet)</p></div>
            <div><p className="text-dark-500 text-xs">Module</p><p className="text-dark-200">{mod.title}</p></div>
            <div><p className="text-dark-500 text-xs">Difficulty</p><p className="text-dark-200">{lab.difficulty}</p></div>
          </div>
        </div>


        <button
          onClick={handleStartLab}
          disabled={labStatus === 'starting'}
          className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {labStatus === 'starting' ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Provisioning Lab...
            </>
          ) : (
            <>▶ Start Lab</>
          )}
        </button>
      </div>
    );
  }

  // Active Lab Workspace
  return (
    <div className="fixed inset-0 bg-dark-950 flex flex-col z-50">
      {/* Top Bar */}
      <div className="h-12 bg-dark-900 border-b border-dark-700/50 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-white">{lab.title}</span>
          <span className={`badge-${lab.difficulty.toLowerCase()} text-[10px]`}>{lab.difficulty}</span>
        </div>
        <div className="flex items-center gap-3">
          <LabTimer expiresAt={expiresAt} onExpired={handleStopLab} />
          <button onClick={handleStopLab} className="px-3 py-1.5 text-xs text-red-400 bg-red-500/10 rounded border border-red-500/20 hover:bg-red-500/20 transition-colors">
            ■ Stop
          </button>
        </div>
      </div>

      {/* Mobile tabs */}
      <div className="lg:hidden flex border-b border-dark-700/50">
        {(['instructions', 'terminal', 'objectives'] as ActivePanel[]).map((panel) => (
          <button key={panel} onClick={() => setActivePanel(panel)}
            className={`flex-1 px-4 py-2 text-xs font-medium capitalize transition-colors ${activePanel === panel ? 'text-cyber-400 border-b-2 border-cyber-400 bg-cyber-400/5' : 'text-dark-400'}`}>
            {panel}
          </button>
        ))}
      </div>

      {/* Three Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left - Instructions */}
        <div className={`w-80 border-r border-dark-700/50 bg-dark-900 flex-shrink-0 overflow-y-auto p-4 ${activePanel !== 'instructions' ? 'hidden lg:block' : 'block'}`}>
          <h3 className="font-semibold text-sm mb-3">📋 Instructions</h3>
          <p className="text-sm text-dark-400 mb-4">{lab.description}</p>
          <h4 className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-2">Objectives</h4>
          <div className="space-y-2">
            {lab.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-dark-300">
                <span className="w-4 h-4 rounded-full border border-dark-600 flex items-center justify-center text-[8px] flex-shrink-0 mt-0.5">{i+1}</span>
                <span>{obj}</span>
              </div>
            ))}
          </div>
          <h4 className="text-xs font-semibold text-dark-500 uppercase tracking-wider mt-6 mb-2">Tools Available</h4>
          <div className="flex flex-wrap gap-1.5">
            {lab.tools.map(t => <span key={t} className="px-2 py-0.5 bg-dark-700 rounded text-[10px] font-mono text-dark-300">{t}</span>)}
          </div>
        </div>

        {/* Center - Terminal */}
        <div className={`flex-1 flex flex-col min-w-0 ${activePanel !== 'terminal' ? 'hidden lg:flex' : 'flex'}`}>
          <Terminal instanceId={instanceId || ''} onConnectionChange={() => {}} className="flex-1 rounded-none border-0" />
        </div>

        {/* Right - Objectives */}
        <div className={`w-72 border-l border-dark-700/50 bg-dark-900 flex-shrink-0 overflow-y-auto ${activePanel !== 'objectives' ? 'hidden lg:block' : 'block'}`}>
          <LabObjectives objectives={objectives} onValidate={handleValidate} validating={validating} />
        </div>
      </div>
    </div>
  );
}
