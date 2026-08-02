export const lesson = {
  id: 'L02',
  title: 'The CIA Triad',
  slug: 'the-cia-triad',
  type: 'THEORY',
  duration: 25,
  xpReward: 15,
  difficulty: 'beginner',
  module: { title: 'Introduction to Cybersecurity', slug: 'intro-cybersecurity' },
  course: { title: 'CyberSec Academy', slug: 'cybersec-academy' },
  keyTerms: ['Confidentiality', 'Integrity', 'Availability', 'CIA Triad', 'Encryption', 'Hashing', 'Redundancy'],
  content: [
    { type: 'heading', content: 'The CIA Triad: Foundation of Information Security' },
    { type: 'paragraph', content: 'The CIA Triad is the most fundamental model in information security. It stands for Confidentiality, Integrity, and Availability — the three core principles that guide every security decision, policy, and control.' },

    { type: 'callout', variant: 'info', content: 'The CIA Triad is referenced in virtually every cybersecurity framework, certification exam, and security policy. Understanding it deeply is essential — every security control you will ever implement maps back to protecting one or more of these three principles.' },

    { type: 'heading', level: 2, content: 'Confidentiality' },
    { type: 'paragraph', content: 'Ensuring that information is only accessible to those authorized to access it. This prevents unauthorized disclosure of data.' },
    { type: 'paragraph', content: 'Methods to achieve confidentiality:' },
    { type: 'list', items: ['Encryption (AES-256, RSA) — Makes data unreadable without the key', 'Access Control Lists (ACLs) — Define who can access what', 'Authentication mechanisms — Verify identity before granting access', 'Data classification — Label data by sensitivity level', 'Need-to-know principle — Only share data with those who require it'] },

    { type: 'example', title: 'Real-World Example', content: 'When you log into your bank, TLS encryption protects your credentials in transit. Only the bank servers can decrypt and verify your password. This ensures confidentiality of your login information — even if someone intercepts the network traffic, they see only encrypted gibberish.' },

    { type: 'heading', level: 2, content: 'Integrity' },
    { type: 'paragraph', content: 'Ensuring that data has not been altered, corrupted, or tampered with — either in storage or in transit. Data integrity means the information is trustworthy and accurate.' },
    { type: 'paragraph', content: 'Methods to achieve integrity:' },
    { type: 'list', items: ['Hashing algorithms (SHA-256) — Produce a unique fingerprint of data', 'Digital signatures — Prove who created/modified data', 'Checksums — Verify files were not corrupted during transfer', 'Version control — Track all changes with full history', 'Input validation — Reject malformed or suspicious data'] },

    { type: 'example', title: 'Real-World Example', content: 'When you download software, the website provides a SHA-256 hash. After downloading, you compute the hash of your file. If it matches, the file has not been tampered with during download — no malware was injected.' },

    { type: 'heading', level: 2, content: 'Availability' },
    { type: 'paragraph', content: 'Ensuring that systems, applications, and data are accessible to authorized users when they need them. Downtime directly impacts availability.' },
    { type: 'paragraph', content: 'Methods to achieve availability:' },
    { type: 'list', items: ['Redundancy and failover — Backup systems take over if primary fails', 'Load balancing — Distribute traffic across multiple servers', 'Regular backups — Recover data if something is lost or corrupted', 'Disaster recovery plans — Documented procedures for catastrophic events', 'DDoS protection — Absorb or deflect flood attacks', 'Monitoring and alerting — Detect outages before users notice'] },

    { type: 'example', title: 'Real-World Example', content: 'A hospital electronic health records system must be available 24/7. If a DDoS attack overwhelms the servers, doctors cannot access patient data — lives are at risk. Redundant servers, DDoS mitigation, and failover ensure continuous availability.' },

    { type: 'heading', level: 2, content: 'The Triad in Practice' },
    { type: 'paragraph', content: 'In real-world security, these three principles often create trade-offs. Increasing confidentiality (strong encryption) might slightly reduce availability (slower access). A good security architect balances all three based on what they are protecting.' },

    { type: 'callout', variant: 'security', content: 'Remember: Security is about balancing the CIA Triad based on what you are protecting. A public website prioritizes availability. A medical database prioritizes confidentiality. A financial ledger prioritizes integrity. Context determines the balance.' },

    { type: 'heading', level: 2, content: 'Summary' },
    { type: 'list', items: [
      'Confidentiality — Keep secrets secret (encryption, access control)',
      'Integrity — Ensure data is not tampered with (hashing, signatures)',
      'Availability — Keep systems running and accessible (redundancy, backups)',
      'Every security control maps to one or more of these three principles',
      'The balance between them depends on what you are protecting'
    ]},
  ],
  navigation: {
    prev: { title: 'What is Cybersecurity?', slug: 'what-is-cybersecurity' },
    next: { title: 'Threats, Vulnerabilities & Risks', slug: 'threats-vulnerabilities-risks' },
  },
};
