import { type VariantProps, cva } from "class-variance-authority";

export const messageVariants = cva(
  ["border-l-4 py-3 px-4 flex flex row items-center gap-4"],
  {
    variants: {
      variant: {
        primary: "bg-primary-100 border-primary-600 text-text-primary",
        secondary: "bg-secondary-100 border-secondary-800",
        success: "bg-success-100 border-success-400",
        error: "bg-error-100 border-error-400",
        warning: "bg-warning-100 border-warning-400",
      },
      inverse: {
        true: "bg-white",
        false: "",
      },
    },
  },
);

export type MessageVariantsType = VariantProps<typeof messageVariants>;
