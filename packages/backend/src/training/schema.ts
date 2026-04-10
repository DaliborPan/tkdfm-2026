import { z } from "zod";

import { attendanceDetailSchema } from "../attendance/schema";
import { groupNameSchema } from "../group/schema";

export const trainingBrowseSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  startsAt: z.string(),
  endsAt: z.string(),
  cancelled: z.string(),
  regular: z.boolean(),
  group: groupNameSchema,
});

export type TrainingBrowseType = z.infer<typeof trainingBrowseSchema>;

export const trainingCancelSchema = z.object({
  cancelled: z.string(),
});

export type TrainingCancelType = z.infer<typeof trainingCancelSchema>;

export const trainingDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  startsAt: z.string(),
  endsAt: z.string(),
  cancelled: z.string(),
  regular: z.boolean(),
  group: groupNameSchema,
  attendances: z.array(attendanceDetailSchema),
});

export type TrainingDetailType = z.infer<typeof trainingDetailSchema>;
