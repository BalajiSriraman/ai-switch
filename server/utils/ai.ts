import { LanguageModelV1 } from "ai";

export type ModelClientWithoutEnv = (
  key: string
) => (model: string) => LanguageModelV1;
