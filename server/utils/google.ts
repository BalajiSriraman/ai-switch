import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const _googleGeminiClient = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export type GoogleStudioModels = Parameters<typeof _googleGeminiClient>[0];
