import { ChipField, type ChipFieldProps } from "../../fields/chip-field";
import { LayoutGroupFieldItem } from "../layout-group-field-item";
import { type CommonLayoutFieldProps } from "./types";

export type ChipLayoutFieldProps = ChipFieldProps & CommonLayoutFieldProps;

export function ChipLayoutField({
  label,
  name,
  layoutClassName,
  labelClassName,
  tooltip,
  ...props
}: ChipLayoutFieldProps) {
  return (
    <LayoutGroupFieldItem
      name={name}
      label={label}
      required={props.required}
      className={layoutClassName}
      labelClassName={labelClassName}
      tooltip={tooltip}
    >
      <ChipField {...props} name={name} />
    </LayoutGroupFieldItem>
  );
}
