import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
// import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY || "mock-key",
// });

// Initialize Gemini client
const genAI = process.env.GOOGLE_API_KEY
  ? new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
  : null;

// Generate image prompt from dreams text
// Generate image prompt from dreams text
async function generatePromptFromDreams(dreamsText: string, style: string = "corkboard"): Promise<{ prompt: string, provider: string }> {
  if (!genAI) {
    throw new Error("Google AI client is not initialized. Check your GOOGLE_API_KEY in .env file.");
  }

  try {
    console.log(`Using Gemini for prompt generation (Style: ${style})...`);
    
    const modelsToTry = [
      "gemini-2.0-flash",
      "gemini-2.0-flash-exp",
      "gemini-1.5-flash",
      "gemini-1.5-pro",
      "gemini-pro"
    ];
    
    let lastError = null;
    let text = null;
    let usedModel = "";

    let systemPrompt = "";

    // Style 2: Minimalist (Clean & Modern)
    if (style === "minimalist") {
      systemPrompt = `You are a Minimalist Design Consultant.
        THE GOAL: Create a prompt for a "Clean & Modern Vision Board".

        REQUIRED STYLE:
        - "High-key photography", "White wall background", "Soft studio lighting"
        - "Organized Grid Layout", "Clean lines", "Symmetry"
        - "Photos have thin black frames" (NOT polaroids)

        STRUCTURE THE PROMPT EXACTLY LIKE THIS:
        "A bright, high-key architectural photograph of a pristine white wall.
        Mounted on the wall is a perfectly organized grid of 6 high-quality printed photographs in thin, elegant black frames.
        The lighting is soft and diffuse (studio softbox), creating very subtle, clean shadows.
        The overall vibe is clarity, focus, and modern minimalism.

        The 6 Framed Photos show:
        1. [Photo 1: ... extraction from user dream]
        2. [Photo 2: ... ]
        3. [Photo 3: ... ]
        4. [Photo 4: ... ]
        5. [Photo 5: ... ]
        6. [Photo 6: ... ]

        Technical details: Shot on Phase One camera, 50mm lens, sharp focus, high resolution, bright and airy.
        IMPORTANT: NO TEXT, NO CAPTIONS, NO WORDS in the image."

        User Dreams: "${dreamsText}"
        Output ONLY the final prompt string. If the User Dreams are in Hebrew, the entire output prompt MUST be in Hebrew.`;

    // Style 3: Cinematic (Moody & Deep)

   } else if (style === "cinematic") {
      systemPrompt = `You are a Set Designer for a high-end drama series.
        THE GOAL: Create a prompt for a "Cinematic Vision Board" that is a PHYSICAL CORKBOARD hanging on a wall.

        CRITICAL ERROR TO AVOID: Do NOT place photos on a desk or table. They must be PINNED to a vertical board.

        REQUIRED STYLE:
        - "Surface: Textured brown corkboard", "Vertical", "Wall-mounted"
        - "Items: Printed photographs with white borders", "Pinned with silver push-pins"
        - "Lighting: Cinematic, dramatic, side-lighting casting shadows from the pins"
        - "Composition: Straight-on view (front-facing), filling the frame"

        STRUCTURE THE PROMPT EXACTLY LIKE THIS:
        "A cinematic, high-resolution shot of a dark-textured corkboard mounted vertically on a wall.
        Pinned firmly to the cork are 6-8 distinct printed photographs with white borders.
        The photos are arranged in an aesthetic, slightly overlapping layout, held in place by silver push-pins.
        
        Lighting: Dramatic, warm light cuts across the surface from the side, creating deep shadows behind the pins and the curled edges of the paper. The background is purely the cork texture.

        The Pinned Content:
        1. [Photo 1: A vivid shot of... extraction from user dream]
        2. [Photo 2: ... ]
        3. [Photo 3: ... ]
        4. [Photo 4: ... ]
        5. [Photo 5: ... ]
        6. [Photo 6: ... ]

        Technical details: Shot on 35mm film, 85mm lens, f/1.8, focus on the texture of the photos and cork, rich color grading.
        IMPORTANT: NO TEXT, NO CAPTIONS, NO WORDS in the image."

        User Dreams: "${dreamsText}"
        Output ONLY the final prompt string. If the User Dreams are in Hebrew, the entire output prompt MUST be in Hebrew.`;
    // Style 1: Corkboard (Classic & Organic) - Default
    } else {
      systemPrompt = `You are a Prop Master for a movie set. 
        THE GOAL: Create a prompt for a "Physical Vision Board" that is rich and full of life.
        
        CHANGE: The user wants MORE photos on the board. Instead of just 4, aim for **6 to 8 distinct photos**.

        FORBIDDEN WORDS: "Collage", "Cinematic", "Futuristic", "Abstract", "Digital", "Grid"

        REQUIRED STYLE:
        - "Analog photograph", "Textured cork bulletin board", "Pinned photographs", "Polaroid style"
        - "Casual arrangement" (photos should look natural, maybe slightly overlapping)

        STRUCTURE THE PROMPT EXACTLY LIKE THIS:
        "A raw, top-down analog photograph of a large, textured cork bulletin board.
        Pinned to the board is a collection of 6-8 separate, physical printed photographs (Polaroid style with white borders).
        The arrangement is natural and messy-chic; some photos slightly overlap.
        They look like real printed paper with paper grain, casting realistic soft shadows on the cork.

        The Pinned Photos capture these specific details:
        1. [Photo 1: A vivid, candid shot of... extraction from user dream]
        2. [Photo 2: A realistic photo of... extraction from user dream]
        3. [Photo 3: ... ]
        4. [Photo 4: ... ]
        5. [Photo 5: ... ]
        6. [Photo 6: ... ]
        (Add up to 8 if the user text has enough details. Make each photo distinct.)

        Technical details: Shot on Kodak Portra 400 film, 35mm lens, natural window light from the side, high texture, f/5.6 aperture.
        IMPORTANT: NO TEXT, NO CAPTIONS, NO WORDS in the image."

        User Dreams: "${dreamsText}"
        Output ONLY the final prompt string. If the User Dreams are in Hebrew, the entire output prompt MUST be in Hebrew.`;
    }

    for (const modelName of modelsToTry) {
      try {
        console.log(`Attempting model: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const result = await model.generateContent([systemPrompt]);
        const response = await result.response;
        text = response.text();
        
        if (text) {
          usedModel = modelName;
          break; 
        }
      } catch (e: any) {
        console.warn(`⚠️ ${modelName} failed: ${e.message}`);
        lastError = e;
      }
    }

    if (!text) {
        throw lastError || new Error("All Gemini models failed.");
    }

    return { prompt: text, provider: `Gemini (${usedModel})` };

  } catch (error: any) {
    console.error("❌ Gemini Generation Error:", error);
    throw new Error(`Gemini API Failed: ${error.message}`);
  }
}

// Generate image with Gemini (Imagen)
// Generate image with Gemini (Imagen)
async function generateImageWithGemini(prompt: string): Promise<string | null> {
  console.log("--------------------------------------------------");
  console.log("🎨 Starting Gemini Image Generation...");

  if (!genAI) {
    throw new Error("Google AI client is not initialized.");
  }

  try {
    // მომხმარებელს სურს საუკეთესო ხარისხი (Gemini 3.0), ამიტომ პირველ რიგში ამას ვცდილობთ
    const modelName = "gemini-3-pro-image-preview"; 
    console.log(`🚀 Sending request to ${modelName}...`);
    
    const model = genAI.getGenerativeModel({ model: modelName });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    console.log("✅ Gemini response received");

    // ვეძებთ სურათს პასუხში
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith("image/")) {
          console.log("✨ Gemini Image generated successfully!");
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    // თუ სურათი არ დაბრუნდა, ვცადოთ მეორე მოდელი (უფრო სწრაფი, მაგრამ ნაკლები ხარისხის)
    console.warn("⚠️ First model returned text. Trying fallback: gemini-2.5-flash-image...");
    const model2 = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" });
    const result2 = await model2.generateContent(prompt);
    const response2 = await result2.response;

    if (response2.candidates && response2.candidates[0].content.parts) {
        for (const part of response2.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.mimeType.startsWith("image/")) {
            console.log("✨ Gemini Image generated successfully (Fallback)!");
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
        }
    }

    console.warn("⚠️ No image data found. Response text:", response.text());
    throw new Error("Gemini returned text instead of an image. Please try again.");

  } catch (error: any) {
    console.error("❌ Gemini Image Gen Exception:", error.message);
    throw error; 
  }
}

// Generate image from prompt
async function generateImageFromPrompt(imagePrompt: string): Promise<{ imageUrl: string, provider: string }> {
  // Try Gemini (Imagen) first
  const geminiImage = await generateImageWithGemini(imagePrompt);
  if (geminiImage) {
    return { imageUrl: geminiImage, provider: "Gemini 3.0" };
  }

  console.error("❌ Gemini generation failed. No fallback allowed.");
  throw new Error("Failed to generate image with Gemini 3.0.");
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Generate prompt from dreams text
  app.post("/api/generatePrompt", async (req, res) => {
    try {
      const { dreamsText, style } = req.body; // ვიღებთ style პარამეტრს

      if (!dreamsText || dreamsText.trim().length < 10) {
        return res.status(400).json({
          error: "Please provide a longer description of your dreams",
        });
      }

      // გადავცემთ სტილს ფუნქციას (default: "corkboard")
      const result = await generatePromptFromDreams(dreamsText, style || "corkboard");
      res.json(result);
    } catch (error: any) {
      console.error("Error generating prompt:", error);
      const errorMessage = error?.message || "Unknown error";
      res.status(500).json({
        error: `Failed to generate prompt: ${errorMessage}`,
      });
    }
  });

  // Generate vision board image from prompt
// Generate vision board image from prompt
  app.post("/api/generateVisionBoard", async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!prompt || prompt.trim().length === 0) {
        return res.status(400).json({
          error: "Prompt is required",
        });
      }

      // ვიძახებთ პირდაპირ, helper ფუნქციის გარეშე, რომ ერორი არ დაიკარგოს
      const imageUrl = await generateImageWithGemini(prompt);
      
      res.json({ imageUrl, provider: "Gemini 3.0" });

    } catch (error: any) {
      console.error("Error generating vision board:", error);
      
      // ვაბრუნებთ ზუსტ შეცდომას კლიენტთან
      res.status(500).json({
        error: error.message || "Failed to generate vision board.",
        details: error.toString()
      });
    }
  });

  // Order digital board (39₪)
  app.post("/api/order-digital-board", async (req, res) => {
    try {
      const { fullName, email, phone, price, currency, imageUrl, aiPrompt, type } = req.body;

      if (!fullName || !email || !phone) {
        return res.status(400).json({
          error: "Please provide all required fields",
        });
      }

      const order = {
        id: `digital-${Date.now()}`,
        fullName,
        email,
        phone,
        price,
        currency,
        imageUrl,
        aiPrompt,
        type,
        createdAt: new Date().toISOString(),
        status: "pending_payment",
      };

      console.log("Digital order received:", order);

      res.json({
        success: true,
        orderId: order.id,
        downloadUrl: imageUrl || null,
      });
    } catch (error) {
      console.error("Error processing digital order:", error);
      res.status(500).json({
        error: "Failed to process order. Please try again.",
      });
    }
  });

  // Order print board (89₪ digital + print)
  app.post("/api/order-print-board", async (req, res) => {
    try {
      const {
        fullName,
        email,
        phone,
        address,
        city,
        notes,
        price,
        currency,
        imageUrl,
        aiPrompt,
        size,
        type,
      } = req.body;

      if (!fullName || !email || !phone || !address || !city) {
        return res.status(400).json({
          error: "Please provide all required fields",
        });
      }

      const order = {
        id: `print-${Date.now()}`,
        fullName,
        email,
        phone,
        address,
        city,
        notes,
        price,
        currency,
        imageUrl,
        aiPrompt,
        size,
        type,
        createdAt: new Date().toISOString(),
        status: "pending_payment",
      };

      console.log("Print order received:", order);

      res.json({
        success: true,
        orderId: order.id,
      });
    } catch (error) {
      console.error("Error processing print order:", error);
      res.status(500).json({
        error: "Failed to process order. Please try again.",
      });
    }
  });

  // Order print of existing board (59₪)
  app.post("/api/order-print-existing", async (req, res) => {
    try {
      const {
        fullName,
        email,
        phone,
        address,
        city,
        notes,
        price,
        currency,
        uploadedFileInfo,
        type,
      } = req.body;

      if (!fullName || !email || !phone || !address || !city) {
        return res.status(400).json({
          error: "Please provide all required fields",
        });
      }

      const order = {
        id: `existing-${Date.now()}`,
        fullName,
        email,
        phone,
        address,
        city,
        notes,
        price,
        currency,
        uploadedFileInfo,
        type,
        createdAt: new Date().toISOString(),
        status: "pending_payment",
      };

      console.log("Print existing order received:", order);

      res.json({
        success: true,
        orderId: order.id,
      });
    } catch (error) {
      console.error("Error processing existing print order:", error);
      res.status(500).json({
        error: "Failed to process order. Please try again.",
      });
    }
  });

  return httpServer;
}