import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";

export function PaginationContent({
  className,
  ...props
}: ComponentPropsWithRef<"ul">) {
  return (
    <ul
      className={cn("flex list-none flex-row items-center gap-1", className)}
      {...props}
    />
  );
}
