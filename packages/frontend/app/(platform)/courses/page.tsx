'use client';

import Link from 'next/link';
import { modules, totalLessons, totalLabs } from '@/lib/curriculum';

export default function CoursesPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Training <span className="glow-text">Modules</span>
        </h1>
        <p className="text-xs font-mono text-dark-300 mt-2 tracking-wide">
          {modules.length} MODULES // {totalLessons} LESSONS // {totalLabs} LABS
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="card text-center py-4">
          <p className="text-xl font-black font-mono glow-text">{modules.length}</p>
          <p className="text-[8px] text-dark-300 mt-1 font-mono tracking-[0.2em]">MODULES</p>
        </div>
        <div className="card text-center py-4">
          <p className="text-xl font-black font-mono glow-text">{totalLessons}</p>
          <p className="text-[8px] text-dark-300 mt-1 font-mono tracking-[0.2em]">LESSONS</p>
        </div>
        <div className="card text-center py-4">
          <p className="text-xl font-black font-mono glow-text">{totalLabs}</p>
          <p className="text-[8px] text-dark-300 mt-1 font-mono tracking-[0.2em]">LABS</p>
        </div>
      </div>

      <div className="space-y-2">
        {modules.map((mod) => (
          <Link key={mod.id} href={`/courses/${mod.slug}`}>
            <div className="card-hover p-4 group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-md border flex items-center justify-center text-lg flex-shrink-0"
                  style={{ borderColor: mod.color + '30', background: mod.color + '08' }}>
                  {mod.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[9px] font-mono text-dark-400 tracking-widest">
                      MODULE {String(mod.number).padStart(2, '0')}
                    </span>
                    <span className={`badge-${mod.difficulty.toLowerCase()}`}>{mod.difficulty}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-neon transition-colors truncate">
                    {mod.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] font-mono text-dark-400">
                    <span>{mod.lessons.length} lessons</span>
                    <span className="text-dark-500">|</span>
                    <span>{mod.lessons.reduce((s, l) => s + l.duration, 0)}m</span>
                    {mod.lab && <><span className="text-dark-500">|</span><span className="text-neon/60">LAB</span></>}
                  </div>
                </div>
                <svg className="w-4 h-4 text-dark-500 group-hover:text-neon transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center pt-4 border-t border-neon/5">
        <p className="text-[9px] font-mono text-dark-400 tracking-wider">
          DEVELOPED BY <span className="text-neon/60">RAGHAVENDRA N</span> // CODE ORIGIN.AI PVT LTD
        </p>
      </div>
    </div>
  );
}
