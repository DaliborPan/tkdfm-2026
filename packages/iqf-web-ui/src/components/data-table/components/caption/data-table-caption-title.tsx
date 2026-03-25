import { useIntl } from "react-intl";

import { cn } from "../../../../utils/cn";
import { useDataTableContext } from "../../context";

export function DataTableCaptionRowsCount() {
  const { dataQuery, ...table } = useDataTableContext();

  const pagination = table.getState().pagination;
  const totalCount = dataQuery.data?.totalCount;

  return (
    <div className="font-normal text-text-terciary">
      {pagination.pageIndex === 0
        ? 1
        : pagination.pageIndex * pagination.pageSize}
      -
      {Math.min(
        (pagination.pageIndex + 1) * pagination.pageSize,
        totalCount ?? 0,
      )}{" "}
      ({totalCount})
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
  const intl = useIntl();

  return (
    <h1
      className={cn(
        "flex items-center gap-x-1.5 whitespace-nowrap font-medium",
        className,
      )}
    >
      {title ??
        intl.formatMessage({
          id: "data-table.default-title",
          defaultMessage: "Evidence",
        })}

      <DataTableCaptionRowsCount />
    </h1>
  );
}
