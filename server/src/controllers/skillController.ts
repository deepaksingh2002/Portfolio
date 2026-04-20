import { Request, Response, NextFunction } from 'express';
import Skill from '../models/Skill';

export const getSkills = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    next(err);
  }
};
