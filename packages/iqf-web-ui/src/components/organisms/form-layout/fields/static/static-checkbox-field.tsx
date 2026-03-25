import { LayoutGroupItem } from "../../layout-group-item";
import {
  CheckboxValue,
  type CheckboxValueProps,
} from "../value/checkbox-value";

export type StaticCheckboxFieldProps = {
  label: string;
} & CheckboxValueProps;

/**
 * @deprecated use *LayoutValue from `iqf-web-ui/form-layout-values` instead
 */
export function StaticCheckboxField({
  label,
  value,
}: StaticCheckboxFieldProps) {
  return (
    <LayoutGroupItem label={label}>
      <CheckboxValue value={value} />
    </LayoutGroupItem>
  );
}
