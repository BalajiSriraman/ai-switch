import { H3Event } from "h3";
import { bodyParams, BodyParams } from "../models/request";
import { generateObject, LanguageModelV1 } from "ai";
import { generateText } from "ai";
import { magicJsonParser } from ".";

export const bodyValidator = async (event: H3Event) => {
  const body = await readBody(event);
  const parsedBody = magicJsonParser(body);
  console.log(parsedBody);
  return bodyParams.safeParse(parsedBody);
};

/**
 * @description A function that takes a query and options and returns a response
 */
export const switcher = async (
  body: BodyParams,
  options: { _model: LanguageModelV1 }
) => {
  const { prompt, responseSchema, retry } = body;

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
