"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils";

export function ContextMenuSeparator({
  className,
  ...props
}: ComponentPropsWithRef<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      className={cn("-mx-1 my-1 h-px bg-gray-200", className)}
      {...props}
    />
  );
}
