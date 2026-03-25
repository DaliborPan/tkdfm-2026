import { useInfiniteQuery } from "@tanstack/react-query";
import { type SortingState } from "@tanstack/react-table";
import { type z } from "zod";

import { type BaseObject } from "../../../../../../evidence/base";
import { apiFetch } from "../../../../../../utils";
import { type IqfColumnDef } from "../../../../../data-table/columns/types";
import {
  type ApiFilter,
  type BrowseDataResponse,
} from "../../../../../data-table/types";
import {
  deriveSorting,
  prepareMappedSortingState,
} from "../../../../../data-table/utils";

const PAGE_SIZE = 30;
const SORTING = [{ id: "createdAt", desc: false }];

export function useCollectionCardData<T extends BaseObject>(
  queryKey: string[],
  url: string,
  columns: IqfColumnDef<T>[],
  preFilters: ApiFilter[] = [],
  defaultSorting: SortingState = SORTING,
  params?: Record<string, any>,
) {
  const infiniteQuery = useInfiniteQuery({
    queryKey: [...queryKey, preFilters],
    queryFn: ({ pageParam }) =>
      apiFetch<z.ZodSchema<BrowseDataResponse<T>>>({
        method: "POST",
        url: `${url}/browse`,
        data: {
          filters: preFilters,
          sorts: deriveSorting(
            prepareMappedSortingState({
              sortingState: defaultSorting,
              columns,
            }),
          ).sorts,
          size: PAGE_SIZE,
          offset: pageParam * PAGE_SIZE,
        },
        params,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems =
        (allPages.length - 1) * PAGE_SIZE + lastPage.items.length;

      return loadedItems < lastPage.totalCount ? allPages.length : undefined;
    },
    select: (infiniteData) => ({
      ...infiniteData,
      totalCount: infiniteData.pages[0].totalCount,
      options: infiniteData.pages.flatMap((page) => page.items),
    }),
  });

  return infiniteQuery;
}
