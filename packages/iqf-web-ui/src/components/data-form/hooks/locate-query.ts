import { z } from "zod";

import { useIqfQuery } from "../../../hooks/iqf-query";
import { type DataSourceOptions } from "../../data-table/types";

export function useLocateQuery({
  path,
  id,
  data,
}: {
  path: string;
  id?: string;
  data?: DataSourceOptions;
}) {
  return useIqfQuery({
    api: `${path}/${id}/locate`,
    method: "POST",
    enabled: false,
    schema: z.number(),
    data,
  });
}
