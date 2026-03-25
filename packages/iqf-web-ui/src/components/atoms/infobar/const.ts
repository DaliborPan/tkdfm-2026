import { type VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const ibVariants = cva(["p-4 text-m relative"], {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-white",
      success: "bg-success-500 text-white",
      error: "bg-error text-white",
      warning: "bg-warning text-white",
    },
    inverse: {
      true: "bg-white text-secondary-800 border-b border-secondary-400 pb-[15px]",
      false: "",
    },
  },
});

const ibButtonVariants = cva(
  ["bg-transparent min-h-0 px-3 max-w-[42px] max-h-8 -mt-1"],
  {
    variants: {
      variant: {
        primary: "hover:bg-primary-500 active:bg-primary-400",
        secondary:
          "hover:bg-secondary-700 active:bg-secondary-600 active:text-secondary",
        success: "hover:bg-success-600 active:bg-success-500",
        error: "hover:bg-error-500 active:bg-error-400",
        warning:
          "hover:bg-secondary-300 active:bg-secondary-400 text-secondary",
      },
      inverse: {
        true: "hover:bg-secondary-300 active:bg-secondary-400 text-secondary",
        false: "",
      },
    },
  },
);

export type InfobarVariantsType = VariantProps<typeof ibVariants>;

export const infobarButtonVariants = (variants: InfobarVariantsType) =>
  twMerge(ibButtonVariants(variants));

export const infobarVariants = (variants: InfobarVariantsType) =>
  twMerge(ibVariants(variants));
