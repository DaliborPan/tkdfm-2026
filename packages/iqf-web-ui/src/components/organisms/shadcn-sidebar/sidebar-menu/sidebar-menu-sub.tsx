"use client";

import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../../utils";

export function SidebarMenuSub({
  className,
  ...props
}: ComponentPropsWithRef<"ul">) {
  return (
    <ul
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-gray-200 px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}
