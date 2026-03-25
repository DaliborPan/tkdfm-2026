import { DownloadIcon } from "lucide-react";
import { useIntl } from "react-intl";

import { PdfActionButton } from "./pdf-action-button";

export function PdfDownload({ file }: { file: File }) {
  const intl = useIntl();

  const titleDownload = intl.formatMessage({
    id: "pdf.download",
    defaultMessage: "Stáhnout",
  });

  return (
    <PdfActionButton
      title={titleDownload}
      aria-label={titleDownload}
      iconLeft={{ Icon: DownloadIcon }}
      onClick={() => {
        const url = URL.createObjectURL(file);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = file.name;
        anchor.click();
        URL.revokeObjectURL(url);
      }}
    />
  );
}
