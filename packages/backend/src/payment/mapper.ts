import type { Prisma } from "../../generated/client";
import { paymentDetailSchema } from "./schema";

type PaymentWithCounts = Prisma.PaymentGetPayload<{
  include: {
    _count: {
      select: {
        pendingPayments: true;
      };
    };
  };
}>;

export const paymentMapper = {
  toPaymentDetail(payment: PaymentWithCounts) {
    return paymentDetailSchema.parse({
      id: payment.id,
      createdAt: payment.createdAt.toISOString(),
      updatedAt: payment.updatedAt.toISOString(),
      internalNote: payment.internalNote,
      displayNote: payment.displayNote,
      parentFirstHalfId: payment.parentFirstHalfId ?? null,
      parentSecondHalfId: payment.parentSecondHalfId ?? null,
      parentTeamId: payment.parentTeamId ?? null,
      parentEventId: payment.parentEventId ?? null,
      pendingPaymentsCount: payment._count.pendingPayments,
    });
  },
};
