import { z } from "zod";

export const helpdeskTicketDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  text: z.string(),
  status: z.string(),
  parentId: z.string().nullable(),
});

export type HelpdeskTicketDetailType = z.infer<
  typeof helpdeskTicketDetailSchema
>;
