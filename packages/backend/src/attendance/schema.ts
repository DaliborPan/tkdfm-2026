import { z } from "zod";

import { studentLabelSchema } from "../student/schema";

export const attendanceDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  excused: z.boolean(),
  studentId: z.string(),
  trainingId: z.string(),
  student: studentLabelSchema,
});

export type AttendanceDetailType = z.infer<typeof attendanceDetailSchema>;
