"use client";

import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../../utils";

export function SidebarGroupContent({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  );
}
