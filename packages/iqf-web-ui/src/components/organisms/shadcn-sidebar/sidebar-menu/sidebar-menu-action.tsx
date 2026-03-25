"use client";

import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../../utils";

export function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: ComponentPropsWithRef<"button"> & {
  asChild?: boolean;
  showOnHover?: boolean;
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1.5 top-1.5 flex aspect-square w-6 items-center justify-center rounded-md p-0 text-secondary outline-none transition-transform hover:bg-secondary-200 hover:text-secondary focus-visible:ring-2 peer-hover/menu-button:text-secondary [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-2",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        "peer-data-[active=true]/menu-button:hover:bg-primary-100",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-secondary md:opacity-0",
        className,
      )}
      {...props}
    />
  );
}
