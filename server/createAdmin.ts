import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from './src/models/Admin.js';
import { connectDB } from './src/config/db.js';

dotenv.config();

const email = (process.env.USER_EMAIL || 'admin@example.com').trim().toLowerCase();
const password = process.env.USER_PASSWORD || 'adminpassword';

async function createAdmin() {
  await connectDB();
  const existing = await Admin.findOne({ email });
  if (existing) {
    existing.refreshTokenHash = null;
    await existing.save();
    console.log('Admin already exists:', email);
    process.exit(0);
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await Admin.create({ email, passwordHash });
  console.log('Admin created:', email);
  process.exit(0);
}

createAdmin();
