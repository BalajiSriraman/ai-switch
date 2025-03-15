import { _googleGeminiClient } from "./google";
import { _openAiClient } from "./openai";

export const modelClients = {
  google: _googleGeminiClient,
  openai: _openAiClient,
};

export type ModelClients = typeof modelClients;
export type ModelProviders = keyof ModelClients;
