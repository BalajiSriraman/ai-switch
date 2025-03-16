export default defineEventHandler(async (event) => {
  const validatedBody = await bodyValidator(event);

  if (!validatedBody.success) {
    console.error({
      error: validatedBody.error,
      file: "google/index.post.ts",
    });

    throw createError({
      statusCode: 400,
      statusMessage: "Invalid body",
    });
  }

  const { model } = validatedBody.data;

  const modelClient = _googleGeminiClient(model);

  const response = await switcher(validatedBody.data, {
    _model: modelClient,
  });

  return response;
});
