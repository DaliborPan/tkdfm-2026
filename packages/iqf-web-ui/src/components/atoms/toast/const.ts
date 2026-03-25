import { type VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const tVaraints = cva(
  [
    "relative whitespace-break-spaces flex sm:flex-row gap-3 p-3 pr-[68px] text-m flex-col top-4 rounded-lg z-[301] max-w-[375px] overflow-hidden !right-0",
  ],
  {
    variants: {
      color: {
        primary: "bg-primary",
        secondary: "bg-secondary",
        success: "bg-success-500",
        error: "bg-error",
        warning: "bg-warning",
      },
      type: {
        subtle:
          "bg-white shadow-md before:flex before:w-1 before:absolute before:top-0 before:bottom-0 before:left-0 ",
        bold: "text-white",
      },
    },
    compoundVariants: [
      {
        color: "primary",
        type: "subtle",
        class: "bg-primary-100 before:bg-primary",
      },
      {
        color: "secondary",
        type: "subtle",
        class: "bg-secondary-500 before:bg-secondary",
      },
      {
        color: "success",
        type: "subtle",
        class: "bg-success-100 before:bg-success-500",
      },
      {
        color: "error",
        type: "subtle",
        class: "bg-error-100 before:bg-error",
      },
      {
        color: "warning",
        type: "subtle",
        class: "bg-warning-100 before:bg-warning",
      },
      {
        color: "warning",
        type: "bold",
        class: "text-secondary",
      },
    ],
  },
);

const tIconVariants = cva(["relative flex items-center h-6"], {
  variants: {
    color: {
      primary: "text-primary",
      secondary: "text-secondary",
      success: "text-success-500",
      error: "text-error",
      warning: "text-warning",
    },
    type: {
      subtle: "",
      bold: "text-white",
    },
  },
  compoundVariants: [
    {
      color: "warning",
      type: "bold",
      class: "text-seocndary",
    },
  ],
});

const tButtonVariants = cva(
  ["bg-transparent absolute right-3 top-2 px-3 py-1 h-8 rounded-lg"],
  {
    variants: {
      color: {
        primary: "hover:bg-primary-500 active:bg-primary-400",
        secondary:
          "hover:bg-secondary-700 active:bg-secondary-600 active:text-secondary",
        success: "hover:bg-success-600 active:bg-success-500",
        error: "hover:bg-error-500 active:bg-error-400",
        warning: "hover:bg-warning-500 active:bg-warning-400",
      },
      type: {
        subtle: "hover:bg-secondary-300 active:bg-secondary-400 text-secondary",
        bold: "",
      },
    },
    compoundVariants: [
      { color: "warning", type: "bold", class: "text-secondary" },
    ],
  },
);

export type ToastVariantsType = VariantProps<typeof tVaraints>;

export const toastVariants = (variants: ToastVariantsType) =>
  twMerge(tVaraints(variants));

export const toastIconVariants = (variants: ToastVariantsType) =>
  twMerge(tIconVariants(variants));

export const toastButtonVariants = (variants: ToastVariantsType) =>
  twMerge(tButtonVariants(variants));
