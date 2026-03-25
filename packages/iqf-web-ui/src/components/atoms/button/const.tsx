import { type VariantProps, cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "aria-disabled:text-text-disabled whitespace-nowrap rounded-lg font-bold transition-colors aria-disabled:cursor-not-allowed",
    "inline-flex items-center justify-center gap-1.5",
  ],
  {
    variants: {
      size: {
        xs: "px-2 min-h-6 text-xs gap-1.5",
        s: "px-3 min-h-8 text-sm gap-2",
        m: "px-4 min-h-10 text-base gap-3",
        l: "px-5 min-h-12 text-lg gap-3.5",
        xl: "px-6 min-h-14 text-xl gap-[18px]",
      },
      variant: {
        solid:
          "aria-disabled:bg-neutral-200 text-primary-foreground aria-disabled:text-neutral-300 aria-disabled:bg-neutral-200",
        outlined:
          "border aria-disabled:bg-transparent aria-disabled:border-neutral-200",
        link: "px-0 min-h-0 underline hover:no-underline aria-disabled:text-neutral-300",
        base: "aria-disabled:hover:bg-transparent",
      },
      color: {
        primary: "",
        secondary: "",
        success: "",
        error: "",
        warning: "",
      },
      inverse: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      /* ---------------------------------- solid --------------------------------- */
      {
        variant: "solid",
        color: "primary",
        class: "bg-primary hover:bg-primary-700 active:bg-primary-800",
      },
      {
        variant: "solid",
        color: "secondary",
        class: "bg-neutral hover:bg-neutral-700",
      },
      {
        variant: "solid",
        color: "success",
        class: "bg-success hover:bg-success-700 active:bg-success-800",
      },
      {
        variant: "solid",
        color: "error",
        class: "bg-error hover:bg-error-700 active:bg-error-800",
      },
      {
        variant: "solid",
        color: "warning",
        class: "bg-warning hover:bg-warning-700 active:bg-warning-800",
      },
      /* ---------------------------------- solid inverse - should be removed --------------------------------- */
      {
        variant: "solid",
        color: "primary",
        inverse: true,
        class:
          "bg-primary-200 text-primary hover:bg-primary hover:text-white active:bg-primary-300 aria-disabled:text-primary-400 aria-disabled:hover:text-primary-400",
      },
      {
        variant: "solid",
        color: "secondary",
        inverse: true,
        class:
          "bg-white text-secondary hover:bg-secondary-300 active:bg-secondary-400 aria-disabled:text-secondary-500 aria-disabled:hover:text-secondary-500",
      },
      {
        variant: "solid",
        color: "success",
        inverse: true,
        class:
          "bg-white text-success-500 hover:bg-success-100 active:bg-success-200 aria-disabled:text-success-300 aria-disabled:hover:text-success-300",
      },
      {
        variant: "solid",
        color: "error",
        inverse: true,
        class:
          "bg-white text-error hover:bg-error-100 active:bg-error-200 aria-disabled:text-error-200 aria-disabled:hover:text-error-200",
      },
      {
        variant: "solid",
        color: "warning",
        inverse: true,
        class:
          "bg-white text-warning-500 hover:bg-warning-200 active:bg-warning-300 aria-disabled:text-warning aria-disabled:hover:text-warning",
      },
      /* ---------------------------------- base ---------------------------------- */
      {
        variant: "base",
        color: "primary",
        class:
          "text-text-primary-color hover:bg-primary-200 active:bg-primary-300",
      },
      {
        variant: "base",
        color: "secondary",
        class: "text-text-primary hover:bg-neutral-200 active:bg-neutral-300",
      },
      {
        variant: "base",
        color: "success",
        class: "text-success-700 hover:bg-success-200 active:bg-success-300",
      },
      {
        variant: "base",
        color: "error",
        class: "text-error-700 hover:bg-error-200 active:bg-error-300",
      },
      {
        variant: "base",
        color: "warning",
        class: "text-warning-700 hover:bg-warning-200 active:bg-warning-300",
      },
      /* ---------------------------------- base inverse - should be removed ---------------------------------- */
      {
        variant: "base",
        color: "primary",
        inverse: true,
        class:
          "text-white hover:bg-primary-500 active:bg-primary-500 aria-disabled:text-primary-400 aria-disabled:hover:text-primary-400",
      },
      {
        variant: "base",
        color: "secondary",
        inverse: true,
        class:
          "text-white hover:bg-secondary-500 active:bg-secondary-500 aria-disabled:text-secondary-600 aria-disabled:hover:text-secondary-600",
      },
      {
        variant: "base",
        color: "success",
        inverse: true,
        class:
          "text-white hover:bg-success-500 active:bg-success-500 aria-disabled:text-success-300 aria-disabled:hover:text-success-300",
      },
      {
        variant: "base",
        color: "error",
        inverse: true,
        class:
          "text-white hover:bg-error-500 active:bg-error-500 aria-disabled:text-error-200 aria-disabled:hover:text-error-200",
      },
      {
        variant: "base",
        color: "warning",
        inverse: true,
        class:
          "text-white hover:bg-warning-500 active:bg-warning-500 aria-disabled:text-warning aria-disabled:hover:text-warning",
      },
      /* ---------------------------------- link ---------------------------------- */
      {
        variant: "link",
        color: "primary",
        class: "text-text-primary-color",
      },
      {
        variant: "link",
        color: "secondary",
        class: "text-text-primary",
      },
      {
        variant: "link",
        color: "success",
        class: "text-success-700",
      },
      {
        variant: "link",
        color: "error",
        class: "text-error-700",
      },
      {
        variant: "link",
        color: "warning",
        class: "text-warning-700",
      },
      /* ---------------------------------- link inverse - should be removed ---------------------------------- */
      {
        variant: "link",
        color: "primary",
        inverse: true,
        class:
          "text-white active:text-primary-300 aria-disabled:text-primary-400 aria-disabled:hover:text-primary-400",
      },
      {
        variant: "link",
        color: "secondary",
        inverse: true,
        class:
          "text-white active:text-secondary-600 aria-disabled:text-secondary-600 aria-disabled:hover:text-secondary-600",
      },
      {
        variant: "link",
        color: "success",
        inverse: true,
        class:
          "text-white active:text-success-300 aria-disabled:text-success-300 aria-disabled:hover:text-success-300",
      },
      {
        variant: "link",
        color: "error",
        inverse: true,
        class:
          "text-white active:text-error-200 aria-disabled:text-error-200 aria-disabled:hover:text-error-200",
      },
      {
        variant: "link",
        color: "warning",
        inverse: true,
        class:
          "text-white active:text-warning-600 aria-disabled:text-warning aria-disabled:hover:text-warning",
      },
      /* -------------------------------- outlined -------------------------------- */
      {
        variant: "outlined",
        color: "primary",
        class:
          "text-text-primary-color border-primary hover:bg-primary-200 active:bg-primary-300",
      },
      {
        variant: "outlined",
        color: "secondary",
        class:
          "text-text-primary border-neutral hover:bg-neutral-200 active:bg-neutral-300",
      },
      {
        variant: "outlined",
        color: "success",
        class:
          "text-success-700 border-success hover:bg-success-200 active:bg-success-300",
      },
      {
        variant: "outlined",
        color: "error",
        class:
          "text-error-700 border-error hover:bg-error-200 active:bg-error-300",
      },
      {
        variant: "outlined",
        color: "warning",
        class:
          "text-warning-700 border-warning hover:bg-warning-200 active:bg-warning-300",
      },
      /* -------------------------------- outlined inverse - should be removed -------------------------------- */
      {
        variant: "outlined",
        color: "primary",
        inverse: true,
        class:
          "border border-white text-white hover:bg-primary-500 active:bg-primary-300 aria-disabled:text-primary-400 aria-disabled:border-primary-300 aria-disabled:hover:text-primary-400 aria-disabled:hover:border-primary-300",
      },
      {
        variant: "outlined",
        color: "secondary",
        inverse: true,
        class:
          "border border-white text-white hover:bg-secondary-500 active:bg-secondary-300 aria-disabled:text-secondary-600 aria-disabled:border-secondary-600 aria-disabled:hover:text-secondary-600 aria-disabled:hover:border-secondary-600",
      },
      {
        variant: "outlined",
        color: "success",
        inverse: true,
        class:
          "border border-white text-white hover:bg-success-500 active:bg-success-300 aria-disabled:text-success-300 aria-disabled:border-success-300 aria-disabled:hover:text-success-300 aria-disabled:hover:border-success-300",
      },
      {
        variant: "outlined",
        color: "error",
        inverse: true,
        class:
          "border border-white text-white hover:bg-error-500 active:bg-error-300 aria-disabled:text-error-200 aria-disabled:border-error-200 aria-disabled:hover:text-error-200 aria-disabled:hover:border-error-200",
      },
      {
        variant: "outlined",
        color: "warning",
        inverse: true,
        class:
          "border border-white text-white hover:bg-warning-500 active:bg-warning-300 aria-disabled:text-warning aria-disabled:border-warning aria-disabled:hover:text-warning aria-disabled:hover:border-warning",
      },
    ],
  },
);

export const buttonIconVariants = cva([], {
  variants: {
    size: {
      xs: "size-3",
      s: "size-3.5",
      m: "size-4",
      l: "size-[18px]",
      xl: "size-5",
    },
  },
});

export type ButtonCVAType = typeof buttonVariants;

export type ButtonVariantsType = VariantProps<typeof buttonVariants>;
