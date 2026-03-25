import { Search } from "lucide-react";

import { type BaseObject } from "../../../../../evidence/base";
import { type OmitDiscriminatedUnion } from "../../../../../types";
import { cn } from "../../../../../utils";
import {
  FormAutocomplete,
  type FormAutocompleteProps,
} from "../../../../form/RHF-fields/form-autocomplete";
import { useFormContext } from "../../../../form/context/form-context";
import { FormValue } from "../../../../form/form-value";
import { LayoutGroupItem } from "../../layout-group-item";
import { AutocompleteValue } from "../value/autocomplete-value";

export type FormAutocompleteFieldProps<T extends BaseObject> =
  OmitDiscriminatedUnion<FormAutocompleteProps<T>, "id"> & {
    readOnly?: boolean;
    layoutClassName?: string;
    labelClassName?: string;
    viewClassName?: string;
  };

/**
 * @deprecated use *LayoutField from `iqf-web-ui/form-layout-fields` instead
 */
export function FormAutocompleteField<T extends BaseObject>({
  label,
  name,
  readOnly = false,
  multiple = false,
  labelMapper,
  className,
  layoutClassName,
  labelClassName = "",
  viewClassName = "",
  ...props
}: FormAutocompleteFieldProps<T>) {
  const { editing } = useFormContext();

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
            <AutocompleteValue
              value={value}
              labelMapper={labelMapper}
              multiple={multiple}
              className={viewClassName}
            />
          )}
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
      )}
    </LayoutGroupItem>
  );
}
