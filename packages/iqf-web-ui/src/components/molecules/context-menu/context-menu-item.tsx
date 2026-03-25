"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils";

export function ContextMenuItem({
  className,
  inset,
  ...props
}: ComponentPropsWithRef<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.Item
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-4 py-2.5 text-sm outline-none focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}
