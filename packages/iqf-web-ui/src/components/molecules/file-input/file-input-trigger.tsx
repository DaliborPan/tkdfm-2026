import { Upload } from "lucide-react";
import { useIntl } from "react-intl";

import { Button, type ButtonElementProps } from "../../atoms/button";
import { useFileInputContext } from "./context";

export function FileInputTrigger({ children, ...props }: ButtonElementProps) {
  const intl = useIntl();

  const { onClick } = useFileInputContext();

  return (
    <Button
      iconLeft={{ Icon: Upload }}
      onClick={(e) => {
        props.onClick?.(e);

        onClick();
      }}
      {...props}
    >
      {children ??
        intl.formatMessage({
          id: "file-input.trigger",
          defaultMessage: "Vybrat soubor",
        })}
    </Button>
  );
}
