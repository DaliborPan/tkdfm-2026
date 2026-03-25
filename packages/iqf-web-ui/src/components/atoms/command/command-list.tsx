"use client";

import { Command as CommandPrimitive } from "cmdk";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";

export function CommandList({
  className,
  ...props
}: ComponentPropsWithRef<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={cn(
        "max-h-[300px] overflow-y-auto overflow-x-hidden",
        className,
      )}
      {...props}
    />
  );
}
