'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getLessonBySlug } from '@/lib/curriculum';
import { getLessonBySlug as getLessonContent } from '@/lib/lessons';

function ContentBlock({ block }: { block: any }) {
  switch (block.type) {
    case 'heading':
      if (block.level === 2) return <h2 className="text-xl font-bold text-white mt-10 mb-3">{block.content}</h2>;
      if (block.level === 3) return <h3 className="text-lg font-semibold text-white mt-7 mb-2">{block.content}</h3>;
      return <h1 className="text-2xl font-bold text-white mb-4">{block.content}</h1>;

    case 'paragraph':
      return <p className="text-dark-300 leading-relaxed mb-4">{block.content}</p>;

    case 'list':
      return (
        <ul className="list-none space-y-2 mb-5 ml-1">
          {block.items.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-2.5 text-dark-300 text-sm leading-relaxed">
              <span className="text-cyber-400 mt-1.5 text-[8px]">●</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'callout': {
      const variants: Record<string, { bg: string; border: string; icon: string }> = {
        info: { bg: 'bg-blue-500/5', border: 'border-blue-500/20', icon: 'ℹ️' },
        warning: { bg: 'bg-yellow-500/5', border: 'border-yellow-500/20', icon: '⚠️' },
        security: { bg: 'bg-cyber-400/5', border: 'border-cyber-400/20', icon: '🔒' },
        formula: { bg: 'bg-purple-500/5', border: 'border-purple-500/20', icon: '📐' },
      };
      const v = variants[block.variant] || variants.info;
      return (
        <div className={`${v.bg} border ${v.border} rounded-lg p-4 mb-5`}>
          <div className="flex items-start gap-2.5">
            <span className="text-base mt-0.5">{v.icon}</span>
            <p className="text-dark-200 text-sm leading-relaxed">{block.content}</p>
          </div>
        </div>
      );
    }

    case 'example':
      return (
        <div className="bg-dark-800/80 border border-dark-600/50 rounded-lg p-4 mb-5">
          <p className="text-sm font-medium text-green-400 mb-2">💡 {block.title}</p>
          <p className="text-dark-300 text-sm leading-relaxed">{block.content}</p>
        </div>
      );


    case 'command':
      return (
        <div className="bg-dark-950 border border-dark-700 rounded-lg overflow-hidden mb-5 group">
          <div className="flex items-center justify-between px-4 py-2 bg-dark-800/80 border-b border-dark-700">
            <span className="text-[10px] text-dark-500 font-mono uppercase tracking-wider">Terminal</span>
          </div>
          <div className="p-4">
            <code className="text-green-400 font-mono text-sm">$ {block.command}</code>
            {block.output && (
              <pre className="text-dark-300 font-mono text-xs mt-3 whitespace-pre-wrap leading-relaxed overflow-x-auto">{block.output}</pre>
            )}
          </div>
          {block.explanation && (
            <div className="px-4 py-3 bg-dark-800/50 border-t border-dark-700">
              <p className="text-xs text-dark-400 leading-relaxed">↳ {block.explanation}</p>
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
  const params = useParams();
  const slug = params?.slug as string;

  // Get lesson metadata from curriculum
  const curriculumData = getLessonBySlug(slug);
  // Get lesson content from lesson library
  const lessonContent = getLessonContent(slug);

  if (!curriculumData) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <div className="text-6xl mb-4">📖</div>
        <h1 className="text-2xl font-bold text-dark-300">Lesson not found</h1>
        <p className="text-dark-500 mt-2">This lesson slug doesn&apos;t match any curriculum entry.</p>
        <Link href="/courses" className="text-cyber-400 mt-4 inline-block hover:underline">
          ← Back to Courses
        </Link>
      </div>
    );
  }

  const { lesson, module: mod } = curriculumData;
  const lessonIndex = mod.lessons.findIndex(l => l.slug === slug);
  const prevLesson = lessonIndex > 0 ? mod.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < mod.lessons.length - 1 ? mod.lessons[lessonIndex + 1] : null;


  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-dark-400 mb-6">
        <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
        <span className="text-dark-600">/</span>
        <Link href={`/courses/${mod.slug}`} className="hover:text-white transition-colors">{mod.title}</Link>
        <span className="text-dark-600">/</span>
        <span className="text-white truncate max-w-[200px]">{lesson.title}</span>
      </nav>

      {/* Lesson Header */}
      <div className="mb-8 pb-6 border-b border-dark-700/50">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-dark-500">
            Module {mod.number} &middot; Lesson {lessonIndex + 1}
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
            lesson.type === 'THEORY' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
            lesson.type === 'LAB' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
            'bg-green-500/10 text-green-400 border border-green-500/20'
          }`}>
            {lesson.type === 'THEORY' ? '📖 Theory' : lesson.type === 'LAB' ? '🧪 Lab' : '💻 Practical'}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{lesson.title}</h1>
        <p className="text-dark-400">{lesson.description}</p>
        <div className="flex items-center gap-4 mt-3 text-xs text-dark-500">
          <span>🕐 {lesson.duration} min</span>
        </div>
      </div>

      {/* Lesson Content */}
      {lessonContent ? (
        <div className="prose prose-invert max-w-none">
          {lessonContent.content.map((block: any, idx: number) => (
            <ContentBlock key={idx} block={block} />
          ))}

          {/* Key Terms */}
          {lessonContent.keyTerms && lessonContent.keyTerms.length > 0 && (
            <div className="mt-10 p-6 bg-dark-800/50 border border-dark-700/50 rounded-xl">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                <span>📝</span> Key Terms
              </h3>
              <div className="flex flex-wrap gap-2">
                {lessonContent.keyTerms.map((term: string) => (
                  <span key={term} className="px-3 py-1.5 bg-dark-700 border border-dark-600 rounded-lg text-xs text-dark-200">
                    {term}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 bg-dark-800/30 border border-dark-700/50 rounded-xl">
          <div className="text-4xl mb-3">🚧</div>
          <h3 className="text-lg font-semibold text-dark-300">Content Coming Soon</h3>
          <p className="text-dark-500 mt-2 text-sm">This lesson&apos;s detailed content is being developed.</p>
        </div>
      )}


      {/* Complete button */}
      <div className="mt-10 flex items-center justify-between">
        {completed ? (
          <span className="text-green-400 flex items-center gap-2 text-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Lesson Complete!
          </span>
        ) : (
          <button onClick={() => setCompleted(true)} className="btn-primary text-sm">
            Mark as Complete
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 pt-6 border-t border-dark-700/50 flex items-center justify-between">
        {prevLesson ? (
          <Link href={`/lessons/${prevLesson.slug}`} className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="max-w-[180px] truncate">{prevLesson.title}</span>
          </Link>
        ) : (
          <Link href={`/courses/${mod.slug}`} className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Module</span>
          </Link>
        )}
        {nextLesson ? (
          <Link href={`/lessons/${nextLesson.slug}`} className="flex items-center gap-2 text-cyber-400 hover:text-cyber-300 transition-colors text-sm">
            <span className="max-w-[180px] truncate">{nextLesson.title}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : mod.lab ? (
          <Link href={`/labs/${mod.lab.slug}`} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm">
            <span>Start Lab →</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
