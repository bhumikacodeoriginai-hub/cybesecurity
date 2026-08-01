'use client';

import { useState } from 'react';
import Link from 'next/link';

const courseData = {
  title: 'Linux Fundamentals for Security',
  slug: 'linux-fundamentals-security',
  description: 'Master the Linux command line from zero. Learn to navigate, manage files, control permissions, monitor processes, and harden systems — the essential skills every cybersecurity professional needs.',
  difficulty: 'BEGINNER',
  durationHours: 15,
  path: { title: 'Linux Security', color: '#10b981', icon: '🐧' },
  skills: ['Linux CLI', 'File Permissions', 'User Management', 'Process Control', 'Log Analysis', 'Service Management', 'SSH', 'Hardening'],
  enrolled: 2100,
  rating: 4.8,
  modules: [
    {
      id: 'm1',
      title: 'Linux Command Line Essentials',
      description: 'Navigate the filesystem, understand paths, and master basic commands',
      lessonsCount: 5,
      duration: '2.5 hours',
      lessons: [
        { id: 'l1', title: 'Navigating the Linux Filesystem', slug: 'navigating-linux-filesystem', type: 'PRACTICAL', duration: 30, xp: 20, completed: true, hasLab: false },
        { id: 'l2', title: 'File Permissions & Ownership', slug: 'file-permissions-ownership', type: 'PRACTICAL', duration: 35, xp: 25, completed: true, hasLab: true },
        { id: 'l3', title: 'Users, Groups & sudo', slug: 'linux-users-groups', type: 'PRACTICAL', duration: 30, xp: 20, completed: false, hasLab: true },
        { id: 'l4', title: 'Finding Files & Text (find, grep)', slug: 'finding-files-text', type: 'PRACTICAL', duration: 25, xp: 20, completed: false, hasLab: false },
        { id: 'l5', title: 'Pipes, Redirection & Shell Basics', slug: 'pipes-redirection-shell', type: 'PRACTICAL', duration: 30, xp: 20, completed: false, hasLab: false },
      ],
    },
    {
      id: 'm2',
      title: 'Process & Service Management',
      description: 'Monitor running processes, manage services, and understand system resources',
      lessonsCount: 4,
      duration: '2 hours',
      lessons: [
        { id: 'l6', title: 'Processes & Resource Monitoring', slug: 'processes-resource-monitoring', type: 'PRACTICAL', duration: 30, xp: 20, completed: false, hasLab: false },
        { id: 'l7', title: 'systemd Services & Daemons', slug: 'systemd-services-daemons', type: 'THEORY', duration: 25, xp: 15, completed: false, hasLab: false },
        { id: 'l8', title: 'Scheduled Tasks (cron & at)', slug: 'scheduled-tasks-cron', type: 'PRACTICAL', duration: 25, xp: 20, completed: false, hasLab: true },
        { id: 'l9', title: 'Lab: Suspicious Process Investigation', slug: 'lab-suspicious-process', type: 'LAB', duration: 45, xp: 50, completed: false, hasLab: true },
      ],
    },
    {
      id: 'm3',
      title: 'Networking & SSH',
      description: 'Network configuration, SSH security, and remote access fundamentals',
      lessonsCount: 4,
      duration: '2.5 hours',
      lessons: [
        { id: 'l10', title: 'Linux Networking Commands', slug: 'linux-networking-commands', type: 'PRACTICAL', duration: 35, xp: 25, completed: false, hasLab: false },
        { id: 'l11', title: 'SSH: Secure Remote Access', slug: 'ssh-secure-remote-access', type: 'PRACTICAL', duration: 30, xp: 20, completed: false, hasLab: true },
        { id: 'l12', title: 'Firewall Basics (iptables/ufw)', slug: 'firewall-basics-iptables', type: 'PRACTICAL', duration: 35, xp: 25, completed: false, hasLab: true },
        { id: 'l13', title: 'Lab: Secure SSH Configuration', slug: 'lab-secure-ssh', type: 'LAB', duration: 45, xp: 50, completed: false, hasLab: true },
      ],
    },
    {
      id: 'm4',
      title: 'Logs, Monitoring & Hardening',
      description: 'Read system logs, detect anomalies, and apply security hardening',
      lessonsCount: 5,
      duration: '3 hours',
      lessons: [
        { id: 'l14', title: 'System Logs & journalctl', slug: 'system-logs-journalctl', type: 'PRACTICAL', duration: 30, xp: 20, completed: false, hasLab: false },
        { id: 'l15', title: 'Detecting Suspicious Activity in Logs', slug: 'detecting-suspicious-logs', type: 'PRACTICAL', duration: 35, xp: 25, completed: false, hasLab: true },
        { id: 'l16', title: 'Package Management & Updates', slug: 'package-management-updates', type: 'THEORY', duration: 20, xp: 15, completed: false, hasLab: false },
        { id: 'l17', title: 'Linux Hardening Checklist', slug: 'linux-hardening-checklist', type: 'THEORY', duration: 25, xp: 15, completed: false, hasLab: false },
        { id: 'l18', title: 'Lab: Full Intrusion Investigation', slug: 'linux-intrusion-investigation', type: 'LAB', duration: 60, xp: 75, completed: false, hasLab: true },
      ],
    },
  ],
};

const typeIcons: Record<string, { icon: string; color: string }> = {
  THEORY: { icon: '📖', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  PRACTICAL: { icon: '💻', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  LAB: { icon: '🧪', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  QUIZ: { icon: '❓', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
};

export default function CourseDetailPage() {
  const [expandedModule, setExpandedModule] = useState<string | null>('m1');
  const course = courseData;

  const totalLessons = course.modules.reduce((s, m) => s + m.lessons.length, 0);
  const completedLessons = course.modules.reduce((s, m) => s + m.lessons.filter(l => l.completed).length, 0);
  const progress = Math.round((completedLessons / totalLessons) * 100);
  const totalXP = course.modules.reduce((s, m) => s + m.lessons.reduce((ls, l) => ls + l.xp, 0), 0);
  const earnedXP = course.modules.reduce((s, m) => s + m.lessons.filter(l => l.completed).reduce((ls, l) => ls + l.xp, 0), 0);

  // Find next lesson
  let nextLesson: any = null;
  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      if (!lesson.completed) { nextLesson = lesson; break; }
    }
    if (nextLesson) break;
  }

  return (
    <div className="max-w-5xl space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-dark-500">
        <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">{course.title}</span>
      </nav>

      {/* Course Header Card */}
      <div className="card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{course.path.icon}</span>
            <div>
              <p className="text-xs text-dark-500">{course.path.title} Path</p>
              <h1 className="text-2xl font-bold tracking-tight">{course.title}</h1>
            </div>
          </div>

          <p className="text-sm text-dark-400 leading-relaxed max-w-3xl mb-5">{course.description}</p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-dark-500 mb-5">
            <span className="badge-beginner">{course.difficulty}</span>
            <span>🕐 {course.durationHours} hours</span>
            <span>📝 {totalLessons} lessons</span>
            <span>🧪 {course.modules.reduce((s,m) => s + m.lessons.filter(l => l.type === 'LAB').length, 0)} labs</span>
            <span>⚡ {totalXP} XP total</span>
            <span>👥 {course.enrolled.toLocaleString()} enrolled</span>
            <span>⭐ {course.rating}/5.0</span>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {course.skills.map(skill => (
              <span key={skill} className="px-3 py-1 bg-white/[0.03] border border-white/[0.06] rounded-lg text-xs text-dark-300">{skill}</span>
            ))}
          </div>

          {/* Progress + CTA */}
          <div className="flex items-center gap-6 p-4 bg-white/[0.02] rounded-xl border border-white/[0.06]">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-dark-400">{completedLessons}/{totalLessons} lessons · {earnedXP}/{totalXP} XP</span>
                <span className="text-cyber-400 font-mono font-bold">{progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
            {nextLesson && (
              <Link href={`/lessons/${nextLesson.slug}`} className="btn-primary text-sm px-5 py-2.5 flex-shrink-0">
                {completedLessons > 0 ? 'Continue' : 'Start Course'}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Course Content - Modules */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Course Content</h2>

        {course.modules.map((module, modIdx) => {
          const isExpanded = expandedModule === module.id;
          const modCompleted = module.lessons.filter(l => l.completed).length;
          const modProgress = Math.round((modCompleted / module.lessons.length) * 100);

          return (
            <div key={module.id} className="card overflow-hidden">
              {/* Module Header */}
              <button
                onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                className="w-full flex items-center gap-4 text-left"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold border ${
                  modProgress === 100 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                  modProgress > 0 ? 'bg-cyber-400/10 text-cyber-400 border-cyber-400/20' :
                  'bg-white/[0.03] text-dark-500 border-white/[0.06]'
                }`}>
                  {modProgress === 100 ? '✓' : modIdx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-sm">{module.title}</h3>
                  <p className="text-xs text-dark-500 mt-0.5">
                    {module.lessonsCount} lessons · {module.duration} · {modCompleted}/{module.lessonsCount} done
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {modProgress > 0 && modProgress < 100 && (
                    <span className="text-xs text-cyber-400 font-mono">{modProgress}%</span>
                  )}
                  <svg className={`w-4 h-4 text-dark-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Module Description */}
              {isExpanded && (
                <div className="mt-4 space-y-1">
                  <p className="text-xs text-dark-500 mb-3 pl-14">{module.description}</p>

                  {/* Lessons */}
                  {module.lessons.map((lesson, lessonIdx) => {
                    const typeInfo = typeIcons[lesson.type] || typeIcons.THEORY;
                    return (
                      <Link key={lesson.id} href={lesson.type === 'LAB' ? `/labs/${lesson.slug}` : `/lessons/${lesson.slug}`}>
                        <div className="flex items-center gap-3 p-3 ml-14 rounded-xl hover:bg-white/[0.03] transition-all group border border-transparent hover:border-white/[0.04]">
                          {/* Status */}
                          {lesson.completed ? (
                            <div className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20 flex-shrink-0">
                              <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            </div>
                          ) : (
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs border ${typeInfo.color} flex-shrink-0`}>
                              {typeInfo.icon}
                            </div>
                          )}

                          {/* Lesson Info */}
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${lesson.completed ? 'text-dark-500 line-through' : 'text-white group-hover:text-cyber-400'} transition-colors`}>
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-3 mt-0.5">
                              <span className="text-[10px] text-dark-600">{lesson.duration} min</span>
                              <span className="text-[10px] text-dark-600">⚡ {lesson.xp} XP</span>
                              {lesson.hasLab && <span className="text-[10px] text-purple-400">🧪 has lab</span>}
                            </div>
                          </div>

                          {/* Arrow */}
                          <svg className="w-4 h-4 text-dark-700 group-hover:text-cyber-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* What You'll Learn */}
      <div className="card">
        <h3 className="font-semibold text-white mb-4">What You'll Be Able To Do After This Course</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            'Navigate any Linux filesystem with confidence',
            'Audit and fix file permission vulnerabilities',
            'Manage users, groups, and access control',
            'Investigate suspicious processes and connections',
            'Read and analyze system logs for intrusions',
            'Configure SSH securely and manage keys',
            'Set up basic firewall rules with iptables/ufw',
            'Apply a Linux hardening checklist to any server',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-dark-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prerequisites */}
      <div className="card">
        <h3 className="font-semibold text-white mb-3">Prerequisites</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/courses/intro-to-cybersecurity" className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:border-cyber-400/20 transition-colors">
            <span className="text-sm">🛡️</span>
            <span className="text-xs text-dark-300">Introduction to Cybersecurity</span>
            <span className="text-[10px] text-emerald-400">✓ Recommended</span>
          </Link>
          <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl">
            <span className="text-sm">💻</span>
            <span className="text-xs text-dark-300">Basic computer knowledge</span>
          </div>
        </div>
      </div>
    </div>
  );
}
