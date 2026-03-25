import { type AxiosRequestConfig } from "axios";
import { type z } from "zod";
import { type ErrorOptions } from "zod-validation-error";

export type IqfAxiosErrorParams = {
  code: string;
  message: string;
  status: number;
  data: any;
  config: AxiosRequestConfig;
  customErrorMessage?: string;
};

export type IqfAxiosErrorHandler = (
  params: IqfAxiosErrorParams & {
    codeErrorMessage?: string;
  },
) => void;

export type ApiFetchOptions<TZodSchema extends z.ZodSchema = z.ZodSchema> =
  AxiosRequestConfig & {
    schema?: TZodSchema;
    dataTransformer?: (data: any) => any;
  } & (
      | {
          errorMessage?: string;
          errorHandler?: never;
        }
      | {
          errorHandler?: IqfAxiosErrorHandler;
          errorMessage?: never;
        }
    );

export type ApiValidationErrorOptions = ErrorOptions & {
  path: string;
};
