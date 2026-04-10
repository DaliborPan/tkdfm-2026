"use client";

import { type PropsWithChildren } from "react";

import { Evidence } from "@repo/admin-ui/evidence";
import { trainingBrowseSchema } from "@repo/backend/training/schema";

import { useColumns } from "./columns";
import { TableToolbar } from "./components/table-toolbar";
import { trainingConf } from "./conf";

export function TrainingEvidence({ children }: PropsWithChildren) {
  const columns = useColumns();

  return (
    <Evidence
      conf={trainingConf}
      readOnly={true}
      table={
        <Evidence.Table
          title="Evidence tréninků"
          columns={columns}
          tableSchema={trainingBrowseSchema}
          tableCaption={{
            toolbar: <TableToolbar />,
          }}
        />
      }
      detail={children}
    />
  );
}
