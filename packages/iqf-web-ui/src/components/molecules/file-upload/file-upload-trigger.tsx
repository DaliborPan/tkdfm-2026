import { X } from "lucide-react";
import { useIntl } from "react-intl";

import { Button } from "../../atoms/button";
import { FileInputTrigger } from "../file-input";
import { useFileUploadContext } from "./context";

export function FileUploadTrigger() {
  const intl = useIntl();

  const { isUploading, onAbort } = useFileUploadContext();

  return (
    <div className="flex items-center gap-x-2">
      <FileInputTrigger />

      {isUploading && (
        <Button
          iconLeft={{ Icon: X }}
          onClick={onAbort}
          variant="outlined"
          color="error"
        >
          {intl.formatMessage({
            id: "form.file-upload.abort",
            defaultMessage: "Zrušit nahrávání",
          })}
        </Button>
      )}
    </div>
  );
}
