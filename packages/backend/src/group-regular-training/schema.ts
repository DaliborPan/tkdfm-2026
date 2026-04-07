import { z } from "zod";

export const groupRegularTrainingCreateSchema = z.object({
  dayOfWeek: z.string(),
  startsAt: z.string(),
  endsAt: z.string(),
  note: z.string(),
  groupId: z.string(),
});

export type GroupRegularTrainingCreateType = z.infer<
  typeof groupRegularTrainingCreateSchema
>;

export const groupRegularTrainingDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  dayOfWeek: z.string(),
  startsAt: z.string(),
  endsAt: z.string(),
  note: z.string(),
  groupId: z.string(),
});

export type GroupRegularTrainingDetailType = z.infer<
  typeof groupRegularTrainingDetailSchema
>;

export const groupRegularTrainingBrowseSchema = groupRegularTrainingDetailSchema;

export type GroupRegularTrainingBrowseType = z.infer<
  typeof groupRegularTrainingBrowseSchema
>;

export const groupRegularTrainingListSchema = z.array(
  groupRegularTrainingDetailSchema,
);

export type GroupRegularTrainingListType = z.infer<
  typeof groupRegularTrainingListSchema
>;
