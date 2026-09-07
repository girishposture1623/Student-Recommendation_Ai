import express from "express";

import adminMiddleware from "../middleware/admin.middleware.js";

import {
  getAdminDashboard,
  getAllUsers,
  getAdminUserById,
  deleteAdminUser,
  getAllStudents,
  getAdminStudentById,
  deleteAdminStudent,
  getAllRecommendations,
  getAdminRecommendationById,
  deleteAdminRecommendation,
} from "../Controllers/admin.controller.js";

const adminRoute = express.Router();

adminRoute.get("/dashboard", adminMiddleware, getAdminDashboard);

adminRoute.get("/users", adminMiddleware, getAllUsers);

adminRoute.get("/users/:id", adminMiddleware, getAdminUserById);

adminRoute.delete("/users/:id", adminMiddleware, deleteAdminUser);

adminRoute.get("/students", adminMiddleware, getAllStudents);

adminRoute.get("/students/:id", adminMiddleware, getAdminStudentById);

adminRoute.delete("/students/:id", adminMiddleware, deleteAdminStudent);

adminRoute.get("/recommendations", adminMiddleware, getAllRecommendations);

adminRoute.get(
  "/recommendations/:id",
  adminMiddleware,
  getAdminRecommendationById,
);

adminRoute.delete(
  "/recommendations/:id",
  adminMiddleware,
  deleteAdminRecommendation,
);

export default adminRoute;
