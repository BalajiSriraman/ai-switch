import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const _googleGeminiClient = (key: string) =>
  createGoogleGenerativeAI({
    apiKey: key,
  });
