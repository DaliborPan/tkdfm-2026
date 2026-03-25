import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";

import { type BaseObject } from "../../evidence/base";
import { type PropsWithElementRef } from "../../types";
import { DataTableCaption } from "./components/caption";
import { DataTableFooter } from "./components/data-table-footer";
import { TableDefaultComponent } from "./components/table-component";
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

export function DataTable<TTableData extends BaseObject, TValue>({
  ref,
  id,
  version,
  title,
  queryKey,

  api,
  apiSuffix,
  url,

  columns,
  schema,
  tableCaption,
  tabs,
  preFilters,
  fetchData,
  contextMenuActions,
  deriveRowClassName,
  tableAccessibility,

  defaultSorting = DEFAULT_SORTING,
  defaultVisibility = DEFAULT_VISIBILITY,
  defaultPagination = DEFAULT_PAGINATION,
  defaultGlobalFilter = "",
  defaultColumnFilters = DEFAULT_COLUMN_FILTERS,

  TableComponent = TableDefaultComponent,
  children = null,
  caption,
  footer,

  ...props
}: PropsWithElementRef<
  DataTableProps<TTableData, TValue>,
  TableHandle<TTableData>
>) {
  const { table, tableBodyRef, dataQuery, dndContext, fetchDataOptions } =
    useDataTable({
      id,
      version,
      queryKey,
      api,
      apiSuffix,
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
    });

  const onRowClick = useOnRowClick({
    onRowClick: props.onRowClick,
    url,
  });

  const hasActiveColumnFilters = table.getState().columnFilters.length > 0;

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
      onDragEnd={dndContext.handleDragEnd}
      sensors={dndContext.sensors}
    >
      <DataTableContextProvider
        value={{
          ...table,

          dataQuery,
          fetchDataOptions,

          tableBodyRef,

          tableCaption: {
            showNew: true,
            showRefetch: true,
            showSearch: true,
            showColumns: true,
            showFilters: true,

            ...(tableCaption ?? {}),
          },

          tableId: id,
          url,
          api,

          onRowClick,
          deriveRowClassName,
          tableAccessibility,
        }}
      >
        {caption !== undefined && caption}
        {children}

        {!children && (
          <TableComponent
            dataTableCaption={
              caption !== undefined ? null : (
                <DataTableCaption
                  tabs={tabs}
                  title={title}
                  toolbar={tableCaption?.toolbar}
                  defaultShowFilters={hasActiveColumnFilters}
                />
              )
            }
            dataTableFooter={null}
            dataTableContextMenuActions={contextMenuActions}
          />
        )}

        {footer !== undefined ? footer : <DataTableFooter />}
      </DataTableContextProvider>
    </DndContext>
  );
}
