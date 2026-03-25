import { cva } from "class-variance-authority";

import { type PropsWithElementRef } from "../../../types";
import { cn } from "../../../utils/cn";

const tableBodyVariants = cva([
  // "[&_tr:last-child]:border-0",
  // "block",
  "table-row-group",
]);

export function TableBody({
  className,
  ...props
}: PropsWithElementRef<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>) {
  return <tbody className={cn(tableBodyVariants({ className }))} {...props} />;
}

TableBody.displayName = "TableBody";
