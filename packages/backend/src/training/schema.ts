import { z } from "zod";

const trainingGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const trainingAttendanceStudentSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  technicalGrade: z.string(),
});

const trainingAttendanceSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  excused: z.boolean(),
  studentId: z.string(),
  trainingId: z.string(),
  student: trainingAttendanceStudentSchema,
});

export const trainingBrowseSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  startsAt: z.string(),
  endsAt: z.string(),
  cancelled: z.string(),
  regular: z.boolean(),
  group: trainingGroupSchema,
});

export type TrainingBrowseType = z.infer<typeof trainingBrowseSchema>;

export const trainingCancelSchema = z.object({
  cancelled: z.string(),
});

export type TrainingCancelType = z.infer<typeof trainingCancelSchema>;

export const trainingDetailSchema = trainingBrowseSchema.extend({
  attendances: z.array(trainingAttendanceSchema),
});

export type TrainingDetailType = z.infer<typeof trainingDetailSchema>;
