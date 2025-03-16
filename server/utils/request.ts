import { H3Event } from "h3";
import { bodyParams, BodyParams } from "../models/request";
import { generateObject, LanguageModelV1 } from "ai";
import { generateText } from "ai";
import { magicJsonParser } from ".";
import jsonSchemaToZod from "json-schema-to-zod";
import { ModelClientWithoutEnv } from "./ai";

export const bodyValidator = async (event: H3Event) => {
  const body = await readBody(event);
  const parsedBody = magicJsonParser(body);
  return bodyParams.safeParse(parsedBody);
};

export const getRuntimeKeys = (keys: string) => {
  const runtimeKeys = keys
    .replace(/[\[\]"]/g, "") // Remove brackets and quotes
    .split(","); // Split by comma

  return {
    length: runtimeKeys.length,
    keys: runtimeKeys,
  };
};

export const switcher = async (
  body: BodyParams,
  options: { _model: LanguageModelV1 }
) => {
  const { prompt, responseSchema, retry } = body;

  if (responseSchema.type === "object") {
    const { schema } = responseSchema;

    const zodSchema = eval(jsonSchemaToZod(schema));

    const { object } = await generateObject({
      model: options._model,
      schema: zodSchema,
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

/**
 * Attempts to execute the switcher function with multiple API keys.
 * @param validatedData - The validated body data.
 * @param apiKeys - An array of API keys.
 * @returns The response from the switcher call.
 * @throws If all attempts fail.
 */
export const trySwitcherWithKeys = async (
  _modelClient: ModelClientWithoutEnv,
  validatedData: BodyParams,
  apiKeys: string[]
) => {
  let lastError: unknown;

  for (const [index, key] of apiKeys.entries()) {
    try {
      console.log("key", key);
      const modelClient = _modelClient(key)(validatedData.model);
      const response = await switcher(validatedData, {
        _model: modelClient,
      });
      return response;
    } catch (error) {
      console.error(`Failed with API key #${index + 1}`, error);
      lastError = error;
    }
  }
  console.error("All API keys failed.");
  throw createError({
    statusCode: 500,
    statusMessage: "All API keys failed",
    cause: lastError,
  });
};
