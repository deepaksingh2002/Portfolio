import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Experience from '../models/Experience';

export const getExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const experience = await Experience.aggregate([
      { $sort: { current: -1, _id: -1 } },
      { $project: { role: 1, company: 1, startDate: 1, endDate: 1, description: 1, current: 1 } }
    ]);
    res.json(experience);
  } catch (err) {
    next(err);
  }
};

export const createExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (err) {
    next(err);
  }
};

export const updateExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json(experience);
  } catch (err) {
    next(err);
  }
};

export const deleteExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json({ message: 'Experience deleted' });
  } catch (err) {
    next(err);
  }
};
