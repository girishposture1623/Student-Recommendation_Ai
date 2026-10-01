import { OpenRouter } from "@openrouter/sdk";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const testOpenRouter = async () => {
  try {
    const response = await client.chat.send({
      chatRequest: {
        model: "dots-studio/dots-3-note-preview:free",
        messages: [
          {
            role: "user",
            content:
              "Suggest a suitable career for a B.Sc Computer Science student with JavaScript, React, Node.js and MongoDB skills. Give a short answer.",
          },
        ],
      },
    });

    console.log(response.choices[0].message.content);
  } catch (error) {
    console.log("OpenRouter API error:", error);
  }
};

testOpenRouter();