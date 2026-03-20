import { z } from "zod";

export const latestPendingPaymentDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  messageId: z.string(),
});

export type LatestPendingPaymentDetailType = z.infer<
  typeof latestPendingPaymentDetailSchema
>;
