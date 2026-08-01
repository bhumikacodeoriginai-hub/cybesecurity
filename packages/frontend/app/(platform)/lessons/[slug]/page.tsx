'use client';

import { useState } from 'react';
import Link from 'next/link';

// Demo lesson content
const lessonData = {
  title: 'The CIA Triad',
  slug: 'the-cia-triad',
  type: 'THEORY',
  duration: 25,
  xpReward: 15,
  module: { title: 'What is Cybersecurity?' },
  course: { title: 'Introduction to Cybersecurity', slug: 'intro-to-cybersecurity' },
  keyTerms: ['Confidentiality', 'Integrity', 'Availability', 'CIA Triad', 'Encryption', 'Hashing'],
  content: [
    { type: 'heading', content: 'The CIA Triad: Foundation of Information Security' },
    { type: 'paragraph', content: 'The CIA Triad is the most fundamental model in information security. It stands for Confidentiality, Integrity, and Availability — the three core principles that guide security policies and controls.' },
    { type: 'callout', variant: 'info', content: 'The CIA Triad is referenced in virtually every cybersecurity framework, certification exam, and security policy. Understanding it deeply is essential.' },
    { type: 'heading', level: 2, content: 'Confidentiality' },
    { type: 'paragraph', content: 'Ensuring that information is only accessible to those authorized to access it. This prevents unauthorized disclosure of data.' },
    { type: 'paragraph', content: 'Methods to achieve confidentiality include:' },
    { type: 'list', items: ['Encryption (AES, RSA)', 'Access Control Lists (ACLs)', 'Authentication mechanisms', 'Data classification', 'Need-to-know principle'] },
    { type: 'example', title: 'Real-World Example', content: 'When you log into your bank account online, TLS encryption protects your credentials in transit. Only the bank\'s servers can decrypt and verify your password. This ensures confidentiality of your login information.' },
    { type: 'heading', level: 2, content: 'Integrity' },
    { type: 'paragraph', content: 'Ensuring that data has not been altered, corrupted, or tampered with — either in storage or in transit. Data integrity means the information is trustworthy and accurate.' },
    { type: 'paragraph', content: 'Methods to achieve integrity include:' },
    { type: 'list', items: ['Hashing algorithms (SHA-256, MD5)', 'Digital signatures', 'Checksums', 'Version control', 'Input validation'] },
    { type: 'example', title: 'Real-World Example', content: 'When you download software, the website provides a SHA-256 hash. After downloading, you can compute the hash of your file. If it matches, the file hasn\'t been tampered with during download.' },
    { type: 'heading', level: 2, content: 'Availability' },
    { type: 'paragraph', content: 'Ensuring that systems, applications, and data are accessible to authorized users when they need them. Downtime directly impacts availability.' },
    { type: 'paragraph', content: 'Methods to achieve availability include:' },
    { type: 'list', items: ['Redundancy and failover', 'Load balancing', 'Regular backups', 'Disaster recovery plans', 'DDoS protection', 'Monitoring and alerting'] },
    { type: 'example', title: 'Real-World Example', content: 'A hospital\'s electronic health records system must be available 24/7. If a DDoS attack overwhelms the servers, doctors can\'t access patient data. Redundant servers and DDoS mitigation ensure continuous availability.' },
    { type: 'heading', level: 2, content: 'The Triad in Practice' },
    { type: 'paragraph', content: 'In real-world security, these three principles often create trade-offs. Increasing confidentiality (e.g., strong encryption) might slightly reduce availability (slower access). A good security architect balances all three based on the organization\'s risk appetite.' },
    { type: 'callout', variant: 'security', content: 'Remember: Security is about balancing the CIA Triad based on what you\'re protecting. A public website prioritizes availability. A medical database prioritizes confidentiality. A financial ledger prioritizes integrity.' },
  ],
  navigation: {
    prev: { title: 'Introduction to Cybersecurity', slug: 'introduction-to-cybersecurity' },
    next: { title: 'Threats, Vulnerabilities, and Risks', slug: 'threats-vulnerabilities-risks' },
  },
};

function ContentBlock({ block }: { block: any }) {
  switch (block.type) {
    case 'heading':
      if (block.level === 2) return <h2 className="text-xl font-bold text-white mt-8 mb-3">{block.content}</h2>;
      if (block.level === 3) return <h3 className="text-lg font-semibold text-white mt-6 mb-2">{block.content}</h3>;
      return <h1 className="text-2xl font-bold text-white mb-4">{block.content}</h1>;

    case 'paragraph':
      return <p className="text-dark-300 leading-relaxed mb-4">{block.content}</p>;

    case 'list':
      return (
        <ul className="list-none space-y-2 mb-4 ml-4">
          {block.items.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-dark-300">
              <span className="text-cyber-400 mt-1">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'callout':
      const variants: Record<string, { bg: string; border: string; icon: string }> = {
        info: { bg: 'bg-blue-500/5', border: 'border-blue-500/20', icon: 'ℹ️' },
        warning: { bg: 'bg-yellow-500/5', border: 'border-yellow-500/20', icon: '⚠️' },
        security: { bg: 'bg-cyber-400/5', border: 'border-cyber-400/20', icon: '🔒' },
        formula: { bg: 'bg-purple-500/5', border: 'border-purple-500/20', icon: '📐' },
      };
      const v = variants[block.variant] || variants.info;
      return (
        <div className={`${v.bg} border ${v.border} rounded-lg p-4 mb-4`}>
          <div className="flex items-start gap-2">
            <span>{v.icon}</span>
            <p className="text-dark-200 text-sm">{block.content}</p>
          </div>
        </div>
      );

    case 'example':
      return (
        <div className="bg-dark-800/80 border border-dark-600/50 rounded-lg p-4 mb-4">
          <p className="text-sm font-medium text-green-400 mb-2">💡 {block.title}</p>
          <p className="text-dark-300 text-sm">{block.content}</p>
        </div>
      );

    case 'command':
      return (
        <div className="bg-dark-950 border border-dark-700 rounded-lg overflow-hidden mb-4">
          <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-dark-700">
            <span className="text-xs text-dark-400 font-mono">Terminal</span>
            <button className="text-xs text-dark-400 hover:text-white">Copy</button>
          </div>
          <div className="p-4">
            <code className="text-green-400 font-mono text-sm">$ {block.command}</code>
            {block.output && (
              <pre className="text-dark-300 font-mono text-sm mt-2 whitespace-pre-wrap">{block.output}</pre>
            )}
          </div>
          {block.explanation && (
            <div className="px-4 py-2 bg-dark-800/50 border-t border-dark-700">
              <p className="text-xs text-dark-400">{block.explanation}</p>
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
}

export default function LessonPage() {
  const [completed, setCompleted] = useState(false);
  const lesson = lessonData;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-dark-400 mb-6">
        <Link href="/courses" className="hover:text-white">Courses</Link>
        <span>/</span>
        <Link href={`/courses/${lesson.course.slug}`} className="hover:text-white">{lesson.course.title}</Link>
        <span>/</span>
        <span className="text-white">{lesson.title}</span>
      </nav>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Lesson Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-dark-400">{lesson.module.title}</span>
              <span className="text-dark-600">·</span>
              <span className="badge-beginner text-xs">📖 {lesson.type}</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
            <div className="flex items-center gap-4 text-sm text-dark-400">
              <span>🕐 {lesson.duration} min</span>
              <span>⚡ +{lesson.xpReward} XP</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            {lesson.content.map((block, idx) => (
              <ContentBlock key={idx} block={block} />
            ))}
          </div>

          {/* Key Terms */}
          <div className="mt-10 p-6 bg-dark-800/50 border border-dark-700/50 rounded-xl">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span>📝</span> Key Terms
            </h3>
            <div className="flex flex-wrap gap-2">
              {lesson.keyTerms.map((term) => (
                <span key={term} className="px-3 py-1.5 bg-dark-700 border border-dark-600 rounded-lg text-sm text-dark-200">
                  {term}
                </span>
              ))}
            </div>
          </div>

          {/* Complete Button */}
          <div className="mt-8 flex items-center justify-between">
            <div>
              {completed && (
                <span className="text-green-400 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Lesson Completed! +{lesson.xpReward} XP
                </span>
              )}
            </div>
            {!completed && (
              <button
                onClick={() => setCompleted(true)}
                className="btn-primary"
              >
                Mark as Complete
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-8 pt-6 border-t border-dark-700/50 flex items-center justify-between">
            {lesson.navigation.prev ? (
              <Link href={`/lessons/${lesson.navigation.prev.slug}`} className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm">{lesson.navigation.prev.title}</span>
              </Link>
            ) : <div />}

            {lesson.navigation.next ? (
              <Link href={`/lessons/${lesson.navigation.next.slug}`} className="flex items-center gap-2 text-cyber-400 hover:text-cyber-300 transition-colors">
                <span className="text-sm">{lesson.navigation.next.title}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : <div />}
          </div>
        </div>
      </div>
    </div>
  );
}
