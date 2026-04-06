import { z } from "zod";

export const helpdeskTicketBrowseSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  status: z.string(),
  parentId: z.string().nullable(),
  reporterName: z.string().nullable(),
});

export type HelpdeskTicketBrowseType = z.infer<
  typeof helpdeskTicketBrowseSchema
>;

export const helpdeskTicketDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  text: z.string(),
  status: z.string(),
  parentId: z.string().nullable(),
  reporterName: z.string().nullable(),
});

export type HelpdeskTicketDetailType = z.infer<
  typeof helpdeskTicketDetailSchema
>;
