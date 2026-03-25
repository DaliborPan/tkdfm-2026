import { cva } from "class-variance-authority";

export const iconVariants = cva("flex-shrink-0 text-primary-600", {
  variants: {
    size: {
      xs: "size-3",
      s: "size-3.5",
      m: "size-4",
      l: "size-[18px]",
      xl: "size-5",
    },
    disabled: {
      true: "text-text-disabled",
      false: "",
    },
    invalid: {
      true: "text-error-600",
      false: "",
    },
    success: {
      true: "text-success-600",
      false: "",
    },
  },
  defaultVariants: {
    size: "s",
  },
});
