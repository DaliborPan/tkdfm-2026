import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";

export function AccordionItem({
  className,
  ...props
}: ComponentPropsWithRef<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item className={cn("border-b", className)} {...props} />
  );
}
