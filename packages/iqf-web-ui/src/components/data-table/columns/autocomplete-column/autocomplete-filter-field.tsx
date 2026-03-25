import { type BaseObject } from "../../../../evidence/base";
import { Autocomplete } from "../../../molecules/autocomplete";
import { type FilterComponentProps } from "../../types";
import { BaseFilterField } from "../base-filter-field/base-filter-field";

function AutocompleteFilterFieldContent({
  autocompleteOptions,
  labelMapper,
  onChange,
  id,
}: Pick<FilterComponentProps, "id" | "autocompleteOptions" | "labelMapper"> & {
  onChange: (value: BaseObject[] | null) => void;
}) {
  if (!id || !autocompleteOptions || !labelMapper) return null;

  return (
    <Autocomplete
      queryKeyId={id}
      multiple={true}
      showSelectedList={false}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={true}
      options={autocompleteOptions}
      labelMapper={labelMapper}
      onChange={(value) => {
        if (!Array.isArray(value)) return;

        onChange(value);
      }}
    />
  );
}

function defaultFilterLabelMapper(value: BaseObject & { title?: string }) {
  return value.title ?? "Bez názvu";
}

export function AutocompleteFilterField({
  labelMapper = defaultFilterLabelMapper,
  ...props
}: FilterComponentProps) {
  return (
    <BaseFilterField
      {...props}
      labelMapper={labelMapper}
      content={({ onChange }) => (
        <AutocompleteFilterFieldContent
          id={props.id}
          labelMapper={labelMapper}
          autocompleteOptions={props.autocompleteOptions}
          onChange={(value) => {
            onChange({ value: value?.[0] });
          }}
        />
      )}
    />
  );
}

/**
 * @deprecated Use `AutocompleteFilterField` instead. Even better - use `ComboboxFilterField`.
 */
export const FilterAutocompleteField = AutocompleteFilterField;
