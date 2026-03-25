import { LayoutGroupItem } from "../../layout-group-item";
import { TextValue, type TextValueProps } from "../value/text-value";

export type StaticTextFieldProps = {
  label?: string;
  layoutClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
} & TextValueProps;

/**
 * @deprecated use *LayoutValue from `iqf-web-ui/form-layout-values` instead
 */
export function StaticTextField({
  label,
  layoutClassName,
  labelClassName,
  valueClassName,
  ...props
}: StaticTextFieldProps) {
  return (
    <LayoutGroupItem
      label={label}
      className={layoutClassName}
      labelClassName={labelClassName}
    >
      <TextValue {...props} className={valueClassName} />
    </LayoutGroupItem>
  );
}
