import { z } from "zod";

export function generateZodSchema(formItems: object) {
  const schema: Record<string, z.ZodType<any>> = {};

  formItems.forEach((item) => {
    let fieldSchema = z.string();

    item.validation.forEach((rule) => {
      switch (rule.type) {
        case "min":
          fieldSchema = fieldSchema.min(rule.value, { message: rule.message });
          break;
        default:
          throw new Error("Unsupported validation type");
      }
    });

    schema[item.name] = fieldSchema;
  });

  return z.object(schema);
}
