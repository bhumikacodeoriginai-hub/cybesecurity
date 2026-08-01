'use client';

const skills = [
  { name: 'Cybersecurity Foundations', progress: 45, level: 'In Progress', color: '#00d4ff', icon: '🛡️', children: ['CIA Triad', 'Threats & Risks', 'Security Controls', 'Authentication'] },
  { name: 'Network Security', progress: 20, level: 'Started', color: '#8b5cf6', icon: '🌐', children: ['OSI Model', 'TCP/IP', 'DNS', 'Firewalls'] },
  { name: 'Linux Security', progress: 0, level: 'Locked', color: '#10b981', icon: '🐧', children: ['Filesystem', 'Permissions', 'Services', 'Hardening'] },
  { name: 'Web Application Security', progress: 0, level: 'Locked', color: '#f59e0b', icon: '🔒', children: ['HTTP', 'OWASP Top 10', 'XSS', 'Injection'] },
  { name: 'Ethical Hacking', progress: 0, level: 'Locked', color: '#ef4444', icon: '🎯', children: ['Recon', 'Scanning', 'Exploitation', 'Reporting'] },
  { name: 'SOC & Blue Team', progress: 0, level: 'Locked', color: '#3b82f6', icon: '👁️', children: ['SIEM', 'Alert Triage', 'Incident Response', 'Forensics'] },
  { name: 'Cloud Security', progress: 0, level: 'Locked', color: '#06b6d4', icon: '☁️', children: ['IAM', 'Storage', 'Networking', 'Monitoring'] },
  { name: 'DevSecOps', progress: 0, level: 'Locked', color: '#84cc16', icon: '⚙️', children: ['CI/CD', 'Container Security', 'SAST/DAST', 'IaC'] },
];

export default function SkillTreePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">🌳 Skill Tree</h1>
        <p className="text-dark-400 mt-1">Your cybersecurity skill progression — unlock new areas as you advance</p>
      </div>

      {/* Overall Level */}
      <div className="card bg-gradient-to-r from-cyber-400/5 to-purple-500/5 border-cyber-400/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-dark-400">Current Level</p>
            <p className="text-2xl font-bold text-cyber-400">Beginner</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-dark-400">Total XP</p>
            <p className="text-2xl font-bold text-yellow-400">250</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-dark-400">Next Level</p>
            <p className="text-sm text-dark-300">750 XP to Intermediate</p>
          </div>
        </div>
        <div className="mt-3 progress-bar">
          <div className="progress-bar-fill" style={{ width: '25%' }} />
        </div>
      </div>

      {/* Skill Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className={`card ${skill.progress > 0 ? 'border-l-4' : 'opacity-70'}`}
            style={{ borderLeftColor: skill.progress > 0 ? skill.color : undefined }}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{skill.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-white">{skill.name}</h3>
                  <span className={`text-xs ${skill.progress > 0 ? 'text-cyber-400' : 'text-dark-500'}`}>
                    {skill.level}
                  </span>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="progress-bar">
                    <div className="h-full rounded-full" style={{ width: `${skill.progress}%`, backgroundColor: skill.color }} />
                  </div>
                  <span className="text-xs text-dark-500 mt-1">{skill.progress}%</span>
                </div>

                {/* Sub-skills */}
                <div className="flex flex-wrap gap-1.5">
                  {skill.children.map((child, idx) => (
                    <span
                      key={child}
                      className={`px-2 py-0.5 rounded text-xs ${
                        idx === 0 && skill.progress > 30
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-dark-700 text-dark-500'
                      }`}
                    >
                      {child}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
