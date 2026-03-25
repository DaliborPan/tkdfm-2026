import { type SelectOptionType } from "../../../atoms/select";
import { type ApiFilter, type CreateFilterProps } from "../../types";
import { EnumeratedFilterField } from "./enumerated-filter-field";

export function createEnumeratedFilter(
  props: CreateFilterProps<SelectOptionType>,
): ApiFilter {
  const { filterId, filterValue } = props;

  return {
    field: filterId,
    values: filterValue.map((value) => value.id),
    operation: "IN",
  };
}

export const enumeratedFilterDefaults = {
  FilterComponent: EnumeratedFilterField,
  createFilter: createEnumeratedFilter,
};
