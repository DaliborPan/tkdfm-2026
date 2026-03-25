import { useEffect, useMemo, useRef } from "react";
import { Thumbnail } from "react-pdf";

import { cn } from "../../../../../../utils/cn";
import { usePageLoading } from "../hooks/use-page-loading";
import { usePdfViewerContext } from "../pdf-viewer-provider";
import { createPageId, scrollToPage } from "../utils";

export function PdfThumbnail({ hidden }: { hidden?: boolean }) {
  const { numPages, pageNumber, id, changePage } = usePdfViewerContext();

  const thumbnailContrainerRef = useRef<HTMLDivElement>(null);

  const targetPageId = `thumb_${createPageId(id, pageNumber)}`;

  const { handleLoadSuccess, handleRenderSuccess, isLoaded, renderPageLoader } =
    usePageLoading();

  useEffect(() => {
    scrollToPage(thumbnailContrainerRef, targetPageId);
  }, [targetPageId]);

  const thumbnailPages = useMemo(() => {
    if (!numPages || numPages <= 0) {
      return [];
    }

    return Array.from({ length: numPages }, (_, index) => index + 1);
  }, [numPages]);

  return (
    <div
      className={cn(
        "flex h-full w-56 flex-shrink-0 border-secondary-500 bg-secondary-600",
        {
          hidden: !isLoaded || hidden,
        },
      )}
    >
      <div
        ref={thumbnailContrainerRef}
        className="flex flex-col overflow-y-auto px-4"
      >
        {thumbnailPages.map((pageNum) => (
          <div
            id={`thumb_${createPageId(id, pageNum)}`}
            key={`thumb_${pageNum}`}
            className="pt-4 last:pb-4"
          >
            <Thumbnail
              loading={null}
              className={cn(
                "flex hover:ring",
                pageNumber === pageNum && "ring",
              )}
              onLoadSuccess={(page) => handleLoadSuccess(page.pageNumber)}
              onRenderSuccess={(page) => handleRenderSuccess(page.pageNumber)}
              scale={0.2}
              pageNumber={pageNum}
              onItemClick={({ pageNumber }) => changePage(pageNumber)}
            >
              {renderPageLoader(
                pageNum,
                "text-secondary-600 absolute inset-0 m-auto [&_svg]:size-4",
              )}
            </Thumbnail>
            <div className="pt-1 text-center text-xs text-white">{pageNum}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
