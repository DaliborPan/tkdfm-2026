import { defaultOptionLabelMapper } from "iqf-web-ui/combobox";
import { Select, type SelectObject } from "iqf-web-ui/select";

import { type FilterComponentProps } from "../../types";
import { BaseFilterField } from "../base-filter-field";

function EnumeratedFilterFieldContent({
  onChange,
  options,
}: Pick<Required<FilterComponentProps>, "options"> & {
  onChange: (value: SelectObject | null) => void;
}) {
  return (
    <Select
      className="relative"
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
