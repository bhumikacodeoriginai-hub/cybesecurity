'use client';

import { useState } from 'react';

interface InstructionStep {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'command' | 'note' | 'warning';
  command?: string;
}

interface LabInstructionsProps {
  title: string;
  description: string;
  steps: InstructionStep[];
  hints: string[];
  networkDiagram?: any;
}

export default function LabInstructions({ title, description, steps, hints, networkDiagram }: LabInstructionsProps) {
  const [activeHint, setActiveHint] = useState(-1);
  const [showHints, setShowHints] = useState(false);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-dark-700/50">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        <p className="text-xs text-dark-400 mt-1">{description}</p>
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {steps.map((step, idx) => (
          <div key={step.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-cyber-400/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-cyber-400 font-medium">{idx + 1}</span>
              </div>
              <h4 className="text-sm font-medium text-white">{step.title}</h4>
            </div>

            <div className="ml-7">
              {step.type === 'command' ? (
                <div className="bg-[#0d1117] border border-dark-700 rounded-md p-3">
                  <code className="text-green-400 font-mono text-xs">$ {step.command}</code>
                  {step.content && (
                    <p className="text-xs text-dark-400 mt-2">{step.content}</p>
                  )}
                </div>
              ) : step.type === 'warning' ? (
                <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-md p-3">
                  <p className="text-xs text-yellow-400/90">{step.content}</p>
                </div>
              ) : step.type === 'note' ? (
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-md p-3">
                  <p className="text-xs text-blue-400/90">{step.content}</p>
                </div>
              ) : (
                <p className="text-xs text-dark-300 leading-relaxed">{step.content}</p>
              )}
            </div>
          </div>
        ))}

        {/* Network Diagram */}
        {networkDiagram && (
          <div className="mt-6 p-4 bg-dark-800/50 border border-dark-700/50 rounded-lg">
            <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-cyber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Network Diagram
            </h4>
            <div className="font-mono text-xs text-dark-300 whitespace-pre bg-dark-900/50 p-3 rounded">
{`┌──────────────┐     ┌──────────────┐
│  Your Machine │     │ Target Server│
│  192.168.1.10 │────▸│ 192.168.1.100│
│  (student)    │     │ (SSH,HTTP,DB)│
└──────────────┘     └──────────────┘
                           │
                     ┌─────┴──────┐
                     │  DB Server  │
                     │ 192.168.1.200│
                     └────────────┘`}
            </div>
          </div>
        )}
      </div>

      {/* Hints Section */}
      <div className="border-t border-dark-700/50">
        <button
          onClick={() => setShowHints(!showHints)}
          className="w-full px-4 py-2 flex items-center justify-between text-sm text-dark-400 hover:text-white hover:bg-dark-800/50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Hints ({hints.length} available)
          </span>
          <svg className={`w-4 h-4 transition-transform ${showHints ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showHints && (
          <div className="px-4 pb-3 space-y-2">
            {hints.map((hint, idx) => (
              <div key={idx}>
                {idx <= activeHint ? (
                  <div className="p-2 bg-yellow-500/5 border border-yellow-500/20 rounded text-xs text-yellow-400/80">
                    💡 {hint}
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveHint(idx)}
                    className="w-full p-2 bg-dark-800/50 border border-dark-700/50 rounded text-xs text-dark-500 hover:text-dark-300 hover:border-dark-600 transition-colors text-left"
                  >
                    🔒 Reveal Hint {idx + 1}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
