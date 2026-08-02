import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-glow pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-400 to-cyan-300 flex items-center justify-center shadow-lg shadow-cyber-400/25">
            <svg className="w-5 h-5 text-dark-950" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="leading-tight">
            <span className="font-extrabold text-lg tracking-tight">CyberSec</span>
            <span className="text-[9px] text-dark-500 block -mt-0.5 tracking-[0.25em] uppercase">Academy</span>
          </div>
        </div>
        <Link href="/courses" className="btn-primary text-sm px-5 py-2.5">
          Open Platform
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 pt-16 sm:pt-28 pb-24 sm:pb-36 text-center">
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-cyber-400/20 bg-cyber-400/[0.06] backdrop-blur-sm mb-10">
          <span className="w-2 h-2 rounded-full bg-cyber-400 animate-pulse-slow" />
          <span className="text-[11px] font-semibold text-cyber-400 tracking-wide uppercase">72 Lessons &middot; 10 Labs &middot; Production Ready</span>
        </div>

        <h1 className="text-[2.75rem] sm:text-6xl md:text-[5.5rem] font-black tracking-[-0.03em] leading-[1.05]">
          <span className="glow-text">Cybersecurity</span>
          <br />
          <span className="text-dark-200">Training Platform</span>
        </h1>

        <p className="text-base sm:text-lg text-dark-400 max-w-xl mx-auto mt-7 leading-relaxed">
          Enterprise-grade curriculum. Real terminal commands with real outputs. Hands-on labs in isolated environments. Zero to professional.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <Link href="/courses" className="btn-primary w-full sm:w-auto text-sm px-8 py-3.5">
            Start Curriculum
          </Link>
          <Link href="/labs" className="btn-secondary w-full sm:w-auto text-sm px-8 py-3.5">
            Explore Labs
          </Link>
        </div>
      </section>

      {/* Metrics */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { v: '10', l: 'Modules' },
            { v: '72', l: 'Lessons' },
            { v: '10', l: 'Labs' },
            { v: '50+', l: 'Hours' },
          ].map((m) => (
            <div key={m.l} className="card p-4 sm:p-5 text-center">
              <p className="text-2xl sm:text-3xl font-black text-white">{m.v}</p>
              <p className="text-[10px] text-dark-500 mt-1 uppercase tracking-[0.15em] font-medium">{m.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 pb-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">Structured Curriculum</h2>
          <p className="text-dark-500 text-sm mt-2">Beginner to advanced. Each module builds on the previous.</p>
        </div>
        <div className="grid gap-2">
          {[
            { n: '01', t: 'Introduction to Cybersecurity', c: '#00e5ff' },
            { n: '02', t: 'Linux Fundamentals', c: '#10b981' },
            { n: '03', t: 'Computer Networking', c: '#8b5cf6' },
            { n: '04', t: 'Network Security', c: '#3b82f6' },
            { n: '05', t: 'Web Application Security', c: '#f59e0b' },
            { n: '06', t: 'Cryptography', c: '#ec4899' },
            { n: '07', t: 'Ethical Hacking & Pentesting', c: '#ef4444' },
            { n: '08', t: 'SOC & Incident Response', c: '#6366f1' },
            { n: '09', t: 'Cloud & Infrastructure Security', c: '#f97316' },
            { n: '10', t: 'DevSecOps & Secure Development', c: '#14b8a6' },
          ].map((mod) => (
            <div key={mod.n} className="flex items-center gap-4 px-5 py-3.5 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <span className="text-[11px] font-mono text-dark-500 w-5">{mod.n}</span>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: mod.c }} />
              <span className="text-sm font-medium text-dark-200">{mod.t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-[11px] text-dark-400 font-medium">Developed by Raghavendra N</p>
            <p className="text-[10px] text-dark-600 mt-0.5">Code Origin.AI Private Limited</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/courses" className="text-[11px] text-dark-400 hover:text-white transition-colors">Courses</Link>
            <Link href="/labs" className="text-[11px] text-dark-400 hover:text-white transition-colors">Labs</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
