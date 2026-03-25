import { z } from "zod";

import { type BaseObject } from "../../../../evidence/base";
import { apiFetch } from "../../../../utils/api-fetch";
import {
  type CreateAutocompleteOptionsParams,
  type CreateAutocompleteOptionsResult,
} from "../types";

const ITEMS_PER_REQUEST = 10;

const createResponseSchema = <ItemType>(schema: z.ZodSchema<ItemType>) =>
  z.object({
    items: z.array(schema),
  });

function createSearchCallback<TOption extends BaseObject = BaseObject>({
  url,
  params: { size, attributes, filters, sorts, sort },
  schema,
  createParams,
  fetchData,
}: Required<Omit<CreateAutocompleteOptionsParams<TOption>, "createParams">> &
  Pick<CreateAutocompleteOptionsParams<TOption>, "createParams">) {
  return async (value: string, page = 1) => {
    const params = createParams
      ? createParams(value, page)
      : {
          attributes,
          offset: (page - 1) * size,
          size,
          filters,
          sorts,
          sort,
        };

    try {
      const searchParams = `query=${encodeURIComponent(value || "")}`;

      const result = await fetchData({
        schema: createResponseSchema(schema),
        method: "POST",
        url: url.includes("?")
          ? `${url}&${searchParams}`
          : `${url}?${searchParams}`,
        data: params,
      });

      return result.items;
    } catch (error) {
      console.error(error);

      return [] as TOption[];
    }
  };
}

/**
 * @deprecated use `createComboboxOptions` instead
 */
export function createAutocompleteOptions<
  TOption extends BaseObject = BaseObject,
>({
  url,
  params = {
    attributes: [],
    size: ITEMS_PER_REQUEST,
    filters: [],
    sorts: [
      {
        field: "title",
        type: "FIELD",
        asc: true,
      },
    ],
  },
  createParams,
  schema = z.any(),
  fetchData = apiFetch,
}: CreateAutocompleteOptionsParams<TOption>): CreateAutocompleteOptionsResult<TOption> {
  return {
    search: createSearchCallback({
      url,
      params,
      schema,
      createParams,
      fetchData,
    }),
    params,
    url,
  };
}
