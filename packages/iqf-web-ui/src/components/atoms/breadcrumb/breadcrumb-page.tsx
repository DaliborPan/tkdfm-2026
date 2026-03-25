import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";

export function BreadcrumbPage({
  className,
  ...props
}: ComponentPropsWithRef<"span">) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(className)}
      {...props}
    />
  );
}
