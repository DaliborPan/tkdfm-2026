"use client";

import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../../utils";

export function SidebarContent({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-x-hidden",
        className,
      )}
      {...props}
    />
  );
}
