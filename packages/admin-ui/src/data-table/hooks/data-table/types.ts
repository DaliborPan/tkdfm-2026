import { type BaseObject } from "iqf-web-ui/base";

import { type DataTableProps, type TableHandle } from "../../types";
import { type UseDataSourceResult } from "../data-source";
import { type UseDataTableStateResult } from "../data-table-state";
import { type UseReactTableResult } from "../react-table";

export type UseDataTableParams<TTableData extends BaseObject, TValue> = Pick<
  DataTableProps<TTableData, TValue>,
  "id" | "schema" | "fetchData" | "queryKey" | "columns" | "preFilters" | "api"
> &
  Pick<
    Required<DataTableProps<TTableData, TValue>>,
    | "defaultSorting"
    | "defaultVisibility"
    | "defaultPagination"
    | "defaultGlobalFilter"
    | "defaultColumnFilters"
    | "serverSide"
  > & {
    ref?: React.Ref<TableHandle<TTableData>>;
  };

export type UseDataTableResult<TTableData extends BaseObject> = {
  tableBodyRef: React.RefObject<HTMLTableSectionElement | null>;
  dndContext: UseDataTableStateResult<TTableData>["dndContext"];
  dataQuery: UseDataSourceResult<TTableData>["dataQuery"];
  fetchDataOptions: UseDataSourceResult<TTableData>["fetchDataOptions"];
  table: UseReactTableResult<TTableData>;
};
