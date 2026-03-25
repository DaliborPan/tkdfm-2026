import { type BaseObject } from "../../../../../evidence/base";
import { LayoutGroupItem } from "../../layout-group-item";
import {
  AutocompleteValue,
  type AutocompleteValueProps,
} from "../value/autocomplete-value";

export type StaticAutocompleteFieldProps<T extends BaseObject> =
  AutocompleteValueProps<T> & {
    label?: string;
  };

/**
 * @deprecated use *LayoutValue from `iqf-web-ui/form-layout-values` instead
 */
export function StaticAutocompleteField<T extends BaseObject>({
  label,
  ...props
}: StaticAutocompleteFieldProps<T>) {
  return (
    <LayoutGroupItem label={label}>
      <AutocompleteValue {...props} />
    </LayoutGroupItem>
  );
}
