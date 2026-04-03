import { type AriaAttributes } from "react";

import { type BaseObject } from "iqf-web-ui/base";
import { Checkbox } from "iqf-web-ui/checkbox";

import { type IqfColumnDef } from "./types";

function useSelectColumn<TData extends BaseObject, TValue = any>(props?: {
  cell?: (data: TData) => AriaAttributes;
}): IqfColumnDef<TData, TValue> {
  return {
    id: "select",
    header: ({ table }) => {
      const label = "Vybrat vše";

      return (
        <>
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            aria-checked={table.getIsAllPageRowsSelected()}
            onChange={(checked) => table.toggleAllPageRowsSelected(!!checked)}
            aria-label={label}
            id="select-all-checkbox"
          />

          <span className="sr-only">{label}</span>
        </>
      );
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        aria-checked={row.getIsSelected()}
        onChange={(checked) => row.toggleSelected(!!checked)}
        aria-label="Vybrat řádek"
        id={`select-row-checkbox-${row.id}`}
        {...(props?.cell ? props.cell(row.original) : {})}
      />
    ),
    size: 56,
    meta: {
      className: "flex items-center",
    },
    enableGlobalFilter: false,
    enableResizing: false,
    enableSorting: false,
    enableHiding: false,
  } as IqfColumnDef<TData, TValue>;
}

export { useSelectColumn };
