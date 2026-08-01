'use client';

import Link from 'next/link';

export default function LearningPathDetailPage() {
  return (
    <div className="space-y-8">
      <nav className="flex items-center gap-2 text-sm text-dark-400">
        <Link href="/learning-paths" className="hover:text-white">Learning Paths</Link>
        <span>/</span>
        <span className="text-white">Cybersecurity Foundations</span>
      </nav>

      <div className="card">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">🛡️</span>
          <div>
            <h1 className="text-2xl font-bold">Cybersecurity Foundations</h1>
            <p className="text-dark-400">Start your cybersecurity journey from zero</p>
          </div>
          <span className="badge-beginner ml-auto">BEGINNER</span>
        </div>
        <p className="text-dark-300 mb-4">
          This learning path takes you from absolute beginner to having a solid understanding of cybersecurity fundamentals.
          You will learn about threats, vulnerabilities, security controls, authentication, networking basics, and more.
        </p>
        <div className="flex gap-6 text-sm text-dark-400">
          <span>🕐 40 hours</span>
          <span>📚 4 courses</span>
          <span>🧪 8 labs</span>
          <span>🎯 12 challenges</span>
        </div>
      </div>

      {/* Courses in this path */}
      <h2 className="text-xl font-semibold">Courses in this Path</h2>
      <div className="space-y-4">
        {[
          { num: 1, title: 'Introduction to Cybersecurity', slug: 'intro-to-cybersecurity', desc: 'Core concepts, CIA Triad, threats and risks', duration: '8h', progress: 45 },
          { num: 2, title: 'Computer Fundamentals for Security', slug: 'computer-fundamentals-security', desc: 'OS, processes, filesystems, and architecture', duration: '10h', progress: 0 },
          { num: 3, title: 'Security Principles & Frameworks', slug: 'security-principles', desc: 'Defense in depth, security models, compliance', duration: '12h', progress: 0 },
          { num: 4, title: 'Introduction to Security Tools', slug: 'intro-security-tools', desc: 'Essential tools every security professional uses', duration: '10h', progress: 0 },
        ].map((course) => (
          <Link key={course.num} href={`/courses/${course.slug}`}>
            <div className="card-hover flex items-center gap-4">
              <div className="w-10 h-10 bg-cyber-400/10 rounded-lg flex items-center justify-center text-cyber-400 font-bold flex-shrink-0">
                {course.num}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">{course.title}</h3>
                <p className="text-sm text-dark-400">{course.desc}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm text-dark-400">{course.duration}</p>
                {course.progress > 0 && (
                  <p className="text-xs text-cyber-400">{course.progress}% complete</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
