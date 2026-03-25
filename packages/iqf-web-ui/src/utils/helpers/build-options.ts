import { type z } from "zod";

type AtLeastOne<T> = [T, ...T[]];

/**
 * Builds options and ensures that every enum id (T) is there
 *
 * Used for building static options for enums and making sure that the type and the options are synced
 *
 * Based on https://stackoverflow.com/a/55266531
 *
 * @example
  const enumSchema = z.enum(["MANUAL", "AUTOMATIC"])

  const options = buildOptions(enumSchema)([
    {
      id: "MANUAL",
      title: "Manuální",
    },
    {
      id: "AUTOMATIC",
      title: "Automatický",
    },
  ]);
 */
export const buildOptions =
  <T extends string>(_schema: z.ZodSchema<T>) =>
  <L extends AtLeastOne<{ id: T; title: string }>>(
    x: L extends any
      ? Exclude<T, L[number]["id"]> extends never
        ? L
        : Exclude<T, L[number]["id"]>[]
      : never,
  ) =>
    x;
