import { z } from "zod";

/**
 * Compatible with BE response and Select value
 */
export const booleanSchema = z.union([z.enum(["true", "false"]), z.boolean()]);

export type BooleanType = z.infer<typeof booleanSchema>;
