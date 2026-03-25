import { X } from "lucide-react";
import { useIntl } from "react-intl";

import { cn } from "../../../../utils";
import {
  ComboboxActionButton,
  type ComboboxActionButtonProps,
} from "./combobox-action-button";

export type ComboboxRemoveItemButtonProps = Pick<
  ComboboxActionButtonProps,
  "onClick" | "size" | "className"
> & {
  "aria-label"?: string;
};

export function ComboboxRemoveItemButton({
  className,
  "aria-label": ariaLabel,
  ...props
}: ComboboxRemoveItemButtonProps) {
  const intl = useIntl();

  return (
    <ComboboxActionButton
      icon={X}
      label={
        ariaLabel ??
        intl.formatMessage({
          id: "combobox.remove-item.label",
          defaultMessage: "Odstranit položku",
        })
      }
      className={cn("text-error-500", className)}
      {...props}
    />
  );
}
