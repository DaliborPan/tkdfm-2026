import { Slot } from "@radix-ui/react-slot";
import { X } from "lucide-react";
import { useIntl } from "react-intl";

import { useSettingsContext } from "../../../../../settings/context";
import { Button } from "../../../../atoms/button";
import { type ButtonElementProps } from "../../../../atoms/button/types";
import { useDataFormContext } from "../../../context/data-form-context";

type DataFormToolbarCancelButtonProps = {
  asChild?: boolean;
} & ButtonElementProps;

export function DataFormToolbarCancelButton({
  asChild = false,
  onClick,
  ...props
}: DataFormToolbarCancelButtonProps) {
  const intl = useIntl();

  const { isEditing, setMode, isExisting, query, url, reset } =
    useDataFormContext();

  const {
    router: { navigate },
  } = useSettingsContext();

  return (
    <Slot
      onClick={async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (isExisting) {
          // First set mode to view to unregister all fields, then reset form with data.
          // Reverse order was causing issues with FormTable nested fields.
          setMode("VIEW");

          const { data } = await query.refetch();

          reset(data);
        } else {
          navigate(url);
        }

        onClick?.(e);
      }}
    >
      {asChild ? (
        props.children
      ) : (
        <Button
          {...props}
          variant="base"
          disabled={!isEditing}
          iconLeft={{ Icon: X }}
        >
          {intl.formatMessage({
            id: "data-form.cancel",
            defaultMessage: "Zrušit",
          })}
        </Button>
      )}
    </Slot>
  );
}
