import { useState } from "react";
import { Page } from "react-pdf";

import { cn } from "../../../../../../utils";
import { PdfPageLoader } from "../components/pdf-page-loader";
import { useIsScrolledToBottom } from "../hooks/use-is-scrolled-to-bottom";
import { usePdfViewerContext } from "../pdf-viewer-provider";

export function OnePageView() {
  const { pageNumber, rotation, scale, scrollContainerRef } =
    usePdfViewerContext();

  const [loadSuccess, setLoadSuccess] = useState(false);

  useIsScrolledToBottom(scrollContainerRef, loadSuccess);

  return (
    <div ref={scrollContainerRef} className="flex flex-1 overflow-auto py-4">
      <Page
        loading={null}
        onLoadSuccess={() => setLoadSuccess(true)}
        rotate={rotation}
        scale={scale / 100}
        pageNumber={pageNumber}
        className={cn("mx-auto h-fit w-fit", !loadSuccess && "hidden")}
      />
      {!loadSuccess && <PdfPageLoader />}
    </div>
  );
}
