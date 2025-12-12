import "dotenv/config";

async function listModels() {
  const key = process.env.GOOGLE_API_KEY;
  if (!key) {
    console.error("❌ GOOGLE_API_KEY is missing");
    return;
  }

  console.log(`🔑 Checking models for API Key: ...${key.slice(-4)}`);
  console.log("📡 Fetching available models list from Google API...");

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await response.json();

    if (data.error) {
      console.error("\n❌ API Error:", data.error.message);
      console.log("\n💡 SOLUTION: This usually means the 'Generative Language API' is not enabled.");
      console.log("   Go here and enable it: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com");
    } else if (data.models) {
      console.log("\n✅ Available Models for this Key:");
      data.models.forEach((m: any) => {
        if (m.name.includes("gemini")) {
          console.log(`   - ${m.name.replace("models/", "")}`);
        }
      });
    } else {
      console.log("\n⚠️ No models found. This is unexpected.");
      console.log("Full response:", data);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

listModels();
