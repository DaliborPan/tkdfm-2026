import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useIntl } from "react-intl";

import { Input } from "../../../../../atoms/input";
import { usePdfViewerContext } from "../pdf-viewer-provider";
import { PdfActionButton } from "./pdf-action-button";

export function PdfPagination() {
  const intl = useIntl();

  const { numPages, pageNumber, changePage } = usePdfViewerContext();

  const [tempInputValue, setTempInputValue] = useState<string | null>(null);

  const handlePageChange = (value: string) => {
    const newPageNumber = Number(value);
    if (newPageNumber >= 1 && newPageNumber <= numPages) {
      changePage(newPageNumber);
    }

    setTempInputValue(null);
  };

  const handlePrevPage = () => {
    const newPageNumber = Math.max(1, pageNumber - 1);
    changePage(newPageNumber);

    setTempInputValue(null);
  };

  const handleNextPage = () => {
    const newPageNumber = Math.min(numPages, pageNumber + 1);
    changePage(newPageNumber);

    setTempInputValue(null);
  };

  const titlePrevPage = intl.formatMessage({
    id: "pdf.prev-page",
    defaultMessage: "Předchozí stránka",
  });

  const titleNextPage = intl.formatMessage({
    id: "pdf.next-page",
    defaultMessage: "Další stránka",
  });

  return (
    <div className="flex items-center gap-2 [&_.input-wrapper]:w-12 [&_.input-wrapper]:p-1">
      <PdfActionButton
        className="hidden @md:inline-flex"
        title={titlePrevPage}
        aria-label={titlePrevPage}
        onClick={handlePrevPage}
        iconLeft={{ Icon: ChevronLeft }}
        disabled={pageNumber <= 1}
      />

      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={tempInputValue ?? String(pageNumber)}
          onInput={(e) => setTempInputValue(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = e.currentTarget.value;
              handlePageChange(value);
            }
          }}
          onBlur={(e) => {
            const value = e.currentTarget.value;
            handlePageChange(value);
          }}
        />
        /<span>{numPages}</span>
      </div>

      <PdfActionButton
        className="hidden @md:inline-flex"
        title={titleNextPage}
        aria-label={titleNextPage}
        onClick={handleNextPage}
        iconLeft={{ Icon: ChevronRight }}
        disabled={pageNumber >= numPages}
      />
    </div>
  );
}
