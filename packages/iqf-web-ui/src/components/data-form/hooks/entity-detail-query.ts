import { type BaseObject } from "../../../evidence/base";
import { useIqfQuery } from "../../../hooks/iqf-query";
import { type DataFormProps } from "../types";
import { checkIsNew } from "../utils/check-is-new";

/**
 * Wrapper around `useIqfQuery`, that is used by DataForm, particularly by `useDataSource`
 * to get the detail of entity by `itemId`.
 *
 * This hook can be useful if you want to access the same data as the DataForm
 * in a different component away from DataForm's children.
 */
export function useEntityDetailQuery<
  TData extends TFieldValues,
  TFieldValues extends BaseObject,
>({
  api,
  itemId,
  detailSchema,
  fetchData,
  enabled = true,
  staleTime = 0,
}: Pick<DataFormProps<TData, TFieldValues>, "detailSchema" | "fetchData"> &
  Required<Pick<DataFormProps<TData, TFieldValues>, "api">> &
  Partial<Pick<DataFormProps<TData, TFieldValues>, "itemId">> & {
    enabled?: boolean;
    staleTime?: number;
  }) {
  return useIqfQuery({
    queryKey: [api, itemId],
    schema: detailSchema,
    api: `${api}/${itemId}`,

    staleTime,
    enabled: !!itemId && !checkIsNew(itemId) && enabled,

    fetchData:
      !fetchData || !itemId
        ? undefined
        : (apiFetchOptions) =>
            fetchData({
              apiFetchOptions,
              id: itemId,
            }),
  });
}
