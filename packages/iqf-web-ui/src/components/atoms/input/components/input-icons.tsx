import { cva } from "class-variance-authority";
import { CircleAlert } from "lucide-react";
import { type PropsWithChildren } from "react";

import { cn } from "../../../../utils/cn";
import { Icon } from "../../../atoms/icon";
import { useStateAtomControlContext } from "../../../atoms/state-atom-control";
import { type InputProps } from "../types";

type InputIconsProps = PropsWithChildren<
  Pick<InputProps, "iconRight" | "size" | "variant" | "className"> & {
    showStateIcon?: boolean;
  }
>;

export const iconVariants = cva([], {
  variants: {
    size: {
      xs: "size-3",
      s: "size-3.5",
      m: "size-4",
      l: "size-[18px]",
      xl: "size-5",
    },
    variant: {
      primary: "text-primary-600",
      secondary: "text-text-primary",
    },
  },
});

export function InputIcons({
  iconRight,
  size,
  showStateIcon = true,
  variant = "secondary",
  className,
  children,
}: InputIconsProps) {
  const { invalid } = useStateAtomControlContext();

  const StateRightIcon = invalid ? CircleAlert : undefined;

  return (
    <div className={cn("ml-2 flex items-center gap-x-2", className)}>
      {children}

      {showStateIcon && StateRightIcon && (
        <Icon
          Icon={StateRightIcon}
          className={cn(iconVariants({ size }), invalid && "text-error-600")}
        />
      )}

      {iconRight && (
        <Icon
          Icon={iconRight.Icon}
          className={cn(iconVariants({ size, variant }), iconRight.className)}
        />
      )}
    </div>
  );
}
