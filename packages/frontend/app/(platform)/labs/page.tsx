'use client';

import Link from 'next/link';
import { modules } from '@/lib/curriculum';

const labs = modules.filter(m => m.lab).map(m => ({
  ...m.lab!,
  module: { number: m.number, title: m.title, color: m.color, icon: m.icon },
}));

export default function LabsPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Hands-On <span className="text-purple-400">Labs</span>
        </h1>
        <p className="text-dark-400 mt-2">
          Practice in isolated environments. Each lab ties to a module.
        </p>
      </div>

      {/* Info */}
      <div className="card bg-gradient-to-r from-purple-500/5 to-cyber-400/5 border-purple-500/20">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🔬</span>
          <div>
            <h3 className="font-semibold text-white mb-1">How Labs Work</h3>
            <p className="text-sm text-dark-300">
              Each lab runs in an isolated Docker container. Follow objectives,
              execute real commands, and validate your work. Labs auto-expire
              after the time limit.
            </p>
          </div>
        </div>
      </div>

      {/* Lab Cards */}
      <div className="space-y-4">
        {labs.map((lab) => (
          <Link key={lab.id} href={`/labs/${lab.slug}`}>
            <div className="card-hover group">
              <div className="flex items-start gap-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg flex-shrink-0 border"
                  style={{ backgroundColor: lab.module.color + '10', borderColor: lab.module.color + '30' }}
                >
                  {lab.module.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-dark-500">
                      Module {lab.module.number} Lab
                    </span>
                    <span className={`badge-${lab.difficulty.toLowerCase()}`}>{lab.difficulty}</span>
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                    {lab.title}
                  </h3>
                  <p className="text-sm text-dark-400 mt-1">{lab.description}</p>


                  {/* Objectives preview */}
                  <div className="mt-3 space-y-1">
                    {lab.objectives.slice(0, 3).map((obj, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-dark-500">
                        <span className="w-4 h-4 rounded-full border border-dark-600 flex items-center justify-center text-[8px]">{i+1}</span>
                        <span>{obj}</span>
                      </div>
                    ))}
                    {lab.objectives.length > 3 && (
                      <span className="text-[10px] text-dark-600 ml-6">+{lab.objectives.length - 3} more</span>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mt-3 text-xs text-dark-500">
                    <span>⏱️ {lab.duration} min</span>
                    <span>🎯 {lab.objectives.length} objectives</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {lab.tools.map(tool => (
                      <span key={tool} className="px-2 py-0.5 bg-dark-700 rounded text-[10px] text-dark-300 font-mono">{tool}</span>
                    ))}
                  </div>
                </div>

                <svg className="w-5 h-5 text-dark-600 group-hover:text-purple-400 transition-colors flex-shrink-0 mt-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
