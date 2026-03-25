import { type Column, type Table } from "@tanstack/react-table";

import { type BaseObject } from "../../../evidence/base";
import { type UseDataTableResult } from "../hooks/data-table";
import {
  type DataTableProps,
  type OnRowClickFn,
  type TableAccessibility,
} from "../types";

export type DataTableContextType<TTableData extends BaseObject> = {
  url: string;
  api: string;

  tableId: string;

  tableCaption: NonNullable<DataTableProps<TTableData>["tableCaption"]>;

  onRowClick?: OnRowClickFn<TTableData>;
  deriveRowClassName?: (row: TTableData) => string;

  tableAccessibility?: TableAccessibility<TTableData>;

  dataQuery: UseDataTableResult<TTableData>["dataQuery"];
} & Table<TTableData> &
  Pick<UseDataTableResult<TTableData>, "fetchDataOptions" | "tableBodyRef">;

export type DataTableFiltersContextType = {
  showFilters: boolean;
  setShowFilters: (showFilters: boolean) => void;
};

export type ColumnActionsContextType<TData, TValue> = {
  // can be extended with additional properties
} & Column<TData, TValue>;
