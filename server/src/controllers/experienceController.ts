import { Request, Response, NextFunction } from 'express';
import Experience from '../models/Experience';

export const getExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const experience = await Experience.find();
    res.json(experience);
  } catch (err) {
    next(err);
  }
};
