import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  generateRecommendation,
  getRecommendations,
  getRecommendationById,
  getAllRecommendations,
  deleteOneRecommendation,
} from "../Controllers/recommendation.controller.js";

const recommendationRoute = express.Router();

recommendationRoute.post("/generate", authMiddleware, generateRecommendation);

recommendationRoute.get("/my-history", authMiddleware, getRecommendations);

recommendationRoute.get("/:id", authMiddleware, getRecommendationById);

recommendationRoute.get("/", authMiddleware, getAllRecommendations);

recommendationRoute.delete("/:id", authMiddleware, deleteOneRecommendation);

export default recommendationRoute;
