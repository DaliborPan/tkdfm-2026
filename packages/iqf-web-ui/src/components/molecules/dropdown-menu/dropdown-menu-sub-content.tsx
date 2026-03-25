import { Portal, SubContent } from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";

export function DropdownMenuSubContent({
  className,
  sideOffset = 4,
  ...props
}: ComponentPropsWithRef<typeof SubContent>) {
  return (
    <Portal>
      <SubContent
        sideOffset={sideOffset}
        className={cn(
          "z-[9999] min-w-[8rem] overflow-hidden rounded-[3px] bg-white p-1 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      />
    </Portal>
  );
}
