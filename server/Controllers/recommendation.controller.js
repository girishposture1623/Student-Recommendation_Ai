import {
  readRecommendations,
  readRecommendationById,
  readRecommendationsByUserId,
  postRecommendation,
  deleteRecommendation,
} from "../Model/recommendation.model.js";

import { readStudentByUserId } from "../Model/student.model.js";

const generateRecommendation = async (req, res) => {
  try {
    const student = await readStudentByUserId(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    const prompt = `
You are an AI career recommendation system.

Analyze the following student profile and provide a suitable career recommendation.

Student Education: ${student.education}
Marks: ${student.marks}
Skills: ${student.skills.join(", ")}
Interests: ${student.interests.join(", ")}
Preferred Field: ${student.preferredField}
Experience: ${student.experience || "None"}

Return ONLY valid JSON in this exact structure:

{
  "career": "career name",
  "matchScore": 85,
  "recommendedSkills": ["skill1", "skill2", "skill3"],
  "explanation": "short explanation",
  "learningPath": ["step 1", "step 2", "step 3", "step 4"]
}

matchScore must be a number between 0 and 100.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log("Gemini API error:", data);

      return res.status(500).json({
        success: false,
        message: "AI recommendation failed",
      });
    }

    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      return res.status(500).json({
        success: false,
        message: "Invalid AI response",
      });
    }

    const recommendationData = JSON.parse(aiText);

    const recommendation = await postRecommendation({
      userId: req.user.id,
      studentId: student._id,
      career: recommendationData.career,
      matchScore: recommendationData.matchScore,
      recommendedSkills: recommendationData.recommendedSkills,
      explanation: recommendationData.explanation,
      learningPath: recommendationData.learningPath,
    });

    return res.status(201).json({
      success: true,
      message: "AI recommendation generated successfully",
      recommendation,
    });
  } catch (error) {
    console.log("Generate recommendation error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI recommendation",
    });
  }
};

const getRecommendations = async (req, res) => {
  try {
    const recommendations = await readRecommendationsByUserId(
      req.user.id
    );

    return res.status(200).json({
      success: true,
      recommendations,
    });
  } catch (error) {
    console.log("Get recommendations error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get recommendations",
    });
  }
};

const getRecommendationById = async (req, res) => {
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

    if (
      recommendation.userId._id.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    return res.status(200).json({
      success: true,
      recommendation,
    });
  } catch (error) {
    console.log("Get recommendation error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get recommendation",
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
      message: "Failed to get all recommendations",
    });
  }
};

const deleteOneRecommendation = async (req, res) => {
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

    if (
      recommendation.userId._id.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    await deleteRecommendation(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Recommendation deleted successfully",
    });
  } catch (error) {
    console.log("Delete recommendation error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete recommendation",
    });
  }
};

export {
  generateRecommendation,
  getRecommendations,
  getRecommendationById,
  getAllRecommendations,
  deleteOneRecommendation,
};