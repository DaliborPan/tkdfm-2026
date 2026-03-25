import { z } from "zod";

import { baseSchema } from "./base-schema";

/**
 * @deprecated use `iqfUserSchema` from "iqf-web-ui/base"
 */
export const userSchema = baseSchema.extend({
  displayName: z.string().nullish(),
});

/**
 * @deprecated use `iqfUserSchema` from "iqf-web-ui/base"
 */
export type UserObject = z.infer<typeof userSchema>;

/**
 * IqfUser
 */
export const iqfUserSchema = baseSchema.extend({
  displayName: z.string().nullish(),
});

export type IqfUserObject = z.infer<typeof iqfUserSchema>;
