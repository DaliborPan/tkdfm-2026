import { z } from "zod";

export const trainerDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  nationalId: z.string(),
});

export type TrainerDetailType = z.infer<typeof trainerDetailSchema>;
