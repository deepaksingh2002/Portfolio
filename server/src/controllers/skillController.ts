import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Skill from '../models/Skill';

export const getSkills = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skills = await Skill.aggregate([
      { $sort: { category: 1, proficiency: -1, name: 1 } },
      { $project: { name: 1, category: 1, proficiency: 1, icon: 1 } }
    ]);
    res.json(skills);
  } catch (err) {
    next(err);
  }
};

export const createSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (err) {
    next(err);
  }
};

export const updateSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json(skill);
  } catch (err) {
    next(err);
  }
};

export const deleteSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    next(err);
  }
};
