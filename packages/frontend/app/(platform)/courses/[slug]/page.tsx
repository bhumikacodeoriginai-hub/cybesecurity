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
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-dark-300">Module not found</h1>
        <Link href="/courses" className="text-cyber-400 mt-4 inline-block">
          ← Back to Courses
        </Link>
      </div>
    );
  }

  const totalDuration = mod.lessons.reduce((s, l) => s + l.duration, 0);
  const modIndex = modules.findIndex(m => m.slug === slug);
  const prevMod = modIndex > 0 ? modules[modIndex - 1] : null;
  const nextMod = modIndex < modules.length - 1 ? modules[modIndex + 1] : null;

  return (
    <div className="max-w-4xl space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-dark-400">
        <Link href="/courses" className="hover:text-white transition-colors">
          Courses
        </Link>
        <span>/</span>
        <span className="text-white">Module {mod.number}</span>
      </nav>


      {/* Module Header */}
      <div className="card" style={{ borderColor: mod.color + '30' }}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{mod.icon}</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-dark-500">
              Module {mod.number}
            </p>
            <span className={`badge-${mod.difficulty.toLowerCase()}`}>{mod.difficulty}</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">{mod.title}</h1>
        <p className="text-dark-300">{mod.description}</p>
        <div className="flex items-center gap-6 mt-4 text-sm text-dark-400">
          <span>📝 {mod.lessons.length} lessons</span>
          <span>🕐 {totalDuration} min ({Math.round(totalDuration / 60)}h)</span>
          {mod.lab && <span>🧪 1 hands-on lab</span>}
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold mb-4">Lessons</h2>
        {mod.lessons.map((lesson, idx) => (
          <Link key={lesson.id} href={`/lessons/${lesson.slug}`}>
            <div className="flex items-center gap-4 p-4 rounded-xl border border-dark-700/50 bg-dark-800/30 hover:border-cyber-400/30 hover:bg-dark-800/60 transition-all group">
              <div className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center text-xs font-mono text-dark-400 flex-shrink-0">
                {idx + 1}
              </div>
              <span className="text-lg flex-shrink-0">{getLessonIcon(lesson.type)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white group-hover:text-cyber-400 transition-colors">
                  {lesson.title}
                </p>
                <p className="text-xs text-dark-500 mt-0.5 truncate">{lesson.description}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-dark-500">{lesson.duration} min</span>
                <svg className="w-4 h-4 text-dark-600 group-hover:text-cyber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>


      {/* Lab Section */}
      {mod.lab && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold mb-4">Hands-On Lab</h2>
          <Link href={`/labs/${mod.lab.slug}`}>
            <div className="card-hover border-purple-500/20 bg-purple-500/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🧪</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{mod.lab.title}</h3>
                  <p className="text-sm text-dark-400 mt-1">{mod.lab.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-dark-500">
                    <span>⏱️ {mod.lab.duration} min</span>
                    <span>🎯 {mod.lab.objectives.length} objectives</span>
                    <span className={`badge-${mod.lab.difficulty.toLowerCase()}`}>{mod.lab.difficulty}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {mod.lab.tools.map(tool => (
                      <span key={tool} className="px-2 py-0.5 bg-dark-700 rounded text-[10px] text-dark-300 font-mono">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Module Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-dark-700/50">
        {prevMod ? (
          <Link href={`/courses/${prevMod.slug}`} className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>{prevMod.title}</span>
          </Link>
        ) : <div />}
        {nextMod ? (
          <Link href={`/courses/${nextMod.slug}`} className="flex items-center gap-2 text-cyber-400 hover:text-cyber-300 transition-colors text-sm">
            <span>{nextMod.title}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
