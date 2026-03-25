import { Slot } from "@radix-ui/react-slot";
import { ShieldCheck } from "lucide-react";
import { useIntl } from "react-intl";

import { Button, type ButtonElementProps } from "../../../../atoms/button";
import { successToast } from "../../../../atoms/toast";
import { useDataFormContext } from "../../../context/data-form-context";

type DataFormToolbarValidateButtonProps = {
  asChild?: boolean;
} & ButtonElementProps;

export function DataFormToolbarValidateButton({
  asChild = false,
  ...props
}: DataFormToolbarValidateButtonProps) {
  const intl = useIntl();

  const { trigger } = useDataFormContext();

  return (
    <Slot
      onClick={async () => {
        const valid = await trigger();

        if (valid) {
          successToast(
            intl.formatMessage({
              id: "data-form.check.sucess.title",
              defaultMessage: "Kontrola proběhla úspěšně.",
            }),
          );
        }
      }}
    >
      {asChild ? (
        props.children
      ) : (
        <Button {...props} variant="base" iconLeft={{ Icon: ShieldCheck }}>
          {intl.formatMessage({
            id: "data-form.validate",
            defaultMessage: "Kontrola",
          })}
        </Button>
      )}
    </Slot>
  );
}
