import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";

export function BreadcrumbItem({
  className,
  ...props
}: ComponentPropsWithRef<"li">) {
  return (
    <li
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}
