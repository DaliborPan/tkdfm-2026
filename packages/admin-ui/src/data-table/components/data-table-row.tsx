"use client";

import { usePathname } from "next/navigation";
import { forwardRef } from "react";

import { type Row } from "@tanstack/react-table";
import { type VirtualItem, type Virtualizer } from "@tanstack/react-virtual";
import { type BaseObject } from "iqf-web-ui/base";
import { cn } from "iqf-web-ui/cn";

import { useDataTableContext } from "../context";
import { DataTableRowCells } from "./data-table-row-cells";

const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(function TableRow({ className, ...props }, ref) {
  return (
    <tr
      ref={ref}
      className={cn(
        "flex min-w-full cursor-pointer border-b transition-colors hover:bg-neutral-100",
        "absolute w-full", // TT
        className,
      )}
      {...props}
    />
  );
});

type DataTableRowProps = {
  row: Row<BaseObject>;
  virtualRow: VirtualItem;
  rowVirtualizer: Virtualizer<Element, Element>;
};

export function DataTableRow({
  row,
  virtualRow,
  rowVirtualizer,
}: DataTableRowProps) {
  const pathname = usePathname();

  const { onRowClick } = useDataTableContext();

  return (
    <TableRow
      data-index={virtualRow.index} // TT: needed for dynamic row height measurement
      ref={(node) => rowVirtualizer.measureElement(node)} // TT: measure dynamic row height
      key={row.id}
      className={cn(
        pathname.includes(row.id) &&
          "bg-primary-100 [&_td]:text-text-primary-color [&_td]:font-semibold",
      )}
      onClick={(e) => {
        onRowClick?.(row.original, e);
      }}
      style={{
        transform: `translateY(${virtualRow.start}px)`, // TT: this should always be a `style` as it changes on scroll
      }}
    >
      <DataTableRowCells row={row} />
    </TableRow>
  );
}
