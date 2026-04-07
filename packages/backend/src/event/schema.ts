import { z } from "zod";

import { eventCampDetailSchema } from "../event-camp/schema";
import { eventCompetitionDetailSchema } from "../event-competition/schema";
import { eventExamDetailSchema } from "../event-exam/schema";
import { eventSeminarDetailSchema } from "../event-seminar/schema";

export const eventDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  title: z.string(),
  startsAt: z.string(),
  endsAt: z.string(),
  location: z.string(),
  deadline: z.string().nullable(),
  info: z.string(),
  type: z.string(),
  filesCount: z.number(),
  parentsCount: z.number(),
  seminar: eventSeminarDetailSchema.nullable(),
  competition: eventCompetitionDetailSchema.nullable(),
  camp: eventCampDetailSchema.nullable(),
  exam: eventExamDetailSchema.nullable(),
});

export type EventDetailType = z.infer<typeof eventDetailSchema>;
