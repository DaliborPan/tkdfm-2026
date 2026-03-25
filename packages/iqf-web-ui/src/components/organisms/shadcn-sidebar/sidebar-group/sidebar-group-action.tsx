"use client";

import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../../utils";

export function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: ComponentPropsWithRef<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-secondary outline-none transition-transform hover:bg-secondary-300 hover:text-secondary focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}
