import { type BaseObject } from "../../../evidence/base";
import {
  type CommonComboboxProps,
  getLabelMappers,
} from "../../molecules/combobox";
import { TextValue } from "./text-value";

export type ComboboxValueProps<
  TValueItem = BaseObject,
  TOption extends BaseObject = BaseObject,
> = Pick<
  CommonComboboxProps<TValueItem, TOption>,
  "valueLabelMapper" | "optionLabelMapper"
> & {
  className?: string;
} & (
    | {
        value?: TValueItem | null;
        multiple?: false;
      }
    | {
        value?: TValueItem[] | null;
        multiple: true;
      }
  );

export function ComboboxValue<
  TValueItem = BaseObject,
  TOption extends BaseObject = BaseObject,
>({
  value,
  multiple,
  className = "",

  valueLabelMapper: propsValueLabelMapper,
  optionLabelMapper: propsOptionLabelMapper,
}: ComboboxValueProps<TValueItem, TOption>) {
  const { valueLabelMapper } = getLabelMappers({
    propsOptionLabelMapper,
    propsValueLabelMapper,
  });

  let textValue = "";

  if (value) {
    if (multiple) {
      textValue = value.map((value) => valueLabelMapper(value)).join(", ");
    } else {
      textValue = valueLabelMapper(value);
    }
  }

  return <TextValue value={textValue} className={className} />;
}
