import Recommendation from "../mongo/recommendation.mongo.js";

const readRecommendations = async () => {
  try {
    return await Recommendation.find()
      .populate("userId", "name email")
      .populate("studentId");
  } catch (error) {
    console.log("Read recommendations error:", error);
    throw error;
  }
};

const readRecommendationById = async (id) => {
  try {
    return await Recommendation.findById(id)
      .populate("userId", "name email")
      .populate("studentId");
  } catch (error) {
    console.log("Read recommendation by ID error:", error);
    throw error;
  }
};

const readRecommendationsByUserId = async (userId) => {
  try {
    return await Recommendation.find({ userId })
      .populate("studentId")
      .sort({ createdAt: -1 });
  } catch (error) {
    console.log("Read user recommendations error:", error);
    throw error;
  }
};

const postRecommendation = async (data) => {
  try {
    return await Recommendation.create(data);
  } catch (error) {
    console.log("Create recommendation error:", error);
    throw error;
  }
};

const deleteRecommendation = async (id) => {
  try {
    return await Recommendation.findOneAndDelete({ _id: id });
  } catch (error) {
    console.log("Delete recommendation error:", error);
    throw error;
  }
};

export {
  readRecommendations,
  readRecommendationById,
  readRecommendationsByUserId,
  postRecommendation,
  deleteRecommendation,
};