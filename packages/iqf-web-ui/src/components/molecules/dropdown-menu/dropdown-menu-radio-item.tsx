import { ItemIndicator, RadioItem } from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";
import { Radio } from "../../atoms/radio";
import { useDropdownMenuContext } from "./dropdown-menu-context";
import { DropdownMenuItemSlot } from "./dropdown-menu-item-slot";

function Indicator() {
  return (
    <>
      <span className="absolute left-2 h-[50%]">
        <ItemIndicator>
          <Radio size="xs" checked={true} value="" />
        </ItemIndicator>
      </span>

      {/* Displaying empty radio indicator when item is not selected */}
      <span className="absolute left-2 group-aria-checked:hidden">
        <Radio size="xs" value="" />
      </span>
    </>
  );
}

export function DropdownMenuRadioItem({
  className,
  children,
  onMouseEnter,
  ...props
}: ComponentPropsWithRef<typeof RadioItem>) {
  const { variant } = useDropdownMenuContext();

  return (
    <DropdownMenuItemSlot onMouseEnter={onMouseEnter}>
      <RadioItem
        className={cn(
          "group relative flex select-none items-center rounded-[1.5px] py-2.5 pl-10 pr-2 text-sm outline-none transition-colors focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          variant === "primary" && "focus:bg-primary-100",
          className,
        )}
        {...props}
      >
        <Indicator />

        {children}
      </RadioItem>
    </DropdownMenuItemSlot>
  );
}

/**
 * @deprecated
 *
 * use `DropdownMenuRadioItem` instead
 */
export const DropdownRadioItem = DropdownMenuRadioItem;
