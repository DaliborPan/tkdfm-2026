import { type BaseObject } from "../../../evidence/base";
import { TextValue } from "./text-value";

export type AutocompleteValueProps<T extends BaseObject> = {
  labelMapper: (value: T) => string;
  className?: string;
} & (
  | {
      value?: T | null;
      multiple?: false;
    }
  | {
      value?: T[];
      multiple: true;
    }
);

/**
 * @deprecated use `ComboboxValue` instead
 */
export function AutocompleteValue<T extends BaseObject>({
  value,
  labelMapper,
  multiple,
  className = "",
}: AutocompleteValueProps<T>) {
  let textValue = "";

  if (value) {
    if (multiple) {
      textValue = value.map((value) => labelMapper(value)).join(", ");
    } else {
      textValue = labelMapper(value);
    }
  }

  return <TextValue value={textValue} className={className} />;
}
