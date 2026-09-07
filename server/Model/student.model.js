import Student from "../mongo/student.mongo.js";

const readStudents = async () => {
  try {
    return await Student.find().populate("userId", "name email");
  } catch (error) {
    console.log("Read students error:", error);
    throw error;
  }
};

const readStudentById = async (id) => {
  try {
    return await Student.findById(id).populate("userId", "name email");
  } catch (error) {
    console.log("Read student by ID error:", error);
    throw error;
  }
};

const readStudentByUserId = async (userId) => {
  try {
    return await Student.findOne({ userId });
  } catch (error) {
    console.log("Read student by user ID error:", error);
    throw error;
  }
};

const postStudent = async (newStudent) => {
  try {
    return await Student.create(newStudent);
  } catch (error) {
    console.log("Create student error:", error);
    throw error;
  }
};

const updateStudent = async (id, updateData) => {
  try {
    return await Student.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
  } catch (error) {
    console.log("Update student error:", error);
    throw error;
  }
};

const deleteStudent = async (id) => {
  try {
    return await Student.findOneAndDelete({ _id: id });
  } catch (error) {
    console.log("Delete student error:", error);
    throw error;
  }
};

const getStudentCount = async () => {
  try {
    return await Student.countDocuments();
  } catch (error) {
    console.log("Get student count error:", error);
    throw error;
  }
};

export {
  readStudents,
  readStudentById,
  readStudentByUserId,
  postStudent,
  updateStudent,
  deleteStudent,
  getStudentCount,
};