import { type VariantProps, cva } from "class-variance-authority";

export const tagVariants = cva(
  ["flex justify-center items-center gap-x-2 rounded max-w-max"],
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        success: "",
        error: "",
        warning: "",
      },
      size: {
        xs: "text-xs px-[10px] py-[2px] min-h-6",
        s: "text-xs px-3 py-1 min-h-8",
        m: "text-sm px-3 py-[6px] min-h-10",
        l: "text-base px-4 py-2 min-h-12",
        xl: "text-lg px-5 py-3 min-h-14",
      },
      inverse: {
        true: "border-[1px]",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        inverse: false,
        class: "bg-primary text-primary-foreground",
      },
      {
        variant: "secondary",
        inverse: false,
        class: "bg-neutral-950 text-white",
      },
      {
        variant: "success",
        inverse: false,
        class: "bg-success-500 text-white",
      },
      {
        variant: "error",
        inverse: false,
        class: "bg-error-400 text-white",
      },
      {
        variant: "warning",
        inverse: false,
        class: "bg-warning-500 text-white",
      },
      {
        variant: "primary",
        inverse: true,
        class: "bg-primary-100 text-text-primary-color border-primary-200",
      },
      {
        variant: "secondary",
        inverse: true,
        class: "bg-neutral-50 text-neutral-950 border-neutral-200",
      },
      {
        variant: "success",
        inverse: true,
        class: "bg-success-100 text-success-600 border-success-200",
      },
      {
        variant: "error",
        inverse: true,
        class: "bg-error-100 text-error-500 border-error-200",
      },
      {
        variant: "warning",
        inverse: true,
        class: "bg-warning-100 text-warning-600 border-warning-200",
      },
    ],
  },
);

export type TagVariantsType = VariantProps<typeof tagVariants>;
