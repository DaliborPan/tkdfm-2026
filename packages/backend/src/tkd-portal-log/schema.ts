import { z } from "zod";

export const tkdPortalLogDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  nationalId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  type: z.string(),
  field: z.string(),
  oldValue: z.string(),
  newValue: z.string(),
  note: z.string(),
});

export type TkdPortalLogDetailType = z.infer<typeof tkdPortalLogDetailSchema>;
