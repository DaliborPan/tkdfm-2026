"use client";

import { Command as CommandPrimitive } from "cmdk";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";

export function Command({
  className,
  ...props
}: ComponentPropsWithRef<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md",
        className,
      )}
      {...props}
    />
  );
}
