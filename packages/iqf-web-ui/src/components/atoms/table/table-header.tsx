import { cva } from "class-variance-authority";

import { type PropsWithElementRef } from "../../../types";
import { cn } from "../../../utils/cn";

const tableHeaderVariants = cva(["bg-neutral-50"]);

export function TableHeader({
  className,
  ...props
}: PropsWithElementRef<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>) {
  return (
    <thead className={cn(tableHeaderVariants({ className }))} {...props} />
  );
}
