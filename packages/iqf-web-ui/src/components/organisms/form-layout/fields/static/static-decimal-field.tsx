import { LayoutGroupItem } from "../../layout-group-item";
import { DecimalValue, type DecimalValueProps } from "../value/decimal-value";

export type StaticDecimalFieldProps = {
  label: string;
} & DecimalValueProps;

/**
 * @deprecated use *LayoutValue from `iqf-web-ui/form-layout-values` instead
 */
export function StaticDecimalField({
  label,
  ...props
}: StaticDecimalFieldProps) {
  return (
    <LayoutGroupItem label={label}>
      <DecimalValue {...props} />
    </LayoutGroupItem>
  );
}
