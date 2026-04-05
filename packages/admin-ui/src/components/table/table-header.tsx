import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "iqf-web-ui/cn";

const tableHeaderVariants = cva(["sticky top-0 z-30"]);

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(tableHeaderVariants({ className }))}
    {...props}
  />
));

TableHeader.displayName = "TableHeader";
