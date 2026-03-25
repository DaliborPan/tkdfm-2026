import { type CellContext } from "@tanstack/react-table";
import { CalendarRange } from "lucide-react";

import { type BaseObject } from "../../../../evidence/base";
import { createBaseColumn } from "../base-column";
import {
  type DateColumnFilterOperation,
  type DateTableColumnOptions,
  type FilterComponentMap,
  type RangeValue,
} from "../types";
import {
  dateEqFilterDefaults,
  dateGteFilterDefaults,
  dateInRageFilterDefaults,
  dateLteFilterDefaults,
} from "./const";

const defaultCellLabelMapper = (value: string) =>
  new Date(value).toLocaleString("cs-CZ", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

function defaultDateCell<TData, TValue>({
  getValue,
  column,
}: CellContext<TData, TValue>) {
  const cellLabelMapper =
    column.columnDef.meta?.cellLabelMapper ?? defaultCellLabelMapper;

  const value = getValue() as string | undefined;

  return value && cellLabelMapper(value);
}

export function defaultDateFilterLabelMapper(value: RangeValue | string) {
  if (typeof value === "string") {
    return defaultCellLabelMapper(value);
  }
  const fromLabel = value.from ? defaultCellLabelMapper(value.from) : "";
  const toLabel = value.to ? defaultCellLabelMapper(value.to) : "";

  if (!fromLabel) {
    return `Všechno do ${toLabel}`;
  }

  if (!toLabel) {
    return `Všechno od ${fromLabel}`;
  }

  return `${fromLabel} - ${toLabel}`;
}

const filterComponentMap: FilterComponentMap<DateColumnFilterOperation> = {
  IN_RANGE: dateInRageFilterDefaults,
  EQ: dateEqFilterDefaults,
  LTE: dateLteFilterDefaults,
  GTE: dateGteFilterDefaults,
};

export function createDateColumn<T extends BaseObject>({
  filterOperation = "IN_RANGE",
  cell = defaultDateCell,
  Icon = CalendarRange,
  minSize = 200,

  filterLabelMapper = defaultDateFilterLabelMapper,

  ...options
}: DateTableColumnOptions<T>) {
  const { createFilter, FilterComponent } = filterComponentMap[filterOperation];

  return createBaseColumn({
    ...options,
    type: "DATE",

    filterOperation,
    cell,
    Icon,
    minSize,

    filterLabelMapper,

    createFilter: options.createFilter ?? createFilter,
    FilterComponent: options.FilterComponent ?? FilterComponent,

    export: {
      cellComponentName: "DateCell",
    },
  });
}
