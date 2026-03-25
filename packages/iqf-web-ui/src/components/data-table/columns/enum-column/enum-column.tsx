import { type CellContext } from "@tanstack/react-table";
import { Waypoints } from "lucide-react";

import { type BaseObject } from "../../../../evidence/base";
import { type SelectOptionType } from "../../../atoms/select";
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
  options: SelectOptionType[];
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

    export: {
      ...createEnumExportParams({ options: options.options }),
      ...options.export,
    },
  });
}
