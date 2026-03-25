import { useIntl } from "react-intl";

import { Button } from "../../atoms/button";
import { type ButtonElementProps } from "../../atoms/button/types";

export function DialogCancelButton({
  children,
  ...props
}: Omit<ButtonElementProps, "type">) {
  const intl = useIntl();

  return (
    <Button {...props} size="m" variant="outlined">
      {children ??
        intl.formatMessage({
          id: "molecules.confirm.cancel",
          defaultMessage: "Zavřít",
        })}
    </Button>
  );
}
