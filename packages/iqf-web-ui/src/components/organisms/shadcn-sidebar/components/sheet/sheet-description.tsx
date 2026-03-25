"use client";

import { Description } from "@radix-ui/react-dialog";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../../../utils";

export function SheetDescription({
  className,
  ...props
}: ComponentPropsWithRef<typeof Description>) {
  return (
    <Description
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}
