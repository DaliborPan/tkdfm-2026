import { z } from "zod";

/**
 * `enumeratedSchema` is schema that contains `id` and `title` fields.
 *
 * If you don't want `id` to be just a string,
 * you can pass `schema` (typically z.enum) as parameter to specify
 * the type of `id`.
 */
export function createEnumeratedSchema<TEnum extends [string, ...string[]]>(
  schema?: z.ZodEnum<TEnum>,
) {
  return z.object({
    id: schema ?? (z.string() as unknown as z.ZodEnum<TEnum>),
    title: z.string(),
  });
}

export type EnumeratedType<T extends string = string> = {
  id: T;
  title: string;
};

/**
 * @deprecated use `createEnumeratedSchema` instead
 */
export function enumeratedSchema<TEnum extends [string, ...string[]]>(
  schema?: z.ZodEnum<TEnum>,
) {
  return z.object({
    id: schema ?? (z.string() as unknown as z.ZodEnum<TEnum>),
    title: z.string(),
  });
}

/**
 * @deprecated use `EnumeratedType` instead
 */
export type Enumerated<T extends string = string> = {
  id: T;
  title: string;
};
