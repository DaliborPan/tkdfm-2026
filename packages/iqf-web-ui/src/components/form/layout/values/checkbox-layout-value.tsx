import {
  CheckboxValue,
  type CheckboxValueProps,
} from "../../values/checkbox-value";
import { LayoutGroupItem } from "../layout-group-item";
import { type CommonLayoutValueProps } from "./types";

export type CheckboxLayoutValueProps = CheckboxValueProps &
  CommonLayoutValueProps;

export function CheckboxLayoutValue({
  label,
  labelClassName,
  layoutClassName,
  ...props
}: CheckboxLayoutValueProps) {
  return (
    <LayoutGroupItem
      label={label}
      labelClassName={labelClassName}
      className={layoutClassName}
    >
      <CheckboxValue {...props} />
    </LayoutGroupItem>
  );
}
