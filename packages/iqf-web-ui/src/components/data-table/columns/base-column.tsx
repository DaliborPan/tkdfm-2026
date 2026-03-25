import { type Column, type ColumnDef } from "@tanstack/react-table";

import { type BaseObject } from "../../../evidence/base";
import { DataTableColumnHeader } from "../components/data-table-column-header";
import { type CreateBaseColumnParams } from "./types";

function defaultHeader<TData, TValue>({
  column,
  index,
}: {
  column: Column<TData, TValue>;
  index?: number;
}) {
  return (
    <DataTableColumnHeader
      column={column}
      title={column.columnDef.meta?.label}
      index={index}
      enableActions={column.columnDef.meta?.enableActions}
    />
  );
}

export const createBaseColumn = <
  TData extends BaseObject,
  TOption extends BaseObject = BaseObject,
  TValue = any,
>({
  id,
  name = id,
  filterId = name,
  sort,

  label,
  filterOperation,
  Icon,
  cell,
  className,
  required,

  enableFilter = true,
  enableHiding = true,
  enableSorting = true,
  enableResizing = true,
  enableActions = false,
  actions,
  minSize = 175,
  maxSize,
  size,

  ...options
}: CreateBaseColumnParams<TData, TOption>): ColumnDef<TData, TValue> => {
  /**
   * If `name` is not provided, custom cell component is expected.
   */
  const accessorKey = name ?? "";

  return {
    accessorKey,
    id: filterId,
    meta: {
      label,
      className,
      required,
      sort: {
        id: sort?.id ?? accessorKey,
        nullPrecedence: sort?.nullPrecedence,
      },
      type: options.type,

      filterOperation,
      filterComponentProps: {
        Icon,

        ...(options.type === "ENUM" && {
          options: options.options,
        }),

        ...(options.type === "AUTOCOMPLETE" && {
          id: options.options.url,
          autocompleteOptions: options.options,

          labelMapper: options.filterLabelMapper,
        }),

        ...(options.type === "COMBOBOX" && {
          id: options.options.api,
          comboboxOptions: options.options,

          optionLabelMapper: options.optionLabelMapper,
        }),

        ...(options.type === "NUMBER" && {
          textType: "number",
        }),

        ...(options.type === "DATE_TIME" && {
          labelMapper: options.filterLabelMapper,
          dateType: "datetime-local",
        }),

        ...(options.type === "INSTANT" && {
          labelMapper: options.filterLabelMapper,
          dateType: "datetime-local",
        }),

        ...(options.type === "DATE" && {
          labelMapper: options.filterLabelMapper,
          dateType: "date",
        }),

        ...(options.type === "TIME" && {
          labelMapper: options.filterLabelMapper,
          dateType: "time",
        }),
      },

      ...(options.type === "DATE_TIME" && {
        cellLabelMapper: options.cellLabelMapper,
      }),

      ...(options.type !== "ACTIONS" && {
        createFilter: options.createFilter,
        createGlobalFilter: options.createGlobalFilter,
        FilterComponent: options.FilterComponent,
      }),

      ...(options.type !== "ACTIONS" &&
        options.type !== "CUSTOM" &&
        options.export && {
          export: {
            name: label,
            datakey: accessorKey,

            ...options.export,
          },
        }),
      enableActions,
      actions,
    },

    cell,
    header: defaultHeader,

    minSize,
    maxSize,
    size,
    enableColumnFilter: enableFilter,
    enableHiding,
    enableSorting,
    enableResizing,

    ...((options.type === "TEXT" || options.type === "NUMBER") && {
      enableGlobalFilter: options.enableGlobalFilter,
    }),
  };
};

export function withPrefix<TData extends BaseObject>(
  columnDef: ReturnType<typeof createBaseColumn<TData>>,
  prefix: string,
): ReturnType<typeof createBaseColumn<TData>> {
  const { accessorKey, id } = columnDef as { accessorKey: string; id: string };

  return {
    ...columnDef,
    accessorKey: `${prefix}.${accessorKey}`,
    id: `${prefix}.${id}`,
  };
}
