import { Request, Response, NextFunction } from 'express';
import Admin from '../models/Admin';
import bcrypt from 'bcryptjs';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt';

const REFRESH_COOKIE_NAME = 'refreshToken';
const isProduction = process.env.NODE_ENV === 'production';
const refreshCookieSameSite: 'lax' | 'none' = isProduction ? 'none' : 'lax';

const getRefreshCookieOptions = () => ({
  httpOnly: true,
  sameSite: refreshCookieSameSite,
  secure: isProduction,
  path: '/api/auth',
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

const sanitizeAdmin = (admin: { _id: unknown; email: string }) => ({
  id: String(admin._id),
  email: admin.email,
});

const extractRefreshToken = (req: Request) => {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').map((cookie) => cookie.trim());
  const refreshCookie = cookies.find((cookie) =>
    cookie.startsWith(`${REFRESH_COOKIE_NAME}=`)
  );

  if (!refreshCookie) return null;

  return decodeURIComponent(refreshCookie.slice(REFRESH_COOKIE_NAME.length + 1));
};

const issueAuthTokens = async (admin: InstanceType<typeof Admin>, res: Response) => {
  const payload = { id: admin._id.toString(), email: admin.email };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  admin.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  await admin.save();

  res.cookie(REFRESH_COOKIE_NAME, refreshToken, getRefreshCookieOptions());

  return accessToken;
};

const clearRefreshToken = (res: Response) => {
  res.clearCookie(REFRESH_COOKIE_NAME, {
    ...getRefreshCookieOptions(),
    maxAge: undefined,
  });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = await issueAuthTokens(admin, res);

    res.json({ accessToken, admin: sanitizeAdmin(admin) });
  } catch (err) {
    next(err);
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = extractRefreshToken(req);
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token missing' });
    }

    const payload = verifyRefreshToken(refreshToken);
    if (payload.tokenType !== 'refresh') {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const admin = await Admin.findById(payload.id);
    if (!admin || !admin.refreshTokenHash) {
      clearRefreshToken(res);
      return res.status(401).json({ message: 'Session expired' });
    }

    const matches = await bcrypt.compare(refreshToken, admin.refreshTokenHash);
    if (!matches) {
      admin.refreshTokenHash = null;
      await admin.save();
      clearRefreshToken(res);
      return res.status(401).json({ message: 'Session expired' });
    }

    const accessToken = await issueAuthTokens(admin, res);
    res.json({ accessToken, admin: sanitizeAdmin(admin) });
  } catch (err) {
    clearRefreshToken(res);
    next(err);
  }
};

export const getCurrentAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const admin = await Admin.findById(req.user.id).select('_id email');
    if (!admin) {
      return res.status(401).json({ message: 'Admin account not found' });
    }

    res.json({ admin: sanitizeAdmin(admin) });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const currentPassword = String(req.body.currentPassword || '');
    const newPassword = String(req.body.newPassword || '');

    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: 'Admin account not found' });
    }

    const valid = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!valid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    admin.passwordHash = await bcrypt.hash(newPassword, 10);
    admin.refreshTokenHash = null;
    await admin.save();
    clearRefreshToken(res);

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = extractRefreshToken(req);

    if (refreshToken) {
      try {
        const payload = verifyRefreshToken(refreshToken);
        const admin = await Admin.findById(payload.id);
        if (admin) {
          admin.refreshTokenHash = null;
          await admin.save();
        }
      } catch {
        // Clear the cookie even if the token is already invalid.
      }
    }

    clearRefreshToken(res);
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};
