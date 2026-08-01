'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TypesOfCyberAttacksLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">Types of Cyber Attacks</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-beginner">BEGINNER</span>
          <span className="text-xs text-dark-500">Module 1 · Lesson 4</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Types of Cyber Attacks</h1>
        <p className="text-dark-400 leading-relaxed">
          Attackers use many different methods. Understanding each attack type helps you 
          recognize them and know which defenses to use. This lesson covers the 12 most
          common attack categories with real examples.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 35 minutes</span><span>⚡ +25 XP</span><span>📖 Theory + Examples</span>
        </div>
      </div>

      <div className="space-y-8">
        {/* Attack Types */}
        {[
          {
            num: 1, name: 'Phishing', icon: '🎣', severity: 'Very Common',
            what: 'Fake emails, messages, or websites designed to trick you into giving up passwords, credit cards, or clicking malicious links.',
            how: 'Attacker sends email pretending to be your bank: "Your account is locked! Click here to verify." The link goes to a fake site that steals your password.',
            example: 'In 2020, Twitter employees received phone calls from attackers pretending to be IT support. They gave up internal tool access. Result: 130 high-profile accounts hacked including Obama, Elon Musk, Apple.',
            defense: 'Check sender email carefully, hover over links before clicking, enable MFA, use email filters, security awareness training.',
          },
          {
            num: 2, name: 'Malware', icon: '🦠', severity: 'Very Common',
            what: 'Malicious software: viruses, trojans, ransomware, spyware, worms. Any software designed to harm.',
            how: 'User downloads "free software" from untrusted site. The installer contains a trojan that gives the attacker remote access to the computer.',
            example: 'WannaCry (2017): Ransomware that spread to 200,000+ computers in 150 countries in ONE day. Locked all files and demanded $300 Bitcoin. Hospitals, banks, telecom companies all affected.',
            defense: 'Keep software updated, use antivirus/EDR, don\'t download from untrusted sources, restrict admin privileges.',
          },
          {
            num: 3, name: 'SQL Injection', icon: '💉', severity: 'Common',
            what: 'Inserting malicious SQL code into a web form to manipulate the database behind a website.',
            how: 'Login form asks for username. Instead of typing "john", attacker types: \' OR 1=1 -- This tricks the database into returning all records.',
            example: 'In 2015, TalkTalk (UK telecom) was hacked via SQL injection. 157,000 customer records stolen including bank details. Company fined £400,000.',
            defense: 'Use parameterized queries (never concatenate user input into SQL), input validation, WAF (Web Application Firewall).',
          },
          {
            num: 4, name: 'DDoS (Distributed Denial of Service)', icon: '🌊', severity: 'Common',
            what: 'Flooding a server/website with so much traffic that legitimate users can\'t access it.',
            how: 'Attacker controls 100,000 infected computers (botnet). Commands all of them to send requests to target.com simultaneously. Server overwhelmed and crashes.',
            example: 'GitHub (2018): Hit with 1.35 Terabits/second — the largest DDoS ever at the time. That\'s like 135 MILLION people loading a webpage simultaneously. Down for 10 minutes before Akamai mitigated it.',
            defense: 'DDoS protection services (Cloudflare, Akamai), rate limiting, CDN distribution, traffic filtering.',
          },
          {
            num: 5, name: 'Man-in-the-Middle (MITM)', icon: '👤', severity: 'Medium',
            what: 'Attacker secretly sits between you and the server, intercepting and possibly modifying communications.',
            how: 'You connect to public Wi-Fi at a coffee shop. Attacker is on the same network. They intercept your HTTP (unencrypted) traffic and see your passwords.',
            example: 'In 2015, Lenovo pre-installed "Superfish" adware on laptops that acted as MITM — it intercepted ALL HTTPS traffic, including banking sessions.',
            defense: 'Always use HTTPS, VPN on public Wi-Fi, verify SSL certificates, use HSTS.',
          },
          {
            num: 6, name: 'Cross-Site Scripting (XSS)', icon: '📝', severity: 'Very Common',
            what: 'Injecting malicious JavaScript into a website that runs in other users\' browsers.',
            how: 'Attacker posts a comment on a forum containing <script>steal_cookies()</script>. When other users view the page, the script runs in their browser and steals their session.',
            example: 'eBay (2015-2016): Attackers injected JavaScript into product listings. When buyers viewed items, the script redirected them to phishing pages.',
            defense: 'Output encoding, Content Security Policy (CSP), input sanitization, HttpOnly cookies.',
          },
          {
            num: 7, name: 'Brute Force Attack', icon: '🔨', severity: 'Common',
            what: 'Trying every possible password combination until the correct one is found.',
            how: 'Automated tool tries "aaa", "aab", "aac"... or uses a dictionary of common passwords (dictionary attack). Tries thousands per second.',
            example: 'A 6-character lowercase password has 308 million combinations. A computer can try ALL of them in under 5 minutes. This is why passwords must be long and complex.',
            defense: 'Account lockout after failed attempts, CAPTCHA, rate limiting, strong password policy (12+ characters), MFA.',
          },
          {
            num: 8, name: 'Ransomware', icon: '🔐', severity: 'Critical',
            what: 'Malware that encrypts all your files and demands payment (usually cryptocurrency) for the decryption key.',
            how: 'Employee opens malicious email attachment. Ransomware executes, spreads across network via shared drives, encrypts everything. Shows ransom note demanding $50,000 in Bitcoin.',
            example: 'Colonial Pipeline (2021): Ransomware shut down the largest fuel pipeline in the US for 6 days. Company paid $4.4 million ransom. Fuel shortages across entire East Coast.',
            defense: 'Regular offline backups, email filtering, endpoint protection, network segmentation, incident response plan, employee training.',
          },
          {
            num: 9, name: 'Social Engineering', icon: '🎭', severity: 'Very Common',
            what: 'Manipulating PEOPLE (not computers) to give up information or access. Exploits human psychology.',
            how: 'Attacker calls IT helpdesk: "Hi, this is John from accounting. I forgot my password and need to reset it urgently for a meeting." Helpdesk resets it without proper verification.',
            example: 'Kevin Mitnick (famous hacker): Most of his attacks used social engineering, not technical exploits. He called companies pretending to be employees to get passwords and access codes.',
            defense: 'Verification procedures, security awareness training, "trust but verify" culture, callback verification.',
          },
          {
            num: 10, name: 'Zero-Day Exploit', icon: '⚡', severity: 'Critical',
            what: 'Exploiting a vulnerability that the software vendor doesn\'t know about yet — no patch exists.',
            how: 'Attacker discovers a bug in Windows that nobody else knows about. They create exploit code and use it to attack targets. Microsoft has "zero days" of warning to fix it.',
            example: 'Stuxnet (2010): Used 4 zero-day exploits to sabotage Iranian nuclear centrifuges. Considered the most sophisticated cyber weapon ever created. Attributed to US/Israel.',
            defense: 'Defense in depth (multiple layers), behavior-based detection, network monitoring, rapid patch deployment, assume breach mentality.',
          },
        ].map((attack) => (
          <div key={attack.num} className="card-glass p-5">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">{attack.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-white">{attack.num}. {attack.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-dark-400 border border-white/[0.08]">{attack.severity}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 ml-9">
              <div>
                <p className="text-xs font-semibold text-dark-300 mb-0.5">What is it?</p>
                <p className="text-xs text-dark-400 leading-relaxed">{attack.what}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-dark-300 mb-0.5">How it works:</p>
                <p className="text-xs text-dark-400 leading-relaxed">{attack.how}</p>
              </div>
              <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.04]">
                <p className="text-xs font-semibold text-amber-400 mb-0.5">📰 Real Example:</p>
                <p className="text-xs text-dark-400 leading-relaxed">{attack.example}</p>
              </div>
              <div className="p-2 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                <p className="text-xs"><span className="text-emerald-400 font-semibold">🛡️ Defense:</span> <span className="text-dark-400">{attack.defense}</span></p>
              </div>
            </div>
          </div>
        ))}

        {/* Summary */}
        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• Most breaches use SIMPLE techniques (phishing + weak passwords), not Hollywood hacking</li>
            <li>• Defense in depth = multiple layers of protection (no single solution stops everything)</li>
            <li>• Human error causes ~80% of breaches — training is as important as technology</li>
            <li>• Keeping software updated patches known vulnerabilities before attackers exploit them</li>
            <li>• Every attack has a defense — understanding the attack helps you choose the right one</li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (<span className="text-emerald-400 text-sm">✅ Completed! +25 XP</span>) : <div/>}
          <button onClick={() => setCompleted(true)} disabled={completed} className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <Link href="/lessons/threats-vulnerabilities-risks" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: Threats & Vulnerabilities</Link>
          <Link href="/lessons/security-controls-defense" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: Security Controls & Defense →</Link>
        </div>
      </div>
    </div>
  );
}
