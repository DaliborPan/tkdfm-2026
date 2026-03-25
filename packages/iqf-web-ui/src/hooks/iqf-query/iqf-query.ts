import { useQuery } from "@tanstack/react-query";
import { type z } from "zod";

import { useSettingsContext } from "../../settings/context";
import { type IqfAxiosError, apiFetch } from "../../utils/api-fetch";
import {
  createDefaultSafePaseErrorHandler,
  safeParse,
} from "../../utils/safe-parse";
import { type UseIqfQueryOptions } from "./types";

export function useIqfQuery<TZodSchema extends z.ZodSchema>({
  schema,
  api,
  data,

  staleTime = Infinity,
  method = "GET",
  queryKey = [api],
  fetchData = apiFetch,
  ...queryOptions
}: UseIqfQueryOptions<TZodSchema>) {
  const { zod: zodSettings } = useSettingsContext();

  return useQuery<z.infer<TZodSchema>, IqfAxiosError>({
    queryKey,
    queryFn: async () => {
      const apiFetchOptions = {
        method,
        url: api,
        data,

        /**
         * By not specifying the schema, we can ensure,
         * that the `apiFetch` won't throw an IqfAxiosError
         * due to zod validation.
         */
        schema: undefined,
      };

      const result = await fetchData(apiFetchOptions);

      if (schema) {
        return safeParse(schema, result, {
          onError: zodSettings?.enableQueryLogging
            ? createDefaultSafePaseErrorHandler({
                method,
                api,
              })
            : undefined,
        });
      }

      return result;
    },

    ...queryOptions,

    staleTime,
    retry: 0,

    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}
