import { type PrimaryMenuItemType, isActive } from "iqf-web-ui/app-sidebar";
import { Home } from "lucide-react";
import { useIntl } from "react-intl";

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
  ];
}
