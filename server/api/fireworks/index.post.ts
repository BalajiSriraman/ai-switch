import { getRuntimeKeys, trySwitcherWithKeys } from "~/server/utils/request";

export default defineEventHandler(async (event) => {
  const validatedBody = await bodyValidator(event);

  if (!validatedBody.success) {
    console.error({
      error: validatedBody.error,
      file: "fireworks/index.post.ts",
    });

    throw createError({
      statusCode: 400,
      statusMessage: "Invalid body",
    });
  }

  const apiKeys = getRuntimeKeys(useRuntimeConfig().fireworksApiKey);

  const response = await trySwitcherWithKeys(
    _fireworksClient,
    validatedBody.data,
    apiKeys.keys
  );

  return response;
});
