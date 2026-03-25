import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../../utils/cn";

export function SidebarMenuItem({
  className,
  ...props
}: ComponentPropsWithRef<"li">) {
  return (
    <li
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
}
