import { z } from "zod";

export const trainingDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  startsAt: z.string(),
  endsAt: z.string(),
  cancelled: z.string(),
  regular: z.boolean(),
  groupId: z.string(),
  attendancesCount: z.number(),
});

export type TrainingDetailType = z.infer<typeof trainingDetailSchema>;
