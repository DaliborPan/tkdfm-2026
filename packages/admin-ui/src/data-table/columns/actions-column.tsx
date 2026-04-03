import { type BaseObject } from "iqf-web-ui/base";
import { cn } from "iqf-web-ui/cn";

import { createBaseColumn } from "./base-column";
import { type ActionsTableColumnOptions } from "./types";

export function createActionsColumn<T extends BaseObject>({
  actions,
  id,
  ...options
}: ActionsTableColumnOptions<T>) {
  return createBaseColumn<T>({
    ...options,
    type: "ACTIONS",

    id: id ?? "actions",

    cell: ({ row }) => actions(row.original),

    enableFilter: false,
    enableActions: false,
    enableHiding: false,
    enableSorting: false,
    enableResizing: options.enableResizing ?? false,

    className: cn("py-0", options.className),
  });
}
