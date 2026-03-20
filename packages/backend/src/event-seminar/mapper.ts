import type { EventSeminar } from "../../generated/client";
import { eventSeminarDetailSchema } from "./schema";

export const eventSeminarMapper = {
  toEventSeminarDetail(eventSeminar: EventSeminar) {
    return eventSeminarDetailSchema.parse({
      id: eventSeminar.id,
      createdAt: eventSeminar.createdAt.toISOString(),
      updatedAt: eventSeminar.updatedAt.toISOString(),
      master: eventSeminar.master,
      whoCanAttend: eventSeminar.whoCanAttend,
      eventId: eventSeminar.eventId,
    });
  },
};
