import { type RefObject } from "react";

/**
 * Scrolls to a specific page element within a scrollable container.
 *
 * @param scrollContainerRef - reference to the scrollable container
 * @param page_id - ID of the target page element to scroll to
 */
export const scrollToPage = (
  scrollContainerRef: RefObject<HTMLDivElement | null>,
  page_id: string,
) => {
  const pageElement = document.getElementById(page_id);

  if (pageElement && scrollContainerRef && scrollContainerRef.current) {
    const containerRect = scrollContainerRef.current.getBoundingClientRect();
    const elementRect = pageElement.getBoundingClientRect();

    const targetScrollTop =
      scrollContainerRef.current.scrollTop +
      (elementRect.top - containerRect.top);

    scrollContainerRef.current.scrollTo({
      top: targetScrollTop,
      behavior: "instant",
    });
  } else if (pageElement) {
    pageElement.scrollIntoView({ behavior: "instant" });
  }
};

/**
 * Generates a unique ID for a specific page of a PDF file.
 *
 * @param id - unique PDF viewer identifier
 * @param pageNum -  page number (1-based index)
 * @returns unique page ID string
 */
export const createPageId = (id: string, pageNum: number) => {
  return `${id}_page_${pageNum}`;
};

/**
 * Determines the current page number visible in a scrollable container
 * based on viewport size, scroll offset, and individual page heights.
 *
 * Rules:
 * 1. If one or more pages are fully visible, return the first fully visible page.
 * 2. Otherwise, return the page with the majority (≥ 50%) visible in the viewport.
 * 3. If no majority is found, return the page with the largest visible area.
 *
 * @param viewHeight - The height of the viewport (visible wrapper div).
 * @param scrollTop - The distance scrolled from the top of the container.
 * @param pagesHeight - An array of heights for each page in order.
 * @returns The current page number (1-based index).
 */
export const getCurrentPage = (
  viewHeight: number,
  scrollTop: number,
  pagesHeight: number[],
): number => {
  let offset = 0;

  type PageCandidate = {
    index: number;
    visible: number;
    fullyVisible: boolean;
  };

  const candidates: PageCandidate[] = [];

  pagesHeight.forEach((height, index) => {
    const pageTop = offset;
    const pageBottom = offset + height;
    offset += height;

    const viewportTop = scrollTop;
    const viewportBottom = scrollTop + viewHeight;

    const visible = Math.max(
      0,
      Math.min(pageBottom, viewportBottom) - Math.max(pageTop, viewportTop),
    );

    const fullyVisible = visible >= height;

    candidates.push({ index, visible, fullyVisible });
  });

  // Condition 1: prefer fully visible pages
  const fullyVisiblePages = candidates.filter((c) => c.fullyVisible);
  if (fullyVisiblePages.length > 0) {
    return fullyVisiblePages[0].index + 1;
  }

  // Condtion 2: otherwise pick page with majority visible
  const majorityPage = candidates.find(
    (c) => c.visible >= pagesHeight[c.index] / 2,
  );
  if (majorityPage) {
    return majorityPage.index + 1;
  }

  // Fallback: the one with the largest visible area
  candidates.sort((a, b) => b.visible - a.visible);
  return candidates[0].index + 1;
};
