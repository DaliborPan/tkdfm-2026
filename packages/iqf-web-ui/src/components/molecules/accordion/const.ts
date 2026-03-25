import { cva } from "class-variance-authority";

export const sizeVariants = cva(
  "px-4 flex flex-1 items-center justify-between py-4 text-sm font-normal transition-all text-primary [&[data-state=open]>svg]:rotate-180 hover:bg-primary-200",
  {
    variants: {
      size: {
        xs: "text-xs py-2",
        s: "text-sm py-3",
        m: "text-base py-4",
        l: "text-lg py-5",
        xl: "text-xl py-6",
      },
    },
    defaultVariants: {
      size: "m",
    },
  },
);

export const iconSizeVariants = {
  xs: "h-3 w-3",
  s: "h-4 w-4",
  m: "h-5 w-5",
  l: "h-6 w-6",
  xl: "h-7 w-7",
};
