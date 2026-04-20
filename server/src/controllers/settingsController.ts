import { NextFunction, Request, Response } from 'express';
import Admin from '../models/Admin';
import Experience from '../models/Experience';
import Message from '../models/Message';
import Project from '../models/Project';
import Settings from '../models/Settings';
import Skill from '../models/Skill';

const getSettingsDocument = async () => {
  let settings = await Settings.findOne();

  if (!settings) {
    settings = await Settings.create({});
  }

  return settings;
};

export const getSettings = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await getSettingsDocument();
    res.json(settings);
  } catch (err) {
    next(err);
  }
};

export const updateProfileSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const settings = await getSettingsDocument();

    settings.displayName = String(req.body.displayName ?? settings.displayName).trim();
    settings.email = String(req.body.email ?? settings.email).trim().toLowerCase();
    settings.bio = String(req.body.bio ?? settings.bio).trim();
    if (typeof req.body.availableForOpportunities === 'boolean') {
      settings.availableForOpportunities = req.body.availableForOpportunities;
    }

    await settings.save();
    res.json(settings);
  } catch (err) {
    next(err);
  }
};

export const updateSocialSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const settings = await getSettingsDocument();

    settings.githubUrl = String(req.body.githubUrl ?? settings.githubUrl).trim();
    settings.linkedinUrl = String(req.body.linkedinUrl ?? settings.linkedinUrl).trim();
    settings.twitterUrl = String(req.body.twitterUrl ?? settings.twitterUrl).trim();

    await settings.save();
    res.json(settings);
  } catch (err) {
    next(err);
  }
};

export const clearMessages = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Message.deleteMany({});
    res.json({ message: 'Messages cleared', deletedCount: result.deletedCount });
  } catch (err) {
    next(err);
  }
};

export const resetPortfolioData = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [projectsResult, skillsResult, experienceResult] = await Promise.all([
      Project.deleteMany({}),
      Skill.deleteMany({}),
      Experience.deleteMany({}),
    ]);

    res.json({
      message: 'Portfolio data reset',
      deleted: {
        projects: projectsResult.deletedCount,
        skills: skillsResult.deletedCount,
        experience: experienceResult.deletedCount,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAdminAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const deletedAdmin = await Admin.findByIdAndDelete(req.user.id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin account not found' });
    }

    res.json({ message: 'Admin account deleted' });
  } catch (err) {
    next(err);
  }
};
