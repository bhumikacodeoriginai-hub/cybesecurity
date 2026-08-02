'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getLabBySlug } from '@/lib/labs';

export default function LabWorkspacePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const lab = getLabBySlug(slug);
  const [started, setStarted] = useState(false);
  const [history, setHistory] = useState<{type: 'cmd'|'out'|'err', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  if (!lab) {
    return (
      <div className="text-center py-20">
        <h1 className="text-xl font-bold text-dark-300">Lab not found</h1>
        <Link href="/labs" className="text-neon mt-4 inline-block text-sm">&larr; Back to Labs</Link>
      </div>
    );
  }

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory(prev => [...prev, { type: 'cmd', text: trimmed }]);

    // Match command against lab steps
    const matchedStep = lab.steps.find(s =>
      s.command.trim() === trimmed ||
      trimmed.startsWith(s.command.split(' ')[0])
    );

    // Exact match
    const exactMatch = lab.steps.find(s => s.command.trim() === trimmed);

    if (exactMatch) {
      setHistory(prev => [...prev, { type: 'out', text: exactMatch.expectedOutput }]);
      if (!completedSteps.includes(exactMatch.id)) {
        setCompletedSteps(prev => [...prev, exactMatch.id]);
      }
    } else if (trimmed === 'help' || trimmed === '--help') {
      const helpText = `Available commands for this lab:\n${lab.steps.map(s => `  ${s.command}`).join('\n')}\n\nType a command exactly as shown, or type "hint" for guidance.`;
      setHistory(prev => [...prev, { type: 'out', text: helpText }]);
    } else if (trimmed === 'hint') {
      const nextStep = lab.steps.find(s => !completedSteps.includes(s.id));
      if (nextStep) {
        const hintText = `HINT: Step ${nextStep.id} - ${nextStep.title}\n${nextStep.instruction}\n\nTry running:\n  ${nextStep.command}`;
        setHistory(prev => [...prev, { type: 'out', text: hintText }]);
      } else {
        setHistory(prev => [...prev, { type: 'out', text: 'All steps completed! Type "summary" to see results.' }]);
      }
    } else if (trimmed === 'summary') {
      const summaryText = `\nLAB SUMMARY: ${lab.title}\n${'='.repeat(50)}\n\nCompleted: ${completedSteps.length}/${lab.steps.length} steps\n\n${lab.summary.map(s => `[+] ${s}`).join('\n')}`;
      setHistory(prev => [...prev, { type: 'out', text: summaryText }]);
    } else if (trimmed === 'clear') {
      setHistory([]);
    } else if (trimmed === 'objectives') {
      const objText = `\nOBJECTIVES:\n${lab.objectives.map((o, i) => `  ${completedSteps.length > i ? '[x]' : '[ ]'} ${o}`).join('\n')}`;
      setHistory(prev => [...prev, { type: 'out', text: objText }]);
    } else if (matchedStep) {
      // Partial match - show suggestion
      const errText = `Command not found exactly. Did you mean:\n  ${matchedStep.command}\n\nType "help" to see all available commands.`;
      setHistory(prev => [...prev, { type: 'err', text: errText }]);
    } else {
      setHistory(prev => [...prev, { type: 'err', text: `bash: ${trimmed.split(' ')[0]}: command not recognized in this lab\nType "help" for available commands or "hint" for next step.` }]);
    }

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    }
  };

  if (!started) {
    return (
      <div className="max-w-3xl mx-auto space-y-5">
        <nav className="flex items-center gap-2 text-xs text-dark-400 font-mono">
          <Link href="/labs" className="hover:text-neon transition-colors">LABS</Link>
          <span>/</span>
          <span className="text-dark-200 truncate">{lab.title}</span>
        </nav>

        <div className="card p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className={`badge-${lab.difficulty.toLowerCase()}`}>{lab.difficulty}</span>
            <span className="text-[9px] font-mono text-dark-400">{lab.duration} MIN</span>
          </div>
          <h1 className="text-xl font-bold mb-2">{lab.title}</h1>
          <p className="text-sm text-dark-200 leading-relaxed">{lab.description}</p>
        </div>

        <div className="card p-5">
          <h3 className="text-[9px] font-mono font-bold text-neon/80 tracking-wider mb-3">SCENARIO</h3>
          <p className="text-sm text-dark-200 leading-relaxed">{lab.scenario}</p>
        </div>

        <div className="card p-5">
          <h3 className="text-[9px] font-mono font-bold text-neon/80 tracking-wider mb-3">OBJECTIVES</h3>
          <div className="space-y-2">
            {lab.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="font-mono text-[10px] text-dark-400 w-5 flex-shrink-0">{i+1}.</span>
                <span className="text-dark-200">{obj}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-[9px] font-mono font-bold text-dark-400 tracking-wider mb-3">HOW TO USE</h3>
          <div className="space-y-1.5 text-xs text-dark-200">
            <p>1. Type commands in the terminal and press Enter</p>
            <p>2. Type <span className="font-mono text-neon">help</span> to see available commands</p>
            <p>3. Type <span className="font-mono text-neon">hint</span> to get guidance on next step</p>
            <p>4. Type <span className="font-mono text-neon">objectives</span> to check progress</p>
            <p>5. Type <span className="font-mono text-neon">clear</span> to clear terminal</p>
          </div>
        </div>

        <button onClick={() => setStarted(true)} className="btn-primary w-full py-3.5 text-sm">
          LAUNCH TERMINAL
        </button>
      </div>
    );
  }

  // Active Lab - Interactive Terminal
  return (
    <div className="h-[calc(100vh-7rem)] lg:h-[calc(100vh-2rem)] flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-neon animate-glow-pulse" />
          <span className="text-xs font-mono text-dark-200 truncate">{lab.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono text-neon">{completedSteps.length}/{lab.steps.length} STEPS</span>
          <button onClick={() => setStarted(false)} className="text-[9px] font-mono text-dark-400 hover:text-red-400 transition-colors px-2 py-1 border border-dark-600 rounded">EXIT</button>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-bar flex-shrink-0">
        <div className="progress-bar-fill" style={{ width: `${(completedSteps.length / lab.steps.length) * 100}%` }} />
      </div>

      {/* Terminal + Instructions Split */}
      <div className="flex-1 flex flex-col lg:flex-row gap-3 min-h-0">
        {/* Instructions Panel */}
        <div className="lg:w-80 flex-shrink-0 overflow-y-auto rounded-lg border border-neon/5 bg-dark-900 p-4">
          <h3 className="text-[9px] font-mono font-bold text-neon/80 tracking-wider mb-3">STEPS</h3>
          <div className="space-y-3">
            {lab.steps.map((step) => (
              <div key={step.id} className={`p-3 rounded-md border transition-all ${completedSteps.includes(step.id) ? 'border-neon/20 bg-neon/5' : 'border-dark-600 bg-dark-800'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] font-mono ${completedSteps.includes(step.id) ? 'text-neon' : 'text-dark-400'}`}>
                    {completedSteps.includes(step.id) ? '✓' : String(step.id).padStart(2, '0')}
                  </span>
                  <span className={`text-xs font-medium ${completedSteps.includes(step.id) ? 'text-neon/80' : 'text-dark-200'}`}>{step.title}</span>
                </div>
                <p className="text-[10px] text-dark-400 mt-1">{step.instruction}</p>
                <code className="text-[10px] font-mono text-neon/60 mt-1.5 block">$ {step.command}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal */}
        <div className="flex-1 flex flex-col min-h-0 rounded-lg border border-neon/10 bg-dark-950 overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-2 bg-dark-900 border-b border-neon/5 flex-shrink-0">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <span className="text-[9px] font-mono text-dark-400 ml-2">analyst@cybersec-lab:~</span>
          </div>

          {/* Terminal Body */}
          <div ref={terminalRef} className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1" onClick={() => inputRef.current?.focus()}>
            {/* Welcome message */}
            {history.length === 0 && (
              <div className="text-dark-400 mb-3">
                <p className="text-neon mb-1">╔══════════════════════════════════════╗</p>
                <p className="text-neon">║  CyberSec Academy - Interactive Lab  ║</p>
                <p className="text-neon mb-1">╚══════════════════════════════════════╝</p>
                <p className="mt-2">Lab: {lab.title}</p>
                <p className="mt-1">Type <span className="text-neon">help</span> for commands, <span className="text-neon">hint</span> for guidance</p>
                <p className="mt-1">Execute commands to complete objectives.</p>
                <p className="text-dark-500 mt-2">{'─'.repeat(40)}</p>
              </div>
            )}

            {/* Command history */}
            {history.map((entry, i) => (
              <div key={i}>
                {entry.type === 'cmd' && (
                  <p><span className="text-neon">analyst@lab</span><span className="text-dark-400">:</span><span className="text-blue-400">~</span><span className="text-dark-400">$ </span><span className="text-dark-100">{entry.text}</span></p>
                )}
                {entry.type === 'out' && (
                  <pre className="text-dark-200 whitespace-pre-wrap leading-relaxed pl-0">{entry.text}</pre>
                )}
                {entry.type === 'err' && (
                  <pre className="text-red-400/80 whitespace-pre-wrap leading-relaxed pl-0">{entry.text}</pre>
                )}
              </div>
            ))}

            {/* Input line */}
            <div className="flex items-center">
              <span className="text-neon">analyst@lab</span><span className="text-dark-400">:</span><span className="text-blue-400">~</span><span className="text-dark-400">$ </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-dark-100 font-mono text-xs caret-neon"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
