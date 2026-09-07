import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    education: {
      type: String,
      required: true,
      trim: true,
    },
    marks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    skills: {
      type: [String],
      required: true,
    },
    interests: {
      type: [String],
      required: true,
    },
    preferredField: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", StudentSchema);

export default Student;