import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-glow pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <Image src="/logo.jpeg" alt="CodeOrigin.ai" width={40} height={40} className="rounded-xl object-contain" priority />
          <div className="leading-tight">
            <span className="font-bold text-base tracking-tight text-white">CyberSec</span>
            <span className="text-[8px] text-dark-400 block font-mono tracking-[0.2em]">by CodeOrigin.ai</span>
          </div>
        </div>
        <Link href="/courses" className="btn-primary text-xs px-4 py-2">
          ENTER PLATFORM
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 pt-20 sm:pt-32 pb-24 sm:pb-40 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md border border-neon/20 bg-neon/5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-glow-pulse" />
          <span className="text-[10px] font-mono font-bold text-neon tracking-wider uppercase">SYSTEM ONLINE // 72 MODULES LOADED</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05]">
          <span className="glow-text">HACK</span>
          <span className="text-white"> THE</span>
          <br />
          <span className="text-white">LEARNING </span>
          <span className="glow-text">CURVE</span>
        </h1>

        <p className="text-sm sm:text-base text-dark-200 max-w-lg mx-auto mt-6 leading-relaxed font-mono">
          Cybersecurity training platform. Real commands. Real outputs. Isolated lab environments. Zero to professional.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <Link href="/courses" className="btn-primary w-full sm:w-auto text-xs px-8 py-3">
            START TRAINING
          </Link>
          <Link href="/labs" className="btn-secondary w-full sm:w-auto text-xs px-8 py-3">
            LAUNCH LABS
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { v: '10', l: 'MODULES' },
            { v: '72', l: 'LESSONS' },
            { v: '10', l: 'LABS' },
            { v: '50+', l: 'HOURS' },
          ].map((m) => (
            <div key={m.l} className="card text-center py-5">
              <p className="text-2xl sm:text-3xl font-black font-mono glow-text">{m.v}</p>
              <p className="text-[9px] text-dark-300 mt-1.5 font-mono tracking-[0.2em]">{m.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neon/20 to-transparent" />
          <span className="text-[9px] font-mono text-dark-300 tracking-[0.3em] uppercase">CURRICULUM</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neon/20 to-transparent" />
        </div>
        <div className="space-y-1">
          {[
            'Introduction to Cybersecurity',
            'Linux Fundamentals',
            'Computer Networking',
            'Network Security',
            'Web Application Security',
            'Cryptography',
            'Ethical Hacking & Pentesting',
            'SOC & Incident Response',
            'Cloud & Infrastructure Security',
            'DevSecOps & Secure Development',
          ].map((title, i) => (
            <Link key={i} href="/courses" className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-neon/5 hover:border-neon/10 border border-transparent transition-all group">
              <span className="text-[10px] font-mono text-dark-400 w-6">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-sm text-dark-100 group-hover:text-neon transition-colors">{title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-neon/8 py-10">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-neon animate-glow-pulse" />
              <span className="text-[9px] font-mono text-dark-400 tracking-[0.3em]">DEVELOPED BY</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black glow-text tracking-tight">RAGHAVENDRA N</h3>
            <div className="flex items-center gap-3">
              <Image src="/logo.jpeg" alt="CodeOrigin.ai" width={36} height={36} className="rounded-lg object-contain" />
              <div>
                <span className="text-sm font-bold text-amber-400">CodeOrigin.ai</span>
                <span className="text-[10px] text-dark-400 block">Private Limited</span>
              </div>
            </div>
            <div className="flex items-center gap-6 mt-4">
              <Link href="/courses" className="text-[10px] font-mono text-dark-300 hover:text-neon transition-colors tracking-wider">COURSES</Link>
              <Link href="/labs" className="text-[10px] font-mono text-dark-300 hover:text-neon transition-colors tracking-wider">LABS</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
