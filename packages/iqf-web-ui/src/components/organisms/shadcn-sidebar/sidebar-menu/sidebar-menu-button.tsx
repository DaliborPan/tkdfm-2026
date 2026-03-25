"use client";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../../utils/cn";
import { Tooltip } from "../../../atoms/tooltip";
import { useSidebar } from "../context";

type MenuButtonTooltipType = {
  children: string;
  hidden: boolean;
};

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-3 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-all focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 group-data-[collapsible=icon]:!h-9 group-data-[collapsible=icon]:!p-2 [&>svg]:size-5 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-secondary-200",
        outline:
          "bg-background hover:bg-secondary-300 hover:border-secondary-300 border border-gray-200 data-[active=true]:border-secondary-400",
      },
      size: {
        default: "",
        sm: "text-xs",
        lg: "group-data-[collapsible=icon]:!p-0",
      },
      collapsed: {
        true: "[&>span:last-child]:truncate",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: ComponentPropsWithRef<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | MenuButtonTooltipType;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        sidebarMenuButtonVariants({
          variant,
          size,
          collapsed: state === "collapsed",
        }),
        className,
      )}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
      hidden: isMobile || state !== "collapsed" ? true : false,
    };
  }

  return (
    <Tooltip
      Trigger={button}
      showArrow={true}
      Content={tooltip.children}
      position="right"
      className={tooltip.hidden || isMobile ? "hidden" : undefined}
    />
  );
}
