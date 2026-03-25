import { z } from "zod";

export const localeSchema = z.enum(["cs", "en"]);

export type Locale = z.infer<typeof localeSchema>;
