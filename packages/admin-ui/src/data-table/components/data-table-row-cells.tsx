import { type Row, flexRender } from "@tanstack/react-table";

import { type BaseObject } from "iqf-web-ui/base";
import { cn } from "iqf-web-ui/cn";

import { TableCell } from "iqf-web-ui/table";

export function DataTableRowCells({ row }: { row: Row<BaseObject> }) {
  return row.getVisibleCells().map((cell) => (
    <TableCell
      key={cell.id}
      className={cn(
        "relative flex pr-5 first-of-type:pl-4",
        cell.column.columnDef.meta?.className,
      )}
      style={{
        width: cell.column.getSize(),
      }}
      onClick={(e) => {
        if (cell.column.id === "select") {
          e.stopPropagation();
        }
      }}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  ));
}
