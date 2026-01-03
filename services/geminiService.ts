
import { GoogleGenAI } from "@google/genai";

// Use process.env.API_KEY directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBlogPost = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a professional casino agency blog post about "${topic}" in Korean. 
      The post should be engaging and high-end. 
      Format the response as JSON with "title", "excerpt", and "content" fields.`,
      config: {
        responseMimeType: "application/json"
      }
    });
    
    // Accessing .text property directly as per guidelines (not .text())
    if (response.text) {
      return JSON.parse(response.text.trim());
    }
    throw new Error("No response from AI");
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

export const optimizeSEO = async (content: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Extract the best SEO title and meta description for this content in Korean: "${content}". 
      Format as JSON with "seoTitle" and "seoDescription".`,
      config: {
        responseMimeType: "application/json"
      }
    });
    
    // Accessing .text property directly as per guidelines
    if (response.text) {
      return JSON.parse(response.text.trim());
    }
    return null;
  } catch (error) {
    console.error("SEO Optimization Error:", error);
    return null;
  }
};
