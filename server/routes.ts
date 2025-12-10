import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "mock-key",
});

// Generate image prompt from dreams text
async function generatePromptFromDreams(dreamsText: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    // Mock mode
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `A cinematic, luxurious vision board featuring: ${dreamsText}. The image shows a perfect life with golden hour lighting, nature elements, abundance, and freedom. Rich colors, inspiring composition, high-resolution details. Everything the person dreams of visualized in one beautiful, aspirational scene.`;
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You receive a user's written dreams, goals, and desired future life.
Your job is to convert this into ONE long, detailed, clear image-generation prompt in English.
The prompt should describe a cinematic, high-resolution vision board,
including relevant scenes, symbols, environments, moods, colors, and composition
that visually represent the user's dreams and goals.
Do NOT talk about 'the user' or 'this text'. Just directly describe the image.
Make it inspiring, luxurious, and achievable-feeling.`,
      },
      {
        role: "user",
        content: dreamsText,
      },
    ],
    temperature: 0.7,
  });

  const prompt = response.choices[0]?.message?.content;
  if (!prompt) {
    throw new Error("Failed to generate prompt");
  }
  return prompt;
}

// Generate image from prompt
async function generateImageFromPrompt(imagePrompt: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    // Mock mode - return a random unsplash-like URL
    await new Promise(resolve => setTimeout(resolve, 2000));
    const mockImages = [
      "https://images.unsplash.com/photo-1515042061828-f1b34edcf9f3?w=1024&h=1024&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1024&h=1024&fit=crop",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1024&h=1024&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe3e?w=1024&h=1024&fit=crop",
    ];
    return mockImages[Math.floor(Math.random() * mockImages.length)];
  }

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: imagePrompt,
    n: 1,
    size: "1024x1024",
    quality: "hd",
    style: "natural",
  });

  const imageUrl = response.data?.[0]?.url;
  if (!imageUrl) {
    throw new Error("No image URL returned from OpenAI");
  }
  return imageUrl;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Generate prompt from dreams text
  app.post("/api/generatePrompt", async (req, res) => {
    try {
      const { dreamsText } = req.body;

      if (!dreamsText || dreamsText.trim().length < 10) {
        return res.status(400).json({
          error: "Please provide a longer description of your dreams",
        });
      }

      const prompt = await generatePromptFromDreams(dreamsText);
      res.json({ prompt });
    } catch (error) {
      console.error("Error generating prompt:", error);
      res.status(500).json({
        error: "Failed to generate prompt. Please try again.",
      });
    }
  });

  // Generate vision board image from prompt
  app.post("/api/generateVisionBoard", async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!prompt || prompt.trim().length === 0) {
        return res.status(400).json({
          error: "Prompt is required",
        });
      }

      const imageUrl = await generateImageFromPrompt(prompt);
      res.json({ imageUrl });
    } catch (error) {
      console.error("Error generating vision board:", error);
      res.status(500).json({
        error: "Failed to generate vision board. Please try again.",
      });
    }
  });

  return httpServer;
}
