import { type BooleanType } from "iqf-web-ui/boolean";

import { type ApiFilter, type CreateFilterProps } from "../../types";
import { enumeratedFilterDefaults } from "../enumerated";

export function createInEqBooleanFilter({
  filterId,
  filterValue,
}: CreateFilterProps<{
  id: BooleanType;
}>): ApiFilter {
  return {
    column: "ENUM",
    name: filterId,
    value: filterValue.map((value) => value.id === "true"),
  };
}

function createNullFilterCallback(filterOperation: "IS_NULL" | "NOT_NULL") {
  return ({
    filterId,
    filterValue,
  }: CreateFilterProps<{ id: BooleanType }>): ApiFilter => {
    const value = filterValue.at(0)?.id;

    const trueOperation = filterOperation;
    const falseOperation = trueOperation === "IS_NULL" ? "NOT_NULL" : "IS_NULL";

    return {
      field: filterId,
      operation:
        value === "true" || value === true ? trueOperation : falseOperation,
    };
  };
}

export const createIsNullBooleanFilter = createNullFilterCallback("IS_NULL");
export const createNotNullBooleanFilter = createNullFilterCallback("NOT_NULL");

export const booleanFilterDefaults = {
  FilterComponent: enumeratedFilterDefaults.FilterComponent,
  createInEqBooleanFilter,
  createIsNullBooleanFilter,
  createNotNullBooleanFilter,
};
