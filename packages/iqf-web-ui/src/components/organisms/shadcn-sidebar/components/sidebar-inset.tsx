"use client";

import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../../utils";

export function SidebarInset({
  className,
  ...props
}: ComponentPropsWithRef<"main">) {
  return (
    <main
      className={cn(
        "relative flex flex-1 flex-col",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className,
      )}
      {...props}
    />
  );
}
