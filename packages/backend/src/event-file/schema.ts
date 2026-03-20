import { z } from "zod";

export const eventFileDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  url: z.string(),
  displayed: z.boolean(),
  eventId: z.string(),
});

export type EventFileDetailType = z.infer<typeof eventFileDetailSchema>;
