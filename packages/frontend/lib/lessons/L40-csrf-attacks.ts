export const lesson = {
  id: 'L40',
  title: 'Cross-Site Request Forgery (CSRF)',
  slug: 'csrf-attacks',
  type: 'PRACTICAL',
  duration: 45,
  xpReward: 35,
  difficulty: 'advanced',
  module: { title: 'Web Application Security', slug: 'web-security' },
  course: { title: 'Web Security Fundamentals', slug: 'web-security-fundamentals' },
  keyTerms: [
    'CSRF', 'Anti-CSRF Token', 'SameSite Cookie',
    'Origin Header', 'Referer Header', 'State-Changing Request',
    'Double Submit Cookie', 'Synchronizer Token Pattern'
  ],
  content: [
    { type: 'heading', content: 'Cross-Site Request Forgery (CSRF)' },
    { type: 'paragraph', content: 'CSRF tricks a logged-in user\'s browser into sending a forged request to a vulnerable site. Because the browser automatically attaches cookies (including session cookies), the server thinks the request came from the legitimate user. The attacker never sees the response — they just trigger actions.' },


    { type: 'callout', variant: 'info', content: 'Analogy: Imagine you\'re logged into your bank on one browser tab. CSRF is like opening a malicious website in another tab that secretly submits a "transfer $10,000" form to your bank. Your browser sends your session cookie with the request, so the bank thinks YOU made the transfer. You never clicked anything on the bank\'s site — the attacker\'s page did it for you.' },

    { type: 'heading', level: 2, content: 'How CSRF Works' },
    { type: 'list', items: [
      '1. Victim logs into bank.com — browser stores session cookie',
      '2. Victim visits evil-site.com (attacker\'s page) in a new tab',
      '3. evil-site.com contains a hidden form that submits to bank.com/transfer',
      '4. The form auto-submits via JavaScript: amount=$10000, to=attacker_account',
      '5. Browser attaches the bank.com session cookie automatically (same origin for cookies)',
      '6. bank.com receives what looks like a legitimate transfer request from the authenticated user',
      '7. Transfer completes — victim loses $10,000'
    ]},

    { type: 'heading', level: 2, content: 'CSRF Attack Examples' },

    { type: 'heading', level: 3, content: 'Example 1: Hidden Form Auto-Submit' },
    { type: 'command', command: 'cat csrf_attack.html', output: `<html>
<body>
  <h1>You won a free iPhone! Click below to claim.</h1>
  
  <!-- Hidden CSRF attack form -->
  <iframe name="hidden" style="display:none"></iframe>
  <form method="POST" action="https://bank.com/transfer" target="hidden">
    <input type="hidden" name="to_account" value="ATTACKER-1234567" />
    <input type="hidden" name="amount" value="10000" />
    <input type="hidden" name="currency" value="USD" />
  </form>
  
  <script>
    // Auto-submit the form when page loads
    document.forms[0].submit();
  </script>
</body>
</html>`, explanation: 'The victim sees "You won an iPhone!" but the hidden form silently transfers money. The iframe prevents the page from navigating away (victim stays on the attacker\'s page, unaware). The browser sends the bank.com cookie with the POST request.' },

    { type: 'heading', level: 3, content: 'Example 2: Image Tag GET Request' },
    { type: 'command', command: 'cat csrf_get.html', output: `<!-- If the app uses GET for state changes (bad design) -->
<img src="https://admin-panel.com/users/delete?id=42" width="0" height="0" />

<!-- Email signature CSRF -->
<img src="https://router.local/admin/change_password?new=hacked123" />

<!-- Forum post containing the attack -->
<img src="https://social-media.com/settings/email?change_to=attacker@evil.com" />`, explanation: 'An invisible image tag triggers a GET request with the victim\'s cookies. This is why state-changing actions should NEVER use GET requests — they\'re trivially CSRF-able via images, and images are allowed almost everywhere (emails, forums, comments).' },

    { type: 'heading', level: 3, content: 'Example 3: Password Change CSRF' },
    { type: 'command', command: 'cat csrf_password_change.html', output: `<html>
<body onload="document.getElementById('csrf-form').submit();">
  <form id="csrf-form" method="POST" action="https://target.com/account/password" style="display:none">
    <input name="new_password" value="attacker_password_123" />
    <input name="confirm_password" value="attacker_password_123" />
    <!-- Note: no "current_password" field required — vulnerability! -->
  </form>
</body>
</html>`, explanation: 'If the password change form doesn\'t require the CURRENT password, CSRF can change it. The attacker changes the victim\'s password and locks them out. Always require re-authentication for sensitive operations.' },

    { type: 'callout', variant: 'security', content: 'Real-world CSRF impacts: Changing account email (then resetting password), transferring funds, modifying admin settings, adding attacker as admin user, purchasing items with stored payment info, disabling security features (MFA). Any state-changing action without CSRF protection is vulnerable.' },


    { type: 'heading', level: 2, content: 'Why Browsers Make CSRF Possible' },
    { type: 'paragraph', content: 'CSRF exists because of how browsers handle cookies:' },
    { type: 'list', items: [
      'Cookies are automatically attached to EVERY request to their domain',
      'If you\'re logged into bank.com, ANY request to bank.com includes your session cookie',
      'The browser doesn\'t care WHERE the request originates — only WHERE it goes',
      'A form on evil.com posting to bank.com still sends bank.com cookies',
      'This "ambient authority" is the root cause of CSRF'
    ]},

    { type: 'heading', level: 2, content: 'Prevention: CSRF Defenses' },

    { type: 'heading', level: 3, content: '1. Anti-CSRF Tokens (Synchronizer Token Pattern)' },
    { type: 'paragraph', content: 'The server generates a random, unique token for each session (or each form). This token must be included in every state-changing request. The attacker can\'t read the token from another origin.' },

    { type: 'command', command: 'cat csrf_protected_form.html', output: `<form method="POST" action="/transfer">
  <!-- This token is unique per session and embedded in the form -->
  <!-- The attacker on evil.com CANNOT read this value (same-origin policy) -->
  <input type="hidden" name="_csrf" value="a8b7c6d5-e4f3-2g1h-0i9j-k8l7m6n5o4p3" />
  
  <input name="to_account" placeholder="Recipient Account" />
  <input name="amount" placeholder="Amount" />
  <button type="submit">Transfer</button>
</form>`, explanation: 'The CSRF token is generated server-side and embedded in the form. When submitted, the server verifies the token matches what it issued. An attacker on evil.com can\'t read this token due to the browser\'s Same-Origin Policy — their forged request will be rejected.' },

    { type: 'command', command: 'cat csrf_middleware.js', output: `// Express.js CSRF protection middleware
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.get('/transfer', csrfProtection, (req, res) => {
  // Generate token and pass to template
  res.render('transfer', { csrfToken: req.csrfToken() });
});

app.post('/transfer', csrfProtection, (req, res) => {
  // csurf middleware automatically validates the _csrf field
  // If invalid or missing: 403 Forbidden
  processTransfer(req.body);
  res.redirect('/success');
});`, explanation: 'The csurf middleware handles token generation and validation automatically. GET requests receive a token; POST requests must include a valid token or get rejected with 403.' },

    { type: 'heading', level: 3, content: '2. SameSite Cookie Attribute' },
    { type: 'paragraph', content: 'Modern browsers support SameSite which controls when cookies are sent with cross-site requests:' },
    { type: 'list', items: [
      'SameSite=Strict — Cookie NEVER sent with cross-site requests (strongest, but breaks some UX)',
      'SameSite=Lax — Cookie sent with top-level navigations (GET) but NOT with cross-site POST/iframe',
      'SameSite=None — Cookie always sent (old behavior, requires Secure flag)',
      'Lax is the DEFAULT in modern browsers — provides baseline CSRF protection for POST requests',
      'Use Strict for sensitive cookies (admin sessions), Lax for general sessions'
    ]},

    { type: 'command', command: 'cat samesite_cookie.txt', output: `Set-Cookie: session_id=abc123; SameSite=Lax; Secure; HttpOnly; Path=/

# With SameSite=Lax:
# ✓ User clicks link TO your site from Google — cookie sent (good UX)
# ✓ User types your URL directly — cookie sent
# ✗ evil.com form POSTs to your site — cookie NOT sent (CSRF blocked!)
# ✗ evil.com iframe loads your site — cookie NOT sent
# ✗ evil.com JavaScript fetches your API — cookie NOT sent`, explanation: 'SameSite=Lax blocks the most dangerous CSRF vectors (POST forms from other sites) while allowing normal navigation. It\'s a great default but shouldn\'t be your ONLY defense — use tokens too.' },

    { type: 'heading', level: 3, content: '3. Verify Origin and Referer Headers' },
    { type: 'command', command: 'cat origin_check.js', output: `// Server-side Origin/Referer validation
function validateOrigin(req, res, next) {
  const origin = req.headers.origin || req.headers.referer;
  const allowedOrigins = ['https://mysite.com', 'https://www.mysite.com'];
  
  if (req.method !== 'GET') {
    if (!origin || !allowedOrigins.some(o => origin.startsWith(o))) {
      return res.status(403).json({ error: 'Invalid origin' });
    }
  }
  next();
}`, explanation: 'The Origin header tells the server where the request originated. If a POST to bank.com has Origin: https://evil.com, it\'s clearly CSRF. Note: Some browsers don\'t always send Origin, so this is a supplementary defense.' },

    { type: 'heading', level: 3, content: '4. Custom Request Headers' },
    { type: 'paragraph', content: 'For AJAX/API calls, require a custom header (like X-Requested-With). Cross-origin requests can\'t set custom headers without a CORS preflight, which the server can deny.' },

    { type: 'command', command: 'cat custom_header_defense.js', output: `// Frontend: Always include custom header in API calls
fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Protection': '1'  // Custom header
  },
  body: JSON.stringify({ to: 'account123', amount: 1000 })
});

// Backend: Reject requests without the custom header
app.use('/api', (req, res, next) => {
  if (req.method !== 'GET' && !req.headers['x-csrf-protection']) {
    return res.status(403).json({ error: 'Missing CSRF header' });
  }
  next();
});`, explanation: 'Simple HTML forms CANNOT set custom headers — only JavaScript can. A cross-origin site can\'t add custom headers without CORS permission. So requiring a custom header blocks form-based CSRF attacks.' },

    { type: 'heading', level: 2, content: 'CSRF vs XSS: The Relationship' },
    { type: 'list', items: [
      'CSRF: Attacker forces victim to PERFORM actions (but can\'t read the response)',
      'XSS: Attacker can READ data and PERFORM actions (more powerful)',
      'XSS defeats CSRF tokens — if attacker has XSS, they can read the token from the page',
      'Fix XSS first — it undermines all CSRF defenses',
      'CSRF needs the victim to be authenticated; XSS works regardless'
    ]},

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'list', items: [
      'CSRF exploits the browser\'s automatic cookie attachment — requests look legitimate',
      'Any state-changing endpoint without CSRF protection is vulnerable',
      'Never use GET for state changes (delete, update, transfer) — only POST/PUT/DELETE',
      'Anti-CSRF tokens are the primary defense — unique per session, validated server-side',
      'SameSite=Lax cookies provide baseline protection in modern browsers',
      'Defense in depth: CSRF tokens + SameSite cookies + Origin validation + custom headers',
      'Re-authenticate for sensitive operations (password change, fund transfer)',
      'XSS bypasses all CSRF defenses — fix XSS as highest priority'
    ]},
  ],
  navigation: {
    prev: { title: 'Authentication Vulnerabilities & Session Management', slug: 'auth-vulnerabilities' },
    next: { title: 'Server-Side Request Forgery (SSRF) & Injection Attacks', slug: 'ssrf-injection' },
  },
};
