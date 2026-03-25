"use client";

import { type Slot } from "@radix-ui/react-slot";

import { cn } from "../../../utils/cn";

/**
 * @deprecated use tailwind's text classes instead
 */
export function Typography({
  component,
  size = "m",
  ...props
}: React.ComponentPropsWithRef<typeof Slot> & {
  component?: React.ElementType;
  size?: "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
}) {
  const Comp = component || "p";

  return (
    <Comp {...props} className={cn(`iqf-text--${size}`, props.className)} />
  );
}
