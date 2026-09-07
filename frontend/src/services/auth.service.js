import api from "./api";

const registerUser = async (userData) => {
  const response = await api.post("/users/register", userData);
  return response.data;
};

const loginUser = async (userData) => {
  const response = await api.post("/users/login", userData);
  return response.data;
};

const googleLogin = async (credential) => {
  const response = await api.post("/users/google-login", {
    credential,
  });
  return response.data;
};

const forgotPassword = async (email) => {
  const response = await api.post("/users/forgot-password", {
    email,
  });
  return response.data;
};

const resetPassword = async (data) => {
  const response = await api.post("/users/reset-password", data);
  return response.data;
};

const logoutUser = async () => {
  const response = await api.post("/users/logout");
  return response.data;
};

export {
  registerUser,
  loginUser,
  googleLogin,
  forgotPassword,
  resetPassword,
  logoutUser,
};