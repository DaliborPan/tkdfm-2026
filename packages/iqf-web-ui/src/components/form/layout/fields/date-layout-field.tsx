import { DateField, type DateFieldProps } from "../../fields/date-field";
import { LayoutGroupFieldItem } from "../layout-group-field-item";
import { type CommonLayoutFieldProps } from "./types";

export type DateLayoutFieldProps = DateFieldProps & CommonLayoutFieldProps;

export function DateLayoutField({
  label,
  name,
  layoutClassName,
  labelClassName,
  tooltip,
  ...props
}: DateLayoutFieldProps) {
  return (
    <LayoutGroupFieldItem
      name={name}
      label={label}
      required={props.required}
      className={layoutClassName}
      labelClassName={labelClassName}
      tooltip={tooltip}
    >
      <DateField {...props} name={name} />
    </LayoutGroupFieldItem>
  );
}
