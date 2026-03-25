import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

import { errorToast } from "../../components/atoms/toast";
import { type ErrorObject } from "../../evidence/base";
import { sentyCaptureException } from "../../sentry/utils/capture-exception";
import { DEFAULT_ERROR_MESSAGE } from "./const";
import {
  type ApiFetchOptions,
  type IqfAxiosErrorHandler,
  type IqfAxiosErrorParams,
} from "./types";

export class IqfAxiosError {
  code: string;
  message: string;
  status: number;
  data: any;
  config: AxiosRequestConfig;
  customErrorMessage?: string;

  errorHandler?: IqfAxiosErrorHandler;

  isZodError: boolean;

  constructor({
    code,
    message,
    status,
    data,
    config,
    customErrorMessage,
    errorHandler,
  }: IqfAxiosErrorParams & {
    errorHandler?: IqfAxiosErrorHandler;
  }) {
    this.code = code;
    this.message = message;
    this.status = status;
    this.data = data;
    this.config = config;
    this.customErrorMessage = customErrorMessage;

    this.errorHandler = errorHandler;

    this.isZodError = code === "ZOD_ERROR";
  }
}

export const defaultErrorHandler: IqfAxiosErrorHandler = (error) => {
  errorToast(
    error.customErrorMessage ?? error.codeErrorMessage ?? DEFAULT_ERROR_MESSAGE,
  );
};

export async function apiFetch<TZodSchema extends z.ZodSchema>({
  schema,
  errorMessage,
  errorHandler,
  dataTransformer = (data) => data,
  ...config
}: ApiFetchOptions<TZodSchema>): Promise<z.infer<TZodSchema>> {
  try {
    const response = await axios(config);

    const data = dataTransformer(response.data);
    if (schema) {
      return schema.parse(data);
    }

    return data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      sentyCaptureException({
        error,
        feature: "zod",
        contexts: { schema },
      });
      throw new IqfAxiosError({
        code: "ZOD_ERROR",
        message: fromZodError(error).message,
        status: 500,
        data: undefined,
        config,
        errorHandler,
      });
    }

    const axiosError = error as unknown as AxiosError<ErrorObject>;

    sentyCaptureException({
      error,
      feature: "axios",
      contexts: { config },
    });
    throw new IqfAxiosError({
      code:
        axiosError?.response?.data?.code ?? axiosError?.code ?? "UNKNOWN_ERROR",
      customErrorMessage: errorMessage,
      message:
        axiosError?.message ?? (error instanceof Error ? error.message : ""),
      status: axiosError?.response?.status ?? 500,
      data: axiosError?.response?.data,
      config,
      errorHandler,
    });
  }
}

/**
 * TODO: Not accurate. Disallowing to pass schema of type
 * ZodEffects<ZodObject<{...}>>.
 */
export type ApiFetchFn<T> = typeof apiFetch<z.ZodSchema<T>>;
