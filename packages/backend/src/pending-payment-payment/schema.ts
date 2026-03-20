import { z } from "zod";

export const pendingPaymentPaymentDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  paymentId: z.string().nullable(),
  pendingPaymentId: z.string().nullable(),
});

export type PendingPaymentPaymentDetailType = z.infer<
  typeof pendingPaymentPaymentDetailSchema
>;
