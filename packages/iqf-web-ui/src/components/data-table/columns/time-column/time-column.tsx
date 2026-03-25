import { type CellContext } from "@tanstack/react-table";
import { Clock } from "lucide-react";

import { type BaseObject } from "../../../../evidence/base";
import { createBaseColumn } from "../base-column";
import {
  type FilterComponentMap,
  type RangeValue,
  type TimeColumnFilterOperation,
  type TimeTableColumnOptions,
} from "../types";
import {
  timeEqFilterDefaults,
  timeGteFilterDefaults,
  timeInRangeFilterDefaults,
  timeLteFilterDefaults,
} from "./const";

const defaultLabelMapper = (value: string) =>
  new Date(value).toLocaleTimeString("cs-CZ", {
    hour: "2-digit",
    minute: "2-digit",
  });

function timeCell<TData, TValue>({
  getValue,
  column,
}: CellContext<TData, TValue>) {
  const cellLabelMapper =
    column.columnDef.meta?.cellLabelMapper ?? defaultLabelMapper;

  const value = getValue() as string | undefined;

  return value && cellLabelMapper(value);
}

function defaultFilterLabelMapper(value: RangeValue | string) {
  if (typeof value === "string") {
    return value;
  }

  const fromLabel = value.from ?? "";
  const toLabel = value.to ?? "";

  if (!fromLabel) {
    return `Všechno do ${toLabel}`;
  }

  if (!toLabel) {
    return `Všechno od ${fromLabel}`;
  }

  return `${fromLabel} - ${toLabel}`;
}

const filterComponentMap: FilterComponentMap<TimeColumnFilterOperation> = {
  IN_RANGE: timeInRangeFilterDefaults,
  EQ: timeEqFilterDefaults,
  LTE: timeLteFilterDefaults,
  GTE: timeGteFilterDefaults,
};

export function createTimeColumn<T extends BaseObject>({
  filterOperation = "IN_RANGE",
  cell = timeCell,
  Icon = Clock,
  minSize = 100,

  filterLabelMapper = defaultFilterLabelMapper,

  ...options
}: TimeTableColumnOptions<T>) {
  const { createFilter, FilterComponent } = filterComponentMap[filterOperation];

  return createBaseColumn({
    ...options,
    type: "TIME",

    filterOperation,
    cell,
    Icon,
    minSize,

    filterLabelMapper,

    createFilter: options.createFilter ?? createFilter,
    FilterComponent: options.FilterComponent ?? FilterComponent,

    export: {
      cellComponentName: "TimeCell",
    },
  });
}
