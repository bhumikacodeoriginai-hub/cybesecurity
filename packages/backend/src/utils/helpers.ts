import { Request } from 'express';
import { PaginationParams } from '../types';

/**
 * Extract pagination parameters from request query
 */
export const getPagination = (req: Request): PaginationParams => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 10));
  const offset = (page - 1) * limit;

  return { page, limit, offset };
};

/**
 * Format pagination response
 */
export const formatPaginationResponse = (page: number, limit: number, total: number) => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit),
});

/**
 * Calculate user level based on XP points
 */
export const calculateLevel = (xp: number): string => {
  if (xp >= 10000) return 'PROFESSIONAL';
  if (xp >= 5000) return 'ADVANCED';
  if (xp >= 1000) return 'INTERMEDIATE';
  return 'BEGINNER';
};

/**
 * Generate a random verification code for certificates
 */
export const generateVerificationCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'CSA-';
  for (let i = 0; i < 12; i++) {
    if (i > 0 && i % 4 === 0) code += '-';
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

/**
 * Slugify a string
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
};
