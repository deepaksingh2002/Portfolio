import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'tools';
  proficiency: number;
  icon?: string;
}

const SkillSchema = new Schema<ISkill>({
  name: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'devops', 'tools'],
    required: true,
  },
  proficiency: { type: Number, min: 1, max: 5, required: true },
  icon: { type: String, trim: true },
});

export default mongoose.model<ISkill>('Skill', SkillSchema);
