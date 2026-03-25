import { X } from "lucide-react";
import { useIntl } from "react-intl";

import { type AnchorElementProps, Button } from "../../atoms/button";
import { useUrlHref } from "../hooks/url-href";

type DataFormCloseButtonProps = Omit<AnchorElementProps, "href"> & {
  href?: string;
};

export function DataFormCloseButton(props: DataFormCloseButtonProps) {
  const intl = useIntl();

  const url = useUrlHref();

  return (
    <Button
      variant="base"
      iconRight={{ Icon: X, className: "size-4" }}
      href={url}
      tooltip={intl.formatMessage({
        id: "data-form.close-button.tooltip",
        defaultMessage: "Zavřít panel",
      })}
      className="size-9 min-h-0"
      {...props}
    />
  );
}
