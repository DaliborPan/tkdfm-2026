import { type CellContext } from "@tanstack/react-table";
import { CalendarRange } from "lucide-react";

import { type BaseObject } from "../../../../evidence/base";
import { createBaseColumn } from "../base-column";
import type {
  DateTimeColumnFilterOperation,
  DateTimeTableColumnOptions,
  FilterComponentMap,
  RangeValue,
} from "../types";
import {
  dateTimeEqFilterDefaults,
  dateTimeGteFilterDefaults,
  dateTimeInRangeFilterDefaults,
  dateTimeLteFilterDefaults,
} from "./const";

const filterComponentMap: FilterComponentMap<DateTimeColumnFilterOperation> = {
  IN_RANGE: dateTimeInRangeFilterDefaults,
  EQ: dateTimeEqFilterDefaults,
  LTE: dateTimeLteFilterDefaults,
  GTE: dateTimeGteFilterDefaults,
};

const defaultCellLabelMapper = (value: string) =>
  new Date(value).toLocaleString("cs-CZ");

export function defaultDateTimeCell<TData, TValue>({
  getValue,
  column,
}: CellContext<TData, TValue>) {
  const cellLabelMapper =
    column.columnDef.meta?.cellLabelMapper ?? defaultCellLabelMapper;

  const value = getValue() as string | undefined;

  return value && cellLabelMapper(value);
}

export function defaultDateTimeFilterLabelMapper(value: RangeValue | string) {
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

export function createDateTimeColumn<T extends BaseObject>({
  filterOperation = "IN_RANGE",
  cell = defaultDateTimeCell,
  Icon = CalendarRange,
  minSize = 200,

  filterLabelMapper = defaultDateTimeFilterLabelMapper,

  ...options
}: DateTimeTableColumnOptions<T>) {
  const { FilterComponent, createFilter } = filterComponentMap[filterOperation];

  return createBaseColumn({
    ...options,
    type: "DATE_TIME",

    filterOperation,
    cell,
    Icon,
    minSize,

    filterLabelMapper,

    createFilter: options.createFilter ?? createFilter,
    FilterComponent: options.FilterComponent ?? FilterComponent,

    export: {
      cellComponentName: "DateTimeCell",
    },
  });
}
