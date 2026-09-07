import api from "./api";

const getAdminDashboard = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

const getAllUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

const getUserById = async (id) => {
  const response = await api.get(`/admin/users/${id}`);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

const getAllStudents = async () => {
  const response = await api.get("/admin/students");
  return response.data;
};

const getStudentById = async (id) => {
  const response = await api.get(`/admin/students/${id}`);
  return response.data;
};

const deleteStudent = async (id) => {
  const response = await api.delete(`/admin/students/${id}`);
  return response.data;
};

const getAllRecommendations = async () => {
  const response = await api.get("/admin/recommendations");
  return response.data;
};

const getRecommendationById = async (id) => {
  const response = await api.get(
    `/admin/recommendations/${id}`
  );
  return response.data;
};

const deleteRecommendation = async (id) => {
  const response = await api.delete(
    `/admin/recommendations/${id}`
  );
  return response.data;
};

export {
  getAdminDashboard,
  getAllUsers,
  getUserById,
  deleteUser,
  getAllStudents,
  getStudentById,
  deleteStudent,
  getAllRecommendations,
  getRecommendationById,
  deleteRecommendation,
};