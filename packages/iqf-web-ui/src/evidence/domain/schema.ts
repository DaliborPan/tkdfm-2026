import { z } from "zod";

import { baseSchema } from "../base";
import { iqfUserSchema } from "../base/iqf-user-schema";

/**
 * DomainObject
 */
export const domainSchema = baseSchema.extend({
  // TODO(iqf) - discuss if can be nullish or no. According to DomainObject, should not be nullish
  createdAt: z.string().nullish(),
  createdBy: iqfUserSchema.nullish(),
  modifiedAt: z.string().nullish(),
  modifiedBy: iqfUserSchema.nullish(),
});

export type DomainObject = z.infer<typeof domainSchema>;
