import {
  DecimalField,
  type DecimalFieldProps,
} from "../../fields/decimal-field";
import { LayoutGroupFieldItem } from "../layout-group-field-item";
import { type CommonLayoutFieldProps } from "./types";

export type DecimalLayoutFieldProps = DecimalFieldProps &
  CommonLayoutFieldProps;

export function DecimalLayoutField({
  label,
  name,
  layoutClassName,
  labelClassName,
  tooltip,
  ...props
}: DecimalLayoutFieldProps) {
  return (
    <LayoutGroupFieldItem
      name={name}
      label={label}
      required={props.required}
      className={layoutClassName}
      labelClassName={labelClassName}
      tooltip={tooltip}
    >
      <DecimalField {...props} name={name} />
    </LayoutGroupFieldItem>
  );
}
