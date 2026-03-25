import { cn } from "../../../utils/cn";
import { Pagination } from "../../molecules/pagination";
import { useDataTableContext } from "../context";

// function TotalRowsCount({ count }: { count: number }) {
//   const intl = useIntl();

//   return (
//     <div className="@container/footer flex w-full grow items-center gap-x-3">
//       <span className="@[13rem]/footer:inline-block hidden text-sm">
//         {intl.formatMessage({
//           id: "data-table.total-records-count",
//           defaultMessage: "Celkový počet záznamů",
//         })}
//       </span>

//       <span className="@[3rem]/footer:inline-block @[13rem]/footer:hidden hidden text-sm">
//         {intl.formatMessage({
//           id: "data-table.total-records-count-short",
//           defaultMessage: "Celkem",
//         })}
//       </span>

//       <Chip
//         className="@[3rem]/footer:inline-block hidden"
//         size="xs"
//         inverse={true}
//         focusable={false}
//       >
//         {count}
//       </Chip>
//     </div>
//   );
// }

export function DataTableFooter({ className }: { className?: string }) {
  const { dataQuery, ...table } = useDataTableContext();

  const pagination = table.getState().pagination;
  const totalCount = dataQuery.data?.totalCount ?? 0;

  return (
    <div className={cn("flex justify-end px-4 py-2", className)}>
      {/* {!!totalCount && <TotalRowsCount count={totalCount} />} */}

      <Pagination
        total={totalCount}
        pageSize={pagination.pageSize}
        currentIndex={pagination.pageIndex}
        onChange={(pageIndex) => {
          table.setPageIndex(pageIndex);
        }}
      />
    </div>
  );
}
