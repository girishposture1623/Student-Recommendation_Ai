import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  getStudents,
  getStudentById,
  getMyStudentProfile,
  createStudent,
  updateMyStudentProfile,
  deleteMyStudentProfile,
  getTotalStudents,
  deleteStudentById,
} from "../Controllers/student.controller.js";

const studentRoute = express.Router();

studentRoute.get("/", authMiddleware, getStudents);
studentRoute.get("/count", authMiddleware, getTotalStudents);
studentRoute.get("/my-profile", authMiddleware, getMyStudentProfile);
studentRoute.get("/:id", authMiddleware, getStudentById);

studentRoute.post("/", authMiddleware, createStudent);

studentRoute.put("/my-profile", authMiddleware, updateMyStudentProfile);

studentRoute.delete("/my-profile", authMiddleware, deleteMyStudentProfile);
studentRoute.delete("/:id", authMiddleware, deleteStudentById);

export default studentRoute;