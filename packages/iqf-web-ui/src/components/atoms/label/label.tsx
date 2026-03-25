import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "../../../utils/cn";
import { labelVariants } from "./const";
import type { LabelProps } from "./types";

export function Label({
  className,
  state = "default",
  size = "s",
  ...props
}: LabelProps) {
  return (
    <LabelPrimitive.Root
      className={cn(labelVariants({ state, size }), className)}
      {...props}
    />
  );
}
