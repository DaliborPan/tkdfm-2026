import {
  useReactTable as _useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import { type BaseObject } from "../../../../evidence/base";
import { type UseReactTableParams, type UseReactTableResult } from "./types";

export function useReactTable<TTableData extends BaseObject, TValue>({
  columns,
  data,
  pageCount,
  state: { initialState, state, stateHandlers },
}: UseReactTableParams<TTableData, TValue>): UseReactTableResult<TTableData> {
  return _useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    pageCount,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    initialState,
    state,
    ...stateHandlers,
  });
}
