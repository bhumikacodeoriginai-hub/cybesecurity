'use client';

import Link from 'next/link';
import { modules, totalLessons, totalLabs } from '@/lib/curriculum';
import DeveloperCredit from '@/components/DeveloperCredit';

export default function CoursesPage() {
  return (
    <div className="space-y-10 max-w-5xl animate-in">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl border border-neon/10 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 p-8 sm:p-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-neon/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-neon animate-glow-pulse" />
            <span className="text-[9px] font-mono text-neon tracking-[0.3em] uppercase font-bold">Training Program</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Cybersecurity <span className="glow-text">Curriculum</span>
          </h1>
          <p className="text-sm text-dark-200 mt-3 max-w-lg leading-relaxed">
            Complete path from zero to security professional. Each module builds on the previous — master one before moving to the next.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-6">
            <div>
              <p className="text-2xl font-black font-mono text-white">{modules.length}</p>
              <p className="text-[9px] font-mono text-dark-300 tracking-[0.2em] mt-0.5">MODULES</p>
            </div>
            <div>
              <p className="text-2xl font-black font-mono text-white">{totalLessons}</p>
              <p className="text-[9px] font-mono text-dark-300 tracking-[0.2em] mt-0.5">LESSONS</p>
            </div>
            <div>
              <p className="text-2xl font-black font-mono text-white">{totalLabs}</p>
              <p className="text-[9px] font-mono text-dark-300 tracking-[0.2em] mt-0.5">LABS</p>
            </div>
            <div>
              <p className="text-2xl font-black font-mono text-white">50+</p>
              <p className="text-[9px] font-mono text-dark-300 tracking-[0.2em] mt-0.5">HOURS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Cards */}
      <div className="space-y-3">
        {modules.map((mod, idx) => (
          <Link key={mod.id} href={`/courses/${mod.slug}`}>
            <div className="group relative overflow-hidden rounded-xl border border-dark-600 bg-dark-900 hover:border-neon/25 transition-all duration-300 hover:shadow-[0_0_30px_rgba(160,255,0,0.05)]"
              style={{ animationDelay: `${idx * 50}ms` }}>
              {/* Hover glow line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon/0 to-transparent group-hover:via-neon/50 transition-all duration-500" />

              <div className="p-5 sm:p-6 flex items-center gap-4 sm:gap-5">
                {/* Module Number + Icon */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-2xl border transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                    style={{ borderColor: mod.color + '30', background: mod.color + '08', boxShadow: `0 0 0 0 ${mod.color}00` }}>
                    {mod.icon}
                  </div>
                  <span className="absolute -top-1 -left-1 w-5 h-5 rounded-md bg-dark-800 border border-dark-500 flex items-center justify-center text-[8px] font-mono font-bold text-dark-200">
                    {String(mod.number).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className={`badge-${mod.difficulty.toLowerCase()}`}>{mod.difficulty}</span>
                    {mod.lab && (
                      <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold tracking-wider">LAB</span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-neon transition-colors duration-300 truncate">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-dark-300 mt-1 line-clamp-1 hidden sm:block">{mod.description}</p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      <span className="text-[10px] font-mono text-dark-400">{mod.lessons.length} lessons</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-[10px] font-mono text-dark-400">{mod.lessons.reduce((s, l) => s + l.duration, 0)} min</span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 w-8 h-8 rounded-lg border border-dark-600 group-hover:border-neon/30 group-hover:bg-neon/5 flex items-center justify-center transition-all duration-300">
                  <svg className="w-3.5 h-3.5 text-dark-400 group-hover:text-neon group-hover:translate-x-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
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
