import { H3Event } from "h3";
import { QueryParams, queryParams } from "../models/request";
import { generateObject, LanguageModelV1 } from "ai";
import { generateText } from "ai";
import { ZodType, ZodTypeDef } from "zod";
import { ModelClients, ModelProviders } from "./ai";
export const queryValidator = (event: H3Event) =>
  getValidatedQuery(event, queryParams.safeParse);

/**
 * @description A function that takes a query and options and returns a response
 */
export const switcher = async (
  query: QueryParams,
  options: { _model: LanguageModelV1 }
) => {
  const { prompt, responseSchema, retry } = query;

  if (responseSchema.type === "object") {
    const { schema } = responseSchema;

    const { object } = await generateObject({
      model: options._model,
      schema: schema,
      prompt: prompt,
      retry: retry,
      maxRetries: retry,
    });

    return object;
  }

  if (responseSchema.type === "text") {
    const { text } = await generateText({
      model: options._model,
      prompt: prompt,
      maxRetries: retry,
    });

    return text;
  }
};
