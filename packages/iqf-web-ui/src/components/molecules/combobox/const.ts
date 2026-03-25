import { cva } from "class-variance-authority";

export const comboboxVariants = cva(
  [
    "border-text-primary rounded-lg font-normal text-text-primary bg-white w-full h-full focus:outline-offset-4 focus:outline-focus outline-2 group justify-start min-h-fit px-3 hover:bg-neutral-50 active:bg-neutral-100 aria-readonly:cursor-default aria-readonly:hover:bg-white aria-readonly:active:bg-white aria-readonly:focus:outline-none",
  ],
  {
    variants: {
      size: {
        xs: "py-1 text-xs",
        s: "py-1 text-sm h-8",
        m: "py-1.5 text-base h-10",
        l: "py-2.5 text-lg h-12",
        xl: "px-4 py-3 text-xl h-14",
      },
      disabled: {
        true: "bg-secondary-300 aria-disabled:border-secondary-600 aria-disabled:hover:border-secondary-600 aria-disabled:text-secondary-600 aria-disabled:hover:text-secondary-600 aria-disabled:hover:bg-secondary-300",
        false: "",
      },
      multiple: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { multiple: true, size: "xs", class: "pl-1" },
      { multiple: true, size: "s", class: "pl-1" },
      { multiple: true, size: "m", class: "pl-1.5" },
      { multiple: true, size: "l", class: "pl-2.5" },
      { multiple: true, size: "xl", class: "pl-3" },
    ],
  },
);

export const comboboxMultipleItemVariants = cva(["text-xs"], {
  variants: {
    size: {
      xs: "text-xs",
      s: "text-xs",
      m: "text-sm",
      l: "text-sm",
      xl: "text-base",
    },
  },
});
