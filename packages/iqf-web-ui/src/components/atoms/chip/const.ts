import { type VariantProps, cva } from "class-variance-authority";

export const chipVariants = cva(
  [
    "max-w-fit",
    "truncate",
    "text-white rounded-full transition-colors",
    "inline-flex items-center justify-center",
  ],
  {
    variants: {
      size: {
        xs: "px-2.5 py-0.5 text-xs gap-x-2.5",
        s: "px-3 py-1.5 text-xs gap-x-3",
        m: "px-3 py-2.5 text-sm gap-x-3",
        l: "px-4 py-3 text-base gap-x-4",
        xl: "px-5 py-3.5 text-xl gap-x-5",
      },
      variant: {
        primary: "text-primary-foreground",
        secondary: "",
        success: "",
        error: "",
        warning: "",
      },
      inverse: {
        true: "",
        false: "",
      },
      disabled: {
        true: "",
        false: "",
      },
      as: {
        a: "",
        span: "",
        button: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        as: ["button", "a"],
        className:
          "bg-primary-600 hover:bg-primary-700 active:bg-primary-800 aria-disabled:bg-primary-300 aria-disabled:hover:bg-primary-300 aria-disabled:cursor-not-allowed",
        inverse: false,
      },
      {
        variant: "primary",
        as: "span",
        className: "bg-primary-600 aria-disabled:bg-primary-300",
        inverse: false,
      },

      {
        variant: "secondary",
        as: ["button", "a"],
        className:
          "bg-neutral-950 hover:bg-neutral-950 active:bg-neutral-950 aria-disabled:bg-neutral-200 aria-disabled:text-neutral-600 aria-disabled:hover:bg-neutral-300 aria-disabled:cursor-not-allowed",
        inverse: false,
      },
      {
        variant: "secondary",
        as: "span",
        className:
          "bg-neutral-950 aria-disabled:bg-neutral-300 aria-disabled:text-neutral-600",
        inverse: false,
      },

      {
        variant: "success",
        as: ["button", "a"],
        className:
          "bg-success-500 hover:bg-success-600 active:bg-success-700 aria-disabled:bg-success-200 aria-disabled:cursor-not-allowed",
        inverse: false,
      },
      {
        variant: "success",
        as: "span",
        className: "bg-success-500 aria-disabled:bg-success-200",
        inverse: false,
      },

      {
        variant: "error",
        as: ["button", "a"],
        className:
          "bg-error-400 hover:bg-error-500 active:bg-error-600 aria-disabled:bg-error-200 aria-disabled:cursor-not-allowed",
        inverse: false,
      },
      {
        variant: "error",
        as: "span",
        className: "bg-error-400 aria-disabled:bg-error-200",
        inverse: false,
      },

      {
        variant: "warning",
        as: ["button", "a"],
        className:
          "bg-warning-500 hover:bg-warning-600 active:bg-warning-700 aria-disabled:bg-warning-200 aria-disabled:cursor-not-allowed",
        inverse: false,
      },
      {
        variant: "warning",
        as: "span",
        className: "bg-warning-500 aria-disabled:bg-warning-200",
        inverse: false,
      },

      {
        variant: "primary",
        inverse: true,
        as: ["button", "a"],
        className:
          "bg-primary-100 border border-primary-200 text-text-primary-color aria-disabled:bg-primary-100 aria-disabled:border-primary-200 aria-disabled:text-primary aria-disabled:cursor-not-allowed",
      },
      {
        variant: "primary",
        inverse: true,
        as: ["span"],
        className:
          "bg-primary-100 border border-primary-200 text-text-primary-color aria-disabled:bg-primary-100 aria-disabled:border-primary-200 aria-disabled:text-primary",
      },

      {
        variant: "secondary",
        inverse: true,
        as: ["button", "a"],
        className:
          "bg-neutral-50 border border-neutral-200 text-neutral-950 aria-disabled:bg-neutral-200 aria-disabled:text-neutral-950 aria-disabled:cursor-not-allowed",
      },
      {
        variant: "secondary",
        inverse: true,
        as: ["span"],
        className:
          "bg-neutral-50 border border-neutral-200 text-neutral-950 aria-disabled:bg-neutral-200 aria-disabled:text-neutral-950",
      },

      {
        variant: "warning",
        inverse: true,
        as: ["button", "a"],
        className:
          "bg-warning-100 border border-warning-200 text-warning-600 aria-disabled:bg-warning-100 aria-disabled:border-warning-200 aria-disabled:text-warning-600 aria-disabled:cursor-not-allowed",
      },
      {
        variant: "warning",
        inverse: true,
        as: ["span"],
        className:
          "bg-warning-100 border border-warning-200 text-warning-600 aria-disabled:bg-warning-100 aria-disabled:border-warning-200 aria-disabled:text-warning-600",
      },

      {
        variant: "error",
        inverse: true,
        as: ["button", "a"],
        className:
          "bg-error-100 border border-error-200 text-error-500 aria-disabled:bg-error-100 aria-disabled:border-error-200 aria-disabled:text-error-500 aria-disabled:cursor-not-allowed",
      },
      {
        variant: "error",
        inverse: true,
        as: ["span"],
        className:
          "bg-error-100 border border-error-200 text-error-500 aria-disabled:bg-error-100 aria-disabled:border-error-200 aria-disabled:text-error-500",
      },

      {
        variant: "success",
        inverse: true,
        as: ["button", "a"],
        className:
          "bg-success-100 border border-success-200 text-success-600 aria-disabled:bg-success-100 aria-disabled:border-success-200 aria-disabled:text-success-600 aria-disabled:cursor-not-allowed",
      },
      {
        variant: "success",
        inverse: true,
        as: ["span"],
        className:
          "bg-success-100 border border-success-200 text-success-600 aria-disabled:bg-success-100 aria-disabled:border-success-200 aria-disabled:text-success-600",
      },
    ],
  },
);

export type ChipCVAType = typeof chipVariants;

export type ChipVariantsType = VariantProps<typeof chipVariants>;
