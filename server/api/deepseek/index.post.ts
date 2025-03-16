import { _deepseekClient } from "~/server/utils/ai-clients";
import { getRuntimeKeys, trySwitcherWithKeys } from "~/server/utils/request";

export default defineEventHandler(async (event) => {
  const validatedBody = await bodyValidator(event);

  if (!validatedBody.success) {
    console.error({
      error: validatedBody.error,
      file: "deepseek/index.post.ts",
    });

    throw createError({
      statusCode: 400,
      statusMessage: "Invalid body",
    });
  }

  const apiKeys = getRuntimeKeys(useRuntimeConfig().deepseekToken);

  const response = await trySwitcherWithKeys(
    _deepseekClient,
    validatedBody.data,
    apiKeys.keys
  );

  return response;
});
