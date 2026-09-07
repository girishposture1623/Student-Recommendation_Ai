import mongoose from "mongoose";

const RecommendationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    career: {
      type: String,
      required: true,
    },
    matchScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    recommendedSkills: {
      type: [String],
      default: [],
    },
    explanation: {
      type: String,
      required: true,
    },
    learningPath: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Recommendation = mongoose.model(
  "Recommendation",
  RecommendationSchema
);

export default Recommendation;