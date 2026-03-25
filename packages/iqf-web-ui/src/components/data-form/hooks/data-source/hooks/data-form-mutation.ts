import { useMutation } from "@tanstack/react-query";

import { type BaseObject } from "../../../../../evidence/base";
import { type ApiFetchFn, apiFetch } from "../../../../../utils/api-fetch";
import {
  type DataFormMutationVariables,
  type DataFormProps,
} from "../../../types";

export function useDataFormMutation<TFieldValues extends BaseObject>({
  api,
  onSuccess,
  fetchData = apiFetch,
}: {
  api: string;

  onSuccess?: DataFormProps<TFieldValues, TFieldValues>["onMutationSuccess"];
  fetchData?: ApiFetchFn<any>;
}) {
  return useMutation({
    mutationFn: async ({
      values,
      type,
    }: DataFormMutationVariables<TFieldValues>) => {
      const result = await fetchData({
        method: type === "update" ? "PUT" : "POST",
        url: type === "update" ? `${api}/${values.id}` : api,
        data: values,
      });

      await onSuccess?.({ values, result, type });

      return result;
    },
  });
}
