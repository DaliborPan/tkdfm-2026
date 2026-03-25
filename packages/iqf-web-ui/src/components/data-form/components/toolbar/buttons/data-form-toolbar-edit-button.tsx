import { Slot } from "@radix-ui/react-slot";
import { Pencil } from "lucide-react";
import { useIntl } from "react-intl";

import { type ButtonElementProps } from "../../../../atoms/button";
import { useDataFormContext } from "../../../context/data-form-context";
import { DataFormToolbarButton } from "./data-form-toolbar-button";

type DataFormToolbarEditButtonProps = {
  asChild?: boolean;
} & ButtonElementProps;

export function DataFormToolbarEditButton({
  asChild = false,
  onClick,
  ...props
}: DataFormToolbarEditButtonProps) {
  const intl = useIntl();

  const { setMode, isEditing } = useDataFormContext();

  return (
    <Slot
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setMode("EDIT");

        onClick?.(e);
      }}
    >
      {asChild ? (
        props.children
      ) : (
        <DataFormToolbarButton
          {...props}
          variant="base"
          disabled={isEditing}
          icon={{ Icon: Pencil }}
          tooltip={intl.formatMessage({
            id: "data-form.update",
            defaultMessage: "Upravit",
          })}
          className="size-9 min-h-0"
        >
          {props.children}
        </DataFormToolbarButton>
      )}
    </Slot>
  );
}
