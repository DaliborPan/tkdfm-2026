import { cva } from "class-variance-authority";

export const radioVariants = cva(
  [
    "flex items-center justify-center shrink-0 border-2 border-[#6d6d6d] rounded-full p-0.5 transition-all",
  ],
  {
    variants: {
      size: {
        xxs: "size-3 group-has-[label]:mt-[3px] p-[1px]",
        xs: "size-4 group-has-[label]:mt-[3px] p-0.5",
        s: "size-5 p-[3px]",
        m: "size-6 p-[3px]",
        l: "size-7 p-[3px]",
        xl: "size-8 p-[3px]",
      },
      checked: {
        true: "border-primary",
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
  },
);

export const radioIconVariants = cva(
  ["rounded-full shrink-0 size-full transition-all"],
  {
    variants: {
      checked: {
        true: "visible bg-primary",
        false: "invisible bg-transparent",
      },
      invalid: {
        true: "",
        false: "",
      },
      disabled: {
        true: "bg-[#767676]/30",
        false: "",
      },
    },
    compoundVariants: [
      {
        invalid: true,
        checked: true,
        className: "bg-error-400",
      },
      {
        invalid: true,
        checked: false,
        className: "bg-transparent",
      },
    ],
  },
);

export const radioLabelVariants = cva([], {
  variants: {
    size: {
      xxs: "",
      xs: "",
      s: "",
      m: "mt-0.5",
      l: "mt-0.5",
      xl: "mt-1",
    },
  },
});
