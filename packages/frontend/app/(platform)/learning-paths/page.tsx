'use client';

import Link from 'next/link';

const learningPaths = [
  { slug: 'cybersecurity-foundations', title: 'Cybersecurity Foundations', description: 'Start your cybersecurity journey from zero. Learn core concepts, terminology, and fundamental security principles.', difficulty: 'BEGINNER', hours: 40, courses: 4, icon: '🛡️', color: '#00d4ff', progress: 45 },
  { slug: 'network-security', title: 'Network Security', description: 'Master networking fundamentals and learn how to secure network infrastructure against threats.', difficulty: 'INTERMEDIATE', hours: 60, courses: 5, icon: '🌐', color: '#8b5cf6', progress: 20 },
  { slug: 'linux-security', title: 'Linux Security', description: 'Learn Linux from basics to advanced security hardening. Essential for every security professional.', difficulty: 'INTERMEDIATE', hours: 50, courses: 4, icon: '🐧', color: '#10b981', progress: 0 },
  { slug: 'web-application-security', title: 'Web Application Security', description: 'Understand web vulnerabilities, learn to identify them, and implement secure solutions.', difficulty: 'INTERMEDIATE', hours: 70, courses: 6, icon: '🔒', color: '#f59e0b', progress: 0 },
  { slug: 'ethical-hacking', title: 'Ethical Hacking', description: 'Learn authorized security testing methodologies in controlled environments.', difficulty: 'ADVANCED', hours: 80, courses: 7, icon: '🎯', color: '#ef4444', progress: 0 },
  { slug: 'soc-blue-team', title: 'SOC & Blue Team', description: 'Learn Security Operations Center workflows, incident detection, and defensive security.', difficulty: 'ADVANCED', hours: 70, courses: 5, icon: '👁️', color: '#3b82f6', progress: 0 },
  { slug: 'digital-forensics', title: 'Digital Forensics', description: 'Learn evidence collection, analysis methodology, and forensic investigation techniques.', difficulty: 'ADVANCED', hours: 60, courses: 4, icon: '🔍', color: '#6366f1', progress: 0 },
  { slug: 'cloud-security', title: 'Cloud Security', description: 'Secure cloud infrastructure across AWS, Azure, and GCP platforms.', difficulty: 'ADVANCED', hours: 65, courses: 5, icon: '☁️', color: '#06b6d4', progress: 0 },
  { slug: 'cryptography', title: 'Cryptography', description: 'Understand encryption, hashing, certificates, and cryptographic protocols.', difficulty: 'INTERMEDIATE', hours: 35, courses: 3, icon: '🔐', color: '#d946ef', progress: 0 },
  { slug: 'devsecops', title: 'DevSecOps', description: 'Integrate security into CI/CD pipelines, container security, and infrastructure-as-code.', difficulty: 'PROFESSIONAL', hours: 55, courses: 4, icon: '⚙️', color: '#84cc16', progress: 0 },
];

export default function LearningPathsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Learning Paths</h1>
        <p className="text-dark-400 mt-1">Structured progression from beginner to cybersecurity professional</p>
      </div>

      {/* Progression Overview */}
      <div className="card bg-gradient-to-r from-cyber-400/5 to-purple-500/5 border-cyber-400/20">
        <h3 className="font-semibold mb-3">Your Recommended Journey</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {['Foundations', 'Networking', 'Linux', 'Web Security', 'Ethical Hacking', 'SOC', 'Advanced'].map((step, idx) => (
            <div key={step} className="flex items-center gap-2 flex-shrink-0">
              <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${idx < 1 ? 'bg-cyber-400/20 text-cyber-400' : idx < 2 ? 'bg-dark-700 text-dark-300' : 'bg-dark-800 text-dark-500'}`}>
                {step}
              </div>
              {idx < 6 && <span className="text-dark-600">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Paths Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {learningPaths.map((path) => (
          <Link key={path.slug} href={`/learning-paths/${path.slug}`}>
            <div className="card-hover group h-full" style={{ borderColor: `${path.color}15` }}>
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{path.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white group-hover:text-cyber-400 transition-colors">{path.title}</h3>
                    <span className={`badge-${path.difficulty.toLowerCase()}`}>{path.difficulty}</span>
                  </div>
                  <p className="text-sm text-dark-400 mb-3">{path.description}</p>
                  <div className="flex items-center gap-4 text-xs text-dark-500">
                    <span>{path.hours}h total</span>
                    <span>{path.courses} courses</span>
                  </div>
                  {path.progress > 0 && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-dark-400">Progress</span>
                        <span style={{ color: path.color }}>{path.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="h-full rounded-full" style={{ width: `${path.progress}%`, backgroundColor: path.color }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
