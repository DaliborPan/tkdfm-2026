import { DndContext, closestCenter } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { type ReactNode, forwardRef } from "react";

import { type BaseObject } from "iqf-web-ui/base";

import { DataTableCaption } from "./components/caption";
import { DataTableFooter } from "./components/data-table-footer";
import { TableComponent } from "./components/table-component";
import {
  DEFAULT_COLUMN_FILTERS,
  DEFAULT_PAGINATION,
  DEFAULT_SORTING,
  DEFAULT_VISIBILITY,
} from "./const";
import { DataTableContextProvider } from "./context";
import { useDataTable } from "./hooks/data-table";
import { useOnRowClick } from "./hooks/on-row-click";
import type { DataTableProps, TableHandle } from "./types";

export const DataTable = forwardRef(function DataTable<
  TTableData extends BaseObject,
  TValue,
>(
  {
    id,
    queryKey,
    title,

    api,
    url = "/",

    columns,
    schema,
    tableCaption,
    tabs,
    preFilters,
    fetchData,
    onRowClick,
    deriveRowClassName,
    tableAccessibility,
    serverSide = true,

    defaultSorting = DEFAULT_SORTING,
    defaultVisibility = DEFAULT_VISIBILITY,
    defaultPagination = DEFAULT_PAGINATION,
    defaultGlobalFilter = "",
    defaultColumnFilters = DEFAULT_COLUMN_FILTERS,

    children,
    caption,
    footer,
  }: DataTableProps<TTableData, TValue>,
  ref: React.Ref<TableHandle<TTableData>>,
) {
  const { table, tableBodyRef, dataQuery, dndContext, fetchDataOptions } =
    useDataTable({
      id,
      queryKey,
      api,
      preFilters,
      fetchData,
      columns,
      ref,
      schema,
      defaultGlobalFilter,
      defaultPagination,
      defaultSorting,
      defaultVisibility,
      defaultColumnFilters,
      serverSide,
    });

  const _onRowClick = useOnRowClick({
    onRowClick,
    url,
  });

  const hasActiveColumnFilters = table.getState().columnFilters.length > 0;

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={dndContext.handleDragEnd}
      sensors={dndContext.sensors}
    >
      <DataTableContextProvider
        value={{
          ...table,

          dataQuery: {
            isLoading: dataQuery.isLoading,
            isRefetching: dataQuery.isRefetching,
            data: dataQuery.data,
            refetch: dataQuery.refetch,
          },

          fetchDataOptions,

          tableBodyRef,

          tableCaption: {
            showNew: true,
            showSettings: true,
            showColumns: true,
            showFilters: true,
            showSearch: true,

            ...(tableCaption ?? {}),
          },

          tableId: id,
          url,
          api,

          onRowClick: _onRowClick,
          deriveRowClassName,
          tableAccessibility,
          serverSide,
        }}
      >
        {caption !== undefined ? (
          caption
        ) : (
          <DataTableCaption
            tabs={tabs}
            title={title}
            toolbar={tableCaption?.toolbar}
            defaultShowFilters={hasActiveColumnFilters}
          />
        )}

        {children ?? <TableComponent />}

        {footer !== undefined ? footer : <DataTableFooter />}
      </DataTableContextProvider>
    </DndContext>
  );
}) as <TTableData extends BaseObject, TValue>(
  props: DataTableProps<TTableData, TValue> & {
    ref?: React.Ref<TableHandle<TTableData>>;
  },
) => ReactNode;
