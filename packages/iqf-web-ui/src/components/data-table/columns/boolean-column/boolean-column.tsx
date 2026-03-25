import { type CellContext } from "@tanstack/react-table";
import { Check, Waypoints, X } from "lucide-react";

import { useBooleanOptions } from "../../../../boolean";
import { type BaseObject } from "../../../../evidence/base";
import { Icon } from "../../../atoms/icon";
import { createBaseColumn } from "../base-column";
import {
  type BooleanColumnFilterOperation,
  type BooleanTableColumnOptions,
  type FilterComponentMap,
} from "../types";
import {
  booleanFilterDefaults,
  createInEqBooleanFilter,
  createIsNullBooleanFilter,
  createNotNullBooleanFilter,
} from "./const";

function booleanCellCallback<T extends BaseObject, TValue = any>(
  cellMapper: NonNullable<BooleanTableColumnOptions<T>["cellMapper"]>,
  valueMapper: BooleanTableColumnOptions<T>["valueMapper"],
) {
  return ({
    getValue,
    cell,
    row,
  }: CellContext<T, TValue>): string | React.ReactNode => {
    const filterOperation = cell.column.columnDef.meta?.filterOperation;

    if (filterOperation !== "IN_EQ" && !valueMapper) {
      throw new Error(
        `valueMapper is required for boolean column, when filterOperation is ${filterOperation}. Column name is "${cell.column.id}."`,
      );
    }

    const value = getValue();
    const options = cell.column.columnDef.meta?.filterComponentProps?.options;

    const mappedValue = valueMapper?.(row.original);

    const isTrue = !valueMapper ? value === "true" || !!value : !!mappedValue;

    const text = options?.find(
      (option) => option.id === (isTrue ? "true" : "false"),
    )?.title;

    return cellMapper({
      text: text ?? "",
      value: isTrue,
    });
  };
}

function defaultCelllMapper<T extends BaseObject>({
  text,
  value,
}: Parameters<NonNullable<BooleanTableColumnOptions<T>["cellMapper"]>>[0]) {
  return (
    <div className="flex items-center gap-x-2">
      <Icon Icon={!value ? X : Check} className="size-3" />
      <span>{text}</span>
    </div>
  );
}

const filterComponentMap: FilterComponentMap<BooleanColumnFilterOperation> = {
  IN_EQ: {
    FilterComponent: booleanFilterDefaults.FilterComponent,
    createFilter: createInEqBooleanFilter,
  },
  IS_NULL: {
    FilterComponent: booleanFilterDefaults.FilterComponent,
    createFilter: createIsNullBooleanFilter,
  },
  NOT_NULL: {
    FilterComponent: booleanFilterDefaults.FilterComponent,
    createFilter: createNotNullBooleanFilter,
  },
};

export function useBooleanColumn<T extends BaseObject>({
  filterOperation = "IN_EQ",
  Icon = Waypoints,
  cellMapper = defaultCelllMapper,
  valueMapper,

  ...options
}: BooleanTableColumnOptions<T>) {
  const { createFilter, FilterComponent } = filterComponentMap[filterOperation];

  const booleanOptions = useBooleanOptions();

  return createBaseColumn({
    ...options,
    type: "ENUM",

    filterOperation,
    cell: booleanCellCallback(cellMapper, valueMapper),
    Icon,

    options: options.options ?? booleanOptions,

    createFilter: options.createFilter ?? createFilter,
    FilterComponent: options.FilterComponent ?? FilterComponent,

    export: {
      cellComponentName: "TextCell",
      valueMapperName: "selectColumnMapper",

      valueMapperData: (options.options ?? booleanOptions).map((option) => ({
        id: option.id === "true",
        name: option.title,
      })),

      ...options.export,
    },
  });
}
