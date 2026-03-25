import { type QueryKey, type UseQueryOptions } from "@tanstack/react-query";
import { type AxiosRequestConfig } from "axios";
import { type z } from "zod";

import type { ApiFetchFn, IqfAxiosError } from "../../utils/api-fetch";

export type UseIqfQueryOptions<TZodSchema extends z.ZodSchema> = Omit<
  UseQueryOptions<z.infer<TZodSchema>, IqfAxiosError>,
  "queryKey" | "enabled" | "staleTime"
> & {
  /**
   * API endpoint to fetch the data from.
   */
  api: string;

  /**
   * Override type from `UseQueryOptions.enabled` - there it can be also a function.
   * For now, we don't need it and it causes type errors.
   *
   * @default true
   */
  enabled?: boolean;

  /**
   * @default Infinity
   */
  staleTime?: number;

  /**
   * @default [api]
   */
  queryKey?: QueryKey;

  /**
   * @default "GET"
   */
  method?: AxiosRequestConfig["method"];

  /**
   * Zod schema to validate the response data.
   *
   * If parsing fails, the error is just logged to the console.
   * The IqfAxiosError is not thrown.
   */
  schema?: TZodSchema;

  /**
   * `data` passed to the `apiFetch` function.
   */
  data?: any;

  /**
   * Can be used in order to adjust some of the `apiFetchOptions`
   * and call the `apiFetch` function with the adjusted options.
   *
   * @default apiFetch
   */
  fetchData?: ApiFetchFn<z.infer<TZodSchema>>;
};
