import { type BaseObject } from "../../../../../evidence/base";
import { type SelectOptionType } from "../../../../atoms/select";
import { TextValue } from "./text-value";

export type SelectValueProps<TValue, TOption extends BaseObject> = {
  options: TOption[];
  idMapper: (value: NonNullable<TValue>) => string;
  titleMapper?: (value: TOption) => string;
  className?: string;
} & (
  | {
      value: TValue;
      multiple?: false;
    }
  | {
      value: Array<NonNullable<TValue>>;
      multiple: true;
    }
);

export function SelectValue<TValue, TOption extends BaseObject>({
  value,
  multiple,
  options,
  idMapper,
  titleMapper = (value) => (value as SelectOptionType).title,
  className = "",
}: SelectValueProps<TValue, TOption>) {
  let textValue = "";

  if (value !== undefined && value !== null) {
    if (multiple && Array.isArray(value)) {
      textValue = options
        .filter((option) => value.find((item) => idMapper(item) === option.id))
        .map((option) => titleMapper(option))
        .join(", ");
    } else {
      const option = options.find(
        (option) => idMapper(value as NonNullable<TValue>) === option.id,
      );

      if (option) {
        textValue = titleMapper(option);
      }
    }
  }

  return <TextValue value={textValue} className={className} />;
}
