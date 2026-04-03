import {
  useReactTable as _useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import { type BaseObject } from "iqf-web-ui/base";

import { type UseReactTableParams, type UseReactTableResult } from "./types";

export function useReactTable<TTableData extends BaseObject, TValue>({
  columns,
  data,
  pageCount,
  state: { initialState, state, stateHandlers },
  serverSide,
}: UseReactTableParams<TTableData, TValue>): UseReactTableResult<TTableData> {
  return _useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    pageCount,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),

    ...(serverSide && {
      getPaginationRowModel: getPaginationRowModel(),
      manualFiltering: true,
      manualSorting: true,
      manualPagination: true,
    }),

    initialState,
    state,
    ...stateHandlers,
  });
}
