"use client";

import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../../utils/cn";

export function SidebarHeader({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-sidebar="header"
      className={cn("flex flex-col gap-2 px-2 pt-4", className)}
      {...props}
    />
  );
}
