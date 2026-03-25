"use client";

import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../../utils/cn";

export function SidebarFooter({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 px-3 pb-4", className)}
      {...props}
    />
  );
}
