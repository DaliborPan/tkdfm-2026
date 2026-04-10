import { z } from "zod";

import { parentDetailSchema } from "../parent/schema";

export const studentLabelSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  technicalGrade: z.string(),
});

export type StudentLabelType = z.infer<typeof studentLabelSchema>;

export const studentDetailSchema = z.object({
  id: z.string(),
  tkdid: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  technicalGrade: z.string(),
  technicalGradeStart: z.string(),
  inactive: z.string(),
  importActive: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  parent: parentDetailSchema.nullable(),
});

export type StudentDetailType = z.infer<typeof studentDetailSchema>;
