
import { GoogleGenAI } from "@google/genai";

export async function generateProductPhilosophy(name: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Write a short, profound, and minimalist product description for a high-end conceptual piece named "${name}". 
  The tone should be stoic, intellectual, and focused on the "raw stage of creation". 
  Use maximum 3 sentences. Avoid marketing fluff like "best" or "unique". 
  Focus on the relationship between form and substance.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    return response.text || "A reduction to the essential state of being.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The raw stage of creation before refinement takes hold.";
  }
}
