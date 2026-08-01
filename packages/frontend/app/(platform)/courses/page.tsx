'use client';

import Link from 'next/link';
import { modules, totalLessons, totalLabs } from '@/lib/curriculum';

export default function CoursesPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Cyber<span className="text-cyber-400">Security</span> Curriculum
          </h1>
          <p className="text-dark-400 mt-2">
            {modules.length} modules &middot; {totalLessons} lessons &middot; {totalLabs} hands-on labs
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center py-4">
          <p className="text-2xl font-bold text-cyber-400">{modules.length}</p>
          <p className="text-xs text-dark-400 mt-1">Modules</p>
        </div>
        <div className="card text-center py-4">
          <p className="text-2xl font-bold text-green-400">{totalLessons}</p>
          <p className="text-xs text-dark-400 mt-1">Lessons</p>
        </div>
        <div className="card text-center py-4">
          <p className="text-2xl font-bold text-purple-400">{totalLabs}</p>
          <p className="text-xs text-dark-400 mt-1">Labs</p>
        </div>
      </div>


      {/* Module list */}
      <div className="space-y-4">
        {modules.map((mod) => (
          <Link key={mod.id} href={`/courses/${mod.slug}`}>
            <div className="card-hover group">
              <div className="flex items-start gap-5">
                {/* Module number */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg flex-shrink-0 border"
                  style={{ backgroundColor: mod.color + '10', borderColor: mod.color + '30' }}
                >
                  {mod.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-dark-500">
                      Module {mod.number}
                    </span>
                    <span className={`badge-${mod.difficulty.toLowerCase()}`}>
                      {mod.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyber-400 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-dark-400 mt-1 line-clamp-1">
                    {mod.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-dark-500">
                    <span>{mod.lessons.length} lessons</span>
                    <span>{mod.lessons.reduce((s, l) => s + l.duration, 0)} min</span>
                    {mod.lab && <span className="text-purple-400">+ Lab</span>}
                  </div>
                </div>

                {/* Arrow */}
                <svg className="w-5 h-5 text-dark-600 group-hover:text-cyber-400 transition-colors flex-shrink-0 mt-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
