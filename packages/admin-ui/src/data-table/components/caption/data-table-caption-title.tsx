import { cn } from "iqf-web-ui/cn";

import { useDataTableContext } from "../../context";

function CurrentRowsRange() {
  const { dataQuery, serverSide, ...table } = useDataTableContext();

  const pagination = table.getState().pagination;
  const totalCount = dataQuery.data?.totalCount;

  return (
    <>
      {pagination.pageIndex === 0
        ? 1
        : pagination.pageIndex * pagination.pageSize}
      -
      {Math.min(
        (pagination.pageIndex + 1) * pagination.pageSize,
        totalCount ?? 50,
      )}
    </>
  );
}

export function DataTableCaptionRowsCount() {
  const { dataQuery, serverSide } = useDataTableContext();

  const totalCount = dataQuery.data?.totalCount;

  return (
    <div className="text-text-terciary font-normal">
      {serverSide ? (
        <>
          <CurrentRowsRange /> ({totalCount ?? "-"})
        </>
      ) : (
        `(${totalCount ?? "-"})`
      )}
    </div>
  );
}

export function DataTableCaptionTitle({
  title,
  className,
}: {
  title?: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "flex items-center gap-x-1.5 whitespace-nowrap font-medium",
        className,
      )}
    >
      {title ?? "Evidence"}

      <DataTableCaptionRowsCount />
    </h1>
  );
}
