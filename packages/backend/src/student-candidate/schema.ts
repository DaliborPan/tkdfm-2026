import { z } from "zod";

export const studentCandidateBrowseSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  nationalId: z.string(),
  active: z.string(),
});

export type StudentCandidateBrowseType = z.infer<
  typeof studentCandidateBrowseSchema
>;

export const studentCandidateDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  tkdid: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  nationalId: z.string(),
  birthDate: z.string(),
  street: z.string(),
  streetNumber: z.string(),
  city: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  registered: z.string(),
  technicalGrade: z.string(),
  technicalGradeStart: z.string(),
  active: z.string(),
  deleted: z.string(),
});

export type StudentCandidateDetailType = z.infer<
  typeof studentCandidateDetailSchema
>;
