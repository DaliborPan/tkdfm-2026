import { type UseInfiniteQueryResult } from "@tanstack/react-query";
import { type Virtualizer } from "@tanstack/react-virtual";
import { useEffect } from "react";

export function useInfiniteScroll({
  query,
  loadedCount,
  rowVirtualizer,
}: {
  query: UseInfiniteQueryResult;
  loadedCount: number;
  rowVirtualizer: Virtualizer<Element, Element>;
}) {
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = query;

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= loadedCount - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hasNextPage,
    fetchNextPage,
    loadedCount,
    isFetchingNextPage,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    rowVirtualizer.getVirtualItems(),
  ]);
}
