import { type ComponentProps } from "react";

import { cn } from "../../../../utils/cn";

export function ComboboxButtonValue({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      {...props}
      className={cn("mr-auto min-h-[1lh] truncate", className)}
    />
  );
}
