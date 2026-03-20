import { z } from "zod";

export const pendingPaymentDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  messageId: z.string(),
  message: z.string(),
  plainText: z.string(),
  amount: z.string(),
  variableSymbol: z.string(),
  connectedPaymentType: z.string(),
  processed: z.boolean(),
  internalNote: z.string(),
  paymentsCount: z.number().int(),
});

export type PendingPaymentDetailType = z.infer<
  typeof pendingPaymentDetailSchema
>;
