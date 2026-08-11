import { Skill } from '../models/Skill.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Get all skills
export const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ category: 1, order: 1 });
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});
  return res
    .status(200)
    .json(new ApiResponse(200, { skills, grouped }, 'Skills fetched'));
});

// create a new skill
export const createSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.create(req.body);
  return res.status(201).json(new ApiResponse(201, { skill }, 'Skill created'));
});

// update an existing skill by ID
export const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!skill) throw new ApiError(404, 'Skill not found');
  return res.status(200).json(new ApiResponse(200, { skill }, 'Skill updated'));
});

// delete a skill by ID
export const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill) throw new ApiError(404, 'Skill not found');
  return res.status(200).json(new ApiResponse(200, {}, 'Skill deleted'));
});
