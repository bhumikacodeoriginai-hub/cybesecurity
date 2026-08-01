'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DNSExplainedLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">DNS — Domain Name System</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-intermediate">PRACTICAL</span>
          <span className="text-xs text-dark-500">Module 4 · Lesson 24</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">DNS — The Phone Book of the Internet</h1>
        <p className="text-dark-400 leading-relaxed">
          DNS translates human-readable names (google.com) to machine-readable IP addresses (142.250.80.46).
          It's one of the most attacked protocols because controlling DNS = controlling where users go.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 30 minutes</span><span>⚡ +20 XP</span><span>💻 Practical</span><span>🧪 Has Lab</span>
        </div>
      </div>

      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">1</span>
            How DNS Works — Step by Step
          </h2>

          <div className="callout-info">
            <p className="text-sm font-medium mb-2">📞 Phone Book Analogy:</p>
            <p className="text-xs opacity-90">
              You want to call "Pizza Palace" but don't know the number.
              You look it up in the phone book (DNS). The book says "Pizza Palace = 555-0123".
              Now you can call. DNS does this for every website — translates names to numbers.
            </p>
          </div>

          <div className="space-y-2 mt-4">
            {[
              { step: 1, what: 'You type "bank.com" in browser', detail: 'Browser checks its local cache first — has it looked this up recently?' },
              { step: 2, what: 'Not cached → ask OS resolver', detail: 'Operating system checks /etc/hosts file and its own DNS cache' },
              { step: 3, what: 'Not found → ask configured DNS server', detail: 'Usually your ISP (8.8.8.8 for Google DNS, 1.1.1.1 for Cloudflare)' },
              { step: 4, what: 'DNS server queries root servers', detail: 'Root servers say "for .com, ask the .com TLD servers"' },
              { step: 5, what: 'TLD server points to authoritative NS', detail: '.com TLD says "for bank.com, ask ns1.bank.com (198.51.100.1)"' },
              { step: 6, what: 'Authoritative server returns the IP', detail: 'ns1.bank.com says "bank.com = 203.0.113.10"' },
              { step: 7, what: 'Answer returned to browser', detail: 'Browser now connects to 203.0.113.10 and loads the website' },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                <div className="w-6 h-6 bg-cyber-400/10 rounded-lg flex items-center justify-center text-[10px] text-cyber-400 font-bold border border-cyber-400/20 flex-shrink-0">{s.step}</div>
                <div>
                  <p className="text-xs text-white font-medium">{s.what}</p>
                  <p className="text-[10px] text-dark-500">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">2</span>
            DNS Record Types
          </h2>

          <div className="card-glass overflow-hidden p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                  <th className="px-4 py-2.5 text-left text-dark-400">Record</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Purpose</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Example</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Security Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">A</td><td className="px-4 py-2 text-dark-300">Domain → IPv4 address</td><td className="px-4 py-2 text-dark-400 font-mono">google.com → 142.250.80.46</td><td className="px-4 py-2 text-dark-500">Most targeted for spoofing</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">AAAA</td><td className="px-4 py-2 text-dark-300">Domain → IPv6 address</td><td className="px-4 py-2 text-dark-400 font-mono">google.com → 2607:f8b0::...</td><td className="px-4 py-2 text-dark-500">Same as A but for IPv6</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">MX</td><td className="px-4 py-2 text-dark-300">Mail server for domain</td><td className="px-4 py-2 text-dark-400 font-mono">gmail.com → alt1.gmail-smtp-in</td><td className="px-4 py-2 text-dark-500">Misconfigured = email spoofing</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">NS</td><td className="px-4 py-2 text-dark-300">Authoritative nameserver</td><td className="px-4 py-2 text-dark-400 font-mono">google.com → ns1.google.com</td><td className="px-4 py-2 text-dark-500">Compromise NS = control all records</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">TXT</td><td className="px-4 py-2 text-dark-300">Text data (SPF, DKIM, verification)</td><td className="px-4 py-2 text-dark-400 font-mono">"v=spf1 include:google.com"</td><td className="px-4 py-2 text-dark-500">SPF/DKIM prevent email spoofing</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">CNAME</td><td className="px-4 py-2 text-dark-300">Alias (points to another domain)</td><td className="px-4 py-2 text-dark-400 font-mono">www.site.com → site.com</td><td className="px-4 py-2 text-dark-500">Dangling CNAME = subdomain takeover</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">3</span>
            Practical: DNS Reconnaissance Commands
          </h2>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">DNS lookup tools</span></div>
            <div className="command-body text-xs space-y-3">
              <div>
                <p className="text-dark-500"># Basic lookup — get IP for domain</p>
                <div><span className="command-prompt">$ </span><span className="text-white">nslookup example.com</span></div>
                <div className="command-output">Server:    8.8.8.8
Address:   8.8.8.8#53

Non-authoritative answer:
Name:    example.com
Address: 93.184.216.34</div>
              </div>
              <div>
                <p className="text-dark-500"># Detailed lookup with dig (more info)</p>
                <div><span className="command-prompt">$ </span><span className="text-white">dig example.com A +short</span></div>
                <div className="command-output">93.184.216.34</div>
              </div>
              <div>
                <p className="text-dark-500"># Find mail servers</p>
                <div><span className="command-prompt">$ </span><span className="text-white">dig gmail.com MX +short</span></div>
                <div className="command-output">5 gmail-smtp-in.l.google.com.
10 alt1.gmail-smtp-in.l.google.com.</div>
              </div>
              <div>
                <p className="text-dark-500"># Reverse lookup — IP to domain</p>
                <div><span className="command-prompt">$ </span><span className="text-white">dig -x 8.8.8.8 +short</span></div>
                <div className="command-output">dns.google.</div>
              </div>
              <div>
                <p className="text-dark-500"># Check nameservers (who controls this domain's DNS?)</p>
                <div><span className="command-prompt">$ </span><span className="text-white">dig example.com NS +short</span></div>
                <div className="command-output">a.iana-servers.net.
b.iana-servers.net.</div>
              </div>
              <div>
                <p className="text-dark-500"># Check SPF record (email spoofing protection)</p>
                <div><span className="command-prompt">$ </span><span className="text-white">dig google.com TXT +short | grep spf</span></div>
                <div className="command-output">"v=spf1 include:_spf.google.com ~all"</div>
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans text-amber-300/80"><strong>🔒 Security uses of DNS recon:</strong></p>
              <ul className="mt-1 space-y-0.5">
                <li>• Find all subdomains of a target (subdomain enumeration)</li>
                <li>• Check if email spoofing protection exists (SPF/DKIM/DMARC)</li>
                <li>• Reverse lookup attacker IPs to find their hosting/ISP</li>
                <li>• Detect DNS-based data exfiltration (unusual TXT queries)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-red-500/10 rounded-lg flex items-center justify-center text-xs text-red-400 border border-red-500/20">4</span>
            DNS Attacks — How Attackers Exploit DNS
          </h2>

          <div className="grid gap-3">
            {[
              { attack: 'DNS Spoofing/Poisoning', how: 'Attacker injects fake DNS response. Victim types "bank.com" but gets sent to attacker\'s phishing site.', impact: 'Steal passwords, install malware — victim thinks they\'re on the real site.', defense: 'DNSSEC validation, DNS over HTTPS (DoH)' },
              { attack: 'DNS Tunneling (C2)', how: 'Attacker encodes stolen data inside DNS queries. E.g., "stolen-credit-cards.attacker.com" as a TXT lookup.', impact: 'Data exfiltration that bypasses firewalls (DNS is almost never blocked).', defense: 'Monitor for unusually long domain names, high volume of DNS queries' },
              { attack: 'Subdomain Takeover', how: 'Company has CNAME pointing to cloud service they no longer use. Attacker claims that cloud resource.', impact: 'Attacker controls legitimate-looking subdomain (app.company.com → attacker content).', defense: 'Audit DNS records regularly. Remove unused CNAMEs.' },
              { attack: 'DNS Amplification DDoS', how: 'Send small DNS query with victim\'s IP as source → open resolver sends large response to victim.', impact: 'Amplification factor up to 70x. 1 Gbps of queries = 70 Gbps hitting victim.', defense: 'Disable open resolvers. Rate limit DNS responses. BCP38.' },
            ].map((item) => (
              <div key={item.attack} className="card-glass p-4">
                <p className="text-xs font-bold text-red-400 mb-1">{item.attack}</p>
                <p className="text-[11px] text-dark-400"><strong>How:</strong> {item.how}</p>
                <p className="text-[11px] text-dark-400 mt-1"><strong>Impact:</strong> {item.impact}</p>
                <p className="text-[11px] text-emerald-400/80 mt-1"><strong>Defense:</strong> {item.defense}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">5</span>
            The /etc/hosts File — Local DNS Override
          </h2>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">/etc/hosts — bypasses DNS entirely</span></div>
            <div className="command-body">
              <div><span className="command-prompt">$ </span><span className="text-white">cat /etc/hosts</span></div>
              <div className="command-output">
{`127.0.0.1       localhost
127.0.0.1       mycomputer
192.168.1.100   target-server
192.168.1.200   db-server

# Block malware domains (point to nowhere)
0.0.0.0         malware-c2.evil.com
0.0.0.0         phishing-site.bad.net`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>How it works:</strong> /etc/hosts is checked BEFORE DNS servers. Entries here override DNS completely.</p>
              <p className="mt-1 font-sans text-amber-300/80"><strong>🔒 Security uses:</strong></p>
              <ul className="mt-1 space-y-0.5">
                <li>• Block known malware domains (point them to 0.0.0.0)</li>
                <li>• Set up lab environments with custom hostnames</li>
                <li>• <span className="text-red-400">⚠️ Attack:</span> Malware modifies /etc/hosts to redirect banking sites to phishing pages</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• DNS translates domain names → IP addresses. Without it, the internet breaks.</li>
            <li>• Record types: A (IPv4), AAAA (IPv6), MX (mail), NS (nameserver), TXT (SPF/verification)</li>
            <li>• <code>dig</code> and <code>nslookup</code> = essential DNS recon tools for security testing</li>
            <li>• DNS attacks: spoofing, tunneling (C2/exfil), subdomain takeover, amplification DDoS</li>
            <li>• /etc/hosts overrides DNS — can be used for blocking or (by attackers) for redirecting</li>
            <li>• Defenses: DNSSEC, DNS over HTTPS (DoH), monitoring unusual DNS query patterns</li>
          </ul>
        </section>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (<span className="text-emerald-400 text-sm">✅ Completed! +20 XP</span>) : <div/>}
          <button onClick={() => setCompleted(true)} disabled={completed} className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <Link href="/lessons/tcp-udp-protocols" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: TCP vs UDP</Link>
          <Link href="/lessons/http-https-web" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: HTTP/HTTPS & Web Communication →</Link>
        </div>
      </div>
    </div>
  );
}
