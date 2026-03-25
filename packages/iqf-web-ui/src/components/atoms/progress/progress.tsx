"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";

export function Progress({
  className,
  value,
  ref,
  ...props
}: ComponentPropsWithRef<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-secondary-500",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}
