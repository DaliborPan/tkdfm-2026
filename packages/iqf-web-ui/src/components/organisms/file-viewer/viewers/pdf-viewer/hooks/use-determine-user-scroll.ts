import { useEffect } from "react";

import { usePdfViewerContext } from "../pdf-viewer-provider";

/**
 * Custom hook to set isProgrammaticallyScrolling to false when user interacts with scroll container.
 */
export function useDetermineUserScroll() {
  const { scrollContainerRef, setIsProgrammaticallyScrolling } =
    usePdfViewerContext();

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const onUserInteraction = () => {
      setIsProgrammaticallyScrolling(false);
    };

    el.addEventListener("wheel", onUserInteraction, { passive: true });
    el.addEventListener("pointerdown", onUserInteraction);
    el.addEventListener("touchstart", onUserInteraction, { passive: true });

    return () => {
      el.removeEventListener("wheel", onUserInteraction);
      el.removeEventListener("pointerdown", onUserInteraction);
      el.removeEventListener("touchstart", onUserInteraction);
    };
  }, [scrollContainerRef, setIsProgrammaticallyScrolling]);
}
