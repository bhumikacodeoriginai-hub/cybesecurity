'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getModuleBySlug, modules } from '@/lib/curriculum';

export default function ModuleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const mod = getModuleBySlug(slug);

  if (!mod) {
    return (
      <div className="text-center py-20 animate-in">
        <h1 className="text-xl font-bold text-dark-300">Module not found</h1>
        <Link href="/courses" className="text-neon mt-4 inline-block text-sm font-mono">&larr; BACK</Link>
      </div>
    );
  }

  const totalDuration = mod.lessons.reduce((s, l) => s + l.duration, 0);
  const modIndex = modules.findIndex(m => m.slug === slug);
  const prevMod = modIndex > 0 ? modules[modIndex - 1] : null;
  const nextMod = modIndex < modules.length - 1 ? modules[modIndex + 1] : null;

  return (
    <div className="max-w-4xl space-y-8 animate-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-dark-400">
        <Link href="/courses" className="hover:text-neon transition-colors">COURSES</Link>
        <span className="text-dark-600">/</span>
        <span className="text-dark-200">MODULE {String(mod.number).padStart(2, '0')}</span>
      </nav>

      {/* Module Header */}
      <div className="relative overflow-hidden rounded-xl border p-6 sm:p-8" style={{ borderColor: mod.color + '20', background: `linear-gradient(135deg, ${mod.color}05, transparent)` }}>
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: mod.color }} />
        <div className="relative z-10 flex items-start gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl border flex-shrink-0"
            style={{ borderColor: mod.color + '30', background: mod.color + '10' }}>
            {mod.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] font-mono text-dark-400 tracking-[0.2em]">MODULE {String(mod.number).padStart(2, '0')}</span>
              <span className={`badge-${mod.difficulty.toLowerCase()}`}>{mod.difficulty}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{mod.title}</h1>
            <p className="text-sm text-dark-300 mt-2 leading-relaxed max-w-xl">{mod.description}</p>
            <div className="flex flex-wrap gap-5 mt-5 text-xs font-mono text-dark-400">
              <span>{mod.lessons.length} lessons</span>
              <span>{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
              {mod.lab && <span className="text-purple-400">+ Interactive Lab</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-gradient-to-r from-neon/10 to-transparent" />
          <span className="text-[9px] font-mono text-dark-400 tracking-[0.3em]">LESSONS</span>
          <div className="h-px flex-1 bg-gradient-to-l from-neon/10 to-transparent" />
        </div>

        <div className="space-y-2">
          {mod.lessons.map((lesson, idx) => (
            <Link key={lesson.id} href={`/lessons/${lesson.slug}`}>
              <div className="group flex items-center gap-4 p-4 sm:p-5 rounded-xl border border-dark-600 bg-dark-900 hover:border-neon/20 hover:bg-dark-800 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(160,255,0,0.03)]">
                {/* Number */}
                <div className="w-9 h-9 rounded-lg bg-dark-800 border border-dark-500 group-hover:border-neon/20 group-hover:bg-neon/5 flex items-center justify-center transition-all duration-200 flex-shrink-0">
                  <span className="text-[10px] font-mono font-bold text-dark-300 group-hover:text-neon transition-colors">{String(idx + 1).padStart(2, '0')}</span>
                </div>

                {/* Type badge */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm ${lesson.type === 'PRACTICAL' ? 'bg-green-500/10 border border-green-500/20' : lesson.type === 'LAB' ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-blue-500/10 border border-blue-500/20'}`}>
                  {lesson.type === 'PRACTICAL' ? '💻' : lesson.type === 'LAB' ? '🧪' : '📖'}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white group-hover:text-neon transition-colors truncate">{lesson.title}</h3>
                  <p className="text-[11px] text-dark-400 mt-0.5 truncate hidden sm:block">{lesson.description}</p>
                </div>

                {/* Duration + Arrow */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-[10px] font-mono text-dark-500 hidden sm:block">{lesson.duration}m</span>
                  <svg className="w-3.5 h-3.5 text-dark-500 group-hover:text-neon group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Lab */}
      {mod.lab && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500/10 to-transparent" />
            <span className="text-[9px] font-mono text-dark-400 tracking-[0.3em]">INTERACTIVE LAB</span>
            <div className="h-px flex-1 bg-gradient-to-l from-purple-500/10 to-transparent" />
          </div>

          <Link href={`/labs/${mod.lab.slug}`}>
            <div className="group relative overflow-hidden rounded-xl border border-purple-500/15 bg-gradient-to-br from-purple-500/5 to-transparent p-6 hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.05)]">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/0 to-transparent group-hover:via-purple-500/40 transition-all duration-500" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 text-xl group-hover:scale-105 transition-transform">🧪</div>
                <div className="flex-1">
                  <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors">{mod.lab.title}</h3>
                  <p className="text-xs text-dark-300 mt-1.5 leading-relaxed">{mod.lab.description}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-[10px] font-mono text-dark-400">
                    <span>{mod.lab.duration} MIN</span>
                    <span>{mod.lab.objectives.length} OBJECTIVES</span>
                    <span>{mod.lab.steps?.length || mod.lab.tools.length} STEPS</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {mod.lab.tools.map(tool => (
                      <span key={tool} className="px-2 py-0.5 bg-dark-800 border border-purple-500/10 rounded text-[9px] font-mono text-purple-300/70">{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Module Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-dark-700">
        {prevMod ? (
          <Link href={`/courses/${prevMod.slug}`} className="flex items-center gap-2 text-dark-400 hover:text-neon transition-colors text-xs font-mono group">
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            <span className="truncate max-w-[150px] sm:max-w-[250px]">{prevMod.title}</span>
          </Link>
        ) : <div />}
        {nextMod ? (
          <Link href={`/courses/${nextMod.slug}`} className="flex items-center gap-2 text-neon hover:text-neon-50 transition-colors text-xs font-mono group">
            <span className="truncate max-w-[150px] sm:max-w-[250px]">{nextMod.title}</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
