import { Select, type SelectOptionType } from "../../../atoms/select";
import { defaultOptionLabelMapper } from "../../../molecules/combobox";
import { type FilterComponentProps } from "../../types";
import { BaseFilterField } from "../base-filter-field";

function EnumeratedFilterFieldContent({
  onChange,
  options,
}: Pick<Required<FilterComponentProps>, "options"> & {
  onChange: (value: SelectOptionType | null) => void;
}) {
  return (
    <Select
      className="relative"
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={true}
      onChange={onChange}
      options={options}
      value={null}
    />
  );
}

export function EnumeratedFilterField(props: FilterComponentProps) {
  return (
    <BaseFilterField
      {...props}
      labelMapper={defaultOptionLabelMapper}
      content={({ onChange }) => (
        <EnumeratedFilterFieldContent
          onChange={(value) => onChange({ value })}
          options={props.options ?? []}
        />
      )}
    />
  );
}

/**
 * @deprecated Use `EnumeratedFilterField` instead.
 */
export const FilterEnumeratedField = EnumeratedFilterField;
