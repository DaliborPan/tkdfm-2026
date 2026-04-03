"use client";

import { keepPreviousData } from "@tanstack/react-query";
import { useDeferredValue } from "react";
import { z } from "zod";

import { type BaseObject } from "iqf-web-ui/base";
import { useIqfQuery } from "iqf-web-ui/use-iqf-query";

import { type DataSourceOptions } from "../types";
import { type UseBrowseDataQueryParams } from "./types";

export const DEFAULT_BROWSE_ALL_DATA_SOURCE_OPTIONS: DataSourceOptions = {
  take: -1,
  skip: 0,
  sort: [],
  filters: [],
};

function createBrowseDataResponseSchema<TData extends BaseObject>(
  schema?: z.ZodSchema<TData>,
): z.ZodObject<{
  items: z.ZodArray<z.ZodSchema<TData>>;
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
  queryKey = [api],
  schema,
  fetchData,
  options = DEFAULT_BROWSE_ALL_DATA_SOURCE_OPTIONS,
  enabled,
  apiSuffix = "/browse",
  staleTime = 0,
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
