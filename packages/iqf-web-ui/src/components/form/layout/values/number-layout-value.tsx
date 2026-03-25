import { NumberValue, type NumberValueProps } from "../../values/number-value";
import { LayoutGroupItem } from "../layout-group-item";
import { type CommonLayoutValueProps } from "./types";

export type NumberLayoutValueProps = NumberValueProps & CommonLayoutValueProps;

export function NumberLayoutValue({
  label,
  layoutClassName,
  labelClassName,
  ...props
}: NumberLayoutValueProps) {
  return (
    <LayoutGroupItem
      label={label}
      className={layoutClassName}
      labelClassName={labelClassName}
    >
      <NumberValue {...props} />
    </LayoutGroupItem>
  );
}
