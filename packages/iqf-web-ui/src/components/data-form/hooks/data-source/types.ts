import { type UseQueryResult } from "@tanstack/react-query";
import { type z } from "zod";

import { type BaseObject } from "../../../../evidence/base";
import { type IqfAxiosError } from "../../../../utils/api-fetch";
import { type DataFormProps } from "../../types";

export type UseDataSourceParams<
  /**
   * TODO: TData should be replaced with TZodSchema
   * to allow passing schema, that has a type of
   * ZodEffects<ZodObject<{...}>>
   */
  TData extends TFieldValues,
  TFieldValues extends BaseObject,
> = Pick<
  DataFormProps<TData, TFieldValues>,
  | "itemId"
  | "detailSchema"
  | "defaultValues"
  | "fetchData"
  | "onMutationSuccess"
  | "mutation"
> &
  Pick<Required<DataFormProps<TData, TFieldValues>>, "api"> & {
    buildFormSchema: DataFormProps<TData, TFieldValues>["formSchema"];
  };

export type UseDataSourceResult<
  TData extends TFieldValues,
  TFieldValues extends BaseObject,
> = {
  formSchema: z.ZodSchema<TFieldValues>;
  /**
   * Mutation used for creating and updating data.
   */
  mutation: NonNullable<DataFormProps<TData, TFieldValues>["mutation"]>;

  /**
   * Result of the query used for getting data.
   */
  query: UseQueryResult<TData, IqfAxiosError>;
};
