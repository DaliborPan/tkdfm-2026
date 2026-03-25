import { z } from "zod";

import { domainSchema } from "./domain-schema";

/**
 * @deprecated use `titledSchema` from "iqf-web-ui/titled"
 */
export const titledSchema = domainSchema.extend({
  title: z.string(),
  description: z.string().nullish(),
});

/**
 * @deprecated use `titledSchema` from "iqf-web-ui/titled"
 */
export type TitledObject = z.infer<typeof titledSchema>;
