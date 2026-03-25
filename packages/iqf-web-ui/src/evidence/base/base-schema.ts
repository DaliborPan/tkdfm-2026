import { z } from "zod";

/**
 * BaseObject
 */
export const baseSchema = z.object({
  id: z.string(),
});

export type BaseObject = z.infer<typeof baseSchema>;
