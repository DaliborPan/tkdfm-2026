import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { flexRender } from "@tanstack/react-table";
import { GripVertical } from "lucide-react";

import { cn } from "iqf-web-ui/cn";
import { Icon } from "iqf-web-ui/icon";

import { TableHead, TableHeader, TableRow } from "../../components/table";
import { useDataTableContext } from "../context";

export function DataTableHeader({ className }: { className?: string }) {
  const table = useDataTableContext();

  return (
    <TableHeader className={cn(className)}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="bg-neutral-100">
          <SortableContext
            items={table.getState().columnOrder}
            strategy={horizontalListSortingStrategy}
          >
            {headerGroup.headers.map((header, index) => (
              <TableHead
                key={header.id}
                className="group relative first-of-type:pl-4 [&_>_div]:hover:opacity-100"
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
                      className="text-text-primary size-4 cursor-col-resize opacity-0 transition-all group-hover:opacity-100"
                    />
                  )}
                </div>
              </TableHead>
            ))}
          </SortableContext>
        </TableRow>
      ))}
    </TableHeader>
  );
}
