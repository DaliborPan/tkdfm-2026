import {
  type QueryKey,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

import { type BaseObject } from "../../../../evidence/base";
import { type CreateAutocompleteOptionsResult } from "../types";

type UseAutocompleteInfiniteQueryParams<ItemType extends BaseObject> = {
  id: string;
  autocompleteOptions: CreateAutocompleteOptionsResult<ItemType>;

  /**
   * Current query, if query is longer than minQueryLength, specified in auotcomplete.
   * Empty string otherwise
   */
  query: string;

  enableEmptyQuery?: boolean;

  expanded: boolean;
};

/**
 * Returns a function that returns all items from the infinite query
 * for given queryKey.
 */
function useGetInfiniteQueryData<ItemType extends BaseObject>(
  queryKey: QueryKey,
) {
  const queryClient = useQueryClient();

  return () => {
    const data = queryClient.getQueryData<{ pages: ItemType[][] }>(queryKey);

    return data?.pages.flat() ?? [];
  };
}

/**
 * Configures infiniteQuery based on given `query`. Takes care of setting
 * options and processing state.
 */
export function useAutocompleteInfiniteQuery<ItemType extends BaseObject>({
  id,
  query,
  enableEmptyQuery,
  autocompleteOptions,
  expanded,
}: UseAutocompleteInfiniteQueryParams<ItemType>) {
  const queryKey = ["autocomplete", id, query, autocompleteOptions.params];

  const getInfiniteQueryData = useGetInfiniteQueryData<ItemType>(queryKey);

  const [options, setOptions] = useState<ItemType[]>(getInfiniteQueryData());

  const infiniteQuery = useInfiniteQuery({
    queryKey,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      if ((!enableEmptyQuery && !query) || !expanded) {
        setOptions([]);

        return [];
      }

      const currentPage = await autocompleteOptions.search(query, pageParam);
      if (pageParam === 1) {
        setOptions(currentPage);
      }

      if (pageParam > 1) {
        const previousPages = getInfiniteQueryData();
        setOptions([...previousPages, ...currentPage]);
      }

      return currentPage;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage?.length === autocompleteOptions.params.size
          ? allPages.length + 1
          : null;

      return nextPage;
    },
    select: (infiniteData) => ({
      ...infiniteData,
      options: infiniteData.pages.flat(),
    }),

    enabled: (enableEmptyQuery || !!query) && expanded,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    options,
    infiniteQuery,
  };
}
