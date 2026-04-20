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
    const [projectsCount, skillsCount, experienceCount, messagesCount, unreadMessages, recentProjects, recentMessages] =
      await Promise.all([
        Project.countDocuments(),
        Skill.countDocuments(),
        Experience.countDocuments(),
        Message.countDocuments(),
        Message.countDocuments({ read: false }),
        Project.find().sort({ createdAt: -1 }).limit(5),
        Message.find().sort({ createdAt: -1 }).limit(5),
      ]);

    res.json({
      stats: {
        projectsCount,
        skillsCount,
        experienceCount,
        messagesCount,
        unreadMessages,
      },
      recentProjects,
      recentMessages,
    });
  } catch (err) {
    next(err);
  }
};
