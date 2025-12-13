import type { Express } from "express";
import { createServer, type Server } from "http";
// import OpenAI from "openai";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY || "mock-key",
// });

// Initialize Gemini client lazily
let genAIInstance: any = null;

async function getGenAI() {
  if (!genAIInstance && process.env.GOOGLE_API_KEY) {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    genAIInstance = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  }
  return genAIInstance;
}

// Generate image prompt from dreams text
async function generatePromptFromDreams(dreamsText: string, style: string = "corkboard"): Promise<{ prompt: string, provider: string }> {
  const genAI = await getGenAI();
  if (!genAI) {
    throw new Error("Google AI client is not initialized. Check your GOOGLE_API_KEY in .env file.");
  }

  try {
    console.log(`Using Gemini for prompt generation (Style: ${style})...`);
    
    // Check if API key is present (do not log the actual key)
    if (!process.env.GOOGLE_API_KEY) {
      console.error("❌ GOOGLE_API_KEY is missing in environment variables!");
      throw new Error("Server configuration error: Missing API Key.");
    }

    const modelsToTry = [
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-1.5-pro"
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
  // Style 4: Scrapbook -> RENAMED: Vintage Journal (Antique & Tactile)
    // ეს სტილი ახლა არის ანტიკვარული დღიური: დაძველებული ქაღალდი, გამხმარი ყვავილები, ცვილის ბეჭდები.
    } else if (style === "scrapbook") {
      systemPrompt = `You are an antique archivist and historian.
        THE GOAL: Create a prompt for a "Vintage Journal Vision Board" that feels like an ancient, treasured artifact.

        REQUIRED STYLE:
        - "Surface: Open, aged leather-bound journal with textured, water-stained parchment paper"
        - "Items: Sepia-toned photographs held by old-fashioned photo corners (not tape)"
        - "Decor: Pressed dried flowers and leaves, wax seals, old ribbon, ink sketches (visuals only, no text)"
        - "Vibe: Historical, nostalgic, very tactile, museum quality"

        STRUCTURE THE PROMPT EXACTLY LIKE THIS:
        "A top-down photograph of an open antique leather journal resting on a wooden table.
        The pages are made of thick, textured, aged parchment paper with water stains and creased edges.
        Arranged delicately on the pages are 6-8 sepia-toned, faded photographs held in place by vintage photo corners.
        Surrounding the photos are pressed dried botanicals (ferns, flowers), melted wax seals, and faint ink sketches of maps or symbols relevant to the dreams.
        
        The Vintage Journal Content:
        1. [Photo 1: An old, sepia-toned photograph of... extraction from user dream]
        2. [Photo 2: ... ]
        3. [Photo 3: ... ]
        4. [Photo 4: ... ]
        5. [Photo 5: ... ]
        6. [Photo 6: ... ]

        Technical details: Natural light, macro details showing the texture of old paper, dry brittle leaves, and cracked wax. Warm, muted color palette.
        IMPORTANT: NO TEXT, NO CAPTIONS, NO WORDS in the image."

        User Dreams: "${dreamsText}"
        Output ONLY the final prompt string. If the User Dreams are in Hebrew, the entire output prompt MUST be in Hebrew.`;

    // Style 5: Neon -> RENAMED: Industrial Neon Art (Physical & Gritty)
    // ეს სტილი ახლა არის ფიზიკური ნეონის მილები ბეტონის კედელზე. უფრო რეალური და უხეში.
    } else if (style === "neon") {
      systemPrompt = `You are an Expedition Planner and Adventure Photographer.
        THE GOAL: Create a prompt for a "Travel Map Vision Board" where goals are plotted on a map.

        REQUIRED STYLE:
        - "Surface: A large, detailed vintage world map spread flat on a wooden table"
        - "Items: Printed photographs pinned to specific locations on the map with brass push-pins"
        - "Decor: Red string connecting the photos (like a journey path), a vintage compass, travel tickets"
        - "Vibe: Adventure, exploration, global planning, discovery"

        STRUCTURE THE PROMPT EXACTLY LIKE THIS:
        "A high-resolution, top-down photograph of a large vintage world map spread out on a rustic wooden surface.
        Pinned firmly to the map are 6-8 distinct printed photographs, marking different destinations and goals.
        Some photos are connected by a thin red string, suggesting a planned journey or connection between dreams.
        Scattered casually around the map are travel artifacts: a brass compass, a passport, and maybe a camera lens.
        The lighting is warm and golden, highlighting the texture of the map paper and the glossy photos.

        The Map Content:
        1. [Photo 1: A photo of... extraction from user dream]
        2. [Photo 2: ... ]
        3. [Photo 3: ... ]
        4. [Photo 4: ... ]
        5. [Photo 5: ... ]
        6. [Photo 6: ... ]

        Technical details: Shot on 35mm film, sharp focus on the photos and map details, rich colors, adventurous aesthetic.
        IMPORTANT: NO TEXT, NO CAPTIONS, NO WORDS in the image."

        User Dreams: "${dreamsText}"
        Output ONLY the final prompt string. If the User Dreams are in Hebrew, the entire output prompt MUST be in Hebrew.`;

    // Style 6: Watercolor (Soft & Dreamy) -> RENAMED: Artistic Watercolor Grid (Dreamy but Structured)
    } else if (style === "watercolor") {
  systemPrompt = `You are a Watercolor Illustrator for a high-end lifestyle magazine.
        THE GOAL: Create a prompt for a "Watercolor Vision Board" that is artistic but clearly structured as a collection of goals.

        REQUIRED STYLE:
        - "Medium: High-quality watercolor illustrations on white textured paper"
        - "Layout: A loose but organized grid of distinct painted vignettes (not one big mess)"
        - "Vibe: Dreamy, optimistic, bright, and clear"
        - "Details: Each goal is a separate little painting, maybe with a faint pencil border"

        STRUCTURE THE PROMPT EXACTLY LIKE THIS:
        "A top-down view of a beautiful sheet of cold-press watercolor paper featuring a collection of 8-10 distinct watercolor illustrations.
        The illustrations are arranged in a loose, artistic grid, acting as a vision board of dreams.
        Each illustration is clear and colorful, depicting a specific goal with soft edges and paint bleeds, but distinct enough to be recognized.
        There is white space between the illustrations to keep the composition clean and airy.
        The colors are vibrant and fresh (pastels mixed with bright accents).

        The Watercolor Vignettes:
        1. [Illustration 1: A beautiful watercolor painting of... extraction from user dream]
        2. [Illustration 2: A clear, artistic depiction of... ]
        3. [Illustration 3: ... ]
        4. [Illustration 4: ... ]
        5. [Illustration 5: ... ]
        6. [Illustration 6: ... ]
        7. [Illustration 7: ... ]
        8. [Illustration 8: ... ]

        Technical details: Watercolor on paper, natural lighting, sharp focus on the paper texture, vibrant pigments, artistic but legible.
        IMPORTANT: NO TEXT, NO CAPTIONS, NO WORDS in the image."

        User Dreams: "${dreamsText}"
        Output ONLY the final prompt string. If the User Dreams are in Hebrew, the entire output prompt MUST be in Hebrew.`;
    // Style 7: Retro (Vintage & Nostalgic)
   } else if (style === "retro") {
  systemPrompt = `You are a Graphic Designer specializing in 1980s VHS and analog TV aesthetics.
        THE GOAL: Create a prompt for an "Analog Glitch Vision Board" with a nostalgic, low-fidelity feel.

        REQUIRED STYLE:
        - "Aesthetic: Late 80s/Early 90s, analog TV screen on a dark night"
        - "Elements: 6-8 still frames (images) displayed with screen lines and VHS tape artifacts"
        - "Texture: Color bleed, CRT screen glow, horizontal scan lines (visual only)"

        STRUCTURE THE PROMPT EXACTLY LIKE THIS:
        "A grainy, low-fidelity photograph of a deep-black CRT TV screen glowing in a dark room.
        The screen displays 6-8 separate, slightly distorted images, each appearing like a still frame from an old VHS tape.
        The images are separated by thick, glowing horizontal scan lines, color bleed, and faint analog static artifacts.
        The dominant colors are warm reds, oranges, and deep blues (80s vibe).

        The Retro Screen Frames:
        1. [Element 1: A low-resolution, grainy image of... extraction from user dream]
        2. [Element 2: A distorted frame with VHS tracking lines... ]
        3. [Element 3: ... ]
        4. [Element 4: ... ]
        5. [Element 5: ... ]
        6. [Element 6: ... ]

        Technical details: CRT screen rendering, 80s low-fi aesthetic, VHS tape quality, analog artifacts, warm color palette.
        IMPORTANT: NO TEXT, NO CAPTIONS, NO WORDS in the image."

        User Dreams: "${dreamsText}"
        Output ONLY the final prompt string. If the User Dreams are in Hebrew, the entire output prompt MUST be in Hebrew.`;

    // Style 8: Futuristic (Sci-Fi & High Tech)
   } else if (style === "futuristic") {
  systemPrompt = `You are a User Interface (UI) Designer for a high-concept, near-future operating system.
        THE GOAL: Create a prompt for a "Data Stream Vision Board" that is minimalist, sleek, and high-tech.

        REQUIRED STYLE:
        - "Aesthetic: Translucent glass panel interface floating in space"
        - "Elements: 6-8 data blocks (images) embedded in a clean, high-contrast UI"
        - "Colors: White, black, and electric blue/cyan accents"

        STRUCTURE THE PROMPT EXACTLY LIKE THIS:
        "A highly detailed 3D render of a futuristic, minimalist translucent glass interface panel.
        The panel is floating against a dark, featureless background and displays a clean array of 6-8 high-contrast data windows.
        Each window contains a photorealistic image representing a dream/goal, framed by sleek digital lines and illuminated with a cool, electric blue/cyan glow.
        The overall look is precise, data-driven, and hyper-modern.

        The Holographic Elements:
        1. [Element 1: A high-contrast digital display of... extraction from user dream]
        2. [Element 2: A clear, sharp photo embedded in a translucent panel... ]
        3. [Element 3: ... ]
        4. [Element 4: ... ]
        5. [Element 5: ... ]
        6. [Element 6: ... ]

        Technical details: Octane render, photorealistic, high contrast, sci-fi UI design, extreme sharp focus, electric blue and white palette.
        IMPORTANT: NO TEXT, NO CAPTIONS, NO WORDS in the image."

        User Dreams: "${dreamsText}"
        Output ONLY the final prompt string. If the User Dreams are in Hebrew, the entire output prompt MUST be in Hebrew.`;

    // Style 9: Collage (Mixed Media & Fun) -> RENAMED: Wanderlust Travel Grid (Adventure & Maps)
   } else if (style === "collage") {
  systemPrompt = `You are a Travel Photographer and Scrapbook Artist.
        THE GOAL: Create a prompt for a "Wanderlust Travel Collage Vision Board" that looks like a dense, inspiring moodboard.

        REQUIRED STYLE:
        - "Aesthetic: Travel blog moodboard, dense collage, adventure vibes"
        - "Layout: Masonry grid or dense overlapping collage of many images"
        - "Elements: Travel photos, maps, passport stamps, compass, textures"
        - "Decor: White hand-drawn doodles (arrows, hearts) over some photos"

        STRUCTURE THE PROMPT EXACTLY LIKE THIS:
        "A rich, high-resolution travel moodboard collage featuring a dense arrangement of 10-12 inspiring images.
        The composition is a mix of breathtaking landscape photos, travel lifestyle shots (e.g., view from a plane window, holding a camera), and travel artifacts like vintage maps, passports, and a compass.
        The images overlap slightly, creating a cohesive tapestry of adventure.
        Overlaid on top of the collage are subtle white hand-drawn doodles (like a heart outline or an arrow) adding a personal touch.
        The color palette is vibrant and earthy (blues of the ocean, greens of nature, browns of maps).
        Ensure ALL distinct items from the user's request are included in the collage.

        The Travel Collage Elements:
        1. [Photo 1: A stunning landscape shot of... extraction from user dream]
        2. [Photo 2: A lifestyle travel shot... ]
        3. [Photo 3: A close-up of a map or passport... ]
        4. [Photo 4: ... ]
        5. [Photo 5: ... ]
        6. [Photo 6: ... ]
        7. [Photo 7: ... ]
        8. [Photo 8: ... ]
        9. [Photo 9: ... ]
        10. [Photo 10: ... ]
        (Add up to 12 if needed to cover all user dreams.)

        Technical details: High-quality moodboard, photorealistic collage, vibrant colors, sharp details, travel aesthetic, 8k resolution.
        IMPORTANT: NO TEXT, NO CAPTIONS, NO WORDS in the image."

        User Dreams: "${dreamsText}"
        Output ONLY the final prompt string. If the User Dreams are in Hebrew, the entire output prompt MUST be in Hebrew.`;

    // Style 10: Polaroid (Instant & Candid)
   } else if (style === "polaroid") {
  systemPrompt = `You are a Documentary Photographer compiling personal memories on a wooden surface.
        THE GOAL: Create a prompt for a "Scattered Instant Film Vision Board" that is intimate and personal.

        REQUIRED STYLE:
        - "Elements: 6-8 square format, slightly expired instant film photos (Fujifilm Instax style)"
        - "Surface: Rustic wooden desktop (matte finish)"
        - "Composition: Photos casually scattered and slightly fanned out, with a coffee mug and pen nearby"

        STRUCTURE THE PROMPT EXACTLY LIKE THIS:
        "A top-down, intimate photograph of a collection of 6-8 square-format instant film photos (Instax/Polaroid style) scattered casually on a dark, rustic wooden desktop.
        The photos have a slight color shift and low contrast, typical of instant film.
        They are slightly fanned out and overlapping.
        In the frame, a partially visible ceramic coffee mug and a fountain pen rest near the photos, suggesting an in-progress planning session.
        Natural light fills the scene from a window, casting soft, visible shadows.

        The Polaroid Photos:
        1. [Photo 1: A candid, slightly underexposed instant shot of... extraction from user dream]
        2. [Photo 2: A square photo with a warm color tone... ]
        3. [Photo 3: ... ]
        4. [Photo 4: ... ]
        5. [Photo 5: ... ]
        6. [Photo 6: ... ]

        Technical details: Instant film aesthetic, shallow depth of field (focus on photos), warm natural light, high texture, personal and authentic.
        IMPORTANT: NO TEXT, NO CAPTIONS, NO WORDS in the image."

        User Dreams: "${dreamsText}"
        Output ONLY the final prompt string. If the User Dreams are in Hebrew, the entire output prompt MUST be in Hebrew.`;

    // Style 11: Magazine (Editorial & Chic)
 } else if (style === "magazine") {
  systemPrompt = `You are a Contemporary Art Director for a Black & White Photo Magazine.
        THE GOAL: Create a prompt for a "Monochromatic Editorial Vision Board" that is stark and high-impact.

        REQUIRED STYLE:
        - "Aesthetic: Black and white editorial photography, high contrast"
        - "Layout: Clean, graphic layout on a stark white background"
        - "Vibe: Luxury, graphic, bold, minimalist editorial"

        STRUCTURE THE PROMPT EXACTLY LIKE THIS:
        "A high-contrast black and white photograph of an editorial-style vision board.
        The board features 6-8 stunning, high-quality monochromatic photographs arranged in a clean, graphic layout on a stark white surface.
        The images are bold and high-contrast, emphasizing form and shadow (Ansel Adams style).
        The overall aesthetic is sophisticated, luxury magazine editorial, focusing entirely on visual impact and contrast.

        The Editorial Photos:
        1. [Photo 1: A striking, high-contrast black and white editorial shot of... extraction from user dream]
        2. [Photo 2: A photo focused entirely on a geometric shape and shadow... ]
        3. [Photo 3: ... ]
        4. [Photo 4: ... ]
        5. [Photo 5: ... ]
        6. [Photo 6: ... ]

        Technical details: Black and white photography, high contrast, large format, clean graphic design, 50mm lens, sharp focus.
        IMPORTANT: NO TEXT, NO CAPTIONS, NO WORDS in the image."

        User Dreams: "${dreamsText}"
        Output ONLY the final prompt string. If the User Dreams are in Hebrew, the entire output prompt MUST be in Hebrew.`;
    // Style 12: Abstract (Shapes & Colors) -> RENAMED: Connected Constellation (Network & Cyberpunk)
} else if (style === "abstract") {
  systemPrompt = `You are a Digital Artist specializing in futuristic network visualizations.
        THE GOAL: Create a prompt for a "Connected Constellation Vision Board" that looks like a glowing neural network of dreams.

        REQUIRED STYLE:
        - "Aesthetic: Cyberpunk, Neural Network, Glowing Connections"
        - "Layout: One central hub image connected to surrounding nodes"
        - "Elements: Floating screens/nodes connected by glowing neon lines (purple, pink, cyan)"
        - "Background: Deep void with energy flows and nebula-like colors"

        STRUCTURE THE PROMPT EXACTLY LIKE THIS:
        "A futuristic digital artwork depicting a glowing network of vision nodes floating in a deep, mystical void.
        In the center is a large, prominent rectangular frame displaying a core dream image.
        Radiating outwards from this center are glowing neon lines (in cyan, magenta, and purple) connecting to 6-8 smaller surrounding frames.
        Each frame contains a distinct, high-quality image representing a specific goal.
        The entire structure looks like a constellation of dreams or a high-tech neural map.
        The background is dark and atmospheric, with soft energy waves and floating particles.

        The Network Nodes:
        1. [Central Node: A powerful image of... extraction from user dream]
        2. [Peripheral Node 1: A photo of... ]
        3. [Peripheral Node 2: ... ]
        4. [Peripheral Node 3: ... ]
        5. [Peripheral Node 4: ... ]
        6. [Peripheral Node 5: ... ]

        Technical details: Digital art, Unreal Engine 5 style, 8k resolution, volumetric lighting, neon glow effects, bloom, futuristic and magical.
        IMPORTANT: NO TEXT, NO CAPTIONS, NO WORDS in the image."

        User Dreams: "${dreamsText}"
        Output ONLY the final prompt string. If the User Dreams are in Hebrew, the entire output prompt MUST be in Hebrew.`;
    // Style 1: Corkboard (Classic & Organic) - Default
    } else {
      systemPrompt = `You are a Prop Master for a movie set. 
        THE GOAL: Create a prompt for a "Physical Vision Board" that is rich and full of life.
        
        CHANGE: The user wants MORE photos on the board. Aim for **10 to 12 distinct photos** to cover ALL user requests.

        FORBIDDEN WORDS: "Collage", "Cinematic", "Futuristic", "Abstract", "Digital", "Grid"

        REQUIRED STYLE:
        - "Analog photograph", "Textured cork bulletin board", "Pinned photographs", "Polaroid style"
        - "Casual arrangement" (photos should look natural, maybe slightly overlapping)
        - "Dense layout" (use the space efficiently to fit everything)

        STRUCTURE THE PROMPT EXACTLY LIKE THIS:
        "A raw, top-down analog photograph of a very large, textured cork bulletin board.
        Pinned to the board is a dense collection of 10-12 separate, physical printed photographs (Polaroid style with white borders).
        The arrangement is natural and messy-chic; photos overlap slightly to fit them all.
        They look like real printed paper with paper grain, casting realistic soft shadows on the cork.
        The photos are large enough to clearly see the details in each one.

        The Pinned Photos capture these specific details (ensure ALL user items are included):
        1. [Photo 1: A vivid, candid shot of... extraction from user dream]
        2. [Photo 2: A realistic photo of... extraction from user dream]
        3. [Photo 3: ... ]
        4. [Photo 4: ... ]
        5. [Photo 5: ... ]
        6. [Photo 6: ... ]
        7. [Photo 7: ... ]
        8. [Photo 8: ... ]
        9. [Photo 9: ... ]
        10. [Photo 10: ... ]
        (Add up to 12 if the user text has enough details. Make each photo distinct and clear.)

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
async function generateImageWithGemini(prompt: string): Promise<string | null> {
  console.log("--------------------------------------------------");
  console.log("🎨 Starting Gemini Image Generation...");

  const genAI = await getGenAI();
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

export function registerRoutes(
  httpServer: Server,
  app: Express
): Server {
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