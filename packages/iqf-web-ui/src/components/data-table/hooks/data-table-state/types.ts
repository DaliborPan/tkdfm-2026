import {
  type DragEndEvent,
  type SensorDescriptor,
  type SensorOptions,
} from "@dnd-kit/core";
import {
  type ColumnOrderState,
  type InitialTableState,
  type TableOptions,
  type TableState,
} from "@tanstack/react-table";

import { type BaseObject } from "../../../../evidence/base";
import { type DataTableProps } from "../../types";

export type UseDataTableStateParams = Pick<
  DataTableProps<any, any>,
  "id" | "version"
> &
  Pick<
    Required<DataTableProps<any, any>>,
    | "defaultGlobalFilter"
    | "defaultSorting"
    | "defaultVisibility"
    | "defaultPagination"
    | "defaultColumnFilters"
  > & {
    defaultColumnOrder: ColumnOrderState;
  };

type DataTableState = Pick<
  TableState,
  | "pagination"
  | "sorting"
  | "columnFilters"
  | "columnVisibility"
  | "columnSizing"
  | "columnOrder"
  | "columnPinning"
  | "rowSelection"
  | "globalFilter"
>;

type DataTableStateHandlers<TTableData extends BaseObject> = Required<
  Pick<
    TableOptions<TTableData>,
    | "onSortingChange"
    | "onColumnFiltersChange"
    | "onColumnVisibilityChange"
    | "onColumnSizingChange"
    | "onColumnOrderChange"
    | "onColumnPinningChange"
    | "onGlobalFilterChange"
    | "onRowSelectionChange"
    | "onPaginationChange"
  >
>;

export type UseDataTableStateResult<TTableData extends BaseObject> = {
  state: DataTableState;
  stateHandlers: DataTableStateHandlers<TTableData>;
  dndContext: {
    sensors: SensorDescriptor<SensorOptions>[];
    handleDragEnd: (event: DragEndEvent) => void;
  };
  initialState: InitialTableState;
};
