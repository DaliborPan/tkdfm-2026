import { type CellContext } from "@tanstack/react-table";
import _get from "lodash/get";
import { Waypoints } from "lucide-react";

import { type BaseObject } from "iqf-web-ui/base";
import { type SelectObject } from "iqf-web-ui/select";

import { createBaseColumn } from "../base-column";
import { enumeratedFilterDefaults } from "../enumerated";
import {
  type EnumColumnFilterOperation,
  type EnumTableColumnOptions,
  type FilterComponentMap,
} from "../types";

export function defaultEnumCell<TTableData extends BaseObject, TValue>({
  getValue,
  cell,
}: CellContext<TTableData, TValue>) {
  const value = getValue();
  const options = cell.column.columnDef.meta?.filterComponentProps?.options;

  return options?.find((option) => option.id === value)?.title ?? value;
}

export function createEnumExportParams({
  options,
}: {
  options: SelectObject[];
}) {
  return {
    cellComponentName: "TextCell",
    valueMapperName: "selectColumnMapper",

    valueMapperData: options.map((option) => ({
      id: option.id,
      name: option.title,
    })),
  } as const;
}

const filterComponentMap: FilterComponentMap<EnumColumnFilterOperation> = {
  IN: enumeratedFilterDefaults,
};

export function createEnumColumn<T extends BaseObject>({
  cell = defaultEnumCell,
  Icon = Waypoints,

  ...options
}: EnumTableColumnOptions<T>) {
  const filterOperation = "IN";
  const { createFilter, FilterComponent } = filterComponentMap[filterOperation];

  return createBaseColumn({
    ...options,
    type: "ENUM",

    filterOperation,
    cell,
    Icon,

    createFilter: options.createFilter ?? createFilter,
    FilterComponent: options.FilterComponent ?? FilterComponent,

    filterFn:
      options.filterFn ??
      ((row, _id, filterValue: T[]) => {
        const id = options.name ?? options.id;

        if (!id) {
          return false;
        }

        const value = _get(row.original, id) as string | undefined;

        if (!value) {
          return false;
        }

        return filterValue.some((fv) => fv.id === value);
      }),
  });
}
