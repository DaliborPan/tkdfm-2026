import { z } from "zod";

export const eventExamDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  examiner: z.string(),
  paymentInfo: z.string(),
  variableSymbol: z.string(),
  eventId: z.string(),
});

export type EventExamDetailType = z.infer<typeof eventExamDetailSchema>;
