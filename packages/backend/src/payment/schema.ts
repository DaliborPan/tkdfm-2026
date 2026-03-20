import { z } from "zod";

export const paymentDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  internalNote: z.string(),
  displayNote: z.string(),
  parentFirstHalfId: z.string().nullable(),
  parentSecondHalfId: z.string().nullable(),
  parentTeamId: z.string().nullable(),
  parentEventId: z.string().nullable(),
  pendingPaymentsCount: z.number().int(),
});

export type PaymentDetailType = z.infer<typeof paymentDetailSchema>;
