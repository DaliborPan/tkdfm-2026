import { Item } from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";
import { useDropdownMenuContext } from "./dropdown-menu-context";
import { DropdownMenuItemSlot } from "./dropdown-menu-item-slot";

export function DropdownMenuItem({
  className,
  inset,
  onMouseEnter,
  ...props
}: ComponentPropsWithRef<typeof Item> & {
  inset?: boolean;
}) {
  const { variant } = useDropdownMenuContext();

  return (
    <DropdownMenuItemSlot onMouseEnter={onMouseEnter}>
      <Item
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm px-4 py-2.5 text-sm outline-none transition-colors focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          inset && "pl-10",
          variant === "primary" && "text-primary focus:bg-primary-100",
          className,
        )}
        {...props}
      />
    </DropdownMenuItemSlot>
  );
}

/**
 * @deprecated
 *
 * use `DropdownMenuItem` instead
 */
export const DropdownItem = DropdownMenuItem;
