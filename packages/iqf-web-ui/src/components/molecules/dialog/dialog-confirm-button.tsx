import { useIntl } from "react-intl";

import { Button } from "../../atoms/button";
import { type ButtonElementProps } from "../../atoms/button/types";
import { useIsUploadFilesMutationPending } from "../file-upload/mutation";

export function DialogConfirmButton({
  children,
  isLoading,
  isError = false,
  ...props
}: ButtonElementProps & {
  isError?: boolean;
}) {
  const intl = useIntl();

  const isFileUploadMutationPending = useIsUploadFilesMutationPending();

  return (
    <Button
      {...props}
      size="m"
      color={isError ? "error" : "primary"}
      isLoading={isLoading}
      disabled={isFileUploadMutationPending}
    >
      {children ??
        intl.formatMessage({
          id: "molecules.confirm.confirm",
          defaultMessage: "Potvrdit",
        })}
    </Button>
  );
}
