"use client";

import { Overlay } from "@radix-ui/react-dialog";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../../../utils";

export function SheetOverlay({
  className,
  ...props
}: ComponentPropsWithRef<typeof Overlay>) {
  return (
    <Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}
