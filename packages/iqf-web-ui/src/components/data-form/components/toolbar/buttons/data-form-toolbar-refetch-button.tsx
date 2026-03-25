import { Slot } from "@radix-ui/react-slot";
import { RotateCcw } from "lucide-react";
import { useIntl } from "react-intl";

import { type ButtonElementProps } from "../../../../atoms/button";
import { errorToast, successToast } from "../../../../atoms/toast";
import { useDataFormContext } from "../../../context/data-form-context";
import { DataFormToolbarButton } from "./data-form-toolbar-button";

type DataFormToolbarRefetchButtonProps = {
  asChild?: boolean;
} & ButtonElementProps;

export function DataFormToolbarRefetchButton({
  asChild = false,

  ...props
}: DataFormToolbarRefetchButtonProps) {
  const intl = useIntl();

  const { query, isEditing } = useDataFormContext();

  return (
    <Slot
      onClick={async () => {
        const refetched = await query.refetch();

        if (!refetched.isSuccess) {
          errorToast(
            intl.formatMessage({
              id: "data-form.refetch-error",
              defaultMessage: "Při načítání dat došlo k chybě.",
            }),
          );

          return;
        }

        successToast(
          intl.formatMessage({
            id: "data-form.refetch-success",
            defaultMessage: "Data byla úspěšně načtena.",
          }),
        );
      }}
    >
      {asChild ? (
        props.children
      ) : (
        <DataFormToolbarButton
          {...props}
          variant="base"
          disabled={isEditing}
          icon={{ Icon: RotateCcw }}
          tooltip={intl.formatMessage({
            id: "data-form.refetch",
            defaultMessage: "Načíst znovu",
          })}
          className="size-9 min-h-0"
        >
          {props.children}
        </DataFormToolbarButton>
      )}
    </Slot>
  );
}
