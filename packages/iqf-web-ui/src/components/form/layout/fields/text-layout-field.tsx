import { TextField, type TextFieldProps } from "../../fields/text-field";
import { LayoutGroupFieldItem } from "../layout-group-field-item";
import { type CommonLayoutFieldProps } from "./types";

export type TextLayoutFieldProps = TextFieldProps & CommonLayoutFieldProps;

export function TextLayoutField({
  label,
  name,
  layoutClassName,
  labelClassName,
  tooltip,
  ...props
}: TextLayoutFieldProps) {
  return (
    <LayoutGroupFieldItem
      name={name}
      label={label}
      required={props.required}
      className={layoutClassName}
      labelClassName={labelClassName}
      tooltip={tooltip}
    >
      <TextField {...props} name={name} />
    </LayoutGroupFieldItem>
  );
}
