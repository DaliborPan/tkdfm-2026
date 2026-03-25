import { cva } from "class-variance-authority";

export const atomMessageContainerVariants = cva(
  "text-text-secondary flex items-center mt-1 text-sm gap-x-[6px]",
  {
    variants: {
      state: {
        default: "",
        success: "text-text-success",
        error: "text-text-error",
      },
      size: {
        xs: "text-xs",
        s: "",
        m: "",
        l: "",
        xl: "text-base gap-x-2",
      },
      disabled: {
        true: "text-text-disabled",
        false: "",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export const atomMessageIconVariants = cva("size-4", {
  variants: {
    size: {
      xs: "size-3",
      s: "",
      m: "",
      l: "",
      xl: "size-5",
    },
    state: {
      default: "text-neutral-500",
      success: "text-success-600",
      error: "text-error-600",
    },
    disabled: {
      true: "text-neutral-300",
      false: "",
    },
  },
  defaultVariants: {
    state: "default",
  },
});
