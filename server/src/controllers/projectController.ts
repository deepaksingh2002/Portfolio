import { Request, Response, NextFunction } from 'express';
import Project from '../models/Project';
import cloudinary from '../config/cloudinary';

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter: any = {};
    if (req.query.featured === 'true') filter.featured = true;
    const projects = await Project.find(filter).sort({ order: 1 });
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let imageUrl = '';
    if (req.file && req.file.buffer) {
      // NOTE: You must handle the stream for memoryStorage. See Multer + Cloudinary docs for production.
      const uploadResult = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'portfolio/projects' },
          (error, result) => {
            if (error || !result) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(req.file?.buffer);
      });
      imageUrl = uploadResult;
    }
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
    if (req.file && req.file.buffer) {
      const uploadResult = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'portfolio/projects' },
          (error, result) => {
            if (error || !result) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(req.file?.buffer);
      });
      updateData = { ...updateData, image: uploadResult };
    }
    const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};
