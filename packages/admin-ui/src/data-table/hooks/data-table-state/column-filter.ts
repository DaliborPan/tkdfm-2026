import { type ColumnFiltersState } from "@tanstack/react-table";

import { usePreferences } from "iqf-web-ui/settings";

type UseColumnFilterProps = {
  defaultColumnFilters: ColumnFiltersState;
  preferenceGroupKey: string;
};

export function useColumnFilter({
  preferenceGroupKey,
  defaultColumnFilters,
}: UseColumnFilterProps) {
  const [columnFilters, setColumnFilters] = usePreferences<ColumnFiltersState>({
    preferenceGroupKey,
    preferenceKey: "columnFilters",
    defaultValue: defaultColumnFilters,
    version: 1,
  });

  return {
    columnFilters,
    setColumnFilters,
  };
}
