import { z } from "zod";
import { parentDetailSchema } from "../parent";

export const studentDetailSchema = z.object({
  id: z.string(),
  tkdid: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  technicalGrade: z.string(),
  technicalGradeStart: z.string(),
  inactive: z.string(),
  importActive: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  parent: parentDetailSchema.nullable(),
});

export type StudentDetailType = z.infer<typeof studentDetailSchema>;
