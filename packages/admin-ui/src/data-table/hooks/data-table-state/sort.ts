import { type SortingState } from "@tanstack/react-table";

import { usePreferences } from "iqf-web-ui/settings";

type PreferenceParams = {
  preferenceGroupKey: string;
  defaultSorting: SortingState;
};

export function useSort({
  defaultSorting,
  preferenceGroupKey,
}: PreferenceParams) {
  const [sorting, setSorting] = usePreferences<SortingState>({
    preferenceGroupKey,
    preferenceKey: "sorting",
    defaultValue: defaultSorting,
    version: 1,
  });

  return {
    sorting,
    setSorting,
  };
}
