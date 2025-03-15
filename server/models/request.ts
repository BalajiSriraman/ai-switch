import { z } from "zod";

const objectResponseSchema = z.object({
  type: z.literal("object"),
  // TODO: Only Zod is supported for now
  // z.ZodType<unknown, z.ZodTypeDef, any>
  schema: z.unknown(),
});

const textResponseSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
});

export const queryParams = z.object({
  retry: z.number().optional().default(1),
  prompt: z.string(),
  model: z.string(),
  responseSchema: z.discriminatedUnion("type", [
    objectResponseSchema,
    textResponseSchema,
  ]),
});

export type QueryParams = z.infer<typeof queryParams>;
