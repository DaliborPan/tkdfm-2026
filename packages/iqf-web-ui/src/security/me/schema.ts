import { z } from "zod";

export const meSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  username: z.string(),
  email: z.string(),
  authorities: z.array(z.string()),
  organisation: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export type MeType = z.infer<typeof meSchema>;
