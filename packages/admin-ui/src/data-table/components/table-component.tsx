import { forwardRef } from "react";

import { cn } from "iqf-web-ui/cn";
import { useVirtualizer } from "iqf-web-ui/use-virtualizer";

import { useDataTableContext } from "../context";
import { DataTableBody } from "./data-table-body";
import { DataTableHeader } from "./data-table-header";
import { DataTableLoading } from "./data-table-loading";
import { DataTableRow } from "./data-table-row";

const TableLayout = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function TableLayout({ className, ...props }, ref) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "relative flex h-full grow flex-col overflow-auto",
        className,
      )}
    />
  );
});

const Table = forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & {
    wrapperClassName?: string;
  }
>(function Table({ className, wrapperClassName, ...props }, ref) {
  return (
    <table ref={ref} className={cn("grid min-w-full", className)} {...props} />
  );
});

export function TableComponent() {
  const { dataQuery, ...table } = useDataTableContext();

  const { rows } = table.getRowModel();

  const { rowVirtualizer, parentRef } = useVirtualizer({
    count: rows.length,
    itemsSize: 37,
  });

  return (
    <TableLayout ref={parentRef}>
      <Table>
        <DataTableHeader />

        {dataQuery.isLoading && <DataTableLoading />}

        {/* TT: height */}
        <DataTableBody height={`${rowVirtualizer.getTotalSize()}px`}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index];

            return (
              <DataTableRow
                key={row.id}
                row={row}
                virtualRow={virtualRow}
                rowVirtualizer={rowVirtualizer}
              />
            );
          })}
        </DataTableBody>
      </Table>
    </TableLayout>
  );
}
