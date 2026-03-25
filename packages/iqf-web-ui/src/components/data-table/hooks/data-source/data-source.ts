import { useMemo } from "react";

import { type BaseObject } from "../../../../evidence/base";
import { useSettingsContext } from "../../../../settings/context";
import { type DataSourceOptions } from "../../types";
import { deriveFilters } from "../../utils/derive-filters";
import { derivePagination } from "../../utils/derive-pagination";
import {
  deriveSorting,
  prepareMappedSortingState,
} from "../../utils/derive-sorting";
import { useBrowseDataQuery } from "../browse-data-query";
import { type UseDataSourceParams, type UseDataSourceResult } from "./types";

export function useDataSource<TTableData extends BaseObject, TValue>({
  id,
  api,
  apiSuffix,
  schema,
  state,
  preFilters,
  fetchData,
  columns,
  queryKey = [api],
}: UseDataSourceParams<TTableData, TValue>): UseDataSourceResult<TTableData> {
  const settings = useSettingsContext();
  const defaultData = useMemo(() => [], []);

  const { enabled, filters } = deriveFilters({
    state,
    preFilters,
    columns,
  });

  const _deriveSorting = settings.table?.deriveSorting ?? deriveSorting;

  const fetchDataOptions: DataSourceOptions = {
    ...derivePagination({
      pageIndex: state.pagination.pageIndex,
      pageSize: state.pagination.pageSize,
    }),

    ..._deriveSorting(
      prepareMappedSortingState({ sortingState: state.sorting, columns }),
    ),

    filters,
  };

  const dataQuery = useBrowseDataQuery({
    id,
    queryKey,
    api,
    apiSuffix,
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
