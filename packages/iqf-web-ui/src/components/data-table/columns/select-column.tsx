import { type AriaAttributes } from "react";
import { defineMessages, useIntl } from "react-intl";

import { type BaseObject } from "../../../evidence/base";
import { Checkbox } from "../../atoms/checkbox";
import { type IqfColumnDef } from "./types";

function useSelectColumn<TData extends BaseObject, TValue = any>(props?: {
  cell?: (data: TData) => AriaAttributes;
}): IqfColumnDef<TData, TValue> {
  const intl = useIntl();

  return {
    id: "select",
    header: ({ table }) => {
      const label = intl.formatMessage({
        id: "data-table.select-all",
        defaultMessage: "Vybrat vše",
      });

      return (
        <>
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            aria-checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => table.toggleAllPageRowsSelected(e)}
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
        onChange={(e) => row.toggleSelected(e)}
        aria-label={intl.formatMessage({
          id: "data-table.select-row",
          defaultMessage: "Vybrat řádek",
        })}
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

useSelectColumn.messages = defineMessages({
  ariaLabel: {
    id: "data-table.select-row.aria-label",
    defaultMessage: "Vybrat řádek {label}",
  },
});

export { useSelectColumn };
