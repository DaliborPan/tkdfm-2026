import { type ReactEventHandler, useCallback, useState } from "react";

export function useIsoImageLoad(
  onLoadCallback: (current: HTMLImageElement) => void,
) {
  const [loaded, setLoaded] = useState(false);

  const onLoadHandler = useCallback(
    (current: HTMLImageElement) => {
      if (loaded) {
        return;
      }

      setLoaded(true);
      onLoadCallback(current);
    },
    [loaded, onLoadCallback],
  );

  const ref = useCallback(
    (current: HTMLImageElement | null) => {
      if (!current) {
        return;
      }

      onLoadHandler(current);
      current.onload = () => onLoadHandler(current);
    },
    [onLoadHandler],
  );

  const onLoad = useCallback<ReactEventHandler<HTMLImageElement>>(
    (event) => {
      onLoadHandler(event.currentTarget);
    },
    [onLoadHandler],
  );

  return [ref, onLoad] as const;
}
