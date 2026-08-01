'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HTTPHTTPSLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">HTTP/HTTPS & Web Communication</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-intermediate">PRACTICAL</span>
          <span className="text-xs text-dark-500">Module 4 · Lesson 25</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">HTTP/HTTPS & Web Communication</h1>
        <p className="text-dark-400 leading-relaxed">
          HTTP is the language browsers and servers speak. HTTPS adds encryption.
          Understanding HTTP is essential for web security testing — every web attack
          (SQLi, XSS, CSRF) exploits HTTP requests and responses.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 30 minutes</span><span>⚡ +20 XP</span><span>💻 Practical</span>
        </div>
      </div>

      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">1</span>
            HTTP — How the Web Talks
          </h2>

          <div className="callout-info">
            <p className="text-sm font-medium mb-2">🍽️ Restaurant Analogy:</p>
            <p className="text-xs opacity-90">
              <strong>HTTP Request</strong> = You (customer) ordering food: "I'll have the homepage please" (GET /index.html)
              <br/><strong>HTTP Response</strong> = Waiter bringing your food: "Here's your homepage" (200 OK + HTML content)
              <br/><strong>Headers</strong> = Special instructions on the order: "No nuts" (Accept: text/html, Cookie: session=abc)
            </p>
          </div>

          <div className="command-block mt-4">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">See a real HTTP request with curl</span></div>
            <div className="command-body">
              <div><span className="command-prompt">$ </span><span className="text-white">curl -v http://example.com 2&gt;&amp;1 | head -25</span></div>
              <div className="command-output">
{`> GET / HTTP/1.1
> Host: example.com
> User-Agent: curl/7.88.1
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: text/html; charset=UTF-8
< Content-Length: 1256
< Server: ECS (dcb/7F83)
< Date: Sat, 15 Jan 2025 10:15:32 GMT
<
<!doctype html>
<html>
<head><title>Example Domain</title></head>...`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>Breaking it down:</strong></p>
              <ul className="mt-1 space-y-0.5">
                <li>• Lines with <code>&gt;</code> = what YOUR browser sent (request)</li>
                <li>• Lines with <code>&lt;</code> = what the SERVER sent back (response)</li>
                <li>• <code>GET /</code> = requesting the homepage</li>
                <li>• <code>200 OK</code> = success! Here's the content.</li>
                <li>• <code>Server: ECS</code> = server software (useful for recon!)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">2</span>
            HTTP Methods — What You Can Ask a Server
          </h2>

          <div className="card-glass overflow-hidden p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                  <th className="px-4 py-2.5 text-left text-dark-400">Method</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Purpose</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Example</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Security Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr><td className="px-4 py-2 text-emerald-400 font-mono">GET</td><td className="px-4 py-2 text-dark-300">Retrieve data</td><td className="px-4 py-2 text-dark-400">Load a webpage</td><td className="px-4 py-2 text-dark-500">Params visible in URL (bookmarks, logs)</td></tr>
                <tr><td className="px-4 py-2 text-amber-400 font-mono">POST</td><td className="px-4 py-2 text-dark-300">Send data to server</td><td className="px-4 py-2 text-dark-400">Submit login form</td><td className="px-4 py-2 text-dark-500">Body can contain SQLi, XSS payloads</td></tr>
                <tr><td className="px-4 py-2 text-blue-400 font-mono">PUT</td><td className="px-4 py-2 text-dark-300">Update/create resource</td><td className="px-4 py-2 text-dark-400">Upload file</td><td className="px-4 py-2 text-red-400">⚠️ If enabled: upload webshells!</td></tr>
                <tr><td className="px-4 py-2 text-red-400 font-mono">DELETE</td><td className="px-4 py-2 text-dark-300">Remove resource</td><td className="px-4 py-2 text-dark-400">Delete account</td><td className="px-4 py-2 text-red-400">⚠️ Without auth = delete anything</td></tr>
                <tr><td className="px-4 py-2 text-purple-400 font-mono">OPTIONS</td><td className="px-4 py-2 text-dark-300">Check allowed methods</td><td className="px-4 py-2 text-dark-400">CORS preflight</td><td className="px-4 py-2 text-dark-500">Reveals what methods are enabled</td></tr>
              </tbody>
            </table>
          </div>

          <div className="command-block mt-4">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Check what methods a server allows</span></div>
            <div className="command-body">
              <div><span className="command-prompt">$ </span><span className="text-white">curl -X OPTIONS http://target.com/ -i</span></div>
              <div className="command-output">HTTP/1.1 200 OK
Allow: GET, HEAD, POST, PUT, DELETE, OPTIONS
Server: Apache/2.4.41</div>
            </div>
            <div className="command-explanation">
              <p className="font-sans text-red-300"><strong>🚨 Finding:</strong> PUT and DELETE are enabled! Attacker could upload a malicious file with PUT or delete resources with DELETE. These should be disabled unless specifically needed.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">3</span>
            HTTP Response Codes — Server's Answer
          </h2>

          <div className="card-glass overflow-hidden p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                  <th className="px-4 py-2.5 text-left text-dark-400">Code</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Meaning</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Security Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr><td className="px-4 py-2 text-emerald-400 font-mono">200 OK</td><td className="px-4 py-2 text-dark-300">Success</td><td className="px-4 py-2 text-dark-500">Page loaded normally</td></tr>
                <tr><td className="px-4 py-2 text-blue-400 font-mono">301/302</td><td className="px-4 py-2 text-dark-300">Redirect</td><td className="px-4 py-2 text-dark-500">Can be abused for open redirect attacks</td></tr>
                <tr><td className="px-4 py-2 text-amber-400 font-mono">403 Forbidden</td><td className="px-4 py-2 text-dark-300">Access denied</td><td className="px-4 py-2 text-dark-500">Page exists but you're not allowed (try other users?)</td></tr>
                <tr><td className="px-4 py-2 text-dark-400 font-mono">404 Not Found</td><td className="px-4 py-2 text-dark-300">Page doesn't exist</td><td className="px-4 py-2 text-dark-500">Useful for directory brute-forcing (200=exists, 404=not)</td></tr>
                <tr><td className="px-4 py-2 text-red-400 font-mono">500 Internal Error</td><td className="px-4 py-2 text-dark-300">Server crashed</td><td className="px-4 py-2 text-red-400">🚨 Often means your payload triggered a bug!</td></tr>
              </tbody>
            </table>
          </div>

          <div className="callout-security mt-4">
            <p className="text-xs"><strong>Pro tip:</strong> During security testing, a <code>500</code> error after injecting special characters (like <code>' OR 1=1 --</code>) strongly suggests an SQL injection vulnerability — the server crashed trying to process your malicious input.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">4</span>
            HTTPS — HTTP + Encryption (TLS)
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            <strong className="text-white">HTTPS = HTTP + TLS encryption.</strong> Without HTTPS, anyone on the same
            network can read everything — your passwords, messages, credit cards — in plain text.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card-glass p-4 border-l-4 border-l-red-500">
              <h4 className="text-xs font-bold text-red-400 mb-2">HTTP (no encryption)</h4>
              <div className="font-mono text-[10px] text-dark-400 bg-white/[0.02] p-2 rounded">
                POST /login HTTP/1.1<br/>
                <br/>
                username=john&password=<span className="text-red-400">MyS3cretP@ss!</span>
              </div>
              <p className="text-[10px] text-red-400 mt-2">⚠️ Anyone on the network can see this password!</p>
            </div>
            <div className="card-glass p-4 border-l-4 border-l-emerald-500">
              <h4 className="text-xs font-bold text-emerald-400 mb-2">HTTPS (TLS encrypted)</h4>
              <div className="font-mono text-[10px] text-dark-400 bg-white/[0.02] p-2 rounded">
                17 03 03 00 1C 8A 4F 2B<br/>
                9E 73 F1 D4 A2 5B C7 91<br/>
                <span className="text-emerald-400">encrypted gibberish...</span>
              </div>
              <p className="text-[10px] text-emerald-400 mt-2">✓ Even on public Wi-Fi, data is unreadable</p>
            </div>
          </div>

          <div className="command-block mt-4">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Check SSL/TLS certificate of a website</span></div>
            <div className="command-body">
              <div><span className="command-prompt">$ </span><span className="text-white">echo | openssl s_client -connect google.com:443 2&gt;/dev/null | openssl x509 -noout -subject -dates</span></div>
              <div className="command-output">subject=CN = *.google.com
notBefore=Jan  8 08:38:47 2025 GMT
notAfter=Apr  2 08:38:46 2025 GMT</div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>What to check:</strong> Is the certificate valid? Is it expired? Does the CN (Common Name) match the domain? An expired or mismatched certificate is a red flag (possible MITM attack).</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-red-500/10 rounded-lg flex items-center justify-center text-xs text-red-400 border border-red-500/20">5</span>
            Security Headers — Server's Defense Instructions
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            Servers can send special headers that tell browsers to enable security features:
          </p>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Check security headers of a website</span></div>
            <div className="command-body">
              <div><span className="command-prompt">$ </span><span className="text-white">curl -sI https://example.com | grep -iE "security|strict|content-security|x-frame|x-content"</span></div>
              <div className="command-output">
{`Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>Missing headers = vulnerabilities:</strong></p>
              <ul className="mt-1 space-y-0.5">
                <li>• No <code>Strict-Transport-Security</code> → MITM can downgrade HTTPS to HTTP</li>
                <li>• No <code>X-Frame-Options</code> → Clickjacking attacks possible</li>
                <li>• No <code>Content-Security-Policy</code> → XSS attacks harder to mitigate</li>
                <li>• No <code>X-Content-Type-Options</code> → MIME sniffing attacks</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• HTTP = request/response protocol. Browser asks, server answers.</li>
            <li>• Methods: GET (read), POST (send), PUT (upload), DELETE (remove)</li>
            <li>• Status codes: 200=OK, 403=forbidden, 404=not found, 500=server error (possible exploit!)</li>
            <li>• HTTPS = HTTP + TLS encryption. Without it, passwords travel in plaintext.</li>
            <li>• <code>curl -v</code> shows full request/response. <code>curl -I</code> shows headers only.</li>
            <li>• Missing security headers = vulnerabilities. Always check with <code>curl -sI</code></li>
            <li>• Every web security test starts with understanding HTTP traffic</li>
          </ul>
        </section>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (<span className="text-emerald-400 text-sm">✅ Completed! +20 XP</span>) : <div/>}
          <button onClick={() => setCompleted(true)} disabled={completed} className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <Link href="/lessons/dns-explained" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: DNS</Link>
          <Link href="/lessons/osi-model-layers" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: The OSI Model — 7 Layers →</Link>
        </div>
      </div>
    </div>
  );
}
