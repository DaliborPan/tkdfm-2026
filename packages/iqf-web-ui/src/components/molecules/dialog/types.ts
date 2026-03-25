import { type PropsWithChildren } from "react";

import { type TooltipProps } from "../../atoms/tooltip";

export type DialogSize = "s" | "m" | "l" | "xl" | "2xl";

export type OverlayComponentType = "Overlay" | "div";

export type DialogContentProps = {
  className?: string;
  size?: DialogSize;

  /**
   * Using `div` as an Overlay component enables
   * Autocomplete/Select to be scrollable when rendered inside Dialog.Content.
   *
   * However, it allows rest of the body to be scrollable even when Dialog is open.
   * https://github.com/radix-ui/primitives/issues/1159
   */
  overlayAs?: OverlayComponentType;
};

export type DialogContentContextType = {
  size: DialogSize;
};

/**
 * Common type for Alert/Confirm/Prompt components.
 */
export type DialogComponentCommonProps = PropsWithChildren<{
  /**
   * Dialog content's props. Usually used for setting dialog's size.
   *
   * @example dialogProps={{ size: "2xl" }}
   */
  dialogProps?: DialogContentProps;

  /**
   * If you want to control the open state, you can pass `open` prop.
   */
  open?: boolean;

  /**
   * Usually used together with `open`, achieving controlled dialog.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Dialog's title
   */
  title?: React.ReactNode;

  /**
   * Dialog's subtitle.
   *
   * Available only for Component: Dialog
   */
  subtitle?: string;

  /**
   * Content (body) of the dialog.
   */
  content: React.ReactNode;

  /**
   * If you want to use tooltip trigger, you can pass tooltip props here.
   *
   * Actual trigger still goes as `children` and must be a button.
   * If custom button component is used, it must be implemented using `forwardRef`.
   */
  triggerTooltipProps?: Omit<TooltipProps, "Trigger">;

  /**
   * Custom cancel button.
   */
  cancel?: React.ReactNode;
}>;
