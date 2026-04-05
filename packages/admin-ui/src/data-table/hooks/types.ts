import { type QueryKey } from "@tanstack/react-query";
import { type z } from "zod";

import { type ApiFetchFn } from "iqf-web-ui/api-fetch";
import { type BaseObject } from "iqf-web-ui/base";
import { type useIqfQuery } from "iqf-web-ui/use-iqf-query";

import { type BrowseDataResponse, type DataSourceOptions } from "../types";

export type UseBrowseDataQueryParams<TTableData extends BaseObject> = Omit<
  Parameters<typeof useIqfQuery<z.ZodSchema<TTableData>>>[0],
  "data" | "fetchData" | "queryKey" | "staleTime"
> & {
  queryKey?: QueryKey;
  id?: string;
  staleTime?: number;

  /**
   * @default all data without filtering/... See `DEFAULT_BROWSE_ALL_DATA_SOURCE_OPTIONS`
   */
  options?: DataSourceOptions;

  fetchData?: ApiFetchFn<BrowseDataResponse<TTableData>>;

  /**
   * @default /browse
   */
  apiSuffix?: string;
};
