'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TCPUDPProtocolsLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">TCP vs UDP Protocols</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-beginner">THEORY</span>
          <span className="text-xs text-dark-500">Module 4 · Lesson 23</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">TCP vs UDP — How Data Travels</h1>
        <p className="text-dark-400 leading-relaxed">
          All network communication uses either TCP or UDP. Understanding the difference explains
          why some attacks work, why some services are reliable, and how to detect anomalies.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 25 minutes</span><span>⚡ +15 XP</span><span>📖 Theory + Examples</span>
        </div>
      </div>

      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">1</span>
            Two Ways to Send Data
          </h2>

          <div className="callout-info">
            <p className="text-sm font-medium mb-2">📦 Delivery Analogy:</p>
            <p className="text-xs opacity-90">
              <strong>TCP</strong> = Registered mail. Guaranteed delivery, signed receipt, delivered in order. If lost, resent.
              <br/><strong>UDP</strong> = Dropping flyers from an airplane. Fast, no confirmation, some may be lost. Good for speed, bad for reliability.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="card-glass p-5 border-t-4 border-t-blue-500">
              <h3 className="text-base font-bold text-blue-400 mb-3">TCP (Transmission Control Protocol)</h3>
              <ul className="text-xs text-dark-400 space-y-2">
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> <strong className="text-dark-300">Reliable:</strong> Guarantees all data arrives correctly</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> <strong className="text-dark-300">Ordered:</strong> Data arrives in the same order it was sent</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> <strong className="text-dark-300">Error-checked:</strong> Detects and retransmits corrupted data</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> <strong className="text-dark-300">Connection-based:</strong> 3-way handshake before data flows</li>
                <li className="flex items-start gap-2"><span className="text-amber-400">⚠</span> <strong className="text-dark-300">Slower:</strong> All the checking adds overhead</li>
              </ul>
              <div className="mt-3 p-2 bg-white/[0.02] rounded-lg">
                <p className="text-[10px] text-dark-500"><strong>Used by:</strong> HTTP/HTTPS (web), SSH, FTP, SMTP (email), MySQL, all services needing reliability</p>
              </div>
            </div>

            <div className="card-glass p-5 border-t-4 border-t-amber-500">
              <h3 className="text-base font-bold text-amber-400 mb-3">UDP (User Datagram Protocol)</h3>
              <ul className="text-xs text-dark-400 space-y-2">
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> <strong className="text-dark-300">Fast:</strong> No handshake, no waiting for acknowledgment</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> <strong className="text-dark-300">Lightweight:</strong> Minimal overhead, good for real-time data</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> <strong className="text-dark-300">Unreliable:</strong> No guarantee data arrives (packets can be lost)</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> <strong className="text-dark-300">Unordered:</strong> Packets may arrive out of order</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> <strong className="text-dark-300">No connection:</strong> Just fires and forgets</li>
              </ul>
              <div className="mt-3 p-2 bg-white/[0.02] rounded-lg">
                <p className="text-[10px] text-dark-500"><strong>Used by:</strong> DNS, VoIP calls, video streaming, online gaming, DHCP, NTP (time sync)</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">2</span>
            The TCP 3-Way Handshake
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            Before ANY TCP communication, both sides must agree to connect. This is called the <strong className="text-white">3-way handshake</strong>:
          </p>

          <div className="card-glass p-5 font-mono text-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-blue-400 w-20">Client →</span>
                <span className="text-emerald-400 flex-1">SYN (seq=100)</span>
                <span className="text-dark-500 w-20">→ Server</span>
              </div>
              <p className="text-dark-600 pl-24 text-[10px]">"Hey, I want to connect. My sequence number is 100."</p>
              
              <div className="flex items-center gap-4">
                <span className="text-blue-400 w-20">Client ←</span>
                <span className="text-amber-400 flex-1">SYN-ACK (seq=300, ack=101)</span>
                <span className="text-dark-500 w-20">← Server</span>
              </div>
              <p className="text-dark-600 pl-24 text-[10px]">"OK! I acknowledge your 100 (+1=101). My sequence is 300."</p>
              
              <div className="flex items-center gap-4">
                <span className="text-blue-400 w-20">Client →</span>
                <span className="text-purple-400 flex-1">ACK (ack=301)</span>
                <span className="text-dark-500 w-20">→ Server</span>
              </div>
              <p className="text-dark-600 pl-24 text-[10px]">"I acknowledge your 300 (+1=301). We're connected!"</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-dark-500">
              After handshake → data flows bidirectionally → connection closed with FIN/ACK
            </div>
          </div>

          <div className="callout-danger mt-4">
            <p className="text-xs"><strong>⚠️ Attack: SYN Flood (DDoS)</strong></p>
            <p className="text-xs opacity-80 mt-1">Attacker sends millions of SYN packets but never completes the handshake (no ACK). Server keeps waiting for each incomplete connection, using memory for each one. Eventually server runs out of resources and crashes. Defense: SYN cookies, rate limiting, DDoS protection.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-red-500/10 rounded-lg flex items-center justify-center text-xs text-red-400 border border-red-500/20">3</span>
            Security Implications
          </h2>

          <div className="grid gap-3">
            {[
              { attack: 'SYN Flood (TCP)', desc: 'Millions of half-open connections exhaust server memory. Classic DDoS.', defense: 'SYN cookies, firewall rate limiting, cloud DDoS protection' },
              { attack: 'TCP Session Hijacking', desc: 'Attacker predicts sequence numbers to inject data into existing connection.', defense: 'TLS encryption (HTTPS), random sequence numbers' },
              { attack: 'UDP Amplification DDoS', desc: 'Send small UDP request with spoofed source IP → victim gets huge response from innocent server.', defense: 'BCP38 ingress filtering, disable open DNS resolvers' },
              { attack: 'Port Scanning (TCP)', desc: 'Send SYN to every port. If SYN-ACK comes back → port is open (service running).', defense: 'Firewall rules, close unnecessary ports, IDS detection' },
              { attack: 'DNS Spoofing (UDP)', desc: 'UDP has no connection verification. Attacker sends fake DNS response before real one arrives.', defense: 'DNSSEC, DNS over HTTPS (DoH), DNS over TLS (DoT)' },
            ].map((item) => (
              <div key={item.attack} className="card-glass p-4">
                <p className="text-xs font-bold text-red-400 mb-1">{item.attack}</p>
                <p className="text-[11px] text-dark-400">{item.desc}</p>
                <p className="text-[11px] text-emerald-400/80 mt-1"><strong>Defense:</strong> {item.defense}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">4</span>
            Practical: See TCP/UDP in Action
          </h2>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">View active TCP connections</span></div>
            <div className="command-body">
              <div><span className="command-prompt">$ </span><span className="text-white">ss -tn state established</span></div>
              <div className="command-output">
{`Recv-Q Send-Q  Local Address:Port   Peer Address:Port
0      0       192.168.1.50:22      10.0.0.1:54321       ← SSH (TCP)
0      0       192.168.1.50:443     151.101.1.69:443     ← HTTPS (TCP)
0      0       192.168.1.50:55444   203.0.113.42:4444    ← 🚨 Reverse shell!`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans">TCP connections are stateful — you can see exactly who's connected to what. This makes TCP traffic easier to monitor than UDP.</p>
            </div>
          </div>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">View UDP listeners</span></div>
            <div className="command-body">
              <div><span className="command-prompt">$ </span><span className="text-white">ss -ulnp</span></div>
              <div className="command-output">
{`State  Recv-Q  Local Address:Port  Process
UNCONN 0       0.0.0.0:53          (("named",pid=1234))    ← DNS
UNCONN 0       0.0.0.0:67          (("dhcpd",pid=567))     ← DHCP
UNCONN 0       0.0.0.0:123         (("ntpd",pid=890))      ← NTP (time)`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans">UDP shows no "ESTABLISHED" state because it's connectionless. You only see listeners (UNCONN). This makes UDP attacks harder to trace — there's no connection to inspect.</p>
            </div>
          </div>
        </section>

        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• <strong>TCP</strong> = reliable, ordered, slow (web, SSH, email). Uses 3-way handshake.</li>
            <li>• <strong>UDP</strong> = fast, unreliable, no connection (DNS, gaming, streaming)</li>
            <li>• TCP 3-way handshake: SYN → SYN-ACK → ACK. SYN flood exploits this.</li>
            <li>• UDP is connectionless → easy to spoof source IP → amplification DDoS attacks</li>
            <li>• Port scans detect open ports by analyzing SYN-ACK responses (TCP)</li>
            <li>• <code>ss -tn</code> shows TCP connections, <code>ss -un</code> shows UDP listeners</li>
            <li>• Most security monitoring focuses on TCP because it's stateful and trackable</li>
          </ul>
        </section>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (<span className="text-emerald-400 text-sm">✅ Completed! +15 XP</span>) : <div/>}
          <button onClick={() => setCompleted(true)} disabled={completed} className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <Link href="/lessons/ip-addresses-subnets" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: IP Addresses</Link>
          <Link href="/lessons/dns-explained" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: DNS — Domain Name System →</Link>
        </div>
      </div>
    </div>
  );
}
