import { Search } from "lucide-react";

import { type BaseObject } from "../../../evidence/base";
import { type OmitDiscriminatedUnion } from "../../../types";
import { cn } from "../../../utils/cn";
import {
  FormAutocomplete,
  type FormAutocompleteProps,
} from "../RHF-fields/form-autocomplete";
import { useFormContext } from "../context/form-context";
import { FormValue } from "../form-value";
import { AutocompleteValue } from "../values/autocomplete-value";
import { type CommonFieldProps, type RenderValueFn } from "./types";

export type AutocompleteFieldProps<T extends BaseObject> =
  OmitDiscriminatedUnion<FormAutocompleteProps<T>, "id"> &
    CommonFieldProps<T | T[]>;

/**
 * @deprecated use `ComboboxField` instead
 */
export function AutocompleteField<T extends BaseObject>({
  name,
  readOnly = false,
  multiple = false,
  labelMapper,
  className,
  renderValue,

  valueClassName = "",
  ...props
}: AutocompleteFieldProps<T>) {
  const { editing } = useFormContext();

  const defaultRenderValue: RenderValueFn = (value) => (
    <AutocompleteValue
      value={value}
      labelMapper={labelMapper}
      multiple={multiple}
      className={valueClassName}
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
    <FormAutocomplete
      id={name}
      name={name}
      className={cn("w-full", className)}
      multiple={multiple}
      labelMapper={labelMapper}
      iconRight={{
        Icon: Search,
        className: "pointer-events-auto",
      }}
      {...props}
    />
  );
}
