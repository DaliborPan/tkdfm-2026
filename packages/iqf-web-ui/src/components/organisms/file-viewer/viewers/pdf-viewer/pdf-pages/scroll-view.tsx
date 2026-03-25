import { type UIEventHandler, useEffect, useMemo } from "react";
import { Page } from "react-pdf";

import { cn } from "../../../../../../utils";
import { useDetermineUserScroll } from "../hooks/use-determine-user-scroll";
import { useIsScrolledToBottom } from "../hooks/use-is-scrolled-to-bottom";
import { usePageLoading } from "../hooks/use-page-loading";
import { usePdfViewerContext } from "../pdf-viewer-provider";
import { createPageId, getCurrentPage, scrollToPage } from "../utils";

export function ScrollView() {
  const {
    numPages,
    setPageNumber,
    rotation,
    scale,
    isProgrammaticallyScrolling,
    scrollContainerRef,
    id,
    pageNumber,
  } = usePdfViewerContext();

  const {
    handleLoadSuccess,
    handleRenderSuccess,
    isLoaded,
    renderLoader,
    renderPageLoader,
  } = usePageLoading();

  useDetermineUserScroll();

  useIsScrolledToBottom(scrollContainerRef, isLoaded);

  const handleScroll: UIEventHandler<HTMLDivElement> = (e) => {
    if (isProgrammaticallyScrolling) return;

    const viewHeight = e.currentTarget.clientHeight;
    const scrollTop = e.currentTarget.scrollTop - 16; // account for y padding before first Page (16px)

    const childrenPagesHeight = Array.from(
      e.currentTarget.children as HTMLCollectionOf<HTMLElement>,
      (el) => el.clientHeight + 16, // account for gap (16px) and y padding after last Page (16px)
    );

    setPageNumber(getCurrentPage(viewHeight, scrollTop, childrenPagesHeight));
  };

  // Scroll to the selected page when changing between one-page view to scroll view
  useEffect(() => {
    if (isLoaded)
      scrollToPage(scrollContainerRef, createPageId(id, pageNumber));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const pdfPages = useMemo(() => {
    if (!numPages || numPages <= 0) {
      return [];
    }

    return Array.from({ length: numPages }, (_, index) => index + 1);
  }, [numPages]);

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="flex flex-1 flex-col gap-4 overflow-auto py-4"
    >
      {pdfPages.map((pageNum) => (
        <div
          className={cn(!isLoaded && "hidden")}
          key={`page_${pageNum}`}
          id={createPageId(id, pageNum)}
        >
          <Page
            loading={null}
            onLoadSuccess={(page) => handleLoadSuccess(page.pageNumber)}
            onRenderSuccess={(page) => handleRenderSuccess(page.pageNumber)}
            rotate={rotation}
            scale={scale / 100}
            pageNumber={pageNum}
            className="mx-auto h-fit w-fit"
          >
            {renderPageLoader(
              pageNum,
              "text-secondary-600 absolute inset-0 m-auto",
            )}
          </Page>
        </div>
      ))}
      {renderLoader()}
    </div>
  );
}
