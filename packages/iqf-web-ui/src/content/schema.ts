import { z } from "zod";

import { baseSchema } from "../evidence/base";

export const contentSchema = baseSchema.extend({
  title: z.string(),
  size: z.number(),
  contentType: z.string().nullish(),
});

export type ContentType = z.infer<typeof contentSchema>;
