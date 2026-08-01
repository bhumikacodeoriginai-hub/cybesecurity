'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function IPAddressesSubnetsLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">IP Addresses, Subnets & CIDR</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-intermediate">PRACTICAL</span>
          <span className="text-xs text-dark-500">Module 4 · Lesson 22</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">IP Addresses, Subnets & CIDR Notation</h1>
        <p className="text-dark-400 leading-relaxed">
          IP addresses are the foundation of all network security. You can't block an attacker,
          analyze network traffic, or configure a firewall without understanding IP addressing.
          This lesson makes it crystal clear.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 35 minutes</span><span>⚡ +25 XP</span><span>💻 Practical</span><span>🧪 Has Lab</span>
        </div>
      </div>

      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">1</span>
            What is an IP Address?
          </h2>

          <div className="callout-info">
            <p className="text-sm font-medium mb-2">📮 Postal System Analogy:</p>
            <p className="text-xs opacity-90">
              <strong>IP address</strong> = your house address (identifies your device on the network)<br/>
              <strong>Subnet</strong> = your neighborhood/street (groups nearby devices together)<br/>
              <strong>Router/Gateway</strong> = the post office (forwards mail between neighborhoods)<br/>
              <strong>MAC address</strong> = your physical house (can't be changed, built into hardware)
            </p>
          </div>

          <div className="card-glass p-5 mt-4">
            <p className="text-sm text-white font-medium mb-3">IPv4 Address Structure:</p>
            <div className="text-center font-mono">
              <p className="text-2xl text-cyber-400 mb-2">192 . 168 . 1 . 105</p>
              <div className="grid grid-cols-4 gap-2 text-xs max-w-sm mx-auto">
                <div className="text-center"><p className="text-dark-500">Octet 1</p><p className="text-dark-600">0-255</p></div>
                <div className="text-center"><p className="text-dark-500">Octet 2</p><p className="text-dark-600">0-255</p></div>
                <div className="text-center"><p className="text-dark-500">Octet 3</p><p className="text-dark-600">0-255</p></div>
                <div className="text-center"><p className="text-dark-500">Octet 4</p><p className="text-dark-600">0-255</p></div>
              </div>
            </div>
            <p className="text-xs text-dark-500 text-center mt-3">4 numbers (0-255) separated by dots. Total possible: ~4.3 billion addresses.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">2</span>
            Private vs Public IP Addresses
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            Not all IPs are reachable from the internet. <strong className="text-white">Private IPs</strong> are used inside
            your local network. <strong className="text-white">Public IPs</strong> are on the internet.
          </p>

          <div className="card-glass overflow-hidden p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                  <th className="px-4 py-2.5 text-left text-dark-400">Range</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Type</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Used For</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">CIDR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">10.0.0.0 - 10.255.255.255</td><td className="px-4 py-2 text-emerald-400">Private</td><td className="px-4 py-2 text-dark-400">Large companies, cloud (AWS)</td><td className="px-4 py-2 text-dark-500 font-mono">10.0.0.0/8</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">172.16.0.0 - 172.31.255.255</td><td className="px-4 py-2 text-emerald-400">Private</td><td className="px-4 py-2 text-dark-400">Medium networks</td><td className="px-4 py-2 text-dark-500 font-mono">172.16.0.0/12</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">192.168.0.0 - 192.168.255.255</td><td className="px-4 py-2 text-emerald-400">Private</td><td className="px-4 py-2 text-dark-400">Home/small office routers</td><td className="px-4 py-2 text-dark-500 font-mono">192.168.0.0/16</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">127.0.0.0 - 127.255.255.255</td><td className="px-4 py-2 text-purple-400">Loopback</td><td className="px-4 py-2 text-dark-400">Your own machine (localhost)</td><td className="px-4 py-2 text-dark-500 font-mono">127.0.0.0/8</td></tr>
                <tr><td className="px-4 py-2 text-dark-400 font-mono">Everything else</td><td className="px-4 py-2 text-amber-400">Public</td><td className="px-4 py-2 text-dark-400">Internet-facing servers, websites</td><td className="px-4 py-2 text-dark-500">Various</td></tr>
              </tbody>
            </table>
          </div>

          <div className="callout-security mt-4">
            <p className="text-xs"><strong>Security rule:</strong> If you see a connection to a PUBLIC IP from your internal server (especially on unusual ports like 4444, 8080, or random high ports), investigate immediately — it could be a reverse shell or data exfiltration.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">3</span>
            Subnet Masks & CIDR Notation
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            A subnet mask tells you which part of the IP is the <strong className="text-white">network</strong> (shared by all devices on that subnet)
            and which part is the <strong className="text-white">host</strong> (unique per device).
          </p>

          <div className="card-glass p-5">
            <p className="text-sm text-white font-medium mb-3">Example: 192.168.1.105<span className="text-cyber-400">/24</span></p>
            <div className="font-mono text-xs space-y-2">
              <p><span className="text-dark-500">IP Address: </span><span className="text-emerald-400">192.168.1</span><span className="text-dark-500">.</span><span className="text-amber-400">105</span></p>
              <p><span className="text-dark-500">Subnet:     </span><span className="text-emerald-400">255.255.255</span><span className="text-dark-500">.</span><span className="text-amber-400">0</span></p>
              <p><span className="text-dark-500">            </span><span className="text-emerald-400">Network part</span>    <span className="text-amber-400">Host part</span></p>
            </div>
            <div className="mt-3 p-3 bg-white/[0.02] rounded-lg">
              <p className="text-xs text-dark-400">
                <strong>/24</strong> means first 24 bits are network → leaves 8 bits for hosts → 2^8 - 2 = <strong>254 usable addresses</strong>
                <br/>Network: 192.168.1.0 | First host: 192.168.1.1 | Last host: 192.168.1.254 | Broadcast: 192.168.1.255
              </p>
            </div>
          </div>

          <div className="card-glass overflow-hidden p-0 mt-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                  <th className="px-4 py-2.5 text-left text-dark-400">CIDR</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Subnet Mask</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Hosts</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">/8</td><td className="px-4 py-2 text-dark-300 font-mono">255.0.0.0</td><td className="px-4 py-2 text-dark-400">16,777,214</td><td className="px-4 py-2 text-dark-500">Giant networks (10.0.0.0/8)</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">/16</td><td className="px-4 py-2 text-dark-300 font-mono">255.255.0.0</td><td className="px-4 py-2 text-dark-400">65,534</td><td className="px-4 py-2 text-dark-500">Large offices</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">/24</td><td className="px-4 py-2 text-dark-300 font-mono">255.255.255.0</td><td className="px-4 py-2 text-dark-400">254</td><td className="px-4 py-2 text-dark-500">Most common (home/office)</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">/30</td><td className="px-4 py-2 text-dark-300 font-mono">255.255.255.252</td><td className="px-4 py-2 text-dark-400">2</td><td className="px-4 py-2 text-dark-500">Point-to-point links</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">/32</td><td className="px-4 py-2 text-dark-300 font-mono">255.255.255.255</td><td className="px-4 py-2 text-dark-400">1</td><td className="px-4 py-2 text-dark-500">Single host (firewall rules)</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">4</span>
            Practical: Network Commands
          </h2>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Essential IP/Network commands</span></div>
            <div className="command-body text-xs space-y-3">
              <div>
                <p className="text-dark-500"># Show your IP address and subnet</p>
                <div><span className="command-prompt">$ </span><span className="text-white">ip addr show eth0</span></div>
                <div className="command-output">    inet 192.168.1.105/24 brd 192.168.1.255 scope global eth0</div>
              </div>
              <div>
                <p className="text-dark-500"># Show default gateway (router)</p>
                <div><span className="command-prompt">$ </span><span className="text-white">ip route show default</span></div>
                <div className="command-output">default via 192.168.1.1 dev eth0</div>
              </div>
              <div>
                <p className="text-dark-500"># Discover all devices on your subnet</p>
                <div><span className="command-prompt">$ </span><span className="text-white">nmap -sn 192.168.1.0/24</span></div>
                <div className="command-output">Nmap scan report for 192.168.1.1 (router)
Host is up (0.0010s latency).
Nmap scan report for 192.168.1.50 (your machine)
Host is up.
Nmap scan report for 192.168.1.100 (target server)
Host is up (0.0020s latency).
Nmap done: 256 IP addresses (3 hosts up)</div>
              </div>
              <div>
                <p className="text-dark-500"># View ARP table (IP to MAC mapping)</p>
                <div><span className="command-prompt">$ </span><span className="text-white">arp -a</span></div>
                <div className="command-output">? (192.168.1.1) at aa:bb:cc:dd:ee:ff [ether] on eth0
? (192.168.1.100) at 11:22:33:44:55:66 [ether] on eth0</div>
              </div>
              <div>
                <p className="text-dark-500"># Trace the route packets take to reach Google</p>
                <div><span className="command-prompt">$ </span><span className="text-white">traceroute 8.8.8.8</span></div>
                <div className="command-output"> 1  192.168.1.1 (router)     1.234 ms
 2  10.0.0.1 (ISP)          5.678 ms
 3  72.14.232.1 (Google)    15.234 ms
 4  8.8.8.8 (destination)   18.456 ms</div>
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans text-amber-300/80"><strong>🔒 Security applications:</strong></p>
              <ul className="mt-1 space-y-0.5">
                <li>• <code>nmap -sn</code> → discover unauthorized devices on your network</li>
                <li>• <code>arp -a</code> → detect ARP spoofing (duplicate MACs for different IPs)</li>
                <li>• <code>traceroute</code> → see if traffic is being redirected through suspicious hops</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• IPv4 = 4 octets (0-255), ~4.3 billion total addresses</li>
            <li>• Private ranges: 10.x.x.x, 172.16-31.x.x, 192.168.x.x (not internet-routable)</li>
            <li>• CIDR /24 = 254 hosts, /16 = 65,534 hosts, /32 = single host</li>
            <li>• Subnet mask separates network portion from host portion</li>
            <li>• Public IP connections from internal servers = investigate immediately</li>
            <li>• <code>nmap -sn</code> discovers hosts, <code>arp -a</code> shows IP-to-MAC mappings</li>
            <li>• Network segmentation (separate subnets) limits breach impact</li>
          </ul>
        </section>

        <section className="card border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-2xl border border-emerald-500/20">🧪</div>
            <div className="flex-1">
              <p className="text-xs text-emerald-400 font-medium uppercase">Practice Lab</p>
              <h3 className="font-semibold text-white mt-0.5">Network Scanning Basics Lab</h3>
              <p className="text-xs text-dark-400 mt-1">Discover hosts, scan ports, identify services on the practice network</p>
            </div>
            <Link href="/labs/network-scanning-basics" className="btn-primary text-xs px-4 py-2">Open Lab</Link>
          </div>
        </section>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (<span className="text-emerald-400 text-sm">✅ Completed! +25 XP</span>) : <div/>}
          <button onClick={() => setCompleted(true)} disabled={completed} className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <Link href="/lessons/how-internet-works" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: How the Internet Works</Link>
          <Link href="/lessons/tcp-udp-protocols" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: TCP vs UDP Protocols →</Link>
        </div>
      </div>
    </div>
  );
}
