import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { flexRender } from "@tanstack/react-table";
import { GripVertical } from "lucide-react";

import { cn } from "../../../utils/cn";
import { Icon } from "../../atoms/icon";
import { TableHead, TableHeader, TableRow } from "../../atoms/table";
import { useDataTableContext } from "../context";

export function DataTableHeader<TData>({
  className,
  contextMenuActions,
}: {
  className?: string;
  contextMenuActions?: React.ReactNode | ((row: TData) => React.ReactNode);
}) {
  const table = useDataTableContext();

  return (
    <TableHeader className={cn("sticky top-0 z-30", className)}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          <SortableContext
            items={table.getState().columnOrder}
            strategy={horizontalListSortingStrategy}
          >
            {headerGroup.headers.map((header, index) => (
              <TableHead
                key={header.id}
                className="group relative first-of-type:pl-4"
                style={{
                  width: header.getSize(),
                }}
              >
                <div
                  className="flex items-center justify-between gap-1"
                  style={{
                    width: header.getSize() - 16 - (index === 0 ? 16 : 0),
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, {
                        ...header.getContext(),
                        index,
                      })}

                  {header.column.getCanResize() && (
                    <Icon
                      Icon={GripVertical}
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className="size-4 cursor-col-resize text-text-primary opacity-0 transition-all group-hover:opacity-100"
                    />
                  )}
                </div>
              </TableHead>
            ))}

            {!!contextMenuActions && <TableHead className="w-12" />}
          </SortableContext>
        </TableRow>
      ))}
    </TableHeader>
  );
}
