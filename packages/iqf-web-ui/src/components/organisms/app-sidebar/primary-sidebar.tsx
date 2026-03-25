import { PanelLeft } from "lucide-react";
import { type ComponentPropsWithRef, type ReactNode } from "react";
import { useIntl } from "react-intl";

import { cn } from "../../../utils/cn";
import { Icon } from "../../atoms/icon";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "../shadcn-sidebar";
import { useAppSidebar } from "./app-sidebar-provider";
import { SidebarItems } from "./sidebar-items";
import { type PrimaryMenuItemType } from "./types";

function DefaultPrimarySidebarRoot({
  className,
  collapsible,
  ...props
}: ComponentPropsWithRef<typeof Sidebar>) {
  const { isMobile } = useAppSidebar();

  return (
    <Sidebar
      {...props}
      collapsible={isMobile ? "none" : collapsible}
      className={cn(
        // Sidebar bg color and SidebarMenuItem's active/hover colors
        "bg-primary-900",
        "[&_[data-sidebar=menu-action]:hover]:!bg-primary-950 [&_[data-sidebar=menu-action]]:!text-white [&_[data-sidebar=menu-button]:hover]:bg-primary-950 [&_[data-sidebar=menu-button][data-active=true]]:bg-primary-950 [&_[data-sidebar=menu-button]]:text-white [&_[data-sidebar=menu-sub-button]:hover]:bg-primary-950 [&_[data-sidebar=menu-sub-button][data-active=true]]:bg-primary-950 [&_[data-sidebar=menu-sub-button]]:text-white",
        {
          "!w-[--sidebar-width-icon] [&_[data-sidebar=menu-action]]:hidden [&_[data-sidebar=menu-badge-inline]]:hidden [&_[data-sidebar=menu-button]]:!p-2.5 [&_[data-sidebar=menu-sub]]:hidden":
            isMobile,
        },
        className,
      )}
    />
  );
}

/**
 * Default implementation of primary sidebar.
 *
 * If you need to build your own, you must follow the shadcn/ui Sidebar API and conventions.
 *
 * @see https://ui.shadcn.com/docs/components/sidebar
 */
function DefaultPrimarySidebar({
  items,
  header,
  footer,
  className,
}: {
  items: PrimaryMenuItemType[];
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  const intl = useIntl();

  const { toggleSidebars, isMobile } = useAppSidebar();

  const topItems = items.filter(({ align = "top" }) => align === "top");
  const bottomItems = items.filter((item) => item.align === "bottom");

  return (
    <DefaultPrimarySidebarRoot collapsible="icon" className={className}>
      {!isMobile && <SidebarRail />}

      <SidebarHeader>
        {header ?? (
          <SidebarMenuButton
            tooltip={intl.formatMessage({
              id: "sidebar.open-menu.label",
              defaultMessage: "Otevřít menu",
            })}
            onClick={toggleSidebars}
            className="text-white hover:bg-secondary-800"
          >
            <Icon Icon={PanelLeft} />
            <span className="truncate">
              {intl.formatMessage({
                id: "sidebar.close-menu.label",
                defaultMessage: "Zavřít menu",
              })}
            </span>
          </SidebarMenuButton>
        )}
      </SidebarHeader>

      <SidebarContent className="justify-between">
        {topItems.length > 0 && <SidebarItems items={topItems} />}
        {bottomItems.length > 0 && <SidebarItems items={bottomItems} />}
      </SidebarContent>

      {footer && <SidebarFooter>{footer}</SidebarFooter>}
    </DefaultPrimarySidebarRoot>
  );
}

DefaultPrimarySidebar.Root = DefaultPrimarySidebarRoot;

export { DefaultPrimarySidebar };
