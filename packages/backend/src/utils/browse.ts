import { z } from "zod";

import { filterSchema } from "./filters";
import { sortSchema } from "./sort";

/* --------------------------------- Schema --------------------------------- */

export const browseBodySchema = z.object({
  filters: z.array(filterSchema),
  sort: z.array(sortSchema),
  take: z.number(),
  skip: z.number(),
});

export type BrowseBodyType = z.infer<typeof browseBodySchema>;

/* ---------------------------------- Utils --------------------------------- */

export const parseBrowseBody = (body: unknown) => {
  const parsedBody = browseBodySchema.safeParse(body);

  if (!parsedBody.success) {
    return null;
  }

  return parsedBody.data;
};
