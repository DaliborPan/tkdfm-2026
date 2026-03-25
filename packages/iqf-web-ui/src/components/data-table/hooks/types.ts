import { type QueryKey } from "@tanstack/react-query";
import { type z } from "zod";

import { type BaseObject } from "../../../evidence/base";
import { type UseIqfQueryOptions } from "../../../hooks/iqf-query/types";
import { type ApiFetchFn } from "../../../utils/api-fetch";
import { type BrowseDataResponse, type DataSourceOptions } from "../types";

export type UseBrowseDataQueryParams<TTableData extends BaseObject> = Omit<
  UseIqfQueryOptions<z.ZodSchema<TTableData>>,
  "data" | "fetchData" | "queryKey"
> & {
  queryKey: QueryKey;
  id?: string;
  options: DataSourceOptions;

  fetchData?: ApiFetchFn<BrowseDataResponse<TTableData>>;

  /**
   * @default /browse
   */
  apiSuffix?: string;
};
