import { cva } from "class-variance-authority";

import { type PropsWithElementRef } from "../../../types";
import { cn } from "../../../utils/cn";

const tableHeadVariants = cva([
  "py-2.5 px-0 relative block text-left select-none [&:has([role=checkbox])]:pr-0",
]);

export function TableHead({
  className,
  ...props
}: PropsWithElementRef<
  React.ThHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>) {
  return <th className={cn(tableHeadVariants({ className }))} {...props} />;
}
