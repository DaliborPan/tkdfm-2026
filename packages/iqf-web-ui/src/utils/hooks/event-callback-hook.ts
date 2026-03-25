"use client";

import { useCallback, useLayoutEffect, useRef } from "react";

/**
 * Aimed to be easier to use than useCallback and solve problems raised in this ticket.
 *
 * useEventCallback doesn't need any dependencies list. The returned function should not be used during rendering.
 *
 */
export function useEventCallback<T extends (...args: any[]) => unknown>(
  fn: T,
): T {
  const ref = useRef(fn);

  // we copy a ref to the callback scoped to the current state/props on each render
  useLayoutEffect(() => {
    ref.current = fn;
  });

  return useCallback(
    (...args: unknown[]) => ref.current.apply(void 0, args),
    [],
  ) as T;
}
