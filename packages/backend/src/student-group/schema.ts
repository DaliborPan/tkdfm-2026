import { z } from "zod";

export const studentGroupDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  studentId: z.string(),
  groupId: z.string(),
});

export type StudentGroupDetailType = z.infer<typeof studentGroupDetailSchema>;
