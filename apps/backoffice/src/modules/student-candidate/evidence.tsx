"use client";

import { type PropsWithChildren } from "react";

import { Evidence } from "@repo/admin-ui/evidence";
import { studentCandidateBrowseSchema } from "@repo/backend/student-candidate/schema";

import { useColumns } from "./columns";
import { TableToolbar } from "./components/table-toolbar";
import { studentCandidateConf } from "./conf";

export function StudentCandidateEvidence({ children }: PropsWithChildren) {
  const columns = useColumns();

  return (
    <Evidence
      conf={studentCandidateConf}
      table={
        <Evidence.Table
          title="Import členů ze svazu"
          columns={columns}
          tableSchema={studentCandidateBrowseSchema}
          tableCaption={{
            showSearch: false,
            showNew: false,
            toolbar: <TableToolbar />,
          }}
        />
      }
      detail={children}
    />
  );
}
