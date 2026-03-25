import { type ApiFilter, type CreateFilterProps } from "../../types";
import { TextFilterField } from "./text-filter-field";

export function createInLikeTextFilter({
  filterId,
  filterValue,
}: CreateFilterProps<string>): ApiFilter {
  return {
    operation: "OR",
    filters: filterValue.map((value) => ({
      field: filterId,
      value,
      operation: "LIKE",
    })),
  };
}

export function createInContainsTextFilter({
  filterId,
  filterValue,
}: CreateFilterProps<string>): ApiFilter {
  return {
    operation: "OR",
    filters: filterValue.map((value) => ({
      field: filterId,
      value,
      operation: "CONTAINS",
    })),
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
  createInContainsTextFilter,
  createInLikeTextFilter,
  createInEqTextFilter,
};
