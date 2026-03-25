import { Slot } from "@radix-ui/react-slot";
import { Link } from "lucide-react";
import { useIntl } from "react-intl";

import { Button, type ButtonElementProps } from "../../../../atoms/button";
import { useDataFormContext } from "../../../context/data-form-context";

type DataFormToolbarShareButtonProps = {
  asChild?: boolean;
} & ButtonElementProps;

export function DataFormToolbarShareButton({
  asChild = false,
  ...props
}: DataFormToolbarShareButtonProps) {
  const intl = useIntl();

  const { mode } = useDataFormContext();

  return (
    <Slot
      onClick={() => {
        // copy to clipboard
        const url = window.location.href;

        navigator.clipboard.writeText(url);
      }}
    >
      {asChild ? (
        props.children
      ) : (
        <Button
          {...props}
          disabled={mode !== "VIEW"}
          iconRight={{ Icon: Link }}
          tooltip={intl.formatMessage({
            id: "data-form.share",
            defaultMessage: "Sdílet",
          })}
        />
      )}
    </Slot>
  );
}
