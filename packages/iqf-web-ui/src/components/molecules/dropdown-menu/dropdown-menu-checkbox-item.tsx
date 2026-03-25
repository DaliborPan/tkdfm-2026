import { CheckboxItem } from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";
import { Checkbox } from "../../atoms/checkbox";
import { useDropdownMenuContext } from "./dropdown-menu-context";
import { DropdownMenuItemSlot } from "./dropdown-menu-item-slot";

export function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  onMouseEnter,
  ...props
}: ComponentPropsWithRef<typeof CheckboxItem>) {
  const { variant } = useDropdownMenuContext();

  return (
    <DropdownMenuItemSlot onMouseEnter={onMouseEnter}>
      <CheckboxItem
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-[1.5px] py-2.5 pl-10 pr-2 text-sm outline-none transition-colors focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          variant === "primary" && "focus:bg-primary-100",
          className,
        )}
        checked={checked}
        {...props}
      >
        <span className="absolute left-2 h-[50%]">
          <Checkbox checked={!!checked} />
        </span>

        {children}
      </CheckboxItem>
    </DropdownMenuItemSlot>
  );
}

/**
 * @deprecated
 *
 * use `DropdownMenuCheckboxItem` instead
 */
export const DropdownCheckboxItem = DropdownMenuCheckboxItem;
