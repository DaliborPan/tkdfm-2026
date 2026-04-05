import { type ColumnSizingState } from "@tanstack/react-table";

import { usePreferences } from "iqf-web-ui/settings";

const PREFERENCE_KEY = "columnSizing";

export function useColumnSizing({
  preferenceGroupKey,
}: {
  preferenceGroupKey: string;
}) {
  const [columnSizing, setColumnSizing] = usePreferences<ColumnSizingState>({
    preferenceGroupKey,
    preferenceKey: PREFERENCE_KEY,
    defaultValue: {},
    version: 1,
  });

  return {
    columnSizing,
    setColumnSizing,
  };
}
