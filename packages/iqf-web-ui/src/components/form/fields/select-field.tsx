import { type ComboboxBaseOptionType } from "../../molecules/combobox";
import { FormSelect, type FormSelectProps } from "../RHF-fields/form-select";
import { useFormContext } from "../context/form-context";
import { FormValue } from "../form-value";
import { SelectValue } from "../values/select-value";
import { type CommonFieldProps, type RenderValueFn } from "./types";

export type SelectFieldProps<
  TValueItem,
  TOption extends ComboboxBaseOptionType,
> = FormSelectProps<TValueItem, TOption> & CommonFieldProps<TValueItem>;

/**
 * Use `FormSelectField` to work with a schema:
 *
 * person: {
 *   type: z.object({
 *     id: z.string(),
 *     title: z.string(),
 *   })
 * }
 */
export function SelectField<
  TValueItem,
  TOption extends ComboboxBaseOptionType,
>({
  name,
  readOnly = false,
  useOptions,
  options: suppliedOptions,
  renderValue,
  valueClassName = "",

  optionLabelMapper,
  idMapper,

  ...props
}: SelectFieldProps<TValueItem, TOption>) {
  const { editing } = useFormContext();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const options = suppliedOptions ?? useOptions();

  const defaultRenderValue: RenderValueFn = (value) => (
    <SelectValue
      value={value}
      options={options}
      idMapper={idMapper}
      optionLabelMapper={optionLabelMapper}
      className={valueClassName}
      multiple={props.multiple}
    />
  );

  return !editing || readOnly ? (
    <FormValue name={name}>
      {(value) =>
        renderValue
          ? renderValue(value, defaultRenderValue)
          : defaultRenderValue(value)
      }
    </FormValue>
  ) : (
    <FormSelect
      {...props}
      id={name}
      name={name}
      idMapper={idMapper}
      optionLabelMapper={optionLabelMapper}
      options={options}
    />
  );
}

export type SimpleSelectFieldProps<
  TValueItem extends string,
  TOption extends { id: TValueItem },
> = SelectFieldProps<TValueItem, TOption>;

/**
 * Use `FormSimpleSelectField` to work with a schema:
 *
 * person: {
 *   type: z.enum(["STUDENT", "TEACHER"]),
 * }
 */
export function SimpleSelectField<
  TValueItem extends string,
  TOption extends { id: TValueItem },
>(props: SimpleSelectFieldProps<TValueItem, TOption>) {
  return <SelectField {...props} valueMapper={(option) => option.id} />;
}
