'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCurrentUser, User } from '@/lib/auth';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const stats = [
    { label: 'Total XP', value: '250', icon: '⚡', color: 'from-amber-500/20 to-amber-600/5', textColor: 'text-amber-400', border: 'border-amber-500/20' },
    { label: 'Courses Active', value: '3', icon: '📚', color: 'from-blue-500/20 to-blue-600/5', textColor: 'text-blue-400', border: 'border-blue-500/20' },
    { label: 'Labs Completed', value: '2', icon: '🧪', color: 'from-emerald-500/20 to-emerald-600/5', textColor: 'text-emerald-400', border: 'border-emerald-500/20' },
    { label: 'Day Streak', value: '3', icon: '🔥', color: 'from-orange-500/20 to-orange-600/5', textColor: 'text-orange-400', border: 'border-orange-500/20' },
  ];

  const continueLearning = [
    { title: 'Linux File Permissions & Ownership', progress: 65, slug: 'file-permissions-ownership', path: 'Linux Security', nextLesson: 'SUID and Sticky Bits', icon: '🐧' },
    { title: 'The CIA Triad', progress: 100, slug: 'the-cia-triad', path: 'Cybersecurity Foundations', nextLesson: 'Completed!', icon: '🛡️' },
    { title: 'Networking Fundamentals', progress: 30, slug: 'networking-fundamentals', path: 'Network Security', nextLesson: 'IP Addressing & Subnetting', icon: '🌐' },
  ];

  const activeLabs = [
    { title: 'Linux Intrusion Investigation', slug: 'linux-intrusion-investigation', timeRemaining: '42:15', status: 'running', objectives: '2/4 completed' },
  ];

  const recentActivity = [
    { action: 'Completed lesson', detail: 'The CIA Triad', xp: '+15 XP', time: '2 hours ago', icon: '✅' },
    { action: 'Solved challenge', detail: 'Base64 Decode (CTF)', xp: '+50 XP', time: '5 hours ago', icon: '🚩' },
    { action: 'Started lab', detail: 'Linux Intrusion Investigation', xp: '', time: '6 hours ago', icon: '🧪' },
    { action: 'Earned badge', detail: 'First Steps', xp: '+25 XP', time: '1 day ago', icon: '🏆' },
    { action: 'Completed lab', detail: 'File Permissions Lab', xp: '+50 XP', time: '2 days ago', icon: '✅' },
  ];

  const skillProgress = [
    { name: 'Foundations', progress: 45, color: '#00d4ff', lessons: '9/20' },
    { name: 'Networking', progress: 30, color: '#8b5cf6', lessons: '6/20' },
    { name: 'Linux', progress: 65, color: '#10b981', lessons: '13/20' },
    { name: 'Web Security', progress: 10, color: '#f59e0b', lessons: '2/20' },
    { name: 'Ethical Hacking', progress: 0, color: '#ef4444', lessons: '0/20' },
  ];

  const recommendedNext = [
    { title: 'Threats, Vulnerabilities & Risks', type: 'LESSON', duration: '30 min', difficulty: 'BEGINNER', slug: 'threats-vulnerabilities-risks', why: 'Continues your Foundations path' },
    { title: 'Network Scanning Basics', type: 'LAB', duration: '45 min', difficulty: 'BEGINNER', slug: 'network-scanning-basics', why: 'Hands-on practice recommended' },
    { title: 'Find the User (CTF)', type: 'CHALLENGE', duration: '15 min', difficulty: 'BEGINNER', slug: 'find-the-user', why: 'Test your Linux skills' },
  ];

  return (
    <div className="space-y-8 max-w-[1400px]">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, <span className="glow-text">{user?.firstName || 'Learner'}</span>
          </h1>
          <p className="text-dark-500 mt-1 text-sm">Continue building your cybersecurity skills. Every day counts.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl">
          <span className="text-xs text-dark-500">Level:</span>
          <span className="badge-beginner">{user?.level || 'BEGINNER'}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`card relative overflow-hidden border ${stat.border}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-50`} />
            <div className="relative flex items-center gap-4">
              <span className="text-3xl">{stat.icon}</span>
              <div>
                <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                <p className="text-xs text-dark-500 mt-0.5">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Labs Alert */}
      {activeLabs.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-dark-300 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Active Lab
          </h2>
          {activeLabs.map((lab) => (
            <Link key={lab.slug} href={`/labs/${lab.slug}`}>
              <div className="card-hover border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-xl border border-emerald-500/20">
                      🧪
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{lab.title}</h3>
                      <p className="text-xs text-dark-400 mt-0.5">{lab.objectives} · Click to open terminal</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-lg text-emerald-400 font-bold">{lab.timeRemaining}</p>
                    <p className="text-[10px] text-dark-500 uppercase">Remaining</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-dark-300 uppercase tracking-wider">Continue Learning</h2>
            {continueLearning.map((course) => (
              <Link key={course.slug} href={`/lessons/${course.slug}`}>
                <div className="card-hover">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-white/[0.03] rounded-xl flex items-center justify-center text-xl border border-white/[0.06]">
                      {course.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-white text-sm truncate">{course.title}</h3>
                        <span className="text-xs text-cyber-400 font-mono ml-2">{course.progress}%</span>
                      </div>
                      <p className="text-xs text-dark-500">
                        {course.path} → <span className="text-dark-400">{course.nextLesson}</span>
                      </p>
                      <div className="mt-2 progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${course.progress}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Recommended Next */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-dark-300 uppercase tracking-wider">Recommended For You</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {recommendedNext.map((item) => (
                <Link key={item.slug} href={item.type === 'LAB' ? `/labs/${item.slug}` : item.type === 'CHALLENGE' ? `/ctf/${item.slug}` : `/lessons/${item.slug}`}>
                  <div className="card-hover h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md ${
                        item.type === 'LESSON' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        item.type === 'LAB' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                      }`}>{item.type}</span>
                      <span className="text-[10px] text-dark-600">{item.duration}</span>
                    </div>
                    <h3 className="text-sm font-medium text-white mb-1">{item.title}</h3>
                    <p className="text-[11px] text-dark-500">{item.why}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Skill Progress */}
          <div className="card">
            <h3 className="text-sm font-semibold text-dark-300 uppercase tracking-wider mb-4">Skill Progress</h3>
            <div className="space-y-4">
              {skillProgress.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-dark-300 font-medium">{skill.name}</span>
                    <span className="text-dark-500 font-mono">{skill.lessons}</span>
                  </div>
                  <div className="h-1.5 bg-dark-800 rounded-full overflow-hidden border border-white/[0.03]">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${skill.progress}%`, backgroundColor: skill.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Link href="/skill-tree" className="block mt-4 text-center text-xs text-cyber-400 hover:text-cyber-300 transition-colors">
              View Full Skill Tree →
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-sm font-semibold text-dark-300 uppercase tracking-wider mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-base mt-0.5">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-dark-300 truncate">
                      <span className="text-dark-400">{item.action}:</span> {item.detail}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-dark-600">{item.time}</span>
                      {item.xp && <span className="text-[10px] text-amber-400 font-medium">{item.xp}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Streak Card */}
          <div className="card bg-gradient-to-br from-orange-500/10 to-red-500/5 border-orange-500/20">
            <div className="text-center">
              <span className="text-4xl block mb-2">🔥</span>
              <p className="text-3xl font-bold text-orange-400">{user?.currentStreak || 3} Days</p>
              <p className="text-xs text-dark-400 mt-1">Learning Streak</p>
              <div className="flex justify-center gap-1 mt-3">
                {[1,2,3,4,5,6,7].map(d => (
                  <div key={d} className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] ${
                    d <= 3 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-dark-800 text-dark-600 border border-white/[0.05]'
                  }`}>
                    {d <= 3 ? '✓' : d}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-dark-500 mt-2">4 more days to earn Streak Master badge</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
