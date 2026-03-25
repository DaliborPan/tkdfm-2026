import { z } from "zod";

export const errorSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  exception: z.string(),
  message: z.string(),
  path: z.string(),
  status: z.number(),
  timestamp: z.string(),
});

export type ErrorObject = z.infer<typeof errorSchema>;
