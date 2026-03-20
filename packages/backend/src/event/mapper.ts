import type { Prisma } from "../../generated/client";
import { eventCampMapper } from "../event-camp/mapper";
import { eventCompetitionMapper } from "../event-competition/mapper";
import { eventExamMapper } from "../event-exam/mapper";
import { eventSeminarMapper } from "../event-seminar/mapper";
import { eventDetailSchema } from "./schema";

type EventWithCounts = Prisma.EventGetPayload<{
  include: {
    seminar: true;
    competition: true;
    camp: true;
    exam: true;
    _count: {
      select: {
        files: true;
        parents: true;
      };
    };
  };
}>;

export const eventMapper = {
  toEventDetail(event: EventWithCounts) {
    return eventDetailSchema.parse({
      id: event.id,
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString(),
      title: event.title,
      startsAt: event.startsAt.toISOString(),
      endsAt: event.endsAt.toISOString(),
      location: event.location,
      deadline: event.deadline ? event.deadline.toISOString() : null,
      info: event.info,
      type: event.type,
      filesCount: event._count.files,
      parentsCount: event._count.parents,
      seminar: event.seminar
        ? eventSeminarMapper.toEventSeminarDetail(event.seminar)
        : null,
      competition: event.competition
        ? eventCompetitionMapper.toEventCompetitionDetail(event.competition)
        : null,
      camp: event.camp ? eventCampMapper.toEventCampDetail(event.camp) : null,
      exam: event.exam ? eventExamMapper.toEventExamDetail(event.exam) : null,
    });
  },
};
