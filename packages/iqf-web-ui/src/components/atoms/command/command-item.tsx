"use client";

import { Command as CommandPrimitive } from "cmdk";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";

export function CommandItem({
  className,
  ...props
}: ComponentPropsWithRef<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cn(
        "relative cursor-pointer select-none gap-2 truncate rounded-md px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-primary-100 data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}
