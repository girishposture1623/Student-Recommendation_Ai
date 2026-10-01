import OpenAI from "openai";
import "dotenv/config";

import {
  readRecommendations,
  readRecommendationById,
  readRecommendationsByUserId,
  postRecommendation,
  deleteRecommendation,
} from "../Model/recommendation.model.js";

import { readStudentByUserId } from "../Model/student.model.js";

const groqClient = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const openRouterClient = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const parseAIResponse = (text) => {
  if (!text) {
    throw new Error("Empty AI response");
  }

  const cleanedText = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanedText);
};

const createPrompt = (student) => {
  return `
You are an AI career recommendation system.

Analyze the following student profile and recommend the most suitable career.

Student Education: ${student.education}
Marks: ${student.marks}
Skills: ${student.skills.join(", ")}
Interests: ${student.interests.join(", ")}
Preferred Field: ${student.preferredField}
Experience: ${student.experience || "None"}

Return ONLY valid JSON.

Use exactly this structure:

{
  "career": "career name",
  "matchScore": 85,
  "recommendedSkills": ["skill1", "skill2", "skill3"],
  "explanation": "short explanation",
  "learningPath": ["step 1", "step 2", "step 3", "step 4"]
}

Rules:
- matchScore must be a number between 0 and 100.
- recommendedSkills must contain useful skills for the recommended career.
- learningPath must contain practical learning steps.
- Do not include markdown.
- Do not include any text outside the JSON.
`;
};

const getGeminiRecommendation = async (prompt) => {
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
    throw new Error(
      data?.error?.message || "Gemini API request failed"
    );
  }

  const aiText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text;

  return parseAIResponse(aiText);
};

const getGroqRecommendation = async (prompt) => {
  const response = await groqClient.responses.create({
    model: "openai/gpt-oss-20b",
    input: prompt,
  });

  return parseAIResponse(response.output_text);
};

const getOpenRouterRecommendation = async (prompt) => {
  const response = await openRouterClient.chat.completions.create({
    model: "dots-studio/dots-3-note-preview:free",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const aiText = response?.choices?.[0]?.message?.content;

  return parseAIResponse(aiText);
};

const normalizeCareer = (career) => {
  return career
    .toLowerCase()
    .replace(/full[\s-]*stack/g, "fullstack")
    .replace(/developer/g, "")
    .replace(/engineer/g, "")
    .replace(/specialist/g, "")
    .replace(/software/g, "")
    .replace(/web/g, "")
    .replace(/programmer/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
};

const analyzeRecommendations = (recommendations, student) => {
  const normalizeText = (value) => {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const normalizeList = (list) => {
    return (list || []).map((item) => normalizeText(item));
  };

  const studentSkills = normalizeList(student.skills);
  const studentInterests = normalizeList(student.interests);
  const preferredField = normalizeText(student.preferredField);

  const careerKeywords = {
    "mern stack developer": [
      "mern",
      "react",
      "node",
      "nodejs",
      "mongodb",
      "express",
      "javascript",
      "web development",
      "full stack",
      "fullstack",
    ],
    "full stack developer": [
      "full stack",
      "fullstack",
      "react",
      "node",
      "nodejs",
      "mongodb",
      "express",
      "javascript",
      "web development",
    ],
    "frontend developer": [
      "frontend",
      "front end",
      "react",
      "javascript",
      "html",
      "css",
      "web development",
    ],
    "backend developer": [
      "backend",
      "back end",
      "node",
      "nodejs",
      "express",
      "mongodb",
      "api",
      "server",
    ],
    "software developer": [
      "software",
      "programming",
      "javascript",
      "python",
      "java",
      "development",
    ],
    "data scientist": [
      "data science",
      "data scientist",
      "python",
      "statistics",
      "machine learning",
      "data analysis",
    ],
    "machine learning engineer": [
      "machine learning",
      "ml",
      "python",
      "artificial intelligence",
      "ai",
      "data science",
    ],
    "ai engineer": [
      "artificial intelligence",
      "ai",
      "machine learning",
      "python",
      "deep learning",
    ],
  };

  const getCareerFamily = (career) => {
    const normalizedCareer = normalizeText(career);

    if (
      normalizedCareer.includes("mern") ||
      (normalizedCareer.includes("full stack") &&
        (normalizedCareer.includes("web") ||
          normalizedCareer.includes("software")))
    ) {
      return "full stack developer";
    }

    if (
      normalizedCareer.includes("frontend") ||
      normalizedCareer.includes("front end")
    ) {
      return "frontend developer";
    }

    if (
      normalizedCareer.includes("backend") ||
      normalizedCareer.includes("back end")
    ) {
      return "backend developer";
    }

    if (
      normalizedCareer.includes("machine learning") ||
      normalizedCareer.includes("ml engineer")
    ) {
      return "machine learning engineer";
    }

    if (
      normalizedCareer.includes("data scientist") ||
      normalizedCareer.includes("data science")
    ) {
      return "data scientist";
    }

    if (
      normalizedCareer.includes("ai engineer") ||
      normalizedCareer.includes("artificial intelligence")
    ) {
      return "ai engineer";
    }

    if (
      normalizedCareer.includes("software developer") ||
      normalizedCareer.includes("software engineer")
    ) {
      return "software developer";
    }

    return normalizedCareer;
  };

  const getKeywordsForCareer = (career, recommendation) => {
    const family = getCareerFamily(career);

    const familyKeywords = careerKeywords[family] || [];

    const skillKeywords = normalizeList(
      recommendation.recommendedSkills
    );

    return [...new Set([...familyKeywords, ...skillKeywords])];
  };

  const calculateSkillRelevance = (career, recommendation) => {
    const keywords = getKeywordsForCareer(
      career,
      recommendation
    );

    if (keywords.length === 0 || studentSkills.length === 0) {
      return 0;
    }

    const matches = studentSkills.filter((skill) =>
      keywords.some(
        (keyword) =>
          skill.includes(keyword) ||
          keyword.includes(skill)
      )
    );

    return Math.min(
      100,
      Math.round(
        (matches.length / studentSkills.length) * 100
      )
    );
  };

  const calculateInterestRelevance = (career) => {
    const normalizedCareer = normalizeText(career);

    const text = [
      normalizedCareer,
      preferredField,
      ...studentInterests,
    ].join(" ");

    if (!preferredField && studentInterests.length === 0) {
      return 0;
    }

    let score = 0;

    if (
      preferredField &&
      (normalizedCareer.includes(preferredField) ||
        preferredField.includes(normalizedCareer))
    ) {
      score += 60;
    }

    const interestMatches = studentInterests.filter(
      (interest) =>
        normalizedCareer.includes(interest) ||
        interest.includes(normalizedCareer) ||
        text.includes(interest)
    );

    score += Math.min(
      40,
      interestMatches.length * 20
    );

    return Math.min(100, score);
  };

  const careerGroups = {};

  recommendations.forEach((recommendation) => {
    const family = getCareerFamily(
      recommendation.career
    );

    if (!careerGroups[family]) {
      careerGroups[family] = [];
    }

    careerGroups[family].push(recommendation);
  });

  const analyzedGroups = Object.entries(
    careerGroups
  ).map(([family, group]) => {
    const aiScore =
      group.reduce(
        (total, item) =>
          total + Number(item.matchScore || 0),
        0
      ) / group.length;

    const consensusScore =
      (group.length / recommendations.length) * 100;

    const skillScores = group.map((item) =>
      calculateSkillRelevance(
        item.career,
        item
      )
    );

    const skillRelevance =
      skillScores.reduce(
        (total, score) => total + score,
        0
      ) / skillScores.length;

    const interestScores = group.map((item) =>
      calculateInterestRelevance(item.career)
    );

    const interestRelevance =
      interestScores.reduce(
        (total, score) => total + score,
        0
      ) / interestScores.length;

    const finalScore = Math.round(
      aiScore * 0.4 +
        consensusScore * 0.25 +
        skillRelevance * 0.2 +
        interestRelevance * 0.15
    );

    const bestRecommendation = group.reduce(
      (best, current) => {
        return Number(current.matchScore || 0) >
          Number(best.matchScore || 0)
          ? current
          : best;
      }
    );

    return {
      family,
      group,
      aiScore,
      consensusScore,
      skillRelevance,
      interestRelevance,
      finalScore,
      bestRecommendation,
    };
  });

  analyzedGroups.sort(
    (a, b) => b.finalScore - a.finalScore
  );

  const winner = analyzedGroups[0];

  const allSkills = winner.group.flatMap(
    (item) => item.recommendedSkills || []
  );

  const uniqueSkills = [
    ...new Map(
      allSkills.map((skill) => [
        normalizeText(skill),
        skill,
      ])
    ).values(),
  ];

  const allLearningPaths = winner.group.flatMap(
    (item) => item.learningPath || []
  );

  const uniqueLearningPath = [
    ...new Map(
      allLearningPaths.map((step) => [
        normalizeText(step),
        step,
      ])
    ).values(),
  ];

  const explanation = `${winner.bestRecommendation.explanation} This recommendation was selected after comparing ${recommendations.length} AI recommendations based on AI match score, consensus, student skills, interests, and preferred field.`;

  return {
    career: winner.bestRecommendation.career,
    matchScore: winner.finalScore,
    recommendedSkills: uniqueSkills.slice(0, 8),
    explanation,
    learningPath: uniqueLearningPath.slice(0, 8),
  };
};

const generateRecommendation = async (req, res) => {
  try {
    const student = await readStudentByUserId(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    const prompt = createPrompt(student);

    const results = await Promise.allSettled([
      getGeminiRecommendation(prompt),
      getGroqRecommendation(prompt),
      getOpenRouterRecommendation(prompt),
    ]);

    const successfulRecommendations = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    const failedRecommendations = results
      .filter((result) => result.status === "rejected")
      .map((result) => result.reason?.message);

    console.log("AI successful responses:", successfulRecommendations.length);

    if (failedRecommendations.length > 0) {
      console.log("AI failed responses:", failedRecommendations);
    }

    if (successfulRecommendations.length < 2) {
      return res.status(502).json({
        success: false,
        message:
          "Not enough AI responses available to generate a reliable recommendation",
        errors: failedRecommendations,
      });
    }

   const finalRecommendation = analyzeRecommendations(
  successfulRecommendations,
  student
);
    const recommendation = await postRecommendation({
      userId: req.user.id,
      studentId: student._id,
      career: finalRecommendation.career,
      matchScore: finalRecommendation.matchScore,
      recommendedSkills: finalRecommendation.recommendedSkills,
      explanation: finalRecommendation.explanation,
      learningPath: finalRecommendation.learningPath,
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