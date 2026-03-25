import { type SortingState } from "@tanstack/react-table";

import {
  type PreferenceProps,
  usePreferences,
} from "../../../../settings/preferences/preferences";

export function useSort({
  defaultSorting,
  preferenceGroupKey,
  version,
}: PreferenceProps & { defaultSorting: SortingState }) {
  const [sorting, setSorting] = usePreferences<SortingState>({
    preferenceGroupKey,
    version,
    preferenceKey: "sorting",
    defaultValue: defaultSorting,
  });

  return {
    sorting,
    setSorting,
  };
}
