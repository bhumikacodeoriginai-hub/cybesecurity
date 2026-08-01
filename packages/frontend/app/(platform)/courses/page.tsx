'use client';

import Link from 'next/link';

const courses = [
  {
    id: '1',
    title: 'Introduction to Cybersecurity',
    slug: 'intro-to-cybersecurity',
    description: 'Learn what cybersecurity is, why it matters, and the fundamental concepts every security professional needs.',
    difficulty: 'BEGINNER',
    durationHours: 8,
    path: 'Cybersecurity Foundations',
    pathColor: '#00d4ff',
    modules: 3,
    enrolled: 1240,
    skills: ['CIA Triad', 'Threat Analysis', 'Risk Assessment', 'Security Controls'],
  },
  {
    id: '2',
    title: 'Computer Fundamentals for Security',
    slug: 'computer-fundamentals-security',
    description: 'Understand how computers work at a fundamental level — essential for security analysis.',
    difficulty: 'BEGINNER',
    durationHours: 10,
    path: 'Cybersecurity Foundations',
    pathColor: '#00d4ff',
    modules: 4,
    enrolled: 980,
    skills: ['Operating Systems', 'File Systems', 'Processes', 'Memory'],
  },
  {
    id: '3',
    title: 'Networking Fundamentals',
    slug: 'networking-fundamentals',
    description: 'Master TCP/IP, DNS, HTTP, and network protocols essential for security professionals.',
    difficulty: 'BEGINNER',
    durationHours: 12,
    path: 'Network Security',
    pathColor: '#8b5cf6',
    modules: 5,
    enrolled: 1560,
    skills: ['TCP/IP', 'DNS', 'HTTP', 'Subnetting', 'Routing'],
  },
  {
    id: '4',
    title: 'Linux Fundamentals for Security',
    slug: 'linux-fundamentals-security',
    description: 'Master the Linux command line and understand Linux security from the ground up.',
    difficulty: 'BEGINNER',
    durationHours: 15,
    path: 'Linux Security',
    pathColor: '#10b981',
    modules: 6,
    enrolled: 2100,
    skills: ['Linux CLI', 'Permissions', 'User Management', 'Services'],
  },
  {
    id: '5',
    title: 'Web Security Fundamentals',
    slug: 'web-security-fundamentals',
    description: 'Learn HTTP, web architecture, and common vulnerabilities from the OWASP Top 10.',
    difficulty: 'INTERMEDIATE',
    durationHours: 15,
    path: 'Web Application Security',
    pathColor: '#f59e0b',
    modules: 7,
    enrolled: 1890,
    skills: ['HTTP', 'OWASP Top 10', 'XSS', 'SQL Injection'],
  },
  {
    id: '6',
    title: 'Introduction to Ethical Hacking',
    slug: 'intro-ethical-hacking',
    description: 'Learn the methodology, tools, and ethics of authorized security testing.',
    difficulty: 'INTERMEDIATE',
    durationHours: 12,
    path: 'Ethical Hacking',
    pathColor: '#ef4444',
    modules: 5,
    enrolled: 1450,
    skills: ['Reconnaissance', 'Scanning', 'Enumeration', 'Reporting'],
  },
  {
    id: '7',
    title: 'SOC Analyst Fundamentals',
    slug: 'soc-analyst-fundamentals',
    description: 'Learn Security Operations Center workflows, incident detection, and defensive security.',
    difficulty: 'INTERMEDIATE',
    durationHours: 14,
    path: 'SOC & Blue Team',
    pathColor: '#3b82f6',
    modules: 6,
    enrolled: 870,
    skills: ['Alert Triage', 'Log Analysis', 'SIEM', 'Incident Response'],
  },
];

function getDifficultyBadge(difficulty: string) {
  const classes: Record<string, string> = {
    BEGINNER: 'badge-beginner',
    INTERMEDIATE: 'badge-intermediate',
    ADVANCED: 'badge-advanced',
    PROFESSIONAL: 'badge-professional',
  };
  return <span className={classes[difficulty] || 'badge'}>{difficulty}</span>;
}

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Courses</h1>
        <p className="text-dark-400 mt-1">Explore our comprehensive cybersecurity curriculum</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-cyber-400/10 text-cyber-400 border border-cyber-400/30 rounded-lg text-sm font-medium">All</button>
        <button className="btn-ghost text-sm">Beginner</button>
        <button className="btn-ghost text-sm">Intermediate</button>
        <button className="btn-ghost text-sm">Advanced</button>
        <button className="btn-ghost text-sm">Professional</button>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link key={course.id} href={`/courses/${course.slug}`}>
            <div className="card-hover h-full flex flex-col">
              {/* Path indicator */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: course.pathColor }} />
                <span className="text-xs text-dark-400">{course.path}</span>
              </div>

              <h3 className="font-semibold text-white mb-2">{course.title}</h3>
              <p className="text-sm text-dark-400 mb-4 flex-1">{course.description}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {course.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="px-2 py-0.5 bg-dark-700 rounded text-xs text-dark-300">
                    {skill}
                  </span>
                ))}
                {course.skills.length > 3 && (
                  <span className="px-2 py-0.5 bg-dark-700 rounded text-xs text-dark-400">
                    +{course.skills.length - 3}
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-dark-700/50">
                <div className="flex items-center gap-3 text-xs text-dark-400">
                  <span>{course.durationHours}h</span>
                  <span>{course.modules} modules</span>
                </div>
                {getDifficultyBadge(course.difficulty)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
