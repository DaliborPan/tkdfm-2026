import { type ComponentProps } from "react";

import { type BaseObject } from "../../../evidence/base";
import { cn } from "../../../utils/cn";
import { Table } from "../../atoms/table";
import { useDataTableContext } from "../context";
import { type TableComponentType } from "../types";
import { DataTableBody } from "./data-table-body";
import { DataTableHeader } from "./data-table-header";

export function TableDefaultComponent<TData extends BaseObject>({
  dataTableCaption,
  dataTableFooter,
  dataTableContextMenuActions,
}: ComponentProps<TableComponentType<TData>>) {
  const { dataQuery, url } = useDataTableContext();

  return (
    <>
      {dataTableCaption}

      <Table wrapperClassName={cn(dataQuery.isLoading && "overflow-hidden")}>
        <DataTableHeader contextMenuActions={dataTableContextMenuActions} />
        <DataTableBody
          isLoading={dataQuery.isLoading}
          url={url}
          contextMenuActions={dataTableContextMenuActions}
        />

        {dataTableFooter}
      </Table>
    </>
  );
}
