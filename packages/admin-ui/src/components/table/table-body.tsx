import { forwardRef } from "react";

import { cn } from "iqf-web-ui/cn";

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableBody({ className, ...props }, ref) {
  return (
    <tbody ref={ref} className={cn("relative grid", className)} {...props} />
  );
});
