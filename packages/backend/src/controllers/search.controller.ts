import { Request, Response } from 'express';
import prisma from '../models/prisma';

/**
 * Global search across courses, lessons, labs, and challenges
 */
export const globalSearch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q, type } = req.query;

    if (!q || (q as string).trim().length < 2) {
      res.status(400).json({
        success: false,
        error: 'Search query must be at least 2 characters.',
      });
      return;
    }

    const query = (q as string).trim();
    const searchType = type as string;

    const results: any = {};

    // Search courses
    if (!searchType || searchType === 'courses') {
      results.courses = await prisma.course.findMany({
        where: {
          isPublished: true,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          difficulty: true,
        },
        take: 5,
      });
    }

    // Search lessons
    if (!searchType || searchType === 'lessons') {
      results.lessons = await prisma.lesson.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          lessonType: true,
          module: {
            select: {
              course: { select: { title: true, slug: true } },
            },
          },
        },
        take: 5,
      });
    }

    // Search labs
    if (!searchType || searchType === 'labs') {
      results.labs = await prisma.lab.findMany({
        where: {
          isPublished: true,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          difficulty: true,
          durationMinutes: true,
        },
        take: 5,
      });
    }

    // Search challenges
    if (!searchType || searchType === 'challenges') {
      results.challenges = await prisma.challenge.findMany({
        where: {
          isActive: true,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          category: true,
          difficulty: true,
          points: true,
        },
        take: 5,
      });
    }

    res.json({
      success: true,
      data: results,
      query,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Search failed. Please try again.',
    });
  }
};
