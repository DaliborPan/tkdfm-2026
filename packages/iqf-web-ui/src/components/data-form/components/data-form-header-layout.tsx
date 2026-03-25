import { type PropsWithChildren } from "react";

import { cn } from "../../../utils/cn";

export function DataFormHeaderLayout({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-2 border-b px-4 py-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
