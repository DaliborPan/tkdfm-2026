import type { PendingPaymentPayment } from "../../generated/client";
import { pendingPaymentPaymentDetailSchema } from "./schema";

export const pendingPaymentPaymentMapper = {
  toPendingPaymentPaymentDetail(pendingPaymentPayment: PendingPaymentPayment) {
    return pendingPaymentPaymentDetailSchema.parse({
      id: pendingPaymentPayment.id,
      createdAt: pendingPaymentPayment.createdAt.toISOString(),
      paymentId: pendingPaymentPayment.paymentId ?? null,
      pendingPaymentId: pendingPaymentPayment.pendingPaymentId ?? null,
    });
  },
};
