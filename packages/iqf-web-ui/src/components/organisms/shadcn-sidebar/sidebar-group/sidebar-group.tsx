"use client";

import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../../utils/cn";

export function SidebarGroup({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
}
