'use client';

export default function DashboardPage() {
  // Demo data - in production this comes from the API
  const user = {
    firstName: 'Demo',
    lastName: 'Student',
    xpPoints: 250,
    level: 'BEGINNER',
    currentStreak: 3,
  };

  const stats = [
    { label: 'Total XP', value: '250', icon: '⚡', color: 'text-yellow-400' },
    { label: 'Courses Enrolled', value: '2', icon: '📚', color: 'text-blue-400' },
    { label: 'Labs Completed', value: '1', icon: '🧪', color: 'text-green-400' },
    { label: 'Day Streak', value: '3', icon: '🔥', color: 'text-orange-400' },
  ];

  const activeLabs = [
    { title: 'Linux Intrusion Investigation', slug: 'linux-intrusion-investigation', timeRemaining: '45:22', status: 'running' },
  ];

  const recentLabHistory = [
    { title: 'File Permissions Lab', status: 'COMPLETED', duration: '22 min', score: 100 },
    { title: 'Network Scanning', status: 'EXPIRED', duration: '45 min', score: 50 },
  ];

  const continueLearning = [
    { title: 'Introduction to Cybersecurity', progress: 45, slug: 'intro-to-cybersecurity', path: 'Cybersecurity Foundations' },
    { title: 'Networking Fundamentals', progress: 20, slug: 'networking-fundamentals', path: 'Network Security' },
  ];

  const recommendedPaths = [
    { title: 'Cybersecurity Foundations', description: 'Start here — learn core concepts', difficulty: 'BEGINNER', icon: '🛡️', color: '#00d4ff' },
    { title: 'Linux Security', description: 'Master the command line', difficulty: 'INTERMEDIATE', icon: '🐧', color: '#10b981' },
    { title: 'Web Application Security', description: 'Understand web vulnerabilities', difficulty: 'INTERMEDIATE', icon: '🔒', color: '#f59e0b' },
  ];

  const recentBadges = [
    { name: 'First Steps', icon: '🚀', description: 'Completed first lesson' },
  ];

  const skillProgress = [
    { name: 'Foundations', progress: 45, color: '#00d4ff' },
    { name: 'Networking', progress: 20, color: '#8b5cf6' },
    { name: 'Linux', progress: 0, color: '#10b981' },
    { name: 'Web Security', progress: 0, color: '#f59e0b' },
    { name: 'Ethical Hacking', progress: 0, color: '#ef4444' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, <span className="text-cyber-400">{user.firstName}</span>!
        </h1>
        <p className="text-dark-400 mt-1">Continue your cybersecurity learning journey.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-dark-400">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Labs Section */}
      {activeLabs.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span>🧪</span> Active Labs
          </h2>
          {activeLabs.map((lab) => (
            <a key={lab.slug} href={`/labs/${lab.slug}`} className="block">
              <div className="card-hover border-green-500/20 bg-green-500/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <div>
                      <h3 className="font-medium text-white">{lab.title}</h3>
                      <p className="text-xs text-dark-400">Running — click to open terminal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-green-400">{lab.timeRemaining}</span>
                    <span className="text-xs text-dark-500">remaining</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Recent Lab Activity */}
      {recentLabHistory.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span>📋</span> Recent Lab Activity
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {recentLabHistory.map((lab, idx) => (
              <div key={idx} className="card flex items-center gap-3">
                <span className={`text-lg ${lab.status === 'COMPLETED' ? '' : 'opacity-50'}`}>
                  {lab.status === 'COMPLETED' ? '✅' : '⏰'}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{lab.title}</p>
                  <p className="text-xs text-dark-400">{lab.duration} · {lab.score}% score</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  lab.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                }`}>
                  {lab.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span>📖</span> Continue Learning
          </h2>
          {continueLearning.map((course) => (
            <div key={course.slug} className="card-hover">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-white">{course.title}</h3>
                  <p className="text-sm text-dark-400">{course.path}</p>
                </div>
                <span className="text-sm font-medium text-cyber-400">{course.progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${course.progress}%` }} />
              </div>
            </div>
          ))}

          {/* Recommended Next */}
          <h2 className="text-lg font-semibold flex items-center gap-2 pt-4">
            <span>🎯</span> Recommended For You
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {recommendedPaths.map((path) => (
              <div key={path.title} className="card-hover text-center">
                <span className="text-3xl block mb-2">{path.icon}</span>
                <h3 className="font-medium text-white text-sm mb-1">{path.title}</h3>
                <p className="text-xs text-dark-400 mb-2">{path.description}</p>
                <span className={`badge-${path.difficulty.toLowerCase()}`}>{path.difficulty}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Skill Progress */}
          <div className="card">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span>📊</span> Skill Progress
            </h3>
            <div className="space-y-3">
              {skillProgress.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-dark-300">{skill.name}</span>
                    <span className="text-dark-400">{skill.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${skill.progress}%`, backgroundColor: skill.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Badges */}
          <div className="card">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span>🏆</span> Recent Badges
            </h3>
            {recentBadges.length > 0 ? (
              <div className="space-y-3">
                {recentBadges.map((badge) => (
                  <div key={badge.name} className="flex items-center gap-3">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <p className="text-sm font-medium">{badge.name}</p>
                      <p className="text-xs text-dark-400">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-dark-400">Complete lessons to earn badges!</p>
            )}
          </div>

          {/* Learning Streak */}
          <div className="card bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
            <div className="text-center">
              <span className="text-4xl">🔥</span>
              <p className="text-3xl font-bold text-orange-400 mt-2">{user.currentStreak} Days</p>
              <p className="text-sm text-dark-300 mt-1">Current Streak</p>
              <p className="text-xs text-dark-400 mt-2">Keep learning daily to maintain your streak!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
