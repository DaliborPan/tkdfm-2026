import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";
import { Label } from "../../atoms/label";

export function DropdownMenuLabel({
  className,
  inset,
  ...props
}: ComponentPropsWithRef<typeof Label> & {
  inset?: boolean;
}) {
  return (
    <Label
      className={cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "pl-10",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @deprecated
 *
 * use `DropdownMenuLabel` instead
 */
export const DropdownLabel = DropdownMenuLabel;
