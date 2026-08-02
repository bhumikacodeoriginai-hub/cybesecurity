'use client';

import Link from 'next/link';
import { allLabs } from '@/lib/labs';
import DeveloperCredit from '@/components/DeveloperCredit';

export default function LabsPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">
          Interactive <span className="glow-text">Labs</span>
        </h1>
        <p className="text-xs font-mono text-dark-300 mt-2 tracking-wide">
          GUIDED EXERCISES // REAL COMMANDS // REAL OUTPUTS
        </p>
      </div>

      <div className="card p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-md bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="terminal-text text-xs font-bold">$</span>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-white">How Labs Work</h3>
            <p className="text-xs text-dark-200 mt-1 leading-relaxed">
              Each lab is a guided, step-by-step exercise with <span className="text-neon">real commands</span> and <span className="text-neon">real outputs</span>. Follow the scenario, execute commands, read the expected output, and understand the explanation. No fake terminals — real cybersecurity concepts you can practice anywhere.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {allLabs.map((lab) => (
          <Link key={lab.id} href={`/labs/${lab.slug}`}>
            <div className="card-hover p-5 group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-xs font-bold text-neon">{String(lab.moduleNumber).padStart(2, '0')}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-mono text-dark-400 tracking-widest">{lab.module.toUpperCase()}</span>
                    <span className={`badge-${lab.difficulty.toLowerCase()}`}>{lab.difficulty}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-neon transition-colors">{lab.title}</h3>
                  <p className="text-xs text-dark-300 mt-1 line-clamp-2">{lab.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-[10px] font-mono text-dark-400">
                    <span>{lab.duration} MIN</span>
                    <span>{lab.steps.length} STEPS</span>
                    <span>{lab.objectives.length} OBJECTIVES</span>
                  </div>
                </div>
                <svg className="w-4 h-4 text-dark-500 group-hover:text-neon transition-colors flex-shrink-0 mt-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Developer Credit */}
      <DeveloperCredit />
    </div>
  );
}
