import validator from "validator";

import {
  readStudents,
  readStudentById,
  readStudentByUserId,
  postStudent,
  updateStudent,
  deleteStudent,
  getStudentCount,
} from "../Model/student.model.js";

const getStudents = async (req, res) => {
  try {
    const students = await readStudents();

    return res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    console.log("Get students error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get students",
    });
  }
};

const getStudentById = async (req, res) => {
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
    console.log("Get student error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get student",
    });
  }
};

const getMyStudentProfile = async (req, res) => {
  try {
    const student = await readStudentByUserId(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    console.log("Get my profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get student profile",
    });
  }
};

const createStudent = async (req, res) => {
  try {
    const {
      education,
      marks,
      skills,
      interests,
      preferredField,
      experience,
    } = req.body;

    if (
      !education ||
      marks === undefined ||
      !skills ||
      !interests ||
      !preferredField
    ) {
      return res.status(400).json({
        success: false,
        message: "Education, marks, skills, interests and preferred field are required",
      });
    }

    if (!validator.isNumeric(String(marks))) {
      return res.status(400).json({
        success: false,
        message: "Marks must be a number",
      });
    }

    const numericMarks = Number(marks);

    if (numericMarks < 0 || numericMarks > 100) {
      return res.status(400).json({
        success: false,
        message: "Marks must be between 0 and 100",
      });
    }

    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Skills must be a non-empty array",
      });
    }

    if (!Array.isArray(interests) || interests.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Interests must be a non-empty array",
      });
    }

    const existingStudent = await readStudentByUserId(req.user.id);

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "Student profile already exists",
      });
    }

    const student = await postStudent({
      userId: req.user.id,
      education: education.trim(),
      marks: numericMarks,
      skills: skills.map((skill) => skill.trim()),
      interests: interests.map((interest) => interest.trim()),
      preferredField: preferredField.trim(),
      experience: experience?.trim() || "",
    });

    return res.status(201).json({
      success: true,
      message: "Student profile created successfully",
      student,
    });
  } catch (error) {
    console.log("Create student error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create student profile",
    });
  }
};

const updateMyStudentProfile = async (req, res) => {
  try {
    const student = await readStudentByUserId(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    const {
      education,
      marks,
      skills,
      interests,
      preferredField,
      experience,
    } = req.body;

    const updateData = {};

    if (education !== undefined) {
      updateData.education = education.trim();
    }

    if (marks !== undefined) {
      if (!validator.isNumeric(String(marks))) {
        return res.status(400).json({
          success: false,
          message: "Marks must be a number",
        });
      }

      const numericMarks = Number(marks);

      if (numericMarks < 0 || numericMarks > 100) {
        return res.status(400).json({
          success: false,
          message: "Marks must be between 0 and 100",
        });
      }

      updateData.marks = numericMarks;
    }

    if (skills !== undefined) {
      if (!Array.isArray(skills) || skills.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Skills must be a non-empty array",
        });
      }

      updateData.skills = skills.map((skill) => skill.trim());
    }

    if (interests !== undefined) {
      if (!Array.isArray(interests) || interests.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Interests must be a non-empty array",
        });
      }

      updateData.interests = interests.map((interest) => interest.trim());
    }

    if (preferredField !== undefined) {
      updateData.preferredField = preferredField.trim();
    }

    if (experience !== undefined) {
      updateData.experience = experience.trim();
    }

    const updatedStudent = await updateStudent(
      student._id,
      updateData
    );

    return res.status(200).json({
      success: true,
      message: "Student profile updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.log("Update student error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update student profile",
    });
  }
};

const deleteMyStudentProfile = async (req, res) => {
  try {
    const student = await readStudentByUserId(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    await deleteStudent(student._id);

    return res.status(200).json({
      success: true,
      message: "Student profile deleted successfully",
    });
  } catch (error) {
    console.log("Delete student profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete student profile",
    });
  }
};

const getTotalStudents = async (req, res) => {
  try {
    const count = await getStudentCount();

    return res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.log("Get student count error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get student count",
    });
  }
};

const deleteStudentById = async (req, res) => {
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
    console.log("Delete student error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete student",
    });
  }
};

export {
  getStudents,
  getStudentById,
  getMyStudentProfile,
  createStudent,
  updateMyStudentProfile,
  deleteMyStudentProfile,
  getTotalStudents,
  deleteStudentById,
};