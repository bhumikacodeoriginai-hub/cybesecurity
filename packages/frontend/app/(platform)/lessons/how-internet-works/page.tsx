'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HowInternetWorksLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">How the Internet Works</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-beginner">BEGINNER</span>
          <span className="text-xs text-dark-500">Module 4 · Lesson 21</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">How the Internet Actually Works</h1>
        <p className="text-dark-400 leading-relaxed">
          Before you can secure a network, you need to understand how data moves from your computer
          to a server on the other side of the world. This lesson explains it step by step.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 25 minutes</span><span>⚡ +20 XP</span><span>📖 Theory + Diagrams</span>
        </div>
      </div>

      <div className="space-y-10">

        {/* What happens when you type google.com */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">1</span>
            What Happens When You Type "google.com" and Press Enter?
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            Every time you visit a website, <strong className="text-white">at least 10 things happen</strong> behind the scenes in under 1 second.
            Let's trace the entire journey:
          </p>

          <div className="space-y-3">
            {[
              { step: 1, title: 'You type "google.com" in browser', detail: 'Browser recognizes this is a domain name, not an IP address. It needs to find the actual server address.' },
              { step: 2, title: 'DNS Lookup', detail: 'Browser asks DNS server: "What is the IP address for google.com?" DNS responds: "142.250.80.46"' },
              { step: 3, title: 'TCP Connection (3-way handshake)', detail: 'Your computer sends SYN → Google sends SYN-ACK → You send ACK. Connection established.' },
              { step: 4, title: 'TLS/SSL Handshake (if HTTPS)', detail: 'Your browser and Google negotiate encryption. They exchange certificates and agree on encryption keys.' },
              { step: 5, title: 'HTTP Request Sent', detail: 'Browser sends: GET / HTTP/1.1 Host: google.com (asking for the homepage)' },
              { step: 6, title: 'Request travels through networks', detail: 'Packet goes: Your router → ISP → Internet backbone → Google\'s data center. May cross oceans via undersea cables.' },
              { step: 7, title: 'Google\'s server processes request', detail: 'Web server receives request, generates HTML page, packages response.' },
              { step: 8, title: 'HTTP Response sent back', detail: 'Server sends: HTTP/1.1 200 OK + HTML content (the actual webpage code)' },
              { step: 9, title: 'Browser renders the page', detail: 'Browser reads HTML, downloads CSS/JS/images, and draws the page you see.' },
              { step: 10, title: 'TCP Connection closed', detail: 'After all data is transferred, connection closes with FIN → ACK.' },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                <div className="w-7 h-7 bg-gradient-to-br from-cyber-400/20 to-purple-500/20 rounded-lg flex items-center justify-center text-xs text-cyber-400 font-bold border border-cyber-400/20 flex-shrink-0">
                  {s.step}
                </div>
                <div>
                  <p className="text-sm text-white font-medium">{s.title}</p>
                  <p className="text-xs text-dark-400 mt-0.5">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="callout-security mt-4">
            <p className="text-xs"><strong>Security perspective:</strong> An attacker can intercept or manipulate data at EVERY step. DNS can be spoofed (step 2), connections can be intercepted (step 4), servers can be compromised (step 7). Understanding the flow helps you know WHERE attacks happen.</p>
          </div>
        </section>

        {/* IP Addresses */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">2</span>
            IP Addresses — The Postal System of the Internet
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            Every device on the internet has a unique address called an <strong className="text-white">IP address</strong>.
            It's like a postal address — without it, data doesn't know where to go.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="card-glass p-4">
              <h4 className="text-sm font-semibold text-white mb-2">IPv4 (Internet Protocol version 4)</h4>
              <p className="font-mono text-cyber-400 text-lg mb-2">192.168.1.100</p>
              <ul className="text-xs text-dark-400 space-y-1">
                <li>• 4 numbers separated by dots</li>
                <li>• Each number: 0-255</li>
                <li>• Total possible: ~4.3 billion addresses</li>
                <li>• Running out! (too many devices)</li>
              </ul>
            </div>
            <div className="card-glass p-4">
              <h4 className="text-sm font-semibold text-white mb-2">IPv6 (Internet Protocol version 6)</h4>
              <p className="font-mono text-cyber-400 text-lg mb-2">2001:0db8:85a3::8a2e:0370:7334</p>
              <ul className="text-xs text-dark-400 space-y-1">
                <li>• 8 groups of hex numbers</li>
                <li>• Much longer address space</li>
                <li>• 340 undecillion addresses</li>
                <li>• Enough for every atom on Earth</li>
              </ul>
            </div>
          </div>

          <div className="command-block">
            <div className="command-header">
              <span className="text-[11px] text-dark-500 font-mono">Find your IP address</span>
            </div>
            <div className="command-body">
              <p className="text-dark-500 text-xs mb-2"># On Linux/Mac:</p>
              <div><span className="command-prompt">$ </span><span className="text-white">ip addr show | grep "inet "</span></div>
              <div className="command-output">    inet 127.0.0.1/8 scope host lo
    inet 192.168.1.105/24 brd 192.168.1.255 scope global eth0</div>
              <p className="text-dark-500 text-xs mt-3"># On Windows:</p>
              <div><span className="command-prompt">C:\&gt; </span><span className="text-white">ipconfig</span></div>
              <div className="command-output">IPv4 Address. . . . . : 192.168.1.105
Subnet Mask . . . . . : 255.255.255.0
Default Gateway . . . : 192.168.1.1</div>
            </div>
            <div className="command-explanation">
              <p><strong>192.168.x.x</strong> is a private IP (your local network). Your router translates this to a public IP when communicating with the internet (called NAT).</p>
            </div>
          </div>
        </section>

        {/* Ports */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">3</span>
            Ports — Doors Into a Computer
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            If an IP address is like a <strong className="text-white">building address</strong>, a port is like a
            <strong className="text-white"> specific apartment door</strong>. One computer can run many services,
            each on a different port.
          </p>

          <div className="card-glass overflow-hidden p-0 mb-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                  <th className="px-4 py-2.5 text-left text-dark-400">Port</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Service</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">What It Does</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Security Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">20/21</td><td className="px-4 py-2 text-dark-300">FTP</td><td className="px-4 py-2 text-dark-400">File transfer</td><td className="px-4 py-2 text-red-400">⚠️ Sends passwords in plaintext!</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">22</td><td className="px-4 py-2 text-dark-300">SSH</td><td className="px-4 py-2 text-dark-400">Secure remote login</td><td className="px-4 py-2 text-emerald-400">✓ Encrypted</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">23</td><td className="px-4 py-2 text-dark-300">Telnet</td><td className="px-4 py-2 text-dark-400">Remote login (old)</td><td className="px-4 py-2 text-red-400">⚠️ Everything in plaintext! Never use.</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">25</td><td className="px-4 py-2 text-dark-300">SMTP</td><td className="px-4 py-2 text-dark-400">Sending email</td><td className="px-4 py-2 text-dark-400">Often unencrypted</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">53</td><td className="px-4 py-2 text-dark-300">DNS</td><td className="px-4 py-2 text-dark-400">Domain name resolution</td><td className="px-4 py-2 text-amber-400">Can be spoofed</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">80</td><td className="px-4 py-2 text-dark-300">HTTP</td><td className="px-4 py-2 text-dark-400">Web (unencrypted)</td><td className="px-4 py-2 text-amber-400">⚠️ No encryption</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">443</td><td className="px-4 py-2 text-dark-300">HTTPS</td><td className="px-4 py-2 text-dark-400">Web (encrypted)</td><td className="px-4 py-2 text-emerald-400">✓ TLS encrypted</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">3306</td><td className="px-4 py-2 text-dark-300">MySQL</td><td className="px-4 py-2 text-dark-400">Database</td><td className="px-4 py-2 text-red-400">⚠️ Never expose to internet!</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">3389</td><td className="px-4 py-2 text-dark-300">RDP</td><td className="px-4 py-2 text-dark-400">Remote Desktop</td><td className="px-4 py-2 text-red-400">⚠️ Top ransomware entry point</td></tr>
              </tbody>
            </table>
          </div>

          <div className="command-block">
            <div className="command-header">
              <span className="text-[11px] text-dark-500 font-mono">Check open ports on your machine</span>
            </div>
            <div className="command-body">
              <div><span className="command-prompt">$ </span><span className="text-white">netstat -tlnp</span></div>
              <div className="command-output">Proto  Local Address     State    PID/Program
tcp    0.0.0.0:22        LISTEN   892/sshd
tcp    0.0.0.0:80        LISTEN   1205/nginx
tcp    0.0.0.0:443       LISTEN   1205/nginx
tcp    127.0.0.1:3306    LISTEN   1340/mysqld</div>
            </div>
            <div className="command-explanation">
              <p><strong>Security analysis:</strong> SSH (22) and web (80/443) are expected. MySQL on 127.0.0.1 means it only accepts local connections (safe). If MySQL was on 0.0.0.0, anyone on the internet could try to connect (dangerous!).</p>
            </div>
          </div>
        </section>

        {/* DNS */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">4</span>
            DNS — The Phone Book of the Internet
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            Humans remember names (google.com). Computers use numbers (142.250.80.46).
            <strong className="text-white"> DNS translates between the two.</strong>
          </p>

          <div className="command-block">
            <div className="command-header">
              <span className="text-[11px] text-dark-500 font-mono">Lookup DNS records</span>
            </div>
            <div className="command-body">
              <div><span className="command-prompt">$ </span><span className="text-white">nslookup google.com</span></div>
              <div className="command-output">Server:    8.8.8.8
Address:   8.8.8.8#53

Non-authoritative answer:
Name:      google.com
Address:   142.250.80.46</div>
              <div className="mt-3"><span className="command-prompt">$ </span><span className="text-white">dig google.com A +short</span></div>
              <div className="command-output">142.250.80.46</div>
            </div>
            <div className="command-explanation">
              <p><strong>Security risk:</strong> If an attacker controls DNS, they can send you to a FAKE Google. You type google.com, but DNS returns the attacker's IP. Your browser shows the site, you type your password — stolen. This is called <strong>DNS spoofing/poisoning</strong>.</p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• When you visit a website: DNS → TCP → TLS → HTTP → Response → Render</li>
            <li>• IP addresses identify devices (like postal addresses for computers)</li>
            <li>• Ports identify services (like apartment numbers in a building)</li>
            <li>• DNS translates domain names to IP addresses (phone book of internet)</li>
            <li>• Attackers can target ANY step in the process — each needs protection</li>
            <li>• Key security ports to remember: 22(SSH), 80(HTTP), 443(HTTPS), 3306(MySQL), 3389(RDP)</li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (<span className="text-emerald-400 text-sm">✅ Completed! +20 XP</span>) : <div/>}
          <button onClick={() => setCompleted(true)} disabled={completed} className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <Link href="/lessons/processes-services-daemons" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: Processes & Services</Link>
          <Link href="/lessons/ip-addresses-subnets" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: IP Addresses & Subnets →</Link>
        </div>
      </div>
    </div>
  );
}
