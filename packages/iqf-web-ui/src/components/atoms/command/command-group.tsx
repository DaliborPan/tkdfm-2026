"use client";

import { Command as CommandPrimitive } from "cmdk";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";

export function CommandGroup({
  className,
  ...props
}: ComponentPropsWithRef<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={cn(
        "overflow-hidden p-1 text-secondary [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-secondary",
        className,
      )}
      {...props}
    />
  );
}
