import { lesson as L01 } from './L01-what-is-cybersecurity';
import { lesson as L02 } from './L02-cia-triad';
import { lesson as L08 } from './L08-intro-linux';
import { lesson as L09 } from './L09-linux-filesystem';
import { lesson as L20 } from './L20-linux-process-management';
import { lesson as L26 } from './L26-network-troubleshooting';
import { lesson as L27 } from './L27-network-services-protocols';
import { lesson as L28 } from './L28-wireless-networking';
import { lesson as L29 } from './L29-intro-network-security';
import { lesson as L30 } from './L30-firewalls-configuration';
import { lesson as L31 } from './L31-vpn-secure-tunneling';
import { lesson as L32 } from './L32-ids-ips-systems';
import { lesson as L33 } from './L33-wireshark-traffic-analysis';
import { lesson as L34 } from './L34-network-attacks-mitm';
import { lesson as L35 } from './L35-network-attacks-ddos';
import { lesson as L36 } from './L36-intro-web-security';
import { lesson as L37 } from './L37-sql-injection';
import { lesson as L38 } from './L38-xss-attacks';
import { lesson as L39 } from './L39-auth-vulnerabilities';
import { lesson as L40 } from './L40-csrf-attacks';
import { lesson as L41 } from './L41-ssrf-injection';
import { lesson as L42 } from './L42-broken-access-control';
import { lesson as L43 } from './L43-security-misconfigurations';
import { lesson as L44 } from './L44-symmetric-encryption';
import { lesson as L45 } from './L45-asymmetric-encryption';
import { lesson as L46 } from './L46-hashing-integrity';
import { lesson as L47 } from './L47-digital-signatures';
import { lesson as L48 } from './L48-tls-ssl-security';
import { lesson as L49 } from './L49-pki-infrastructure';
import { lesson as L50 } from './L50-crypto-attacks-practices';
import { lesson as L51 } from './L51-recon-information-gathering';
import { lesson as L52 } from './L52-nmap-scanning';
import { lesson as L53 } from './L53-vulnerability-assessment';

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
  'what-is-cybersecurity': L01 as unknown as LessonContent,
  'the-cia-triad': L02 as unknown as LessonContent,
  'intro-linux': L08 as unknown as LessonContent,
  'linux-filesystem': L09 as unknown as LessonContent,
  'linux-process-management': L20 as unknown as LessonContent,
  'network-troubleshooting': L26 as unknown as LessonContent,
  'network-services-protocols': L27 as unknown as LessonContent,
  'wireless-networking': L28 as unknown as LessonContent,
  'intro-network-security': L29 as unknown as LessonContent,
  'firewalls-configuration': L30 as unknown as LessonContent,
  'vpn-secure-tunneling': L31 as unknown as LessonContent,
  'ids-ips-systems': L32 as unknown as LessonContent,
  'wireshark-traffic-analysis': L33 as unknown as LessonContent,
  'network-attacks-mitm': L34 as unknown as LessonContent,
  'network-attacks-ddos': L35 as unknown as LessonContent,
  'intro-web-security': L36 as unknown as LessonContent,
  'sql-injection': L37 as unknown as LessonContent,
  'xss-attacks': L38 as unknown as LessonContent,
  'auth-vulnerabilities': L39 as unknown as LessonContent,
  'csrf-attacks': L40 as unknown as LessonContent,
  'ssrf-injection': L41 as unknown as LessonContent,
  'broken-access-control': L42 as unknown as LessonContent,
  'security-misconfigurations': L43 as unknown as LessonContent,
  'symmetric-encryption': L44 as unknown as LessonContent,
  'asymmetric-encryption': L45 as unknown as LessonContent,
  'hashing-integrity': L46 as unknown as LessonContent,
  'digital-signatures': L47 as unknown as LessonContent,
  'tls-ssl-security': L48 as unknown as LessonContent,
  'pki-infrastructure': L49 as unknown as LessonContent,
  'crypto-attacks-practices': L50 as unknown as LessonContent,
  'recon-information-gathering': L51 as unknown as LessonContent,
  'nmap-scanning': L52 as unknown as LessonContent,
  'vulnerability-assessment': L53 as unknown as LessonContent,
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
