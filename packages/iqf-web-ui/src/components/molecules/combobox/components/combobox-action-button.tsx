import { cva } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";

import { cn } from "../../../../utils/cn";
import { Icon } from "../../../atoms/icon";
import { type ComboboxTriggerProps } from "../types";

const iconSize = cva("", {
  variants: {
    size: {
      xs: "size-3",
      s: "size-3.5",
      m: "size-4",
      l: "size-[18px]",
      xl: "size-5",
    },
  },
  defaultVariants: { size: "s" },
});

export type ComboboxActionButtonProps = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  size?: ComboboxTriggerProps["size"];
  className?: string;
};

export function ComboboxActionButton({
  label,
  onClick,
  size = "s",
  className,
  ...props
}: ComboboxActionButtonProps) {
  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center opacity-0 transition-all group-focus-within:opacity-100 group-hover:opacity-100 group-focus:opacity-100",
        className,
      )}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <Icon Icon={props.icon} className={cn(iconSize({ size }))} />
    </span>
  );
}
