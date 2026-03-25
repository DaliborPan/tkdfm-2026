import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "iqf-web-ui/shadcn-sidebar";

import { cn } from "../../../utils/cn";
import { useAppSidebar } from "./app-sidebar-provider";
import { SidebarItems } from "./sidebar-items";

export function DefaultSecondarySidebar({ className }: { className?: string }) {
  const { secondaryItems } = useAppSidebar();

  const { isMobile } = useSidebar();

  if (!secondaryItems) return null;

  const content =
    "content" in secondaryItems ? (
      secondaryItems.content
    ) : (
      <SidebarContent>
        <SidebarItems
          items={secondaryItems.items}
          title={secondaryItems.title}
        />
      </SidebarContent>
    );

  return (
    <Sidebar
      collapsible={isMobile ? "none" : "offcanvas"}
      className={cn(
        // Sidebar bg color and SidebarMenuItem's active/hover colors
        "bg-white",
        "[&_[data-sidebar=menu-action]:hover]:!bg-neutral-50 [&_[data-sidebar=menu-action]]:!text-text-primary [&_[data-sidebar=menu-button]:hover]:bg-neutral-50 [&_[data-sidebar=menu-button][data-active=true]]:bg-neutral-50 [&_[data-sidebar=menu-button]]:text-text-primary [&_[data-sidebar=menu-sub-button]:hover]:bg-neutral-50 [&_[data-sidebar=menu-sub-button][data-active=true]]:bg-neutral-50 [&_[data-sidebar=menu-sub-button]]:text-text-primary",
        className,
      )}
    >
      {!isMobile && <SidebarRail />}

      {secondaryItems.header && (
        <SidebarHeader>
          <secondaryItems.header />
        </SidebarHeader>
      )}

      {typeof content === "function" ? content() : content}

      {secondaryItems.footer && (
        <SidebarFooter>
          <secondaryItems.footer />
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
