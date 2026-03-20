import { z } from "zod";

export const eventCompetitionDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  accomodation: z.string(),
  travel: z.string(),
  food: z.string(),
  price: z.string(),
  paymentInfo: z.string(),
  variableSymbol: z.string(),
  eventId: z.string(),
});

export type EventCompetitionDetailType = z.infer<
  typeof eventCompetitionDetailSchema
>;
