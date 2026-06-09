import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project';
import cloudinary from '../config/cloudinary';

const uploadProjectImage = async (file?: Express.Multer.File) => {
  if (!file?.buffer) {
    return '';
  }

  return new Promise<string>((resolve, _reject) => {
    if (!process.env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY.includes('your_api_key')) {
      console.warn('Cloudinary API key is unset or placeholder. Skipping image upload.');
      return resolve('');
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder: 'portfolio/projects' },
      (error, result) => {
        if (error || !result) {
          console.error('Cloudinary upload error:', error);
          return resolve(''); // Fallback gracefully
        }
        resolve(result.secure_url);
      }
    );
    stream.end(file.buffer);
  });
};

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter: any = {};
    if (req.query.featured === 'true') filter.featured = true;
    const projects = await Project.aggregate([
      { $match: filter },
      { $sort: { order: 1, createdAt: -1 } },
      {
        $project: {
          title: 1,
          description: 1,
          image: 1,
          techStack: 1,
          featured: 1,
          published: 1,
          liveUrl: 1,
          githubUrl: 1,
          category: 1,
          order: 1,
          createdAt: 1,
        },
      },
    ]);
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const imageUrl = await uploadProjectImage(req.file);
    const project = new Project({ ...req.body, image: imageUrl });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let updateData = { ...req.body };
    const imageUrl = await uploadProjectImage(req.file);
    if (imageUrl) {
      updateData = { ...updateData, image: imageUrl };
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};
