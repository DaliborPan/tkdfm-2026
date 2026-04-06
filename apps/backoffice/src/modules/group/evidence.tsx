"use client";

import { type PropsWithChildren } from "react";

import { Evidence } from "@repo/admin-ui/evidence";
import { groupBrowseSchema } from "@repo/backend/group/schema";

import { useColumns } from "./columns";
import { groupConf } from "./conf";

export function GroupEvidence({ children }: PropsWithChildren) {
  const columns = useColumns();

  return (
    <Evidence
      conf={groupConf}
      readOnly={true}
      table={
        <Evidence.Table
          title="Evidence skupin"
          columns={columns}
          tableSchema={groupBrowseSchema}
          tableCaption={{
            showSearch: false,
          }}
        />
      }
      detail={children}
    />
  );
}
