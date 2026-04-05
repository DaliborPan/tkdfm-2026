import { type Column, type Table } from "@tanstack/react-table";
import { type BaseObject } from "iqf-web-ui/base";

import { type UseDataTableResult } from "../hooks/data-table";
import {
  type DataTableProps,
  type OnRowClickFn,
  type TableAccessibility,
} from "../types";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface DataTableContextType<TTableData extends BaseObject>
  extends
    Table<TTableData>,
    Pick<UseDataTableResult<TTableData>, "fetchDataOptions" | "tableBodyRef"> {
  url: string;
  api: string;

  tableId: string;

  tableCaption: NonNullable<DataTableProps<TTableData>["tableCaption"]>;

  onRowClick?: OnRowClickFn<TTableData>;
  deriveRowClassName?: (row: TTableData) => string;

  tableAccessibility?: TableAccessibility<TTableData>;

  dataQuery: Pick<
    UseDataTableResult<TTableData>["dataQuery"],
    "data" | "refetch" | "isLoading" | "isRefetching"
  >;

  serverSide?: boolean;
}

export type DataTableFiltersContextType = {
  showFilters: boolean;
  setShowFilters: (showFilters: boolean) => void;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/consistent-type-definitions
export interface ColumnActionsContextType<TData, TValue> extends Column<
  TData,
  TValue
> {
  // can be extended with additional properties
}
