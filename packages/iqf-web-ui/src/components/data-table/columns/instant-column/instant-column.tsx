import { CalendarRange } from "lucide-react";

import { type BaseObject } from "../../../../evidence/base";
import { createBaseColumn } from "../base-column";
import {
  dateTimeEqFilterDefaults,
  dateTimeGteFilterDefaults,
  dateTimeLteFilterDefaults,
  defaultDateTimeCell,
  defaultDateTimeFilterLabelMapper,
} from "../date-time-column";
import {
  type FilterComponentMap,
  type InstantColumnFilterOperation,
  type InstantTableColumnOptions,
} from "../types";
import { instantInRangeFilterDefaults } from "./const";

const filterComponentMap: FilterComponentMap<InstantColumnFilterOperation> = {
  IN_RANGE: instantInRangeFilterDefaults,
  EQ: dateTimeEqFilterDefaults,
  LTE: dateTimeLteFilterDefaults,
  GTE: dateTimeGteFilterDefaults,
};

export function createInstantColumn<T extends BaseObject>({
  filterOperation = "IN_RANGE",
  cell = defaultDateTimeCell,
  Icon = CalendarRange,
  minSize = 200,

  filterLabelMapper = defaultDateTimeFilterLabelMapper,

  ...options
}: InstantTableColumnOptions<T>) {
  const { createFilter, FilterComponent } = filterComponentMap[filterOperation];

  return createBaseColumn({
    ...options,
    type: "INSTANT",

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
