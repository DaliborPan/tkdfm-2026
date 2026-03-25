import { type BaseObject } from "../../../../evidence/base";
import {
  AutocompleteField,
  type AutocompleteFieldProps,
} from "../../fields/autocomplete-field";
import { LayoutGroupFieldItem } from "../layout-group-field-item";
import { type CommonLayoutFieldProps } from "./types";

export type AutocompleteLayoutFieldProps<T extends BaseObject> =
  AutocompleteFieldProps<T> & CommonLayoutFieldProps;

/**
 * @deprecated use `ComboboxLayoutField` instead
 */
export function AutocompleteLayoutField<T extends BaseObject>({
  label,
  name,
  layoutClassName = "",
  labelClassName = "",
  ...props
}: AutocompleteLayoutFieldProps<T>) {
  return (
    <LayoutGroupFieldItem
      name={name}
      label={label}
      required={props.required}
      className={layoutClassName}
      labelClassName={labelClassName}
    >
      <AutocompleteField {...props} name={name} />
    </LayoutGroupFieldItem>
  );
}
