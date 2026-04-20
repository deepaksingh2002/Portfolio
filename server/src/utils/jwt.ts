import jwt from 'jsonwebtoken';
import { JwtPayload, RefreshTokenPayload } from './types';

const getJwtSecret = () => process.env.JWT_SECRET!;
const getRefreshJwtSecret = () =>
  process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET!;

export const signAccessToken = (payload: JwtPayload) =>
  jwt.sign(payload, getJwtSecret(), { expiresIn: '15m' });

export const signRefreshToken = (payload: JwtPayload) =>
  jwt.sign({ ...payload, tokenType: 'refresh' }, getRefreshJwtSecret(), {
    expiresIn: '7d',
  });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, getJwtSecret()) as JwtPayload;

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, getRefreshJwtSecret()) as RefreshTokenPayload;
