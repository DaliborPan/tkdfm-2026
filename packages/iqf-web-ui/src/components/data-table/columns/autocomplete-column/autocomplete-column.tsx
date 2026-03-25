import { type CellContext } from "@tanstack/react-table";
import { Hash } from "lucide-react";

import { type BaseObject } from "../../../../evidence/base";
import { createBaseColumn } from "../base-column";
import {
  type AutocompleteColumnFilterOperation,
  type AutocompleteTableColumnOptions,
  type FilterComponentMap,
} from "../types";
import { autocompleteFilterDefaults } from "./const";

export function defaultAutocompleteCell<TData extends BaseObject, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  const value = getValue() as string | undefined;

  return value;
}

const filterComponentMap: FilterComponentMap<AutocompleteColumnFilterOperation> =
  {
    IN: autocompleteFilterDefaults,
  };

export function createAutocompleteColumn<
  TData extends BaseObject,
  TAutocompleteType extends BaseObject,
>({
  cell = defaultAutocompleteCell,
  Icon = Hash,

  ...options
}: AutocompleteTableColumnOptions<TData, TAutocompleteType>) {
  const filterOperation = "IN";
  const { createFilter, FilterComponent } = filterComponentMap[filterOperation];

  return createBaseColumn({
    ...options,
    type: "AUTOCOMPLETE",

    filterOperation,
    cell,
    Icon,

    createFilter: options.createFilter ?? createFilter,
    FilterComponent: options.FilterComponent ?? FilterComponent,

    export: {
      cellComponentName: "TextCell",
      ...options.export,
    },
  });
}
