import { cn } from "iqf-web-ui/cn";
import { Pagination } from "iqf-web-ui/pagination";

import { useDataTableContext } from "../context";

export function DataTableFooter({ className }: { className?: string }) {
  const { dataQuery, serverSide, ...table } = useDataTableContext();

  const pagination = table.getState().pagination;
  const totalCount = dataQuery.data?.totalCount ?? 0;

  return (
    <tfoot
      className={cn("flex justify-end px-4", serverSide && "py-2", className)}
    >
      <tr>
        <td>
          {serverSide && (
            <Pagination
              total={totalCount}
              pageSize={pagination.pageSize}
              currentIndex={pagination.pageIndex}
              onChange={(pageIndex) => {
                table.setPageIndex(pageIndex);
              }}
            />
          )}
        </td>
      </tr>
    </tfoot>
  );
}
