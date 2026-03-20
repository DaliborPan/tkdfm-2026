import type { Prisma } from "../../generated/client";
import { parentEventDetailSchema } from "./schema";

type ParentEventWithPayment = Prisma.ParentEventGetPayload<{
  include: {
    payment: true;
  };
}>;

export const parentEventMapper = {
  toParentEventDetail(parentEvent: ParentEventWithPayment) {
    return parentEventDetailSchema.parse({
      id: parentEvent.id,
      createdAt: parentEvent.createdAt.toISOString(),
      updatedAt: parentEvent.updatedAt.toISOString(),
      weight: parentEvent.weight ?? null,
      height: parentEvent.height ?? null,
      internalNote: parentEvent.internalNote,
      parentNote: parentEvent.parentNote,
      cancelled: parentEvent.cancelled,
      createdBy: parentEvent.createdBy,
      parentId: parentEvent.parentId,
      eventId: parentEvent.eventId,
      paymentId: parentEvent.payment?.id ?? null,
    });
  },
};
