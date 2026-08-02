export type LabStep = {
  id: number;
  title: string;
  instruction: string;
  command: string;
  expectedOutput: string;
  explanation: string;
  tip?: string;
};

export type LabData = {
  id: string;
  title: string;
  slug: string;
  module: string;
  moduleNumber: number;
  difficulty: string;
  duration: number;
  description: string;
  scenario: string;
  objectives: string[];
  prerequisites: string[];
  tools: string[];
  steps: LabStep[];
  summary: string[];
};

import { lab01 } from './lab-01-security-mindset';
import { lab02 } from './lab-02-linux-intrusion';
import { lab03 } from './lab-03-network-scanning';

export { lab01, lab02, lab03 };

export const allLabs = [lab01, lab02, lab03];

export function getLabBySlug(slug: string): LabData | undefined {
  return allLabs.find(l => l.slug === slug);
}
