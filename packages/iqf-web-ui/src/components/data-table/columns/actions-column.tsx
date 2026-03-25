import { type BaseObject } from "../../../evidence/base";
import { cn } from "../../../utils/cn";
import { createBaseColumn } from "./base-column";
import { type ActionsTableColumnOptions } from "./types";

export function createActionsColumn<T extends BaseObject>({
  actions,
  ...options
}: ActionsTableColumnOptions<T>) {
  return createBaseColumn<T>({
    ...options,
    type: "ACTIONS",

    id: "actions",

    cell: ({ row }) => actions(row.original),

    enableFilter: false,
    enableActions: false,
    enableHiding: false,
    enableSorting: false,
    enableResizing: false,

    className: cn("py-0", options.className),
  });
}
