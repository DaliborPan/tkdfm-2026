import type { EventCamp } from "../../generated/client";
import { eventCampDetailSchema } from "./schema";

export const eventCampMapper = {
  toEventCampDetail(eventCamp: EventCamp) {
    return eventCampDetailSchema.parse({
      id: eventCamp.id,
      createdAt: eventCamp.createdAt.toISOString(),
      updatedAt: eventCamp.updatedAt.toISOString(),
      price: eventCamp.price,
      paymentInfo: eventCamp.paymentInfo,
      variableSymbol: eventCamp.variableSymbol,
      eventId: eventCamp.eventId,
    });
  },
};
