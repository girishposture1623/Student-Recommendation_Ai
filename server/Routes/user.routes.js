import express from "express";

import {
  getUser,
  getUserById,
  userRegister,
  userLogin,
  googleLogin,
  forgotPassword,
  resetPassword,
  logOut,
  deleteOneUser,
  getTotalUsers,
} from "../Controllers/user.controller.js";

const userRoute = express.Router();

userRoute.get("/", getUser);
userRoute.get("/count", getTotalUsers);
userRoute.get("/:id", getUserById);

userRoute.post("/register", userRegister);
userRoute.post("/login", userLogin);
userRoute.post("/google-login", googleLogin);
userRoute.post("/forgot-password", forgotPassword);
userRoute.post("/reset-password", resetPassword);

userRoute.post("/logout", logOut);

userRoute.delete("/:id", deleteOneUser);

export default userRoute;