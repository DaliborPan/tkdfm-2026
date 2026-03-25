import { type BaseObject } from "../../../../evidence/base";
import {
  DEFAULT_COMBOBOX_OPTIONS_PARAMS,
  createComboboxOptions,
} from "./combobox-options";
import {
  type CreateBrowseComboboxOptionsParams,
  type CreateComboboxOptionsResult,
} from "./types";

/**
 * Creates combobox options for Combobox component. This function should be used
 * when you want to call `/api/browse` endpoint with LIKE filter to fetch options.
 */
export function createBrowseComboboxOptions<
  TOption extends BaseObject = BaseObject,
>({
  api,
  apiSuffix = "/browse",
  schema,
  createFilters,
  field = "title",
  sorts = [{ field, asc: true, type: "FIELD" }],
}: CreateBrowseComboboxOptionsParams<TOption>): CreateComboboxOptionsResult<TOption> {
  const createLikeFilter = (value: string) => ({
    field,
    operation: "LIKE" as const,
    value,
  });

  return createComboboxOptions({
    api: `${api}${apiSuffix}`,
    schema,
    createParams: (value, page) => ({
      ...DEFAULT_COMBOBOX_OPTIONS_PARAMS,
      offset: (page - 1) * DEFAULT_COMBOBOX_OPTIONS_PARAMS.size,

      sorts,
      filters: createFilters?.(value, createLikeFilter) ?? [
        createLikeFilter(value),
      ],
    }),
  });
}
