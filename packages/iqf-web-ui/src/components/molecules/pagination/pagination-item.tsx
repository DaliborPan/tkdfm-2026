import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";

export function PaginationItem({
  className,
  ...props
}: ComponentPropsWithRef<"li">) {
  return <li className={cn("m-0 p-0 before:hidden", className)} {...props} />;
}
