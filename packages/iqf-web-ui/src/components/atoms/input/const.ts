import { type VariantProps, cva } from "class-variance-authority";

export const inputVariants = cva(
  [
    "text-text-primary border-text-primary group relative flex min-h-fit w-full cursor-text items-center rounded-lg border bg-white px-3 py-1",
  ],
  {
    variants: {
      size: {
        s: "text-sm min-h-8",
        m: "py-1.5 text-base min-h-10",
        l: "py-2.5 text-lg",
        xl: "px-4 py-3 text-xl",
      },
      variant: {
        primary: "border-primary-600",
        secondary: "",
      },
      disabled: {
        true: "border-neutral-100 text-text-disabled pointer-events-none [&_input]:bg-white [&_textarea]:bg-white [&_svg]:text-text-disabled",
        false: "",
      },
      invalid: {
        true: "border-error-600 text-text-error",
        false: "",
      },
      multiline: {
        true: "max-w-full [&:has(textarea:focus)]:outline [&:has(textarea:focus)]:outline-2 [&:has(textarea:focus)]:outline-offset-2 [&:has(textarea:focus)]:outline-focus [&:has(textarea:read-only)]:outline-none [&:has(textarea:read-only)]:cursor-default [&:has(textarea:read-only)_textarea]:cursor-default",
        false:
          "[&:has(input:focus)]:outline [&:has(input:focus)]:outline-2 [&:has(input:focus)]:outline-offset-2 [&:has(input:focus)]:outline-focus [&:has(input:read-only)]:outline-none [&:has(input:read-only)]:cursor-default [&:has(input:read-only)_input]:cursor-default",
      },
    },
  },
);

export type InputVariantsType = VariantProps<typeof inputVariants>;
