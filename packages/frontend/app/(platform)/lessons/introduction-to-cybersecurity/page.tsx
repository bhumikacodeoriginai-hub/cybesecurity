'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function IntroToCybersecurityLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses" className="hover:text-white">Courses</Link>
        <span className="text-dark-700">/</span>
        <Link href="/courses/intro-to-cybersecurity" className="hover:text-white">Introduction to Cybersecurity</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">What is Cybersecurity?</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-beginner">BEGINNER</span>
          <span className="text-xs text-dark-500">Module 1 · Lesson 1 of 20</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">What is Cybersecurity?</h1>
        <p className="text-dark-400 leading-relaxed">
          Before you can protect something, you need to understand what you're protecting and who wants to attack it.
          This lesson explains cybersecurity in the simplest possible way.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 20 minutes</span>
          <span>⚡ +15 XP</span>
          <span>📖 Theory</span>
          <span>🎯 No prerequisites</span>
        </div>
      </div>

      <div className="space-y-10">
        {/* Section 1 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">1</span>
            The Simplest Definition
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            <strong className="text-white">Cybersecurity</strong> is the practice of protecting computers, servers, phones,
            networks, and data from people who want to steal, damage, or misuse them.
          </p>
          <div className="callout-info">
            <p className="text-sm font-medium mb-2">🏠 Think of it like home security:</p>
            <ul className="text-xs space-y-1.5 opacity-90">
              <li>• Your <strong>house</strong> = Your computer/server</li>
              <li>• Your <strong>valuables</strong> = Your data (passwords, photos, money, health records)</li>
              <li>• Your <strong>door lock</strong> = Your password/encryption</li>
              <li>• Your <strong>security camera</strong> = Monitoring/logging software</li>
              <li>• A <strong>burglar</strong> = A hacker/attacker</li>
              <li>• A <strong>security guard</strong> = A cybersecurity professional (YOU, soon!)</li>
            </ul>
          </div>
          <p className="text-dark-300 leading-relaxed mt-4">
            Just like your home has a lock, alarm, and maybe a camera — computers need digital versions of these protections.
            Without them, anyone can walk in and take whatever they want.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">2</span>
            Why Does Cybersecurity Matter? (Real Examples)
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            Cybersecurity isn't just for big companies. It affects <strong className="text-white">every single person</strong> who uses a phone, computer, or the internet:
          </p>

          <div className="grid gap-4 mb-4">
            <div className="card-glass p-4 border-l-4 border-l-red-500">
              <p className="text-sm font-medium text-white mb-1">💳 Example 1: Your Bank Account</p>
              <p className="text-xs text-dark-400 leading-relaxed">
                Someone gets your online banking password. They transfer all your money to their account in another country.
                You wake up with ₹0. This happens to <strong>thousands of people every day</strong> due to weak passwords and phishing emails.
              </p>
            </div>
            <div className="card-glass p-4 border-l-4 border-l-amber-500">
              <p className="text-sm font-medium text-white mb-1">📸 Example 2: Your Personal Photos</p>
              <p className="text-xs text-dark-400 leading-relaxed">
                A hacker breaks into your cloud storage (Google Drive, iCloud). They download all your private photos and
                threaten to share them publicly unless you pay money. This is called <strong>ransomware/extortion</strong>.
              </p>
            </div>
            <div className="card-glass p-4 border-l-4 border-l-purple-500">
              <p className="text-sm font-medium text-white mb-1">🏥 Example 3: Hospital Systems</p>
              <p className="text-xs text-dark-400 leading-relaxed">
                Hackers lock all computers in a hospital with ransomware. Doctors can't access patient records.
                Surgeries are cancelled. People could die. This happened to <strong>WannaCry attack (2017)</strong> — 
                200,000 computers in 150 countries were locked in one day.
              </p>
            </div>
            <div className="card-glass p-4 border-l-4 border-l-blue-500">
              <p className="text-sm font-medium text-white mb-1">🏢 Example 4: Company Data Breach</p>
              <p className="text-xs text-dark-400 leading-relaxed">
                Hackers steal 147 million people's personal data (names, addresses, Social Security numbers) from Equifax in 2017.
                Victims face identity theft for years. The company pays $700 million in fines.
                <strong> A single security mistake caused all of this.</strong>
              </p>
            </div>
          </div>

          <div className="callout-security">
            <p className="text-xs">
              <strong>Key point:</strong> Cybersecurity isn't about being paranoid. It's about understanding that
              digital systems have weaknesses, and knowing how to protect them. That's what you're learning here.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">3</span>
            What Exactly Are We Protecting?
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            In cybersecurity, we protect <strong className="text-white">digital assets</strong>. An asset is anything valuable that could be targeted:
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { icon: '💾', name: 'Data', examples: 'Passwords, emails, files, photos, financial records, medical records' },
              { icon: '💻', name: 'Devices', examples: 'Computers, phones, tablets, servers, IoT devices, routers' },
              { icon: '🌐', name: 'Networks', examples: 'Wi-Fi, company networks, the internet, VPNs' },
              { icon: '🔧', name: 'Applications', examples: 'Websites, mobile apps, databases, operating systems' },
              { icon: '👤', name: 'Identity', examples: 'Usernames, passwords, biometrics, access permissions' },
              { icon: '💰', name: 'Money', examples: 'Bank accounts, cryptocurrency, payment systems' },
            ].map((asset) => (
              <div key={asset.name} className="card-glass p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{asset.icon}</span>
                  <span className="text-sm font-semibold text-white">{asset.name}</span>
                </div>
                <p className="text-xs text-dark-500">{asset.examples}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">4</span>
            Who Are the Attackers?
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            Attackers (also called "threat actors") have different motivations. Understanding WHO attacks helps you understand HOW to defend:
          </p>

          <div className="space-y-3">
            {[
              { type: 'Script Kiddies', icon: '👶', motive: 'Fun, showing off', skill: 'Low', danger: 'Low-Medium', desc: 'Young or inexperienced people using pre-made hacking tools they don\'t fully understand. They follow tutorials without knowing the underlying concepts.' },
              { type: 'Cybercriminals', icon: '💰', motive: 'Money', skill: 'Medium-High', danger: 'High', desc: 'Organized groups that steal money, credit cards, personal data. They sell stolen data on the dark web or use ransomware to demand payment.' },
              { type: 'Hacktivists', icon: '✊', motive: 'Political/social cause', skill: 'Medium', danger: 'Medium', desc: 'Groups like Anonymous who hack organizations to make a political statement. They might deface websites or leak documents.' },
              { type: 'Nation-State Actors', icon: '🏛️', motive: 'Espionage, warfare', skill: 'Very High', danger: 'Very High', desc: 'Government-sponsored hackers. They target other countries\' infrastructure, steal military secrets, or disrupt elections.' },
              { type: 'Insider Threats', icon: '🏢', motive: 'Revenge, money', skill: 'Varies', danger: 'Very High', desc: 'Employees or contractors who misuse their legitimate access. Most dangerous because they\'re already inside the defenses.' },
            ].map((attacker) => (
              <div key={attacker.type} className="card-glass p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{attacker.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white">{attacker.type}</h4>
                    <div className="flex gap-4 mt-0.5">
                      <span className="text-[10px] text-dark-500">Motive: <span className="text-dark-300">{attacker.motive}</span></span>
                      <span className="text-[10px] text-dark-500">Skill: <span className="text-dark-300">{attacker.skill}</span></span>
                      <span className="text-[10px] text-dark-500">Danger: <span className="text-dark-300">{attacker.danger}</span></span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-dark-400 leading-relaxed">{attacker.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">5</span>
            The Main Areas of Cybersecurity
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            Cybersecurity is a huge field. Here are the main areas (you'll learn all of these in this platform):
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { area: 'Network Security', icon: '🌐', desc: 'Protecting data as it moves between computers. Firewalls, VPNs, intrusion detection.' },
              { area: 'Application Security', icon: '🔒', desc: 'Making sure websites and apps don\'t have vulnerabilities hackers can exploit.' },
              { area: 'Cloud Security', icon: '☁️', desc: 'Securing data stored in cloud services like AWS, Azure, Google Cloud.' },
              { area: 'Identity & Access', icon: '🔑', desc: 'Controlling who can access what. Passwords, multi-factor authentication, permissions.' },
              { area: 'Incident Response', icon: '🚨', desc: 'What to do AFTER an attack happens. Detecting, containing, and recovering from breaches.' },
              { area: 'Security Operations', icon: '👁️', desc: 'Monitoring systems 24/7 for threats. SOC analysts watch for suspicious activity.' },
              { area: 'Cryptography', icon: '🔐', desc: 'Using math to protect data. Encryption makes information unreadable without a key.' },
              { area: 'Digital Forensics', icon: '🔍', desc: 'Investigating cyber crimes. Finding evidence of what happened and who did it.' },
            ].map((item) => (
              <div key={item.area} className="card-glass p-4 hover:border-cyber-400/20 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-semibold text-white">{item.area}</span>
                </div>
                <p className="text-xs text-dark-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">6</span>
            Key Terminology (Words You'll Use Every Day)
          </h2>

          <div className="card-glass overflow-hidden p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="text-left px-4 py-3 text-xs text-dark-400 font-medium w-1/4">Term</th>
                  <th className="text-left px-4 py-3 text-xs text-dark-400 font-medium w-1/3">Simple Definition</th>
                  <th className="text-left px-4 py-3 text-xs text-dark-400 font-medium">Real Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr><td className="px-4 py-3 text-cyber-400 font-medium">Vulnerability</td><td className="px-4 py-3 text-dark-300 text-xs">A weakness that can be exploited</td><td className="px-4 py-3 text-dark-500 text-xs">A website that doesn't check input properly</td></tr>
                <tr><td className="px-4 py-3 text-cyber-400 font-medium">Threat</td><td className="px-4 py-3 text-dark-300 text-xs">Something that could cause harm</td><td className="px-4 py-3 text-dark-500 text-xs">A hacker targeting your company</td></tr>
                <tr><td className="px-4 py-3 text-cyber-400 font-medium">Exploit</td><td className="px-4 py-3 text-dark-300 text-xs">The actual method used to attack</td><td className="px-4 py-3 text-dark-500 text-xs">SQL injection code that bypasses login</td></tr>
                <tr><td className="px-4 py-3 text-cyber-400 font-medium">Malware</td><td className="px-4 py-3 text-dark-300 text-xs">Malicious software (virus, trojan, ransomware)</td><td className="px-4 py-3 text-dark-500 text-xs">WannaCry ransomware that locked hospitals</td></tr>
                <tr><td className="px-4 py-3 text-cyber-400 font-medium">Phishing</td><td className="px-4 py-3 text-dark-300 text-xs">Fake email/website to steal credentials</td><td className="px-4 py-3 text-dark-500 text-xs">"Your bank account is locked! Click here"</td></tr>
                <tr><td className="px-4 py-3 text-cyber-400 font-medium">Encryption</td><td className="px-4 py-3 text-dark-300 text-xs">Scrambling data so only authorized people can read it</td><td className="px-4 py-3 text-dark-500 text-xs">HTTPS makes your browser traffic unreadable to hackers</td></tr>
                <tr><td className="px-4 py-3 text-cyber-400 font-medium">Firewall</td><td className="px-4 py-3 text-dark-300 text-xs">A digital wall that blocks unauthorized traffic</td><td className="px-4 py-3 text-dark-500 text-xs">Blocks connections from suspicious IP addresses</td></tr>
                <tr><td className="px-4 py-3 text-cyber-400 font-medium">Patch</td><td className="px-4 py-3 text-dark-300 text-xs">An update that fixes a security bug</td><td className="px-4 py-3 text-dark-500 text-xs">Windows Update fixing a vulnerability</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 7 - Summary */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">✓</span>
            Summary — What You Learned
          </h2>
          <div className="card-glass p-5">
            <ul className="space-y-2 text-sm text-dark-300">
              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Cybersecurity = protecting digital systems and data from attacks</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> It affects everyone — individuals, companies, hospitals, governments</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Digital assets include data, devices, networks, applications, identity, and money</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Attackers range from script kiddies to nation-state actors</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> The field covers network security, app security, cloud, forensics, and more</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Key terms: vulnerability, threat, exploit, malware, phishing, encryption, firewall</li>
            </ul>
          </div>
        </section>

        {/* Quiz Preview */}
        <section className="card border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-transparent">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">❓ Quick Check — Test Your Understanding</h3>
          <div className="space-y-3">
            <div className="p-3 bg-white/[0.02] rounded-xl">
              <p className="text-sm text-white mb-2">Q1: Which of the following is the BEST definition of cybersecurity?</p>
              <div className="space-y-1.5 text-xs text-dark-400">
                <div className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border border-dark-600 flex items-center justify-center text-[8px]">A</span> Writing code for websites</div>
                <div className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border border-emerald-500/50 bg-emerald-500/10 flex items-center justify-center text-[8px] text-emerald-400">B</span><span className="text-emerald-400"> Protecting systems and data from unauthorized access and attacks</span></div>
                <div className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border border-dark-600 flex items-center justify-center text-[8px]">C</span> Installing antivirus software</div>
                <div className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border border-dark-600 flex items-center justify-center text-[8px]">D</span> Using strong passwords only</div>
              </div>
            </div>
          </div>
        </section>

        {/* Complete + Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (
            <span className="text-emerald-400 text-sm flex items-center gap-2">✅ Lesson Completed! +15 XP</span>
          ) : <div/>}
          <button onClick={() => setCompleted(true)} disabled={completed} className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <div/>
          <Link href="/lessons/the-cia-triad" className="flex items-center gap-2 text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">
            Next: The CIA Triad (Confidentiality, Integrity, Availability)
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
