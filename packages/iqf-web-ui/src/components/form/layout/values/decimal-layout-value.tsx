import {
  DecimalValue,
  type DecimalValueProps,
} from "../../values/decimal-value";
import { LayoutGroupItem } from "../layout-group-item";
import { type CommonLayoutValueProps } from "./types";

export type DecimalLayoutValueProps = DecimalValueProps &
  CommonLayoutValueProps;

export function DecimalLayoutValue({
  label,
  layoutClassName,
  labelClassName,
  ...props
}: DecimalLayoutValueProps) {
  return (
    <LayoutGroupItem
      label={label}
      className={layoutClassName}
      labelClassName={labelClassName}
    >
      <DecimalValue {...props} />
    </LayoutGroupItem>
  );
}
