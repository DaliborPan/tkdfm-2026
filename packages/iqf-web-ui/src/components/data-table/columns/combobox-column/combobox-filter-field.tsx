import { type BaseObject } from "../../../../evidence/base";
import {
  Combobox,
  defaultOptionLabelMapper,
} from "../../../molecules/combobox";
import { type FilterComponentProps } from "../../types";
import { BaseFilterField } from "../base-filter-field";

function ComboboxFilterFieldContent({
  id,
  onChange,
  comboboxOptions,
  optionLabelMapper,
}: Pick<
  FilterComponentProps,
  "comboboxOptions" | "id" | "optionLabelMapper"
> & {
  onChange: (value: BaseObject | null) => void;
}) {
  if (!comboboxOptions || !id) return null;

  return (
    <Combobox
      value={null}
      options={comboboxOptions}
      queryKeyId={id}
      onChange={onChange}
      optionLabelMapper={optionLabelMapper}
    />
  );
}

export function ComboboxFilterField({
  optionLabelMapper = defaultOptionLabelMapper,
  comboboxOptions,
  ...props
}: FilterComponentProps) {
  return (
    <BaseFilterField
      {...props}
      labelMapper={optionLabelMapper}
      content={({ onChange }) => (
        <ComboboxFilterFieldContent
          id={props.id}
          comboboxOptions={comboboxOptions}
          optionLabelMapper={optionLabelMapper}
          onChange={(value) => onChange({ value })}
        />
      )}
    />
  );
}
