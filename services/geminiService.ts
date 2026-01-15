
import { GoogleGenAI, Type } from "@google/genai";
import { VerificationResult } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const verifyLegalContent = async (
  fileData: string,
  mimeType: string,
  prompt: string
): Promise<VerificationResult> => {
  const ai = getAI();
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { data: fileData.split(',')[1], mimeType } },
        { text: `Analyze this legal document or media for authenticity. 
          Identify potential deepfake artifacts (if video/audio) or fraudulent alterations (if document).
          Check for:
          1. Inconsistent fonts/styles.
          2. Suspect signatures.
          3. Logical fallacies in legal phrasing.
          4. Metadata mismatches or compression artifacts.
          
          Respond ONLY in JSON format following the schema.` }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          isAuthentic: { type: Type.BOOLEAN },
          confidence: { type: Type.NUMBER },
          analysis: { type: Type.STRING },
          flags: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["isAuthentic", "confidence", "analysis", "flags"]
      }
    }
  });

  const response = await model;
  return JSON.parse(response.text || '{}');
};

export const getLegalAdvice = async (query: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `You are a highly experienced legal assistant. Provide a helpful, clear, but cautious overview for the following query: "${query}". 
    Important: Always include a disclaimer that you are an AI and this is not professional legal advice.`
  });
  return response.text || "I'm sorry, I couldn't process that legal query.";
};
