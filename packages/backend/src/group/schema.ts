import { z } from "zod";

export const groupDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  name: z.string(),
  shortcut: z.string(),
  location: z.string(),
  color: z.string(),
  studentsCount: z.number().int(),
  regularTrainingsCount: z.number().int(),
  trainingsCount: z.number().int(),
});

export type GroupDetailType = z.infer<typeof groupDetailSchema>;
