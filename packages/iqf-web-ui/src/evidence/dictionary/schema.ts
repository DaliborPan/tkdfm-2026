import { z } from "zod";

import { titledSchema } from "../titled";

/**
 * DictionaryObject
 */
export const dictionarySchema = titledSchema.extend({
  code: z.string().nullish(),
  validFrom: z.string().nullish(),
  validTo: z.string().nullish(),
});

export type DictionaryObject = z.infer<typeof dictionarySchema>;
