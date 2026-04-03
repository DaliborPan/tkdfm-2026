import { forwardRef } from "react";

import { cn } from "iqf-web-ui/cn";

export const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(function TableRow({ className, ...props }, ref) {
  return (
    <tr
      ref={ref}
      className={cn("flex border-b transition-colors", className)}
      {...props}
    />
  );
});
