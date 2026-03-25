"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { type ComponentPropsWithRef, type ReactNode } from "react";

import { cn } from "../../../utils/cn";
import { Icon as _Icon } from "../../atoms/icon";
import { type IconProps } from "../../atoms/icon/types";
import { iconSizeVariants, sizeVariants } from "./const";

export function AccordionTrigger({
  className,
  size = "m",
  label,
  annotation,
  actionsRight,
  Icon,
  ...props
}: ComponentPropsWithRef<typeof AccordionPrimitive.Trigger> & {
  size?: "xs" | "s" | "m" | "l" | "xl";
  label: ReactNode;
  annotation?: ReactNode;
  Icon?: IconProps;
  actionsRight?: ReactNode;
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn("group text-left", sizeVariants({ size }), className)}
        {...props}
      >
        <div className="flex items-center gap-4 text-text-primary-color">
          {Icon && (
            <_Icon
              {...Icon}
              className={cn(iconSizeVariants[size], Icon?.className)}
            />
          )}
          <div className="flex flex-col items-start">
            {label}
            {annotation && <span className="text-secondary">{annotation}</span>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {actionsRight}

          <ChevronDownIcon
            className={cn(
              "AccordionChevron mr-2 size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180",
              iconSizeVariants[size],
            )}
          />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}
