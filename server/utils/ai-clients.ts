import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createFireworks } from "@ai-sdk/fireworks";
import { createGroq } from "@ai-sdk/groq";
import { createPerplexity } from "@ai-sdk/perplexity";
import { createDeepSeek } from "@ai-sdk/deepseek";
export const _googleGeminiClient = (key: string) =>
  createGoogleGenerativeAI({
    apiKey: key,
  });

export const _perplexityClient = (key: string) =>
  createPerplexity({
    apiKey: key,
  });

export const _openaiClient = (key: string) =>
  createOpenAI({
    apiKey: key,
    compatibility: "strict",
  });

export const _groqClient = (key: string) =>
  createGroq({
    apiKey: key,
  });

export const _fireworksClient = (key: string) =>
  createFireworks({
    apiKey: key,
  });

export const _anthropicClient = (key: string) =>
  createAnthropic({
    apiKey: key,
  });

export const _deepseekClient = (key: string) =>
  createDeepSeek({
    apiKey: key,
  });
