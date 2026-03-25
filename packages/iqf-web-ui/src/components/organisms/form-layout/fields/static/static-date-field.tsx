import { LayoutGroupItem } from "../../layout-group-item";
import { DateValue, type DateValueProps } from "../value/date-value";

export type StaticDateFieldProps = {
  label?: string;
  layoutClassName?: string;
  labelClassName?: string;
} & DateValueProps;

/**
 * @deprecated use *LayoutValue from `iqf-web-ui/form-layout-values` instead
 */
export function StaticDateField({
  label,
  layoutClassName,
  labelClassName,
  ...props
}: StaticDateFieldProps) {
  return (
    <LayoutGroupItem
      label={label}
      className={layoutClassName}
      labelClassName={labelClassName}
    >
      <DateValue {...props} />
    </LayoutGroupItem>
  );
}
