import { useImperativeHandle, useRef } from "react";

import { type BaseObject } from "iqf-web-ui/base";

import { useDataSource } from "../data-source";
import { useDataTableState } from "../data-table-state";
import { useReactTable } from "../react-table/react-table";
import { type UseDataTableParams, type UseDataTableResult } from "./types";

export function useDataTable<TTableData extends BaseObject, TValue>({
  id,
  queryKey,
  api,
  schema,
  fetchData,
  ref,
  columns,
  defaultSorting,
  defaultVisibility,
  defaultPagination,
  defaultGlobalFilter,
  defaultColumnFilters,
  preFilters,
  serverSide,
}: UseDataTableParams<TTableData, TValue>): UseDataTableResult<TTableData> {
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);

  const { dndContext, initialState, state, stateHandlers } = useDataTableState({
    defaultGlobalFilter,
    defaultColumnFilters,
    defaultPagination,
    defaultSorting,
    defaultVisibility,
    defaultColumnOrder: columns
      .map((column) => column.id!)
      .filter((id) => id !== "select"),
    id,
  });

  const { dataQuery, defaultData, pageCount, fetchDataOptions } = useDataSource(
    {
      id,
      queryKey,
      api,
      schema,
      state,
      preFilters,
      fetchData,
      columns,
      serverSide,
    },
  );

  const table = useReactTable<TTableData, TValue>({
    data: dataQuery.data?.items ?? defaultData,
    columns,
    pageCount,
    state: {
      initialState,
      state,
      stateHandlers,
    },
    serverSide,
  });

  useImperativeHandle(ref, () => ({
    tableBodyRef,

    initialState,
    state,
    stateHandlers,

    dataQuery,
    fetchDataOptions,

    table,
  }));

  return { tableBodyRef, dndContext, dataQuery, fetchDataOptions, table };
}
