'use client';

import Link from 'next/link';

// Icon components
const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const TerminalIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const FlagIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const BrainIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const CertIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-lg border-b border-dark-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cyber-400 rounded-lg flex items-center justify-center">
                <ShieldIcon />
              </div>
              <span className="text-xl font-bold">
                Cyber<span className="text-cyber-400">Sec</span> Academy
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-dark-300 hover:text-white transition-colors">Features</a>
              <a href="#paths" className="text-dark-300 hover:text-white transition-colors">Learning Paths</a>
              <a href="#labs" className="text-dark-300 hover:text-white transition-colors">Cyber Lab</a>
              <a href="#ctf" className="text-dark-300 hover:text-white transition-colors">CTF</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="btn-ghost">Log In</Link>
              <Link href="/register" className="btn-primary text-sm">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid-pattern opacity-50" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyber-400/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-400/10 border border-cyber-400/20 rounded-full mb-8">
            <span className="w-2 h-2 bg-cyber-400 rounded-full animate-pulse" />
            <span className="text-sm text-cyber-400">Platform Active — Start Learning Today</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            Learn Cybersecurity.
            <br />
            <span className="glow-text">Practice It. Master It.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-dark-300 max-w-3xl mx-auto mb-10">
            From fundamentals to professional-level skills through interactive lessons,
            isolated practical labs, CTF challenges, and real-world security scenarios.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/register" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
              Start Learning Free
            </Link>
            <Link href="/courses" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
              Explore Cyber Lab
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '10+', label: 'Learning Paths' },
              { value: '100+', label: 'Interactive Lessons' },
              { value: '30+', label: 'Practical Labs' },
              { value: '50+', label: 'CTF Challenges' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-cyber-400">{stat.value}</div>
                <div className="text-sm text-dark-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Everything You Need to Become a Security Professional</h2>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              Not just courses — a complete cybersecurity ecosystem for learning, practicing, and mastering security skills.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <TerminalIcon />,
                title: 'Practical Cyber Labs',
                description: 'Isolated environments where you execute real commands, investigate systems, and solve security challenges hands-on.',
                color: 'text-green-400',
                bgColor: 'bg-green-400/10',
              },
              {
                icon: <FlagIcon />,
                title: 'CTF Challenges',
                description: 'Capture The Flag challenges across web, network, crypto, forensics, and more. Compete on leaderboards.',
                color: 'text-orange-400',
                bgColor: 'bg-orange-400/10',
              },
              {
                icon: <ShieldIcon />,
                title: 'SOC Simulator',
                description: 'Realistic Security Operations Center with alerts, logs, incidents, and investigation workflows.',
                color: 'text-blue-400',
                bgColor: 'bg-blue-400/10',
              },
              {
                icon: <BrainIcon />,
                title: 'AI Cyber Mentor',
                description: 'An AI assistant that explains concepts at your level, provides hints, and adapts to your learning pace.',
                color: 'text-purple-400',
                bgColor: 'bg-purple-400/10',
              },
              {
                icon: <ChartIcon />,
                title: 'Progress & Skills',
                description: 'Track your journey with skill trees, XP, badges, streaks, and detailed analytics on your growth.',
                color: 'text-yellow-400',
                bgColor: 'bg-yellow-400/10',
              },
              {
                icon: <CertIcon />,
                title: 'Certifications',
                description: 'Earn verifiable certificates by completing learning paths, practical assessments, and capstone projects.',
                color: 'text-cyan-400',
                bgColor: 'bg-cyan-400/10',
              },
            ].map((feature) => (
              <div key={feature.title} className="card-hover group">
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section id="paths" className="py-20 bg-dark-850/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Structured Learning Paths</h2>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              Follow a guided progression from absolute beginner to cybersecurity professional.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {[
              { name: 'Foundations', level: 'Beginner', color: '#00d4ff', icon: '🛡️' },
              { name: 'Networking', level: 'Intermediate', color: '#8b5cf6', icon: '🌐' },
              { name: 'Linux Security', level: 'Intermediate', color: '#10b981', icon: '🐧' },
              { name: 'Web Security', level: 'Intermediate', color: '#f59e0b', icon: '🔒' },
              { name: 'Ethical Hacking', level: 'Advanced', color: '#ef4444', icon: '🎯' },
              { name: 'SOC & Blue Team', level: 'Advanced', color: '#3b82f6', icon: '👁️' },
              { name: 'Digital Forensics', level: 'Advanced', color: '#6366f1', icon: '🔍' },
              { name: 'Cloud Security', level: 'Advanced', color: '#06b6d4', icon: '☁️' },
              { name: 'Cryptography', level: 'Intermediate', color: '#d946ef', icon: '🔐' },
              { name: 'DevSecOps', level: 'Professional', color: '#84cc16', icon: '⚙️' },
            ].map((path) => (
              <div
                key={path.name}
                className="card-hover text-center group"
                style={{ borderColor: `${path.color}20` }}
              >
                <div className="text-3xl mb-3">{path.icon}</div>
                <h3 className="font-semibold text-white text-sm mb-1">{path.name}</h3>
                <span className="text-xs text-dark-400">{path.level}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">How Learning Works</h2>
            <p className="text-dark-400 text-lg">Every topic follows our proven methodology</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Learn', description: 'Read theory with simple explanations, diagrams, and real-world examples.' },
              { step: '02', title: 'Practice', description: 'Open isolated lab environments and follow guided practical exercises.' },
              { step: '03', title: 'Challenge', description: 'Solve CTF challenges and security scenarios independently.' },
              { step: '04', title: 'Master', description: 'Complete assessments, earn certificates, and level up.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyber-400/10 border border-cyber-400/30 flex items-center justify-center">
                  <span className="text-cyber-400 font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-dark-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card p-12 border-cyber-400/20">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Cybersecurity Journey?</h2>
            <p className="text-dark-300 mb-8 text-lg">
              Join thousands of learners building real-world security skills through hands-on practice.
            </p>
            <Link href="/register" className="btn-primary text-lg px-10 py-4 inline-block">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-700/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-cyber-400 rounded-lg flex items-center justify-center text-dark-900">
                  <ShieldIcon />
                </div>
                <span className="font-bold">CyberSec Academy</span>
              </div>
              <p className="text-dark-400 text-sm">
                World-class cybersecurity education through interactive learning and practical labs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-dark-400">
                <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cyber Labs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">CTF Challenges</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Certifications</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Learning</h4>
              <ul className="space-y-2 text-sm text-dark-400">
                <li><a href="#" className="hover:text-white transition-colors">For Beginners</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Professionals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Teams</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Skill Tree</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-dark-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Responsible Use</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-dark-700/50 text-center text-sm text-dark-500">
            <p>All practical activities are designed for authorized educational environments only.</p>
            <p className="mt-1">&copy; 2024 CyberSec Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
