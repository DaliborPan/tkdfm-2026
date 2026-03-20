import type { EventFile } from "../../generated/client";
import { eventFileDetailSchema } from "./schema";

export const eventFileMapper = {
  toEventFileDetail(eventFile: EventFile) {
    return eventFileDetailSchema.parse({
      id: eventFile.id,
      createdAt: eventFile.createdAt.toISOString(),
      updatedAt: eventFile.updatedAt.toISOString(),
      name: eventFile.name,
      url: eventFile.url,
      displayed: eventFile.displayed,
      eventId: eventFile.eventId,
    });
  },
};
