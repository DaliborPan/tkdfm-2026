import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { type ComponentRef, useEffect, useRef } from "react";

import { type BaseObject } from "../../../../evidence/base";
import { type CommandList } from "../../../atoms/command";
import { type CreateComboboxOptionsResult } from "../combobox-options/types";
import { getComboboxQueryKey } from "../utils";

type ComboboxInfiniteQueryOptions<TOption extends BaseObject> = {
  /**
   * id of combobox used as part of queryKey
   */
  id: string;

  /**
   * Search query
   */
  query: string;

  /**
   * Combobox options
   */
  comboboxOptions: CreateComboboxOptionsResult<TOption>;

  /**
   * Whether infinite query is enabled
   */
  enabled: boolean;

  /**
   * Minimum query length to start fetching options
   *
   * @default 0
   */
  minQueryLength?: number;

  /**
   * Callback to set total rows count.
   */
  setTotalRowsCount: (totalRowsCount: number) => void;
};

export function useComboboxInfiniteQuery<
  TOption extends BaseObject = BaseObject,
>({
  id,
  query,
  comboboxOptions,
  enabled = false,
  minQueryLength = 0,
  setTotalRowsCount,
}: ComboboxInfiniteQueryOptions<TOption>) {
  const parentRef = useRef<ComponentRef<typeof CommandList>>(null);

  const queryKey = getComboboxQueryKey({
    id,
    query,
    params: comboboxOptions.params,
  });

  const queryFn = async ({
    pageParam,
    signal,
  }: {
    pageParam: number;
    signal?: AbortSignal;
  }) => {
    if (query.length < minQueryLength) {
      return [];
    }

    const result = await comboboxOptions.search(query, pageParam, signal);

    if (query === "" && !signal?.aborted) {
      setTotalRowsCount(result.totalCount);
    }

    return result.items;
  };

  const getNextPageParam = (lastPage: TOption[], pages: TOption[][]) =>
    lastPage.length === comboboxOptions.params.size
      ? pages.length + 1
      : undefined;

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetched,
    ...infiniteQuery
  } = useInfiniteQuery({
    queryKey,
    initialPageParam: 1,
    queryFn,
    getNextPageParam,
    placeholderData: keepPreviousData,
    enabled,
  });

  const rows = data?.pages.flat() ?? [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? rows.length + 1 : rows.length,
    estimateSize: () => 33,
    measureElement: (el) => el.getBoundingClientRect().height,
    getScrollElement: () => parentRef.current,
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = virtualItems.at(-1);

    if (!lastItem) return;

    if (
      lastItem.index >= rows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    rows.length,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    virtualItems,
  ]);

  return {
    infiniteQuery: {
      data,
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
      isFetched,
      ...infiniteQuery,
    },
    setTotalRowsCount,
    parentRef,
    rows,
    rowVirtualizer,
  };
}
