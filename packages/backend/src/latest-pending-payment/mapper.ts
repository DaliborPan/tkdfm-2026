import type { LatestPendingPayment } from "../../generated/client";
import { latestPendingPaymentDetailSchema } from "./schema";

export const latestPendingPaymentMapper = {
  toLatestPendingPaymentDetail(latestPendingPayment: LatestPendingPayment) {
    return latestPendingPaymentDetailSchema.parse({
      id: latestPendingPayment.id,
      createdAt: latestPendingPayment.createdAt.toISOString(),
      updatedAt: latestPendingPayment.updatedAt.toISOString(),
      messageId: latestPendingPayment.messageId,
    });
  },
};
