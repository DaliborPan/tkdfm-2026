import { type BaseObject } from "iqf-web-ui/base";

import { useColumnFilter } from "./column-filter";
import { useColumnOrder } from "./column-order";
import { useColumnPinning } from "./column-pinning";
import { useColumnSizing } from "./column-sizing";
import { useVisibility } from "./column-visibility";
import { useGlobalFilter } from "./global-filter";
import { usePagination } from "./pagination";
import { useSelection } from "./selection";
import { useSort } from "./sort";
import {
  type UseDataTableStateParams,
  type UseDataTableStateResult,
} from "./types";

export function useDataTableState<TTableData extends BaseObject>({
  id,

  defaultGlobalFilter,
  defaultVisibility,
  defaultColumnOrder,
  defaultPagination,
  defaultSorting,
  defaultColumnFilters,
}: UseDataTableStateParams): UseDataTableStateResult<TTableData> {
  const { globalFilter, setGlobalFilter } = useGlobalFilter({
    defaultGlobalFilter,
  });
  const { columnFilters, setColumnFilters } = useColumnFilter({
    preferenceGroupKey: id,
    defaultColumnFilters,
  });
  const { columnSizing, setColumnSizing } = useColumnSizing({
    preferenceGroupKey: id,
  });
  const { columnVisibility, setColumnVisibility } = useVisibility({
    preferenceGroupKey: id,
    defaultVisibility,
  });
  const { columnOrder, setColumnOrder, sensors, handleDragEnd } =
    useColumnOrder({
      preferenceGroupKey: id,
      defaultColumnOrder,
    });
  const { columnPinning, setColumnPinning } = useColumnPinning({
    preferenceGroupKey: id,
  });
  const { rowSelection, setRowSelection } = useSelection();
  const { pagination, setPagination } = usePagination({
    defaultPagination,
  });
  const { sorting, setSorting } = useSort({
    preferenceGroupKey: id,
    defaultSorting,
  });

  const state = {
    pagination,
    sorting,
    columnFilters,
    columnVisibility,
    columnSizing,
    columnOrder,
    columnPinning,
    rowSelection,
    globalFilter,
  };

  return {
    state,
    stateHandlers: {
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      onColumnSizingChange: setColumnSizing,
      onColumnOrderChange: setColumnOrder,
      onColumnPinningChange: setColumnPinning,
      onGlobalFilterChange: setGlobalFilter,
      onRowSelectionChange: setRowSelection,
      onPaginationChange: setPagination,
    },
    dndContext: {
      sensors,
      handleDragEnd,
    },
    initialState: {
      columnFilters: defaultColumnFilters,
      columnVisibility: defaultVisibility,
      globalFilter: defaultGlobalFilter,
      columnOrder: defaultColumnOrder,
      pagination: defaultPagination,
      sorting: defaultSorting,
    },
  };
}
