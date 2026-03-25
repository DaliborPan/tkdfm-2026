import { useState } from "react";

import { PdfPageLoader } from "../components/pdf-page-loader";
import { usePdfViewerContext } from "../pdf-viewer-provider";

/**
 * Custom hook to manage the loading and rendering state of PDF pages.
 *
 * @returns An object containing loading and rendering state and handlers
 */
export function usePageLoading() {
  const { numPages } = usePdfViewerContext();

  const [loadedPages, setLoadedPages] = useState<number[]>([]);

  const [renderedPages, setRenderedPages] = useState<number[]>([]);

  const isLoaded = loadedPages.length === numPages;

  const isRendered = (pageNumber: number) => renderedPages.includes(pageNumber);

  const handleLoadSuccess = (pageNumber: number) =>
    setLoadedPages((prev) =>
      prev.includes(pageNumber) ? prev : [...prev, pageNumber],
    );

  const handleRenderSuccess = (pageNumber: number) =>
    setRenderedPages((prev) =>
      prev.includes(pageNumber) ? prev : [...prev, pageNumber],
    );

  const renderLoader = (className?: string) => {
    return !isLoaded ? <PdfPageLoader className={className} /> : null;
  };

  const renderPageLoader = (pageNumber: number, className?: string) => {
    return !isRendered(pageNumber) ? (
      <PdfPageLoader className={className} />
    ) : null;
  };

  return {
    isLoaded,
    isRendered,
    handleLoadSuccess,
    handleRenderSuccess,
    renderLoader,
    renderPageLoader,
  };
}
