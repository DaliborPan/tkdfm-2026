import { type DialogComponentCommonProps } from "../dialog/types";

type ConfirmComponent = (state: {
  isLoading: boolean;
  isError: boolean;
}) => React.ReactNode;

export type DecisionFn = (confirmed: boolean) => Promise<void> | void;

/**
 * You need to pass dialog trigger as `children`.
 * You can pass dialog props (such as size, etc.) as `dialogProps`.
 * You can define your own confirm and cancel buttons as `confirm` and `cancel` props.
 */
export type ConfirmProps = DialogComponentCommonProps & {
  /**
   * Function that will be called when user makes a decision - confirm/cancel.
   */
  onDecision: DecisionFn;

  /**
   * Function that will be called when error occurs while submitting the dialog.
   */
  onError?: (error: unknown) => void;

  /**
   * Don't provide `onClick` to confirm button. Provide `onDecision` instead,
   * which is automatically binded to `confirm` element.
   */
  confirm?: ConfirmComponent;

  /**
   * If you want to disable the confirm button, you can pass `disabled` prop.
   */
  disabled?: boolean;
};
