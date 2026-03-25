"use client";

import { type ComponentProps } from "react";

import { cn } from "../../../../utils";
import { Input } from "../../../atoms/input";

export function SidebarInput({
  className,
  ...props
}: ComponentProps<typeof Input>) {
  return (
    <Input
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-white shadow-none focus-visible:ring-2",
        className,
      )}
      {...props}
    />
  );
}
