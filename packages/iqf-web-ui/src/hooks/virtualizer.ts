import { useVirtualizer as useTanstackVirtualizer } from "@tanstack/react-virtual";
import { type Ref, useImperativeHandle, useRef } from "react";

export type VirtualizerHandle = {
  rowVirtualizer: ReturnType<typeof useTanstackVirtualizer>;
};

export function useVirtualizer({
  count,
  itemsSize,
  ref,
}: {
  count: number;
  itemsSize: number;
  ref?: Ref<VirtualizerHandle>;
}) {
  const parentRef = useRef(null);

  const rowVirtualizer = useTanstackVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemsSize,
    overscan: 5,
  });

  useImperativeHandle(ref, () => ({
    rowVirtualizer,
  }));

  return { parentRef, rowVirtualizer };
}
