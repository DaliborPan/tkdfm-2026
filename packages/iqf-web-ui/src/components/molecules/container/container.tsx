import { cva } from "class-variance-authority";
import { type ReactNode } from "react";

import { cn } from "../../../utils/cn";

const containerVariants = cva(["block w-full"], {
  variants: {
    noXOffset: {
      true: ["px-0"],
      false: ["md:px-10 px-4"],
    },
    noYOffset: {
      true: ["py-0"],
      false: ["py-5"],
    },
  },
  defaultVariants: {
    noXOffset: false,
    noYOffset: false,
  },
});

const innerContainerVariants = cva(["mx-auto my-0 block w-full"], {
  variants: {
    noXOffset: {
      true: [],
      false: ["max-w-[80rem]"],
    },
    noYOffset: {
      true: [],
      false: [],
    },
  },
  defaultVariants: {
    noYOffset: false,
    noXOffset: false,
  },
});

export type ContainerProps = {
  noYOffset?: boolean;
  noXOffset?: boolean;
  className?: string;
  children: ReactNode;
};

export function Container({
  children,
  className,
  noYOffset = false,
  noXOffset = false,
}: ContainerProps) {
  return (
    <div className={cn(containerVariants({ noYOffset, noXOffset }))}>
      <div
        className={cn(
          innerContainerVariants({ noYOffset, noXOffset }),
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
