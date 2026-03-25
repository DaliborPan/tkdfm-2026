import { type z } from "zod";

import { type BaseObject } from "../../../../evidence/base";
import { type ApiFetchFn } from "../../../../utils/api-fetch";
import {
  type ApiFilter,
  type ApiSort,
  type BrowseDataResponse,
  type EasApiSort,
} from "../../../data-table";

export type ComboboxOptionsParams = {
  /**
   * Page size
   *
   * @default 10
   */
  size?: number;

  /**
   * Attributes to serach in
   *
   * @default []
   */
  attributes?: string[];

  /**
   * Filters
   *
   * @default []
   */
  filters?: ApiFilter[];

  /**
   * IQ sort
   *
   * @default [{ field: "title", type: "FIELD", asc: true }]
   */
  sorts?: ApiSort[];

  /**
   * EAS sort
   *
   * @default []
   */
  sort?: EasApiSort[];
};

export type CreateComboboxOptionsResult<
  TOption extends BaseObject = BaseObject,
> = {
  /**
   * Search function used by infinite query
   */
  search: (
    value: string,
    page?: number,
    signal?: AbortSignal,
  ) => Promise<BrowseDataResponse<TOption>> | BrowseDataResponse<TOption>;

  /**
   * Combobox options params, used as part of the queryKey
   */
  params: ComboboxOptionsParams;

  /**
   * API endpoint
   */
  api: string;
};

/* ------------------------- Create combobox options ------------------------ */

export type CreateComboboxOptionsParams<
  TOption extends BaseObject = BaseObject,
> = {
  /**
   * Schema of combobox option
   */
  schema?: z.ZodSchema<TOption>;

  /**
   * API endpoint
   *
   * @example /api/vehicle/search-by-title
   */
  api: string;

  /**
   * ComboboxOptionsParams, such as filters
   */
  params?: ComboboxOptionsParams;

  /**
   * Function to create params for fetching options. Use this function
   * if you need to create params based on search value (query)
   */
  createParams?: (value: string, page: number) => ComboboxOptionsParams;

  /**
   * Function to fetch data from API
   */
  fetchData?: ApiFetchFn<BrowseDataResponse<TOption>>;
};

/* --------------------- Create browse combobox options --------------------- */

export type CreateBrowseComboboxOptionsParams<
  TOption extends BaseObject = BaseObject,
> = {
  /**
   * Schema of combobox option
   */
  schema?: z.ZodSchema<TOption>;

  /**
   * API endpoint **without** `/browse` suffix
   */
  api: string;

  /**
   * API endpoint suffix
   *
   * @default /browse
   */
  apiSuffix?: string;

  /**
   * Field to search in
   *
   * @default title
   */
  field?: string;

  /**
   * Custom filters
   *
   * @default [{ field, operation: "LIKE", value }]
   */
  createFilters?: (
    value: string,
    createLikeFilter: (value: string) => ApiFilter,
  ) => ApiFilter[];

  /**
   * IQ sort
   *
   * @default [{ field, type: "FIELD", asc: true }]
   */
  sorts?: ApiSort[];
};
