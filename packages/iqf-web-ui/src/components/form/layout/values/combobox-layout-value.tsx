import { type BaseObject } from "../../../../evidence/base";
import {
  ComboboxValue,
  type ComboboxValueProps,
} from "../../values/combobox-value";
import { LayoutGroupItem } from "../layout-group-item";
import { type CommonLayoutValueProps } from "./types";

export type ComboboxLayoutValueProps<
  TValueItem = BaseObject,
  TOption extends BaseObject = BaseObject,
> = ComboboxValueProps<TValueItem, TOption> & CommonLayoutValueProps;

export function ComboboxLayoutValue<
  TValueItem = BaseObject,
  TOption extends BaseObject = BaseObject,
>({
  label,
  layoutClassName,
  labelClassName,
  ...props
}: ComboboxLayoutValueProps<TValueItem, TOption>) {
  return (
    <LayoutGroupItem
      label={label}
      className={layoutClassName}
      labelClassName={labelClassName}
    >
      <ComboboxValue {...props} />
    </LayoutGroupItem>
  );
}
