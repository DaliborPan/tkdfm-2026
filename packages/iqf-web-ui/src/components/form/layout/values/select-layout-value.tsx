import { type BaseObject } from "../../../../evidence/base";
import { SelectValue, type SelectValueProps } from "../../values/select-value";
import { LayoutGroupItem } from "../layout-group-item";
import { type CommonLayoutValueProps } from "./types";

export type SelectLayoutValueProps<
  TValueItem,
  TOption extends BaseObject,
> = SelectValueProps<TValueItem, TOption> & CommonLayoutValueProps;

export function SelectLayoutValue<TValueItem, TOption extends BaseObject>({
  label,
  layoutClassName,
  labelClassName,
  ...props
}: SelectLayoutValueProps<TValueItem, TOption>) {
  return (
    <LayoutGroupItem
      label={label}
      className={layoutClassName}
      labelClassName={labelClassName}
    >
      <SelectValue {...props} />
    </LayoutGroupItem>
  );
}
