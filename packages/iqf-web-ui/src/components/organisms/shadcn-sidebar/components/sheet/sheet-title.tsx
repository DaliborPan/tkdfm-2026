"use client";

import { Title } from "@radix-ui/react-dialog";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../../../utils";

export function SheetTitle({
  className,
  ...props
}: ComponentPropsWithRef<typeof Title>) {
  return (
    <Title
      className={cn("text-foreground text-lg font-semibold", className)}
      {...props}
    />
  );
}
