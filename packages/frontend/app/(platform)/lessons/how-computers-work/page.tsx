'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HowComputersWorkLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">How Computers Work</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-beginner">BEGINNER</span>
          <span className="text-xs text-dark-500">Module 2 · Lesson 7</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">How Computers Work (CPU, RAM, Storage)</h1>
        <p className="text-dark-400 leading-relaxed">
          Every cyber attack targets a computer component. To defend systems, you must first
          understand what's inside them. This lesson explains hardware in the simplest way possible.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 25 minutes</span><span>⚡ +15 XP</span><span>📖 Theory</span>
        </div>
      </div>

      <div className="space-y-10">

        {/* Section 1: The Restaurant Analogy */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">1</span>
            Understanding a Computer — The Restaurant Analogy
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            A computer is like a <strong className="text-white">restaurant kitchen</strong>:
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {[
              { component: 'CPU (Processor)', analogy: 'The Chef', what: 'Does all the actual work — calculations, decisions, executing instructions. The "brain" of the computer.', speed: '4-5 billion operations per second', security: 'CPU vulnerabilities (Spectre, Meltdown) can leak data between programs' },
              { component: 'RAM (Memory)', analogy: 'The Counter Space', what: 'Temporary workspace. Holds whatever the CPU is currently working on. Fast but loses everything when power is off.', speed: '40-50 GB/s bandwidth', security: 'Malware hides in RAM to avoid disk-based antivirus. RAM forensics can reveal attacker activity.' },
              { component: 'Storage (SSD/HDD)', analogy: 'The Pantry/Refrigerator', what: 'Permanent storage. Keeps files, programs, OS even when off. Slower than RAM but much larger.', speed: 'SSD: 3-7 GB/s, HDD: 100-200 MB/s', security: 'Deleted files can be recovered (forensics). Full-disk encryption protects if stolen.' },
              { component: 'Network Interface', analogy: 'The Delivery Door', what: 'Connects computer to other computers. Sends and receives data over network/internet.', speed: '1-10 Gbps typical', security: 'Every network connection is a potential entry point for attackers. Firewall controls this door.' },
              { component: 'Motherboard', analogy: 'The Kitchen Floor Plan', what: 'Connects all components together. Everything plugs into it. Routes data between CPU, RAM, storage, network.', speed: 'N/A - it\'s the highway', security: 'BIOS/UEFI attacks can persist even after OS reinstall (very advanced)' },
              { component: 'GPU (Graphics)', analogy: 'The Salad Chef', what: 'Specialized processor for repetitive parallel tasks. Originally for graphics, now also used for AI and password cracking.', speed: 'Thousands of cores, slower per core', security: 'GPUs crack passwords: 10+ billion hashes/second. Also used for cryptomining malware.' },
            ].map((item) => (
              <div key={item.component} className="card-glass p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-cyber-400">{item.component}</span>
                  <span className="text-[10px] text-dark-600">= {item.analogy}</span>
                </div>
                <p className="text-xs text-dark-300 mb-2">{item.what}</p>
                <p className="text-[10px] text-dark-500 mb-1"><strong>Speed:</strong> {item.speed}</p>
                <p className="text-[10px] text-red-400/70"><strong>Security:</strong> {item.security}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: How They Work Together */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">2</span>
            How They Work Together — Opening a File
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            When you double-click a file, here's what actually happens inside:
          </p>

          <div className="space-y-2">
            {[
              { step: 1, what: 'You double-click "report.pdf"', who: 'Mouse → OS', detail: 'Operating system receives the click event' },
              { step: 2, what: 'OS finds the file on storage', who: 'OS → Storage (SSD)', detail: 'Looks up file location in the file system table' },
              { step: 3, what: 'File data copied to RAM', who: 'Storage → RAM', detail: 'File contents loaded into fast memory for quick access' },
              { step: 4, what: 'CPU processes the file', who: 'RAM → CPU', detail: 'CPU reads instructions to render the PDF (decode images, format text)' },
              { step: 5, what: 'Result sent to display', who: 'CPU → GPU → Monitor', detail: 'GPU renders the visual output on your screen' },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                <div className="w-6 h-6 bg-cyber-400/10 rounded-lg flex items-center justify-center text-[10px] text-cyber-400 font-bold border border-cyber-400/20 flex-shrink-0">{s.step}</div>
                <div className="flex-1">
                  <p className="text-sm text-white">{s.what}</p>
                  <p className="text-[10px] text-dark-500">{s.who} — {s.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="callout-security mt-4">
            <p className="text-xs"><strong>Security angle:</strong> Malware exploits this process. A malicious PDF could contain code that, when CPU processes it (step 4), executes attacker commands instead of just displaying the document. This is called a <strong>malicious payload in a file</strong>.</p>
          </div>
        </section>

        {/* Section 3: Storage & Data Persistence */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">3</span>
            Why "Deleted" Files Aren't Really Deleted
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            When you delete a file, the computer doesn't erase the data. It just marks the space as "available" — 
            like removing a book from the library catalog but leaving it on the shelf.
          </p>

          <div className="card-glass p-5 mb-4">
            <p className="text-sm text-white font-medium mb-3">What actually happens:</p>
            <div className="space-y-2 text-xs text-dark-400">
              <p>1. You delete "secret.txt" → OS removes the filename from the directory listing</p>
              <p>2. The actual data (01100101 01101110...) is STILL on the disk</p>
              <p>3. That space is marked as "available" for new data</p>
              <p>4. Until something else overwrites that exact location, the data is recoverable</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card-glass p-4 border-l-4 border-l-red-500">
              <p className="text-xs font-semibold text-red-400 mb-1">⚠️ Security Risk:</p>
              <p className="text-[11px] text-dark-400">If you sell/dispose of a hard drive without proper wiping, anyone with forensic tools can recover your "deleted" files — photos, documents, passwords, everything.</p>
            </div>
            <div className="card-glass p-4 border-l-4 border-l-emerald-500">
              <p className="text-xs font-semibold text-emerald-400 mb-1">✓ Protection:</p>
              <p className="text-[11px] text-dark-400">Use full-disk encryption (BitLocker, LUKS). Even if data is recovered, it's unreadable without the key. Or use secure deletion tools that overwrite with random data.</p>
            </div>
          </div>

          <div className="callout-info mt-4">
            <p className="text-xs"><strong>Forensics fact:</strong> Digital forensics investigators routinely recover "deleted" data from criminal suspects' devices. This is why cybercriminals use encrypted drives and data wiping tools.</p>
          </div>
        </section>

        {/* Section 4: RAM and Volatile Data */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">4</span>
            RAM — Where Secrets Live Temporarily
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            RAM holds whatever you're currently doing. When you type your password into a website, 
            that password exists in RAM briefly. When you turn off the computer, RAM is erased.
          </p>

          <div className="space-y-3">
            <div className="card-glass p-4">
              <p className="text-sm text-white font-medium mb-2">What's in RAM right now (on any running computer):</p>
              <ul className="text-xs text-dark-400 space-y-1 ml-3 list-disc">
                <li>Your currently open programs and their data</li>
                <li>Encryption keys being used for active connections</li>
                <li>Recently typed passwords (before they're processed)</li>
                <li>Contents of files you have open</li>
                <li>Your browser session cookies and tokens</li>
                <li>Network connection details</li>
              </ul>
            </div>
            <div className="callout-danger">
              <p className="text-xs"><strong>Attack vector:</strong> Advanced attackers can dump RAM contents (memory forensics). If they get your computer while it's running, they can extract passwords, encryption keys, and session tokens directly from memory. This is why locking your screen AND shutting down for high-security situations matters.</p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• <strong>CPU</strong> = brain (processes), <strong>RAM</strong> = short-term memory (temporary), <strong>Storage</strong> = long-term memory (permanent)</li>
            <li>• Every component has security implications — CPU bugs, RAM forensics, storage recovery</li>
            <li>• "Deleted" files aren't erased until overwritten — use encryption or secure wiping</li>
            <li>• RAM contains sensitive data (passwords, keys) — power off for maximum security</li>
            <li>• GPUs can crack passwords at 10+ billion attempts/second — length matters!</li>
            <li>• Full-disk encryption is the best defense against physical device theft</li>
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
          <Link href="/lessons/authentication-passwords" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: Authentication & Passwords</Link>
          <Link href="/lessons/operating-systems-explained" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: Operating Systems Explained →</Link>
        </div>
      </div>
    </div>
  );
}
