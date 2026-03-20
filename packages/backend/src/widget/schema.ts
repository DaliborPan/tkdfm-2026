import { z } from "zod";

export const widgetDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  text: z.string(),
});

export type WidgetDetailType = z.infer<typeof widgetDetailSchema>;
