"use client";

import { type PropsWithChildren } from "react";

import {
  AppSidebar,
  DefaultPrimarySidebar,
  useAppSidebar,
} from "iqf-web-ui/app-sidebar";
import { Icon } from "iqf-web-ui/icon";
import { SidebarMenuButton } from "iqf-web-ui/shadcn-sidebar";
import { PanelLeft } from "lucide-react";
import { useIntl } from "react-intl";

import { usePrimaryItems } from "./primary-items";

function SidebarHeader() {
  const intl = useIntl();

  const { toggleSidebars } = useAppSidebar();

  return (
    <div>
      <SidebarMenuButton
        tooltip={intl.formatMessage({
          id: "sidebar.open-menu.label",
          defaultMessage: "Otevřít menu",
        })}
        onClick={toggleSidebars}
      >
        <Icon Icon={PanelLeft} />
        <span>Zlín backoffice</span>
      </SidebarMenuButton>
    </div>
  );
}

function PrimarySidebar() {
  const primaryItems = usePrimaryItems();

  return (
    <DefaultPrimarySidebar items={primaryItems} header={<SidebarHeader />} />
  );
}

export function AppSidebarProvider({ children }: PropsWithChildren) {
  return (
    <AppSidebar primarySidebar={<PrimarySidebar />}>{children}</AppSidebar>
  );
}
