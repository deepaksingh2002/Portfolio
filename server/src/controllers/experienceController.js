import { Experience } from '../models/Experience.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Get all experience
export const getExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.find().sort({ current: -1, order: 1 });
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { experience, count: experience.length },
        'Experience fetched'
      )
    );
});

// post experience
export const createExperience = asyncHandler(async (req, res) => {
  const exp = await Experience.create(req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, { experience: exp }, 'Experience created'));
});

// update experience
export const updateExperience = asyncHandler(async (req, res) => {
  const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!exp) throw new ApiError(404, 'Experience not found');
  return res
    .status(200)
    .json(new ApiResponse(200, { experience: exp }, 'Experience updated'));
});

// delete experience
export const deleteExperience = asyncHandler(async (req, res) => {
  const exp = await Experience.findByIdAndDelete(req.params.id);
  if (!exp) throw new ApiError(404, 'Experience not found');
  return res.status(200).json(new ApiResponse(200, {}, 'Experience deleted'));
});
