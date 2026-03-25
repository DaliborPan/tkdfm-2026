import { useEffect } from "react";

import { usePdfViewerContext } from "../pdf-viewer-provider";

/**
 * Custom hook to determine if the user has scrolled to the bottom of a container.
 *
 * @param ref - reference to the scrollable container element
 * @param loaded - boolean indicating if the pages of PDF has fully loaded
 */
export function useIsScrolledToBottom(
  ref: React.RefObject<HTMLElement | null>,
  loaded: boolean,
) {
  const { setIsScrolledToBottom } = usePdfViewerContext();

  useEffect(() => {
    const el = ref.current;
    if (!el || !loaded) return;

    const checkAtBottom = () => {
      const atBottom = el.scrollHeight - (el.scrollTop + el.clientHeight) <= 1;
      setIsScrolledToBottom(atBottom);
    };

    checkAtBottom();

    el.addEventListener("scroll", checkAtBottom);

    const resizeObserver = new ResizeObserver(checkAtBottom);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", checkAtBottom);
      resizeObserver.disconnect();
    };
  }, [loaded, ref, setIsScrolledToBottom]);
}
