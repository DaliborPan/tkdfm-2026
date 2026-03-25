import { noop } from "lodash";
import { useCallback, useRef } from "react";

import { type ResizeType } from "../utils";

/**
 * Custom hook to enable manual resizing of a textarea wrapper element via pointer events.
 *
 * Resize handling via custom hook is needed because the element which is resized is not the textarea itself but its wrapper div.
 *
 * @param resize - Determines the allowed resize direction: "resize", "resize-x", "resize-y", or "resize-none".
 * @returns An object containing the ref to be attached to the textarea wrapper and an `onPointerDown` handler to initiate resizing.
 */
export function useResizeTextarea(rows: number, resize?: ResizeType) {
  const textareaWrapperRef = useRef<HTMLDivElement | null>(null);

  const startResizing = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      const textareaWrapper = textareaWrapperRef.current;

      if (!textareaWrapper || resize === "resize-none") return;

      const styles = getComputedStyle(textareaWrapper);
      const lineHeight = parseFloat(styles.lineHeight);
      const paddingY =
        parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
      const borderY =
        parseFloat(styles.borderTopWidth) +
        parseFloat(styles.borderBottomWidth);

      const minHeight = rows * lineHeight + paddingY + borderY;

      textareaWrapper.setPointerCapture(e.pointerId);

      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = textareaWrapper.clientWidth;
      const startHeight = textareaWrapper.clientHeight;

      const onPointerMove = (event: PointerEvent) => {
        if (!textareaWrapper) return;

        if (resize === "resize" || resize === "resize-x") {
          const newWidth = startWidth + (event.clientX - startX);
          textareaWrapper.style.width = `${newWidth}px`;
        }

        if (!resize || resize === "resize" || resize === "resize-y") {
          const newHeight = startHeight + (event.clientY - startY);
          textareaWrapper.style.height = `${newHeight}px`;
          textareaWrapper.style.minHeight = `${minHeight}px`;
        }
      };

      const onPointerUp = (event: PointerEvent) => {
        textareaWrapper.releasePointerCapture(event.pointerId);
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
      };

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    },
    [resize, rows],
  );

  if (resize === "resize-none") {
    return {
      ref: null,
      onPointerDown: noop,
    };
  }

  return {
    ref: textareaWrapperRef,
    onPointerDown: startResizing,
  };
}
