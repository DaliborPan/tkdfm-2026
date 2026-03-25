import { type ColumnFiltersState } from "@tanstack/react-table";

import {
  type PreferenceProps,
  usePreferences,
} from "../../../../settings/preferences/preferences";

type UseColumnFilterProps = {
  defaultColumnFilters: ColumnFiltersState;
} & PreferenceProps;

export function useColumnFilter({
  preferenceGroupKey,
  version,
  defaultColumnFilters,
}: UseColumnFilterProps) {
  const [columnFilters, setColumnFilters] = usePreferences<ColumnFiltersState>({
    preferenceGroupKey,
    version,
    preferenceKey: "columnFilters",
    defaultValue: defaultColumnFilters,
  });

  return {
    columnFilters,
    setColumnFilters,
  };
}
