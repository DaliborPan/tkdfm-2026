import { type BaseObject } from "../../../../evidence/base";
import { RadioField, type RadioFieldProps } from "../../fields/radio-field";
import { LayoutGroupFieldItem } from "../layout-group-field-item";
import { type CommonLayoutFieldProps } from "./types";

export type RadioLayoutFieldProps<T extends BaseObject> = RadioFieldProps<T> &
  CommonLayoutFieldProps;

export function RadioLayoutField<T extends BaseObject>({
  label,
  name,
  layoutClassName,
  labelClassName,
  tooltip,
  ...props
}: RadioLayoutFieldProps<T>) {
  return (
    <LayoutGroupFieldItem
      name={name}
      label={label}
      required={props.required}
      className={layoutClassName}
      labelClassName={labelClassName}
      tooltip={tooltip}
    >
      <RadioField {...props} name={name} />
    </LayoutGroupFieldItem>
  );
}
