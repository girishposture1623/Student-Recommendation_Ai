import api from "./api";

const generateRecommendation = async () => {
  const response = await api.post("/recommendations/generate");
  return response.data;
};

const getRecommendationHistory = async () => {
  const response = await api.get(
    "/recommendations/my-history"
  );
  return response.data;
};

const getRecommendationById = async (id) => {
  const response = await api.get(
    `/recommendations/${id}`
  );
  return response.data;
};

const deleteRecommendation = async (id) => {
  const response = await api.delete(
    `/recommendations/${id}`
  );
  return response.data;
};

export {
  generateRecommendation,
  getRecommendationHistory,
  getRecommendationById,
  deleteRecommendation,
};