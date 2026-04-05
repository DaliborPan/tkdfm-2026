import { z } from "zod";

export const tkdPortalLogBrowseSchema = z.object({
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

export type TkdPortalLogBrowseType = z.infer<typeof tkdPortalLogBrowseSchema>;

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

export const tkdPortalLogCreateSchema = z.object({
  nationalId: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  type: z.string(),
  field: z.string().optional(),
  oldValue: z.string().optional(),
  newValue: z.string().optional(),
  note: z.string().optional(),
});

export type TkdPortalLogCreateType = z.infer<typeof tkdPortalLogCreateSchema>;

export const tkdPortalLogUpdateSchema = z.object({
  id: z.string(),
  nationalId: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  type: z.string(),
  field: z.string().optional(),
  oldValue: z.string().optional(),
  newValue: z.string().optional(),
  note: z.string().optional(),
});

export type TkdPortalLogUpdateType = z.infer<typeof tkdPortalLogUpdateSchema>;
