import { type Column } from "@tanstack/react-table";
import { Copy } from "lucide-react";
import { type ReactNode } from "react";

import { Button } from "iqf-web-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "iqf-web-ui/dropdown";
import { successToast } from "iqf-web-ui/toast";

import {
  ColumnActionsProvider,
  useColumnActionsContext,
  useDataTableContext,
} from "../context";

type DataTableColumnActionsType<TData, TValue> = {
  column: Column<TData, TValue>;
  trigger: ReactNode;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  actions?: ReactNode;
};

function useGetColumnValues<TData, TValue>(column: Column<TData, TValue>) {
  const table = useDataTableContext();
  const { rows: selectedRows } = table.getSelectedRowModel();
  const rows = selectedRows.length ? selectedRows : table.getRowModel().rows;

  const columnData = rows
    ?.map((row) =>
      row
        .getAllCells()
        .filter((cell) => cell.column.id === column.id)
        .map((cell) => cell.getValue())
        .filter(Boolean),
    )
    .flat();

  return columnData;
}

function DefaultColumnActionsContent() {
  const column = useColumnActionsContext();
  const columnData = useGetColumnValues(column);

  return (
    <div className="flex min-w-[150px] flex-col gap-1">
      <Button
        variant="outlined"
        className="flex w-full items-center justify-between"
        onClick={() => {
          navigator.clipboard.writeText(columnData.join(","));

          successToast("Hodnoty byly zkopírovány");
        }}
        iconLeft={{ Icon: Copy }}
      >
        Kopírovat hodnoty
      </Button>
    </div>
  );
}

export function DataTableColumnActions<TData, TValue>({
  column,
  trigger,
  open,
  onOpenChange,
  ...props
}: DataTableColumnActionsType<TData, TValue>) {
  return (
    <DropdownMenu variant="primary" open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild={true}>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <ColumnActionsProvider value={column}>
          {props.actions ?? <DefaultColumnActionsContent />}
        </ColumnActionsProvider>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
