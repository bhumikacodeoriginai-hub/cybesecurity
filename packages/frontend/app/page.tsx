import Link from 'next/link';

const modules = [
  { n: 1, t: 'Introduction to Cybersecurity', d: 'BEGINNER', icon: '🛡️', c: '#00e5ff' },
  { n: 2, t: 'Linux Fundamentals', d: 'BEGINNER', icon: '🐧', c: '#10b981' },
  { n: 3, t: 'Computer Networking', d: 'BEGINNER', icon: '🌐', c: '#8b5cf6' },
  { n: 4, t: 'Network Security', d: 'INTERMEDIATE', icon: '🔒', c: '#3b82f6' },
  { n: 5, t: 'Web Application Security', d: 'INTERMEDIATE', icon: '🕸️', c: '#f59e0b' },
  { n: 6, t: 'Cryptography', d: 'INTERMEDIATE', icon: '🔐', c: '#ec4899' },
  { n: 7, t: 'Ethical Hacking & Pentesting', d: 'ADVANCED', icon: '💀', c: '#ef4444' },
  { n: 8, t: 'SOC & Incident Response', d: 'ADVANCED', icon: '🎯', c: '#6366f1' },
  { n: 9, t: 'Cloud & Infrastructure Security', d: 'ADVANCED', icon: '☁️', c: '#f97316' },
  { n: 10, t: 'DevSecOps & Secure Development', d: 'ADVANCED', icon: '⚙️', c: '#14b8a6' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-gradient-glow pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-gradient-to-br from-cyber-400 to-cyan-300 rounded-xl flex items-center justify-center shadow-lg shadow-cyber-400/25">
            <svg className="w-5 h-5 text-dark-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight">Cyber<span className="text-cyber-400">Sec</span></span>
        </div>
        <Link href="/courses" className="btn-primary text-sm px-5 py-2.5">
          Start Learning
        </Link>
      </nav>


      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 pt-16 sm:pt-24 pb-20 sm:pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-400/[0.08] border border-cyber-400/20 rounded-full text-xs text-cyber-400 font-medium mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 bg-cyber-400 rounded-full animate-pulse-slow" />
          10 Modules &middot; 72 Lessons &middot; 10 Hands-On Labs
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.08] mb-6">
          Learn <span className="glow-text">Cybersecurity</span>
          <br className="hidden sm:block" />
          <span className="text-dark-300"> From Zero to Pro</span>
        </h1>
        <p className="text-base sm:text-lg text-dark-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Real commands. Real outputs. Real labs. A structured path from
          complete beginner to job-ready security professional.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link href="/courses" className="btn-primary text-base w-full sm:w-auto px-8 py-4">
            Browse Curriculum
          </Link>
          <Link href="/labs" className="btn-secondary text-base w-full sm:w-auto px-8 py-4">
            Try a Lab
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 pb-20">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="card text-center p-6">
            <div className="text-3xl mb-3">💻</div>
            <h3 className="font-bold text-sm mb-1.5">Real Commands</h3>
            <p className="text-xs text-dark-400 leading-relaxed">Every lesson has actual terminal commands with real outputs. No placeholder content.</p>
          </div>
          <div className="card text-center p-6">
            <div className="text-3xl mb-3">🧪</div>
            <h3 className="font-bold text-sm mb-1.5">Hands-On Labs</h3>
            <p className="text-xs text-dark-400 leading-relaxed">Isolated Docker environments to practice attacks and defenses safely.</p>
          </div>
          <div className="card text-center p-6">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-bold text-sm mb-1.5">Structured Path</h3>
            <p className="text-xs text-dark-400 leading-relaxed">Lessons build on each other in logical order. Zero to professional, step by step.</p>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 pb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">Complete Curriculum</h2>
        <p className="text-dark-400 text-center mb-10 text-sm">10 modules in proper learning order. Each builds on the previous.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {modules.map((mod) => (
            <Link key={mod.n} href="/courses" className="card-hover p-4 flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border flex-shrink-0"
                style={{ backgroundColor: mod.c + '10', borderColor: mod.c + '25' }}>
                {mod.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white group-hover:text-cyber-400 transition-colors truncate">
                  {mod.n}. {mod.t}
                </p>
                <p className="text-[10px] text-dark-500 uppercase tracking-wider mt-0.5">{mod.d}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.04] py-8">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xs text-dark-500">Developed by <span className="text-dark-400 font-medium">Raghavendra N</span></p>
            <p className="text-[10px] text-dark-600 mt-0.5">Code Origin.AI Private Limited</p>
          </div>
          <Link href="/courses" className="text-xs text-cyber-400 hover:text-cyber-300 transition-colors">
            Start Learning &rarr;
          </Link>
        </div>
      </footer>
    </div>
  );
}
