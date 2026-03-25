import { z } from "zod";

import { baseSchema } from "./base-schema";
import { userSchema } from "./iqf-user-schema";

/**
 * @deprecated use `domainSchema from "iqf-web-ui/domain"
 */
export const domainSchema = baseSchema.extend({
  createdAt: z.string().nullish(),
  createdBy: userSchema.nullish(),
  modifiedAt: z.string().nullish(),
  modifiedBy: userSchema.nullish(),
});

/**
 * @deprecated use `domainSchema from "iqf-web-ui/domain"
 */
export type DomainObject = z.infer<typeof domainSchema>;
