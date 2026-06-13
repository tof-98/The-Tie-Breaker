import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route - Server side call to Gemini, keeping API key secure from customer-facing bundle
  app.post("/api/analyze", async (req, res) => {
    try {
      const { title, description, options = [] } = req.body;

      if (!title) {
        return res.status(400).json({ error: "Decision title is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.status(401).json({
          error: "Gemini API key is not configured. Clean, real integrations require setup. Please configure GEMINI_API_KEY in the Settings > Secrets panel of your AI Studio UI.",
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Prompt optimized for Decision Intelligence
      const prompt = `
Generate a deep, professional, and definitive decision analysis.
Dilemma Title: "${title}"
Context / Dilemma Details: "${description || 'No additional details provided'}"
User-provided Options: ${options.length > 0 ? JSON.stringify(options) : "None (detect or propose suitable contrasting actions, e.g. Do X vs Do Not Do X)"}

Perform a thorough analysis consisting of:
1. Pros and Cons: Formulate rigorous advantages and disadvantages, assigning a weight of importance (1 to 5) and a descriptive category. Provide a summary of the pro/con balance.
2. Comparative Analysis: Evaluate options against relevant, high-quality decision criteria (e.g. cost, peace of mind, effort, time). Rate each option from 1 to 5 for each criterion, and explain the score with contextual notes. Deduce the winning option and include reasoning. If the user provided no options, create logical binary or multi-way options (e.g., pursue vs. defer/avoid) and compare them.
3. SWOT Analysis: Detail the Strengths (internal advantages), Weaknesses (internal risks/limitations), Opportunities (external positive factors/upsides), and Threats (external hurdles/risks) of the situation/options. Write a SWOT summary.
4. Definitive Verdict (The Tie Breaker): Resolve the dilemma by analyzing difficult trade-offs and delivering a clear, singular, final guidance with concrete next steps.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              prosCons: {
                type: Type.OBJECT,
                properties: {
                  pros: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        text: { type: Type.STRING },
                        weight: { type: Type.INTEGER },
                        category: { type: Type.STRING },
                      },
                      required: ["text", "weight", "category"],
                    },
                  },
                  cons: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        text: { type: Type.STRING },
                        weight: { type: Type.INTEGER },
                        category: { type: Type.STRING },
                      },
                      required: ["text", "weight", "category"],
                    },
                  },
                  summary: { type: Type.STRING },
                },
                required: ["pros", "cons", "summary"],
              },
              comparisonTable: {
                type: Type.OBJECT,
                properties: {
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  rows: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        criteria: { type: Type.STRING },
                        scores: {
                          type: Type.ARRAY,
                          items: {
                            type: Type.OBJECT,
                            properties: {
                              optionName: { type: Type.STRING },
                              rating: { type: Type.INTEGER },
                              notes: { type: Type.STRING },
                            },
                            required: ["optionName", "rating", "notes"],
                          },
                        },
                      },
                      required: ["criteria", "scores"],
                    },
                  },
                  winner: { type: Type.STRING },
                  reasoning: { type: Type.STRING },
                },
                required: ["options", "rows", "winner", "reasoning"],
              },
              swot: {
                type: Type.OBJECT,
                properties: {
                  strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                  weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                  opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
                  threats: { type: Type.ARRAY, items: { type: Type.STRING } },
                  summary: { type: Type.STRING },
                },
                required: ["strengths", "weaknesses", "opportunities", "threats", "summary"],
              },
              verdict: { type: Type.STRING },
            },
            required: ["options", "prosCons", "comparisonTable", "swot", "verdict"],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response received from GenAI model.");
      }

      const data = JSON.parse(responseText.trim());
      res.json(data);
    } catch (error: any) {
      console.error("Analysis Error:", error);
      res.status(500).json({ error: error?.message || "Internal Server Error analyzing decision." });
    }
  });

  // Serve Vite in development, static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`The Tie Breaker server is running on http://localhost:${PORT}`);
  });
}

startServer();
