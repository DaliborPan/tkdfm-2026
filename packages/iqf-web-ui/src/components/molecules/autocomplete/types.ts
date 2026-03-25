import { type ReactNode } from "react";
import { type z } from "zod";

import { type BaseObject } from "../../../evidence/base/base-schema";
import { type ApiFetchFn } from "../../../utils/api-fetch";
import { type AtomMessageProps } from "../../atoms/atom-message/types";
import { type IconProps } from "../../atoms/icon/types";
import { type InputComponentProps } from "../../atoms/input/types";
import { type StateAtomControlContextType } from "../../atoms/state-atom-control/types";
import {
  type ApiFilter,
  type ApiSort,
  type EasApiSort,
} from "../../data-table/types";

export type AutocompleteProps<ItemType extends BaseObject> = Omit<
  InputComponentProps,
  "value" | "onSelect" | "onChange" | "inputType" | "type"
> & {
  /**
   * `queryKeyId` of autocomplete used as part of queryKey
   */
  queryKeyId: string;

  /**
   * Value of autocomplete
   */
  value?: ItemType | ItemType[];

  /**
   * Path to id in item
   */
  idMapper?: (item: ItemType | null) => string;

  /**
   * Maps item to option label
   */
  labelMapper: (item: ItemType | null) => string;

  /**
   * Source of autocomplete options.
   * Includes fetcher that is used in infinite query,
   * and options such as pageSize.
   */
  options: CreateAutocompleteOptionsResult<ItemType>;

  /**
   * Minimum length of query to start fetching options
   *
   * @default 0
   */
  minQueryLength?: number;

  /**
   * Callback called when option is selected
   */
  onChange: (data: ItemType | ItemType[] | null) => void;

  /**
   * Callback called when input value changes
   */
  onInputChange?: (value: string) => void;

  /**
   * If multiple, show selected items below the input
   */
  showSelectedList?: boolean;

  showClearButton?: boolean;

  multiple?: boolean;
  label?: ReactNode;
  message?: AtomMessageProps;
  iconRight?: IconProps;

  /**
   * Autocomplete's state. For `FormAutocomplete`, state is passed via `FormControl` component.
   */
  state?: StateAtomControlContextType["state"];
};

export type AutocompleteFetchParams = {
  size: number;
  attributes: string[];
  filters?: ApiFilter[];
  sorts?: ApiSort[];
  sort?: EasApiSort[];
};

export type CreateAutocompleteOptionsParams<
  TOption extends BaseObject = BaseObject,
> = {
  url: string;
  params?: AutocompleteFetchParams;
  schema?: z.ZodSchema<TOption>;
  createParams?: (value: string, page: number) => AutocompleteFetchParams;
  fetchData?: ApiFetchFn<{ items: TOption[] }>;
};

export type CreateAutocompleteOptionsResult<
  TOption extends BaseObject = BaseObject,
> = {
  search: (value: string, page?: number) => Promise<TOption[]> | TOption[];
  params: AutocompleteFetchParams;
  url: string;
};
