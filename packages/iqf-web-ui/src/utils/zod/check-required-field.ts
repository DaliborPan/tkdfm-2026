import { get, isEmpty } from "lodash";
import { z } from "zod";

export function checkRequiredField<T extends Record<string, any>>(
  value: T,
  ctx: z.RefinementCtx,
  path: string,
) {
  if (isEmpty(get(value, path))) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_type,
      received: z.ZodParsedType.undefined,
      expected: "string",
      path: [path],
    });
  }
}
