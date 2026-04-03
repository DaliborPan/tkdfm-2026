import { useMemo } from "react";

import { type BaseObject } from "iqf-web-ui/base";

import { deriveFilters } from "../../utils/derive-filters";
import { derivePagination } from "../../utils/derive-pagination";
import {
  deriveSorting,
  prepareMappedSortingState,
} from "../../utils/derive-sorting";
import {
  DEFAULT_BROWSE_ALL_DATA_SOURCE_OPTIONS,
  useBrowseDataQuery,
} from "../browse-data-query";
import { type UseDataSourceParams, type UseDataSourceResult } from "./types";

export function useDataSource<TTableData extends BaseObject, TValue>({
  id,
  api,
  schema,
  state,
  preFilters = [],
  fetchData,
  columns,
  queryKey = [api],
  serverSide,
}: UseDataSourceParams<TTableData, TValue>): UseDataSourceResult<TTableData> {
  const defaultData = useMemo(() => [], []);

  const { enabled, filters } = deriveFilters({
    state,
    preFilters,
    columns,
  });

  const serverSideDataSourceOptions = {
    ...derivePagination(state.pagination),
    sort: deriveSorting(
      prepareMappedSortingState({ sortingState: state.sorting, columns }),
    ),
    filters,
  };

  const fetchDataOptions = serverSide
    ? serverSideDataSourceOptions
    : {
        ...DEFAULT_BROWSE_ALL_DATA_SOURCE_OPTIONS,
        filters: preFilters ?? [],
      };

  const dataQuery = useBrowseDataQuery({
    id,
    queryKey,
    api,
    schema,
    options: fetchDataOptions,
    fetchData,
    enabled,
  });

  const pageCount = dataQuery.data?.totalCount
    ? Math.ceil(dataQuery.data?.totalCount / state.pagination.pageSize)
    : -1;

  return {
    defaultData,
    dataQuery,
    fetchDataOptions,
    pageCount,
  };
}
