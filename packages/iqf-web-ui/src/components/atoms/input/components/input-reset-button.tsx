import { Undo2 } from "lucide-react";
import { useIntl } from "react-intl";

import { cn } from "../../../../utils/cn";
import { Icon } from "../../../atoms/icon";
import { type InputProps } from "../types";
import { iconVariants } from "./input-icons";

type InputResetButtonProps = {
  onClick: () => void;
  className?: string;
  label?: string;
} & Pick<InputProps, "size" | "variant">;

export function InputResetButton({
  onClick,
  className,
  size = "s",
  variant = "secondary",
  ...props
}: InputResetButtonProps) {
  const intl = useIntl();
  const label =
    props.label ??
    intl.formatMessage({
      id: "input.reset",
      defaultMessage: "Obnovit původní hodnotu",
    });

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={label}
      title={label}
      className={cn(
        "cursor-pointer opacity-0 transition-all group-focus-within:opacity-100 group-hover:opacity-100 group-focus:opacity-100",
        className,
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <Icon Icon={Undo2} className={cn(iconVariants({ size, variant }))} />
    </span>
  );
}
