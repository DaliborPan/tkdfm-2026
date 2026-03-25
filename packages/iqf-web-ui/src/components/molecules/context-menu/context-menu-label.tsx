"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils";

export function ContextMenuLabel({
  className,
  inset,
  ...props
}: ComponentPropsWithRef<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.Label
      className={cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}
