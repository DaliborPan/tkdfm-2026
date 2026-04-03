import { type CellContext } from "@tanstack/react-table";
import _get from "lodash/get";
import { Hash } from "lucide-react";

import { type BaseObject } from "iqf-web-ui/base";

import { createBaseColumn } from "../base-column";
import {
  type ComboboxColumnFilterOperation,
  type ComboboxTableColumnOptions,
  type FilterComponentMap,
} from "../types";
import { comboboxFilterDefaults } from "./const";

export function defaultComboboxCell<TData extends BaseObject, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  const value = getValue() as string | undefined;

  return value;
}

const filterComponentMap: FilterComponentMap<ComboboxColumnFilterOperation> = {
  IN: comboboxFilterDefaults,
};

export function createComboboxColumn<
  TData extends BaseObject,
  TOption extends BaseObject,
>({
  cell = defaultComboboxCell,
  Icon = Hash,

  ...options
}: ComboboxTableColumnOptions<TData, TOption>) {
  const filterOperation = "IN";
  const { createFilter, FilterComponent } = filterComponentMap[filterOperation];

  return createBaseColumn({
    ...options,
    type: "COMBOBOX",

    filterOperation,
    cell,
    Icon,

    createFilter: options.createFilter ?? createFilter,
    FilterComponent: options.FilterComponent ?? FilterComponent,

    filterFn:
      options.filterFn ??
      ((row, _id, filterValue: TData[]) => {
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
