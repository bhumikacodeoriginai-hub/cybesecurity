'use client';

import Link from 'next/link';

// Demo course detail data
const courseData = {
  title: 'Introduction to Cybersecurity',
  description: 'Learn what cybersecurity is, why it matters, and the fundamental concepts every security professional needs to know.',
  longDescription: 'This comprehensive course provides a solid foundation in cybersecurity. You will learn about the CIA Triad, threats, vulnerabilities, risk management, authentication, authorization, and security controls. By the end, you will have the knowledge to understand the cybersecurity landscape and be ready for more advanced topics.',
  difficulty: 'BEGINNER',
  durationHours: 8,
  path: { title: 'Cybersecurity Foundations', color: '#00d4ff' },
  skills: ['CIA Triad', 'Threat Analysis', 'Risk Assessment', 'Security Controls', 'Authentication', 'Authorization'],
  enrolled: 1240,
  modules: [
    {
      id: '1',
      title: 'What is Cybersecurity?',
      lessons: [
        { id: 'l1', title: 'Introduction to Cybersecurity', slug: 'introduction-to-cybersecurity', type: 'THEORY', duration: 20, completed: true },
        { id: 'l2', title: 'The CIA Triad', slug: 'the-cia-triad', type: 'THEORY', duration: 25, completed: true },
        { id: 'l3', title: 'Threats, Vulnerabilities, and Risks', slug: 'threats-vulnerabilities-risks', type: 'THEORY', duration: 30, completed: false },
        { id: 'l4', title: 'Security Controls and Defense', slug: 'security-controls-defense', type: 'THEORY', duration: 25, completed: false },
      ],
    },
    {
      id: '2',
      title: 'Authentication & Access Control',
      lessons: [
        { id: 'l5', title: 'Authentication Fundamentals', slug: 'authentication-fundamentals', type: 'THEORY', duration: 20, completed: false },
        { id: 'l6', title: 'Authorization and Access Control', slug: 'authorization-access-control', type: 'THEORY', duration: 25, completed: false },
      ],
    },
  ],
};

function getLessonIcon(type: string) {
  switch (type) {
    case 'THEORY': return '📖';
    case 'PRACTICAL': return '💻';
    case 'LAB': return '🧪';
    case 'QUIZ': return '❓';
    case 'CHALLENGE': return '🎯';
    default: return '📄';
  }
}

export default function CourseDetailPage() {
  const course = courseData;
  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = course.modules.reduce((sum, m) => sum + m.lessons.filter(l => l.completed).length, 0);
  const progress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="max-w-5xl space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-dark-400">
        <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
        <span>/</span>
        <span className="text-white">{course.title}</span>
      </nav>

      {/* Course Header */}
      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: course.path.color }} />
          <span className="text-sm text-dark-400">{course.path.title}</span>
          <span className="ml-2 badge-beginner">{course.difficulty}</span>
        </div>

        <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
        <p className="text-dark-300 mb-6">{course.longDescription}</p>

        {/* Course Meta */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-dark-400 mb-6">
          <span className="flex items-center gap-1">🕐 {course.durationHours} hours</span>
          <span className="flex items-center gap-1">📚 {course.modules.length} modules</span>
          <span className="flex items-center gap-1">📝 {totalLessons} lessons</span>
          <span className="flex items-center gap-1">👥 {course.enrolled.toLocaleString()} enrolled</span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {course.skills.map((skill) => (
            <span key={skill} className="px-3 py-1 bg-dark-700 border border-dark-600 rounded-full text-xs text-dark-200">
              {skill}
            </span>
          ))}
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-dark-300">{completedLessons}/{totalLessons} lessons completed</span>
              <span className="text-cyber-400 font-medium">{progress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <button className="btn-primary text-sm">Continue Learning</button>
        </div>
      </div>

      {/* Modules & Lessons */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Course Content</h2>

        {course.modules.map((module, idx) => (
          <div key={module.id} className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-dark-700 rounded-lg flex items-center justify-center text-sm font-medium text-dark-300">
                {idx + 1}
              </div>
              <div>
                <h3 className="font-semibold">{module.title}</h3>
                <p className="text-xs text-dark-400">
                  {module.lessons.length} lessons · {module.lessons.reduce((s, l) => s + l.duration, 0)} min
                </p>
              </div>
            </div>

            <div className="space-y-1 ml-11">
              {module.lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.slug}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-700/50 transition-colors group"
                >
                  <span className="text-lg">{getLessonIcon(lesson.type)}</span>
                  <div className="flex-1">
                    <p className={`text-sm ${lesson.completed ? 'text-dark-400' : 'text-white'} group-hover:text-cyber-400 transition-colors`}>
                      {lesson.title}
                    </p>
                    <p className="text-xs text-dark-500">{lesson.duration} min · {lesson.type}</p>
                  </div>
                  {lesson.completed ? (
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-dark-600 group-hover:text-cyber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
