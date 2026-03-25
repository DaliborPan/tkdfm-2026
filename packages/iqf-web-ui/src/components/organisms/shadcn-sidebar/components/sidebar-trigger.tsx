"use client";

import { type ComponentProps, type MouseEvent } from "react";

import { cn } from "../../../../utils/cn";
import { Button } from "../../../atoms/button";
import { useSidebar } from "../context";

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: ComponentProps<typeof Button> & {
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      className={cn("p-2", className)}
      onClick={(event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    />
  );
}
