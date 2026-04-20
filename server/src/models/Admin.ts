import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  email: string;
  passwordHash: string;
  refreshTokenHash?: string | null;
}

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  passwordHash: { type: String, required: true },
  refreshTokenHash: { type: String, default: null },
});

export default mongoose.model<IAdmin>('Admin', AdminSchema);
