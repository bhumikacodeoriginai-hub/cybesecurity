'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * COMPLETE 3-MONTH CYBERSECURITY COURSE
 * 12 Weeks · 10 Modules · 60+ Lessons · 20+ Labs
 * Every lesson has real examples, commands, and practical exercises
 */

const courseModules = [
  {
    id: 'mod-1',
    week: 'Week 1-2',
    title: 'Module 1: Cybersecurity Foundations',
    description: 'What cybersecurity is, why it matters, core principles',
    lessons: [
      { id: 'L01', title: 'What is Cybersecurity?', slug: 'introduction-to-cybersecurity', type: 'THEORY', duration: 20, hasLab: false },
      { id: 'L02', title: 'The CIA Triad', slug: 'the-cia-triad', type: 'THEORY', duration: 25, hasLab: false },
      { id: 'L03', title: 'Threats, Vulnerabilities & Risks', slug: 'threats-vulnerabilities-risks', type: 'THEORY', duration: 30, hasLab: false },
      { id: 'L04', title: 'Types of Cyber Attacks', slug: 'types-of-cyber-attacks', type: 'THEORY', duration: 35, hasLab: false },
      { id: 'L05', title: 'Security Controls & Defense in Depth', slug: 'security-controls-defense', type: 'THEORY', duration: 25, hasLab: false },
      { id: 'L06', title: 'Authentication & Passwords', slug: 'authentication-passwords', type: 'PRACTICAL', duration: 30, hasLab: true },
    ],
  },

  {
    id: 'mod-2',
    week: 'Week 2-3',
    title: 'Module 2: Computer & OS Fundamentals',
    description: 'How computers work, operating systems, processes, and storage',
    lessons: [
      { id: 'L07', title: 'How Computers Work (CPU, RAM, Storage)', slug: 'how-computers-work', type: 'THEORY', duration: 25, hasLab: false },
      { id: 'L08', title: 'Operating Systems Explained', slug: 'operating-systems-explained', type: 'THEORY', duration: 20, hasLab: false },
      { id: 'L09', title: 'Processes, Services & Daemons', slug: 'processes-services-daemons', type: 'THEORY', duration: 25, hasLab: false },
      { id: 'L10', title: 'File Systems & Data Storage', slug: 'file-systems-data-storage', type: 'THEORY', duration: 20, hasLab: false },
      { id: 'L11', title: 'Users, Permissions & Access Control', slug: 'users-permissions-access', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L12', title: 'System Logs & Why They Matter', slug: 'system-logs-matter', type: 'PRACTICAL', duration: 25, hasLab: true },
    ],
  },
  {
    id: 'mod-3',
    week: 'Week 3-4',
    title: 'Module 3: Linux Command Line Mastery',
    description: 'Essential Linux skills for every security professional',
    lessons: [
      { id: 'L13', title: 'Introduction to Linux & Terminal', slug: 'intro-linux-terminal', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L14', title: 'Navigating the File System', slug: 'navigating-linux-filesystem', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L15', title: 'File Permissions & Ownership', slug: 'file-permissions-ownership', type: 'PRACTICAL', duration: 35, hasLab: true },
      { id: 'L16', title: 'Users, Groups & sudo', slug: 'linux-users-groups', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L17', title: 'Finding Files & Searching Text', slug: 'finding-files-text', type: 'PRACTICAL', duration: 25, hasLab: true },
      { id: 'L18', title: 'Pipes, Redirection & Shell Scripting', slug: 'pipes-redirection-shell', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L19', title: 'Process Management & Monitoring', slug: 'process-management', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L20', title: 'LAB: Linux Investigation Challenge', slug: 'lab-linux-investigation', type: 'LAB', duration: 60, hasLab: true },
    ],
  },

  {
    id: 'mod-4',
    week: 'Week 4-5',
    title: 'Module 4: Networking Fundamentals',
    description: 'IP, TCP/UDP, DNS, HTTP — how the internet actually works',
    lessons: [
      { id: 'L21', title: 'How the Internet Works', slug: 'how-internet-works', type: 'THEORY', duration: 25, hasLab: false },
      { id: 'L22', title: 'IP Addresses, Subnets & CIDR', slug: 'ip-addresses-subnets', type: 'PRACTICAL', duration: 35, hasLab: true },
      { id: 'L23', title: 'TCP vs UDP — Protocols Explained', slug: 'tcp-udp-protocols', type: 'THEORY', duration: 25, hasLab: false },
      { id: 'L24', title: 'Ports & Services', slug: 'ports-and-services', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L25', title: 'DNS — Domain Name System', slug: 'dns-explained', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L26', title: 'HTTP/HTTPS & Web Communication', slug: 'http-https-web', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L27', title: 'The OSI Model — 7 Layers', slug: 'osi-model-layers', type: 'THEORY', duration: 30, hasLab: false },
      { id: 'L28', title: 'LAB: Network Scanning & Discovery', slug: 'lab-network-scanning', type: 'LAB', duration: 45, hasLab: true },
    ],
  },
  {
    id: 'mod-5',
    week: 'Week 5-6',
    title: 'Module 5: Network Security',
    description: 'Firewalls, VPNs, IDS/IPS, and defending networks',
    lessons: [
      { id: 'L29', title: 'Firewalls — How They Work', slug: 'firewalls-how-they-work', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L30', title: 'VPN & Encrypted Tunnels', slug: 'vpn-encrypted-tunnels', type: 'THEORY', duration: 25, hasLab: false },
      { id: 'L31', title: 'IDS & IPS — Intrusion Detection', slug: 'ids-ips-intrusion', type: 'THEORY', duration: 25, hasLab: false },
      { id: 'L32', title: 'Packet Analysis with Wireshark', slug: 'packet-analysis-wireshark', type: 'PRACTICAL', duration: 40, hasLab: true },
      { id: 'L33', title: 'Network Attacks (ARP, DNS, MITM)', slug: 'network-attacks-explained', type: 'THEORY', duration: 35, hasLab: false },
      { id: 'L34', title: 'Wireless Security (Wi-Fi)', slug: 'wireless-wifi-security', type: 'THEORY', duration: 25, hasLab: false },
      { id: 'L35', title: 'LAB: Firewall Configuration', slug: 'lab-firewall-config', type: 'LAB', duration: 45, hasLab: true },
    ],
  },

  {
    id: 'mod-6',
    week: 'Week 6-7',
    title: 'Module 6: Web Application Security',
    description: 'OWASP Top 10, SQL injection, XSS, and secure coding',
    lessons: [
      { id: 'L36', title: 'How Web Applications Work', slug: 'how-web-apps-work', type: 'THEORY', duration: 25, hasLab: false },
      { id: 'L37', title: 'HTTP Requests, Responses & Headers', slug: 'http-requests-headers', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L38', title: 'OWASP Top 10 Overview', slug: 'owasp-top-10', type: 'THEORY', duration: 30, hasLab: false },
      { id: 'L39', title: 'SQL Injection — Attack & Defense', slug: 'sql-injection-attack-defense', type: 'PRACTICAL', duration: 40, hasLab: true },
      { id: 'L40', title: 'Cross-Site Scripting (XSS)', slug: 'cross-site-scripting-xss', type: 'PRACTICAL', duration: 35, hasLab: true },
      { id: 'L41', title: 'Authentication Vulnerabilities', slug: 'auth-vulnerabilities', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L42', title: 'CSRF, SSRF & File Upload Attacks', slug: 'csrf-ssrf-file-upload', type: 'THEORY', duration: 30, hasLab: false },
      { id: 'L43', title: 'LAB: Web App Vulnerability Assessment', slug: 'lab-web-vuln-assessment', type: 'LAB', duration: 60, hasLab: true },
    ],
  },
  {
    id: 'mod-7',
    week: 'Week 7-8',
    title: 'Module 7: Cryptography & Encryption',
    description: 'Encryption, hashing, PKI, certificates, and secure communication',
    lessons: [
      { id: 'L44', title: 'What is Cryptography?', slug: 'what-is-cryptography', type: 'THEORY', duration: 20, hasLab: false },
      { id: 'L45', title: 'Symmetric Encryption (AES)', slug: 'symmetric-encryption-aes', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L46', title: 'Asymmetric Encryption (RSA)', slug: 'asymmetric-encryption-rsa', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L47', title: 'Hashing (MD5, SHA-256, bcrypt)', slug: 'hashing-algorithms', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L48', title: 'Digital Signatures & Certificates', slug: 'digital-signatures-certs', type: 'THEORY', duration: 25, hasLab: false },
      { id: 'L49', title: 'TLS/SSL & HTTPS Deep Dive', slug: 'tls-ssl-https', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L50', title: 'LAB: Password Cracking & Defense', slug: 'lab-password-cracking', type: 'LAB', duration: 45, hasLab: true },
    ],
  },

  {
    id: 'mod-8',
    week: 'Week 8-9',
    title: 'Module 8: Ethical Hacking & Penetration Testing',
    description: 'Reconnaissance, scanning, exploitation — authorized testing methodology',
    lessons: [
      { id: 'L51', title: 'Ethical Hacking Methodology', slug: 'ethical-hacking-methodology', type: 'THEORY', duration: 25, hasLab: false },
      { id: 'L52', title: 'Reconnaissance & OSINT', slug: 'reconnaissance-osint', type: 'PRACTICAL', duration: 35, hasLab: true },
      { id: 'L53', title: 'Port Scanning with Nmap', slug: 'port-scanning-nmap', type: 'PRACTICAL', duration: 35, hasLab: true },
      { id: 'L54', title: 'Vulnerability Assessment', slug: 'vulnerability-assessment', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L55', title: 'Exploitation Concepts', slug: 'exploitation-concepts', type: 'THEORY', duration: 30, hasLab: false },
      { id: 'L56', title: 'Privilege Escalation (Linux)', slug: 'privilege-escalation-linux', type: 'PRACTICAL', duration: 40, hasLab: true },
      { id: 'L57', title: 'Post-Exploitation & Reporting', slug: 'post-exploitation-reporting', type: 'THEORY', duration: 25, hasLab: false },
      { id: 'L58', title: 'LAB: Full Penetration Test', slug: 'lab-full-pentest', type: 'LAB', duration: 90, hasLab: true },
    ],
  },
  {
    id: 'mod-9',
    week: 'Week 9-10',
    title: 'Module 9: SOC & Incident Response',
    description: 'Security Operations Center, alert triage, incident handling',
    lessons: [
      { id: 'L59', title: 'What is a SOC?', slug: 'what-is-soc', type: 'THEORY', duration: 20, hasLab: false },
      { id: 'L60', title: 'SIEM & Log Management', slug: 'siem-log-management', type: 'THEORY', duration: 25, hasLab: false },
      { id: 'L61', title: 'Alert Triage & Investigation', slug: 'alert-triage-investigation', type: 'PRACTICAL', duration: 35, hasLab: true },
      { id: 'L62', title: 'Incident Response Process', slug: 'incident-response-process', type: 'THEORY', duration: 30, hasLab: false },
      { id: 'L63', title: 'Threat Intelligence & IOCs', slug: 'threat-intelligence-iocs', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L64', title: 'MITRE ATT&CK Framework', slug: 'mitre-attack-framework', type: 'THEORY', duration: 25, hasLab: false },
      { id: 'L65', title: 'LAB: Incident Investigation', slug: 'lab-incident-investigation', type: 'LAB', duration: 60, hasLab: true },
    ],
  },
  {
    id: 'mod-10',
    week: 'Week 10-12',
    title: 'Module 10: Cloud Security & DevSecOps',
    description: 'AWS/Azure security, containers, CI/CD pipeline security',
    lessons: [
      { id: 'L66', title: 'Cloud Computing Basics', slug: 'cloud-computing-basics', type: 'THEORY', duration: 20, hasLab: false },
      { id: 'L67', title: 'AWS Security Fundamentals', slug: 'aws-security-fundamentals', type: 'PRACTICAL', duration: 35, hasLab: true },
      { id: 'L68', title: 'IAM & Access Management', slug: 'iam-access-management', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L69', title: 'Docker & Container Security', slug: 'docker-container-security', type: 'PRACTICAL', duration: 35, hasLab: true },
      { id: 'L70', title: 'CI/CD Pipeline Security', slug: 'cicd-pipeline-security', type: 'THEORY', duration: 25, hasLab: false },
      { id: 'L71', title: 'Cloud Misconfigurations', slug: 'cloud-misconfigurations', type: 'PRACTICAL', duration: 30, hasLab: true },
      { id: 'L72', title: 'LAB: Secure Cloud Deployment', slug: 'lab-secure-cloud', type: 'LAB', duration: 60, hasLab: true },
    ],
  },
];


const typeStyles: Record<string, { icon: string; color: string; label: string }> = {
  THEORY: { icon: '📖', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', label: 'Theory' },
  PRACTICAL: { icon: '💻', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', label: 'Practical' },
  LAB: { icon: '🧪', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20', label: 'Lab' },
};

export default function CompleteCyberCourse() {
  const [expandedModule, setExpandedModule] = useState<string | null>('mod-1');

  const totalLessons = courseModules.reduce((s, m) => s + m.lessons.length, 0);
  const totalLabs = courseModules.reduce((s, m) => s + m.lessons.filter(l => l.type === 'LAB').length, 0);
  const totalHours = Math.round(courseModules.reduce((s, m) => s + m.lessons.reduce((ls, l) => ls + l.duration, 0), 0) / 60);

  return (
    <div className="max-w-5xl space-y-8">
      {/* Course Header */}
      <div className="card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyber-400/10 via-purple-500/5 to-transparent rounded-full -translate-y-1/3 translate-x-1/4" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge-beginner">BEGINNER → ADVANCED</span>
            <span className="text-xs text-dark-600">Complete Course</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Complete Cybersecurity Professional Course</h1>
          <p className="text-dark-400 text-sm leading-relaxed max-w-3xl">
            Go from zero knowledge to professional-level cybersecurity skills in 12 weeks. 
            Every concept explained with real-world examples. Every command you can execute in real labs. 
            No fake content — learn exactly what security professionals use daily.
          </p>

          <div className="flex flex-wrap items-center gap-5 mt-5 text-xs text-dark-500">
            <span className="flex items-center gap-1.5">📚 <strong className="text-white">{totalLessons}</strong> lessons</span>
            <span className="flex items-center gap-1.5">🧪 <strong className="text-white">{totalLabs}</strong> practical labs</span>
            <span className="flex items-center gap-1.5">🕐 <strong className="text-white">{totalHours}+</strong> hours of content</span>
            <span className="flex items-center gap-1.5">📅 <strong className="text-white">12</strong> weeks</span>
            <span className="flex items-center gap-1.5">🎯 <strong className="text-white">10</strong> modules</span>
            <span className="flex items-center gap-1.5">⚡ <strong className="text-white">1500+</strong> XP total</span>
          </div>

          <div className="mt-6 p-4 bg-white/[0.02] rounded-xl border border-white/[0.06]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-dark-400">Course Progress</span>
              <span className="text-xs text-cyber-400 font-mono">0%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: '0%' }} />
            </div>
            <Link href="/lessons/introduction-to-cybersecurity" className="btn-primary text-sm px-5 py-2.5 mt-4 inline-block">
              Start Course →
            </Link>
          </div>
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="card">
        <h3 className="font-semibold text-white mb-4 text-lg">🎯 What You'll Be Able To Do</h3>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {[
            'Understand ALL cybersecurity fundamentals deeply',
            'Use Linux command line like a professional',
            'Analyze network traffic and detect attacks',
            'Find vulnerabilities in web applications',
            'Encrypt data and verify file integrity',
            'Perform authorized penetration tests',
            'Investigate security incidents like a SOC analyst',
            'Secure cloud infrastructure (AWS/Azure)',
            'Solve CTF challenges across all categories',
            'Write professional security reports',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-dark-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Course Modules */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Course Curriculum — {totalLessons} Lessons</h2>

        {courseModules.map((module, modIdx) => {
          const isExpanded = expandedModule === module.id;
          const modDuration = Math.round(module.lessons.reduce((s, l) => s + l.duration, 0) / 60 * 10) / 10;

          return (
            <div key={module.id} className="card overflow-hidden">
              <button
                onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                className="w-full flex items-center gap-4 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-400/10 to-purple-500/10 flex items-center justify-center text-sm font-bold text-cyber-400 border border-cyber-400/20 flex-shrink-0">
                  {modIdx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white text-sm truncate">{module.title}</h3>
                    <span className="text-[10px] text-dark-600 bg-white/[0.03] px-2 py-0.5 rounded-full border border-white/[0.06] flex-shrink-0">{module.week}</span>
                  </div>
                  <p className="text-xs text-dark-500 mt-0.5">{module.description} · {module.lessons.length} lessons · ~{modDuration}h</p>
                </div>
                <svg className={`w-4 h-4 text-dark-500 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isExpanded && (
                <div className="mt-4 space-y-1 pl-14">
                  {module.lessons.map((lesson) => {
                    const style = typeStyles[lesson.type];
                    return (
                      <Link key={lesson.id} href={`/lessons/${lesson.slug}`}>
                        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-all group border border-transparent hover:border-white/[0.04]">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs border ${style.color} flex-shrink-0`}>
                            {style.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white group-hover:text-cyber-400 transition-colors truncate">
                              <span className="text-dark-600 font-mono text-[10px] mr-2">{lesson.id}</span>
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-3 mt-0.5">
                              <span className="text-[10px] text-dark-600">{lesson.duration} min</span>
                              <span className={`text-[10px] ${style.color.split(' ')[0]}`}>{style.label}</span>
                              {lesson.hasLab && <span className="text-[10px] text-purple-400">🧪 Has Lab</span>}
                            </div>
                          </div>
                          <svg className="w-4 h-4 text-dark-700 group-hover:text-cyber-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Course Info Footer */}
      <div className="callout-security">
        <p className="text-xs">
          <strong>Note:</strong> All practical exercises and labs run in isolated Docker containers. 
          Offensive security techniques are taught for authorized testing only. 
          Never use these skills on systems you don't have explicit permission to test.
        </p>
      </div>
    </div>
  );
}
