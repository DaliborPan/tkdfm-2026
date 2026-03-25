import { useMutation } from "@tanstack/react-query";
import { useIntl } from "react-intl";

import { Button, type ButtonElementProps } from "../../atoms/button";
import { successToast } from "../../atoms/toast";

export type FileDownloadButtonProps = Omit<ButtonElementProps, "isLoading"> & {
  /**
   * Function that downloads the file.
   */
  downloadFile: () => Promise<void>;
};

export function FileDownloadButton({
  downloadFile,

  children,

  ...props
}: FileDownloadButtonProps) {
  const intl = useIntl();

  const mutation = useMutation({
    mutationFn: () => downloadFile(),
  });

  return (
    <Button
      {...props}
      isLoading={mutation.isPending}
      onClick={async () => {
        await mutation.mutateAsync();

        successToast(
          intl.formatMessage({
            id: "file-download-button.download-success",
            defaultMessage: "Soubor byl stažen",
          }),
        );
      }}
    >
      {children !== undefined
        ? children
        : intl.formatMessage({
            id: "file-download-button.download",
            defaultMessage: "Stáhnout",
          })}
    </Button>
  );
}
