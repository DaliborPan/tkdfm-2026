import { type PrimaryMenuItemType, isActive } from "iqf-web-ui/app-sidebar";
import { Home, Logs } from "lucide-react";
import { useIntl } from "react-intl";

import { tkdPortalLogConf } from "@/modules/tkd-portal-log/conf";

export function usePrimaryItems(): PrimaryMenuItemType[] {
  const intl = useIntl();

  return [
    {
      label: intl.formatMessage({
        id: "sidebar.primary-items.home",
        defaultMessage: "Domů",
      }),
      href: "/",
      icon: {
        Icon: Home,
      },
      align: "top",
      isActive: (href) => isActive(["/"], href),
    },
    {
      label: intl.formatMessage({
        id: "sidebar.primary-items.tkd-portal-log",
        defaultMessage: "Log zmen ze svazu",
      }),
      href: tkdPortalLogConf.url,
      icon: {
        Icon: Logs,
      },
      align: "bottom",
      isActive: (href) => isActive([tkdPortalLogConf.url], href),
    },
  ];
}
