import User from "../mongo/user.mongo.js";

const readUser = async () => {
  try {
    return await User.find();
  } catch (error) {
    console.log("Read user error:", error);
    throw error;
  }
};

const readUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    console.log("Read user by ID error:", error);
    throw error;
  }
};

const getUserCount = async () => {
  try {
    return await User.countDocuments();
  } catch (error) {
    console.log("Get user count error:", error);
    throw error;
  }
};

const postUser = async (newUser) => {
  try {
    return await User.create(newUser);
  } catch (error) {
    console.log("Create user error:", error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    return await User.findOneAndDelete({ _id: id });
  } catch (error) {
    console.log("Delete user error:", error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    console.log("Get user by email error:", error);
    throw error;
  }
};

const updateUser = async (id, updateData) => {
  try {
    return await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
  } catch (error) {
    console.log("Update user error:", error);
    throw error;
  }
};

export {
  readUser,
  readUserById,
  getUserCount,
  postUser,
  deleteUser,
  getUserByEmail,
  updateUser,
};