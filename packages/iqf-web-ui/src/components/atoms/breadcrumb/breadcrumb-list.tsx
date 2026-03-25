import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";

export function BreadcrumbList({
  className,
  ...props
}: ComponentPropsWithRef<"ol">) {
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-2 break-words text-xs font-medium text-secondary",
        className,
      )}
      {...props}
    />
  );
}
