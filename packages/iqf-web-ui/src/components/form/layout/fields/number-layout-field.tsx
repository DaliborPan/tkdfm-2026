import { NumberField, type NumberFieldProps } from "../../fields/number-field";
import { LayoutGroupFieldItem } from "../layout-group-field-item";
import { type CommonLayoutFieldProps } from "./types";

export type NumberLayoutFieldProps = NumberFieldProps & CommonLayoutFieldProps;

export function NumberLayoutField({
  label,
  name,
  layoutClassName,
  labelClassName,
  tooltip,
  ...props
}: NumberLayoutFieldProps) {
  return (
    <LayoutGroupFieldItem
      name={name}
      label={label}
      required={props.required}
      className={layoutClassName}
      labelClassName={labelClassName}
      tooltip={tooltip}
    >
      <NumberField {...props} name={name} />
    </LayoutGroupFieldItem>
  );
}
