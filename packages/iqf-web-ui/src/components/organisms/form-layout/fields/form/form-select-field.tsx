import { type BaseObject } from "../../../../../evidence/base";
import { type SelectObject } from "../../../../atoms/select/types";
import {
  FormSelect,
  type FormSelectProps,
} from "../../../../form/RHF-fields/form-select";
import { useFormContext } from "../../../../form/context/form-context";
import { FormValue } from "../../../../form/form-value";
import { LayoutGroupItem } from "../../layout-group-item";
import { SelectValue } from "../value/select-value";

export type FormSelectFieldProps<
  T,
  TOption extends BaseObject,
> = FormSelectProps<T, TOption> & {
  readOnly?: boolean;
  layoutClassName?: string;
  labelClassName?: string;
  viewClassName?: string;
};

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
/**
 * @deprecated use *LayoutField from `iqf-web-ui/form-layout-fields` instead
 */
export function FormSelectField<T, TOption extends BaseObject>({
  name,
  label,
  readOnly = false,
  useOptions,
  options: suppliedOptions,
  idMapper = (value) => (value as SelectObject)?.id,
  optionLabelMapper = (value) => (value as SelectObject)?.title,
  layoutClassName = "",
  labelClassName = "",
  viewClassName = "",
  ...props
}: FormSelectFieldProps<T, TOption>) {
  const { editing } = useFormContext();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const options = suppliedOptions ?? useOptions();

  return (
    <LayoutGroupItem
      id={name}
      label={label}
      className={layoutClassName}
      labelClassName={labelClassName}
    >
      {!editing || readOnly ? (
        <FormValue name={name}>
          {(value) => (
            <SelectValue
              value={value}
              options={options}
              idMapper={idMapper}
              titleMapper={optionLabelMapper}
              className={viewClassName}
            />
          )}
        </FormValue>
      ) : (
        <FormSelect
          id={name}
          name={name}
          idMapper={idMapper}
          optionLabelMapper={optionLabelMapper}
          options={options}
          {...props}
        />
      )}
    </LayoutGroupItem>
  );
}

type FormSimpleSelectFieldProps<TOption extends BaseObject> =
  FormSelectFieldProps<string, TOption>;

/**
 * Use `FormSimpleSelectField` to work with a schema:
 *
 * person: {
 *   type: z.enum(["STUDENT", "TEACHER"]),
 * }
 */
/**
 * @deprecated use *LayoutField from `iqf-web-ui/form-layout-fields` instead
 */
export function FormSimpleSelectField<TOption extends BaseObject>(
  props: FormSimpleSelectFieldProps<TOption>,
) {
  return (
    <FormSelectField<string, TOption>
      {...props}
      idMapper={(value) => value}
      valueMapper={(value) => value?.id}
    />
  );
}
