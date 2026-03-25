import { Trash } from "lucide-react";
import { useIntl } from "react-intl";

import { type ContentType } from "../../../../../content/schema";
import { Button, type ButtonElementProps } from "../../../../atoms/button";
import { useFormContext } from "../../../context/form-context";

type RemoveFileActionProps<
  TContentType extends ContentType | File = ContentType,
> = Omit<ButtonElementProps, "onClick"> & {
  name: string;
  removedFile: TContentType;
};

export function RemoveFileAction<
  TContentType extends ContentType | File = ContentType,
>({
  name,
  removedFile,

  variant = "outlined",
  color = "error",

  ...props
}: RemoveFileActionProps<TContentType>) {
  const intl = useIntl();

  const { editing, setValue, watch } = useFormContext();

  const formValue = watch(name);
  const items = !formValue
    ? []
    : Array.isArray(formValue)
      ? formValue
      : [formValue];

  const equals = (a: TContentType, b: TContentType) => {
    if (a instanceof File && b instanceof File) {
      return a.name === b.name;
    }

    if ("id" in a && "id" in b) {
      return a.id === b.id;
    }

    console.log("[RemoveFileAction]: invalid removedFile structure", a, b);
    return false;
  };

  return (
    editing && (
      <Button
        {...props}
        variant={variant}
        color={color}
        tooltip={
          props.tooltip ??
          intl.formatMessage({
            id: "remove-file-action.delete",
            defaultMessage: "Odebrat",
          })
        }
        iconLeft={props.iconLeft ?? { Icon: Trash }}
        onClick={() => {
          const multiple = Array.isArray(formValue);

          if (multiple && items.length > 1) {
            setValue(
              name,
              formValue.filter((v) => !equals(v, removedFile)),
            );
          } else {
            setValue(name, null);
          }
        }}
      />
    )
  );
}
