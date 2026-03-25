import { type PropsWithChildren } from "react";

import { cn } from "../../../utils";

type SignpostContentProps = PropsWithChildren<{
  className?: string;
}>;

export function SignpostContent({ children, className }: SignpostContentProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>{children}</div>
  );
}
