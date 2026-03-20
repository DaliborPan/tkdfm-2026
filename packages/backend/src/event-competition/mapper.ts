import type { EventCompetition } from "../../generated/client";
import { eventCompetitionDetailSchema } from "./schema";

export const eventCompetitionMapper = {
  toEventCompetitionDetail(eventCompetition: EventCompetition) {
    return eventCompetitionDetailSchema.parse({
      id: eventCompetition.id,
      createdAt: eventCompetition.createdAt.toISOString(),
      updatedAt: eventCompetition.updatedAt.toISOString(),
      accomodation: eventCompetition.accomodation,
      travel: eventCompetition.travel,
      food: eventCompetition.food,
      price: eventCompetition.price,
      paymentInfo: eventCompetition.paymentInfo,
      variableSymbol: eventCompetition.variableSymbol,
      eventId: eventCompetition.eventId,
    });
  },
};
