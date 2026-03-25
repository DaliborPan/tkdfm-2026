import { type BaseObject } from "../../../../evidence/base";
import { type ApiFilter, type CreateFilterProps } from "../../types";
import { ComboboxFilterField } from "./combobox-filter-field";

export function createComboboxFilter(
  props: CreateFilterProps<BaseObject>,
): ApiFilter {
  const { filterId, filterValue } = props;

  return {
    field: filterId,
    values: filterValue.map((value) => value.id),
    operation: "IN",
  };
}

export const comboboxFilterDefaults = {
  FilterComponent: ComboboxFilterField,
  createFilter: createComboboxFilter,
};
