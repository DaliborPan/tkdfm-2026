import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.string().datetime().nullable(),
});

export type UserSchemaType = z.infer<typeof userSchema>;
