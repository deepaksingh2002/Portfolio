import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured: boolean;
  published: boolean;
  order: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    techStack: { type: [String], required: true },
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema);
