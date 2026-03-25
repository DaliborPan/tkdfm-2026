import { z } from "zod";

import { type BaseObject } from "../../../../evidence/base";
import { apiFetch } from "../../../../utils/api-fetch";
import {
  createDefaultSafePaseErrorHandler,
  safeParse,
} from "../../../../utils/safe-parse";
import { createBrowseDataResponseSchema } from "../../../data-table/hooks/browse-data-query";
import {
  type ComboboxOptionsParams,
  type CreateComboboxOptionsParams,
  type CreateComboboxOptionsResult,
} from "./types";

const ITEMS_PER_REQUEST = 10;

function createSearchCallback<TOption extends BaseObject = BaseObject>({
  api,
  schema,
  fetchData,

  params,
  createParams = (_, page) => ({
    ...params,
    offset: (page - 1) * params.size,
  }),
}: Required<
  Omit<CreateComboboxOptionsParams<TOption>, "createParams" | "params">
> &
  Pick<CreateComboboxOptionsParams<TOption>, "createParams"> & {
    params: Required<
      NonNullable<CreateComboboxOptionsParams<TOption>["params"]>
    >;
  }) {
  return async (value: string, page = 1, signal?: AbortSignal) => {
    try {
      const searchParams = `query=${encodeURIComponent(value || "")}`;

      const result = await fetchData({
        method: "POST",
        url: api.includes("?")
          ? `${api}&${searchParams}`
          : `${api}?${searchParams}`,
        data: createParams(value, page),
        signal,
      });

      return safeParse(createBrowseDataResponseSchema(schema), result, {
        onError: createDefaultSafePaseErrorHandler({
          method: "POST",
          api,
        }),
      });
    } catch (error) {
      console.error(error);

      return {
        items: [],
        totalCount: 0,
      };
    }
  };
}

export const DEFAULT_COMBOBOX_OPTIONS_PARAMS: Required<ComboboxOptionsParams> =
  {
    attributes: [],
    filters: [],
    size: ITEMS_PER_REQUEST,
    sort: [],
    sorts: [
      {
        field: "title",
        type: "FIELD" as const,
        asc: true,
      },
    ],
  };

/**
 * Creates combobox options for Combobox component. This function should be used
 * when you want to call `/api?query=...` endpoint to fetch options.
 */
export function createComboboxOptions<TOption extends BaseObject = BaseObject>({
  api,
  createParams,
  schema = z.any(),
  fetchData = apiFetch,

  ...props
}: CreateComboboxOptionsParams<TOption>): CreateComboboxOptionsResult<TOption> {
  const params = {
    ...DEFAULT_COMBOBOX_OPTIONS_PARAMS,
    ...props.params,
  };

  return {
    search: createSearchCallback({
      api,
      params,
      schema,
      createParams,
      fetchData,
    }),
    params,
    api,
  };
}
