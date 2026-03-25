import { type UseQueryResult } from "@tanstack/react-query";
import { type DefaultValues, type FieldValues } from "react-hook-form";
import { type z } from "zod";

import { type IqfAxiosError } from "../../../utils/api-fetch";
import { type DialogComponentCommonProps } from "../dialog/types";

type ConfirmComponent = (params: {
  onSubmit: () => Promise<void>;
  isLoading: boolean;
  isError: boolean;
}) => React.ReactNode;

type FooterComponent = (params: {
  onSubmit: () => Promise<void>;
  isLoading: boolean;
  isError: boolean;
}) => React.ReactNode;

export type DecisionFnParams<T> =
  | { confirmed: false; data: undefined }
  | { confirmed: true; data: T };

export type DecisionFn<T> = (
  params: DecisionFnParams<T>,
) => Promise<void> | void;

/**
 * You need to pass dialog trigger as `children`.
 * You can pass dialog props (such as size, etc.) as `dialogProps`.
 * You can define your own confirm and cancel buttons as `confirm` and `cancel` props.
 */
export type PromptProps<T extends FieldValues> = DialogComponentCommonProps & {
  /**
   * Callback that is called when user makes a decision - cancel/confirm.
   */
  onDecision: DecisionFn<T>;

  /**
   * Form schema for the prompt.
   */
  formSchema: z.ZodSchema<T>;

  /**
   * Default values for the form.
   */
  defaultValues?: DefaultValues<T>;

  /**
   * If you want to fetch default values from API, you can pass query, that will be
   * triggered once dialog opens. Query should be enabled: false.
   */
  defaultValuesQuery?: UseQueryResult<DefaultValues<T>, IqfAxiosError>;

  /**
   * Callback that is called when form validation fails.
   */
  onFormValidationFailed?: () => void;

  /**
   * Callback that is called when an error occurs during submitting the form.
   */
  onError?: (error: unknown) => void;

  /**
   * Don't provide `onClick` to confirm button. Provide `onDecision` instead,
   * which is automatically binded to `confirm` element.
   */
  confirm?: ConfirmComponent;

  /**
   * Custom footer.
   */
  footer?: FooterComponent;

  /**
   * Disable only form inside prompt.
   *
   * @deprecated Use `readOnly` instead
   */
  disabled?: boolean;

  /**
   * Make form read-only.
   */
  readOnly?: boolean;
};
