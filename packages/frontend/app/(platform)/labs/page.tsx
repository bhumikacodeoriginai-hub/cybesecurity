'use client';

const labs = [
  { id: '1', title: 'Linux Filesystem Navigation', description: 'Navigate the Linux filesystem, find hidden files, and understand directory permissions.', difficulty: 'BEGINNER', duration: 30, category: 'Linux', status: 'available', tools: ['Terminal', 'Bash'] },
  { id: '2', title: 'Network Scanning Basics', description: 'Learn to discover hosts and services on an authorized network using standard tools.', difficulty: 'BEGINNER', duration: 45, category: 'Network', status: 'available', tools: ['Nmap', 'Terminal'] },
  { id: '3', title: 'Web Application Reconnaissance', description: 'Explore a deliberately vulnerable web application and identify security issues.', difficulty: 'INTERMEDIATE', duration: 60, category: 'Web Security', status: 'available', tools: ['Browser', 'DevTools', 'curl'] },
  { id: '4', title: 'Log Analysis for Intrusion Detection', description: 'Analyze system logs to identify signs of unauthorized access and suspicious activity.', difficulty: 'INTERMEDIATE', duration: 45, category: 'SOC', status: 'available', tools: ['Terminal', 'grep', 'awk'] },
  { id: '5', title: 'Password Cracking Concepts', description: 'Understand how password hashing works and why strong passwords matter.', difficulty: 'INTERMEDIATE', duration: 40, category: 'Crypto', status: 'available', tools: ['Terminal', 'John', 'hashcat'] },
  { id: '6', title: 'Firewall Configuration', description: 'Configure iptables rules to secure a Linux server in an isolated lab.', difficulty: 'ADVANCED', duration: 60, category: 'Network', status: 'locked', tools: ['Terminal', 'iptables'] },
];

export default function LabsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">🧪 Cyber Lab</h1>
        <p className="text-dark-400 mt-1">Hands-on practical exercises in isolated, secure environments</p>
      </div>

      {/* Lab Info Banner */}
      <div className="card bg-gradient-to-r from-cyber-400/5 to-blue-500/5 border-cyber-400/20">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🔬</span>
          <div>
            <h3 className="font-semibold text-white mb-1">How Labs Work</h3>
            <p className="text-sm text-dark-300">
              Each lab provisions an isolated environment just for you. Follow the guided instructions,
              execute commands in the built-in terminal, and complete objectives to earn XP.
              Labs auto-expire after the time limit.
            </p>
          </div>
        </div>
      </div>

      {/* Lab Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {labs.map((lab) => (
          <div key={lab.id} className={`card ${lab.status === 'locked' ? 'opacity-60' : 'hover:border-cyber-400/30 transition-all cursor-pointer'}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white">{lab.title}</h3>
                  {lab.status === 'locked' && <span className="text-dark-500">🔒</span>}
                </div>
                <span className="text-xs text-dark-500">{lab.category}</span>
              </div>
              <span className={`badge-${lab.difficulty.toLowerCase()}`}>{lab.difficulty}</span>
            </div>

            <p className="text-sm text-dark-400 mb-4">{lab.description}</p>

            {/* Tools */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {lab.tools.map((tool) => (
                <span key={tool} className="px-2 py-0.5 bg-dark-700 rounded text-xs text-dark-300 font-mono">
                  {tool}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-dark-700/50">
              <span className="text-xs text-dark-500 flex items-center gap-1">
                🕐 {lab.duration} min
              </span>
              {lab.status === 'available' ? (
                <button className="btn-primary text-xs px-4 py-2">
                  Start Lab
                </button>
              ) : (
                <span className="text-xs text-dark-500">Complete prerequisites to unlock</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Safety Notice */}
      <div className="card bg-green-500/5 border-green-500/20">
        <p className="text-sm text-green-400/80 flex items-center gap-2">
          <span>✓</span>
          All labs run in completely isolated environments. No lab activity can affect production systems or the internet.
        </p>
      </div>
    </div>
  );
}
