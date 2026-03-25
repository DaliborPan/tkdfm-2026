import { type UseMutationResult } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";
import { type FieldValues } from "react-hook-form";
import { type z } from "zod";

import { type BaseObject } from "../../evidence/base";
import { type ApiFetchOptions } from "../../utils/api-fetch";

export type DataFormMutationVariables<TFieldValues extends FieldValues> = {
  values: TFieldValues;
  type: "update" | "create";
};

/**
 * From RHF
 */
type DeepPartial<T> = {
  [K in keyof T]?: DeepPartial<T[K]>;
};

export type DataFormProps<
  TData extends TFieldValues,
  TFieldValues extends BaseObject,
> = PropsWithChildren<{
  /**
   * Base API for manipulating data
   */
  api: string;

  /**
   * ID of the item
   */
  itemId: string;

  /**
   * Default values for the form
   */
  defaultValues?: DeepPartial<TFieldValues>;

  /**
   * Custom function for fetching data
   */
  fetchData?: (params: {
    apiFetchOptions: ApiFetchOptions<z.ZodSchema<TData>>;
    id: string;
  }) => Promise<TData>;

  /**
   * Function that is called after create/update mutation.
   *
   * @deprecated use custom `mutation` instead.
   */
  onMutationSuccess?: (params: {
    values: TFieldValues;

    /**
     * Result of the API call. It might be a TData, but not guaranteed. You
     * should validate it yourself.
     */
    result: any;
    type: "create" | "update";
  }) => Promise<void> | void;

  /**
   * Mutation for creating and updating the form
   */
  mutation?: UseMutationResult<
    /**
     * Result of the API call. It might be a TData, but not guaranteed. You
     * should validate it yourself.
     */
    any,
    // Note: It would be more correct to have IqfAxiosError as the error type.
    Error,
    DataFormMutationVariables<TFieldValues>,
    unknown
  >;

  /**
   * Custom header
   */
  header?: React.ReactNode;

  /**
   * Custom toolbar
   */
  toolbar?: React.ReactNode;

  /**
   * Schema for detail data
   */
  detailSchema: z.ZodSchema<TData>;

  /**
   * Schema for form data
   */
  formSchema:
    | ((params: {
        data: TData;
        mode: "NEW" | "EDIT";
      }) => z.ZodSchema<TFieldValues>)
    | z.ZodSchema<TFieldValues>;

  /**
   * Base URL, for navigating after a form close
   */
  url: string;

  /**
   * Function that determines if the form is read-only, or simple boolean.
   *
   * @default false
   */
  readOnly?: ((data: TData) => boolean) | boolean;

  /**
   * Function that is used to map the data to a title, displayed
   * by default in header.
   *
   * @default (data) => data.title
   */
  titleMapper?: (data: TData) => string;

  /**
   * Custom class name for the `<form>` element.
   */
  className?: string;

  /**
   * Can override default behaviour, that is specified in
   * settings.form.enableWebsocketUpdate.
   *
   * @default coming from settings.form.enableWebsocketUpdate
   */
  enableWebsocketUpdate?: boolean;

  /**
   * Used for mapping result of POST /entity (creating new entity)
   * to URL for the detail view.
   *
   * @default (result, url) => `${url}/${responseData.id}`,
   *
   * @deprecated TODO(iqf): Should be renamed in the future. Althought it is
   * commonly used, it is very specific prop for specific use case.
   * Should be replaced with other approach.
   */
  detailUrlMapper?: (result: any, url: string) => string;
}>;
