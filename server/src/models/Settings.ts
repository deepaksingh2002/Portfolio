import mongoose, { Document, Schema } from 'mongoose';

export interface ISettings extends Document {
  displayName: string;
  email: string;
  bio: string;
  availableForOpportunities: boolean;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
}

const SettingsSchema = new Schema<ISettings>(
  {
    displayName: { type: String, default: 'Your Name', trim: true },
    email: { type: String, default: 'admin@yoursite.dev', trim: true, lowercase: true },
    bio: {
      type: String,
      default: 'Full-Stack Developer based in Delhi, India.',
      trim: true,
    },
    availableForOpportunities: { type: Boolean, default: true },
    githubUrl: { type: String, default: '', trim: true },
    linkedinUrl: { type: String, default: '', trim: true },
    twitterUrl: { type: String, default: '', trim: true },
  },
  { timestamps: true }
);

export default mongoose.model<ISettings>('Settings', SettingsSchema);
