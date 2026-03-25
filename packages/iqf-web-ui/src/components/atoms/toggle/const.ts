import { cva } from "class-variance-authority";

export const toggleVariants = cva(
  [
    "peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:size-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 peer-disabled:bg-gray-100 peer-disabled:after:bg-gray-300 peer-disabled:after:border-gray-200",
  ],
  {
    variants: {
      size: {
        xs: "h-5 w-9 after:size-4",
        s: "h-6 w-11 after:size-5",
        m: "h-7 w-[52px] after:size-6",
      },
    },
  },
);

export const toggleLabelVariants = cva(["font-normal ms-3"], {
  variants: {
    size: {
      xs: "text-xs",
      s: "text-sm",
      m: "text-base",
    },
  },
});
