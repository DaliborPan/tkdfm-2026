import { enumeratedFilterDefaults } from "../enumerated";
import { ComboboxFilterField } from "./combobox-filter-field";

export const comboboxFilterDefaults = {
  FilterComponent: ComboboxFilterField,
  createFilter: enumeratedFilterDefaults.createFilter,
};
