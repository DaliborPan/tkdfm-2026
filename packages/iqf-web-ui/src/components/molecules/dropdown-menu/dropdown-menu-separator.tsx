import { Separator } from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";

export function DropdownMenuSeparator({
  className,
  ...props
}: ComponentPropsWithRef<typeof Separator>) {
  return (
    <Separator
      className={cn("-mx-1 my-1 h-px bg-gray-200", className)}
      {...props}
    />
  );
}

/**
 * @deprecated
 *
 * use `DropdownMenuSeparator` instead
 */
export const DropdownSeparator = DropdownMenuSeparator;
