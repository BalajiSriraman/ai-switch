import { z } from "zod";

export default defineEventHandler(async (e) => {
  const body = await readBody(e);
  const parsedBody = z
    .object({
      user: z.string(),
    })
    .parse(magicJsonParser(body));

  const user = parsedBody.user;

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "User is required",
    });
  }

  e.context.user = { name: user };
});
