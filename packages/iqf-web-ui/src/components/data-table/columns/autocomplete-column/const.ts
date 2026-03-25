import { type BaseObject } from "../../../../evidence/base";
import { type ApiFilter, type CreateFilterProps } from "../../types";
import { AutocompleteFilterField } from "./autocomplete-filter-field";

export function createAutocompleteFilter(
  props: CreateFilterProps<BaseObject>,
): ApiFilter {
  const { filterId, filterValue } = props;

  return {
    field: filterId,
    values: filterValue.map((value) => value.id),
    operation: "IN",
  };
}

export const autocompleteFilterDefaults = {
  FilterComponent: AutocompleteFilterField,
  createFilter: createAutocompleteFilter,
};
