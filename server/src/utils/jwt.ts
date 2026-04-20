import jwt from 'jsonwebtoken';
import { JwtPayload } from './types';

export const signJwt = (payload: JwtPayload) =>
  jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });

export const verifyJwt = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
