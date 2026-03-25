import { DialogValue, type DialogValueProps } from "../../values/dialog-value";
import { LayoutGroupItem } from "../layout-group-item";
import { type CommonLayoutValueProps } from "./types";

export type DialogLayoutValueProps = DialogValueProps & CommonLayoutValueProps;

export function DialogLayoutValue({
  label,
  layoutClassName,
  labelClassName,
  ...props
}: DialogLayoutValueProps) {
  return (
    <LayoutGroupItem
      label={label}
      className={layoutClassName}
      labelClassName={labelClassName}
    >
      <DialogValue {...props} title={label} />
    </LayoutGroupItem>
  );
}
