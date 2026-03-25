import { cva } from "class-variance-authority";

import { cn } from "../../../utils/cn";

const pictogramVariants = cva([], {
  variants: {
    size: {
      xs: ["max-w-[13px]"],
      s: ["max-w-[32px]"],
      m: ["max-w-[52px]"],
      l: ["max-w-[78px]"],
      xl: ["max-w-[104px]"],
      "2xl": ["max-w-[130px]"],
      "3xl": ["max-w-[156px]"],
      "4xl": ["max-w-[182px]"],
      "5xl": ["max-w-[208px]"],
      "6xl": ["max-w-[234px]"],
    },
  },
  defaultVariants: {
    size: "m",
  },
});

export type PictogramProps = {
  src: string;
  alt: string;
  size?: "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  className?: string;
};

export function Pictogram({ src, alt, size = "m", className }: PictogramProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(pictogramVariants({ size, className }))}
    />
  );
}
