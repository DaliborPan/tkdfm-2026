import { forwardRef } from "react";

import { cn } from "../../../../../utils/cn";
import { Button, type ButtonElementProps } from "../../../../atoms/button";

export const DataFormToolbarButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonElementProps, "iconLeft" | "iconRight"> & {
    icon: NonNullable<ButtonElementProps["iconLeft"]>;
  }
>(function DataFormToolbarButton(
  { variant = "base", icon, className, ...props },
  ref,
) {
  return (
    <Button
      {...props}
      ref={ref}
      variant={variant}
      iconLeft={{
        ...icon,
        className: cn("size-4", icon.className),
      }}
      className={cn("size-9 min-h-0", className)}
    />
  );
});
