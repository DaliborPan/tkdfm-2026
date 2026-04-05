import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { type PropsWithChildren } from "react";

import { TableBody, TableRow } from "../../components/table";
import { useDataTableContext } from "../context";
import { DataTableRowCells } from "./data-table-row-cells";

export function DataTableBody({
  children,
  height,
}: PropsWithChildren<{ height: string }>) {
  const { tableBodyRef, ...table } = useDataTableContext();

  const isResizing = !!table.getState().columnSizingInfo.isResizingColumn;

  if (isResizing) {
    const firstRow = table.getRowModel().rows.at(0);

    if (!firstRow) {
      return null;
    }

    return (
      <TableRow className="relative">
        <DataTableRowCells row={firstRow} />
      </TableRow>
    );
  }

  return (
    <SortableContext
      items={table.getState().columnOrder}
      strategy={horizontalListSortingStrategy}
    >
      <TableBody ref={tableBodyRef} style={{ height }}>
        {children}
      </TableBody>
    </SortableContext>
  );
}
