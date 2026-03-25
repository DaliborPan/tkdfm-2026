import { cva } from "class-variance-authority";

export const submitInputWrapperVariants = cva([""], {
  variants: {
    size: {
      s: "[&_.input-wrapper]:pr-10",
      m: "[&_.input-wrapper]:pr-12",
      l: "[&_.input-wrapper]:pr-14",
      xl: "[&_.input-wrapper]:pr-16",
    },
  },
});

export const submitInputButtonVariants = cva(
  ["absolute top-[50%] z-20 translate-y-[-50%]"],
  {
    variants: {
      size: {
        s: "right-1 px-1",
        m: "right-1.5 px-2 h-7",
        l: "right-2",
        xl: "right-[0.5625rem]",
      },
    },
  },
);

export const submitInputButtonIconVariants = cva([], {
  variants: {
    size: {
      s: "size-4",
      m: "size-4 ",
      l: "size-[18px]",
      xl: "size-5 ",
    },
  },
});
