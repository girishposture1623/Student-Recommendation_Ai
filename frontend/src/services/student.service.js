import api from "./api";

const createStudentProfile = async (studentData) => {
  const response = await api.post("/students", studentData);
  return response.data;
};

const getMyStudentProfile = async () => {
  const response = await api.get("/students/my-profile");
  return response.data;
};

const updateStudentProfile = async (studentData) => {
  const response = await api.put(
    "/students/my-profile",
    studentData
  );
  return response.data;
};

const deleteStudentProfile = async () => {
  const response = await api.delete("/students/my-profile");
  return response.data;
};

export {
  createStudentProfile,
  getMyStudentProfile,
  updateStudentProfile,
  deleteStudentProfile,
};