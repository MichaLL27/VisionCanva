import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "mock-key",
});

// Helper function to generate image prompt from user input
async function generateImagePrompt(
  focusAreas: string[],
  visionText: string,
  style: string
): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    // Mock mode
    await new Promise(resolve => setTimeout(resolve, 500));
    return `A cinematic, high-resolution vision board image in ${style} style. Focusing on ${focusAreas.join(", ")}. Visualizing: ${visionText}. The image features soft lighting, golden hour colors, and a luxurious atmosphere with nature elements, freedom, and abundance.`;
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are an expert vision board curator. Convert the user's life goals and dream description into a highly detailed, cinematic image prompt for DALL-E 3.

Your output must be:
- A SINGLE, coherent paragraph in English
- Optimized for high-quality, inspiring vision board generation
- Rich with visual details: lighting, composition, mood, environments, textures
- Cinematic and luxurious feeling
- Include colors that evoke the user's vision
- Do NOT include conversational text, only the image prompt.`
      },
      {
        role: "user",
        content: `Focus Areas: ${focusAreas.join(", ")}
Vision Description: ${visionText}
Visual Style: ${style}`
      }
    ],
    temperature: 0.7,
  });

  const prompt = response.choices[0]?.message?.content;
  if (!prompt) {
    throw new Error("Failed to generate image prompt");
  }
  return prompt;
}

// Helper function to generate vision summary in Hebrew
async function generateVisionSummary(visionText: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    // Mock mode
    await new Promise(resolve => setTimeout(resolve, 300));
    return "חזון שלך: חיים מלאי חופש, בריאות וסמוך על עצמך. קשרים משמעותיים, עבודה יצירתית, וטבע.";
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a skilled Hebrew writer. Summarize the user's vision description in a short, poetic Hebrew phrase (1-2 sentences max). Make it inspiring and personal.`
      },
      {
        role: "user",
        content: visionText
      }
    ],
    temperature: 0.7,
  });

  const summary = response.choices[0]?.message?.content;
  if (!summary) {
    throw new Error("Failed to generate vision summary");
  }
  return summary;
}

// Helper function to generate image from prompt
async function generateImageFromPrompt(imagePrompt: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    // Mock mode - return a random vision board image
    await new Promise(resolve => setTimeout(resolve, 2000));
    const mockImages = [
      "https://images.unsplash.com/photo-1515042661829-033e6461f71c?w=1024&h=1024&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1024&h=1024&fit=crop",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1024&h=1024&fit=crop",
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
  // Generate complete vision board in one call
  app.post("/api/generateVisionBoard", async (req, res) => {
    try {
      const { focusAreas, visionText, style } = req.body;

      // Validation
      if (!visionText || visionText.trim().length < 10) {
        return res.status(400).json({ 
          error: "נא להזין תיאור ברור יותר של החזון שלך" 
        });
      }

      if (!Array.isArray(focusAreas) || focusAreas.length === 0) {
        return res.status(400).json({ 
          error: "בחרו לפחות תחום אחד" 
        });
      }

      // Sanitize input
      const cleanVisionText = visionText.trim().replace(/\s+/g, " ");

      // Step 1: Generate image prompt
      const imagePrompt = await generateImagePrompt(
        focusAreas,
        cleanVisionText,
        style || "modern"
      );

      // Step 2: Generate vision summary in Hebrew
      const visionSummary = await generateVisionSummary(cleanVisionText);

      // Step 3: Generate image from prompt
      const imageUrl = await generateImageFromPrompt(imagePrompt);

      res.json({
        imageUrl,
        visionSummaryHebrew: visionSummary,
      });
    } catch (error) {
      console.error("Error generating vision board:", error);
      res.status(500).json({ 
        error: "משהו השתבש בעת יצירת לוח החזון. אנא נסו שוב." 
      });
    }
  });

  return httpServer;
}
