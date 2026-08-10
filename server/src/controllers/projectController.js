import { Project }      from "../models/Project.js"
import { ApiError }     from "../utils/ApiError.js"
import { ApiResponse }  from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary, cloudnaryDelete } from "../utils/cloudinary.js"


// Get all projects
export const getProjects = asyncHandler(async (req, res) => {
    const { featured, category, status = "live" } = req.query
    const filter = { status }
    if (featured === "true") filter.featured = true
    if (category)            filter.category = category

    const projects = await Project.find(filter).sort({ featured: -1, order: 1, createdAt: -1 })
    return res.status(200).json(
        new ApiResponse(200, { projects, count: projects.length }, "Projects fetched")
    )
})


// Get a single project by ID
export const getProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)
    if (!project) throw new ApiError(404, "Project not found")
    return res.status(200).json(new ApiResponse(200, { project }, "Project fetched"))
})


// Create a new project
export const createProject = asyncHandler(async (req, res) => {
    const imageLocalPath = req.file?.path
    let imageUrl = ""
    let imagePublicId = ""

    if (imageLocalPath) {
        const uploaded = await uploadOnCloudinary(imageLocalPath)
        if (!uploaded) throw new ApiError(500, "Image upload failed")
        imageUrl      = uploaded.secure_url
        imagePublicId = uploaded.public_id
    }

    const project = await Project.create({ ...req.body, imageUrl, imagePublicId })
    return res.status(201).json(new ApiResponse(201, { project }, "Project created"))
})


// Update an existing project by ID
export const updateProject = asyncHandler(async (req, res) => {
    const imageLocalPath = req.file?.path
    const updateData     = { ...req.body }

    if (imageLocalPath) {
        // Delete old image from Cloudinary if it exists 
        const existing = await Project.findById(req.params.id).select("imageUrl")
        if (existing?.imageUrl) await cloudnaryDelete(existing.imageUrl)

        const uploaded = await uploadOnCloudinary(imageLocalPath)
        if (!uploaded) throw new ApiError(500, "Image upload failed")
        updateData.imageUrl      = uploaded.secure_url
        updateData.imagePublicId = uploaded.public_id
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
        new: true, runValidators: true,
    })
    if (!project) throw new ApiError(404, "Project not found")
    return res.status(200).json(new ApiResponse(200, { project }, "Project updated"))
})


// Delete a project by ID
export const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)
    if (!project) throw new ApiError(404, "Project not found")

    if (project.imageUrl) await cloudnaryDelete(project.imageUrl)
    await project.deleteOne()

    return res.status(200).json(new ApiResponse(200, {}, "Project deleted"))
})
