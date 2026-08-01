'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function OperatingSystemsLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">Operating Systems Explained</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-beginner">BEGINNER</span>
          <span className="text-xs text-dark-500">Module 2 · Lesson 8</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Operating Systems Explained</h1>
        <p className="text-dark-400 leading-relaxed">
          The operating system (OS) is the most critical software on any computer. It controls everything —
          who can access files, what programs can run, and how hardware is used. Understanding the OS
          is essential for both attacking and defending systems.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 20 minutes</span><span>⚡ +15 XP</span><span>📖 Theory</span>
        </div>
      </div>

      <div className="space-y-10">

        {/* Section 1: What is an OS? */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">1</span>
            What is an Operating System?
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            An operating system is the <strong className="text-white">manager of the computer</strong>. It sits between
            your programs and the hardware, controlling access to everything.
          </p>

          <div className="callout-info">
            <p className="text-sm font-medium mb-2">🏢 Office Building Analogy:</p>
            <p className="text-xs opacity-90">
              The OS is like the <strong>building management company</strong>. It decides who gets keys to which rooms (access control),
              manages the electricity and water (hardware resources), schedules conference rooms (CPU time),
              and handles maintenance (updates/patches). Without it, the building is chaos.
            </p>
          </div>

          <div className="card-glass p-5 mt-4">
            <p className="text-sm text-white font-medium mb-3">The OS does 5 main jobs:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { job: 'Process Management', desc: 'Runs multiple programs simultaneously, gives each CPU time', example: 'Chrome, Spotify, and antivirus all running at once' },
                { job: 'Memory Management', desc: 'Allocates RAM to programs, prevents one from accessing another\'s memory', example: 'Your browser can\'t read your banking app\'s memory' },
                { job: 'File System Management', desc: 'Organizes data on storage, controls who can read/write files', example: '/etc/shadow readable only by root — not regular users' },
                { job: 'Device Management', desc: 'Talks to hardware (keyboard, screen, network card) via drivers', example: 'USB drive auto-detected and mounted when plugged in' },
                { job: 'Security & Access Control', desc: 'Enforces user accounts, permissions, and privilege levels', example: 'Regular user can\'t install software without admin password' },
              ].map((item) => (
                <div key={item.job} className="p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                  <p className="text-xs font-semibold text-cyber-400">{item.job}</p>
                  <p className="text-[11px] text-dark-400 mt-1">{item.desc}</p>
                  <p className="text-[10px] text-dark-600 mt-1 italic">Example: {item.example}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Windows vs Linux vs macOS */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">2</span>
            The Three Main Operating Systems
          </h2>

          <div className="grid gap-4">
            {[
              {
                name: 'Linux', icon: '🐧', usage: 'Servers (90%+), cybersecurity tools, cloud infrastructure, Android',
                security: 'Open source (code auditable), strong permission model, frequent patches, most hacking tools built for it',
                whyLearn: 'MANDATORY for cybersecurity. 90% of servers run Linux. All security tools (Nmap, Metasploit, Wireshark) run on it.',
                versions: 'Ubuntu, Kali Linux (security), CentOS, Debian, Fedora',
                marketShare: '~3% desktop, ~90% servers, 72% mobile (Android)',
              },
              {
                name: 'Windows', icon: '🪟', usage: 'Desktops (73%), enterprise environments, gaming',
                security: 'Most targeted OS (largest user base), frequent malware, Active Directory for enterprise, Windows Defender',
                whyLearn: 'Most companies use Windows. You need to understand Active Directory, Group Policy, Windows Event Logs, PowerShell.',
                versions: 'Windows 10, Windows 11, Windows Server 2019/2022',
                marketShare: '~73% desktop, ~30% servers',
              },
              {
                name: 'macOS', icon: '🍎', usage: 'Creative professionals, developers, some enterprise',
                security: 'Unix-based (similar to Linux), fewer malware targets, Gatekeeper for app verification',
                whyLearn: 'Understanding Unix fundamentals helps with both macOS and Linux. Terminal commands are nearly identical.',
                versions: 'macOS Sonoma, macOS Ventura',
                marketShare: '~15% desktop, <1% servers',
              },
            ].map((os) => (
              <div key={os.name} className="card-glass p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{os.icon}</span>
                  <div>
                    <h3 className="text-base font-bold text-white">{os.name}</h3>
                    <p className="text-[10px] text-dark-500">Market: {os.marketShare}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div><span className="text-dark-400 font-medium">Used for:</span><p className="text-dark-500 mt-0.5">{os.usage}</p></div>
                  <div><span className="text-dark-400 font-medium">Security:</span><p className="text-dark-500 mt-0.5">{os.security}</p></div>
                  <div className="sm:col-span-2"><span className="text-emerald-400 font-medium">Why learn it:</span><p className="text-dark-400 mt-0.5">{os.whyLearn}</p></div>
                  <div className="sm:col-span-2"><span className="text-dark-500 font-medium">Versions:</span><span className="text-dark-600 ml-2">{os.versions}</span></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Kernel & User Space */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">3</span>
            Kernel vs User Space — The Security Boundary
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            The OS has two main zones. Understanding this boundary is critical for security:
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card-glass p-4 border-t-4 border-t-red-500">
              <h4 className="text-sm font-bold text-red-400 mb-2">🔒 Kernel Space (Ring 0)</h4>
              <p className="text-xs text-dark-300 mb-2">The OS core. Has FULL access to hardware and memory.</p>
              <ul className="text-xs text-dark-500 space-y-1 ml-3 list-disc">
                <li>Manages hardware directly</li>
                <li>Can read/write ANY memory address</li>
                <li>A bug here = entire system crash (BSOD/kernel panic)</li>
                <li>Rootkits target kernel space for invisible persistence</li>
              </ul>
            </div>
            <div className="card-glass p-4 border-t-4 border-t-emerald-500">
              <h4 className="text-sm font-bold text-emerald-400 mb-2">👤 User Space (Ring 3)</h4>
              <p className="text-xs text-dark-300 mb-2">Where your programs run. Limited access, isolated from others.</p>
              <ul className="text-xs text-dark-500 space-y-1 ml-3 list-disc">
                <li>Can only access its own memory</li>
                <li>Must ASK the kernel for hardware access (system calls)</li>
                <li>A crash here = just that program dies</li>
                <li>Most malware runs here (easier to detect/remove)</li>
              </ul>
            </div>
          </div>

          <div className="callout-warning mt-4">
            <p className="text-xs"><strong>Security implication:</strong> If malware gets <strong>kernel access</strong> (a "rootkit"), it's nearly invisible — it can hide files, processes, and network connections from all user-space tools including antivirus. This is why keeping the OS patched is critical — kernel vulnerabilities are the most dangerous.</p>
          </div>
        </section>

        {/* Section 4: Why Linux for Cybersecurity */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">4</span>
            Why Every Security Professional Needs Linux
          </h2>

          <div className="grid gap-3">
            {[
              { reason: '90% of servers run Linux', detail: 'The systems you\'ll defend (and attackers target) are almost all Linux. AWS, Azure, Google Cloud — all Linux.' },
              { reason: 'All major security tools are Linux-based', detail: 'Nmap, Metasploit, Wireshark, Burp Suite, John the Ripper, Hashcat — all built for/on Linux.' },
              { reason: 'Kali Linux = security professional\'s toolkit', detail: 'Kali comes pre-installed with 600+ security tools. It\'s the industry standard for penetration testing.' },
              { reason: 'Open source = transparency', detail: 'You can read Linux source code. No hidden backdoors. Security researchers audit it constantly.' },
              { reason: 'Command line = power and automation', detail: 'GUI is limited. Command line lets you automate, script, and perform complex operations impossible in Windows GUI.' },
              { reason: 'Required for certifications', detail: 'CEH, OSCP, CompTIA Security+, CySA+ — all require Linux knowledge. Most CTFs run on Linux.' },
            ].map((item) => (
              <div key={item.reason} className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <div>
                  <p className="text-sm text-white font-medium">{item.reason}</p>
                  <p className="text-xs text-dark-500 mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• The OS manages processes, memory, files, devices, and security</li>
            <li>• Linux (servers), Windows (desktops), macOS (dev/creative) — know all three</li>
            <li>• Kernel space has full access; user space is limited — this boundary is a security feature</li>
            <li>• Linux is MANDATORY for cybersecurity — 90% of servers, all security tools, all certifications</li>
            <li>• Open source = auditable = more trustworthy for security-critical systems</li>
            <li>• Next lesson: You'll start using Linux hands-on</li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (<span className="text-emerald-400 text-sm">✅ Completed! +15 XP</span>) : <div/>}
          <button onClick={() => setCompleted(true)} disabled={completed} className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <Link href="/lessons/how-computers-work" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: How Computers Work</Link>
          <Link href="/lessons/processes-services-daemons" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: Processes, Services & Daemons →</Link>
        </div>
      </div>
    </div>
  );
}
