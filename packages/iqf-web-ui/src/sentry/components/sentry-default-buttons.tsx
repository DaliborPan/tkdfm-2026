import { Home } from "lucide-react";
import { useIntl } from "react-intl";

import { Button } from "../../components/atoms/button";

export function SentryDefaultButtons() {
  const intl = useIntl();

  return (
    <Button
      href="/"
      iconLeft={{ Icon: Home }}
      variant="outlined"
      className="w-full"
    >
      {intl.formatMessage({
        id: "sentry.buttons.homapage.text",
        defaultMessage: "Zpět na nástěnku",
      })}
    </Button>
  );
}
