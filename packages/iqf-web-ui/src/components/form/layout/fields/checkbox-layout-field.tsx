import { cn } from "../../../../utils/cn";
import {
  CheckboxField,
  type CheckboxFieldProps,
} from "../../fields/checkbox-field";
import { LayoutGroupFieldItem } from "../layout-group-field-item";
import { type CommonLayoutFieldProps } from "./types";

export type CheckboxLayoutFieldProps = CheckboxFieldProps &
  CommonLayoutFieldProps;

export function CheckboxLayoutField({
  label,
  name,
  layoutClassName,
  labelClassName,
  valueClassName,
  tooltip,
  ...props
}: CheckboxLayoutFieldProps) {
  return (
    <LayoutGroupFieldItem
      name={name}
      label={label}
      required={props.required}
      className={layoutClassName}
      labelClassName={labelClassName}
      tooltip={tooltip}
    >
      <CheckboxField
        {...props}
        name={name}
        valueClassName={cn("py-[5px] h-8", valueClassName)}
      />
    </LayoutGroupFieldItem>
  );
}
