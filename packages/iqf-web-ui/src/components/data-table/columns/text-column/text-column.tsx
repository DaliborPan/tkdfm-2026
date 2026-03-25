import { type CellContext } from "@tanstack/react-table";
import { Hash } from "lucide-react";

import { type BaseObject } from "../../../../evidence/base";
import { createBaseColumn } from "../base-column";
import {
  type FilterComponentMap,
  type TextColumnFilterOperation,
  type TextTableColumnOptions,
} from "../types";
import { textFilterDefaults } from "./const";

function defaultTextCell<TData, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  return getValue();
}

const filterComponentMap: FilterComponentMap<TextColumnFilterOperation> = {
  IN_LIKE: {
    createFilter: textFilterDefaults.createInLikeTextFilter,
    FilterComponent: textFilterDefaults.FilterComponent,
  },
  IN_CONTAINS: {
    createFilter: textFilterDefaults.createInContainsTextFilter,
    FilterComponent: textFilterDefaults.FilterComponent,
  },
  IN_EQ: {
    createFilter: textFilterDefaults.createInEqTextFilter,
    FilterComponent: textFilterDefaults.FilterComponent,
  },
};

function createTextColumn<T extends BaseObject>({
  filterOperation = "IN_LIKE",
  cell = defaultTextCell,
  Icon = Hash,

  enableGlobalFilter = false,

  ...options
}: TextTableColumnOptions<T>) {
  const { createFilter, FilterComponent } = filterComponentMap[filterOperation];

  return createBaseColumn({
    ...options,
    type: "TEXT",

    filterOperation,
    cell,
    Icon,

    enableGlobalFilter,

    createFilter: options.createFilter ?? createFilter,
    FilterComponent: options.FilterComponent ?? FilterComponent,

    export: {
      cellComponentName: "TextCell",
      ...options.export,
    },
  });
}

export { defaultTextCell, createTextColumn };
