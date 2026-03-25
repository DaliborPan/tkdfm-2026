import { cva } from "class-variance-authority";
import { CircleAlert } from "lucide-react";
import { type PropsWithChildren } from "react";

import { cn } from "../../../../utils/cn";
import { Icon } from "../../../atoms/icon";
import { useStateAtomControlContext } from "../../../atoms/state-atom-control";
import { type ComboboxButtonProps } from "./combobox-button";

type ComboboxIconsProps = PropsWithChildren<
  Pick<ComboboxButtonProps, "iconRight" | "size">
>;

const iconVariants = cva([], {
  variants: {
    size: {
      xs: "size-3",
      s: "size-3.5",
      m: "size-4",
      l: "size-[18px]",
      xl: "size-5",
    },
  },
});

export function ComboboxIcons({
  iconRight,
  size,
  children,
}: ComboboxIconsProps) {
  const { invalid } = useStateAtomControlContext();

  const StateRightIcon = invalid ? CircleAlert : undefined;

  return (
    (children || StateRightIcon || iconRight) && (
      <div className="ml-2 flex items-center gap-x-2">
        {children}

        {StateRightIcon && (
          <Icon
            Icon={StateRightIcon}
            className={cn(iconVariants({ size }), invalid && "text-error-600")}
          />
        )}

        {iconRight && (
          <Icon
            Icon={iconRight.Icon}
            className={cn(iconVariants({ size }), iconRight.className)}
          />
        )}
      </div>
    )
  );
}
