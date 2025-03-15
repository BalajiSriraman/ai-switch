import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const _openAiClient = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});
