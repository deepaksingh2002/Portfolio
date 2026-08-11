import Jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Helper function to generate access and refresh tokens for an admin
const generateTokens = async (adminId) => {
  const admin = await Admin.findById(adminId);
  const accessToken = admin.generateAccessToken();
  const refreshToken = admin.generateRefreshToken();
  admin.refreshToken = refreshToken;
  await admin.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

// POST /api/auth/login
// 1. Find admin by email
// 2. Verify password with instance method
// 3. Generate both tokens
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email: email.trim().toLowerCase() });
  if (!admin) throw new ApiError(401, 'Invalid credentials');

  const isPasswordValid = await admin.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, 'Invalid credentials');

  const { accessToken, refreshToken } = await generateTokens(admin._id);

  admin.lastLogin = new Date();
  await admin.save({ validateBeforeSave: false });

  const safeAdmin = {
    _id: admin._id,
    email: admin.email,
    name: admin.name,
  };

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { admin: safeAdmin, accessToken, refreshToken },
        'Login successful'
      )
    );
});

// GET /api/auth/me
export const getMe = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, { admin: req.admin }, 'Admin fetched'));
});

// POST /api/auth/refresh-token
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingToken = req.body.refreshToken || req.cookies?.refreshToken;

  if (!incomingToken) throw new ApiError(401, 'Refresh token required');

  let decoded;
  try {
    decoded = Jwt.verify(incomingToken, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }

  const admin = await Admin.findById(decoded._id);
  if (!admin || admin.refreshToken !== incomingToken) {
    throw new ApiError(401, 'Refresh token mismatch — please log in again');
  }

  const { accessToken, refreshToken: newRefreshToken } = await generateTokens(
    admin._id
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken: newRefreshToken },
        'Token refreshed'
      )
    );
});

// POST /api/auth/logout
export const logout = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(
    req.admin._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Logged out successfully'));
});

// POST /api/auth/seed  (dev only)
export const seedAdmin = asyncHandler(async (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    throw new ApiError(403, 'Seed is only available in development mode');
  }

  const SEED_EMAIL = 'admin@portfolio.dev';
  const SEED_PASS = 'Admin@2025';

  // Check if admin already exists
  const existing = await Admin.findOne({ email: SEED_EMAIL });

  if (existing) {
    // Verify current password works — if not, update it
    const passwordOk = await existing.isPasswordCorrect(SEED_PASS);

    if (!passwordOk) {
      // Reset password — pre-save hook will hash it
      existing.password = SEED_PASS;
      await existing.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { email: SEED_EMAIL },
            'Admin password reset to seed value'
          )
        );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { email: SEED_EMAIL },
          'Admin already exists and credentials are valid'
        )
      );
  }

  // Create fresh admin — pre-save hook hashes password
  const admin = await Admin.create({
    email: SEED_EMAIL,
    password: SEED_PASS,
    name: 'Portfolio Admin',
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { email: admin.email },
        `Admin seeded — use password: ${SEED_PASS}`
      )
    );
});
