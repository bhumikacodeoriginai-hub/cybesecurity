'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getLabBySlug } from '@/lib/labs';

export default function LabWorkspacePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const lab = getLabBySlug(slug);
  const [currentStep, setCurrentStep] = useState(0);
  const [started, setStarted] = useState(false);

  if (!lab) {
    return (
      <div className="text-center py-20">
        <h1 className="text-xl font-bold text-dark-300">Lab not found</h1>
        <Link href="/labs" className="text-neon mt-4 inline-block text-sm">
          &larr; Back to Labs
        </Link>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <nav className="flex items-center gap-2 text-xs text-dark-400 font-mono">
          <Link href="/labs" className="hover:text-neon transition-colors">LABS</Link>
          <span className="text-dark-500">/</span>
          <span className="text-dark-200">{lab.title}</span>
        </nav>

        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className={`badge-${lab.difficulty.toLowerCase()}`}>{lab.difficulty}</span>
            <span className="text-[9px] font-mono text-dark-400">{lab.duration} MIN</span>
          </div>
          <h1 className="text-xl font-bold mb-2">{lab.title}</h1>
          <p className="text-sm text-dark-200 leading-relaxed">{lab.description}</p>
        </div>

        <div className="card p-5">
          <h3 className="text-xs font-mono font-bold text-neon/80 tracking-wider mb-3">SCENARIO</h3>
          <p className="text-sm text-dark-200 leading-relaxed">{lab.scenario}</p>
        </div>

        <div className="card p-5">
          <h3 className="text-xs font-mono font-bold text-neon/80 tracking-wider mb-3">OBJECTIVES</h3>
          <div className="space-y-2">
            {lab.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="font-mono text-[10px] text-dark-400 w-5 text-right flex-shrink-0 mt-0.5">{i+1}.</span>
                <span className="text-dark-200">{obj}</span>
              </div>
            ))}
          </div>
        </div>


        <div className="card p-5">
          <h3 className="text-xs font-mono font-bold text-dark-400 tracking-wider mb-3">TOOLS USED</h3>
          <div className="flex flex-wrap gap-2">
            {lab.tools.map(t => (
              <span key={t} className="px-2.5 py-1 bg-dark-800 border border-neon/10 rounded text-[10px] font-mono text-neon/70">{t}</span>
            ))}
          </div>
        </div>

        <button onClick={() => setStarted(true)} className="btn-primary w-full py-3.5 text-sm">
          START LAB
        </button>
      </div>
    );
  }

  const step = lab.steps[currentStep];
  const isLast = currentStep === lab.steps.length - 1;
  const isFirst = currentStep === 0;
  const isComplete = currentStep >= lab.steps.length;

  // Show completion summary
  if (isComplete) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-mono text-dark-400 tracking-wider">{lab.title.toUpperCase()}</span>
          <span className="text-[9px] font-mono text-neon">COMPLETE</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: '100%' }} />
        </div>
        <div className="card p-6 border-neon/20 bg-neon/[0.03]">
          <h3 className="text-sm font-bold text-neon mb-4 font-mono">LAB COMPLETE</h3>
          <div className="space-y-2">
            {lab.summary.map((s, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="text-neon text-xs mt-1">&#10003;</span>
                <span className="text-dark-200">{s}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setCurrentStep(0)} className="btn-ghost text-xs font-mono">RESTART LAB</button>
            <Link href="/labs" className="btn-secondary text-xs">BACK TO LABS</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-mono text-dark-400 tracking-wider">{lab.title.toUpperCase()}</span>
        <span className="text-[9px] font-mono text-neon">STEP {currentStep + 1} / {lab.steps.length}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${((currentStep + 1) / lab.steps.length) * 100}%` }} />
      </div>

      {/* Step Content */}
      <div className="card p-6">
        <h2 className="text-base font-bold mb-1">Step {step.id}: {step.title}</h2>
        <p className="text-sm text-dark-200 leading-relaxed mt-2">{step.instruction}</p>
      </div>

      {/* Command */}
      <div className="rounded-lg overflow-hidden border border-neon/10 bg-dark-900">
        <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-neon/5">
          <span className="text-[9px] font-mono text-dark-400 tracking-wider">COMMAND</span>
        </div>
        <div className="p-4">
          <code className="terminal-text text-sm font-mono">$ {step.command}</code>
        </div>
      </div>

      {/* Output */}
      <div className="rounded-lg overflow-hidden border border-dark-600 bg-dark-900">
        <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-dark-600">
          <span className="text-[9px] font-mono text-dark-400 tracking-wider">OUTPUT</span>
        </div>
        <div className="p-4 overflow-x-auto">
          <pre className="text-xs font-mono text-dark-100 whitespace-pre-wrap leading-relaxed">{step.expectedOutput}</pre>
        </div>
      </div>

      {/* Explanation */}
      <div className="card p-5 border-neon/10 bg-neon/[0.02]">
        <h4 className="text-[9px] font-mono font-bold text-neon/80 tracking-wider mb-2">EXPLANATION</h4>
        <p className="text-sm text-dark-200 leading-relaxed">{step.explanation}</p>
        {step.tip && (
          <div className="mt-3 pt-3 border-t border-neon/10">
            <p className="text-xs text-dark-300"><span className="text-neon font-mono text-[10px]">TIP:</span> {step.tip}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={isFirst}
          className={`btn-ghost text-xs font-mono ${isFirst ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          &larr; PREV
        </button>
        {isLast ? (
          <button onClick={() => setCurrentStep(lab.steps.length)} className="btn-primary text-xs">
            COMPLETE LAB
          </button>
        ) : (
          <button onClick={() => setCurrentStep(currentStep + 1)} className="btn-primary text-xs">
            NEXT STEP &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
