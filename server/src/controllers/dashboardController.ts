import { NextFunction, Request, Response } from 'express';
import Experience from '../models/Experience';
import Message from '../models/Message';
import Project from '../models/Project';
import Skill from '../models/Skill';

export const getDashboardOverview = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Aggregation for stats
    const statsAgg = await Promise.all([
      Project.aggregate([
        { $count: 'count' }
      ]),
      Skill.aggregate([
        { $count: 'count' }
      ]),
      Experience.aggregate([
        { $count: 'count' }
      ]),
      Message.aggregate([
        { $count: 'count' }
      ]),
      Message.aggregate([
        { $match: { read: false } },
        { $count: 'count' }
      ]),
      Project.aggregate([
        { $sort: { createdAt: -1 } },
        { $limit: 5 },
        { $project: { title: 1, createdAt: 1, techStack: 1, featured: 1, status: 1 } }
      ]),
      Message.aggregate([
        { $sort: { createdAt: -1 } },
        { $limit: 5 },
        { $project: { name: 1, subject: 1, createdAt: 1, read: 1 } }
      ])
    ]);

    const [projectsCount, skillsCount, experienceCount, messagesCount, unreadMessages, recentProjects, recentMessages] = statsAgg;

    res.json({
      stats: {
        projectsCount: projectsCount[0]?.count || 0,
        skillsCount: skillsCount[0]?.count || 0,
        experienceCount: experienceCount[0]?.count || 0,
        messagesCount: messagesCount[0]?.count || 0,
        unreadMessages: unreadMessages[0]?.count || 0,
      },
      recentProjects,
      recentMessages,
    });
  } catch (err) {
    next(err);
  }
};
