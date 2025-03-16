import { getRuntimeKeys, trySwitcherWithKeys } from "~/server/utils/request";

export default defineEventHandler(async (event) => {
  const validatedBody = await bodyValidator(event);

  if (!validatedBody.success) {
    console.error({
      error: validatedBody.error,
      file: "perplexity/index.post.ts",
    });

    throw createError({
      statusCode: 400,
      statusMessage: "Invalid body",
    });
  }

  const apiKeys = getRuntimeKeys(useRuntimeConfig().perplexityToken);

  const response = await trySwitcherWithKeys(
    _perplexityClient,
    validatedBody.data,
    apiKeys.keys
  );

  return response;
});
