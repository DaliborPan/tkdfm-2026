import { cva } from "class-variance-authority";

import { type PropsWithElementRef } from "../../../types";
import { cn } from "../../../utils/cn";

const tableFooterVariants = cva([
  "bg-primary",
  "text-primary-foreground",
  "font-medium",
]);

export function TableFooter({
  className,
  ...props
}: PropsWithElementRef<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>) {
  return (
    <tfoot className={cn(tableFooterVariants({ className }))} {...props} />
  );
}
