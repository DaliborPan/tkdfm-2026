import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { type Row, flexRender } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { memo } from "react";
import { FormattedMessage } from "react-intl";

import { type BaseObject } from "../../../evidence/base/base-schema";
import { useSettingsContext } from "../../../settings/context";
import { cn } from "../../../utils/cn";
import { IconButton } from "../../atoms/button";
import { TableBody, TableCell, TableRow } from "../../atoms/table";
import { useDataTableContext } from "../context";
import { useOnRowClick } from "../hooks/on-row-click";
import { type DataTableProps, type OnRowClickFn } from "../types";
import { DataTableCell } from "./data-table-cell";
import { DataTableContextMenu } from "./data-table-context-menu";
import { DataTableLoading } from "./data-table-loading";

type InnerDataTableBodyProps<TTableData extends BaseObject> = {
  isLoading: boolean;
  rows: Row<TTableData>[];
  onRowClick: OnRowClickFn<TTableData>;
  contextMenuActions?: DataTableProps<TTableData>["contextMenuActions"];
  className?: string;
};

/**
 * InnerDataTableBody component, not exposed for `DataTable`.
 *
 * This component is beeing memoized while resizing columns, improving performance.
 */
function InnerDataTableBody<TData extends BaseObject>({
  isLoading,
  rows,
  onRowClick,
  contextMenuActions,
  className,
}: InnerDataTableBodyProps<TData>) {
  const { router } = useSettingsContext();
  const {
    tableBodyRef,
    deriveRowClassName,
    tableAccessibility,
    resetRowSelection,
    getState,
  } = useDataTableContext<TData>();

  const hasColumnFilters = getState().columnFilters.length > 0;

  return (
    <TableBody
      className={className}
      ref={tableBodyRef}
      {...tableAccessibility?.tbodyAccessibilityProps}
    >
      {rows.length ? (
        rows.map((row) => {
          const hasContextMenuActions =
            typeof contextMenuActions === "function"
              ? contextMenuActions(row.original)
              : contextMenuActions;

          return (
            <DataTableContextMenu
              key={row.id}
              actions={hasContextMenuActions ? contextMenuActions : null}
              focusedRow={row.original}
            >
              <TableRow
                id={`data-table-row-${row.id}`}
                tabIndex={0}
                {...tableAccessibility?.deriveTableRowAccessibilityProps?.(
                  row.original,
                )}
                data-index={row.index}
                data-state={row.getIsSelected() && "selected"}
                className={cn(
                  "min-w-full cursor-pointer bg-white hover:bg-secondary-200",

                  router.pathname.includes(row.id) &&
                    "bg-primary-100 [&_td]:font-medium [&_td]:text-black",
                  deriveRowClassName?.(row.original),
                )}
                onClick={(e) => {
                  onRowClick(row.original, e);
                }}
                onContextMenu={() => {
                  if (hasContextMenuActions && row.getCanSelect()) {
                    const isSelected = row.getIsSelected();

                    if (!isSelected) {
                      resetRowSelection();

                      row.toggleSelected(true);
                    }
                  }
                }}
                onKeyUp={(e) => {
                  if (
                    !(e.target instanceof HTMLElement) ||
                    e.target.nodeName !== "TR"
                  ) {
                    return;
                  }

                  if (e.key === "Enter" || e.key === " ") {
                    onRowClick(row.original, e);
                  }
                }}
                style={{
                  width: row
                    .getVisibleCells()
                    .reduce((acc, cell) => acc + cell.column.getSize(), 0),
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <DataTableCell
                    id={cell.id}
                    className={cn(
                      "first-of-type:pl-4",
                      cell.column.columnDef.meta?.className,
                    )}
                    innerClassName={
                      cell.column.id === "open" ? "!overflow-visible" : ""
                    }
                    key={cell.id}
                    columnSize={cell.column.getSize()}
                    data-title={cell.column.columnDef.meta?.label}
                    onClick={(e) => {
                      if (cell.column.id === "select") {
                        e.stopPropagation();
                      }
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </DataTableCell>
                ))}

                {hasContextMenuActions && (
                  <TableCell className="sticky right-0 flex h-auto w-12 items-center justify-center bg-inherit py-0 shadow-[#e5e7eb_-1px_0px_0px_0px,#e5e7eb_1px_0px_0px_0px] shadow-focus">
                    <IconButton
                      variant="base"
                      iconLeft={{
                        Icon: EllipsisVertical,
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        const target = e.target as HTMLElement;
                        const x = target.getClientRects()[0].left;
                        const y = target.getClientRects()[0].top;

                        e.target.dispatchEvent(
                          new MouseEvent("contextmenu", {
                            bubbles: true,
                            cancelable: true,
                            clientX: x,
                            clientY: y,
                          }),
                        );
                      }}
                      type="button"
                    />
                  </TableCell>
                )}
              </TableRow>
            </DataTableContextMenu>
          );
        })
      ) : (
        <>
          {isLoading ? (
            <DataTableLoading />
          ) : (
            <TableRow className="border-0">
              <TableCell className="my-10 w-full text-center">
                {hasColumnFilters ? (
                  <FormattedMessage
                    id="data-table.filter-no-data"
                    defaultMessage="Pro zvolené filtry nebyly nalezeny žádné položky."
                  />
                ) : (
                  <FormattedMessage
                    id="data-table.no-data"
                    defaultMessage="Žádná data"
                  />
                )}
              </TableCell>
            </TableRow>
          )}
        </>
      )}
    </TableBody>
  );
}

/**
 * Memoized version of InnerDataTableBody.
 */
const MemoizedInnerDataTableBody = memo(
  InnerDataTableBody,
) as typeof InnerDataTableBody;

type DataTableBodyProps<TTableData extends BaseObject> = {
  isLoading: boolean;
  url: string;
  contextMenuActions?: DataTableProps<TTableData>["contextMenuActions"];
  className?: string;
};

/**
 * DataTableBody component exported for `DataTable.`
 */
export function DataTableBody<TData extends BaseObject>({
  isLoading,
  url,
  contextMenuActions,
  className,
}: DataTableBodyProps<TData>) {
  const table = useDataTableContext<TData>();

  const onRowClick = useOnRowClick({
    onRowClick: table.onRowClick,
    url,
  });

  const isResizing = !!table.getState().columnSizingInfo.isResizingColumn;

  const InnerDataTableBodyComponent = isResizing
    ? MemoizedInnerDataTableBody
    : InnerDataTableBody;

  return (
    <SortableContext
      items={table.getState().columnOrder}
      strategy={horizontalListSortingStrategy}
    >
      <InnerDataTableBodyComponent
        onRowClick={onRowClick}
        isLoading={isLoading}
        rows={table.getCoreRowModel().rows}
        contextMenuActions={contextMenuActions}
        className={className}
      />
    </SortableContext>
  );
}
