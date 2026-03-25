"use client";

import { Command as CommandPrimitive } from "cmdk";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";

export function CommandEmpty({
  className,
  ...props
}: ComponentPropsWithRef<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      className={cn("px-4 py-2 text-sm text-secondary-700", className)}
      {...props}
    />
  );
}
