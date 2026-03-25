import { type VariantProps, cva } from "class-variance-authority";

export const separatorVariants = cva(
  "focus-visible:ring-primary-400 relative flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1",
  {
    variants: {
      variant: {
        vertical:
          "w-0 after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        horizontal:
          "h-px w-full transition-colors after:absolute after:inset-x-0 after:top-1/2 after:h-4 after:w-full after:-translate-y-1/2 hover:after:bg-neutral-500/10",
      },
    },
    defaultVariants: {
      variant: "vertical",
    },
  },
);

export const handleVariants = cva(
  "z-[41] flex items-center justify-center rounded border bg-neutral-100",
  {
    variants: {
      variant: {
        vertical: "h-4 w-3",
        horizontal: "h-3 w-4",
      },
    },
  },
);

export const iconVariants = cva("z-10 size-2.5", {
  variants: {
    variant: {
      vertical: "",
      horizontal: "rotate-90",
    },
  },
});

export type SeparatorVariantsType = VariantProps<typeof separatorVariants>;
