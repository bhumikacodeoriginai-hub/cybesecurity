'use client';

import Link from 'next/link';
import { modules, totalLessons, totalLabs } from '@/lib/curriculum';

export default function CoursesPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Curriculum
        </h1>
        <p className="text-dark-400 mt-1.5 text-sm">
          {modules.length} modules &middot; {totalLessons} lessons &middot; {totalLabs} labs
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card p-4 text-center">
          <p className="text-xl sm:text-2xl font-bold text-cyber-400">{modules.length}</p>
          <p className="text-[10px] text-dark-500 mt-1 uppercase tracking-wider">Modules</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xl sm:text-2xl font-bold text-emerald-400">{totalLessons}</p>
          <p className="text-[10px] text-dark-500 mt-1 uppercase tracking-wider">Lessons</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xl sm:text-2xl font-bold text-violet-400">{totalLabs}</p>
          <p className="text-[10px] text-dark-500 mt-1 uppercase tracking-wider">Labs</p>
        </div>
      </div>

      {/* Module List */}
      <div className="space-y-3">
        {modules.map((mod) => (
          <Link key={mod.id} href={`/courses/${mod.slug}`}>
            <div className="card-hover p-4 sm:p-5 group">
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl flex-shrink-0 border"
                  style={{ backgroundColor: mod.color + '10', borderColor: mod.color + '20' }}
                >
                  {mod.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-dark-500">
                      Module {mod.number}
                    </span>
                    <span className={`badge-${mod.difficulty.toLowerCase()}`}>{mod.difficulty}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-cyber-400 transition-colors truncate">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-dark-500 mt-0.5 hidden sm:block truncate">{mod.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-dark-500">
                    <span>{mod.lessons.length} lessons</span>
                    <span>&middot;</span>
                    <span>{mod.lessons.reduce((s, l) => s + l.duration, 0)} min</span>
                    {mod.lab && <><span>&middot;</span><span className="text-violet-400">Lab</span></>}
                  </div>
                </div>
                <svg className="w-4 h-4 text-dark-600 group-hover:text-cyber-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer credit */}
      <div className="pt-4 border-t border-white/[0.04] text-center">
        <p className="text-[10px] text-dark-600">
          Built by <span className="text-dark-500">Raghavendra N</span> &middot; Code Origin.AI Pvt Ltd
        </p>
      </div>
    </div>
  );
}
