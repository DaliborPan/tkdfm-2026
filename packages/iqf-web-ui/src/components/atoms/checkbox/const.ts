import { cva } from "class-variance-authority";

export const checkboxVariants = cva(
  [
    "flex items-center justify-center shrink-0 border-2 border-[#6d6d6d] rounded-[4px] transition-all",
  ],
  {
    variants: {
      size: {
        xxs: "size-3 group-has-[label]:mt-[3px]",
        xs: "size-4 group-has-[label]:mt-[3px]",
        s: "size-5",
        m: "size-6",
        l: "size-7",
        xl: "size-8",
      },
      checked: {
        true: "bg-primary border-primary",
        false: "",
      },
      invalid: {
        true: "border-error-400",
        false: "",
      },
      disabled: {
        true: "border-[#767676]/30",
        false: "",
      },
    },
    compoundVariants: [
      {
        checked: true,
        disabled: true,
        className: "bg-[#767676]/30 border-none",
      },
      {
        checked: true,
        invalid: true,
        className: "border-error-500 bg-error-500",
      },
    ],
  },
);

export const checkboxIconVariants = cva(["hidden text-white"], {
  variants: {
    size: {
      xxs: "size-2",
      xs: "size-3",
      s: "size-4",
      m: "size-5",
      l: "size-6",
      xl: "size-7",
    },
    checked: {
      true: "block text-primary-foreground",
      false: "",
    },
  },
});

export const checkboxLabelVariants = cva(["self-center"], {
  variants: {
    size: {
      xxs: "",
      xs: "",
      s: "",
      m: "",
      l: "",
      xl: "",
    },
  },
});
