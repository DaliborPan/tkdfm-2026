import { useRef } from "react";

export function useAbortController() {
  const abortControllerRef = useRef<AbortController | null>(null);

  const initializeAbortController = () => {
    abortControllerRef.current = new AbortController();

    return abortControllerRef.current;
  };

  const abort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  return { initializeAbortController, abort, abortControllerRef };
}
