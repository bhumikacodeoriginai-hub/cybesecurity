export const lesson = {
  id: 'L01',
  title: 'What is Cybersecurity?',
  slug: 'what-is-cybersecurity',
  type: 'THEORY',
  duration: 20,
  xpReward: 10,
  difficulty: 'beginner',
  module: { title: 'Introduction to Cybersecurity', slug: 'intro-cybersecurity' },
  course: { title: 'CyberSec Academy', slug: 'cybersec-academy' },
  keyTerms: [
    'Cybersecurity', 'Information Security', 'Cyber Attack',
    'Threat Actor', 'Digital Assets', 'Attack Surface'
  ],
  content: [
    { type: 'heading', content: 'What is Cybersecurity?' },
    { type: 'paragraph', content: 'Cybersecurity is the practice of protecting computers, servers, networks, and data from malicious attacks. In a world where everything from banking to healthcare runs on technology, cybersecurity professionals are the defenders who keep it all safe.' },

    { type: 'callout', variant: 'info', content: 'Think of cybersecurity like home security. You lock your doors (firewalls), install cameras (monitoring), use an alarm system (intrusion detection), and keep valuables in a safe (encryption). Cybersecurity does the same thing — but for digital systems.' },

    { type: 'heading', level: 2, content: 'Why Cybersecurity Matters' },
    { type: 'paragraph', content: 'Every 39 seconds, a cyber attack occurs somewhere in the world. The global cost of cybercrime is projected to reach $10.5 trillion annually by 2025. Organizations of every size — from small businesses to governments — need skilled security professionals.' },

    { type: 'list', items: [
      'Data breaches expose millions of personal records every year',
      'Ransomware attacks shut down hospitals, schools, and critical infrastructure',
      'Nation-state hackers target government secrets and intellectual property',
      'Identity theft costs victims an average of $1,343 per incident',
      'The cybersecurity workforce gap: 3.5 million unfilled jobs globally'
    ]},

    { type: 'heading', level: 2, content: 'What Do Cybersecurity Professionals Do?' },
    { type: 'paragraph', content: 'Cybersecurity is a broad field with many specializations. Here are the main areas:' },

    { type: 'list', items: [
      'Defensive Security (Blue Team) — Monitor networks, detect attacks, respond to incidents',
      'Offensive Security (Red Team) — Authorized hacking to find vulnerabilities before attackers do',
      'Security Engineering — Build and maintain secure systems, firewalls, and encryption',
      'Governance & Compliance — Ensure organizations follow security laws and regulations',
      'Digital Forensics — Investigate cyber crimes and gather evidence',
      'Security Architecture — Design the overall security strategy for an organization'
    ]},

    { type: 'heading', level: 2, content: 'The History of Cybersecurity' },
    { type: 'paragraph', content: 'Cybersecurity has evolved dramatically since the first computer virus appeared in 1986:' },

    { type: 'list', items: [
      '1986 — Brain virus: First PC virus, spread via floppy disks',
      '1988 — Morris Worm: First internet worm, crashed 10% of the internet',
      '1999 — Melissa virus: First major email virus, caused $80M in damages',
      '2010 — Stuxnet: Nation-state cyber weapon destroyed Iranian nuclear centrifuges',
      '2013 — Target breach: 40 million credit cards stolen via HVAC vendor access',
      '2017 — WannaCry: Ransomware hit 200,000+ computers in 150 countries',
      '2020 — SolarWinds: Supply chain attack compromised 18,000+ organizations',
      '2021 — Log4Shell: Critical vulnerability in Log4j affected millions of Java applications',
      '2023 — AI-powered attacks: Deepfakes and AI-generated phishing at scale'
    ]},

    { type: 'heading', level: 2, content: 'Key Concepts You Will Learn' },
    { type: 'paragraph', content: 'This course will teach you the fundamental concepts that every cybersecurity professional needs:' },

    { type: 'list', items: [
      'The CIA Triad — Confidentiality, Integrity, Availability (next lesson)',
      'Threats, Vulnerabilities, and Risks — Understanding what you are defending against',
      'Attack types — Malware, phishing, social engineering, denial of service',
      'Defense strategies — Firewalls, encryption, access control, monitoring',
      'Security frameworks — NIST, ISO 27001, CIS Controls',
      'Hands-on skills — Linux command line, networking, security tools'
    ]},

    { type: 'heading', level: 2, content: 'Who is This Course For?' },
    { type: 'paragraph', content: 'This curriculum is designed for complete beginners with no prior technical experience. We start with simple analogies, build up fundamental concepts, then give you real commands and real outputs. By the end, you will have practical skills that employers look for.' },

    { type: 'callout', variant: 'security', content: 'Important: Everything taught in this course is for authorized, defensive purposes. Using these skills against systems you do not own or have permission to test is illegal. Always practice in authorized lab environments.' },

    { type: 'heading', level: 2, content: 'Summary' },
    { type: 'list', items: [
      'Cybersecurity protects digital systems from unauthorized access and attacks',
      'The field is growing rapidly with a massive skills shortage',
      'Specializations range from offensive (pentesting) to defensive (SOC analyst)',
      'You do not need a technical background to start — this course begins from zero',
      'Next up: The CIA Triad — the three pillars of all information security'
    ]},
  ],
  navigation: {
    prev: null,
    next: { title: 'The CIA Triad', slug: 'the-cia-triad' },
  },
};
