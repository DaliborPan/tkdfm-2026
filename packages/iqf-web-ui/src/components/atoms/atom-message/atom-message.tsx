import { cn } from "../../../utils/cn";
import { Icon } from "../icon";
import { atomMessageContainerVariants, atomMessageIconVariants } from "./const";
import type { AtomMessageProps } from "./types";

export function AtomMessage({
  state = "default",
  text,
  icon,
  size,
  className,
  disabled,
}: AtomMessageProps) {
  if (!text) return null;

  return (
    <div
      className={cn(
        atomMessageContainerVariants({ state, size, disabled }),
        className,
      )}
    >
      {icon && (
        <Icon
          {...icon}
          className={cn(
            atomMessageIconVariants({ state, size, disabled }),
            icon.className,
          )}
        />
      )}
      {typeof text === "string" ? <span>{text}</span> : text}
    </div>
  );
}
