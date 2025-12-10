import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";

// Initialize OpenAI client
// Note: This requires OPENAI_API_KEY environment variable to be set
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "mock-key", // Fallback for dev if not set
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // API Routes

  // 1. Generate Prompt from User Input
  app.post("/api/generate-prompt", async (req, res) => {
    try {
      const { focusAreas, visionText, style } = req.body;

      if (!visionText) {
        return res.status(400).json({ error: "Vision text is required" });
      }

      // If no API key is set, return a mock response for testing
      if (!process.env.OPENAI_API_KEY) {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
        return res.json({
          prompt: `A cinematic, high-resolution vision board image in ${style} style. 
          Focusing on ${focusAreas.join(", ")}. 
          Visualizing: ${visionText}. 
          The image features soft lighting, golden hour colors, and a luxurious atmosphere.`
        });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert vision board curator. Your goal is to take a user's life goals and dream description and convert it into a highly detailed, cinematic, professional image prompt for DALL-E 3.
            
            The user will provide:
            1. Focus Areas (e.g., Career, Love, Health)
            2. A personal vision description (raw text)
            3. A visual style preference
            
            Your output must be:
            - A SINGLE, coherent, descriptive paragraph in English.
            - Optimized for generating a high-quality, inspiring vision board image.
            - Focus on lighting, composition, mood, and specific visual details mentioned by the user.
            - Do NOT include any conversational filler. Just the prompt.`
          },
          {
            role: "user",
            content: `Focus Areas: ${focusAreas.join(", ")}
            Vision Description: ${visionText}
            Style: ${style}`
          }
        ],
        temperature: 0.7,
      });

      const generatedPrompt = response.choices[0].message.content;
      res.json({ prompt: generatedPrompt });
    } catch (error) {
      console.error("Error generating prompt:", error);
      res.status(500).json({ error: "Failed to generate prompt" });
    }
  });

  // 2. Generate Image from Prompt
  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      // If no API key is set, return a mock response for testing
      if (!process.env.OPENAI_API_KEY) {
        await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate delay
        // Return a random placeholder image from the assets we found earlier
        const mockImages = [
          "/images/vision-board-1.jpg",
          "/images/vision-board-2.jpg",
          "/images/vision-board-3.jpg", 
          "/images/vision-board-4.jpg"
        ];
        const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
        return res.json({ imageUrl: randomImage });
      }

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "hd",
        style: "natural",
      });

      const imageUrl = response.data?.[0]?.url;
      if (!imageUrl) {
        throw new Error("No image URL returned from OpenAI");
      }
      res.json({ imageUrl });
    } catch (error) {
      console.error("Error generating image:", error);
      res.status(500).json({ error: "Failed to generate image" });
    }
  });

  return httpServer;
}
