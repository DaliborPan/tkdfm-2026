import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type Column } from "@tanstack/react-table";
import { ArrowDownUp, Columns4 } from "lucide-react";
import { type CSSProperties } from "react";

import { cn } from "iqf-web-ui/cn";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "iqf-web-ui/dropdown";
import { Icon } from "iqf-web-ui/icon";

import { useDataTableContext } from "../../context";
import { DataTableCaptionButton } from "./data-table-caption-button";

function ColumnItem<T>({ column }: { column: Column<T, unknown> }) {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: column.id,
    });

  const style: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    minWidth: 250,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <DropdownMenuCheckboxItem
        checked={column.getIsVisible()}
        onSelect={(e) => e.preventDefault()}
        onCheckedChange={(checked) => column.toggleVisibility(!!checked)}
        className="w-full text-sm"
      >
        {column.columnDef.meta?.label}
      </DropdownMenuCheckboxItem>
      <Icon
        Icon={ArrowDownUp}
        className={cn("text-primary mx-2 h-4 w-4 cursor-grab", {
          "cursor-grabbing": isDragging,
        })}
        {...attributes}
        {...listeners}
      />
    </div>
  );
}

export function DataTableColumnOptions({
  trigger,
}: {
  trigger?: React.ReactNode;
}) {
  const table = useDataTableContext();

  const columns = table
    .getAllLeafColumns()
    .filter((column) => column.getCanHide());

  return (
    <DropdownMenu variant="primary">
      <DropdownMenuTrigger asChild={true}>
        {trigger ?? (
          <DataTableCaptionButton
            iconRight={{
              Icon: Columns4,
              className: "size-4",
            }}
            tooltip="Sloupce"
          />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-h-96 overflow-y-auto">
        <SortableContext
          items={table.getState().columnOrder}
          strategy={verticalListSortingStrategy}
        >
          {columns.map((column) => (
            <ColumnItem key={column.id} column={column} />
          ))}
        </SortableContext>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
