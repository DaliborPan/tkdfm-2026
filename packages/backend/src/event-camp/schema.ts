import { z } from "zod";

export const eventCampDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  price: z.string(),
  paymentInfo: z.string(),
  variableSymbol: z.string(),
  eventId: z.string(),
});

export type EventCampDetailType = z.infer<typeof eventCampDetailSchema>;
