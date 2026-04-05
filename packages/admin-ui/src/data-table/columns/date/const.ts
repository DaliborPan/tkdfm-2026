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
      const value = [
        ...(range.from ? [valueMapper(range.from)] : []),
        ...(range.to ? [valueMapper(range.to)] : []),
      ];

      return {
        name: filterId,
        value,
        column: "DATE",
      };
    };

    // Supporting only single range
    return createRange(filterValue[0], filterId);
  };
}
