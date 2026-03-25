import { Undo2 } from "lucide-react";
import { useIntl } from "react-intl";

import {
  ComboboxActionButton,
  type ComboboxActionButtonProps,
} from "./combobox-action-button";

export type ComboboxResetButtonProps = Pick<
  ComboboxActionButtonProps,
  "onClick" | "size"
> & {
  label?: string;
};

export function ComboboxResetButton({
  label,
  ...props
}: ComboboxResetButtonProps) {
  const intl = useIntl();

  return (
    <ComboboxActionButton
      icon={Undo2}
      label={
        label ??
        intl.formatMessage({
          id: "combobox.reset-button.label",
          defaultMessage: "Obnovit hodnotu",
        })
      }
      {...props}
    />
  );
}
