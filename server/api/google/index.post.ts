export default defineEventHandler(async (event) => {
  const validatedQuery = await queryValidator(event);

  if (!validatedQuery.success) {
    console.error({
      error: validatedQuery.error,
      file: "google/index.post.ts",
    });

    throw createError({
      statusCode: 400,
      statusMessage: "Invalid query",
    });
  }

  const { model } = validatedQuery.data;

  const modelClient = _googleGeminiClient(model);

  const response = await switcher(validatedQuery.data, {
    _model: modelClient,
  });

  return response;
});
