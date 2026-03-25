import { type CellContext } from "@tanstack/react-table";
import { Tally4 } from "lucide-react";

import { type BaseObject } from "../../../../evidence/base";
import { createBaseColumn } from "../base-column";
import {
  type FilterComponentMap,
  type NumberColumnFilterOperation,
  type NumberTableColumnOptions,
} from "../types";
import { numberInEqFilterDefaults } from "./const";

function numberCell<TTableData extends BaseObject, TValue>({
  getValue,
}: CellContext<TTableData, TValue>) {
  const value = getValue() as number | undefined;

  return <div className="text-right">{value}</div>;
}

const filterComponentMap: FilterComponentMap<NumberColumnFilterOperation> = {
  IN_EQ: numberInEqFilterDefaults,
};

export function createNumberColumn<T extends BaseObject>({
  cell = numberCell,
  Icon = Tally4,
  minSize = 100,

  enableGlobalFilter = false,

  ...options
}: NumberTableColumnOptions<T>) {
  const filterOperation = "IN_EQ";
  const { createFilter, FilterComponent } = filterComponentMap[filterOperation];

  return createBaseColumn({
    ...options,
    type: "NUMBER",

    cell,
    Icon,
    minSize,

    enableGlobalFilter,

    filterOperation,
    createFilter: options.createFilter ?? createFilter,
    FilterComponent: options.FilterComponent ?? FilterComponent,

    export: {
      cellComponentName: "NumberCell",
      ...options.export,
    },
  });
}
