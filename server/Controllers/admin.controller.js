import {
  readUser,
  readUserById,
  deleteUser,
  getUserCount,
} from "../Model/user.model.js";

import {
  readStudents,
  readStudentById,
  deleteStudent,
  getStudentCount,
} from "../Model/student.model.js";

import {
  readRecommendations,
  readRecommendationById,
  deleteRecommendation,
} from "../Model/recommendation.model.js";

const getAdminDashboard = async (req, res) => {
  try {
    const userCount = await getUserCount();
    const studentCount = await getStudentCount();
    const recommendations = await readRecommendations();

    return res.status(200).json({
      success: true,
      dashboard: {
        totalUsers: userCount,
        totalStudents: studentCount,
        totalRecommendations: recommendations.length,
      },
    });
  } catch (error) {
    console.log("Admin dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await readUser();

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("Get all users error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get users",
    });
  }
};

const getAdminUserById = async (req, res) => {
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
    console.log("Get admin user error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get user",
    });
  }
};

const deleteAdminUser = async (req, res) => {
  try {
    if (req.params.id === req.user.id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Admin cannot delete own account",
      });
    }

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
    console.log("Delete admin user error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await readStudents();

    return res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    console.log("Get all students error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get students",
    });
  }
};

const getAdminStudentById = async (req, res) => {
  try {
    const student = await readStudentById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    console.log("Get admin student error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get student",
    });
  }
};

const deleteAdminStudent = async (req, res) => {
  try {
    const student = await deleteStudent(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.log("Delete admin student error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete student",
    });
  }
};

const getAllRecommendations = async (req, res) => {
  try {
    const recommendations = await readRecommendations();

    return res.status(200).json({
      success: true,
      recommendations,
    });
  } catch (error) {
    console.log("Get all recommendations error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get recommendations",
    });
  }
};

const getAdminRecommendationById = async (req, res) => {
  try {
    const recommendation = await readRecommendationById(
      req.params.id
    );

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: "Recommendation not found",
      });
    }

    return res.status(200).json({
      success: true,
      recommendation,
    });
  } catch (error) {
    console.log("Get admin recommendation error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get recommendation",
    });
  }
};

const deleteAdminRecommendation = async (req, res) => {
  try {
    const recommendation = await deleteRecommendation(
      req.params.id
    );

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: "Recommendation not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Recommendation deleted successfully",
    });
  } catch (error) {
    console.log("Delete admin recommendation error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete recommendation",
    });
  }
};

export {
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
};