import { LayoutGroupItem } from "../../layout-group-item";
import { NumberValue, type NumberValueProps } from "../value/number-value";

export type StaticNumberFieldProps = {
  label: string;
} & NumberValueProps;

/**
 * @deprecated use *LayoutValue from `iqf-web-ui/form-layout-values` instead
 */
export function StaticNumberField({ label, ...props }: StaticNumberFieldProps) {
  return (
    <LayoutGroupItem label={label}>
      <NumberValue {...props} />
    </LayoutGroupItem>
  );
}
