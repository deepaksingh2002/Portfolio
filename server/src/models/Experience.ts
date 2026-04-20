import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  role: string;
  company: string;
  period: string;
  description: string;
  current: boolean;
}

const ExperienceSchema = new Schema<IExperience>({
  role: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
  description: { type: String, required: true },
  current: { type: Boolean, default: false },
});

export default mongoose.model<IExperience>('Experience', ExperienceSchema);
