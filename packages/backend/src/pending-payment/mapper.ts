import type { Prisma } from "../../generated/client";
import { pendingPaymentDetailSchema } from "./schema";

type PendingPaymentWithCounts = Prisma.PendingPaymentGetPayload<{
  include: {
    _count: {
      select: {
        payments: true;
      };
    };
  };
}>;

export const pendingPaymentMapper = {
  toPendingPaymentDetail(pendingPayment: PendingPaymentWithCounts) {
    return pendingPaymentDetailSchema.parse({
      id: pendingPayment.id,
      createdAt: pendingPayment.createdAt.toISOString(),
      messageId: pendingPayment.messageId,
      message: pendingPayment.message,
      plainText: pendingPayment.plainText,
      amount: pendingPayment.amount,
      variableSymbol: pendingPayment.variableSymbol,
      connectedPaymentType: pendingPayment.connectedPaymentType,
      processed: pendingPayment.processed,
      internalNote: pendingPayment.internalNote,
      paymentsCount: pendingPayment._count.payments,
    });
  },
};
