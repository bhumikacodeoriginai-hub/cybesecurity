'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PipesRedirectionLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-dark-500 mb-6">
        <Link href="/courses/complete-cybersecurity" className="hover:text-white">Course</Link>
        <span className="text-dark-700">/</span>
        <span className="text-dark-300">Pipes, Redirection & Shell</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="badge-intermediate">PRACTICAL</span>
          <span className="text-xs text-dark-500">Module 3 · Lesson 18</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Pipes, Redirection & Shell Scripting Basics</h1>
        <p className="text-dark-400 leading-relaxed">
          Pipes let you chain commands together — the output of one becomes the input of the next.
          This is what makes the command line incredibly powerful. One line of piped commands can
          do what would take hours in a GUI.
        </p>
        <div className="flex items-center gap-5 mt-4 text-xs text-dark-500">
          <span>🕐 30 minutes</span><span>⚡ +20 XP</span><span>💻 Practical</span>
        </div>
      </div>

      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">1</span>
            The Pipe ( | ) — Connecting Commands
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            The pipe symbol <code className="text-cyber-400 text-lg">|</code> takes the <strong className="text-white">output of one command</strong> and sends it as <strong className="text-white">input to the next command</strong>. Like an assembly line in a factory.
          </p>

          <div className="callout-info">
            <p className="text-sm font-medium mb-2">🏭 Factory Analogy:</p>
            <p className="text-xs opacity-90">
              <code>cat file | grep error | sort | uniq -c | sort -rn</code><br/>
              = Read file → Filter only error lines → Sort alphabetically → Count duplicates → Sort by count (biggest first)
            </p>
          </div>

          <div className="command-block mt-4">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Security example: Find top attacking IPs</span></div>
            <div className="command-body">
              <div><span className="command-prompt">$ </span><span className="text-white">cat /var/log/auth.log | grep "Failed password" | awk '{'{'}print $(NF-3){'}'}' | sort | uniq -c | sort -rn | head -5</span></div>
              <div className="command-output">
{`    142 203.0.113.42
     23 198.51.100.15
      5 192.0.2.100
      2 10.0.0.55
      1 172.16.0.5`}
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans"><strong>Breaking it down:</strong></p>
              <ol className="mt-1 space-y-1 list-decimal ml-4">
                <li><code>cat /var/log/auth.log</code> → read the entire log file</li>
                <li><code>grep "Failed password"</code> → keep only lines with failed logins</li>
                <li><code>awk '{'{'}print $(NF-3){'}'}'</code> → extract just the IP address field</li>
                <li><code>sort</code> → sort IPs alphabetically (needed for uniq)</li>
                <li><code>uniq -c</code> → count consecutive identical lines</li>
                <li><code>sort -rn</code> → sort by count, highest first</li>
                <li><code>head -5</code> → show only top 5 results</li>
              </ol>
              <p className="mt-2 text-amber-300/80"><strong>🔒 This single command is used DAILY by SOC analysts to identify brute-force attackers.</strong></p>
            </div>
          </div>

          <div className="command-block">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">More security pipe examples</span></div>
            <div className="command-body text-xs space-y-3">
              <div>
                <p className="text-dark-500"># Find all unique user agents in web logs (spot bots/scanners)</p>
                <div><span className="command-prompt">$ </span><span className="text-white">cat /var/log/apache2/access.log | awk -F'"' '{'{'}print $6{'}'}' | sort | uniq -c | sort -rn | head -10</span></div>
              </div>
              <div>
                <p className="text-dark-500"># Count HTTP response codes (find errors, attacks)</p>
                <div><span className="command-prompt">$ </span><span className="text-white">cat access.log | awk '{'{'}print $9{'}'}' | sort | uniq -c | sort -rn</span></div>
                <div className="command-output">  12503 200
    834 404
    156 403
     42 500
     12 401</div>
              </div>
              <div>
                <p className="text-dark-500"># List all open network connections</p>
                <div><span className="command-prompt">$ </span><span className="text-white">netstat -an | grep ESTABLISHED | awk '{'{'}print $5{'}'}' | cut -d: -f1 | sort | uniq -c | sort -rn</span></div>
                <div className="command-output">     5 203.0.113.42
     2 10.0.0.1
     1 8.8.8.8</div>
              </div>
            </div>
            <div className="command-explanation">
              <p className="font-sans">🚨 IP 203.0.113.42 has 5 established connections — if this is the attacker IP from auth.log, they have multiple active sessions! Respond: <code>sudo iptables -A INPUT -s 203.0.113.42 -j DROP</code></p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xs text-emerald-400 border border-emerald-500/20">2</span>
            Redirection — Saving Output to Files
          </h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            By default, command output goes to your screen. Redirection sends it to a file instead:
          </p>

          <div className="card-glass overflow-hidden p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                  <th className="px-4 py-2.5 text-left text-dark-400">Operator</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">What it does</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">&gt;</td><td className="px-4 py-2 text-dark-300">Write output to file (overwrites!)</td><td className="px-4 py-2 text-dark-500 font-mono">ls &gt; filelist.txt</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">&gt;&gt;</td><td className="px-4 py-2 text-dark-300">Append output to file (adds to end)</td><td className="px-4 py-2 text-dark-500 font-mono">echo "note" &gt;&gt; report.txt</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">&lt;</td><td className="px-4 py-2 text-dark-300">Read input from file</td><td className="px-4 py-2 text-dark-500 font-mono">sort &lt; unsorted.txt</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">2&gt;</td><td className="px-4 py-2 text-dark-300">Redirect errors to file</td><td className="px-4 py-2 text-dark-500 font-mono">find / 2&gt; /dev/null</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">&amp;&gt;</td><td className="px-4 py-2 text-dark-300">Redirect ALL output (normal + errors)</td><td className="px-4 py-2 text-dark-500 font-mono">scan.sh &amp;&gt; results.txt</td></tr>
              </tbody>
            </table>
          </div>

          <div className="command-block mt-4">
            <div className="command-header"><span className="text-[11px] text-dark-500 font-mono">Security use: Save investigation findings</span></div>
            <div className="command-body text-xs space-y-2">
              <p className="text-dark-500"># Save all suspicious findings to a report</p>
              <div><span className="command-prompt">$ </span><span className="text-white">echo "=== Incident Report ===" &gt; /tmp/report.txt</span></div>
              <div><span className="command-prompt">$ </span><span className="text-white">echo "Date: $(date)" &gt;&gt; /tmp/report.txt</span></div>
              <div><span className="command-prompt">$ </span><span className="text-white">echo "--- Failed Logins ---" &gt;&gt; /tmp/report.txt</span></div>
              <div><span className="command-prompt">$ </span><span className="text-white">grep "Failed" /var/log/auth.log &gt;&gt; /tmp/report.txt</span></div>
              <div><span className="command-prompt">$ </span><span className="text-white">echo "--- Suspicious Users ---" &gt;&gt; /tmp/report.txt</span></div>
              <div><span className="command-prompt">$ </span><span className="text-white">grep bash /etc/passwd &gt;&gt; /tmp/report.txt</span></div>
            </div>
            <div className="command-explanation">
              <p className="font-sans">This creates a structured incident report file. <code>&gt;</code> creates/overwrites, <code>&gt;&gt;</code> appends. Real investigators document everything as they find it.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-cyber-400/10 rounded-lg flex items-center justify-center text-xs text-cyber-400 border border-cyber-400/20">3</span>
            Essential Pipeline Tools
          </h2>

          <div className="card-glass overflow-hidden p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                  <th className="px-4 py-2.5 text-left text-dark-400">Tool</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">What it does</th>
                  <th className="px-4 py-2.5 text-left text-dark-400">Security Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">sort</td><td className="px-4 py-2 text-dark-300">Sort lines alphabetically/numerically</td><td className="px-4 py-2 text-dark-500">Required before uniq</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">uniq -c</td><td className="px-4 py-2 text-dark-300">Count duplicate consecutive lines</td><td className="px-4 py-2 text-dark-500">Count attacks per IP</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">wc -l</td><td className="px-4 py-2 text-dark-300">Count number of lines</td><td className="px-4 py-2 text-dark-500">"How many failed logins?"</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">head -n / tail -n</td><td className="px-4 py-2 text-dark-300">Show first/last N lines</td><td className="px-4 py-2 text-dark-500">View top results or latest logs</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">awk '{'{'}print $N{'}'}'</td><td className="px-4 py-2 text-dark-300">Extract specific columns</td><td className="px-4 py-2 text-dark-500">Pull IPs, usernames from logs</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">cut -d: -f1</td><td className="px-4 py-2 text-dark-300">Split by delimiter, get field</td><td className="px-4 py-2 text-dark-500">Extract usernames from /etc/passwd</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">tee</td><td className="px-4 py-2 text-dark-300">Output to screen AND file simultaneously</td><td className="px-4 py-2 text-dark-500">Save while watching live</td></tr>
                <tr><td className="px-4 py-2 text-cyber-400 font-mono">xargs</td><td className="px-4 py-2 text-dark-300">Build commands from input</td><td className="px-4 py-2 text-dark-500">Process file lists from find</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="card-glass p-5">
          <h3 className="font-semibold text-white mb-3">✓ Key Takeaways</h3>
          <ul className="space-y-1.5 text-sm text-dark-300">
            <li>• Pipe <code>|</code> = send output of one command as input to the next</li>
            <li>• <code>&gt;</code> = write to file (overwrite), <code>&gt;&gt;</code> = append to file</li>
            <li>• The "top IPs" pipeline: <code>grep | awk | sort | uniq -c | sort -rn | head</code></li>
            <li>• <code>2&gt;/dev/null</code> hides error messages (clean output)</li>
            <li>• These tools (sort, uniq, wc, awk, cut) are used in 90% of security analysis</li>
            <li>• Master pipes = master log analysis = become a great SOC analyst</li>
          </ul>
        </section>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          {completed ? (<span className="text-emerald-400 text-sm">✅ Completed! +20 XP</span>) : <div/>}
          <button onClick={() => setCompleted(true)} disabled={completed} className={completed ? 'btn-ghost text-emerald-400' : 'btn-primary'}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <Link href="/lessons/finding-files-text" className="text-dark-500 hover:text-white transition-colors text-sm">← Previous: grep & find</Link>
          <Link href="/lessons/process-management" className="text-cyber-400 hover:text-cyber-300 transition-colors text-sm font-medium">Next: Process Management →</Link>
        </div>
      </div>
    </div>
  );
}
