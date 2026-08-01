'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getModuleBySlug, modules } from '@/lib/curriculum';

function getLessonIcon(type: string) {
  switch (type) {
    case 'THEORY': return '📖';
    case 'PRACTICAL': return '💻';
    case 'LAB': return '🧪';
    default: return '📄';
  }
}

export default function ModuleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const mod = getModuleBySlug(slug);

  if (!mod) {
    return (
      <div className="text-center py-20 animate-in">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-xl font-bold text-dark-300">Module not found</h1>
        <Link href="/courses" className="text-cyber-400 mt-4 inline-block text-sm hover:underline">
          &larr; Back to Courses
        </Link>
      </div>
    );
  }

  const totalDuration = mod.lessons.reduce((s, l) => s + l.duration, 0);
  const modIndex = modules.findIndex(m => m.slug === slug);
  const prevMod = modIndex > 0 ? modules[modIndex - 1] : null;
  const nextMod = modIndex < modules.length - 1 ? modules[modIndex + 1] : null;

  return (
    <div className="max-w-4xl space-y-6 sm:space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-dark-500">
        <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300 truncate">Module {mod.number}</span>
      </nav>

      {/* Header */}
      <div className="card p-5 sm:p-7" style={{ borderColor: mod.color + '15' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-2xl border"
            style={{ backgroundColor: mod.color + '10', borderColor: mod.color + '20' }}>
            {mod.icon}
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-dark-500">Module {mod.number}</p>
            <span className={`badge-${mod.difficulty.toLowerCase()}`}>{mod.difficulty}</span>
          </div>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold mb-2">{mod.title}</h1>
        <p className="text-sm text-dark-400 leading-relaxed">{mod.description}</p>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-5 text-xs text-dark-500">
          <span className="flex items-center gap-1.5">📝 {mod.lessons.length} lessons</span>
          <span className="flex items-center gap-1.5">🕐 {Math.round(totalDuration / 60)}h {totalDuration % 60}m</span>
          {mod.lab && <span className="flex items-center gap-1.5 text-violet-400">🧪 1 lab</span>}
        </div>
      </div>


      {/* Lessons */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-dark-500 mb-4 px-1">Lessons</h2>
        <div className="space-y-2">
          {mod.lessons.map((lesson, idx) => (
            <Link key={lesson.id} href={`/lessons/${lesson.slug}`}>
              <div className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyber-400/15 transition-all duration-200 group">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[10px] sm:text-xs font-mono text-dark-500 flex-shrink-0">
                  {idx + 1}
                </div>
                <span className="text-base sm:text-lg flex-shrink-0">{getLessonIcon(lesson.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-white group-hover:text-cyber-400 transition-colors truncate">
                    {lesson.title}
                  </p>
                  <p className="text-[10px] sm:text-xs text-dark-600 mt-0.5 truncate hidden sm:block">{lesson.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] text-dark-600 hidden sm:inline">{lesson.duration}m</span>
                  <svg className="w-3.5 h-3.5 text-dark-700 group-hover:text-cyber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <h2 className="text-sm font-bold uppercase tracking-wider text-dark-500 mb-4 px-1">Hands-On Lab</h2>
          <Link href={`/labs/${mod.lab.slug}`}>
            <div className="card-hover p-5 border-violet-500/10 bg-violet-500/[0.02] group">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🧪</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-white group-hover:text-violet-400 transition-colors">{mod.lab.title}</h3>
                  <p className="text-xs text-dark-400 mt-1 line-clamp-2">{mod.lab.description}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-[10px] text-dark-500">
                    <span>⏱️ {mod.lab.duration}m</span>
                    <span>🎯 {mod.lab.objectives.length} objectives</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {mod.lab.tools.slice(0, 4).map(tool => (
                      <span key={tool} className="px-2 py-0.5 bg-dark-800 border border-white/[0.06] rounded-md text-[9px] text-dark-400 font-mono">{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Module Nav */}
      <div className="flex items-center justify-between pt-6 border-t border-white/[0.04]">
        {prevMod ? (
          <Link href={`/courses/${prevMod.slug}`} className="flex items-center gap-2 text-dark-500 hover:text-white transition-colors text-xs group">
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="truncate max-w-[120px] sm:max-w-[200px]">{prevMod.title}</span>
          </Link>
        ) : <div />}
        {nextMod ? (
          <Link href={`/courses/${nextMod.slug}`} className="flex items-center gap-2 text-cyber-400 hover:text-cyber-300 transition-colors text-xs group">
            <span className="truncate max-w-[120px] sm:max-w-[200px]">{nextMod.title}</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}


      {/* Lessons */}
      <div>
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-dark-500 mb-4 px-1">Lessons</h2>
        <div className="space-y-2">
          {mod.lessons.map((lesson, idx) => (
            <Link key={lesson.id} href={`/lessons/${lesson.slug}`}>
              <div className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyber-400/15 transition-all duration-200 group">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[10px] sm:text-xs font-mono text-dark-500 flex-shrink-0">
                  {idx + 1}
                </div>
                <span className="text-base sm:text-lg flex-shrink-0">{getLessonIcon(lesson.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-white group-hover:text-cyber-400 transition-colors truncate">
                    {lesson.title}
                  </p>
                  <p className="text-[10px] text-dark-600 mt-0.5 truncate hidden sm:block">{lesson.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] text-dark-600 hidden sm:inline">{lesson.duration}m</span>
                  <svg className="w-3.5 h-3.5 text-dark-700 group-hover:text-cyber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-dark-500 mb-4 px-1">Hands-On Lab</h2>
          <Link href={`/labs/${mod.lab.slug}`}>
            <div className="card-hover p-5 border-violet-500/10 bg-violet-500/[0.02] group">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🧪</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-white group-hover:text-violet-400 transition-colors">{mod.lab.title}</h3>
                  <p className="text-xs text-dark-400 mt-1 line-clamp-2">{mod.lab.description}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-[10px] text-dark-500">
                    <span>⏱️ {mod.lab.duration}m</span>
                    <span>🎯 {mod.lab.objectives.length} objectives</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {mod.lab.tools.slice(0, 4).map(tool => (
                      <span key={tool} className="px-2 py-0.5 bg-dark-800 border border-white/[0.06] rounded-md text-[9px] text-dark-400 font-mono">{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Module Nav */}
      <div className="flex items-center justify-between pt-6 border-t border-white/[0.04]">
        {prevMod ? (
          <Link href={`/courses/${prevMod.slug}`} className="flex items-center gap-2 text-dark-500 hover:text-white transition-colors text-xs group">
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="truncate max-w-[120px] sm:max-w-[200px]">{prevMod.title}</span>
          </Link>
        ) : <div />}
        {nextMod ? (
          <Link href={`/courses/${nextMod.slug}`} className="flex items-center gap-2 text-cyber-400 hover:text-cyber-300 transition-colors text-xs group">
            <span className="truncate max-w-[120px] sm:max-w-[200px]">{nextMod.title}</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
