"use client";

import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../../utils";

/**
 * Regular shadcn `SidebarMenubadge` component.
 *
 * Use this component when you need to position badge absolutely.
 */
export function SidebarMenuBadge({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-secondary",
        "peer-hover/menu-button:text-secondary peer-data-[active=true]/menu-button:text-secondary",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Custom `SidebarMenuBadge` component that matches the styles of
 * shadcn's `SidebarMenuBadge`.
 *
 * Use this component when you need an automatically positioned badge
 * inside a `SidebarMenuButton`.
 *
 * @example
 * ```tsx
 * <SidebarMenuButton asChild>
 *   <Link href={item.href}>
 *     <span>{item.label}</span>
 *
 *     <SidebarMenuBadgeFlex>
 *       {item.badge}
 *     </SidebarMenuBadgeFlex>
 *   </Link>
 * </SidebarMenuButton>
 * ```
 */
export function SidebarMenuBadgeInline({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-sidebar="menu-badge-inline"
      className={cn(
        "pointer-events-none ml-auto flex h-5 min-w-5 shrink-0 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-inherit",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}
