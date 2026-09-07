import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors'
import userRoutes from "./Routes/user.routes.js";
import studentRoute from "./Routes/student.routes.js";
import recommendationRoute from "./Routes/recommendation.routes.js";
import adminRoute from "./Routes/admin.routes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.use("/api/users", userRoutes);
app.use("/api/students", studentRoute)
app.use("/api/recommendations", recommendationRoute)
app.use("/api/admin", adminRoute)

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});