'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#030712] overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-cyber-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyber-400/20">
                <svg className="w-5 h-5 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Cyber<span className="glow-text">Sec</span> Academy
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-dark-400 hover:text-white transition-colors">Features</a>
              <a href="#paths" className="text-sm text-dark-400 hover:text-white transition-colors">Paths</a>
              <a href="#labs" className="text-sm text-dark-400 hover:text-white transition-colors">Labs</a>
              <a href="#how" className="text-sm text-dark-400 hover:text-white transition-colors">How It Works</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="btn-primary text-sm px-5 py-2.5">Open Platform</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 min-h-screen flex items-center">
        {/* Background effects */}
        <div className="absolute inset-0 cyber-grid" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyber-400/8 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text Content */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-full mb-8 backdrop-blur-sm">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs text-dark-300">Platform Active — Real Labs, Real Skills</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
                Learn Cybersecurity
                <br />
                <span className="glow-text">By Actually Doing It.</span>
              </h1>

              <p className="text-lg text-dark-400 leading-relaxed max-w-xl mb-10">
                Not just theory. Execute real commands in isolated labs.
                Investigate real attacks. Build real skills that employers demand.
                From zero to professional — step by step.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/dashboard" className="btn-primary text-base px-8 py-4">
                  Start Learning Now
                </Link>
                <Link href="/labs" className="btn-secondary text-base px-8 py-4">
                  Explore Cyber Labs
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 text-sm text-dark-500">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  No setup required
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  100% isolated labs
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Real commands
                </span>
              </div>
            </div>

            {/* Right: Terminal Preview */}
            <div className="hidden lg:block animate-fade-in-up stagger-2">
              <div className="terminal-window animate-float">
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <div className="terminal-dot bg-red-500/80" />
                    <div className="terminal-dot bg-yellow-500/80" />
                    <div className="terminal-dot bg-green-500/80" />
                  </div>
                  <span className="text-[11px] text-dark-500 font-mono">student@cybersec-lab:~</span>
                  <div />
                </div>
                <div className="p-5 font-mono text-[13px] space-y-3">
                  <div>
                    <span className="text-emerald-400">student@lab</span><span className="text-dark-500">:</span><span className="text-blue-400">~</span><span className="text-dark-500">$ </span>
                    <span className="text-white">cat /etc/passwd | grep bash</span>
                  </div>
                  <div className="text-dark-400 leading-relaxed">
                    root:x:0:0:root:/root:/bin/bash<br/>
                    student:x:1000:1000::/home/student:/bin/bash<br/>
                    <span className="text-red-400">h4cker_user:x:1001:1001::/home/h4cker:/bin/bash</span>
                  </div>
                  <div className="mt-4">
                    <span className="text-emerald-400">student@lab</span><span className="text-dark-500">:</span><span className="text-blue-400">~</span><span className="text-dark-500">$ </span>
                    <span className="text-white">grep &quot;Failed&quot; /var/log/auth.log</span>
                  </div>
                  <div className="text-dark-400 leading-relaxed">
                    <span className="text-amber-400">Failed password</span> for root from <span className="text-red-400">192.168.1.50</span> port 4321<br/>
                    <span className="text-amber-400">Failed password</span> for root from <span className="text-red-400">192.168.1.50</span> port 4321<br/>
                    <span className="text-amber-400">Failed password</span> for root from <span className="text-red-400">192.168.1.50</span> port 4321
                  </div>
                  <div className="mt-4">
                    <span className="text-emerald-400">student@lab</span><span className="text-dark-500">:</span><span className="text-blue-400">~</span><span className="text-dark-500">$ </span>
                    <span className="text-cyber-400 animate-blink">_</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative py-8 border-y border-white/[0.04] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10+', label: 'Learning Paths', sub: 'Foundation → Professional' },
              { value: '100+', label: 'Practical Lessons', sub: 'With real commands' },
              { value: '30+', label: 'Isolated Labs', sub: 'Docker containers' },
              { value: '26', label: 'CTF Challenges', sub: '7 categories' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold glow-text">{stat.value}</div>
                <div className="text-sm text-white font-medium mt-1">{stat.label}</div>
                <div className="text-xs text-dark-500 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 dot-grid opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Not Another Course Website.<br/>
              <span className="glow-text">A Complete Cyber Range.</span>
            </h2>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              Every concept comes with real commands you can execute,
              real outputs you can observe, and real understanding of WHY.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🖥️', title: 'Real Terminal Labs', desc: 'Execute actual Linux/network commands in isolated Docker containers. Not simulations — real environments.', color: 'from-emerald-500/20 to-emerald-500/0' },
              { icon: '🚩', title: 'CTF Challenges', desc: '26 challenges across Web, Network, Linux, Crypto, Forensics, Cloud. Submit flags, earn points, climb the leaderboard.', color: 'from-orange-500/20 to-orange-500/0' },
              { icon: '🔍', title: 'SOC Simulator', desc: 'Investigate real security incidents. Triage alerts, analyze logs, detect threats like a real SOC analyst.', color: 'from-blue-500/20 to-blue-500/0' },
              { icon: '📋', title: 'Step-by-Step Depth', desc: 'Every command explained: What it does, WHY it works, expected output, common mistakes, security relevance.', color: 'from-purple-500/20 to-purple-500/0' },
              { icon: '🎯', title: 'Objective Validation', desc: 'Labs check your work automatically. Complete objectives, get instant feedback, earn XP and badges.', color: 'from-amber-500/20 to-amber-500/0' },
              { icon: '🏆', title: 'Progression System', desc: 'XP, levels, badges, streaks, leaderboards. Track your growth from beginner to professional.', color: 'from-rose-500/20 to-rose-500/0' },
            ].map((feature) => (
              <div key={feature.title} className="card-hover group">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative">
                  <span className="text-3xl block mb-4">{feature.icon}</span>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-dark-400 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24 relative border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Learn → Practice → <span className="glow-text">Master</span>
            </h2>
            <p className="text-dark-400 text-lg">Every topic follows our proven 4-step methodology</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Understand', desc: 'Read clear explanations with diagrams. Know WHAT and WHY before touching a keyboard.', icon: '📖' },
              { step: '02', title: 'Execute', desc: 'Open a real isolated terminal. Run actual commands. See real outputs. No simulations.', icon: '💻' },
              { step: '03', title: 'Investigate', desc: 'Solve challenges independently. Analyze logs. Find vulnerabilities. Think like an attacker.', icon: '🔍' },
              { step: '04', title: 'Validate', desc: 'System checks your objectives automatically. Earn XP, badges, and advance to the next level.', icon: '✅' },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-cyber-400/30 transition-all duration-300">
                  {item.icon}
                </div>
                <div className="text-xs text-cyber-400 font-mono mb-2">{item.step}</div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-dark-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section id="paths" className="py-24 relative border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              From Zero to <span className="glow-text">Professional</span>
            </h2>
            <p className="text-dark-400 text-lg">Clear progression. No guesswork. Every step builds on the last.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { name: 'Foundations', level: 'Beginner', icon: '🛡️', hours: 40 },
              { name: 'Networking', level: 'Intermediate', icon: '🌐', hours: 60 },
              { name: 'Linux Security', level: 'Intermediate', icon: '🐧', hours: 50 },
              { name: 'Web Security', level: 'Intermediate', icon: '🔒', hours: 70 },
              { name: 'Ethical Hacking', level: 'Advanced', icon: '🎯', hours: 80 },
              { name: 'SOC / Blue Team', level: 'Advanced', icon: '👁️', hours: 70 },
              { name: 'Digital Forensics', level: 'Advanced', icon: '🔍', hours: 60 },
              { name: 'Cloud Security', level: 'Advanced', icon: '☁️', hours: 65 },
              { name: 'Cryptography', level: 'Intermediate', icon: '🔐', hours: 35 },
              { name: 'DevSecOps', level: 'Professional', icon: '⚙️', hours: 55 },
            ].map((path) => (
              <Link key={path.name} href="/learning-paths">
                <div className="card-hover text-center p-5 group h-full">
                  <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">{path.icon}</div>
                  <h3 className="text-sm font-semibold text-white mb-1">{path.name}</h3>
                  <p className="text-[11px] text-dark-500">{path.level} · {path.hours}h</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-400/5 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="card-glow p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Real Security Skills?</h2>
            <p className="text-dark-400 mb-8 text-lg">
              Stop watching. Start doing. Every minute in a lab is worth hours of reading.
            </p>
            <Link href="/dashboard" className="btn-primary text-lg px-10 py-4 inline-block">
              Open Platform — Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-12 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-cyber-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-semibold text-sm">CyberSec Academy</span>
            </div>
            <p className="text-xs text-dark-600 text-center">
              All practical activities are for authorized educational environments only.
            </p>
            <p className="text-xs text-dark-600">&copy; 2024 CyberSec Academy</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
