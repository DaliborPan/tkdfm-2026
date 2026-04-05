import { type SelectObject } from "iqf-web-ui/select";

import { type ApiFilter, type CreateFilterProps } from "../../types";
import { EnumeratedFilterField } from "./enumerated-filter-field";

export function createEnumeratedFilter(
  props: CreateFilterProps<SelectObject>,
): ApiFilter {
  const { filterId, filterValue } = props;

  return {
    column: "ENUM",
    name: filterId,
    value: filterValue.map((value) => value.id),
  };
}

export const enumeratedFilterDefaults = {
  FilterComponent: EnumeratedFilterField,
  createFilter: createEnumeratedFilter,
};
