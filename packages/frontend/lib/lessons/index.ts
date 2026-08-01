import { lesson as L20 } from './L20-linux-process-management';
import { lesson as L26 } from './L26-network-troubleshooting';
import { lesson as L27 } from './L27-network-services-protocols';
import { lesson as L28 } from './L28-wireless-networking';
import { lesson as L29 } from './L29-intro-network-security';
import { lesson as L30 } from './L30-firewalls-configuration';
import { lesson as L31 } from './L31-vpn-secure-tunneling';
import { lesson as L32 } from './L32-ids-ips-systems';
import { lesson as L33 } from './L33-wireshark-traffic-analysis';

export type LessonContent = {
  id: string;
  title: string;
  slug: string;
  type: string;
  duration: number;
  xpReward: number;
  difficulty: string;
  module: { title: string; slug: string };
  course: { title: string; slug: string };
  keyTerms: string[];
  content: ContentBlock[];
  navigation: {
    prev: { title: string; slug: string } | null;
    next: { title: string; slug: string } | null;
  };
};

export type ContentBlock = {
  type: string;
  content?: string;
  level?: number;
  variant?: string;
  items?: string[];
  title?: string;
  command?: string;
  output?: string;
  explanation?: string;
};

// Map slugs to lesson data
export const lessons: Record<string, LessonContent> = {
  'linux-process-management': L20 as unknown as LessonContent,
  'network-troubleshooting': L26 as unknown as LessonContent,
  'network-services-protocols': L27 as unknown as LessonContent,
  'wireless-networking': L28 as unknown as LessonContent,
  'intro-network-security': L29 as unknown as LessonContent,
  'firewalls-configuration': L30 as unknown as LessonContent,
  'vpn-secure-tunneling': L31 as unknown as LessonContent,
  'ids-ips-systems': L32 as unknown as LessonContent,
  'wireshark-traffic-analysis': L33 as unknown as LessonContent,
};

// Get all lesson slugs
export const lessonSlugs = Object.keys(lessons);

// Get lesson by slug
export function getLessonBySlug(slug: string): LessonContent | null {
  return lessons[slug] || null;
}

// Get all lessons as array
export function getAllLessons(): LessonContent[] {
  return Object.values(lessons);
}
