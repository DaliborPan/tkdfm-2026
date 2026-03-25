import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../../utils/cn";

export function SidebarMenu({
  className,
  ...props
}: ComponentPropsWithRef<"ul">) {
  return (
    <ul
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  );
}
