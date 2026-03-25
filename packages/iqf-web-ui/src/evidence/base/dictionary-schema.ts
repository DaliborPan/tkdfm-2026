import { z } from "zod";

import { titledSchema } from "./titled-schema";

/**
 * @deprecated use `dictionarySchema` from "iqf-web-ui/dictionary"
 */
export const dictionarySchema = titledSchema.extend({
  code: z.string().nullish(),
  validFrom: z.string().nullish(),
  validTo: z.string().nullish(),
});

/**
 * @deprecated use `dictionarySchema` from "iqf-web-ui/dictionary"
 */
export type DictionaryObject = z.infer<typeof dictionarySchema>;
