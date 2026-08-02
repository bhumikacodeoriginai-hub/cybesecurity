import { LabData } from './index';

export const lab01: LabData = {
  id: 'lab-01',
  title: 'Security Mindset: Analyzing a Breach',
  slug: 'security-mindset-challenge',
  module: 'Introduction to Cybersecurity',
  moduleNumber: 1,
  difficulty: 'BEGINNER',
  duration: 30,
  description: 'Apply CIA Triad concepts to analyze a real-world breach scenario. Learn to think like a security professional by classifying threats, identifying vulnerabilities, and assessing risk.',
  scenario: 'A healthcare company "MedCorp" was breached. Patient records were stolen and sold on the dark web. The attacker exploited an unpatched Apache server (CVE-2021-41773) exposed to the internet with default credentials on the admin panel. 3.2 million patient records including names, SSNs, and medical histories were exfiltrated over 6 weeks before detection.',
  objectives: [
    'Identify which CIA principles were violated',
    'Classify the threat actor type and motivation',
    'Identify all vulnerabilities that enabled the breach',
    'Calculate the risk level using the risk equation',
    'Recommend security controls to prevent recurrence',
  ],
  prerequisites: ['Complete Lesson 1-5 (CIA Triad, Threats, Risks, Controls)'],
  tools: ['Analysis Framework', 'CIA Triad Model', 'Risk Equation'],
  steps: [
    {
      id: 1,
      title: 'Read the Breach Scenario',
      instruction: 'First, examine what happened. Read the incident details carefully.',
      command: 'cat /incident-report/medcorp-breach-summary.txt',
      expectedOutput: `INCIDENT REPORT: MedCorp Healthcare Data Breach
================================================================
Date Discovered: 2024-03-15
Date of Initial Compromise: 2024-02-01 (estimated)
Duration: ~6 weeks undetected

WHAT HAPPENED:
- Attacker exploited CVE-2021-41773 (Apache path traversal)
- Admin panel was accessible with default credentials (admin/admin)
- Attacker gained access to patient database
- 3.2 million records exfiltrated via encrypted HTTPS to external server

DATA STOLEN:
- Full names, dates of birth
- Social Security Numbers (SSN)
- Medical diagnoses and treatment history
- Insurance information
- Home addresses and phone numbers

IMPACT:
- HIPAA violation (mandatory 60-day notification)
- Estimated cost: $12.8 million (fines + remediation + lawsuits)
- Reputation damage: Stock dropped 15% after disclosure`,
      explanation: 'This is a real-world style breach report. Note the key facts: known vulnerability (CVE), default credentials, long dwell time (6 weeks), sensitive data (healthcare/PII), and massive impact. Every detail maps to security concepts you learned.',
    },
    {
      id: 2,
      title: 'Identify CIA Violations',
      instruction: 'Which principles of the CIA Triad were violated? Analyze each one.',
      command: 'cat /analysis/cia-assessment.txt',
      expectedOutput: `CIA TRIAD ANALYSIS - MedCorp Breach
================================================================

CONFIDENTIALITY: [VIOLATED - CRITICAL]
- 3.2M patient records exposed to unauthorized party
- SSNs, medical records = highly sensitive PII
- Data sold on dark web = complete confidentiality failure

INTEGRITY: [PARTIALLY VIOLATED]
- No evidence data was MODIFIED in the database
- However, integrity of the SYSTEM was compromised
- Attacker had admin access = COULD have modified records
- Trust in data accuracy is now uncertain

AVAILABILITY: [NOT DIRECTLY IMPACTED]
- Systems remained operational during the breach
- However, post-breach remediation caused 48h downtime
- Long-term: regulatory actions may force system changes

PRIMARY VIOLATION: Confidentiality (data disclosure)
SECONDARY: Integrity (system compromise, trust lost)`,
      explanation: 'This breach primarily violates CONFIDENTIALITY (unauthorized data access). Integrity is secondary (attacker had admin access so could modify data). Availability was not the target but was affected during remediation. Most data breaches primarily target confidentiality.',
    },
    {
      id: 3,
      title: 'Classify the Threat Actor',
      instruction: 'Based on the evidence, what type of attacker did this and what was their motivation?',
      command: 'cat /analysis/threat-actor-profile.txt',
      expectedOutput: `THREAT ACTOR CLASSIFICATION
================================================================

TYPE: Cybercriminal (organized)
EVIDENCE:
- Data sold on dark web marketplace = financial motivation
- Used known CVE (not zero-day) = moderate technical skill
- Exfiltrated over 6 weeks = patient, methodical
- Used encryption for exfil = aware of detection methods

MOTIVATION: Financial gain
- Healthcare records sell for $250-$1000 per record on dark web
- 3.2M records x $250 (low estimate) = $800M potential value
- Much higher than credit cards ($5-$20 each)

SKILL LEVEL: Moderate
- Used publicly known exploit (not custom)
- Exploited default credentials (low sophistication)
- But: maintained access for 6 weeks undetected (operational security)

NOT LIKELY:
- Nation-state (would target specific patients, not bulk data)
- Hacktivist (no public statement or defacement)
- Insider (attack came from external IP via CVE exploit)`,
      explanation: 'Cybercriminals motivated by money are the most common threat to healthcare. They sell stolen records on dark web markets. Healthcare data is worth 10-50x more than credit card numbers because it contains enough info for identity theft, insurance fraud, and blackmail.',
    },
    {
      id: 4,
      title: 'Identify All Vulnerabilities',
      instruction: 'List every weakness that allowed this breach to happen.',
      command: 'cat /analysis/vulnerability-assessment.txt',
      expectedOutput: `VULNERABILITIES IDENTIFIED
================================================================

1. UNPATCHED SOFTWARE [CRITICAL]
   - Apache 2.4.49 with CVE-2021-41773 (path traversal)
   - Patch available since October 2021
   - Server was 5 months behind on patches
   - CVSS Score: 7.5 (High)

2. DEFAULT CREDENTIALS [CRITICAL]
   - Admin panel: admin/admin (never changed)
   - No account lockout after failed attempts
   - No multi-factor authentication

3. EXCESSIVE EXPOSURE [HIGH]
   - Admin panel exposed to the internet
   - No IP whitelist or VPN requirement
   - No Web Application Firewall (WAF)

4. POOR MONITORING [HIGH]
   - 6 weeks dwell time = no detection
   - No alerts on large data transfers
   - No log analysis or SIEM in place

5. NO DATA LOSS PREVENTION [MEDIUM]
   - 3.2M records exfiltrated with no DLP alert
   - No database activity monitoring
   - No encryption of data at rest

6. FLAT NETWORK [MEDIUM]
   - Web server could directly access patient database
   - No network segmentation between DMZ and database tier`,
      explanation: 'Multiple vulnerabilities chained together enabled this breach. A single vulnerability alone might not have been enough — it was the COMBINATION that was deadly. This is why defense-in-depth matters: patch management + strong auth + monitoring + segmentation together would have prevented this.',
    },
    {
      id: 5,
      title: 'Calculate Risk Level',
      instruction: 'Apply the risk equation: Risk = Threat x Vulnerability x Impact',
      command: 'cat /analysis/risk-calculation.txt',
      expectedOutput: `RISK CALCULATION
================================================================

Formula: RISK = THREAT x VULNERABILITY x IMPACT

THREAT LEVEL: HIGH (9/10)
- Cybercriminals actively target healthcare
- Healthcare is the #1 targeted industry for data theft
- Automated scanners find unpatched servers within hours

VULNERABILITY LEVEL: CRITICAL (10/10)
- Known CVE with public exploit (trivial to exploit)
- Default credentials (no skill needed)
- No compensating controls (WAF, MFA, monitoring)

IMPACT LEVEL: CRITICAL (10/10)
- 3.2M sensitive healthcare records
- HIPAA regulatory violation ($50K-$1.5M per violation category)
- Total estimated cost: $12.8 million
- Patient harm: identity theft, insurance fraud, discrimination

RISK SCORE: 9 x 10 x 10 = 900 / 1000 = CRITICAL

CONCLUSION: This was a PREVENTABLE breach.
Every vulnerability had a known, affordable fix.
Total prevention cost: ~$50,000/year
Breach cost: $12,800,000
ROI of security: 256x`,
      explanation: 'The risk equation shows this was maximum risk on all three dimensions. The tragedy is that every vulnerability had a simple fix: patching ($0), changing passwords ($0), adding MFA ($5/user/month), implementing monitoring ($20K/year). $50K in prevention would have saved $12.8M.',
    },
    {
      id: 6,
      title: 'Recommend Security Controls',
      instruction: 'What controls should MedCorp implement to prevent this from happening again?',
      command: 'cat /analysis/remediation-plan.txt',
      expectedOutput: `REMEDIATION RECOMMENDATIONS
================================================================

IMMEDIATE (This Week):
[P] Patch all systems to latest versions (automated patching)
[P] Change ALL default credentials across infrastructure
[P] Enable MFA on all admin interfaces
[P] Restrict admin panels to VPN/internal access only

SHORT-TERM (30 Days):
[D] Deploy SIEM for centralized log monitoring
[D] Implement database activity monitoring (DAM)
[D] Deploy Web Application Firewall (WAF)
[D] Set up alerts for large data transfers (DLP)

MEDIUM-TERM (90 Days):
[P] Network segmentation (isolate database from DMZ)
[P] Implement Zero Trust architecture
[D] Deploy intrusion detection system (IDS)
[C] Establish incident response plan and team

LONG-TERM (Ongoing):
[P] Monthly vulnerability scanning
[P] Quarterly penetration testing
[D] 24/7 SOC monitoring
[P] Security awareness training for all staff
[C] Annual disaster recovery testing

Legend: [P]=Preventive [D]=Detective [C]=Corrective`,
      explanation: 'Notice how controls map to the types you learned: Preventive (stop attacks), Detective (find attacks), Corrective (recover from attacks). The immediate fixes are all free or cheap — there is no excuse for default passwords or unpatched systems in 2024.',
    },
  ],
  summary: [
    'This breach violated primarily Confidentiality (data stolen) with secondary Integrity impact',
    'The attacker was a financially motivated cybercriminal (most common threat to healthcare)',
    'Six vulnerabilities chained together: unpatched CVE + default creds + no monitoring + flat network',
    'Risk was CRITICAL across all dimensions — yet entirely preventable with basic security hygiene',
    'Prevention cost ($50K/year) vs breach cost ($12.8M) = 256x ROI on security investment',
    'Defense-in-depth: No single control would have been enough, but layers together would have stopped it',
  ],
};
