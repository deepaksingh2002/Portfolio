import mongoose from "mongoose"

const projectSchema = new mongoose.Schema(
    {
        title: {
             type: String,
             required: [true, "Title is required"],
             trim: true,
             maxlength: [100, "Max 100 chars"]
         },

        description: {
             type: String,
             required: [true, "Description is required"],
             maxlength: [500, "Max 500 chars"]
         },

        longDescription: {
             type: String,
             maxlength: [2000, "Max 2000 chars"]
         },

        techStack: [{
             type: String,
             trim: true
        }],

        liveUrl: {
             type: String,
             trim: true
         },

        githubUrl: {
             type: String,
             trim: true
         },

        imageUrl: {
             type: String,
             default: ""
         },

        imagePublicId: {
             type: String,
             default: ""
         },

        featured: {
             type: Boolean,
             default: false
         },

        order: {
             type: Number,
             default: 0
         },

        category: {
            type: String,
            enum: ["Full-Stack", "Frontend", "Backend", "Mobile", "AI/ML", "Open Source", "Other"],
            default: "Full-Stack",
        },

        status: {
            type: String,
            enum: ["live", "draft", "archived"],
            default: "live",
        },
        
        stats: { users: String, stars: String, impact: String },
    },
    { timestamps: true }
)

projectSchema.index({ featured: 1, order: 1 })

export const Project = mongoose.model("Project", projectSchema)
