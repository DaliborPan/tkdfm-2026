import { type ApiFilter, type CreateFilterProps } from "../../types";
import { TextFilterField } from "./text-filter-field";

export function createInLikeTextFilter({
  filterId,
  filterValue,
}: CreateFilterProps<string>): ApiFilter {
  return {
    column: "TEXT",
    name: filterId,
    value: filterValue,
  };
}

export function createInEqTextFilter({
  filterId,
  filterValue,
}: CreateFilterProps<string>): ApiFilter {
  return {
    operation: "OR",
    filters: filterValue.map((value) => ({
      field: filterId,
      value,
      operation: "EQ",
    })),
  };
}

export const textFilterDefaults = {
  FilterComponent: TextFilterField,
  createInLikeTextFilter,
  createInEqTextFilter,
};
