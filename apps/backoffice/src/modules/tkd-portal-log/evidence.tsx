"use client";

import { type PropsWithChildren } from "react";

import { Evidence } from "@repo/admin-ui/evidence";
import { tkdPortalLogBrowseSchema } from "@repo/backend/tkd-portal-log";

import { useColumns } from "./columns";
import { tkdPortalLogConf } from "./conf";

export function TkdPortalLogEvidence({ children }: PropsWithChildren) {
  const columns = useColumns();

  return (
    <Evidence
      conf={tkdPortalLogConf}
      table={
        <Evidence.Table
          title="Log importu ze svazu"
          columns={columns}
          tableSchema={tkdPortalLogBrowseSchema}
          tableCaption={{
            showNew: false,
            showSearch: false,
          }}
        />
      }
      detail={children}
    />
  );
}
