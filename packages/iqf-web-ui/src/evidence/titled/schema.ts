import { z } from "zod";

import { domainSchema } from "../domain";

/**
 * TitledObject
 */
export const titledSchema = domainSchema.extend({
  title: z.string(),
  description: z.string().nullish(),
});

export type TitledObject = z.infer<typeof titledSchema>;
