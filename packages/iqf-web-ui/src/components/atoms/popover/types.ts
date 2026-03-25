export type PopoverProps = (
  | {
      /**
       * @deprecated use `trigger` instead
       */
      Trigger: React.ReactNode;
      trigger?: never;
    }
  | {
      trigger: React.ReactNode;
      /**
       * @deprecated use `Trigger` instead
       */
      Trigger?: never;
    }
) &
  (
    | {
        /**
         * @deprecated use `content` instead
         */
        Content: React.ReactNode;
        content?: never;
      }
    | {
        content: React.ReactNode;
        /**
         * @deprecated use `Content` instead
         */
        Content?: never;
      }
  ) & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    showArrow?: boolean;
    position?: "top" | "bottom" | "left" | "right";
    className?: string;
    arrowClassName?: string;
    sideOffsetValue?: number;
    onClose?: () => void;
    modal?: boolean;

    /**
     * if `true`, the popover will focus on the first focusable element of content when opened
     */
    onOpenAutoFocus?: boolean;

    /**
     * if `true`, the popover will focus on the trigger when closed
     */
    onCloseAutoFocus?: boolean;
  };
