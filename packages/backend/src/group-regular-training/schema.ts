import { z } from "zod";

export const groupRegularTrainingDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  dayOfWeek: z.string(),
  startsAt: z.string(),
  endsAt: z.string(),
  note: z.string(),
  groupId: z.string(),
});

export type GroupRegularTrainingDetailType = z.infer<
  typeof groupRegularTrainingDetailSchema
>;
