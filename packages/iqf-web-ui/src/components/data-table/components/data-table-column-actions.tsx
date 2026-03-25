import { type Column } from "@tanstack/react-table";
import { Copy, EyeOff } from "lucide-react";
import { type ReactNode } from "react";
import { useIntl } from "react-intl";

import { Button } from "../../atoms/button";
import { successToast } from "../../atoms/toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../molecules/dropdown-menu";
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
  const selectedRows = table.getSelectedRowModel().rows;
  const rows = selectedRows.length
    ? selectedRows
    : table.getCoreRowModel().rows;

  const columnData = rows
    ?.map((row) =>
      row
        .getAllCells()
        .filter((cell) => cell.column.id === column.id)
        .map((cell) =>
          typeof cell.column.columnDef.cell === "function"
            ? cell.column.columnDef.cell(cell.getContext())
            : cell.getValue(),
        ),
    )
    .flat();

  return columnData;
}

function DefaultColumnActionsContent() {
  const intl = useIntl();

  const column = useColumnActionsContext();
  const columnData = useGetColumnValues(column);

  return (
    <div className="flex min-w-[150px] flex-col gap-1">
      <Button
        variant="outlined"
        className="flex w-full items-center justify-between"
        onClick={() => {
          navigator.clipboard.writeText(columnData.join("\n"));

          successToast(
            intl.formatMessage({
              id: "data-table.column-actions.copy-success",
              defaultMessage: "Hodnoty byly zkopírovány",
            }),
          );
        }}
        iconLeft={{ Icon: Copy }}
      >
        {intl.formatMessage({
          id: "data-table.column-actions.copy",
          defaultMessage: "Kopírovat hodnoty",
        })}
      </Button>

      <Button
        variant="outlined"
        className="flex w-full items-center justify-between"
        onClick={() => column.toggleVisibility(false)}
        iconLeft={{ Icon: EyeOff }}
      >
        {intl.formatMessage({
          id: "data-table.column-actions.hide",
          defaultMessage: "Skrýt sloupec",
        })}
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
