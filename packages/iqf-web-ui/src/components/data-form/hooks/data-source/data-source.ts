import { type BaseObject } from "../../../../evidence/base";
import { checkIsNew } from "../../utils/check-is-new";
import { useEntityDetailQuery } from "../entity-detail-query";
import { useDataFormMutation } from "./hooks/data-form-mutation";
import { type UseDataSourceParams, type UseDataSourceResult } from "./types";

export function useDataSource<
  TData extends TFieldValues,
  TFieldValues extends BaseObject,
>({
  api,
  itemId,
  buildFormSchema,
  detailSchema,
  defaultValues,
  fetchData,
  onMutationSuccess,
  ...params
}: UseDataSourceParams<TData, TFieldValues>): UseDataSourceResult<
  TData,
  TFieldValues
> {
  const query = useEntityDetailQuery({
    api,
    itemId,
    detailSchema,
    fetchData,
  });

  const isNew = checkIsNew(itemId);

  const formSchema =
    buildFormSchema instanceof Function
      ? buildFormSchema({
          data: query.data ?? (defaultValues as TData),
          mode: isNew ? "NEW" : "EDIT",
        })
      : buildFormSchema;

  const mutation = useDataFormMutation({
    api,
    onSuccess: onMutationSuccess,
  });

  // TODO - check if needed to specify refetch function this way
  // const refetch = useCallback(async () => {
  //   await queryClient.invalidateQueries({
  //     queryKey: [api, itemId],
  //   });

  //   const dataFormData = queryClient.getQueryData<TData>([api, itemId]);

  //   if (dataFormData) {
  //     return { data: dataFormData };
  //   }

  //   return dataQuery.refetch();
  // }, [api, dataQuery, itemId, queryClient]);

  return {
    formSchema,
    mutation: params.mutation ?? mutation,
    query,
  };
}
