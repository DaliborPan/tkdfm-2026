import { useDataTableContext } from "../context";

export function useDefaultColumnFilterValue(columnId: string) {
  const table = useDataTableContext();

  return table.initialState.columnFilters?.find(
    (columnFilter) => columnFilter.id === columnId,
  )?.value;
}
