import type { EventExam } from "../../generated/client";
import { eventExamDetailSchema } from "./schema";

export const eventExamMapper = {
  toEventExamDetail(eventExam: EventExam) {
    return eventExamDetailSchema.parse({
      id: eventExam.id,
      createdAt: eventExam.createdAt.toISOString(),
      updatedAt: eventExam.updatedAt.toISOString(),
      examiner: eventExam.examiner,
      paymentInfo: eventExam.paymentInfo,
      variableSymbol: eventExam.variableSymbol,
      eventId: eventExam.eventId,
    });
  },
};
