import { RotateCcw, RotateCw } from "lucide-react";
import { useIntl } from "react-intl";

import { usePdfViewerContext } from "../pdf-viewer-provider";
import { PdfActionButton } from "./pdf-action-button";

export function PdfRotate() {
  const intl = useIntl();

  const { rotateCounterClockwise, rotateClockwise } = usePdfViewerContext();

  const titleRotateLeft = intl.formatMessage({
    id: "pdf.rotate-ccw",
    defaultMessage: "Otočit proti směru hodinových ručiček",
  });

  const titleRotateRight = intl.formatMessage({
    id: "pdf.rotate-cw",
    defaultMessage: "Otočit ve směru hodinových ručiček",
  });

  return (
    <div className="hidden gap-1 @md:flex">
      <PdfActionButton
        title={titleRotateLeft}
        aria-label={titleRotateLeft}
        iconLeft={{ Icon: RotateCcw }}
        onClick={rotateCounterClockwise}
      />
      <PdfActionButton
        title={titleRotateRight}
        aria-label={titleRotateRight}
        iconLeft={{ Icon: RotateCw }}
        onClick={rotateClockwise}
      />
    </div>
  );
}
