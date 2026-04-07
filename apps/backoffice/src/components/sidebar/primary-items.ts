import { type PrimaryMenuItemType, isActive } from "iqf-web-ui/app-sidebar";
import { Home, Layers, Logs, ShieldAlert, UserRoundPlus } from "lucide-react";
import { useIntl } from "react-intl";

import { groupConf } from "@/modules/group/conf";
import { helpdeskTicketConf } from "@/modules/helpdesk-ticket/conf";
import { studentCandidateConf } from "@/modules/student-candidate/conf";
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
        id: "sidebar.primary-items.helpdesk-ticket",
        defaultMessage: "Helpdesk",
      }),
      href: helpdeskTicketConf.url,
      icon: {
        Icon: ShieldAlert,
      },
      align: "top",
      isActive: (href) => isActive([helpdeskTicketConf.url], href),
    },
    {
      label: intl.formatMessage({
        id: "sidebar.primary-items.group",
        defaultMessage: "Skupiny",
      }),
      href: groupConf.url,
      icon: {
        Icon: Layers,
      },
      align: "bottom",
      isActive: (href) => isActive([groupConf.url], href),
    },
    {
      label: intl.formatMessage({
        id: "sidebar.primary-items.student-candidate",
        defaultMessage: "Import členů",
      }),
      href: studentCandidateConf.url,
      icon: {
        Icon: UserRoundPlus,
      },
      align: "bottom",
      isActive: (href) => isActive([studentCandidateConf.url], href),
    },
    {
      label: intl.formatMessage({
        id: "sidebar.primary-items.tkd-portal-log",
        defaultMessage: "Log změn ze svazu",
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
