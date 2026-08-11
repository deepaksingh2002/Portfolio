import Jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const verifyToken = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'No access token provided');
  }

  const token = authHeader.split(' ')[1];

  let decoded;
  try {
    decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch {
    throw new ApiError(401, 'Invalid or expired access token');
  }

  const admin = await Admin.findById(decoded._id).select(
    '-password -refreshToken'
  );
  if (!admin) throw new ApiError(401, 'Admin not found — token invalid');

  req.admin = admin;
  next();
});
