import { type Column } from "@tanstack/react-table";
import { ChevronUp } from "lucide-react";
import { type MouseEvent, type ReactNode, useState } from "react";

import { Button } from "iqf-web-ui/button";
import { cn } from "iqf-web-ui/cn";
import { Icon } from "iqf-web-ui/icon";

import { DataTableColumnActions } from "./data-table-column-actions";

type DataTableColumnHeaderProps<TData, TValue> = {
  className?: string;
  column: Column<TData, TValue>;
  title: ReactNode;
  index?: number;
  enableActions?: boolean;
};

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  index,
  enableActions,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const [isColumnActionOpen, setIsColumnActionOpen] = useState(false);

  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setIsColumnActionOpen(true);
  };

  const onClick = () => {
    if (column.getIsSorted() === "desc") {
      column.toggleSorting(false);
    } else if (column.getIsSorted() === "asc") {
      column.clearSorting();
    } else {
      column.toggleSorting(true);
    }
  };

  const renderButton = ({
    onClick,
    onContextMenu,
  }: {
    onClick?: () => void;
    onContextMenu?: (e: MouseEvent) => void;
  }) => (
    <Button
      variant="link"
      color="secondary"
      className="no-underline hover:underline"
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <span
        className="inline-block truncate text-left"
        style={{
          width:
            column.getSize() -
            40 -
            (column.getIsSorted() ? 16 : 0) -
            (index === 0 ? 16 : 0),
        }}
      >
        {title}
      </span>
    </Button>
  );

  if (!column.getCanSort() && !enableActions) {
    return <div className={cn("truncate text-sm", className)}>{title}</div>;
  }

  return (
    <div
      className={cn("flex items-center justify-between", className)}
      style={{
        width: column.getSize() - 40 - (index === 0 ? 16 : 0),
      }}
    >
      {enableActions ? (
        <DataTableColumnActions
          trigger={
            column.getCanSort()
              ? renderButton({ onClick, onContextMenu })
              : renderButton({ onContextMenu })
          }
          open={isColumnActionOpen}
          onOpenChange={(open) => {
            if (!open) setIsColumnActionOpen(false);
          }}
          column={column}
          actions={column.columnDef.meta?.actions}
        />
      ) : (
        renderButton({ onClick })
      )}

      {column.getIsSorted() && (
        <Icon
          className={cn(
            "transition-all",
            column.getIsSorted() === "desc" && "rotate-180",
          )}
          Icon={ChevronUp}
        />
      )}
    </div>
  );
}
