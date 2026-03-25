import { ChipValue, type ChipValueProps } from "../../values/chip-value";
import { LayoutGroupItem } from "../layout-group-item";
import { type CommonLayoutValueProps } from "./types";

export type ChipLayoutValueProps = ChipValueProps & CommonLayoutValueProps;

export function ChipLayoutValue({
  label,
  layoutClassName,
  labelClassName,
  ...props
}: ChipLayoutValueProps) {
  return (
    <LayoutGroupItem
      label={label}
      className={layoutClassName}
      labelClassName={labelClassName}
    >
      <ChipValue {...props} />
    </LayoutGroupItem>
  );
}
