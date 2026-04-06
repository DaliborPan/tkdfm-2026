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
      readOnly={true}
      table={
        <Evidence.Table
          title="Nahlasene chyby"
          columns={columns}
          tableSchema={helpdeskTicketBrowseSchema}
          tableCaption={{
            showSearch: false,
          }}
        />
      }
      detail={children}
    />
  );
}
