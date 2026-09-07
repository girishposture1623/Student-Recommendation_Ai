import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

import {
  readUser,
  readUserById,
  postUser,
  deleteUser,
  getUserByEmail,
  updateUser,
  getUserCount,
} from "../Model/user.model.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const getUser = async (req, res) => {
  try {
    const users = await readUser();

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("Get users error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get users",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await readUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Get user by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get user",
    });
  }
};

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    if (!validator.isLength(name.trim(), { min: 3, max: 50 })) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 3 and 50 characters",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    if (!validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters with uppercase, lowercase and number",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await getUserByEmail(normalizedEmail);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await postUser({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "student",
      provider: "local",
    });

    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        provider: user.provider,
      },
    });
  } catch (error) {
    console.log("Register error:", error);

    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await getUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (user.provider === "google") {
      return res.status(400).json({
        success: false,
        message: "This account uses Google login",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user);

    await updateUser(user._id, {
      lastLogin: new Date(),
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        provider: user.provider,
      },
    });
  } catch (error) {
    console.log("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required",
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Invalid Google credential",
      });
    }

    const {
      sub: googleId,
      name,
      email,
      email_verified: emailVerified,
    } = payload;

    if (!email || !emailVerified) {
      return res.status(400).json({
        success: false,
        message: "Google email is not verified",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    let user = await getUserByEmail(normalizedEmail);

    if (!user) {
      user = await postUser({
        name: name || "Google User",
        email: normalizedEmail,
        googleId,
        provider: "google",
        role: "student",
        lastLogin: new Date(),
      });
    } else {
      if (user.provider === "local") {
        return res.status(400).json({
          success: false,
          message:
            "An account with this email already exists. Login using email and password.",
        });
      }

      user = await updateUser(user._id, {
        googleId,
        lastLogin: new Date(),
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        provider: user.provider,
      },
    });
  } catch (error) {
    console.log("Google login error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid Google credential",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await getUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.provider === "google") {
      return res.status(400).json({
        success: false,
        message: "This account uses Google login",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const resetTokenHash = await bcrypt.hash(resetToken, 10);

    const resetTokenExpire = new Date(Date.now() + 15 * 60 * 1000);

    await updateUser(user._id, {
      resetToken: resetTokenHash,
      resetTokenExpire,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset token generated",
      resetToken,
    });
  } catch (error) {
    console.log("Forgot password error:", error);

    return res.status(500).json({
      success: false,
      message: "Forgot password failed",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;

    if (!email || !resetToken || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, reset token and new password are required",
      });
    }

    if (!validator.isStrongPassword(newPassword, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters with uppercase, lowercase and number",
      });
    }

    const user = await getUserByEmail(email.trim().toLowerCase());

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.resetToken || !user.resetTokenExpire) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset token",
      });
    }

    if (user.resetTokenExpire < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Reset token has expired",
      });
    }

    const isTokenValid = await bcrypt.compare(
      resetToken,
      user.resetToken
    );

    if (!isTokenValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset token",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await updateUser(user._id, {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpire: null,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log("Reset password error:", error);

    return res.status(500).json({
      success: false,
      message: "Reset password failed",
    });
  }
};

const logOut = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

const deleteOneUser = async (req, res) => {
  try {
    const user = await deleteUser(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log("Delete user error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

const getTotalUsers = async (req, res) => {
  try {
    const count = await getUserCount();

    return res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.log("Get user count error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get user count",
    });
  }
};



export {
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
};