import { cva } from "class-variance-authority";

export const labelVariants = cva(
  "text-text-primary text-sm inline-flex items-center",
  {
    variants: {
      state: {
        default: "",
        disabled: "text-text-disabled",
        success: "",
        error: "text-text-error",
      },
      disabled: {
        true: "text-text-disabled",
        false: "",
      },
      size: {
        xxs: "text-xs",
        xs: "text-xs",
        s: "",
        m: "",
        l: "",
        xl: "text-base",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);
