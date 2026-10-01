import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const testGroq = async () => {
  try {
    const response = await client.responses.create({
      model: "openai/gpt-oss-20b",
      input:
        "Suggest a suitable career for a B.Sc Computer Science student with JavaScript, React, Node.js and MongoDB skills. Give a short answer.",
    });

    console.log(response.output_text);
  } catch (error) {
    console.log("Groq API error:", error);
  }
};

testGroq();