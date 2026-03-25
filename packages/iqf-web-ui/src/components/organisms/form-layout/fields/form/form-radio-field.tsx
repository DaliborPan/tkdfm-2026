import { type BaseObject } from "../../../../../evidence/base";
import {
  FormRadio,
  type FormRadioProps,
} from "../../../../form/RHF-fields/form-radio";
import { useFormContext } from "../../../../form/context/form-context";
import { LayoutGroupItem } from "../../layout-group-item";

export type FormRadioFieldProps<T extends BaseObject> = FormRadioProps<T> & {
  readOnly?: boolean;
  layoutClassName?: string;
};

/**
 * @deprecated use *LayoutField from `iqf-web-ui/form-layout-fields` instead
 */
export function FormRadioField<T extends BaseObject>({
  label,
  name,
  readOnly = false,
  layoutClassName = "",
  ...props
}: FormRadioFieldProps<T>) {
  const { editing } = useFormContext();

  return (
    <LayoutGroupItem id={name} label={label} className={layoutClassName}>
      <FormRadio
        {...props}
        className="h-8 items-center"
        id={name}
        name={name}
        disabled={!editing || readOnly}
      />
    </LayoutGroupItem>
  );
}
