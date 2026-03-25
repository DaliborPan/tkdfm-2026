import {
  CheckboxGroupField,
  type CheckboxGroupFieldProps,
} from "../../fields/checkbox-group-field";
import { LayoutGroupFieldItem } from "../layout-group-field-item";
import { type CommonLayoutFieldProps } from "./types";

export type CheckboxGroupLayoutFieldProps = CheckboxGroupFieldProps &
  CommonLayoutFieldProps;

export function CheckboxGroupLayoutField({
  label,
  name,
  layoutClassName,
  labelClassName,
  tooltip,
  ...props
}: CheckboxGroupLayoutFieldProps) {
  return (
    <LayoutGroupFieldItem
      name={name}
      label={label}
      required={props.required}
      className={layoutClassName}
      labelClassName={labelClassName}
      tooltip={tooltip}
    >
      <CheckboxGroupField {...props} name={name} />
    </LayoutGroupFieldItem>
  );
}
