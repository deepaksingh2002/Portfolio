import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      default: 'Remote',
    },

    period: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    current: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      required: true,
    },

    highlights: [
      {
        type: String,
      },
    ],

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Experience = mongoose.model('Experience', experienceSchema);
