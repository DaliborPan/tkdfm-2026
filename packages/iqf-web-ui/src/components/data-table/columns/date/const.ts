import {
  type ApiFilter,
  type CreateFilterProps,
  type FilterOperation,
} from "../../types";
import { type RangeValue } from "../types";

export function createDateFilterCallback({
  filterOperation,
  valueMapper,
}: {
  filterOperation: FilterOperation;
  valueMapper: (value: string) => string;
}) {
  return ({ filterId, filterValue }: CreateFilterProps<string>): ApiFilter => ({
    operation: "OR",
    filters: filterValue.map((value) => ({
      field: filterId,
      value: valueMapper(value),
      operation: filterOperation,
    })),
  });
}

export function getISOStringWithCorrectTimezone(value: string) {
  return new Date(value).toISOString();
}

export function createRangeFilterCallback({
  valueMapper,
}: {
  valueMapper: (value: string) => string;
}) {
  return ({
    filterValue,
    filterId,
  }: CreateFilterProps<RangeValue>): ApiFilter => {
    const createRange = (range: RangeValue, filterId: string): ApiFilter => {
      const rangeFilter: ApiFilter[] = [];

      if (range.from) {
        rangeFilter.push({
          field: filterId,
          value: valueMapper(range.from),
          operation: "GTE",
        });
      }

      if (range.to) {
        rangeFilter.push({
          field: filterId,
          value: valueMapper(range.to),
          operation: "LTE",
        });
      }

      return {
        operation: "AND",
        filters: rangeFilter,
      };
    };

    return {
      operation: "OR",
      filters: filterValue.map((r) => createRange(r, filterId)),
    };
  };
}
