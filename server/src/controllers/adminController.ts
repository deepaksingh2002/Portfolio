import { Request, Response, NextFunction } from 'express';
import Admin from '../models/Admin';
import bcrypt from 'bcryptjs';
import { signJwt } from '../utils/jwt';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signJwt({ id: admin._id.toString(), email: admin.email });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
