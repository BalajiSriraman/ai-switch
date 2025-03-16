import { getRuntimeKeys, trySwitcherWithKeys } from "~/server/utils/request";

export default defineEventHandler(async (event) => {
  const validatedBody = await bodyValidator(event);

  if (!validatedBody.success) {
    console.error({
      error: validatedBody.error,
      file: "groq/index.post.ts",
    });

    throw createError({
      statusCode: 400,
      statusMessage: "Invalid body",
    });
  }

  const apiKeys = getRuntimeKeys(useRuntimeConfig().groqCloudToken);

  const response = await trySwitcherWithKeys(
    _groqClient,
    validatedBody.data,
    apiKeys.keys
  );

  return response;
});
