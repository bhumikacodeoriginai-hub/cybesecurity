import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-cyber-400/5 via-transparent to-transparent" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-cyber-400 to-cyber-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyber-400/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight">Cyber<span className="text-cyber-400">Sec</span></span>
        </div>
        <Link href="/courses" className="btn-primary text-sm">
          Start Learning
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-8 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyber-400/10 border border-cyber-400/20 rounded-full text-xs text-cyber-400 font-medium mb-8">
          <span className="w-1.5 h-1.5 bg-cyber-400 rounded-full animate-pulse" />
          10 Modules &middot; 72 Lessons &middot; 10 Hands-On Labs
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          Learn <span className="text-cyber-400">Cybersecurity</span>
          <br />From Zero to Professional
        </h1>
        <p className="text-lg md:text-xl text-dark-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Real commands. Real outputs. Real labs. A structured curriculum that takes you from
          complete beginner to job-ready security professional.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/courses" className="btn-primary text-base px-8 py-4">
            Browse Curriculum
          </Link>
          <Link href="/labs" className="btn-secondary text-base px-8 py-4">
            Try a Lab
          </Link>
        </div>
      </section>


      {/* Modules Preview */}
      <section className="relative z-10 max-w-6xl mx-auto px-8 pb-24">
        <h2 className="text-3xl font-bold text-center mb-4">Complete Curriculum</h2>
        <p className="text-dark-400 text-center mb-12 max-w-xl mx-auto">
          10 modules in proper learning order. Each builds on the previous.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { n: 1, t: 'Introduction to Cybersecurity', d: 'BEGINNER', icon: '🛡️', c: '#00d4ff' },
            { n: 2, t: 'Linux Fundamentals', d: 'BEGINNER', icon: '🐧', c: '#10b981' },
            { n: 3, t: 'Computer Networking', d: 'BEGINNER', icon: '🌐', c: '#8b5cf6' },
            { n: 4, t: 'Network Security', d: 'INTERMEDIATE', icon: '🔒', c: '#3b82f6' },
            { n: 5, t: 'Web Application Security', d: 'INTERMEDIATE', icon: '🕸️', c: '#f59e0b' },
            { n: 6, t: 'Cryptography', d: 'INTERMEDIATE', icon: '🔐', c: '#ec4899' },
            { n: 7, t: 'Ethical Hacking & Pentesting', d: 'ADVANCED', icon: '💀', c: '#ef4444' },
            { n: 8, t: 'SOC & Incident Response', d: 'ADVANCED', icon: '🎯', c: '#6366f1' },
            { n: 9, t: 'Cloud & Infrastructure Security', d: 'ADVANCED', icon: '☁️', c: '#f97316' },
            { n: 10, t: 'DevSecOps & Secure Development', d: 'ADVANCED', icon: '⚙️', c: '#14b8a6' },
          ].map((mod) => (
            <Link key={mod.n} href="/courses" className="flex items-center gap-4 p-4 rounded-xl border border-dark-700/50 bg-dark-800/30 hover:border-cyber-400/30 hover:bg-dark-800/60 transition-all group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg border flex-shrink-0"
                style={{ backgroundColor: mod.c + '10', borderColor: mod.c + '30' }}>
                {mod.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white group-hover:text-cyber-400 transition-colors">
                  {mod.n}. {mod.t}
                </p>
                <p className="text-[10px] text-dark-500 uppercase tracking-wider mt-0.5">{mod.d}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-5xl mx-auto px-8 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-3xl mb-3">💻</div>
            <h3 className="font-semibold mb-2">Real Commands</h3>
            <p className="text-sm text-dark-400">Every lesson shows actual terminal commands with real outputs — no fake or placeholder content.</p>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-3">🧪</div>
            <h3 className="font-semibold mb-2">Hands-On Labs</h3>
            <p className="text-sm text-dark-400">Isolated Docker environments where you practice attacks and defenses safely.</p>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold mb-2">Structured Path</h3>
            <p className="text-sm text-dark-400">Lessons build on each other in logical order. No jumping around confused.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-dark-700/50 py-8">
        <div className="max-w-5xl mx-auto px-8 flex items-center justify-between">
          <p className="text-xs text-dark-500">&copy; 2024 CyberSec Academy. Built for learners.</p>
          <Link href="/courses" className="text-xs text-cyber-400 hover:underline">Start Learning →</Link>
        </div>
      </footer>
    </div>
  );
}
