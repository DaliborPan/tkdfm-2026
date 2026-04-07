import { z } from "zod";

export const parentEventDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  weight: z.number().nullable(),
  height: z.number().nullable(),
  internalNote: z.string(),
  parentNote: z.string(),
  cancelled: z.string(),
  createdBy: z.string(),
  parentId: z.string(),
  eventId: z.string(),
  paymentId: z.string().nullable(),
});

export type ParentEventDetailType = z.infer<typeof parentEventDetailSchema>;
