import { useEffect } from "react";

export function useCloseOnWidthResize(
  open: boolean,
  setOpen: (open: boolean) => void,
) {
  useEffect(() => {
    let previousWidth = window.innerWidth;

    function handleResize() {
      const currentWidth = window.innerWidth;

      if (currentWidth !== previousWidth && open) {
        setOpen(false);
      }

      previousWidth = currentWidth;
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open, setOpen]);
}
