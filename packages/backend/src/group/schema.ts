import { z } from "zod";

export const groupBrowseSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  name: z.string(),
  shortcut: z.string(),
  studentsCount: z.number(),
  trainingsCount: z.number(),
});

export type GroupBrowseType = z.infer<typeof groupBrowseSchema>;

export const groupUpdateSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  name: z.string(),
  shortcut: z.string(),
  location: z.string(),
  color: z.string(),
  studentsCount: z.number(),
  regularTrainingsCount: z.number(),
  trainingsCount: z.number(),
});

export type GroupUpdateType = z.infer<typeof groupUpdateSchema>;

export const groupDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  name: z.string(),
  shortcut: z.string(),
  location: z.string(),
  color: z.string(),
  studentsCount: z.number(),
  regularTrainingsCount: z.number(),
  trainingsCount: z.number(),
});

export type GroupDetailType = z.infer<typeof groupDetailSchema>;
