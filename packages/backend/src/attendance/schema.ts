import { z } from "zod";

export const attendanceDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  excused: z.boolean(),
  studentId: z.string(),
  trainingId: z.string(),
});

export type AttendanceDetailType = z.infer<typeof attendanceDetailSchema>;
