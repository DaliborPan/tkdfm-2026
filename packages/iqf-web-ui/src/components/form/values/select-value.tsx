import { type SelectProps } from "../../atoms/select";
import {
  type ComboboxBaseOptionType,
  defaultIdMapper,
  defaultOptionLabelMapper,
} from "../../molecules/combobox";
import { TextValue } from "./text-value";

export type SelectValueProps<
  TValueItem,
  TOption extends ComboboxBaseOptionType,
> = Pick<
  SelectProps<TValueItem, TOption>,
  "idMapper" | "optionLabelMapper" | "options" | "className"
> &
  (
    | {
        value?: TValueItem | null;
        multiple?: false;
      }
    | {
        value?: TValueItem[] | null;
        multiple: true;
      }
  );

export function SelectValue<
  TValueItem,
  TOption extends ComboboxBaseOptionType,
>({
  value,
  options,
  className = "",
  multiple,

  idMapper = defaultIdMapper,
  optionLabelMapper = defaultOptionLabelMapper,
}: SelectValueProps<TValueItem, TOption>) {
  let textValue = "";

  // Allowing value to be `false` (boolean)
  if (value !== undefined && value !== null) {
    if (multiple) {
      textValue = options
        .filter((option) => value.find((item) => idMapper(item) === option.id))
        .map((option) => optionLabelMapper(option))
        .join(", ");
    } else {
      const option = options.find((option) => idMapper(value) === option.id);

      if (option) {
        textValue = optionLabelMapper(option);
      }
    }
  }

  return <TextValue value={textValue} className={className} />;
}
