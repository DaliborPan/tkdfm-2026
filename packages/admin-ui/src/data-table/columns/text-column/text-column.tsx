import { type CellContext } from "@tanstack/react-table";
import _get from "lodash/get";
import { Hash } from "lucide-react";

import { type BaseObject } from "iqf-web-ui/base";

import { createBaseColumn } from "../base-column";
import {
  type FilterComponentMap,
  type TextColumnFilterOperation,
  type TextTableColumnOptions,
} from "../types";
import { textFilterDefaults } from "./const";

const RED_PREFIX = "X ";

function defaultTextCell<TData, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  const value = getValue();

  return <TextColumnCell value={value} />;
}

export function TextColumnCell({ value }: { value: unknown }) {
  if (typeof value === "string" && value.startsWith(RED_PREFIX)) {
    const displayValue = value.substring(RED_PREFIX.length);

    return <span className="text-error font-medium">{displayValue}</span>;
  }

  return <span>{value as string | undefined}</span>;
}

const filterComponentMap: FilterComponentMap<TextColumnFilterOperation> = {
  IN_LIKE: {
    createFilter: textFilterDefaults.createInLikeTextFilter,
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

    sortingFn: (a, b, columnId) => {
      const valueA = _get(a.original, columnId) as string | undefined;
      const valueB = _get(b.original, columnId) as string | undefined;

      if (!valueA || !valueB) {
        return 0;
      }

      return valueA.localeCompare(valueB, "cs");
    },
    filterFn:
      options.filterFn ??
      ((row, _id, filterValue: string[]) => {
        const id = options.name ?? options.id;

        if (!id) {
          return false;
        }

        const value = _get(row.original, id) as string | undefined;

        if (!value) {
          return false;
        }

        const preparedValue = value.toLowerCase();

        const preparedFilterValues = filterValue.map((filterValue) =>
          filterValue.toLowerCase(),
        );

        return preparedFilterValues.some((preparedFilterValue) =>
          preparedValue.includes(preparedFilterValue),
        );
      }),
  });
}

export { defaultTextCell, createTextColumn };
