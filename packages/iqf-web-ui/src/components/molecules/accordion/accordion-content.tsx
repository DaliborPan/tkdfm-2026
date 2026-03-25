import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";

export function AccordionContent({
  className,
  children,
  ...props
}: ComponentPropsWithRef<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("p-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
