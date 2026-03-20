import { z } from "zod";

export const eventSeminarDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  master: z.string(),
  whoCanAttend: z.string(),
  eventId: z.string(),
});

export type EventSeminarDetailType = z.infer<typeof eventSeminarDetailSchema>;
