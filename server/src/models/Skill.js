import mongoose from "mongoose"

const skillSchema = new mongoose.Schema(
    {
        name: {
             type: String,
             required: true,
             trim: true
         },

        category: {
             type: String,
             enum: ["Frontend", "Backend", "Database", "DevOps", "Tools", "Other"],
             required: true
         },

        proficiency: {
             type: Number,
             min: 1,
             max: 5,
             default: 3
         },

        icon: {
             type: String,
             default: ""
         },

        order: {
             type: Number,
             default: 0
         },

    },
    { timestamps: true }
)

export const Skill = mongoose.model("Skill", skillSchema)
