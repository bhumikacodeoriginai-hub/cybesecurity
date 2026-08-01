/**
 * Lab Definitions Registry
 * 
 * Each lab definition contains:
 * - Docker image configuration
 * - Environment setup scripts
 * - Objectives and validation rules
 * - Instructions and hints
 * - Network topology
 */

export interface LabDefinition {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'PROFESSIONAL';
  category: string;
  durationMinutes: number;
  xpReward: number;
  docker: DockerConfig;
  objectives: LabObjective[];
  instructions: LabInstruction[];
  hints: string[];
  tools: string[];
  networkDiagram?: NetworkNode[];
  validationRules: ValidationRule[];
}

export interface DockerConfig {
  image: string;
  tag: string;
  hostname: string;
  cpuLimit: number;
  memoryLimit: string;
  diskLimit: string;
  env: Record<string, string>;
  ports: Record<string, number>;
  setupScript?: string;
  healthCheck?: string;
}


export interface LabObjective {
  id: string;
  title: string;
  description: string;
  validationType: 'file_exists' | 'file_contains' | 'command_output' | 'flag_submission';
  validationConfig: Record<string, any>;
}

export interface LabInstruction {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'command' | 'note' | 'warning';
  command?: string;
}

export interface ValidationRule {
  objectiveId: string;
  type: 'file_exists' | 'file_contains' | 'command_output' | 'flag_submission';
  config: {
    path?: string;
    content?: string;
    command?: string;
    expectedOutput?: string;
    flag?: string;
    regex?: string;
  };
}

export interface NetworkNode {
  id: string;
  label: string;
  ip: string;
  services?: string[];
  type: 'attacker' | 'target' | 'student' | 'server';
}

// Import all lab definitions
import { linuxIntrusionLab } from './linux-intrusion';
import { networkScanningLab } from './network-scanning';
import { webReconLab } from './web-recon';
import { logAnalysisLab } from './log-analysis';
import { filePermissionsLab } from './file-permissions';
import { passwordSecurityLab } from './password-security';

export const labDefinitions: LabDefinition[] = [
  linuxIntrusionLab,
  networkScanningLab,
  webReconLab,
  logAnalysisLab,
  filePermissionsLab,
  passwordSecurityLab,
];

export function getLabDefinition(slug: string): LabDefinition | undefined {
  return labDefinitions.find(l => l.slug === slug);
}
