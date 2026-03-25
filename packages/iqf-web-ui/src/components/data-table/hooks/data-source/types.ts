import { type UseQueryResult } from "@tanstack/react-query";

import { type BaseObject } from "../../../../evidence/base";
import { type IqfAxiosError } from "../../../../utils/api-fetch";
import {
  type BrowseDataResponse,
  type DataSourceOptions,
  type DataTableProps,
} from "../../types";
import { type UseDataTableStateResult } from "../data-table-state";

export type UseDataSourceParams<TTableData extends BaseObject, TValue> = Pick<
  DataTableProps<TTableData, TValue>,
  | "id"
  | "queryKey"
  | "schema"
  | "preFilters"
  | "columns"
  | "fetchData"
  | "apiSuffix"
> &
  /**
   * @todo remove Required<> once `api` is required
   */
  Pick<Required<DataTableProps<TTableData, TValue>>, "api"> & {
    state: UseDataTableStateResult<TTableData>["state"];
  };

export type UseDataSourceResult<TTableData extends BaseObject> = {
  /**
   * TODO: should be removed
   */
  defaultData: never[];
  dataQuery: UseQueryResult<BrowseDataResponse<TTableData>, IqfAxiosError>;
  fetchDataOptions: DataSourceOptions;
  pageCount: number;
};
