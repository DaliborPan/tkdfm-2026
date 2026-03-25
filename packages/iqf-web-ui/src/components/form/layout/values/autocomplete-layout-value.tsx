import { type BaseObject } from "../../../../evidence/base";
import {
  AutocompleteValue,
  type AutocompleteValueProps,
} from "../../values/autocomplete-value";
import { LayoutGroupItem } from "../layout-group-item";
import { type CommonLayoutValueProps } from "./types";

export type AutocompleteLayoutValueProps<T extends BaseObject> =
  AutocompleteValueProps<T> & CommonLayoutValueProps;

/**
 * @deprecated use `ComboboxLayoutValue` instead
 */
export function AutocompleteLayoutValue<T extends BaseObject>({
  label,
  layoutClassName,
  labelClassName,
  ...props
}: AutocompleteLayoutValueProps<T>) {
  return (
    <LayoutGroupItem
      label={label}
      className={layoutClassName}
      labelClassName={labelClassName}
    >
      <AutocompleteValue {...props} />
    </LayoutGroupItem>
  );
}
