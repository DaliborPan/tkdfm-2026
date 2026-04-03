import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "iqf-web-ui/cn";

const tableHeadVariants = cva([
  "py-2 px-0 h-0 relative block h-auto text-primary text-left select-none [&:has([role=checkbox])]:pr-0",
]);

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th ref={ref} className={cn(tableHeadVariants({ className }))} {...props} />
));

TableHead.displayName = "TableHead";
