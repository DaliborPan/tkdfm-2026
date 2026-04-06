"use client";

import { type PropsWithChildren } from "react";

import { Evidence } from "@repo/admin-ui/evidence";
import { helpdeskTicketBrowseSchema } from "@repo/backend/helpdesk-ticket/schema";

import { useColumns } from "./columns";
import { helpdeskTicketConf } from "./conf";

export function HelpdeskTicketEvidence({ children }: PropsWithChildren) {
  const columns = useColumns();

  return (
    <Evidence
      conf={helpdeskTicketConf}
      table={
        <Evidence.Table
          title="Nahlášené chyby"
          columns={columns}
          tableSchema={helpdeskTicketBrowseSchema}
          tableCaption={{
            showSearch: false,
            showNew: false,
          }}
        />
      }
      detail={children}
    />
  );
}
