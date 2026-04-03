import { useDataTableContext } from "../../context";

export function useDefaultColumnFilterValue<TFilterValueItem>(
  columnId: string,
) {
  const table = useDataTableContext();

  return table.initialState.columnFilters?.find(
    (columnFilter) => columnFilter.id === columnId,
  )?.value as TFilterValueItem | undefined;
}
