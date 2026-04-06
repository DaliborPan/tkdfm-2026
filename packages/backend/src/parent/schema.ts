import { z } from "zod";

export const parentDetailSchema = z.object({
  id: z.string(),
  role: z.string(),
  nationalId: z.string(),
  birthDate: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  street: z.string(),
  streetNumber: z.string(),
  city: z.string(),
  registered: z.string(),
  weight: z.number().nullable(),
  height: z.number().nullable(),
  disability: z.string(),
  gender: z.string(),
  mskGroup: z.string(),
  nsaGroup: z.string(),
  studentId: z.string(),
});

export type ParentDetailType = z.infer<typeof parentDetailSchema>;
