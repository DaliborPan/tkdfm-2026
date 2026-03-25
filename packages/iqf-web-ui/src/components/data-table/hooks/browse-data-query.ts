import { keepPreviousData } from "@tanstack/react-query";
import { useDeferredValue } from "react";
import { z } from "zod";

import { type BaseObject } from "../../../evidence/base";
import { useIqfQuery } from "../../../hooks/iqf-query";
import { type UseBrowseDataQueryParams } from "./types";

/**
 * @deprecated createBrowseDataResponseSchema
 */
export function browseDataResponseFactory<TTableData extends BaseObject>(
  schema?: z.ZodSchema<TTableData>,
): z.ZodObject<{
  items: z.ZodArray<z.ZodSchema<TTableData>>;
  totalCount: z.ZodNumber;
}> {
  return z.object({
    items: schema ? z.array(schema) : z.array(z.any()),
    totalCount: z.number(),
  });
}

export function createBrowseDataResponseSchema<TTableData extends BaseObject>(
  schema?: z.ZodSchema<TTableData>,
): z.ZodObject<{
  items: z.ZodArray<z.ZodSchema<TTableData>>;
  totalCount: z.ZodNumber;
}> {
  return z.object({
    items: schema ? z.array(schema) : z.array(z.any()),
    totalCount: z.number(),
  });
}

export function useBrowseDataQuery<TTableData extends BaseObject>({
  id,
  api,
  queryKey,
  schema,
  fetchData,
  options,
  enabled,
  staleTime = 0,
  apiSuffix = "/browse",
}: UseBrowseDataQueryParams<TTableData>) {
  const debouncedOptions = useDeferredValue([...queryKey, id, { ...options }]);

  return useIqfQuery({
    queryKey: debouncedOptions,
    schema: createBrowseDataResponseSchema(schema),
    api: `${api}${apiSuffix}`,
    method: "POST",
    data: options,
    enabled,
    staleTime,

    placeholderData: keepPreviousData,

    fetchData,
  });
}
